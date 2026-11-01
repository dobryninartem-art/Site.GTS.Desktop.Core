using System.Data;
using Gts.Api.Infrastructure;
using Microsoft.Data.SqlClient;

namespace Gts.Api.Services;

/// <summary>
/// Порт legacy SystemBusiness (из DbProc.cs) + тонкого System.Framework (System.cs).
/// Имена процедур (SYSTEM.Logon и т.д.) и параметры сохранены 1:1 — БД не трогаем.
///
/// Отличия от legacy, кроме async:
///   * нормализация телефона вынесена сюда (была в asmx-обёртке);
///   * убран статический StoredProc.BaseName — база выбирается через GetBase(User)
///     и передаётся параметром, без общего изменяемого состояния.
/// </summary>
public sealed class SystemService
{
    private readonly IDatabase _db;
    public SystemService(IDatabase db) => _db = db;

    private static string NormalizePhone(string? phone) =>
        (phone ?? string.Empty).Trim()
            .Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

    public Task<List<Row>> UserExistAsync(string? phone, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.UserExist");
        cmd.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = NormalizePhone(phone);
        return _db.SelectAsync(cmd, ct: ct);
    }

    public Task<List<Row>> SetUserPassAsync(string? phone, string? pass, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.SetUserPass");
        cmd.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = NormalizePhone(phone);
        cmd.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = (object?)pass?.Trim() ?? DBNull.Value;
        return _db.SelectAsync(cmd, ct: ct);
    }

    public Task<List<Row>> LogonAsync(string? phone, string? pass, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.Logon");
        cmd.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = NormalizePhone(phone);
        cmd.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = (object?)pass?.Trim() ?? DBNull.Value;
        return _db.SelectAsync(cmd, ct: ct);
    }

    public Task<List<Row>> AuthorizationAsync(
        string? phone, string? userId, string? company, string? pass, string? magic, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.Authorization");
        cmd.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = NormalizePhone(phone);
        cmd.Parameters.Add("@UserID", SqlDbType.Int).Value = ToDb(userId);
        cmd.Parameters.Add("@Company", SqlDbType.Int).Value = ToDb(company);
        cmd.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = (object?)pass?.Trim() ?? DBNull.Value;
        cmd.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = (object?)magic ?? DBNull.Value;
        return _db.SelectAsync(cmd, ct: ct);
    }

    public Task<List<Row>> GetUserInfoAsync(string? user, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.GetUserInfo");
        cmd.Parameters.Add("@User", SqlDbType.Int).Value = ToDb(user);
        return _db.SelectAsync(cmd, ct: ct);
    }

    /// <summary>Определение базы пользователя через OUTPUT-параметр (аналог SystemBusiness.GetBase).</summary>
    public async Task<string> GetBaseAsync(string? user, CancellationToken ct)
    {
        var cmd = new SqlCommand("SYSTEM.GetBase");
        var baseName = cmd.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
        baseName.Direction = ParameterDirection.InputOutput;
        baseName.Value = DBNull.Value;
        cmd.Parameters.Add("@User", SqlDbType.Int).Value = ToDb(user);

        await _db.ExecuteNonQueryAsync(cmd, caller: nameof(GetBaseAsync), ct: ct);
        return baseName.Value?.ToString() ?? string.Empty;
    }

    // Строки от клиента (Map<String,String>) приводим к int-параметру через object,
    // как это делал legacy (там object шёл прямо в SqlDbType.Int).
    private static object ToDb(string? v) =>
        string.IsNullOrEmpty(v) ? DBNull.Value : v;
}
