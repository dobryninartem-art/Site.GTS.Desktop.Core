using Gts.Api.Compatibility;
using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Controllers;

/// <summary>
/// ASMX-совместимый фасад для Visit.asmx. Вызовы из desktop/js/edit_visit.js
/// ('../Services/Visit.asmx/GetPhotoByVisit', '.../SetVisit') работают без изменений JS.
/// </summary>
[ApiController]
[Route("Services/Visit.asmx")]
[Produces("application/json")]
public sealed class VisitController : ControllerBase
{
    private readonly VisitService _svc;
    public VisitController(VisitService svc) => _svc = svc;

    // Имена полей = ключи в JSON.stringify({...}) на стороне JS.
    // Лишние поля (например, 'GUID', который шлёт edit_visit.js) просто игнорируются.
    public sealed record PhotoByVisitRequest(string? Company, string? Point, string? User, string? Borned);
    public sealed record SetVisitRequest(string? Point, string? User, string? Borned);

    [HttpPost("GetPhotoByVisit")]
    public async Task<IActionResult> GetPhotoByVisit([FromBody] PhotoByVisitRequest r, CancellationToken ct)
        => AsmxResult.FromJsonString(LegacyJson.SerializeRows(
            await _svc.GetPhotoByVisitAsync(r.Company, r.Point, r.User, r.Borned, ct)));

    [HttpPost("SetVisit")]
    public async Task<IActionResult> SetVisit([FromBody] SetVisitRequest r, CancellationToken ct)
    {
        await _svc.SetVisitAsync(r.Point, r.User, r.Borned, ct);
        return AsmxResult.FromRawJson("null"); // void-метод ASMX отвечал {"d":null}
    }
}
