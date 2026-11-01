// ЗАГЛУШКИ ТОЛЬКО ДЛЯ ПРОВЕРОЧНОЙ СБОРКИ (dotnet build -p:OfflineCheck=true) в среде без доступа к NuGet.
// В обычной сборке (Visual Studio) эти файлы НЕ компилируются: используется настоящий пакет Microsoft.Data.SqlClient.
// Сигнатуры повторяют реальный пакет; любой вызов бросает исключение.
#nullable disable
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.Data.SqlClient
{
    internal static class Offline
    {
        public static Exception NotAvailable() => new NotSupportedException("Offline stub: Microsoft.Data.SqlClient is not available in this build.");
    }

    public sealed class SqlConnection : IDisposable, IAsyncDisposable
    {
        public SqlConnection() { }
        public SqlConnection(string connectionString) { ConnectionString = connectionString; }
        public string ConnectionString { get; set; }
        public ConnectionState State => ConnectionState.Closed;
        public string Database => null;
        public void Open() => throw Offline.NotAvailable();
        public Task OpenAsync() => throw Offline.NotAvailable();
        public Task OpenAsync(CancellationToken cancellationToken) => throw Offline.NotAvailable();
        public void Close() { }
        public void Dispose() { }
        public ValueTask DisposeAsync() => default;
        public SqlCommand CreateCommand() => new SqlCommand { Connection = this };
        public SqlTransaction BeginTransaction() => throw Offline.NotAvailable();
    }

    public sealed class SqlTransaction : IDisposable
    {
        public void Commit() => throw Offline.NotAvailable();
        public void Rollback() => throw Offline.NotAvailable();
        public void Dispose() { }
    }

    public sealed class SqlCommand : IDisposable, IAsyncDisposable
    {
        public SqlCommand() { }
        public SqlCommand(string cmdText) { CommandText = cmdText; }
        public SqlCommand(string cmdText, SqlConnection connection) { CommandText = cmdText; Connection = connection; }
        public SqlCommand(string cmdText, SqlConnection connection, SqlTransaction transaction) : this(cmdText, connection) { Transaction = transaction; }
        public string CommandText { get; set; }
        public CommandType CommandType { get; set; } = CommandType.Text;
        public int CommandTimeout { get; set; } = 30;
        public SqlConnection Connection { get; set; }
        public SqlTransaction Transaction { get; set; }
        public SqlParameterCollection Parameters { get; } = new SqlParameterCollection();
        public int ExecuteNonQuery() => throw Offline.NotAvailable();
        public object ExecuteScalar() => throw Offline.NotAvailable();
        public SqlDataReader ExecuteReader() => throw Offline.NotAvailable();
        public SqlDataReader ExecuteReader(CommandBehavior behavior) => throw Offline.NotAvailable();
        public Task<int> ExecuteNonQueryAsync(CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public Task<object> ExecuteScalarAsync(CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public Task<SqlDataReader> ExecuteReaderAsync(CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public void Dispose() { }
        public ValueTask DisposeAsync() => default;
    }

    public sealed class SqlParameterCollection : IEnumerable
    {
        private readonly List<SqlParameter> _items = new();
        public int Count => _items.Count;
        public SqlParameter this[int index] => _items[index];
        public SqlParameter this[string name] => _items.Find(p => p.ParameterName == name);
        public SqlParameter Add(SqlParameter p) { _items.Add(p); return p; }
        public SqlParameter Add(string name, SqlDbType type) => Add(new SqlParameter(name, type));
        public SqlParameter Add(string name, SqlDbType type, int size) => Add(new SqlParameter(name, type) { Size = size });
        public SqlParameter AddWithValue(string name, object value) => Add(new SqlParameter(name, value));
        public void Clear() => _items.Clear();
        public IEnumerator GetEnumerator() => _items.GetEnumerator();
    }

    public sealed class SqlParameter
    {
        public SqlParameter() { }
        public SqlParameter(string parameterName, SqlDbType dbType) { ParameterName = parameterName; SqlDbType = dbType; }
        public SqlParameter(string parameterName, object value) { ParameterName = parameterName; Value = value; }
        public string ParameterName { get; set; }
        public object Value { get; set; }
        public SqlDbType SqlDbType { get; set; }
        public int Size { get; set; }
        public ParameterDirection Direction { get; set; } = ParameterDirection.Input;
    }

    public sealed class SqlDataAdapter : IDisposable
    {
        public SqlDataAdapter(SqlCommand selectCommand) { SelectCommand = selectCommand; }
        public SqlCommand SelectCommand { get; set; }
        public int Fill(DataTable dataTable) => throw Offline.NotAvailable();
        public int Fill(DataSet dataSet) => throw Offline.NotAvailable();
        public void Dispose() { }
    }

    public sealed class SqlDataReader : IDisposable, IAsyncDisposable
    {
        public int FieldCount => throw Offline.NotAvailable();
        public bool HasRows => throw Offline.NotAvailable();
        public object this[int i] => throw Offline.NotAvailable();
        public object this[string name] => throw Offline.NotAvailable();
        public bool Read() => throw Offline.NotAvailable();
        public Task<bool> ReadAsync(CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public bool NextResult() => throw Offline.NotAvailable();
        public Task<bool> NextResultAsync(CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public string GetName(int i) => throw Offline.NotAvailable();
        public object GetValue(int i) => throw Offline.NotAvailable();
        public bool IsDBNull(int i) => throw Offline.NotAvailable();
        public Task<bool> IsDBNullAsync(int i, CancellationToken cancellationToken = default) => throw Offline.NotAvailable();
        public void Close() { }
        public void Dispose() { }
        public ValueTask DisposeAsync() => default;
    }

    public sealed class SqlError
    {
        public int Number { get; }
        public string Message { get; }
        public string Procedure { get; }
        public int LineNumber { get; }
    }

    public sealed class SqlErrorCollection : IEnumerable
    {
        public int Count => 0;
        public SqlError this[int index] => throw Offline.NotAvailable();
        public IEnumerator GetEnumerator() => Array.Empty<SqlError>().GetEnumerator();
    }

    public sealed class SqlException : Exception
    {
        private SqlException() { }
        public int Number { get; }
        public SqlErrorCollection Errors { get; } = new SqlErrorCollection();
        public string Procedure { get; }
        public int LineNumber { get; }
    }

    public sealed class SqlConnectionStringBuilder
    {
        public SqlConnectionStringBuilder() { }
        public SqlConnectionStringBuilder(string connectionString) { ConnectionString = connectionString; }
        public string ConnectionString { get; set; }
        public string InitialCatalog { get; set; }
        public string DataSource { get; set; }
        public object this[string keyword] { get => null; set { } }
    }
}
