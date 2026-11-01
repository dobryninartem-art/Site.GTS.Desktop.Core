// Диспетчер ASMX ScriptService для ASP.NET Core.
// Обслуживает все адреса вида /Services/{Служба}.asmx/{Метод} так же, как IIS + .NET Framework:
//   * запрос: POST, тело — JSON-объект с параметрами по именам ({"User":"123","Point":45});
//   * параметры типа object получают значения как от JavaScriptSerializer (string/int/decimal/bool/словарь/массив);
//   * ответ: {"d": <результат>} (void -> {"d":null}), Content-Type: application/json; charset=utf-8;
//   * исключение: HTTP 500 + заголовок jsonerror: true + {"Message","StackTrace","ExceptionType"}.
// Таблица служб соответствует файлам source/Services/*.asmx (атрибут Class=...).
#nullable disable
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Gts.Api.Compat;

public static class AsmxDispatcher
{
    /// <summary>Файл .asmx -> класс службы (как в source/Services/*.asmx).</summary>
    public static readonly IReadOnlyDictionary<string, Type> Services =
        new Dictionary<string, Type>(StringComparer.OrdinalIgnoreCase)
        {
            ["AI.asmx"] = typeof(global::AI.Framework),
            ["API.asmx"] = typeof(global::API.Framework),
            ["API_ARK.asmx"] = typeof(global::API.ARK),
            ["API_ELEMENT.asmx"] = typeof(global::API.ELEMENT),
            ["Action.asmx"] = typeof(global::Action.Framework),
            ["App.asmx"] = typeof(global::App.Framework),
            ["App2.asmx"] = typeof(global::App2.Framework),
            ["AppRh.asmx"] = typeof(global::AppRh.Framework),
            ["AppToken.asmx"] = typeof(global::AppToken.Framework),
            ["Archive.asmx"] = typeof(global::Archive.Framework),
            ["BI.asmx"] = typeof(global::BI.Framework),
            ["Custom.asmx"] = typeof(global::Custom.Framework),
            ["Desktop.asmx"] = typeof(global::Desktop.Framework),
            ["ExcelPS.asmx"] = typeof(global::ExcelPS.Framework),
            ["Framework.asmx"] = typeof(global::Framework.Framework),
            ["Replication.asmx"] = typeof(global::Replication.Framework),
            ["Report.asmx"] = typeof(global::Report.Framework),
            ["System.asmx"] = typeof(global::System.Framework),
            ["UI.asmx"] = typeof(global::UI.Framework),
            ["Visit.asmx"] = typeof(global::Visit.Framework),
        };

    private static readonly ConcurrentDictionary<(Type, string), MethodInfo> MethodCache = new();

    public static IEndpointRouteBuilder MapAsmxServices(this IEndpointRouteBuilder app)
    {
        app.MapMethods("/Services/{service}/{method}", new[] { "POST", "GET" }, HandleAsync);
        app.MapGet("/Services/{service}", Describe);
        return app;
    }

    /// <summary>Перечень WebMethod службы (вместо стандартной страницы описания ASMX).</summary>
    public static IResult Describe(string service)
    {
        if (!Services.TryGetValue(service, out var type))
            return Results.NotFound($"Служба {service} не найдена.");
        var sb = new StringBuilder();
        sb.AppendLine($"{service} -> {type.FullName}").AppendLine();
        foreach (var m in GetWebMethods(type).OrderBy(m => m.Name))
            sb.AppendLine($"{m.ReturnType.Name} {m.Name}({string.Join(", ", m.GetParameters().Select(p => p.Name + (p.IsOptional ? "?" : "")))})");
        return Results.Text(sb.ToString(), "text/plain; charset=utf-8");
    }

