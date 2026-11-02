using System;
using System.IO;
using Gts.Api.Compat;
using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------------------------------------
// 1. Корень старого сайта (папка source/): оттуда отдаются index.html, desktop/*, webix, фото,
//    и туда же пишут перенесённые методы (Server.MapPath("/") + "Photos/...").
// ---------------------------------------------------------------------------
string webRoot = Path.GetFullPath(Path.Combine(
    builder.Environment.ContentRootPath,
    builder.Configuration["Gts:LegacyWebRoot"] ?? Path.Combine("..", "..", "..", "source")));
if (!Directory.Exists(webRoot))
    throw new DirectoryNotFoundException(
        $"Не найдена папка старого сайта: {webRoot}. Укажите путь в настройке Gts:LegacyWebRoot.");

// ---------------------------------------------------------------------------
// 2. Строка подключения. В старом проекте использовался System.Data.SqlClient, где шифрование
//    по умолчанию выключено. В Microsoft.Data.SqlClient оно включено, и подключение к локальному
//    SQL Server с самоподписанным сертификатом падает. Если Encrypt не задан явно — сохраняем
//    прежнее поведение.
// ---------------------------------------------------------------------------
string? cs = builder.Configuration.GetConnectionString("Database");
if (!string.IsNullOrEmpty(cs) && cs.IndexOf("Encrypt", StringComparison.OrdinalIgnoreCase) < 0)
    builder.Configuration["ConnectionStrings:Database"] = cs.TrimEnd(';') + ";Encrypt=False";

// ---------------------------------------------------------------------------
// 3. Ограничение размера запроса — как maxRequestLength в Web.config (16 МБ).
// ---------------------------------------------------------------------------
long maxBody = (builder.Configuration.GetValue<long?>("Gts:MaxRequestBodyMb") ?? 16) * 1024 * 1024;
builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = maxBody);
builder.Services.Configure<IISServerOptions>(o => o.MaxRequestBodySize = maxBody);
builder.Services.Configure<FormOptions>(o => o.MultipartBodyLengthLimit = maxBody);

// ---------------------------------------------------------------------------
// 4. Сервисы.
// ---------------------------------------------------------------------------
builder.Services.AddHttpContextAccessor(); // нужен для HttpContext.Current в перенесённом коде

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNameCaseInsensitive = true);

// Новый стиль (образцы в Controllers/ и Services/): async-доступ к БД через DI.
builder.Services.AddScoped<IDatabase, SqlDatabase>();
builder.Services.AddScoped<SystemService>();
builder.Services.AddScoped<AppService>();
builder.Services.AddScoped<VisitService>();

#if !OFFLINE_CHECK
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Уникальный schemaId по полному имени типа: страхует от коллизий вложенных
    // типов-запросов (PhoneRequest, SetVisitRequest и т.п.) — частая причина 500 на swagger.json.
    c.CustomSchemaIds(t => (t.FullName ?? t.Name).Replace("+", "."));
});
#endif

var app = builder.Build();

// Слой совместимости System.Web: конфигурация, HttpContext.Current, Server.MapPath.
System.Configuration.ConfigurationManager.Initialize(app.Configuration);
System.Web.HttpContext.Accessor = app.Services.GetRequiredService<IHttpContextAccessor>();
System.Web.HttpContext.WebRootPath = webRoot;

// ---------------------------------------------------------------------------
// 5. Конвейер обработки запроса.
// ---------------------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
#if !OFFLINE_CHECK
    app.UseSwagger();
    app.UseSwaggerUI();
#endif
}
else
{
    app.UseHsts();
    app.UseHttpsRedirection(); // в legacy редирект на https был закомментирован в Web.config
}

app.UseLegacyStaticFiles(webRoot);  // страницы, js, css, фото из source/

app.MapAsmxServices();              // /Services/*.asmx/*  — все 510 методов старого API
app.MapLegacyPages();               // /upload.aspx, /Refresh.aspx и др.
app.MapControllers();               // /api/v1/*           — образцы нового REST API

app.Run();

/// <summary>Нужен для интеграционных тестов (WebApplicationFactory).</summary>
public partial class Program { }
