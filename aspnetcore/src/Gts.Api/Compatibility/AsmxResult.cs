using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Gts.Api.Compatibility;

/// <summary>
/// Воспроизводит ответ ASMX ScriptService: тело оборачивается в { "d": &lt;payload&gt; }.
///
/// Это ТОЧКА, ради которой мобильные приложения не нужно переписывать.
/// ServerConnection.kt (Android) делает: JSONObject(body)["d"] — то есть ждёт ключ "d".
///
/// В legacy методы возвращали строку JSON (SerializeDataJSON), и ScriptService клал её
/// в "d" как СТРОКУ: {"d":"[{...}]"}. Мы повторяем ровно это: payload — уже готовая
/// JSON-строка, здесь она сериализуется как строковое значение поля d.
/// </summary>
public sealed class AsmxResult : IActionResult
{
    private readonly string _payload;
    private readonly bool _payloadIsString;

    private AsmxResult(string payload, bool payloadIsString)
    {
        _payload = payload;
        _payloadIsString = payloadIsString;
    }

    /// <summary>
    /// Для методов, что в legacy возвращали string (почти все: SerializeDataJSON).
    /// payload кладётся в d КАК СТРОКА: {"d":"[{...}]"}.
    /// </summary>
    public static AsmxResult FromJsonString(string payloadJsonString) => new(payloadJsonString, true);

    /// <summary>
    /// Для методов, что возвращали НЕ строку (string[], объект, число): ScriptService
    /// клал туда соответствующий JSON. payload — уже готовый JSON: {"d":[...]} / {"d":{...}}.
    /// </summary>
    public static AsmxResult FromRawJson(string rawJson) => new(rawJson, false);

    public async Task ExecuteResultAsync(ActionContext context)
    {
        var sb = new StringBuilder(_payload.Length + 16);
        sb.Append("{\"d\":");
        if (_payloadIsString)
            AppendJsonStringValue(sb, _payload);   // экранируем как строку
        else
            sb.Append(_payload);                   // вставляем как есть
        sb.Append('}');

        var response = context.HttpContext.Response;
        response.ContentType = "application/json; charset=utf-8";
        await response.WriteAsync(sb.ToString(), Encoding.UTF8);
    }

    private static void AppendJsonStringValue(StringBuilder sb, string s)
    {
        sb.Append('"');
        foreach (char c in s)
        {
            switch (c)
            {
                case '"': sb.Append("\\\""); break;
                case '\\': sb.Append("\\\\"); break;
                case '\b': sb.Append("\\b"); break;
                case '\f': sb.Append("\\f"); break;
                case '\n': sb.Append("\\n"); break;
                case '\r': sb.Append("\\r"); break;
                case '\t': sb.Append("\\t"); break;
                default:
                    if (c < ' ')
                        sb.Append("\\u").Append(((int)c).ToString("x4"));
                    else
                        sb.Append(c);
                    break;
            }
        }
        sb.Append('"');
    }
}
