using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Controllers;

/// <summary>
/// ОБРАЗЕЦ НОВОГО СТИЛЯ для части функций App.asmx (справочники пользователя).
/// Рабочие клиенты пока ходят на /Services/App.asmx/* — см. Compat/AsmxDispatcher.
/// </summary>
[ApiController]
[Route("api/v1/users/{user}")]
[Produces("application/json")]
public sealed class AppController : ControllerBase
{
    private readonly AppService _svc;
    public AppController(AppService svc) => _svc = svc;

    [HttpGet("networks")]
    public async Task<ActionResult<List<Row>>> Networks(string user, CancellationToken ct) => await _svc.GetNetworkAsync(user, ct);

    [HttpGet("points")]
    public async Task<ActionResult<List<Row>>> Points(string user, CancellationToken ct) => await _svc.GetPointAsync(user, ct);

    [HttpGet("categories")]
    public async Task<ActionResult<List<Row>>> Categories(string user, CancellationToken ct) => await _svc.GetCategoryAsync(user, ct);

    [HttpGet("brands")]
    public async Task<ActionResult<List<Row>>> Brands(string user, CancellationToken ct) => await _svc.GetBrandAsync(user, ct);

    [HttpGet("arts")]
    public async Task<ActionResult<List<Row>>> Arts(string user, CancellationToken ct) => await _svc.GetArtAsync(user, ct);

    [HttpGet("company-setting")]
    public async Task<ActionResult<List<Row>>> CompanySetting(string user, CancellationToken ct) => await _svc.GetCompanySettingAsync(user, ct);
}
