namespace Gts.Api.Infrastructure;

/// <summary>
/// Одна строка результата: имя колонки -> значение (как Dictionary в старом ShareMethods).
/// Сохраняем порядок колонок, поэтому обычный Dictionary (insertion order) подходит.
/// </summary>
public sealed class Row : Dictionary<string, object?>
{
}
