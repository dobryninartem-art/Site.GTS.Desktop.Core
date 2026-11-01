// Аналог System.Configuration.ConfigurationManager поверх конфигурации ASP.NET Core.
//   AppSettings["Key"]               <- раздел "AppSettings" в appsettings.json / переменные AppSettings__Key
//   ConnectionStrings["Database"]    <- раздел "ConnectionStrings" / переменная ConnectionStrings__Database
#nullable disable
using System.Collections.Specialized;
using Microsoft.Extensions.Configuration;

namespace System.Configuration
{
    public static class ConfigurationManager
    {
        private static IConfiguration _config;
        private static NameValueCollection _appSettings = new();
        private static ConnectionStringSettingsCollection _connectionStrings = new(null);

        /// <summary>Вызывается один раз при старте приложения (Program.cs).</summary>
        public static void Initialize(IConfiguration config)
        {
            _config = config;
            var app = new NameValueCollection(StringComparer.OrdinalIgnoreCase);
            foreach (var kv in config.GetSection("AppSettings").GetChildren())
                app[kv.Key] = kv.Value;
            _appSettings = app;
            _connectionStrings = new ConnectionStringSettingsCollection(config);
        }

        public static NameValueCollection AppSettings => _appSettings;
        public static ConnectionStringSettingsCollection ConnectionStrings => _connectionStrings;
    }

    public sealed class ConnectionStringSettingsCollection
    {
        private readonly IConfiguration _config;
        internal ConnectionStringSettingsCollection(IConfiguration config) => _config = config;

        public ConnectionStringSettings this[string name]
        {
            get
            {
                var cs = _config?.GetConnectionString(name);
                if (cs == null) return null;
                return new ConnectionStringSettings(name, cs, _config[$"ConnectionStrings:{name}_ProviderName"] ?? "Microsoft.Data.SqlClient");
            }
        }
    }

    public sealed class ConnectionStringSettings
    {
        public ConnectionStringSettings(string name, string connectionString, string providerName)
        {
            Name = name;
            ConnectionString = connectionString;
            ProviderName = providerName;
        }

        public string Name { get; }
        public string ConnectionString { get; }
        public string ProviderName { get; }
    }
}
