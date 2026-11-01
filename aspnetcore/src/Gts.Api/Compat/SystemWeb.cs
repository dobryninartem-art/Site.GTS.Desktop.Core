// Слой совместимости: минимальная реализация типов System.Web поверх ASP.NET Core.
// Нужен, чтобы код из source/App_Code и source/*.aspx.cs работал на .NET 8 почти без изменений.
// Реализовано ровно то, что использует перенесённый код (см. Legacy/).
#nullable disable
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;
using CoreHttpContext = Microsoft.AspNetCore.Http.HttpContext;
using IHttpContextAccessor = Microsoft.AspNetCore.Http.IHttpContextAccessor;

namespace System.Web
{
    /// <summary>Аналог System.Web.HttpContext. Current берётся из IHttpContextAccessor.</summary>
    public sealed class HttpContext
    {
        private const string ItemsKey = "__Gts.LegacyHttpContext";

        internal static IHttpContextAccessor Accessor;

        /// <summary>Физический путь к корню старого сайта (папка source/). Задаётся при старте.</summary>
        internal static string WebRootPath;

        public static HttpContext Current
        {
            get
            {
                var core = Accessor?.HttpContext;
                if (core == null) return null;
                if (core.Items.TryGetValue(ItemsKey, out var existing))
                    return (HttpContext)existing;
                var created = new HttpContext(core);
                core.Items[ItemsKey] = created;
                return created;
            }
        }

        public static HttpContext For(CoreHttpContext core)
        {
            if (core.Items.TryGetValue(ItemsKey, out var existing))
                return (HttpContext)existing;
            var created = new HttpContext(core);
            core.Items[ItemsKey] = created;
            return created;
        }

        private HttpContext(CoreHttpContext core)
        {
            Inner = core;
            Server = new HttpServerUtility(this);
            Request = new HttpRequest(core);
            Response = new HttpResponse(core);
        }

        /// <summary>Исходный контекст ASP.NET Core.</summary>
        public CoreHttpContext Inner { get; }
        public HttpServerUtility Server { get; }
        public HttpRequest Request { get; }
        public HttpResponse Response { get; }
    }

    /// <summary>Аналог Server.MapPath: виртуальный путь -> физический путь внутри source/.</summary>
    public sealed class HttpServerUtility
    {
        private readonly HttpContext _ctx;
        internal HttpServerUtility(HttpContext ctx) => _ctx = ctx;

        public string MapPath(string path)
        {
            string root = HttpContext.WebRootPath;
            string requestDir = GetRequestDirectory();

            string virtualPath;
            if (string.IsNullOrEmpty(path))
                virtualPath = requestDir;
            else if (path.StartsWith("~/") || path == "~")
                virtualPath = path.Length > 1 ? path.Substring(1) : "/";
            else if (path.StartsWith("/") || path.StartsWith("\\"))
                virtualPath = path;
            else
                virtualPath = requestDir.TrimEnd('/') + "/" + path;

            string relative = virtualPath.Replace('\\', '/').TrimStart('/');
            string full = Path.GetFullPath(Path.Combine(root, relative.Replace('/', Path.DirectorySeparatorChar)));

            // Как в IIS: MapPath("/") возвращает корень с завершающим разделителем.
            if (relative.Length == 0 && !full.EndsWith(Path.DirectorySeparatorChar))
                full += Path.DirectorySeparatorChar;
            return full;
        }

        private string GetRequestDirectory()
        {
            string p = _ctx.Inner.Request.Path.HasValue ? _ctx.Inner.Request.Path.Value : "/";
            int i = p.LastIndexOf('/');
            return i <= 0 ? "/" : p.Substring(0, i);
        }
    }

    /// <summary>Аналог HttpRequest: Form, QueryString, Files.</summary>
    public sealed class HttpRequest
    {
        private readonly CoreHttpContext _core;
        private NameValueCollection _form, _query;
        private HttpFileCollection _files;

        internal HttpRequest(CoreHttpContext core) => _core = core;

        public NameValueCollection QueryString =>
            _query ??= ToCollection(_core.Request.Query.Select(kv => (kv.Key, (string)kv.Value)));

