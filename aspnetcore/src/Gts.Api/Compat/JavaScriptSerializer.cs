// Аналог System.Web.Script.Serialization.JavaScriptSerializer (.NET Framework 4.x).
// Формат вывода повторяет оригинал, т.к. на него рассчитаны JS-страницы и мобильные приложения:
//   * DateTime        -> "\/Date(миллисекунды_UTC_от_1970)\/"
//   * null / DBNull   -> null
//   * строки          -> экранирование как HttpUtility.JavaScriptStringEncode
//                        (", \, управляющие символы, а также < > & ' -> < > & ')
//   * IDictionary     -> объект, IEnumerable (в т.ч. byte[]) -> массив, прочие объекты -> публичные поля и свойства
// Разбор (DeserializeObject) возвращает Dictionary<string,object> / object[] / string / int / long / decimal / bool / null,
// как и оригинал — этим пользуется диспетчер ASMX при привязке параметров типа object.
#nullable disable
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;

namespace System.Web.Script.Serialization
{
    public class JavaScriptSerializer
    {
        private static readonly long EpochTicks = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).Ticks;

        private static readonly JsonSerializerOptions TypedOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString,
            IncludeFields = true,
        };

        public int MaxJsonLength { get; set; } = int.MaxValue;
        public int RecursionLimit { get; set; } = 100;

        // ---------- Сериализация ----------

        public string Serialize(object obj)
        {
            var sb = new StringBuilder();
            Serialize(obj, sb);
            return sb.ToString();
        }

        public void Serialize(object obj, StringBuilder output) => WriteValue(output, obj, 0);

        private void WriteValue(StringBuilder sb, object o, int depth)
        {
            if (depth > RecursionLimit)
                throw new ArgumentException("RecursionLimit exceeded.");

            switch (o)
            {
                case null:
                    sb.Append("null"); return;
                case DBNull:
                    sb.Append("null"); return;
                case string s:
                    WriteString(sb, s); return;
                case char c:
                    WriteString(sb, c.ToString()); return;
                case bool b:
                    sb.Append(b ? "true" : "false"); return;
                case DateTime dt:
                    long ms = (dt.ToUniversalTime().Ticks - EpochTicks) / 10000;
                    sb.Append("\"\\/Date(").Append(ms.ToString(CultureInfo.InvariantCulture)).Append(")\\/\"");
                    return;
                case DateTimeOffset dto:
                    WriteValue(sb, dto.UtcDateTime, depth); return;
                case Guid g:
                    WriteString(sb, g.ToString()); return;
                case Uri u:
                    WriteString(sb, u.GetComponents(UriComponents.SerializationInfoString, UriFormat.UriEscaped)); return;
                case Enum e:
                    sb.Append(Convert.ToInt64(e, CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture)); return;
                case double d:
                    sb.Append(d.ToString("r", CultureInfo.InvariantCulture)); return;
                case float f:
                    sb.Append(f.ToString("r", CultureInfo.InvariantCulture)); return;
                case decimal or byte or sbyte or short or ushort or int or uint or long or ulong:
                    sb.Append(((IFormattable)o).ToString(null, CultureInfo.InvariantCulture)); return;
                case TimeSpan ts:
                    // JavaScriptSerializer сериализует TimeSpan как объект с публичными свойствами.
                    WriteObject(sb, ts, depth); return;
                case IDictionary dict:
                    sb.Append('{');
                    bool first = true;
                    foreach (DictionaryEntry kv in dict)
                    {
                        if (!first) sb.Append(',');
                        first = false;
                        WriteString(sb, Convert.ToString(kv.Key, CultureInfo.InvariantCulture));
                        sb.Append(':');
                        WriteValue(sb, kv.Value, depth + 1);
                    }
                    sb.Append('}');
                    return;
                case IEnumerable seq:
                    sb.Append('[');
                    bool firstItem = true;
                    foreach (var item in seq)
                    {
                        if (!firstItem) sb.Append(',');
                        firstItem = false;
                        WriteValue(sb, item, depth + 1);
                    }
                    sb.Append(']');
                    return;
                default:
                    WriteObject(sb, o, depth); return;
            }
        }

        private void WriteObject(StringBuilder sb, object o, int depth)
        {
            var type = o.GetType();
            sb.Append('{');
            bool first = true;
            foreach (var field in type.GetFields(BindingFlags.Public | BindingFlags.Instance))
            {
                if (!first) sb.Append(',');
                first = false;
                WriteString(sb, field.Name);
                sb.Append(':');
                WriteValue(sb, field.GetValue(o), depth + 1);
            }
            foreach (var prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (prop.GetIndexParameters().Length > 0 || prop.GetGetMethod() == null) continue;
                if (!first) sb.Append(',');
                first = false;
                WriteString(sb, prop.Name);
                sb.Append(':');
                WriteValue(sb, prop.GetValue(o), depth + 1);
            }
            sb.Append('}');
        }

        /// <summary>Экранирование строк как HttpUtility.JavaScriptStringEncode (.NET Framework 4.x).</summary>
        internal static void WriteString(StringBuilder sb, string s)
        {
            sb.Append('"');
            foreach (char c in s)
            {
                switch (c)
                {
                    case '\b': sb.Append("\\b"); break;
                    case '\t': sb.Append("\\t"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\f': sb.Append("\\f"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    default:
                        if (c < ' ' || c == '\'' || c == '<' || c == '>' || c == '&' ||
                            c == '\u0085' || c == (char)0x2028 || c == (char)0x2029)
                            sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture));
                        else
                            sb.Append(c);
                        break;
                }
            }
            sb.Append('"');
        }

        // ---------- Разбор ----------

        public T Deserialize<T>(string input)
        {
            if (string.IsNullOrEmpty(input)) return default;
            return JsonSerializer.Deserialize<T>(input, TypedOptions);
        }

        public object Deserialize(string input, Type targetType)
        {
            if (string.IsNullOrEmpty(input)) return null;
            return JsonSerializer.Deserialize(input, targetType, TypedOptions);
        }

        public object DeserializeObject(string input)
        {
            if (string.IsNullOrEmpty(input)) return null;
            using var doc = JsonDocument.Parse(input);
            return FromElement(doc.RootElement);
        }

        /// <summary>JSON-значение -> граф объектов в стиле JavaScriptSerializer.</summary>
        internal static object FromElement(JsonElement e)
        {
            switch (e.ValueKind)
            {
                case JsonValueKind.Null:
                case JsonValueKind.Undefined:
                    return null;
                case JsonValueKind.True: return true;
                case JsonValueKind.False: return false;
                case JsonValueKind.String:
                    // Оригинал превращал "\/Date(ms)\/" (именно с экранированным слэшем) в DateTime.
                    string raw = e.GetRawText();
                    if (raw.StartsWith("\"\\/Date(", StringComparison.Ordinal) && raw.EndsWith(")\\/\"", StringComparison.Ordinal))
                    {
                        string inner = raw.Substring(8, raw.Length - 12);
                        int sign = inner.IndexOfAny(new[] { '+', '-' }, 1);
                        if (sign > 0) inner = inner.Substring(0, sign);
                        if (long.TryParse(inner, NumberStyles.Integer, CultureInfo.InvariantCulture, out long ms))
                            return new DateTime(EpochTicks + ms * 10000, DateTimeKind.Utc);
                    }
                    return e.GetString();
                case JsonValueKind.Number:
                    if (e.TryGetInt32(out int i)) return i;
                    if (e.TryGetInt64(out long l)) return l;
                    if (e.TryGetDecimal(out decimal m)) return m;
                    return e.GetDouble();
                case JsonValueKind.Array:
                    return e.EnumerateArray().Select(FromElement).ToArray();
                case JsonValueKind.Object:
                    var dict = new Dictionary<string, object>();
                    foreach (var p in e.EnumerateObject())
                        dict[p.Name] = FromElement(p.Value);
                    return dict;
                default:
                    return null;
            }
        }

        /// <summary>
        /// Приведение значения из DeserializeObject к типу параметра (аналог ConvertToType).
        /// Для object возвращается как есть — так вёл себя ASMX ScriptService.
        /// </summary>
        public T ConvertToType<T>(object obj) => (T)ConvertToType(obj, typeof(T));

        public object ConvertToType(object obj, Type targetType)
        {
            if (targetType == typeof(object)) return obj;

            var underlying = Nullable.GetUnderlyingType(targetType);
            if (obj == null)
            {
                if (!targetType.IsValueType || underlying != null) return null;
                return Activator.CreateInstance(targetType);
            }
            targetType = underlying ?? targetType;

            if (targetType.IsInstanceOfType(obj)) return obj;
            if (targetType == typeof(string))
                return obj is IFormattable f ? f.ToString(null, CultureInfo.InvariantCulture) : obj.ToString();
            if (targetType == typeof(Guid)) return Guid.Parse(obj.ToString());
            if (targetType.IsEnum)
                return obj is string es ? Enum.Parse(targetType, es, true) : Enum.ToObject(targetType, obj);
            if (targetType == typeof(DateTime) && obj is string ds)
                return DateTime.Parse(ds, CultureInfo.InvariantCulture);
            if (obj is IConvertible && typeof(IConvertible).IsAssignableFrom(targetType))
                return Convert.ChangeType(obj, targetType, CultureInfo.InvariantCulture);

            // Сложные типы (массивы, классы): через промежуточный JSON.
            return JsonSerializer.Deserialize(Serialize(obj), targetType, TypedOptions);
        }
    }
}