    public static IEnumerable<MethodInfo> GetWebMethods(Type type) =>
        type.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static)
            .Where(m => m.GetCustomAttribute<WebMethodAttribute>() != null);

    private static MethodInfo FindMethod(Type type, string name) =>
        MethodCache.GetOrAdd((type, name), key =>
        {
            var all = GetWebMethods(key.Item1).ToList();
            return all.FirstOrDefault(m => m.Name == key.Item2)
                ?? all.FirstOrDefault(m => string.Equals(m.Name, key.Item2, StringComparison.OrdinalIgnoreCase));
        });

    private static async Task HandleAsync(HttpContext ctx, string service, string method, ILoggerFactory loggers, IHostEnvironment env)
    {
        var log = loggers.CreateLogger("Asmx");

        if (!Services.TryGetValue(service, out var type))
        {
            ctx.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        var mi = FindMethod(type, method);
        if (mi == null)
        {
            await WriteErrorAsync(ctx, env, new ArgumentException($"Unknown web method {method}.\r\nParameter name: methodName"));
            return;
        }

        // Тело запроса читаем асинхронно заранее: перенесённый код синхронный.
        Dictionary<string, object> args;
        try
        {
            args = await ReadArgumentsAsync(ctx);
        }
        catch (JsonException ex)
        {
            await WriteErrorAsync(ctx, env, new ArgumentException("Invalid JSON primitive: " + ex.Message));
            return;
        }

        object[] callArgs;
        try
        {
            callArgs = BindParameters(mi, args);
        }
        catch (Exception ex)
        {
            await WriteErrorAsync(ctx, env, ex);
            return;
        }

        var legacy = System.Web.HttpContext.For(ctx);
        object result;
        try
        {
            object instance = mi.IsStatic ? null : Activator.CreateInstance(type);
            result = mi.Invoke(instance, callArgs);
        }
        catch (TargetInvocationException tie) when (tie.InnerException is System.Web.HttpResponseEndException)
        {
            // Метод сам сформировал ответ (Response.Write + Response.End) — отдаём его как есть.
            await WriteLegacyBufferAsync(ctx, legacy.Response);
            return;
        }
        catch (TargetInvocationException tie)
        {
            var inner = tie.InnerException ?? tie;
            log.LogError(inner, "{Service}/{Method} завершился исключением", service, method);
            await WriteErrorAsync(ctx, env, inner);
            return;
        }

        if (legacy.Response.WasFlushed)
            return; // метод уже сам отправил данные клиенту

        var sb = new StringBuilder();
        if (legacy.Response.HasBufferedOutput)
            sb.Append(legacy.Response.BufferedOutput); // как ASMX: текст из Response.Write идёт перед JSON

        sb.Append("{\"d\":");
        new JavaScriptSerializer().Serialize(mi.ReturnType == typeof(void) ? null : result, sb);
        sb.Append('}');

        ctx.Response.StatusCode = legacy.Response.StatusCodeSet ? legacy.Response.StatusCode : StatusCodes.Status200OK;
        ctx.Response.ContentType = "application/json; charset=utf-8";
        ctx.Response.Headers.CacheControl = "private, max-age=0";
        await ctx.Response.WriteAsync(sb.ToString(), Encoding.UTF8);
    }

    /// <summary>Параметры: JSON-тело (основной случай), форма или строка запроса.</summary>
    private static async Task<Dictionary<string, object>> ReadArgumentsAsync(HttpContext ctx)
    {
        var args = new Dictionary<string, object>(StringComparer.Ordinal);

        if (ctx.Request.HasFormContentType)
        {
            var form = await ctx.Request.ReadFormAsync(ctx.RequestAborted);
            foreach (var kv in form) args[kv.Key] = (string)kv.Value;
        }
        else if (HttpMethods.IsPost(ctx.Request.Method))
        {
            using var reader = new StreamReader(ctx.Request.Body, Encoding.UTF8);
            string body = await reader.ReadToEndAsync(ctx.RequestAborted);
            if (!string.IsNullOrWhiteSpace(body))
            {
                using var doc = JsonDocument.Parse(body);
                if (doc.RootElement.ValueKind == JsonValueKind.Object)
                    foreach (var p in doc.RootElement.EnumerateObject())
                        args[p.Name] = JavaScriptSerializer.FromElement(p.Value);
            }
        }

        // GET: значения в строке запроса — JSON-литералы (как у ScriptService), иначе берём как строку.
        foreach (var kv in ctx.Request.Query)
        {
            if (args.ContainsKey(kv.Key)) continue;
            string raw = kv.Value;
            try
            {
                using var doc = JsonDocument.Parse(raw);
                args[kv.Key] = JavaScriptSerializer.FromElement(doc.RootElement);
            }
            catch (JsonException)
            {
                args[kv.Key] = raw;
            }
        }
        return args;
    }

    private static object[] BindParameters(MethodInfo mi, Dictionary<string, object> args)
    {
        var serializer = new JavaScriptSerializer();
        var ps = mi.GetParameters();
        var values = new object[ps.Length];
        for (int i = 0; i < ps.Length; i++)
        {
            var p = ps[i];
            if (!TryGetArg(args, p.Name, out var raw))
            {
                if (p.IsOptional)
                {
                    values[i] = p.DefaultValue is DBNull ? null : p.DefaultValue;
                    continue;
                }
                // Текст ошибки — как у ASMX.
                throw new InvalidOperationException($"Invalid web service call, missing value for parameter: '{p.Name}'.");
            }
            values[i] = serializer.ConvertToType(raw, p.ParameterType);
        }
        return values;
    }

    private static bool TryGetArg(Dictionary<string, object> args, string name, out object value)
    {
        if (args.TryGetValue(name, out value)) return true;
        foreach (var kv in args)
            if (string.Equals(kv.Key, name, StringComparison.OrdinalIgnoreCase)) { value = kv.Value; return true; }
        value = null;
        return false;
    }

    private static async Task WriteLegacyBufferAsync(HttpContext ctx, System.Web.HttpResponse legacy)
    {
        if (ctx.Response.HasStarted) return;
        ctx.Response.StatusCode = legacy.StatusCode;
        ctx.Response.ContentType = legacy.ContentTypeSet ? legacy.ContentType : "text/html; charset=utf-8";
        await ctx.Response.WriteAsync(legacy.BufferedOutput, Encoding.UTF8);
    }

    private static async Task WriteErrorAsync(HttpContext ctx, IHostEnvironment env, Exception ex)
    {
        if (ctx.Response.HasStarted) return;
        ctx.Response.StatusCode = StatusCodes.Status500InternalServerError;
        ctx.Response.ContentType = "application/json; charset=utf-8";
        ctx.Response.Headers["jsonerror"] = "true";
        var payload = new Dictionary<string, object>
        {
            ["Message"] = ex.Message,
            // Стек вызовов отдаём только при разработке (в legacy он утекал в прод из-за customErrors=Off).
            ["StackTrace"] = env.IsDevelopment() ? ex.StackTrace : "",
            ["ExceptionType"] = ex.GetType().FullName,
        };
        await ctx.Response.WriteAsync(new JavaScriptSerializer().Serialize(payload), Encoding.UTF8);
    }
}
