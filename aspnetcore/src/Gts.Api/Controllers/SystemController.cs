using System.Text.Json;
using Gts.Api.Compatibility;
using Gts.Api.Infrastructure;
using Gts.Api.Security;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Controllers;

/// <summary>
/// ASMX-совместимый фасад для System.asmx.
/// Маршрут и форма ответа повторяют ScriptService, поэтому мобильные клиенты
/// (ServerConnection.kt и iPhone-аналог) работают БЕЗ изменений.
/// </summary>
[ApiController]
[Route("Services/System.asmx")]
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

    // --- Запросы (именованные параметры в JSON-теле, как слал ASMX ScriptService) ---
    public sealed record PhoneRequest(string? Phone);
    public sealed record LogonRequest(string? Phone, string? Pass);
    public sealed record AuthorizationRequest(string? Phone, string? UserID, string? Company, string? Pass, string? Magic);
    public sealed record UserRequest(string? User);
    public sealed record SetUserPassRequest(string? Phone, string? Pass);
    public sealed record FileNameRequest(string? FileName);

    [HttpPost("ConnectionSetting")]
    public IActionResult ConnectionSetting()
    {
        // Legacy возвращал string[4] -> ScriptService клал в d массив.
        var values = new[]
        {
            _cfg["Gts:Language"],
            _cfg["Gts:SiteAddress"],
            _cfg["Gts:MobSiteAddress"],
            _cfg["Gts:AboutGts"]
        };
        return AsmxResult.FromRawJson(JsonSerializer.Serialize(values));
    }

    [HttpPost("UserExist")]
    public async Task<IActionResult> UserExist([FromBody] PhoneRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.UserExistAsync(req.Phone, ct)));

    [HttpPost("Logon")]
    public async Task<IActionResult> Logon([FromBody] LogonRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.LogonAsync(req.Phone, req.Pass, ct)));

    [HttpPost("Authorization")]
    public async Task<IActionResult> Authorization([FromBody] AuthorizationRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(
            await _svc.AuthorizationAsync(req.Phone, req.UserID, req.Company, req.Pass, req.Magic, ct)));

    [HttpPost("GetUserInfo")]
    public async Task<IActionResult> GetUserInfo([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetUserInfoAsync(req.User, ct)));

    [HttpPost("SetUserPass")]
    public async Task<IActionResult> SetUserPass([FromBody] SetUserPassRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.SetUserPassAsync(req.Phone, req.Pass, ct)));

    [HttpPost("Test")]
    public IActionResult Test() => AsmxResult.FromJsonString("Test OK");

    /// <summary>
    /// Фото в base64. ИСПРАВЛЕНО относительно legacy: путь проверяется на обход каталога.
    /// Форма ответа совпадает со старой: строка [{ "FileName": "data:image/png;base64,..." }].
    /// </summary>
    [HttpPost("GetPhotoBase64")]
    public async Task<IActionResult> GetPhotoBase64([FromBody] FileNameRequest req, CancellationToken ct)
    {
        var photosRoot = Path.Combine(_env.ContentRootPath, "Photos");
        var safePath = PhotoPath.ResolveWithin(photosRoot, req.FileName ?? "");

        if (safePath is null || !System.IO.File.Exists(safePath))
            return AsmxResult.FromJsonString("[]");

        var bytes = await System.IO.File.ReadAllBytesAsync(safePath, ct);
        var dataUri = "data:image/png;base64," + Convert.ToBase64String(bytes);

        // один объект с полем FileName — как в legacy
        var payload = LegacyJson.SerializeRows(new List<Row> { new() { ["FileName"] = dataUri } });
        return AsmxResult.FromJsonString(payload);
    }
}
