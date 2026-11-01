using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Gts.Api.Infrastructure;
using Gts.Api.Security;
using Gts.Api.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Gts.Api.Controllers;

/// <summary>
/// ОБРАЗЕЦ НОВОГО СТИЛЯ (REST + async + DI) для функций System.asmx.
/// Сайт и мобильные приложения сейчас работают через /Services/System.asmx/* (Compat/AsmxDispatcher),
/// эти адреса — заготовка для постепенного перевода клиентов на чистый REST.
/// Ответ — обычный JSON без обёртки {"d": ...}.
/// </summary>
[ApiController]
[Route("api/v1/system")]
[Produces("application/json")]
public sealed class SystemController : ControllerBase
{
    private readonly SystemService _svc;
    private readonly IConfiguration _cfg;
    private readonly IWebHostEnvironment _env;

    public SystemController(SystemService svc, IConfiguration cfg, IWebHostEnvironment env)
    {
        _svc = svc;
        _cfg = cfg;
        _env = env;
    }

    public sealed record PhoneRequest(string? Phone);
    public sealed record LogonRequest(string? Phone, string? Pass);
    public sealed record AuthorizationRequest(string? Phone, string? UserID, string? Company, string? Pass, string? Magic);

    /// <summary>Региональные настройки сайта.</summary>
    [HttpGet("settings")]
    public IActionResult Settings() => Ok(new
    {
        Language = _cfg["AppSettings:Language"],
        SiteAddress = _cfg["AppSettings:SiteAddress"],
        MobSiteAddress = _cfg["AppSettings:MobSiteAddress"],
        AboutGts = _cfg["AppSettings:AboutGts"],
    });

    [HttpPost("user-exist")]
    public async Task<ActionResult<List<Row>>> UserExist([FromBody] PhoneRequest r, CancellationToken ct)
        => await _svc.UserExistAsync(r.Phone, ct);

    [HttpPost("logon")]
    public async Task<ActionResult<List<Row>>> Logon([FromBody] LogonRequest r, CancellationToken ct)
        => await _svc.LogonAsync(r.Phone, r.Pass, ct);

    [HttpPost("authorization")]
    public async Task<ActionResult<List<Row>>> Authorization([FromBody] AuthorizationRequest r, CancellationToken ct)
        => await _svc.AuthorizationAsync(r.Phone, r.UserID, r.Company, r.Pass, r.Magic, ct);

    [HttpGet("users/{user}")]
    public async Task<ActionResult<List<Row>>> GetUserInfo(string user, CancellationToken ct)
        => await _svc.GetUserInfoAsync(user, ct);

    /// <summary>Фото в base64. Путь проверяется: выйти за пределы папки Photos нельзя.</summary>
    [HttpGet("photo-base64")]
    public async Task<IActionResult> GetPhotoBase64([FromQuery] string fileName, CancellationToken ct)
    {
        var webRoot = System.Web.HttpContext.WebRootPath ?? _env.ContentRootPath;
        var safePath = PhotoPath.ResolveWithin(Path.Combine(webRoot, "Photos"), fileName ?? "");
        if (safePath is null || !System.IO.File.Exists(safePath))
            return NotFound();

        var bytes = await System.IO.File.ReadAllBytesAsync(safePath, ct);
        return Ok(new { FileName = "data:image/png;base64," + Convert.ToBase64String(bytes) });
    }
}
