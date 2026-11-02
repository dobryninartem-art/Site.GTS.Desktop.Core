using System.Globalization;
using Gts.Api.Compatibility;
using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Controllers;

/// <summary>
/// ASMX-совместимый фасад для App.asmx (перенесён представительный срез из 122 методов).
/// </summary>
[ApiController]
[Route("Services/App.asmx")]
[Produces("application/json")]
public sealed class AppController : ControllerBase
{
    private readonly AppService _svc;
    public AppController(AppService svc) => _svc = svc;

    public sealed record UserRequest(string? User);

    [HttpPost("GetServerDate")]
    public IActionResult GetServerDate()
    {
        // ВНИМАНИЕ: legacy использовал формат "dd.mm.yyyy", где mm — это МИНУТЫ, а не месяц.
        // Это существующий баг в оригинале. Для верности порта оставляем поведение,
        // но в MIGRATION.md помечено как кандидат на исправление ("dd.MM.yyyy").
        var legacyLiteral = DateTime.Now.ToString("dd.mm.yyyy", CultureInfo.InvariantCulture);
        return AsmxResult.FromJsonString(legacyLiteral);
    }

    [HttpPost("GetNetwork")]
    public async Task<IActionResult> GetNetwork([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetNetworkAsync(req.User, ct)));

    [HttpPost("GetPoint")]
    public async Task<IActionResult> GetPoint([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetPointAsync(req.User, ct)));

    [HttpPost("GetCategory")]
    public async Task<IActionResult> GetCategory([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetCategoryAsync(req.User, ct)));

    [HttpPost("GetBrand")]
    public async Task<IActionResult> GetBrand([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetBrandAsync(req.User, ct)));

    [HttpPost("GetArt")]
    public async Task<IActionResult> GetArt([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetArtAsync(req.User, ct)));

    [HttpPost("GetCompanySetting")]
    public async Task<IActionResult> GetCompanySetting([FromBody] UserRequest req, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetCompanySettingAsync(req.User, ct)));
}