        public NameValueCollection Form
        {
            get
            {
                if (_form != null) return _form;
                _form = _core.Request.HasFormContentType
                    ? ToCollection(_core.Request.Form.Select(kv => (kv.Key, (string)kv.Value)))
                    : new NameValueCollection();
                return _form;
            }
        }

        public HttpFileCollection Files
        {
            get
            {
                if (_files != null) return _files;
                var list = _core.Request.HasFormContentType
                    ? _core.Request.Form.Files.Select(f => new HttpPostedFile(f)).ToList()
                    : new List<HttpPostedFile>();
                _files = new HttpFileCollection(list);
                return _files;
            }
        }

        public string this[string key] => QueryString[key] ?? Form[key];

        public Uri Url => new Uri($"{_core.Request.Scheme}://{_core.Request.Host}{_core.Request.PathBase}{_core.Request.Path}{_core.Request.QueryString}");

        public string UserHostAddress => _core.Connection.RemoteIpAddress?.ToString();

        private static NameValueCollection ToCollection(IEnumerable<(string Key, string Value)> items)
        {
            var c = new NameValueCollection(StringComparer.OrdinalIgnoreCase);
            foreach (var (k, v) in items) c.Add(k, v);
            return c;
        }
    }

    public sealed class HttpFileCollection
    {
        private readonly List<HttpPostedFile> _files;
        internal HttpFileCollection(List<HttpPostedFile> files) => _files = files;

        public int Count => _files.Count;

        /// <summary>Как в System.Web: при отсутствии файла по индексу — null (а не исключение).</summary>
        public HttpPostedFile this[int index] => index >= 0 && index < _files.Count ? _files[index] : null;

        public HttpPostedFile this[string name] =>
            _files.FirstOrDefault(f => string.Equals(f.Name, name, StringComparison.OrdinalIgnoreCase));
    }

    public sealed class HttpPostedFile
    {
        private readonly Microsoft.AspNetCore.Http.IFormFile _file;
        internal HttpPostedFile(Microsoft.AspNetCore.Http.IFormFile file) => _file = file;

        internal string Name => _file.Name;
        public string FileName => _file.FileName;
        public string ContentType => _file.ContentType;
        public int ContentLength => (int)_file.Length;
        public Stream InputStream => _file.OpenReadStream();

        public void SaveAs(string filename)
        {
            using var fs = new FileStream(filename, FileMode.Create, FileAccess.Write);
            _file.CopyTo(fs);
        }
    }

    /// <summary>
    /// Аналог HttpResponse. Write копит текст в буфере; End прерывает выполнение метода
    /// (как ThreadAbortException в .NET Framework), Flush сразу отправляет буфер клиенту
    /// (нужно для потоковой страницы Refresh.aspx).
    /// </summary>
    public sealed class HttpResponse
    {
        private readonly CoreHttpContext _core;
        private readonly StringBuilder _buffer = new();

        internal HttpResponse(CoreHttpContext core) => _core = core;

        internal string BufferedOutput => _buffer.ToString();
        internal bool HasBufferedOutput => _buffer.Length > 0;
        internal bool WasFlushed { get; private set; }
        internal bool StatusCodeSet { get; private set; }
        internal bool ContentTypeSet { get; private set; }

        private int _statusCode = 200;
        public int StatusCode
        {
            get => _statusCode;
            set { _statusCode = value; StatusCodeSet = true; if (!_core.Response.HasStarted) _core.Response.StatusCode = value; }
        }

        private string _contentType = "text/html";
        public string ContentType
        {
            get => _contentType;
            set { _contentType = value; ContentTypeSet = true; if (!_core.Response.HasStarted) _core.Response.ContentType = value; }
        }

        public string CacheControl
        {
            get => _core.Response.Headers.CacheControl;
            set { if (!_core.Response.HasStarted) _core.Response.Headers.CacheControl = value; }
        }

        public void Clear() => _buffer.Clear();

        public void Write(string s) => _buffer.Append(s);

