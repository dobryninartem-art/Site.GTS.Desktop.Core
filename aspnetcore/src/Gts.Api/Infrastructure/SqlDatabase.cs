using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Text;
using Microsoft.Data.SqlClient;

namespace Gts.Api.Infrastructure;

/// <summary>
/// Реализация <see cref="IDatabase"/> поверх Microsoft.Data.SqlClient.
///
/// МУЛЬТИАРЕНДНОСТЬ. В legacy база выбиралась строковой заменой "GTS" в строке
/// подключения (StoredProc: connectionString.Replace("GTS", Base)). Это хрупко
/// (ломается, если "GTS" встречается ещё где-то в строке) и опиралось на static-поле.
/// Здесь мы меняем ТОЛЬКО InitialCatalog через SqlConnectionStringBuilder — надёжно,
/// без побочных замен. Поведение по умолчанию (база "GTS") сохранено.
/// </summary>
public sealed class SqlDatabase : IDatabase
{
    private const int CommandTimeoutSeconds = 300;
    private const string DefaultBase = "GTS";

    private readonly string _baseConnectionString;
    private readonly ILogger<SqlDatabase> _log;

    public SqlDatabase(IConfiguration config, ILogger<SqlDatabase> log)
    {
        _log = log;
        _baseConnectionString =
            config.GetConnectionString("Database")
            ?? throw new InvalidOperationException(
                "Строка подключения 'Database' не задана. Укажите переменную окружения " +
                "ConnectionStrings__Database или User Secrets (ConnectionStrings:Database). " +
                "НЕ храните её в appsettings.json.");
    }

    private string BuildConnectionString(string? baseName, out string actualDatabase)
    {
        baseName ??= DefaultBase;
        var builder = new SqlConnectionStringBuilder(_baseConnectionString);
        if (!string.Equals(baseName, DefaultBase, StringComparison.Ordinal))
            builder.InitialCatalog = baseName;
        actualDatabase = builder.InitialCatalog;
        return builder.ConnectionString;
    }

    public async Task<List<Row>> SelectAsync(SqlCommand command, string? baseName = null, CancellationToken ct = default)
    {
        var cs = BuildConnectionString(baseName, out var db);
        try
        {
            await using var conn = new SqlConnection(cs);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandTimeout = CommandTimeoutSeconds;
            await conn.OpenAsync(ct);
            await using var reader = await command.ExecuteReaderAsync(ct);
            return await ReadTableAsync(reader, ct);
        }
        catch (Exception ex)
        {
            LogError("Select", db, command, ex);
            return new List<Row>(); // как legacy: пустая выборка вместо падения
        }
    }

    public async Task<List<List<Row>>> SelectManyAsync(SqlCommand command, string? baseName = null, CancellationToken ct = default)
    {
        var cs = BuildConnectionString(baseName, out var db);
        var result = new List<List<Row>>();
        try
        {
            await using var conn = new SqlConnection(cs);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandTimeout = CommandTimeoutSeconds;
            await conn.OpenAsync(ct);
            await using var reader = await command.ExecuteReaderAsync(ct);
            do
            {
                result.Add(await ReadTableAsync(reader, ct));
            }
            while (await reader.NextResultAsync(ct));
            return result;
        }
        catch (Exception ex)
        {
            LogError("SelectMany", db, command, ex);
            return new List<List<Row>>();
        }
    }

    public async Task<string> ExecuteAsync(SqlCommand command, string? baseName = null, string? caller = null, CancellationToken ct = default)
    {
        var cs = BuildConnectionString(baseName, out var db);
        try
        {
            await using var conn = new SqlConnection(cs);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandTimeout = CommandTimeoutSeconds;
            await conn.OpenAsync(ct);
            await command.ExecuteNonQueryAsync(ct);
            return "";
        }
        catch (SqlException ex)
        {
            LogError("Execute", db, command, ex, caller);
            return $"SqlError {ex.Number}: {ex.Message}";
        }
        catch (Exception ex)
        {
            LogError("Execute", db, command, ex, caller);
            return $"Error: {ex.Message}";
        }
    }

    public async Task ExecuteNonQueryAsync(SqlCommand command, string? baseName = null, string? caller = null, CancellationToken ct = default)
    {
        var cs = BuildConnectionString(baseName, out var db);
        try
        {
            await using var conn = new SqlConnection(cs);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandTimeout = CommandTimeoutSeconds;
            await conn.OpenAsync(ct);
            await command.ExecuteNonQueryAsync(ct);
        }
        catch (Exception ex)
        {
            LogError("ExecuteNonQuery", db, command, ex, caller);
            // как ExecuteSilent — глушим, пишем в лог
        }
    }

    private static async Task<List<Row>> ReadTableAsync(SqlDataReader reader, CancellationToken ct)
    {
        var rows = new List<Row>();
        if (!reader.HasRows && reader.FieldCount == 0)
            return rows;

        var names = new string[reader.FieldCount];
        for (int i = 0; i < names.Length; i++)
            names[i] = reader.GetName(i);

        while (await reader.ReadAsync(ct))
        {
            var row = new Row();
            for (int i = 0; i < names.Length; i++)
            {
                var v = await reader.IsDBNullAsync(i, ct) ? null : reader.GetValue(i);
                row[names[i]] = v;
            }
            rows.Add(row);
        }
        return rows;
    }

    private void LogError(string op, string db, SqlCommand command, Exception ex, string? caller = null)
    {
        // Аналог DbProc.LogError + FormatParameters, но через ILogger, без файла на диске.
        string parms = FormatParameters(command);
        string callerInfo = string.IsNullOrEmpty(caller) ? "" : $" | Caller={caller}";
        _log.LogError(ex,
            "[{Op}] {Type} | Base={Db} | Proc={Proc}{Caller} | Params=[{Params}]",
            op, ex.GetType().Name, db, command.CommandText, callerInfo, parms);
    }

    private static string FormatParameters(SqlCommand command)
    {
        var sb = new StringBuilder();
        foreach (SqlParameter p in command.Parameters)
        {
            if (sb.Length > 0) sb.Append(", ");
            sb.Append(p.ParameterName).Append('=').Append(p.Value ?? "null");
        }
        return sb.ToString();
    }
}
