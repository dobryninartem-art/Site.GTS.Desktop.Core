using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Controllers;

/// <summary>
/// ОБРАЗЕЦ НОВОГО СТИЛЯ для функций Visit.asmx.
/// Сравните с вызовом из desktop/js/edit_visit.js, который сейчас идёт на /Services/Visit.asmx/GetPhotoByVisit:
///   было:  POST /Services/Visit.asmx/GetPhotoByVisit  {"Company":1,"Point":2,"User":3,"Borned":"2026-11-01"}  -> {"d":"[...]"}
///   будет: GET  /api/v1/visits/photos?company=1&amp;point=2&amp;user=3&amp;borned=2026-11-01                -> [...]
/// </summary>
[ApiController]
[Route("api/v1/visits")]
[Produces("application/json")]
public sealed class VisitController : ControllerBase
{
    private readonly VisitService _svc;
    public VisitController(VisitService svc) => _svc = svc;

    public sealed record SetVisitRequest(string? Point, string? User, string? Borned);

    [HttpGet("photos")]
    public async Task<ActionResult<List<Row>>> Photos(
        [FromQuery] string? company, [FromQuery] string? point, [FromQuery] string? user, [FromQuery] string? borned,
        CancellationToken ct)
        => await _svc.GetPhotoByVisitAsync(company, point, user, borned, ct);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SetVisitRequest r, CancellationToken ct)
    {
        await _svc.SetVisitAsync(r.Point, r.User, r.Borned, ct);
        return NoContent();
    }
}