        public void Flush()
        {
            if (_core.RequestAborted.IsCancellationRequested)
                throw new IOException("Клиент закрыл соединение.");
            var bytes = Encoding.UTF8.GetBytes(_buffer.ToString());
            _buffer.Clear();
            // Kestrel запрещает синхронный ввод-вывод, поэтому пишем асинхронно и ждём завершения.
            _core.Response.Body.WriteAsync(bytes, 0, bytes.Length).GetAwaiter().GetResult();
            _core.Response.Body.FlushAsync().GetAwaiter().GetResult();
            WasFlushed = true;
        }

        public void End() => throw new HttpResponseEndException();
    }

    /// <summary>Сигнал Response.End(): перехватывается диспетчером, который отдаёт накопленный вывод.</summary>
    public sealed class HttpResponseEndException : Exception
    {
        public HttpResponseEndException() : base("Response.End()") { }
    }
}

namespace System.Web.Services
{
    /// <summary>Базовый класс ASMX-службы. Context/Server/… берутся из текущего запроса.</summary>
    public class WebService
    {
        public System.Web.HttpContext Context => System.Web.HttpContext.Current;
        public System.Web.HttpServerUtility Server => Context?.Server;

        /// <summary>Текущий пользователь запроса (в .NET Framework — WebService.User).</summary>
        public System.Security.Principal.IPrincipal User => Context?.Inner.User;
    }

    [AttributeUsage(AttributeTargets.Method)]
    public sealed class WebMethodAttribute : Attribute
    {
        public bool EnableSession { get; set; }
        public string Description { get; set; }
        public int CacheDuration { get; set; }
        public string MessageName { get; set; }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class WebServiceAttribute : Attribute
    {
        public string Namespace { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public enum WsiProfiles { None = 0, BasicProfile1_1 = 1 }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, AllowMultiple = true)]
    public sealed class WebServiceBindingAttribute : Attribute
    {
        public WsiProfiles ConformsTo { get; set; }
        public string Name { get; set; }
        public string Namespace { get; set; }
    }
}

namespace System.Web.Script.Services
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface)]
    public sealed class ScriptServiceAttribute : Attribute { }

    public enum ResponseFormat { Json = 0, Xml = 1 }

    [AttributeUsage(AttributeTargets.Method)]
    public sealed class ScriptMethodAttribute : Attribute
    {
        public bool UseHttpGet { get; set; }
        public ResponseFormat ResponseFormat { get; set; }
    }
}

namespace System.Web.Hosting
{
    /// <summary>Аналог HostingEnvironment: MapPath без привязки к текущему запросу.</summary>
    public static class HostingEnvironment
    {
        public static string ApplicationPhysicalPath => System.Web.HttpContext.WebRootPath;

        public static string MapPath(string virtualPath)
        {
            string relative = (virtualPath ?? "").TrimStart('~').Replace('\\', '/').TrimStart('/');
            return Path.GetFullPath(Path.Combine(System.Web.HttpContext.WebRootPath, relative.Replace('/', Path.DirectorySeparatorChar)));
        }
    }
}

namespace System.Web.UI.WebControls
{
    // Пустое пространство имён: на него ссылается using в uploadExcel.aspx.cs.
    internal static class WebControlsPlaceholder { }
}

namespace System.Web.UI
{
    /// <summary>
    /// Аналог System.Web.UI.Page для страниц без разметки (upload.aspx и т.п.):
    /// вызывает Page_Load и отдаёт накопленный вывод.
    /// </summary>
    public class Page
    {
        protected System.Web.HttpRequest Request { get; private set; }
        protected System.Web.HttpResponse Response { get; private set; }
        protected System.Web.HttpServerUtility Server { get; private set; }

        public void ProcessRequest(System.Web.HttpContext context)
        {
            Request = context.Request;
            Response = context.Response;
            Server = context.Server;

            var load = GetType().GetMethod("Page_Load",
                Reflection.BindingFlags.Instance | Reflection.BindingFlags.Public | Reflection.BindingFlags.NonPublic);
            try
            {
                load?.Invoke(this, new object[] { this, EventArgs.Empty });
            }
            catch (Reflection.TargetInvocationException tie) when (tie.InnerException is System.Web.HttpResponseEndException)
            {
                // Response.End() — нормальное завершение страницы.
            }
        }
    }
}
