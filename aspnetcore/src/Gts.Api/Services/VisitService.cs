using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Data;
using Gts.Api.Infrastructure;
using Microsoft.Data.SqlClient;

namespace Gts.Api.Services;

/// <summary>
/// Порт legacy VisitBusiness (DbProc.cs) + Visit.Framework (Visit.cs).
/// Процедуры VISIT.* и параметры — 1:1 с оригиналом.
/// </summary>
public sealed class VisitService
{
    private readonly IDatabase _db;
    public VisitService(IDatabase db) => _db = db;

    private static object Db(string? v) => string.IsNullOrEmpty(v) ? DBNull.Value : v;

    /// <summary>Список фото по визиту (было: VisitBusiness.GetPhotoByVisit).</summary>
    public Task<List<Row>> GetPhotoByVisitAsync(
        string? company, string? point, string? user, string? borned, CancellationToken ct)
    {
        var cmd = new SqlCommand("VISIT.GetPhotoByVisit");
        cmd.Parameters.Add("@Company", SqlDbType.Int).Value = Db(company);
        cmd.Parameters.Add("@Point", SqlDbType.Int).Value = Db(point);
        cmd.Parameters.Add("@User", SqlDbType.Int).Value = Db(user);
        cmd.Parameters.Add("@Borned", SqlDbType.Date).Value = Db(borned);
        return _db.SelectAsync(cmd, ct: ct);
    }

    /// <summary>Создание визита (было: VisitBusiness.SetVisit, ExecuteSilent).</summary>
    public Task SetVisitAsync(string? point, string? user, string? borned, CancellationToken ct)
    {
        var cmd = new SqlCommand("VISIT.SetVisit");
        cmd.Parameters.Add("@Point", SqlDbType.Int).Value = Db(point);
        cmd.Parameters.Add("@User", SqlDbType.Int).Value = Db(user);
        cmd.Parameters.Add("@Borned", SqlDbType.Date).Value = Db(borned);
        return _db.ExecuteNonQueryAsync(cmd, caller: nameof(SetVisitAsync), ct: ct);
    }
}
