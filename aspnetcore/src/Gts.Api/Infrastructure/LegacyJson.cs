using System.Globalization;
using System.Text;

namespace Gts.Api.Infrastructure;

/// <summary>
/// Сериализация выборок в JSON, байт-в-байт близкая к старому
/// <c>System.Web.Script.Serialization.JavaScriptSerializer</c> (ShareMethods.SerializeDataJSON).
///
/// ЗАЧЕМ ОТДЕЛЬНЫЙ СЕРИАЛИЗАТОР, А НЕ System.Text.Json:
/// мобильные клиенты (Android/iPhone) и desktop-JS разбирают ответы в том формате,
/// который давал JavaScriptSerializer. Два отличия критичны для совместимости:
///   1. Дата/время -> "\/Date(МИЛЛИСЕКУНДЫ_ОТ_UNIX_EPOCH)\/", а не ISO-8601.
///   2. DBNull -> null; byte[] -> base64-строка.
/// Если отдать STJ с ISO-датами, клиентский парсинг дат сломается, хотя HTTP-200 вернётся.
///
/// Это "режим совместимости". Для новых, чистых REST-эндпоинтов используйте обычный STJ.
/// </summary>
public static class LegacyJson
{
    private static readonly DateTime UnixEpoch =
        new(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public static string SerializeRows(IReadOnlyList<Row> rows)
    {
        var sb = new StringBuilder(1024);
        sb.Append('[');
        for (int i = 0; i < rows.Count; i++)
        {
            if (i > 0) sb.Append(',');
            WriteObject(sb, rows[i]);
        }
        sb.Append(']');
        return sb.ToString();
    }

    /// <summary>Аналог SerializeDataJSONMany: {"Table1":[...],"Table2":[...]}.</summary>
    public static string SerializeManyRows(IReadOnlyList<IReadOnlyList<Row>> tables)
    {
        var sb = new StringBuilder(2048);
        sb.Append('{');
        for (int i = 0; i < tables.Count; i++)
        {
            if (i > 0) sb.Append(',');
            WriteString(sb, "Table" + (i + 1));
            sb.Append(':');
            sb.Append('[');
            var t = tables[i];
            for (int r = 0; r < t.Count; r++)
            {
                if (r > 0) sb.Append(',');
                WriteObject(sb, t[r]);
            }
            sb.Append(']');
        }
        sb.Append('}');
        return sb.ToString();
    }

    private static void WriteObject(StringBuilder sb, Row row)
    {
        sb.Append('{');
        bool first = true;
        foreach (var kv in row)
        {
            if (!first) sb.Append(',');
            first = false;
            WriteString(sb, kv.Key);
            sb.Append(':');
            WriteValue(sb, kv.Value);
        }
        sb.Append('}');
    }

    private static void WriteValue(StringBuilder sb, object? value)
    {
        switch (value)
        {
            case null or DBNull:
                sb.Append("null");
                break;
            case string s:
                WriteString(sb, s);
                break;
            case bool b:
                sb.Append(b ? "true" : "false");
                break;
            case DateTime dt:
                // Как JavaScriptSerializer: миллисекунды UTC от epoch.
                long ms = (long)(dt.ToUniversalTime() - UnixEpoch).TotalMilliseconds;
                sb.Append("\"\\/Date(").Append(ms.ToString(CultureInfo.InvariantCulture)).Append(")\\/\"");
                break;
            case byte[] bytes:
                WriteString(sb, Convert.ToBase64String(bytes));
                break;
            case Guid g:
                WriteString(sb, g.ToString());
                break;
            case float or double or decimal or byte or sbyte
                or short or ushort or int or uint or long or ulong:
                sb.Append(Convert.ToString(value, CultureInfo.InvariantCulture));
                break;
            default:
                WriteString(sb, Convert.ToString(value, CultureInfo.InvariantCulture) ?? "");
                break;
        }
    }

    private static void WriteString(StringBuilder sb, string s)
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
                case '/': sb.Append("\\/"); break; // как JavaScriptSerializer
                default:
                    if (c < ' ')
                        sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture));
                    else
                        sb.Append(c);
                    break;
            }
        }
        sb.Append('"');
    }
}
