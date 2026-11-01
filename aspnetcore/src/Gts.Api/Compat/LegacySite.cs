// Раздача старого сайта (папка source/) и страниц *.aspx из ASP.NET Core.
// Благодаря этому весь сайт (index.html, desktop/*, webix, фото) работает из одного приложения .NET 8,
// а JS-файлы с относительными адресами вида '../Services/Visit.asmx/...' не требуют правок.
#nullable disable
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

namespace Gts.Api.Compat;

public static class LegacySite
{
    /// <summary>Сегменты пути, которые IIS по умолчанию не отдаёт (hiddenSegments), исходники и журнал ошибок logs/.</summary>
    private static readonly string[] HiddenSegments =
        { "bin", "app_code", "app_data", "logs", "app_browsers", "app_globalresources", "app_localresources", "app_webreferences" };

    private static readonly string[] DeniedExtensions =
        { ".cs", ".config", ".log", ".asax", ".csproj", ".sln", ".dll", ".pdb", ".ps1", ".asmx" };

    /// <summary>Страницы .aspx -> классы, перенесённые в Legacy/Pages.</summary>
    private static readonly Dictionary<string, Func<System.Web.UI.Page>> Pages =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["/upload.aspx"] = () => new UploadPage(),
            ["/uploadUser.aspx"] = () => new UploadUserPage(),
            ["/uploadExcel.aspx"] = () => new UploadExcelPage(),
            ["/soundUploader.aspx"] = () => new SoundUploaderPage(),
            ["/Refresh.aspx"] = () => new RefreshPage(),
        };

    public static IEndpointRouteBuilder MapLegacyPages(this IEndpointRouteBuilder app)
    {
        foreach (var (path, factory) in Pages)
            app.MapMethods(path, new[] { "GET", "POST" }, ctx => RunPageAsync(ctx, factory()));
        return app;
    }

    private static async Task RunPageAsync(HttpContext ctx, System.Web.UI.Page page)
    {
        if (ctx.Request.HasFormContentType)
            await ctx.Request.ReadFormAsync(ctx.RequestAborted); // чтобы синхронный Request.Form не блокировал поток

        var legacy = System.Web.HttpContext.For(ctx);

        // Страница синхронная (Refresh.aspx вообще держит соединение в цикле) — выполняем в пуле потоков.
        await Task.Run(() => page.ProcessRequest(legacy), ctx.RequestAborted).ConfigureAwait(false);

        if (ctx.Response.HasStarted && !legacy.Response.HasBufferedOutput) return;
        if (!ctx.Response.HasStarted && !legacy.Response.ContentTypeSet)
            ctx.Response.ContentType = "text/html; charset=utf-8";
        if (legacy.Response.HasBufferedOutput)
            await ctx.Response.WriteAsync(legacy.Response.BufferedOutput, Encoding.UTF8);
    }

    /// <summary>Статические файлы старого сайта: index.html, desktop/*, webix, Photos/… .</summary>
    public static IApplicationBuilder UseLegacyStaticFiles(this IApplicationBuilder app, string webRoot)
    {
        // Запрет служебных путей — как в IIS.
        app.Use(async (ctx, next) =>
        {
            var path = ctx.Request.Path.Value ?? "/";
            var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
            bool hidden = segments.Any(s => HiddenSegments.Contains(s, StringComparer.OrdinalIgnoreCase))
                          || segments.Any(s => s.Equals("web.config", StringComparison.OrdinalIgnoreCase));
            bool deniedExt = !path.StartsWith("/Services/", StringComparison.OrdinalIgnoreCase)
                             && DeniedExtensions.Contains(Path.GetExtension(path), StringComparer.OrdinalIgnoreCase);
            if (hidden || deniedExt)
            {
                ctx.Response.StatusCode = StatusCodes.Status404NotFound;
                return;
            }
            await next();
        });

        var files = new PhysicalFileProvider(webRoot);

        var types = new FileExtensionContentTypeProvider();
        types.Mappings[".woff"] = "application/x-font-woff"; // как в web.config
        types.Mappings[".woff2"] = "font/woff2";
        types.Mappings[".otf"] = "font/otf";
        types.Mappings[".htc"] = "text/x-component";
        types.Mappings[".manifest"] = "text/cache-manifest";

        var defaults = new DefaultFilesOptions { FileProvider = files };
        defaults.DefaultFileNames.Clear();
        foreach (var n in new[] { "index.html", "index.htm", "default.htm", "default.html" })
            defaults.DefaultFileNames.Add(n);
        app.UseDefaultFiles(defaults);

        app.UseStaticFiles(new StaticFileOptions { FileProvider = files, ContentTypeProvider = types });
        return app;
    }
}
