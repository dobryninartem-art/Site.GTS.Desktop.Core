using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Data;
using Gts.Api.Infrastructure;
using Microsoft.Data.SqlClient;

namespace Gts.Api.Services;

/// <summary>
/// Порт среза legacy AppBusiness (из DbProc.cs) + App.Framework (App.cs).
/// Здесь перенесены представительные методы-ЧТЕНИЯ (простая сигнатура @User:int),
/// покрывающие самый массовый паттерн сервиса App (всего в нём 122 метода).
///
/// Процедуры APP.* и их параметры сохранены 1:1.
/// </summary>
public sealed class AppService
{
    private readonly IDatabase _db;
    public AppService(IDatabase db) => _db = db;

    private Task<List<Row>> ByUser(string proc, string? user, CancellationToken ct)
    {
        var cmd = new SqlCommand(proc);
        cmd.Parameters.Add("@User", SqlDbType.Int).Value =
            string.IsNullOrEmpty(user) ? DBNull.Value : user;
        return _db.SelectAsync(cmd, ct: ct);
    }

    public Task<List<Row>> GetNetworkAsync(string? user, CancellationToken ct) => ByUser("APP.GetNetwork", user, ct);
    public Task<List<Row>> GetPointAsync(string? user, CancellationToken ct) => ByUser("APP.GetPoint", user, ct);
    public Task<List<Row>> GetCategoryAsync(string? user, CancellationToken ct) => ByUser("APP.GetCategory", user, ct);
    public Task<List<Row>> GetBrandAsync(string? user, CancellationToken ct) => ByUser("APP.GetBrand", user, ct);
    public Task<List<Row>> GetArtAsync(string? user, CancellationToken ct) => ByUser("APP.GetArt", user, ct);
    public Task<List<Row>> GetCompanySettingAsync(string? user, CancellationToken ct) => ByUser("APP.GetCompanySetting", user, ct);
}
