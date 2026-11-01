using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace Gts.Api.Infrastructure;

/// <summary>
/// Асинхронная замена статического класса <c>StoredProc</c> из DbProc.cs.
/// Отличия от legacy:
///   * всё async/await (сервер держит кратно больше одновременных запросов);
///   * строка подключения и выбор базы инкапсулированы, без static-состояния
///     (убрана гонка со статическим StoredProc.BaseName);
///   * тот же договор: выполняем ХРАНИМУЮ ПРОЦЕДУРУ, параметры добавляет вызывающий.
///
/// Имена процедур и параметры при портировании остаются 1:1 с оригиналом.
/// </summary>
public interface IDatabase
{
    /// <summary>Одна выборка -> список строк. Аналог StoredProc.Select.</summary>
    Task<List<Row>> SelectAsync(SqlCommand command, string? baseName = null, CancellationToken ct = default);

    /// <summary>Несколько выборок из одной процедуры. Аналог StoredProc.SelectMany.</summary>
    Task<List<List<Row>>> SelectManyAsync(SqlCommand command, string? baseName = null, CancellationToken ct = default);

    /// <summary>Выполнение без результата; возвращает "" при успехе или текст ошибки. Аналог StoredProc.Execute.</summary>
    Task<string> ExecuteAsync(SqlCommand command, string? baseName = null, string? caller = null, CancellationToken ct = default);

    /// <summary>
    /// Разворачивает выходные параметры (OUTPUT) обратно вызывающему: после await
    /// у переданной команды заполнены Direction=Output/InputOutput параметры. Аналог ExecuteSilent + чтение out.
    /// </summary>
    Task ExecuteNonQueryAsync(SqlCommand command, string? baseName = null, string? caller = null, CancellationToken ct = default);
}
