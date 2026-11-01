using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.CompilerServices;

public class StoredProc
{
  public static string BaseName = "";
 
  public static string ConnectionString
  {
    get { return ConfigurationManager.ConnectionStrings["Database"].ConnectionString.ToString(); }
  }

  public static DataTable Select(SqlCommand Command, string Base = null)
  {
    string connectionString = ConnectionString;
    if (Base == null)
      Base = "GTS";
    if (Base != "GTS")
      connectionString = connectionString.Replace("GTS", Base);

    // Извлекаем реальное имя БД из итоговой строки подключения
    string actualDatabase;
    try
    {
      var builder = new SqlConnectionStringBuilder(connectionString);
      actualDatabase = builder.InitialCatalog;
    }
    catch
    {
      actualDatabase = Base; // fallback
    }

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
      try
      {
        Command.CommandType = CommandType.StoredProcedure;
        Command.Connection = connection;
        Command.CommandTimeout = 300;

        connection.Open();

        using (SqlDataAdapter adapter = new SqlDataAdapter(Command))
        {
          DataTable table = new DataTable();
          adapter.Fill(table);
          return table;
        }
      }
      catch (SqlException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[Select] SqlException | Base={0} | Proc={1} | Params=[{2}] | Error={3}: {4}", actualDatabase, Command.CommandText, parms, ex.Number, ex.Message));
        return new DataTable();
      }
      catch (InvalidOperationException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[Select] InvalidOperationException | Base={0} | Proc={1} | Params=[{2}] | {3}", actualDatabase, Command.CommandText, parms, ex.Message));
        return new DataTable();
      }
      catch (Exception ex)
      {
        string parms;
        try
        {
          parms = FormatParameters(Command);
        }
        catch (Exception fpEx)
        {
          parms = "FormatParameters failed: " + fpEx.Message;
        }

        int paramCount = (Command != null && Command.Parameters != null) ? Command.Parameters.Count : -1;

        LogError(string.Format("[Select] {0} | Base={1} | Proc={2} | ParamCount={3} | Params=[{4}] | {5}", ex.GetType().Name, actualDatabase, Command.CommandText, paramCount, parms, ex.Message));
        return new DataTable();
      }
    }
  }


  // обработчик нескольких датасетов из одной процедуры
  public static List<DataTable> SelectMany(SqlCommand Command, string Base = null)
  {
    string connectionString = ConnectionString;
    if (Base == null)
      Base = "GTS";
    if (Base != "GTS")
      connectionString = connectionString.Replace("GTS", Base);

    // Извлекаем реальное имя БД из итоговой строки подключения
    string actualDatabase;
    try
    {
      var builder = new SqlConnectionStringBuilder(connectionString);
      actualDatabase = builder.InitialCatalog;
    }
    catch
    {
      actualDatabase = Base; // fallback
    }

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
      try
      {
        Command.CommandType = CommandType.StoredProcedure;
        Command.Connection = connection;
        Command.CommandTimeout = 300;

        connection.Open();

        using (SqlDataAdapter adapter = new SqlDataAdapter(Command))
        {
          DataSet ds = new DataSet();
          adapter.Fill(ds);

          List<DataTable> result = new List<DataTable>();
          foreach (DataTable table in ds.Tables)
            result.Add(table);

          return result;
        }
      }
      catch (SqlException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[SelectMany] SqlException | Base={0} | Proc={1} | Params=[{2}] | Error={3}: {4}", actualDatabase, Command.CommandText, parms, ex.Number, ex.Message));
        return new List<DataTable>();
      }
      catch (InvalidOperationException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[SelectMany] InvalidOperationException | Base={0} | Proc={1} | Params=[{2}] | {3}", actualDatabase, Command.CommandText, parms, ex.Message));
        return new List<DataTable>();
      }
      catch (Exception ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[SelectMany] Exception | Base={0} | Proc={1} | Params=[{2}] | {3}", actualDatabase, Command.CommandText, parms, ex.Message));
        return new List<DataTable>();
      }
    }
  }

  public static string Execute(SqlCommand Command, string Base = null, string caller = null)
  {
    string connectionString = ConnectionString;
    if (Base == null)
      Base = "GTS";
    if (Base != "GTS")
      connectionString = connectionString.Replace("GTS", Base);
    string actualDatabase;
    try
    {
      var builder = new SqlConnectionStringBuilder(connectionString);
      actualDatabase = builder.InitialCatalog;
    }
    catch
    {
      actualDatabase = Base;
    }

    // строка с вызывающим методом — пустая, если не передан
    string callerInfo = string.IsNullOrEmpty(caller) ? "" : " | Caller=" + caller;

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
      try
      {
        Command.CommandType = CommandType.StoredProcedure;
        Command.Connection = connection;
        Command.CommandTimeout = 300;
        connection.Open();
        Command.ExecuteNonQuery();
        return "";
      }
      catch (SqlException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[Execute] SqlException | Base={0} | Proc={1}{2} | Params=[{3}] | Error={4}: {5}", actualDatabase, Command.CommandText, callerInfo, parms, ex.Number, ex.Message));
        return string.Format("SqlError {0}: {1}", ex.Number, ex.Message);
      }
      catch (InvalidOperationException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[Execute] InvalidOperationException | Base={0} | Proc={1}{2} | Params=[{3}] | {4}", actualDatabase, Command.CommandText, callerInfo, parms, ex.Message));
        return string.Format("ConnectionError: {0}", ex.Message);
      }
      catch (Exception ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[Execute] Exception | Base={0} | Proc={1}{2} | Params=[{3}] | {4}", actualDatabase, Command.CommandText, callerInfo, parms, ex.Message));
        return string.Format("Error: {0}", ex.Message);
      }
    }
  }

  public static void ExecuteSilent(SqlCommand Command, string Base = null)
  {
    string connectionString = ConnectionString;
    if (Base == null)
      Base = "GTS";
    if (Base != "GTS")
      connectionString = connectionString.Replace("GTS", Base);

    string actualDatabase;
    try
    {
      var builder = new SqlConnectionStringBuilder(connectionString);
      actualDatabase = builder.InitialCatalog;
    }
    catch
    {
      actualDatabase = Base;
    }

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
      try
      {
        Command.CommandType = CommandType.StoredProcedure;
        Command.Connection = connection;
        Command.CommandTimeout = 300;
        connection.Open();
        Command.ExecuteNonQuery();
      }
      catch (SqlException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[ExecuteSilent] SqlException | Base={0} | Proc={1} | Params=[{2}] | Error={3}: {4}", actualDatabase, Command.CommandText, parms, ex.Number, ex.Message));
      }
      catch (InvalidOperationException ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[ExecuteSilent] InvalidOperationException | Base={0} | Proc={1} | Params=[{2}] | {3}", actualDatabase, Command.CommandText, parms, ex.Message));
      }
      catch (Exception ex)
      {
        string parms = FormatParameters(Command);
        LogError(string.Format("[ExecuteSilent] Exception | Base={0} | Proc={1} | Params=[{2}] | {3}", actualDatabase, Command.CommandText, parms, ex.Message));
      }
    }
  }

  public static object ExecuteScalar(string text)
  {
    using (SqlConnection connection = new SqlConnection(ConnectionString))
    using (SqlCommand command = new SqlCommand(text, connection))
    {
      try
      {
        command.CommandType = CommandType.Text;
        command.CommandTimeout = 300;

        connection.Open();
        return command.ExecuteScalar();
      }
      catch (SqlException ex)
      {
        LogError(string.Format("[ExecuteScalar] SqlException | Query={0} | Error={1}: {2}", text, ex.Number, ex.Message));
        return null;
      }
      catch (InvalidOperationException ex)
      {
        LogError(string.Format("[ExecuteScalar] InvalidOperationException | Query={0} | {1}", text, ex.Message));
        return null;
      }
      catch (Exception ex)
      {
        LogError(string.Format("[ExecuteScalar] Exception | Query={0} | {1}",
            text, ex.Message));
        return null;
      }
    }
  }

  private static void LogError(string message)
  {
    try
    {
      string logPath = System.Web.Hosting.HostingEnvironment.MapPath("~/logs/errors.log");
      string dir = System.IO.Path.GetDirectoryName(logPath);
      if (!System.IO.Directory.Exists(dir))
        System.IO.Directory.CreateDirectory(dir);

      string line = string.Format("{0:yyyy-MM-dd HH:mm:ss} {1}{2}", DateTime.Now, message, Environment.NewLine);

      System.IO.File.AppendAllText(logPath, line);
    }
    catch
    {
      // логирование не должно ронять основной поток
    }
  }

  private static string FormatParameters(SqlCommand command)
  {
    if (command.Parameters == null || command.Parameters.Count == 0)
      return "(no params)";

    var sb = new System.Text.StringBuilder();
    foreach (SqlParameter p in command.Parameters)
    {
      if (sb.Length > 0) sb.Append(", ");
      string val;
      if (p.Value == null || p.Value == DBNull.Value)
        val = "NULL";
      else if (p.Value is string || p.Value is DateTime)
        val = "'" + p.Value.ToString().Replace("'", "''") + "'";
      else
        val = p.Value.ToString();

      sb.AppendFormat("{0}={1}", p.ParameterName, val);
    }
    return sb.ToString();
  }
}

public class SystemBusiness
{
  public static DataTable UserExist(object Phone)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.UserExist");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    return StoredProc.Select(Command);
  }

  public static DataTable SetUserPass(object Phone, object Pass)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.SetUserPass");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    Command.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = Pass;
    return StoredProc.Select(Command);
  }

  public static DataTable Logon(object Phone, object Pass)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.Logon");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    Command.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = Pass;
    return StoredProc.Select(Command);
  }

  public static DataTable Authorization(object Phone, object UserID, object Company, object Pass, object Magic)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.Authorization");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    Command.Parameters.Add("@UserID", SqlDbType.Int).Value = UserID;
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = Pass;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    return StoredProc.Select(Command);
  }

  public static DataTable GetUserInfo(object User)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.GetUserInfo");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // обновить фото пользователя
  public static void SetPhotoUser(object User, object Photo)
  {
    var command = new SqlCommand("USERS.SetPhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Photo", SqlDbType.VarChar, 255).Value = Photo;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение фото
  public static DataTable SetPhoto(object Magic, object User, object GUID, object Name, object Flag = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetPhoto");
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;
    return StoredProc.Select(command, BaseName);
  }

  // сохранение координат фото
  public static DataTable SetPhotoGeo(object User, object GUID, object Lat = null, object Lon = null, object Error = null, object Point = null, object GeoTime = null, object Flag = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetPhotoGeo");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@GeoTime", SqlDbType.DateTime).Value = GeoTime;
    command.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;
    return StoredProc.Select(command, BaseName);
  }

  // копирование фото в задание при постановке задания из фотоотчета
  public static DataTable SetPhotoFromReport(object User, object GUID, object PhotoID)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetPhotoFromReport");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@PhotoID", SqlDbType.Int).Value = PhotoID;
    return StoredProc.Select(command, BaseName);
  }

  // сохранение пути фото пользователя
  public static DataTable SetUserPhoto(object User, object FileName)
  {
    var command = new SqlCommand("SYSTEM.SetUserPhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@FileName", SqlDbType.VarChar, 1024).Value = FileName;
    return StoredProc.Select(command);
  }

  // получение настроек с сервера
  public static DataTable GetSetting(object User)
  {
    var command = new SqlCommand("SYSTEM.GetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // получение пароля пользователя
  public static DataTable GetPass(object Phone)
  {
    var command = new SqlCommand("SYSTEM.GetPass");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;

    return StoredProc.Select(command);
  }

  // сохранение заявки на подключение
  public static DataTable SetClaim(object CompanyName, object UserName, object Phone, object EMail, object Text)
  {
    var command = new SqlCommand("USERS.SetClaim");
    command.Parameters.Add("@CompanyName", SqlDbType.VarChar, 1024).Value = CompanyName;
    command.Parameters.Add("@UserName", SqlDbType.VarChar, 1024).Value = UserName;
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Email", SqlDbType.VarChar, 255).Value = EMail;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;

    return StoredProc.Select(command);
  }

  // выборка пользователей, которым пришли сообщения
  public static DataTable GetRefresh(object User)
  {
    var command = new SqlCommand("CHAT.GetRefresh");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

  // сохранение информации об аппарате пользователя
  public static void SetPhoneInfo(object Phone, object Model = null, object Device = null, object Version = null, object AppVersion = null)
  {
    var command = new SqlCommand("SYSTEM.SetPhoneInfo");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 1024).Value = Model;
    command.Parameters.Add("@Device", SqlDbType.VarChar, 1024).Value = Device;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;
    command.Parameters.Add("@AppVersion", SqlDbType.VarChar, 255).Value = AppVersion;

    StoredProc.ExecuteSilent(command);
  }

  // определение базы по пользователю
  public static string GetBase(object User, [CallerMemberName] string caller = "")
  {
    var command = new SqlCommand("SYSTEM.GetBase");
    SqlParameter BaseName = command.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
    BaseName.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    // передаём имя вызвавшего метода в Execute, чтобы оно попало в лог при ошибке
    StoredProc.Execute(command, caller: caller);

    return BaseName.Value.ToString();
  }

  // определение базы по пользователю
  public static string GetBaseFromPoint(object Point)
  {
    var command = new SqlCommand("SYSTEM.GetBaseFromPoint");
    SqlParameter BaseName = command.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
    BaseName.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    StoredProc.Execute(command);

    return BaseName.Value.ToString();
  }

  // определение базы по фото
  public static string GetBaseFromPhoto(object GUID)
  {
    var command = new SqlCommand("SYSTEM.GetBaseFromPhoto");
    SqlParameter BaseName = command.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
    BaseName.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    StoredProc.Execute(command);

    return BaseName.Value.ToString();
  }

  // определение базы по ID фото
  public static string GetBaseFromPhotoID(object ID)
  {
    var command = new SqlCommand("SYSTEM.GetBaseFromPhotoID");
    SqlParameter BaseName = command.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
    BaseName.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    StoredProc.Execute(command);

    return BaseName.Value.ToString();
  }

  // определение базы по пользователю
  public static string GetBaseFromCompany(object Company)
  {
    var command = new SqlCommand("SYSTEM.GetBaseFromCompany");
    SqlParameter BaseName = command.Parameters.Add("@BaseName", SqlDbType.VarChar, 255);
    BaseName.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    StoredProc.Execute(command);

    return BaseName.Value.ToString();

  }

  // отправка ссылки на фото архив
  public static void SendPhotoArchive(object archiveName, object userID, object photoCount)
  {
      var command = new SqlCommand("SYSTEM.SendPhotoArchive");
      command.Parameters.Add("@User", SqlDbType.Int).Value = userID;
      command.Parameters.Add("@ArchiveName", SqlDbType.VarChar, 255).Value = archiveName;
      command.Parameters.Add("@PhotoCount", SqlDbType.Int).Value = photoCount;

        StoredProc.ExecuteSilent(command);
  }
}

  public class UIBusiness
{
  // Список ТТ
  public static DataTable GetPoint(object User, object Flag)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetPoint");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Flag", SqlDbType.VarChar, 3).Value = Flag; 
    return StoredProc.Select(command, BaseName);
  }

  // список ТТ для фокусных заданий
  public static DataTable GetTaskPoint(object User)
  {
    SqlCommand Command = new SqlCommand("CHAT.GetTaskPoint");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Создание ТТ
  public static DataTable SetPoint(object Point, object Company, object OfficeName, object CityName, object NetworkName, object Name, object Address, object FormatName, object IsMe, object GUID, object Author)
  {
    var command = new SqlCommand("DICT.SetPoint");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@OfficeName", SqlDbType.VarChar, 255).Value = OfficeName;
    command.Parameters.Add("@CityName", SqlDbType.VarChar, 255).Value = CityName;
    command.Parameters.Add("@NetworkName", SqlDbType.VarChar, 255).Value = NetworkName;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Address", SqlDbType.VarChar, 1024).Value = Address;
    command.Parameters.Add("@FormatName", SqlDbType.VarChar, 255).Value = FormatName;
    command.Parameters.Add("@IsMe", SqlDbType.VarChar, 3).Value = IsMe;    
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;    
    return StoredProc.Select(command);
  }

  // Определение геокоординат ТТ
  public static void SetPointGeo(object Point, object Lat, object Lon)
  {
    var command = new SqlCommand("DICT.SetPointGeo");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    StoredProc.ExecuteSilent(command);
  }

  // Закрепление\открепление ТТ за пользователем
  public static void SetPointMap(object User, object Point, object Status, object Author)
  {
    var command = new SqlCommand("USERS.SetPointMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    StoredProc.ExecuteSilent(command);
  }

  // Список заданий
  public static DataTable GetTask(object User, object Flag)
  {
    var command = new SqlCommand("CHAT.GetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Flag", SqlDbType.VarChar, 3).Value = Flag;
    return StoredProc.Select(command);
  }

  //Создание нового задания(обновленная версия)
  public static void SetTask(object Author, object Point, object Acceptor, object Text, object GUID, object PhotoID)
  {
    var command = new SqlCommand("CHAT.SetTask");
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Acceptor", SqlDbType.Int).Value = Acceptor;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@PhotoID", SqlDbType.Int).Value = PhotoID;
    StoredProc.ExecuteSilent(command);
  }

  // Создание нового фокусного задания 
  public static void SetTask2(object User, object Text, object GUID, object Finish, object Acceptor)
  {
    var command = new SqlCommand("CHAT.SetTaskPoint");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Acceptor", SqlDbType.NVarChar, 4000).Value = Acceptor;
    StoredProc.Select(command);
  }

  // уведомление о прочтении задания
  public static void SetTaskDelivered(object User, object Task)
  {
    var command = new SqlCommand("CHAT.SetTaskDelivered");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Task", SqlDbType.NVarChar, 4000).Value = Task;
    
    StoredProc.ExecuteSilent(command);
  }

  // Список получателей задания
  public static DataTable GetAcceptor(object User, object Point = null)
  {
    var command = new SqlCommand("CHAT.GetAcceptor");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

  // Список получателей задания в привязке к ТТ
  public static DataTable GetAcceptorMap(object User, object Point = null)
  {
    var command = new SqlCommand("CHAT.GetAcceptorMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }


  // Список сотрудников компании
  public static DataTable GetUser(object User)
  {
    var command = new SqlCommand("CHAT.GetUser");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сообщений
  public static DataTable GetMessage(object User, object Flag, object Task)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Flag", SqlDbType.VarChar, 3).Value = Flag;
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    return StoredProc.Select(command, BaseName);
  }

  // Создание нового сообщения
  public static void SetMessage(object Task, object User, object Text, object GUID)
  {
    var command = new SqlCommand("CHAT.SetMessage");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;    
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    StoredProc.ExecuteSilent(command);

  }

  //Отправка сообщения ответа на претензию
  public static DataTable SetTaskMessage(object Task, object User, object Text, object GUID)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].DESKTOP.SetTaskMessage");
    command.Parameters.Add("@Task", SqlDbType.VarChar, 255).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    return StoredProc.Select(command, BaseName);
  }

  //Отправка сообщения подтверждения ответа на претензию
  public static DataTable SetTaskModerate(object Task, object User, object Text, object GUID)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].DESKTOP.SetTaskModerate");
    command.Parameters.Add("@Task", SqlDbType.VarChar, 255).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    return StoredProc.Select(command, BaseName);
  }

  // Создание нового сообщения чата
  public static DataTable SetChat(object Acceptor, object User, object Text, object GUID)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetChat");
    command.Parameters.Add("@Acceptor", SqlDbType.Int).Value = Acceptor;    
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command, BaseName);
  }

  // Создание нового группы чата
  public static DataTable SetGroup(object User, object Name, object Description, object GUID)
  {
    var command = new SqlCommand("CHAT.SetGroup");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 1024).Value = Name;
    command.Parameters.Add("@Description", SqlDbType.VarChar, 1024).Value = Description;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command);
  }

  // уведомление о прочтении сообщения
  public static void SetMessageRead(object User, object Message)
  {
    var command = new SqlCommand("CHAT.SetMessageRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Message", SqlDbType.NVarChar, 4000).Value = Message;
    
    StoredProc.ExecuteSilent(command);
  }

  // уведомление о доставке сообщения
  public static void SetMessageDelivered(object User, object Message )
  {
    var command = new SqlCommand("CHAT.SetMessageDelivered");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Message", SqlDbType.NVarChar, 4000).Value = Message;    
    StoredProc.ExecuteSilent(command);
  }

  // уведомление о доставке сообщения чата
  public static void SetChatDelivered(object User, object Chat)
  {
    var command = new SqlCommand("CHAT.SetChatDelivered");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Chat", SqlDbType.NVarChar, 4000).Value = Chat;
    StoredProc.ExecuteSilent(command);
  }

  // уведомление о прочтении сообщения чата
  public static void SetChatRead(object User, object Chat)
  {
    var command = new SqlCommand("CHAT.SetChatRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Chat", SqlDbType.NVarChar, 4000).Value = Chat;
    StoredProc.ExecuteSilent(command);
  }

  // Список заметок
  public static DataTable GetNote(object User, object Point)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetNote");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command, BaseName);
  }

  // Создание новой заметки
  public static DataTable SetNote(object User, object Point, object Text, object Category, object GUID)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetNote");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;  
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command, BaseName);
  }

  // Список тикетов для техподдержки
  public static DataTable GetTicket(object User, object Company)
  {
    var command = new SqlCommand("USERS.GetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    return StoredProc.Select(command);
  }

  // Список тикетов для администратора системы
  public static DataTable GetTicketAdmin(object User)
  {
    var command = new SqlCommand("CHAT.GetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Создание тикета для техподдержки
  public static DataTable SetTicket(object User, object Company, object Text, object GUID)
  {
    var command = new SqlCommand("USERS.SetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command);
  }

  // Создание тикета для администратора системы
  public static DataTable SetTicketAdmin(object User, object Text, object GUID)
  {
    var command = new SqlCommand("CHAT.SetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command);
  }

  // Список sku
  public static DataTable GetArt(object User, object Point)
  {
    var command = new SqlCommand("CHAT.GetArt");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

  // матрицы по сети
  public static DataTable GetArtNetworkMatrix(object User)
  {
    var command = new SqlCommand("CHAT.GetArtNetworkMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ 
  public static DataTable GetArtPointMatrix(object User, object Point)
  {
    var command = new SqlCommand("CHAT.GetArtPointMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ (общее хранилище)
  public static DataTable GetArtMatrix(object User, object Point)
  {
    var command = new SqlCommand("CHAT.GetArtMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

    // Список ответов по sku
  public static DataTable GetArtAnswer(object User, object Point)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetArtAnswer");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command, BaseName);
  }

  // сохранение ответов по sku
  public static DataTable SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer = null, object GUID = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command, BaseName);
  }

  // Данные по пользователю для личного кабинета
  public static DataTable GetUsers(object User)
  {
    var command = new SqlCommand("USERS.GetUser");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // сохранение данных по пользователю
  public static DataTable SetUsers(object User, object Phone, object Company, object LName, object FName, object MName, object RoleName, object Author = null)
  {
    var command = new SqlCommand("USERS.SetUsers");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@LName", SqlDbType.VarChar, 255).Value = LName;
    command.Parameters.Add("@FName", SqlDbType.VarChar, 255).Value = FName;
    command.Parameters.Add("@MName", SqlDbType.VarChar, 255).Value = MName;
    command.Parameters.Add("@RoleName", SqlDbType.VarChar, 255).Value = RoleName;    
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    return StoredProc.Select(command);
  }

  // сохранение часового пояса пользователя
  public static void SetTimeZone(object Phone, object TimeZone)
  {
    var command = new SqlCommand("USERS.SetTimeZone");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@TimeZone", SqlDbType.Int).Value = TimeZone;
    StoredProc.ExecuteSilent(command);
  }

  // Список фотоотчетов
  public static DataTable GetPhotoReport(object User, object Point)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetPhotoReport");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command, BaseName);
  }

  // Список фотоотчетов по промо
  public static DataTable GetPhotoAction(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetPhotoAction");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command, BaseName);
  }

  // Создание нового фотоотчета
  public static DataTable SetPhotoReport(object User, object Point, object Description, object Category, object Brand = null, object Company = null, object GUID = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetPhotoReport");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@Brand", SqlDbType.Int).Value = Brand;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command, BaseName);
  }

  // Создание фото по промо
  public static DataTable SetPhotoAction(object User, object Point, object Description, object Action, object GUID = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetPhotoAction");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;    
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.Select(command, BaseName);
  }

  // Список доступных компаний
  public static DataTable GetCompany(object User, object Point = null)
  {
    var command = new SqlCommand("CHAT.GetCompany");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

  // Список привязанных к ТТ пользователей
  public static DataTable GetPointUserMap(object User, object Point)
  {
    var command = new SqlCommand("CHAT.GetPointUserMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    return StoredProc.Select(command);
  }

  // вставка визита
  public static void SetVisit(object Point, object User, object IsVisit, object Date, object Lat = null, object Lon = null, object Error = null, object GeoTime = null, object Flag = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetVisit");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@IsVisit", SqlDbType.Int).Value = IsVisit;
    command.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@GeoTime", SqlDbType.DateTime).Value = GeoTime;
    command.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Список виртуальных дат визита
  public static DataTable GetVisitDate(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetVisitDate");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command, BaseName);
  }

  // сохранение виртуальной даты визита
  public static void SetVisitDate(object Point, object User, object Date)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].CHAT.SetVisitDate");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Date", SqlDbType.Date).Value = Date;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Список фотокатегорий
  public static DataTable GetPhotoCategories(object Company)
  {
    var command = new SqlCommand("CHAT.GetPhotoCategories");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    return StoredProc.Select(command);
  }

  // Список стандартов выкладки
  public static DataTable GetStandart(object User)
  {
    var command = new SqlCommand("CHAT.GetStandart");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список стандартов выкладки в привязке к ТТ
  public static DataTable GetStandartMap(object User)
  {
    var command = new SqlCommand("CHAT.GetStandartMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список фото стандарта выкладки
  public static DataTable GetStandartFile(object Standart)
  {
    var command = new SqlCommand("CHAT.GetStandartFile");
    command.Parameters.Add("@Standart", SqlDbType.Int).Value = Standart;
    return StoredProc.Select(command);
  }

  // Список чатов
  public static DataTable GetChatAcceptor(object User, object Flag = null)
  {
    var command = new SqlCommand("CHAT.GetChatAcceptor");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Flag", SqlDbType.VarChar, 3).Value = Flag;
    return StoredProc.Select(command);
  }

  // Список сообщений чатов
  public static DataTable GetChat(object User, object Flag = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CHAT.GetChat");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Flag", SqlDbType.VarChar, 3).Value = Flag;
    return StoredProc.Select(command, BaseName);
  }

  // Список сотрудников группы чата
  public static DataTable GetGroupUserMap(object User, object Group)
  {
    var command = new SqlCommand("CHAT.GetGroupUserMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Group", SqlDbType.Int).Value = Group;
    return StoredProc.Select(command);
  }

  // сохранение привязки сотрудника к группе чата
  public static void SetGroupUserMap(object User, object Group, object Status)
  {
    var command = new SqlCommand("CHAT.SetGroupUserMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Group", SqlDbType.Int).Value = Group;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;

    StoredProc.ExecuteSilent(command);
  }

  // установка флага о прочтении ответа от техподдержки
  public static void SetTicketRead(object User)
  {
    var command = new SqlCommand("USERS.SetTicketRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    StoredProc.ExecuteSilent(command);
  }

  // установка флага о прочтении ответа от администратора системы
  public static void SetTicketAdminRead(object User)
  {
    var command = new SqlCommand("CHAT.SetTicketRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    StoredProc.ExecuteSilent(command);
  }

  // Список настроек пользователя
  public static DataTable GetSetting(object User)
  {
    var command = new SqlCommand("USERS.GetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // сохранение настройки пользователя
  public static void SetSetting(object User, object Magic, object Value)
  {
    var command = new SqlCommand("USERS.SetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    command.Parameters.Add("@Value", SqlDbType.NVarChar, 4000).Value = Value;

    StoredProc.ExecuteSilent(command);
  }

  // правка примечания фото
  public static void PhotoDescriptionEdit(object ID, object Description)
  {
    var command = new SqlCommand("CHAT.PhotoDescriptionEdit");
    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    command.Parameters.Add("@Description", SqlDbType.VarChar, 1024).Value = Description;
    StoredProc.ExecuteSilent(command);
  }

  // сохранение выбранных ТТ для задания
  public static DataTable SetTaskPoint(object User, object Text)
  {
    var command = new SqlCommand("TRASH.SetTaskPoint");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;

    return StoredProc.Select(command);
  }

  // сохранение информации об открытии фото
  public static void SetPhotoLog(object User, object Photo)
  {
    var command = new SqlCommand("LOG.SetPhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Photo", SqlDbType.Int).Value = Photo;
    StoredProc.ExecuteSilent(command);
  }

  // список настроек компании для мобильной версии
  public static DataTable GetCompanySettingMobile(object Company)
  {
    SqlCommand Command = new SqlCommand("CHAT.GetCompanySetting");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    return StoredProc.Select(Command);
  }

  // сохранение маршрута
  public static void SetRoute(object Company, object Point, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7, object Key)
  {
    var command = new SqlCommand("ADMIN2.SetRoute");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Day1", SqlDbType.VarChar, 3).Value = Day1;
    command.Parameters.Add("@Day2", SqlDbType.VarChar, 3).Value = Day2;
    command.Parameters.Add("@Day3", SqlDbType.VarChar, 3).Value = Day3;
    command.Parameters.Add("@Day4", SqlDbType.VarChar, 3).Value = Day4;
    command.Parameters.Add("@Day5", SqlDbType.VarChar, 3).Value = Day5;
    command.Parameters.Add("@Day6", SqlDbType.VarChar, 3).Value = Day6;
    command.Parameters.Add("@Day7", SqlDbType.VarChar, 3).Value = Day7;
    command.Parameters.Add("@Key", SqlDbType.VarChar, 8).Value = Key;
    StoredProc.ExecuteSilent(command);
  }

  //список категорий/ролей/сотрудников для постановки задания к ТТ
  public static List<DataTable> GetTaskPointInfo(object Point, object Author)
  {
    SqlCommand Command = new SqlCommand("TASKS2.GetTaskPointInfo");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    return StoredProc.SelectMany(Command);
  }

  //Создание нового задания к ТТ
  public static void SetTaskPoint2(object Point, object Text, object Category, object Role, object User, object Company, object GUID, object Type, object Author, object BornedVisit = null)
  {
    var command = new SqlCommand("TASKS2.SetTaskPoint");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.VarChar, 4000).Value = Text;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@Role", SqlDbType.Int).Value = Role;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@BornedVisit", SqlDbType.Date).Value = BornedVisit;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Type", SqlDbType.Int).Value = Type;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }
}
public class ReportBusiness
{
  // отчет по заданиям
  public static DataTable Task(object User, object Start = null, object Finish = null, object IsMy = null, object Point = null)
  {
    var command = new SqlCommand("REPORT.Task");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@IsMy", SqlDbType.Int).Value = IsMy;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(command);
  }

  // отчет по заданиям
  public static DataTable TaskFocus(object User, object Start = null, object Finish = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.TaskFocus");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // История по ТТ
  public static DataTable TaskHistory(object User, object Start = null, object Finish = null, object IsMy = null, object Point = null)
  {
    var command = new SqlCommand("REPORT.TaskHistory");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@IsMy", SqlDbType.Int).Value = IsMy;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(command);
  }

  // отчет по фото
  public static DataTable Photo(object User, object Start, object Finish, object Last = null, object Magic = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Photo");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // отчет по SKU
  public static DataTable Art(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Art");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // отчет по промо
  public static DataTable Action(object User, object Start, object Finish, object IsPromo)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Action");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@IsPromo", SqlDbType.Int).Value = IsPromo;

    return StoredProc.Select(command, BaseName);
  }

  // отчет по SKU общий
  public static DataTable ArtMain(object User, object Start, object Finish)
  {
    var command = new SqlCommand("REPORT.ArtMain");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }

  // Индекс 1
  public static DataTable Index1(object User, object Start, object Finish)
  {
    var command = new SqlCommand("REPORT.Index1");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }

  // отчет по визитам
  public static DataTable Visit(object User, object Start, object Finish, object Lang)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Visit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Lang", SqlDbType.VarChar).Value = Lang;

    return StoredProc.Select(command, BaseName);
  }

  // трекинг по дню по сотруднику
  public static DataTable Tracking(object User, object Borned)
  {
    var command = new SqlCommand("REPORT.Tracking");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(command);
  }

  // трекинг по дню по сотруднику
  public static DataTable GeoTracking(object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.GeoTracking");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(command, BaseName);
  }

  //  универсальная процедура выбора справочников
  public static DataTable GetReportDictionary(object User, object ProcName)
  {
    var command = new SqlCommand("REPORT.Get" + ProcName.ToString());
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

  //  универсальная процедура выбора справочников с учетом календаря
  public static DataTable GetReportDictionaryDate(object User, object ProcName, object Start, object Finish)
  {
    var command = new SqlCommand("REPORT.Get" + ProcName.ToString());
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }

  // универсальная процедура сохранения справочников
  public static DataTable SetReportDictionary(object User, object Text, object ProcName)
  {
    var command = new SqlCommand("REPORT.Set" + ProcName.ToString());
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;

    return StoredProc.Select(command);
  }

  // установка выбранных точек для загрузки матрицы по ТТ
  public static DataTable SetArtPointDictionary(object Company, object Text)
  {
    var command = new SqlCommand("REPORT.SetArtPoint");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 100000).Value = Text;

    return StoredProc.Select(command);
  }

  // установка выбранных пользователей для загрузки маршрутов по ТТ
  public static DataTable SetUserPointDictionary(object Company, object Text)
  {
    var command = new SqlCommand("REPORT.SetUserPoint");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;

    return StoredProc.Select(command);
  }

  // меню настроек отчетов
  public static DataTable GetSetting(object User, object Lang)
  {
    var command = new SqlCommand("REPORT.GetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Lang", SqlDbType.VarChar).Value = Lang;

    return StoredProc.Select(command);
  }

  // список всех брендов
  public static DataTable GetBrandAll(object User)
  {
    var command = new SqlCommand("REPORT.GetArtBrandAll");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

  // очистка всех фильтров
  public static void ClearAllFilter(object User)
  {
    var command = new SqlCommand("REPORT.ClearAllFilter");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    StoredProc.ExecuteSilent(command);
  }

  // отчет по фото
  public static DataTable Total(object User, object Start, object Finish, object Last = null, object Magic = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Total");   
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // Отчет по распознаванию по матрицам
  public static DataTable AIMatrix(object User, object Start, object Finish, object Last = null, object Magic = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].AI.Matrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // Отчет по распознаванию по матрицам по ТТ сводный
  public static DataTable AIMatrixTotal(object User, object Start, object Finish, object Last = null, object Magic = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].AI.MatrixTotal");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // список дополнительных отчетов
  public static DataTable GetAdditional(object User)
  {
    var command = new SqlCommand("REPORT.GetAdditional");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

  // список полей дополнительного отчета
  public static DataTable GetField(object Report)
  {
    var command = new SqlCommand("REPORT.GetField");
    command.Parameters.Add("@Report", SqlDbType.Int).Value = Report;

    return StoredProc.Select(command);
  }

  // список дополнительных отчетов
  public static DataTable Run(object Report, object User, object Start, object Finish, object Last = null)
  {
    var command = new SqlCommand("REPORT.Run");
    command.Parameters.Add("@Report", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;

    return StoredProc.Select(command);
  }

  // скрытие фото из фотоотчета
  public static void SetPhotoHide(object ID, object Status, object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].REPORT.SetPhotoHide");
    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;    

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // подтверждение фото
  public static void SetPhotoCheck(object ID, object Status, object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].REPORT.SetPhotoCheck");
    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // подтверждение фото (новое)
  public static void SetPhotoCheck2(object ID, object Status, object User)
  {
    var command = new SqlCommand("REPORT.SetPhotoCheck2");
    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    StoredProc.ExecuteSilent(command);
  }

  // установка оценки фото
  public static void SetPhotoRating(object ID, object Rating, object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].REPORT.SetPhotoRating");
    command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;
    command.Parameters.Add("@Rating", SqlDbType.VarChar, 255).Value = Rating;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Список сообщений
  public static DataTable GetMessage(object User, object Task)
  {
    var command = new SqlCommand("REPORT.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    return StoredProc.Select(command);
  }

  // список посещенных точек
  public static DataTable GetPointVisit(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
   
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.GetPointVisit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // список активных пользователей
  public static DataTable GetUserVisit(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.GetUserVisit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // добавление тт в список выбранных ТТ на визите
  public static DataTable SetPointVisit(object User, object Point, object Status)
  {
    var command = new SqlCommand("REPORT.SetPointVisit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;

    return StoredProc.Select(command);
  }

  // добавление SKU в список выбранных SKU на визите
  public static DataTable SetArtVisit(object User, object Art, object Status)
  {
    var command = new SqlCommand("REPORT.SetArtVisit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;

    return StoredProc.Select(command);
  }

  // добавление пользователей в список выбранных пользователей на визите
  public static DataTable SetUserVisit(object User, object Acceptor, object Status)
  {
    var command = new SqlCommand("REPORT.SetUserVisit");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Acceptor", SqlDbType.Int).Value = Acceptor;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;

    return StoredProc.Select(command);
  }

  // список скрытых полей отчета
  public static DataTable GetHiddenField(object User, object Table)
  {
    var command = new SqlCommand("REPORT.GetHiddenField");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Table", SqlDbType.VarChar, 255).Value = Table;

    return StoredProc.Select(command);
  }

  // сохранение скрытых полей отчетов
  public static DataTable SetHiddenField(object User, object Table, object Field, object Status)
  {
    var command = new SqlCommand("REPORT.SetHiddenField");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Table", SqlDbType.VarChar, 255).Value = Table;
    command.Parameters.Add("@Field", SqlDbType.VarChar, 255).Value = Field;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;

    return StoredProc.Select(command);
  }

  // аналитика: визиты план-факт
  public static DataTable Discipline(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Discipline");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // аналитика: план-факт по визитам
  public static DataTable Route(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.Route");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // аналитика: план-факт по визитам и пользователям
  public static DataTable RouteUsers(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.RouteUsers");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // аналитика: сводный отчет по визитам
  public static DataTable VisitTotal(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.VisitTotal");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }

  // Список скрытых от пользователя отчетов
  public static DataTable GetUserReport(object User)
  {
    var command = new SqlCommand("REPORT.GetUserReport");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    

    return StoredProc.Select(command);
  }

  // Список фото по визиту
  public static DataTable GetVisitPhoto(object Point, object User, object Borned, object GUID = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.GetVisitPhoto");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    return StoredProc.Select(command, BaseName);
  }

  // Список дополнительных фото
  public static DataTable GetAdditionalPhotos(object Point, object Borned)
  {
    var command = new SqlCommand("REPORT.GetAdditionalPhotos");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(command);
  }

  // тест
  public static DataTable Test(object User)
  {
    var command = new SqlCommand("REPORT.Test");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

  // маршруты сводный
  public static DataTable RouteTotal(object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].REPORT.RouteTotal");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // ошибки маршрутизации
  public static DataTable RouteError(object User, object Start, object Finish)
  {
    var command = new SqlCommand("REPORT.RouteError");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }

  // отчет по наличию
  public static DataTable Stock(object User, object Start, object Finish, object Last)
  {
    var command = new SqlCommand("REPORT.Stock");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;

    return StoredProc.Select(command);
  }

  // фото для финального отчета  
  public static DataTable DiksiGetPhoto(object Point, object User, object Borned, object Art)
  {
    var command = new SqlCommand("[GTS_ADD].DIKSI.GetPhoto");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;

    return StoredProc.Select(command);
  }

  // справочник по скю
  public static DataTable DirectoryArt(object User)
  {
      var command = new SqlCommand("REPORT.DirectoryArt");
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;

      return StoredProc.Select(command);
  }

  // справочник матрица скю в тт
  public static DataTable DirectoryArtPointMaps(object User)
  {
      var command = new SqlCommand("REPORT.DirectoryArtPointMaps");
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;

      return StoredProc.Select(command);
  }

  // справочник матрица скю по форматам
  public static DataTable DirectoryArtFormatMap(object User)
  {
      var command = new SqlCommand("REPORT.DirectoryArtFormatMap");
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;

      return StoredProc.Select(command);
  }

  // справочник матрица скю по сетям
  public static DataTable DirectoryArtNetworkMap(object User)
  {
      var command = new SqlCommand("REPORT.DirectoryArtNetworkMap");
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;

      return StoredProc.Select(command);
  }

  // справочник адреcная программа 
  public static DataTable DirectoryAP(object User)
  {
    var command = new SqlCommand("REPORT.DirectoryAP");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(command);
  }

    //  Список ТТ для карты
    public static DataTable MapPointReport(object User, object Start, object Finish)
  {
    var command = new SqlCommand("REPORT.MapPointReport");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command);
  }
}

public class ActionBusiness
{
  // список вопросов
  public static DataTable GetQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список перечислимых ответов
  public static DataTable GetQuestionOption(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetQuestionOption");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список промо
  public static DataTable GetAction(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // привязка промо к ТТ
  public static DataTable GetActionPointMap(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetActionPointMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список SKU по ТТ 
  public static DataTable GetArtMatrix(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetArtMatrix");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список SKU для промо
  public static DataTable GetActionMatrix(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetActionMatrix");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение проекта по мониторингу
  public static DataTable SetProject(object Project, object Company, object Name, object Description, object Start, object Finish)
  {
    string BaseName = "MONITORING";

    var command = new SqlCommand("[" + BaseName + "].MONITORING.SetProject");
    command.Parameters.Add("@Project", SqlDbType.Int).Value = Project;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Description", SqlDbType.VarChar, 1024).Value = Description;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(command, BaseName);
  }

  // удаление проекта по мониторингу
  public static void DeleteProject(object Project)
  {
    string BaseName = "MONITORING";

    var command = new SqlCommand("[" + BaseName + "].MONITORING.DeleteProject");
    command.Parameters.Add("@Project", SqlDbType.Int).Value = Project;
    StoredProc.ExecuteSilent(command);
  }

  // восстановление проекта по мониторингу
  public static void RestoreProject(object Project)
  {
    string BaseName = "MONITORING";

    var command = new SqlCommand("[" + BaseName + "].MONITORING.RestoreProject");
    command.Parameters.Add("@Project", SqlDbType.Int).Value = Project;
    StoredProc.ExecuteSilent(command);
  }

  public static DataTable GetMonitoring(object Company, object Status)
  {
    string BaseName = "MONITORING";

    var Command = new SqlCommand("[" + BaseName + "].MONITORING.GetProject");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    return StoredProc.Select(Command, BaseName);
  }
}

public class AppBusiness
{
  // список сетей
  public static DataTable GetNetwork(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetNetwork");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список ТТ
  public static DataTable GetPoint(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPoint");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetBrand(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetBrand");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetArt(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArt");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // настройки компании пользователя
  public static DataTable GetCompanySetting(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanySetting");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний
  public static DataTable GetCompany(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompany");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний-контрагентов в точках
  public static DataTable GetCompanyPointMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanyPointMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний-контрагентов в точках версия 2
  // добавлены дополнительные поля для корректной работы агенств
  public static DataTable GetCompanyPointMapV2(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanyPointMapV2");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список категорий фото
  public static DataTable GetPhotoCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPhotoCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // вставка визита
  public static void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object IsBorned, object GUID, object GeoTime = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisit");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@IsVisit", SqlDbType.Int).Value = IsVisit;
    command.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@GeoTime", SqlDbType.DateTime).Value = GeoTime;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Создание нового фотоотчета
  public static void SetPhotoReport(object Point, object User, object Company, object Category, object Brand, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoReport");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@Brand", SqlDbType.Int).Value = Brand;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // сохранение фото
  public static string SetPhoto(object Magic, object User, object GUID, object Name, object Lat, object Lon, object Error, object GeoTime = null, object Point = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhoto");
    SqlParameter Signature = command.Parameters.Add("@Signature", SqlDbType.VarChar, 4000);
    Signature.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 1024).Value = Name;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@GeoTime", SqlDbType.VarChar, 255).Value = GeoTime;

    StoredProc.Execute(command, BaseName);

    return Signature.Value.ToString();
  }

  // матрицы по сети по формату
  public static DataTable GetArtNetworkMatrix(object User)
  {
    var command = new SqlCommand("APP.GetArtNetworkMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

    // матрицы по сети по формату версия 2
    // новый метод получения матриц 
    // передается поле State а также параметры значение клиента и исполнителя для матриц по формату
    public static DataTable GetArtNetworkMatrixV2(object User)
  {
    var command = new SqlCommand("APP.GetArtNetworkMatrixV2");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

    // матрицы по сети по формату со статусом (для Кампари)
    public static DataTable GetArtNetworkMatrixExtended(object User)
  {
    var command = new SqlCommand("APP.GetArtNetworkMatrixExtended");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ 
  public static DataTable GetArtPointMatrix(object User)
  {
    var command = new SqlCommand("APP.GetArtPointMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ со статусом (для Кампари)
  public static DataTable GetArtPointMatrixExtended(object User)
  {
    var command = new SqlCommand("APP.GetArtPointMatrixExtended");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // список анкет
  public static DataTable GetAction(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }


  // список анкет расширенный для Кампари
  public static DataTable GetActionExtended(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionExtended");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список анкет в ТТ
  public static DataTable GetActionPointMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionPointMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список брендов для анкет
  public static DataTable GetActionBrandMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionBrandMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список вопросов
  public static DataTable GetQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список подчиненных вопросов-ветвлений
  public static DataTable GetSlaveQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetSlaveQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список зависимых вопросов
  public static DataTable GetLinkedQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetLinkedQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список диапазонов ответов по числовым вопросам
  public static DataTable GetArtQuestionRange(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtQuestionRange");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список перечислимых ответов
  public static DataTable GetQuestionOption(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionOption");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение ответов по sku
  public static DataTable SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  //сохранение ответов (с мастер вопросом ветвления)
  public static void SetArt2(object Point, object User, object Action, object Art, object Master, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Master", SqlDbType.Int).Value = Master;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  //сохранение ответов (с мастер вопросом ветвления)
  public static void DeleteMultiAnswer(object Point, object User, object Action, object Art, object Master, object Question, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.DeleteMultiAnswer");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Master", SqlDbType.Int).Value = Master;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  //удаление фото
  public static void DeletePhotoVisit(object User, object Photo)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.DeletePhoto");
    command.Parameters.Add("@Photo", SqlDbType.Int).Value = Photo;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Создание нового фотоотчета по промо-акции
  public static void SetPhotoAction(object Point, object User, object Action, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned, object Brand = null)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoAction");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;
    command.Parameters.Add("@Brand", SqlDbType.Int).Value = Brand;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // правка комментария к фото
  public static void SetPhotoDescription(object GUID, object Description)
  {
    string BaseName = SystemBusiness.GetBaseFromPhoto(GUID);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoDescription");
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    
    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Список заданий
  public static DataTable GetTask(object User)
  {
    var command = new SqlCommand("APP.GetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    return StoredProc.Select(command);
  }

  // Список сообщений
  public static DataTable GetMessage(object User)
  {
    var command = new SqlCommand("APP.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    return StoredProc.Select(command);
  }

  // Список должностей компании
  public static DataTable GetUserRole(object User)
  {
    var command = new SqlCommand("APP.GetUserRole");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сотрудников компании
  public static DataTable GetUser(object User)
  {
    var command = new SqlCommand("APP.GetUser");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // список закреплений сотрудников за ТТ
  public static DataTable GetUserPointMap(object User)
  {
    var command = new SqlCommand("APP.GetUserPointMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Создание нового задания
  public static DataTable SetTask(object User, object Point, object Acceptor, object Text, object Category, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Acceptor", SqlDbType.NVarChar, 4000).Value = Acceptor;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  // Создание нового сообщения
  public static DataTable SetMessage(object Task, object User, object Text, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetMessage");
    command.Parameters.Add("@TaskGUID", SqlDbType.VarChar, 255).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  // уведомление о прочтении сообщения
  public static void SetMessageRead(object User, object Point, object Task)
  {
    var command = new SqlCommand("APP.SetMessageRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@TaskGUID", SqlDbType.VarChar, 255).Value = Task;
    StoredProc.ExecuteSilent(command);
  }

  // Список стандартов выкладки
  public static DataTable GetStandart(object User)
  {
    var command = new SqlCommand("APP.GetStandart");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список стандартов выкладки в привязке к ТТ
  public static DataTable GetStandartMap(object User)
  {
    var command = new SqlCommand("APP.GetStandartMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список фото стандарта выкладки
  public static DataTable GetStandartFile(object User)
  {
    var command = new SqlCommand("APP.GetStandartFile");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список тикетов для техподдержки
  public static DataTable GetTicket(object User)
  {
    var command = new SqlCommand("APP.GetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список тикетов для администратора
  public static DataTable GetTicketAdmin(object User)
  {
    var command = new SqlCommand("APP.GetTicketAdmin");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // сохранение информации об аппарате пользователя(можно удалить метод после 07.2025)
  public static void SetPhoneInfo(object Phone, object Model, object Device, object Version, object AppVersion, object SendData)
  {
    var command = new SqlCommand("APP.SetPhoneInfo");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 1024).Value = Model;
    command.Parameters.Add("@Device", SqlDbType.VarChar, 1024).Value = Device;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;
    command.Parameters.Add("@AppVersion", SqlDbType.VarChar, 255).Value = AppVersion;
    command.Parameters.Add("@SendData", SqlDbType.VarChar, 255).Value = SendData;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение информации об аппарате пользователя
  public static void SetPhoneInfo2(object Phone, object Model, object Device, object DeviceID, object Version, object AppVersion, object SendData)
  {
    var command = new SqlCommand("APP.SetPhoneInfo");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 1024).Value = Model;
    command.Parameters.Add("@Device", SqlDbType.VarChar, 1024).Value = Device;
    command.Parameters.Add("@DeviceID", SqlDbType.VarChar, 1024).Value = DeviceID;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;
    command.Parameters.Add("@AppVersion", SqlDbType.VarChar, 255).Value = AppVersion;
    command.Parameters.Add("@SendData", SqlDbType.VarChar, 255).Value = SendData;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение трекинга пользователя
  public static void SetTrack(object User, object Borned, object Start, object Lat, object Lon, object Error)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetTrack");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Start", SqlDbType.DateTime).Value = Start;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 1024).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 1024).Value = Error;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Сохранение журнала ошибок
  public static DataTable SetError(object User, object Borned, object Description)
  {
    

    string BaseName = SystemBusiness.GetBase(User);    

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetLog");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;

    return StoredProc.Select(command, BaseName);
  }

  // Сохранение журнала ошибок
  public static void SetErrorWeb(object User, object Description)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetWebLog");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Замена (удаление) фото
  public static DataTable ReplacePhoto(object User, object GUID, object Magic)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.ReplacePhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // Список фокусных задач
  public static DataTable GetFocusTask(object User)
  {
    var command = new SqlCommand("APP.GetFocusTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // маршрут фокусных задач
  public static DataTable GetFocusTaskTail(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskTail");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // файлы фокусных задач
  public static DataTable GetFocusTaskFiles(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskFiles");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // SKU фокусных задач
  public static DataTable GetFocusTaskArt(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskArt");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // уведомление о прочтении фокусной задачи
  public static void SetFocusTaskRead(object Task, object User, object Point)
  {
    var command = new SqlCommand("APP.SetFocusTaskRead");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    StoredProc.ExecuteSilent(command);
  }

  // Создание нового сообщения по фокусной задаче
  public static DataTable SetMessageFocus(object Task, object GUID, object User, object Point, object Text, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetMessageFocus");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;    
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  // загрузка предыдущих ответов по ТТ
  public static DataTable GetLastAnswer(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
  
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetLastAnswer");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список категорий задач
  public static DataTable GetTaskCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetTaskCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение виртуальной даты визита
  public static void SetVisitDate(object Point, object User, object Borned, object Date)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisitDate");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Date", SqlDbType.Date).Value = Date;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // список фото по SKU
  public static DataTable GetArtPhotos(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtPhotos");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список ссылок по SKU
  public static DataTable GetArtLinks(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtLinks");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список атрибутов ТТ компании
  public static DataTable GetPointAttribute(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPointAttribute");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список значений атрибутов ТТ компании
  public static DataTable GetPointAttributeValue(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPointAttributeValue");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // системный список значений атрибутов ТТ компании
  public static DataTable GetSystemPointAttribute(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetSystemPointAttribute");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список подчиненных
  public static DataTable GetSlave(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
   
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlave");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список посещенных ТТ пользователем за сегодня
  public static DataTable GetSlaveVisit(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveVisit");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список фотоотчетов по визиту
  public static DataTable GetSlavePhoto(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);
   
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlavePhoto");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список фотоотчетов по визиту
  public static DataTable GetSlavePhoto2(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlavePhoto2");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список ответов на анкеты в ТТ пользователем за сегодня
  public static DataTable GetSlaveArtsAnswers(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveArtsAnswers");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список всех ответов за визит (фото и скю)
  public static DataTable GetSlaveAnswers(object Client, object Point, object User, object Borned)
  {
      var Command = new SqlCommand("APP.GetSlaveAnswers");
      Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
      Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
      Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
      Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

      return StoredProc.Select(Command);
  }

    // список визитов по ТТ за выбранные даты
  public static DataTable GetSlaveVisitsOnDate(object Point, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBaseFromPoint(Point);
    
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveVisitsOnDate");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(Command, BaseName);
  }

  // список визитов по ТТ за выбранные даты (вторая версия)
  public static DataTable GetSlaveVisitsOnDate2(object Client, object Point, object Start, object Finish)
  {
    var Command = new SqlCommand("APP.GetSlaveVisitsOnDate2");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(Command);
  }

  // список остатков по Магниту
  public static DataTable GetMagnit(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetMagnit");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  //сохранение информации об устройстве для каждого визита(можно удалить метод и процедуры у клиентов после 07.2025)
  public static void SetVisitDevice(object User, object GUID, object Model = null, object Version = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisitDevice");
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 255).Value = Model;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  //сохранение информации об устройстве для каждого визита
  public static void SetVisitDevice2(object User, object GUID, object Model = null, object DeviceID = null, object Version = null)
  {
    SqlCommand Command = new SqlCommand("APP.SetVisitDevice");
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    Command.Parameters.Add("@Model", SqlDbType.VarChar, 255).Value = Model;
    Command.Parameters.Add("@DeviceID", SqlDbType.VarChar, 255).Value = DeviceID;
    Command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;

    StoredProc.ExecuteSilent(Command); 
  }

  // список визитов для стартовой страницы в приложении отчетности
  public static DataTable GetDashboardVisits(object User, object Period)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetDashboardVisits");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Period", SqlDbType.Int).Value = Period;

    return StoredProc.Select(Command, BaseName);
  }

  // получение данных по выбранному визиту
  public static DataTable GetVisitData(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetVisitData");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.VarChar, 255).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // получение списка отчетов
  public static DataTable GetReportList(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetReportList");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // поиск по ТТ и пользователям
  public static DataTable SearchData(object User, object Search)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.SearchData");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Search", SqlDbType.VarChar, 255).Value = Search;

    return StoredProc.Select(Command, BaseName);
  }

  // показ списка визитов по выбранному пользователю/ТТ
  public static DataTable GetVisitsList(object User, object TypeID, object ID)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetVisitsList");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@TypeID", SqlDbType.Int).Value = TypeID;
    Command.Parameters.Add("@ID", SqlDbType.Int).Value = ID;

    return StoredProc.Select(Command, BaseName);
  }

  // получение списка файлов закрепленных за анкетой
  public static DataTable GetActionFiles(object User)
  {
    var Command = new SqlCommand("APP.GetActionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // получение списка задач
  public static DataTable GetTasksList(object User, object PointID, object TaskStatus)
  {
    var Command = new SqlCommand("APP.GetTasksList");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@PointID", SqlDbType.Int).Value = PointID;
    Command.Parameters.Add("@TaskStatus", SqlDbType.Int).Value = TaskStatus;

    return StoredProc.Select(Command);
  }

  // получение списка сообщений по задаче
  public static DataTable GetMessagesList(object User, object TaskID)
  {
    var Command = new SqlCommand("APP.GetMessagesList");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@TaskID", SqlDbType.Int).Value = TaskID;

    return StoredProc.Select(Command);
  }

  // список фото для вопросов
  public static DataTable GetQuestionPhotoMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionPhotoMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список уникальных фото-файлов для вопросов (для полной синхронизации)
  public static DataTable GetQuestionPhotos(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionPhotos");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список маршрутов на неделю
  public static DataTable GetWeekRoutes(object User, object KeyAPI)
  {
    SqlCommand Command = new SqlCommand("APP.GetWeekRoutes");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@KeyAPI", SqlDbType.VarChar, 255).Value = KeyAPI;

    return StoredProc.Select(Command);
  }

  // список файлов для вопросов
  public static DataTable GetQuestionFiles(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Создание ТТ
  public static DataTable CreatePoint(object Point, object UserID, object Key, object Magic, object Company, object OfficeName, object CityName, object NetworkName, object Name,
                           object Address, object FormatName, object Lat, object Lon, object OutCode, object Filter = null, object IsGeo = null,
                           object Extra1 = null, object Extra2 = null, object Extra3 = null, object Extra4 = null)
  {
    var command = new SqlCommand("APP.CreatePoint");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;                              // 1
    command.Parameters.Add("@UserID", SqlDbType.Int).Value = UserID;                            // 2
    command.Parameters.Add("@Key", SqlDbType.VarChar, 8).Value = Key;                           // 3
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;                     // 4      
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;                          // 5
    command.Parameters.Add("@OfficeName", SqlDbType.VarChar, 255).Value = OfficeName;           // 6
    command.Parameters.Add("@CityName", SqlDbType.VarChar, 255).Value = CityName;               // 7
    command.Parameters.Add("@NetworkName", SqlDbType.VarChar, 255).Value = NetworkName;         // 8
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;                       // 9
    command.Parameters.Add("@Address", SqlDbType.VarChar, 1024).Value = Address;                // 10
    command.Parameters.Add("@FormatName", SqlDbType.VarChar, 255).Value = FormatName;           // 11
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;                         // 12
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;                         // 13
    command.Parameters.Add("@OutCode", SqlDbType.VarChar, 255).Value = OutCode;                 // 14  
    command.Parameters.Add("@Filter", SqlDbType.VarChar, 255).Value = Filter;                   // 15
    command.Parameters.Add("@IsGeo", SqlDbType.Int).Value = IsGeo;                              // 16
    command.Parameters.Add("@Extra1", SqlDbType.VarChar, 255).Value = Extra1;                   // 17
    command.Parameters.Add("@Extra2", SqlDbType.VarChar, 255).Value = Extra2;                   // 18  
    command.Parameters.Add("@Extra3", SqlDbType.VarChar, 255).Value = Extra3;                   // 19
    command.Parameters.Add("@Extra4", SqlDbType.VarChar, 255).Value = Extra4;                   // 20
    return StoredProc.Select(command);
  }

  // Закрепление\открепление ТТ за пользователем
  public static void SetUserPointMap(object User, object Point, object Status, object Author, object Key, object Magic)
  {
    var command = new SqlCommand("APP.SetUserPointMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    command.Parameters.Add("@Key", SqlDbType.VarChar, 8).Value = Key;                          
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    StoredProc.ExecuteSilent(command);
  }

  // Отправка новой задачи по фото
  public static string SendTask(object user, object point, object text, object guID, object photoID)
  {
    var command = new SqlCommand("APP.SendTask");
    command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    command.Parameters.Add("@point", SqlDbType.Int).Value = point;
    command.Parameters.Add("@text", SqlDbType.NVarChar, 4000).Value = text;
    command.Parameters.Add("@guID", SqlDbType.VarChar, 255).Value = guID;
    command.Parameters.Add("@photoID", SqlDbType.Int).Value = photoID;

    StoredProc.ExecuteSilent(command);
    return "";
  }

  // список форматов сетей
  public static DataTable GetFormat(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetFormat");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список дистрибьюторов (или другое поле в зависимости от клиента)
  public static DataTable GetDistributor(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetDistributor");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  //  список ответов по визиту
  public static DataTable GetVisitAnswers(object Client, object Point, object User, object Borned)
  {
    SqlCommand Command = new SqlCommand("APP.GetVisitAnswers");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command);
  }

  //список вариантов для закрытие визита без заполнения обязательной отчетность
  public static DataTable GetOptionsVisitFinish(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetOptionsVisitFinish");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  //закрытие визита без заполнения обязательной отчетность
  public static void SetVisitFinish(object Point, object User, object Borned, object FinishID, object GUID)
  {
    SqlCommand Command = new SqlCommand("APP.SetVisitFinish");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.VarChar, 255).Value = Borned;
    Command.Parameters.Add("@FinishID", SqlDbType.Int).Value = FinishID;
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    StoredProc.ExecuteSilent(Command);
  }

  // загрузка моделей распознавания
  public static DataTable GetAIModels(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetModel");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // загрузка анкет для распознавания
  public static DataTable GetAIActions(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // загрузка списка моделей для анкеты
  public static DataTable GetAIActionModelMaps(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetActionModelMaps");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // Загрузка категорий SKU для распознавания
  public static DataTable GetAICategories(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetArtCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // Загрузка SKU для распознавания
  public static DataTable GetAIArts(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetArt");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // загрузка всей информации для распознавания
  public static List<DataTable> GetAI(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetAI");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.SelectMany(Command);
  }

  // загрузка всей информации для распознавания v2
  public static List<DataTable> GetAI2(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetAI2");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.SelectMany(Command);
  }

  // сохранение результатов распознавания
  public static void SetAIResult(object Company, object Point, object User, object Borned, object Action, object Category, object Art, object FileName, object Name, object x, object y, object x2, object y2, object Score, object ShelfNum, object HorizontNum, object Path)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetResult");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@FileName", SqlDbType.VarChar, 255).Value = FileName;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@x", SqlDbType.Int).Value = x;
    command.Parameters.Add("@y", SqlDbType.Int).Value = y;
    command.Parameters.Add("@x2", SqlDbType.Int).Value = x2;
    command.Parameters.Add("@y2", SqlDbType.Int).Value = y2;
    command.Parameters.Add("@Score", SqlDbType.Int).Value = Score;
    command.Parameters.Add("@ShelfNum", SqlDbType.Int).Value = ShelfNum;
    command.Parameters.Add("@HorizontNum", SqlDbType.Int).Value = HorizontNum;
    command.Parameters.Add("@Path", SqlDbType.VarChar, 255).Value = Path;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение результатов распознавания
  /*public static void SetAIResult2(object Company, object GUID, object Array)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetResult2");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = Array;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение боксов
  public static void SetAIBoxes(object Company, object GUID, object Array)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetBox");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = Array;

    StoredProc.ExecuteSilent(command);
  }*/

  //сохранение инфо о фото по распознаванию
  public static void SetAIPhoto(object Company, object Point, object User, object Borned, object Action, object Category, object GUID, object Path)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetPhoto");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@FileName", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Path", SqlDbType.VarChar, 255).Value = Path;

    StoredProc.ExecuteSilent(command);
  }

  //сохранение инфо о фото по распознаванию
  public static void SetAIPhoto2(object Company, object Point, object User, object Borned, object Action, object Category, object GUID, object Path)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetPhoto2");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Path", SqlDbType.VarChar, 255).Value = Path;

    StoredProc.ExecuteSilent(command);
  }

  //сохранение инфо о фото по распознаванию - без категории распознавания
  public static void SetAIPhoto3(object Company, object Point, object User, object Borned, object Action, object GUID, object Path)
  {
    var command = new SqlCommand("[AI.GTS].APP.SetPhoto3");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;    
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Path", SqlDbType.VarChar, 255).Value = Path;

    StoredProc.ExecuteSilent(command);
  }

  // удаление результатов распознавания
  public static void DeleteAIResult(object Company, object Point, object User, object Borned, object Action, object Category, object FileName)
  {
    var command = new SqlCommand("[AI.GTS].APP.DeleteResult");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@FileName", SqlDbType.VarChar, 255).Value = FileName;
    
    StoredProc.ExecuteSilent(command);
  }

  public static void DeleteAIResult2(object Company, object GUID)
  {
    var command = new SqlCommand("[AI.GTS].APP.DeleteResult2");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    StoredProc.ExecuteSilent(command);
  }

  // удаление фото
  public static void DeletePhoto(object User, object GUID)
  {
    var command = new SqlCommand("[AI.GTS].APP.DeletePhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    StoredProc.ExecuteSilent(command);
  }

  // Общие настройки для распознавания
  public static DataTable GetAISetting(object User)
  {
    SqlCommand Command = new SqlCommand("[AI.GTS].APP.GetSetting");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // Вопросы ветвления анкеты
  public static DataTable GetAIQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetAIQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // список маршрутов руководителя
  public static DataTable GetNodes(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetNodes");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // установить новую дату для маршрута
  public static DataTable SetRouteChanges(object NodeID, object PointID, object CompanyID, object UserID, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7)
  {
    SqlCommand Command = new SqlCommand("APP.SetRouteChanges");
    Command.Parameters.Add("@NodeID", SqlDbType.Int).Value = NodeID;
    Command.Parameters.Add("@PointID", SqlDbType.Int).Value = PointID;
    Command.Parameters.Add("@CompanyID", SqlDbType.Int).Value = CompanyID;
    Command.Parameters.Add("@UserID", SqlDbType.Int).Value = UserID;
    Command.Parameters.Add("@Day1", SqlDbType.Int).Value = Day1;
    Command.Parameters.Add("@Day2", SqlDbType.Int).Value = Day2;
    Command.Parameters.Add("@Day3", SqlDbType.Int).Value = Day3;
    Command.Parameters.Add("@Day4", SqlDbType.Int).Value = Day4;
    Command.Parameters.Add("@Day5", SqlDbType.Int).Value = Day5;
    Command.Parameters.Add("@Day6", SqlDbType.Int).Value = Day6;
    Command.Parameters.Add("@Day7", SqlDbType.Int).Value = Day7;

    return StoredProc.Select(Command);
  }

  // // Сохранение версии detection
  public static void SetDetectionVersion(object User, object Company, object Version) {
    var command = new SqlCommand("[AI.GTS].APP.SetVersion");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;

    StoredProc.ExecuteSilent(command);
  }
}

public class DesktopBusiness
{
  // список сотрудников для задания
  public static DataTable GetAcceptor(object User, object Point, object Client = null)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetAcceptor");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;

    return StoredProc.Select(Command);
  }

  // скрытие меню для компании
  public static DataTable GetMenu(object User)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetMenu");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список готовых отчетов
  public static DataTable GetReportReady(object User)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetReportReady");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // маршруты
  public static DataTable GetRoute(object User)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetRoute");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // правка отчета по SKU
  public static void SetAnswer(object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer)
  {
    string BaseName = SystemBusiness.GetBase(User);
    
    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].DESKTOP.SetAnswer");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // сохранение маршрута
  public static void SetRoute(object Company, object Point, object User, object Link, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7, object Author)
  {
    var command = new SqlCommand("DESKTOP.SetRoute");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Link", SqlDbType.VarChar, 3).Value = Link;
    command.Parameters.Add("@Day1", SqlDbType.VarChar, 3).Value = Day1;
    command.Parameters.Add("@Day2", SqlDbType.VarChar, 3).Value = Day2;
    command.Parameters.Add("@Day3", SqlDbType.VarChar, 3).Value = Day3;
    command.Parameters.Add("@Day4", SqlDbType.VarChar, 3).Value = Day4;
    command.Parameters.Add("@Day5", SqlDbType.VarChar, 3).Value = Day5;
    command.Parameters.Add("@Day6", SqlDbType.VarChar, 3).Value = Day6;
    command.Parameters.Add("@Day7", SqlDbType.VarChar, 3).Value = Day7;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  // табель рабочего времени
  public static DataTable GetTimeSheet(object User, object Borned)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetTimeSheet");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command);
  }

  // сохранение табеля рабочего времени
  public static void SetTimeSheet(object User, object Borned, object Status)
  {
    var command = new SqlCommand("DESKTOP.SetTimeSheet");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    StoredProc.ExecuteSilent(command);
  }

  // Маршруты
  public static DataTable GetRoute2(object Company, object Start, object Finish, object User, object Flag, object OfficeName, object RoleName)
  {
    string BaseName = SystemBusiness.GetBaseFromCompany(Company);
    
    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].DESKTOP.GetRoute2");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;
    Command.Parameters.Add("@OfficeName", SqlDbType.NVarChar, 4000).Value = OfficeName;
    Command.Parameters.Add("@RoleName", SqlDbType.NVarChar, 4000).Value = RoleName;
    return StoredProc.Select(Command, BaseName);
  }

  // сохранение маршрута
  public static void SetRoute2(object Company, object Point, object RoleName, object CompanyName, object User, object Borned, object Value)
  {
    var command = new SqlCommand("DESKTOP.SetRoute2");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@RoleName", SqlDbType.VarChar, 255).Value = RoleName;
    command.Parameters.Add("@CompanyName", SqlDbType.VarChar, 255).Value = CompanyName;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Value", SqlDbType.VarChar, 255).Value = Value;
    StoredProc.ExecuteSilent(command);
  }

  public static DataTable SetRouteDescription(object Company, object CompanyName, object Point, object User, object Borned, object Description, object Author)
  {
    var command = new SqlCommand("DESKTOP.SetRouteComment");
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@CompanyName", SqlDbType.VarChar, 255).Value = CompanyName;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    return StoredProc.Select(command);
  }

  //копирование маршрута с текущей недели на следующую
  public static void CopyRouteWeek(object Point, object User, object Company, object Author)
  {
    var command = new SqlCommand("DESKTOP.CopyRouteWeek");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  //очистка маршрута сотрудника с завтра
  public static void CleanRoute(object Point, object User, object Company, object Author)
  {
    var command = new SqlCommand("DESKTOP.CleanRoute");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  //копирование маршрута с текущей недели на следующую по всем подчиненным сотрудникам
  public static void CopyRouteWeekAll(object Flag, object Author)
  {
    var command = new SqlCommand("DESKTOP.CopyRouteWeekAll");
    command.Parameters.Add("@Flag", SqlDbType.Int).Value = Flag;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  // список фото PLU
  public static DataTable GetPLU()
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetPLU");
    
    return StoredProc.Select(Command);
  }

  // список рекламаций для визита
  public static DataTable GetTaskVisit(object User, object GUID)
  {
    SqlCommand Command = new SqlCommand("DESKTOP.GetTaskVisit");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    return StoredProc.Select(Command);
  }

  // сохранение рекламации по визиту
  public static DataTable SetTaskVisit(object GUID, object Task, object User, object Description)
  {
    var command = new SqlCommand("DESKTOP.SetTaskVisit");   
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Task", SqlDbType.NVarChar, 4000).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;

    return StoredProc.Select(command);
  }

  // Винагро отчет по наличию для рекламаций по визиту
  public static DataTable GetVisitArt(object User, object Point, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].DESKTOP.GetVisitArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(command, BaseName);
  }

  //сохранение ответа для отчетов
  public static void SetReportAnswer(object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer, object Company, object Report, object Author)
  {    
    var command = new SqlCommand("REPORT.SetReportAnswer");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Report", SqlDbType.VarChar, 255).Value = Report;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    StoredProc.ExecuteSilent(command);
  }

  //Сохранение данных ап
  public static void SetPointStatus(object PointID, object CompanyID, object Status, object Author)
  {
    var command = new SqlCommand("[GTS].[DICT].[SetPointStatus]");
    command.Parameters.Add("@PointID", SqlDbType.Int).Value = PointID;
    command.Parameters.Add("@CompanyID", SqlDbType.Int).Value = CompanyID;
    command.Parameters.Add("@Status", SqlDbType.TinyInt).Value = Status;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
  
    StoredProc.ExecuteSilent(command);
  }

  // Загрузка меню
  public static DataTable GetMenuCustom(object Company, object MenuName, object Lang, object User)
  {
    SqlCommand Command = new SqlCommand("MENU.GetMenu");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@MenuName", SqlDbType.VarChar, 255).Value = MenuName;
    Command.Parameters.Add("@Lang", SqlDbType.VarChar, 255).Value = Lang;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Маршруты конфигурация столбцов
  public static DataTable GetRouteConfig(object Start, object Finish)
  {
    SqlCommand Command = new SqlCommand("ADMIN2.GetRouteConfig");
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    return StoredProc.Select(Command);
  }

  // выбор справочников
  public static DataTable GetDictionary(object Company, object ProcName, object Key)
  {
    SqlCommand Command = new SqlCommand(ProcName.ToString());
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Key", SqlDbType.VarChar, 8).Value = Key;
    return StoredProc.Select(Command);
  }

  //Шторк сохранение комента по отчету "Расчет бонусов полевой структуре"
  public static DataTable SetBonusPlan(object User, object Start, object WorkDay, object IsCheck, object Comment, object Bonus, object Author)
  {
    var command = new SqlCommand("[GTS_ADD].STORCK.SetBonusPlan");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@WorkDay", SqlDbType.Int).Value = WorkDay;
    command.Parameters.Add("@IsCheck", SqlDbType.Int).Value = IsCheck;
    command.Parameters.Add("@Comment", SqlDbType.VarChar,1024).Value = Comment;
    command.Parameters.Add("@Bonus", SqlDbType.VarChar,50).Value = Bonus;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    return StoredProc.Select(command);
  }

  //Шторк сохранение комента по отчету "ТАБЕЛЬ"
  public static DataTable SetTimesheet(object User, object Borned, object Type, object Answer, object Author)
  {
    var command = new SqlCommand("[GTS_ADD].STORCK.SetTimesheet");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Type", SqlDbType.Int).Value = Type;
    command.Parameters.Add("@Answer", SqlDbType.VarChar, 20).Value = Answer;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    return StoredProc.Select(command);
  }

  //сохранение проверки визита
  public static void SetVisitCheck(object Point, object User, object Borned, object GUID, object IsCheck, object Author)
  {
    var command = new SqlCommand("DESKTOP.SetVisitCheck");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@IsCheck", SqlDbType.Int).Value = IsCheck;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    StoredProc.ExecuteSilent(command);
  }

  //сохранение статуса актуальности претензии
  public static void SetTaskActual(object Task, object IsActual)
  {
    var command = new SqlCommand("CHAT.SetTaskActual");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@IsActual", SqlDbType.Int).Value = IsActual;

    StoredProc.ExecuteSilent(command);
  }

  //удаление визита
  public static void SetDeleteVisits(object Point, object User, object Borned, object Author)
  {
    var command = new SqlCommand("DESKTOP.SetDeleteVisits");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    StoredProc.ExecuteSilent(command);
  }

  //удаление задания
  public static void SetDeleteTasks(object Task, object Author)
  {
    var command = new SqlCommand("DESKTOP.SetDeleteTasks");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;

    StoredProc.ExecuteSilent(command);
  }
}

public class ReplicationBusiness
{
  // список ТТ
  public static DataTable GetPoint()
  {
    SqlCommand Command = new SqlCommand("DICT.GetPoint");
    return StoredProc.Select(Command);
  }

  // список сотрудников
  public static DataTable GetUser()
  {
    SqlCommand Command = new SqlCommand("DICT.GetUser");
    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetArt()
  {
    SqlCommand Command = new SqlCommand("DICT.GetArt");
    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetQuestion()
  {
    SqlCommand Command = new SqlCommand("DICT.GetQuestion");
    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetAction()
  {
    SqlCommand Command = new SqlCommand("DICT.GetAction");
    return StoredProc.Select(Command);
  }

  // список визитов
  public static DataTable GetVisit(object Start = null, object Finish = null)
  {
    if (StoredProc.BaseName == "")
      return null;

    var Command = new SqlCommand("[" + StoredProc.BaseName + "].DICT.GetVisit");
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    return StoredProc.Select(Command);
  }

  // список ответов
  public static DataTable GetAnswer(object Start = null, object Finish = null)
  {
    if (StoredProc.BaseName == "")
      return null;

    var Command = new SqlCommand("[" + StoredProc.BaseName + "].DICT.GetAnswer");
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    return StoredProc.Select(Command);
  }

  // список фотоотчетов
  public static DataTable GetPhotoReport(object Start = null, object Finish = null)
  {
    if (StoredProc.BaseName == "")
      return null;

    var Command = new SqlCommand("[" + StoredProc.BaseName + "].DICT.GetPhotoReport");
    Command.Parameters.Add("@Start", SqlDbType.VarChar, 255).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.VarChar, 255).Value = Finish;
    return StoredProc.Select(Command);
  }

  // Синхронизация для Мерч4
  public static DataTable DataExchange(object Key, object Flag, object dateFrom = null, object dateTo = null)
  {
    //if (StoredProc.BaseName == "")
    //  return null;

    var Command = new SqlCommand("[GTS].DICT.DataExchange");
    Command.Parameters.Add("@Key", SqlDbType.VarChar, 255).Value = Key;
    Command.Parameters.Add("@Flag", SqlDbType.VarChar, 255).Value = Flag;
    Command.Parameters.Add("@dateFrom", SqlDbType.Date).Value = dateFrom;
    Command.Parameters.Add("@dateTo", SqlDbType.Date).Value = dateTo;
    return StoredProc.Select(Command);
  }
}

// API для синхронизации
public class APIBusiness
{
  //(ARK)сохранение ответа
  public static void ARK_SetAnswer(object Key, object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer = null, object Photo = null)
  {
    var command = new SqlCommand("[GTS_API].ARK.SetAnswer");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.VarChar, 50).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.VarChar, 50).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.VarChar, 50).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@Photo", SqlDbType.VarChar, 1024).Value = Photo;

    StoredProc.ExecuteSilent(command);
  }

  //(ARK)сохранение претензии к визиту
  public static void ARK_SetTask(object Key, object Point, object User, object Borned)
  {
    var command = new SqlCommand("[GTS_API].ARK.SetTask");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    StoredProc.ExecuteSilent(command);
  }

  //(ARK)сохранение справочника ТТ
  public static void ARK_SetPoint(object Key, object Point, object OfficeName, object CityName, object NetworkName, object Address, object Lat = null, object Lon = null)
  {
    var command = new SqlCommand("[GTS_API].ARK.SetPoint");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@OfficeName", SqlDbType.VarChar, 255).Value = OfficeName;
    command.Parameters.Add("@CityName", SqlDbType.VarChar, 255).Value = CityName;
    command.Parameters.Add("@NetworkName", SqlDbType.VarChar, 255).Value = NetworkName;
    command.Parameters.Add("@Address", SqlDbType.VarChar, 1024).Value = Address;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;

    StoredProc.ExecuteSilent(command);
  }

  //(ARK)сохранение справочника сотрудники
  public static void ARK_SetUsers(object Key, object User, object LName, object FName, object RoleName, object Master = null, object MasterLName = null, object MasterFName = null, object MasterRoleName = null)
  {
    var command = new SqlCommand("[GTS_API].ARK.SetUsers");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@LName", SqlDbType.VarChar, 255).Value = LName;
    command.Parameters.Add("@FName", SqlDbType.VarChar, 255).Value = FName;
    command.Parameters.Add("@RoleName", SqlDbType.VarChar, 1024).Value = RoleName;
    command.Parameters.Add("@Master", SqlDbType.VarChar, 50).Value = Master;
    command.Parameters.Add("@MasterLName", SqlDbType.VarChar, 255).Value = MasterLName;
    command.Parameters.Add("@MasterFName", SqlDbType.VarChar, 255).Value = MasterFName;
    command.Parameters.Add("@MasterRoleName", SqlDbType.VarChar, 1024).Value = MasterRoleName;

    StoredProc.ExecuteSilent(command);
  }

  //(ELEMENT)сохранение ответа
  public static void ELEMENT_SetAnswer(object Key, object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer = null, object Photo = null)
  {
    var command = new SqlCommand("[GTS_API].ELEMENT.SetAnswer");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Action", SqlDbType.VarChar, 50).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.VarChar, 50).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.VarChar, 50).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@Photo", SqlDbType.VarChar, 1024).Value = Photo;

    StoredProc.ExecuteSilent(command);
  }

  //(ELEMENT)сохранение претензии к визиту
  public static void ELEMENT_SetTask(object Key, object Point, object User, object Borned)
  {
    var command = new SqlCommand("[GTS_API].ELEMENT.SetTask");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    StoredProc.ExecuteSilent(command);
  }

  //(ELEMENT)сохранение справочника ТТ
  public static void ELEMENT_SetPoint(object Key, object Point, object OfficeName, object CityName, object NetworkName, object Address, object Lat = null, object Lon = null)
  {
    var command = new SqlCommand("[GTS_API].ELEMENT.SetPoint");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@Point", SqlDbType.VarChar, 50).Value = Point;
    command.Parameters.Add("@OfficeName", SqlDbType.VarChar, 255).Value = OfficeName;
    command.Parameters.Add("@CityName", SqlDbType.VarChar, 255).Value = CityName;
    command.Parameters.Add("@NetworkName", SqlDbType.VarChar, 255).Value = NetworkName;
    command.Parameters.Add("@Address", SqlDbType.VarChar, 1024).Value = Address;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;

    StoredProc.ExecuteSilent(command);
  }

  //(ELEMENT)сохранение справочника сотрудники
  public static void ELEMENT_SetUsers(object Key, object User, object LName, object FName, object RoleName, object Master = null, object MasterLName = null, object MasterFName = null, object MasterRoleName = null)
  {
    var command = new SqlCommand("[GTS_API].ELEMENT.SetUsers");
    command.Parameters.Add("@Key", SqlDbType.VarChar, 20).Value = Key;
    command.Parameters.Add("@User", SqlDbType.VarChar, 50).Value = User;
    command.Parameters.Add("@LName", SqlDbType.VarChar, 255).Value = LName;
    command.Parameters.Add("@FName", SqlDbType.VarChar, 255).Value = FName;
    command.Parameters.Add("@RoleName", SqlDbType.VarChar, 1024).Value = RoleName;
    command.Parameters.Add("@Master", SqlDbType.VarChar, 50).Value = Master;
    command.Parameters.Add("@MasterLName", SqlDbType.VarChar, 255).Value = MasterLName;
    command.Parameters.Add("@MasterFName", SqlDbType.VarChar, 255).Value = MasterFName;
    command.Parameters.Add("@MasterRoleName", SqlDbType.VarChar, 1024).Value = MasterRoleName;

    StoredProc.ExecuteSilent(command);
  }

}

// процедуры для распознавания
public class AIBusiness
{
  // Получение списка распознанных SKU
  public static DataTable GetResultArt(object Company, object Photo)
  {
    var Command = new SqlCommand("AI.GetResultArt");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Photo", SqlDbType.Int).Value = Photo;
    return StoredProc.Select(Command);
  }

  // Получение списка распознанных SKU с координатами
  public static DataTable GetResult(object Company, object Photo, object Art)
  {
    var Command = new SqlCommand("AI.GetResult");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Photo", SqlDbType.Int).Value = Photo;
    Command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    return StoredProc.Select(Command);
  }
}

public class VisitBusiness
{
  // Получение списка заголовков по визиту
  public static DataTable GetCaption(object Point, object User, object Borned, object GUID, object Author)
  {
    var Command = new SqlCommand("VISIT.GetCaption");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    Command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    return StoredProc.Select(Command);
  }

  // Получение списка ответов по визиту
  public static List<DataTable> GetFullMatrixByVisit(object Company, object Point, object User, object Borned, object IsEdit, object Author, object GUID = null)
  {
    var Command = new SqlCommand("VISIT.GetFullMatrixByVisit");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    Command.Parameters.Add("@IsEdit", SqlDbType.Int).Value = IsEdit;
    Command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    return StoredProc.SelectMany(Command);
  }

  // Получение списка фото по визиту
  public static DataTable GetPhotoByVisit(object Company, object Point, object User, object Borned, object GUID = null)
  {
    var Command = new SqlCommand("VISIT.GetPhotoByVisit");
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;   
    return StoredProc.Select(Command);
  }

  /// Запуск процедуры с параметрами
  public static DataTable Run(object ProcName, object Point, object User, object Borned, object GUID, object ParamName, object Author)
  {
    var Command = new SqlCommand("VISIT.Run");
    Command.Parameters.Add("@ProcName", SqlDbType.VarChar, 255).Value = ProcName;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    Command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    Command.Parameters.Add("@ParamName", SqlDbType.VarChar, 1024).Value = ParamName;
    Command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    return StoredProc.Select(Command);
  }

  // создание визита
  public static void SetVisit(object Point, object User, object Borned)
  {
    var command = new SqlCommand("VISIT.SetVisit");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    StoredProc.ExecuteSilent(command);
  }
}

public class CustomBusiness
{
  // сохранение отчета
  public static string SetReport(object ID, object Company, object Name, object Description, object SortOrder, object Status, object Author)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetMenu");
    SqlParameter ErrorCode = command.Parameters.Add("@ErrorCode", SqlDbType.VarChar, 4000);
    ErrorCode.Direction = ParameterDirection.InputOutput;

    SqlParameter ElementID = command.Parameters.Add("@ID", SqlDbType.Int);
    ElementID.Value = ID;
    ElementID.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Description", SqlDbType.VarChar, 1024).Value = Description;
    command.Parameters.Add("@SortOrder", SqlDbType.Int).Value = SortOrder;    
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author; 

    StoredProc.Execute(command);

    return ElementID.Value.ToString() + '|' + ErrorCode.Value.ToString();
  }

  // сохранение колонки отчета
  public static void SetReportColumn(object Report, object FieldName, object Name, object SortOrder, object Width, object IsHidden, object Author)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetFieldUserMap");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@User", SqlDbType.Int).Value = Author;
    command.Parameters.Add("@FieldName", SqlDbType.VarChar, 255).Value = FieldName;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Width", SqlDbType.Int).Value = Width;
    command.Parameters.Add("@IsHidden", SqlDbType.Int).Value = IsHidden;
    command.Parameters.Add("@SortOrder", SqlDbType.Int).Value = SortOrder;    
    StoredProc.ExecuteSilent(command);
  }

  // Список полей отчета
  public static DataTable GetReportField(object Menu, object User)
  {
    var Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetFieldUserMap");
    Command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // установка фильтров слева при правке отчета
  public static DataTable SetFilters(object Report, object User)
  {
    var command = new SqlCommand("CUSTOM.SetFilters");
    command.Parameters.Add("@Report", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // установка фильтров слева при правке отчета
  public static DataTable GetReportTotal(object Report, object User, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CUSTOM.Total");   
    command.Parameters.Add("@Report", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    return StoredProc.Select(command);
  }

  // удаление отчета
  public static void DeleteReport(object ReportID,  object Author)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.DeleteMenu");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = ReportID;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  // список для настройки доступа к отчету
  public static DataTable GetAccess(object Report, object User)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetAccess");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    return StoredProc.Select(command);
  }

  // сохранение доступа к отчету
  public static void SetAccess(object Report, object Role, object User, object Status, object Author)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetAccess");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Report;
    command.Parameters.Add("@Role", SqlDbType.Int).Value = Role;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = Author;
    StoredProc.ExecuteSilent(command);
  }

  // информация по фото
  public static DataTable GetPhotoInfo(object Photo, object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].CUSTOM.GetPhotoInfo");
    command.Parameters.Add("@Photo", SqlDbType.Int).Value = Photo;
    command.Parameters.Add("@Author", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // сохранение иконки снизу
  public static void SetIcon(object Menu, object User, object Status)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetIcon");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    
    StoredProc.ExecuteSilent(command);
  }
  
}

public class App2Business
{
  // загрузка матрицы визита
  public static DataTable GetMatrix(object User, object Point = null)
  {
    SqlCommand Command = new SqlCommand("APP2.GetMatrix");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(Command);
  }

  // список сетей
  public static DataTable GetNetwork(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetNetwork");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список ТТ
  public static DataTable GetPoint(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetPoint");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список анкет
  public static DataTable GetAction(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // получение списка файлов закрепленных за анкетой
  public static DataTable GetActionFiles(object User)
  {
    var Command = new SqlCommand("APP2.GetActionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список вопросов
  public static DataTable GetQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список подчиненных вопросов-ветвлений
  public static DataTable GetSlaveQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetSlaveQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список файлов для вопросов
  public static DataTable GetQuestionFiles(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetQuestionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // загрузка предыдущих ответов по ТТ
  public static DataTable GetLastAnswer(object User, object Point)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP2.GetLastAnswer");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(Command, BaseName);
  }

  // список перечислимых ответов
  public static DataTable GetQuestionOption(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetQuestionOption");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // матрицы SKU для каталога
  public static DataTable GetArtCatalog(object User, object Point)
  {
    SqlCommand Command = new SqlCommand("APP2.GetArtCatalog");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(Command);
  }

  // список ссылок по SKU
  public static DataTable GetArtLinks(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetArtLinks");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список форматов сетей
  public static DataTable GetFormat(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetFormat");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список дистрибьюторов (или другое поле в зависимости от клиента)
  public static DataTable GetDistributor(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetDistributor");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Список заданий
  public static DataTable GetTask(object User)
  {
    var command = new SqlCommand("APP2.GetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сообщений
  public static DataTable GetMessage(object User)
  {
    var command = new SqlCommand("APP2.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Создание нового сообщения
  public static void SetMessage(object TaskGUID, object User, object Text, object GUID, object Borned, object IsModerate)
  {
    var command = new SqlCommand("APP2.SetMessage");
    command.Parameters.Add("@TaskGUID", SqlDbType.VarChar, 255).Value = TaskGUID;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsModerate", SqlDbType.Int).Value = IsModerate;
    StoredProc.ExecuteSilent(command);
  }

  // список компаний для фотоотчетов
  public static DataTable GetPhotoCompanyMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetPhotoCompanyMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Настройки фотоаппарата для анкеты и вопроса
  public static DataTable GetActionQuestionSettings(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetActionQuestionSettings");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  //    Cписок визитов для стартовой страницы в приложении отчетности
  public static DataTable GetDashboardVisits(object User, object Start, object Finish, object Offset)
  {
      SqlCommand Command = new SqlCommand("APP2.GetDashboardVisits");
      Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
      Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
      Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
      Command.Parameters.Add("@Offset", SqlDbType.Int).Value = Offset;
  
      return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetArt(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetArt");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // вставка визита
  public static void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object GUID, object TimeZone)
  {
      var command = new SqlCommand("APP2.SetVisit");
      command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;
      command.Parameters.Add("@IsVisit", SqlDbType.Int).Value = IsVisit;
      command.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
      command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
      command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
      command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
      command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
      command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
      command.Parameters.Add("@TimeZone", SqlDbType.VarChar, 255).Value = TimeZone;

      StoredProc.ExecuteSilent(command);
  }

  // список анкет с периодичностью раз в неделю, для которых сегодняшний визит не последний
  public static DataTable GetActionPeriod(object User)
  {
    SqlCommand Command = new SqlCommand("APP2.GetActionPeriod");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

}

public class FrameworkBusiness
{
  // левое меню - карта сайта

  // сохранение компании для пользователя
  public static DataTable SetUserCompany(object User, object Company)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].USERS._SetCompany");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;

    return StoredProc.Select(command);
  }

  public static DataTable GetMenu(object User, object Company)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetMenu");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;

    return StoredProc.Select(Command);
  }

  // ряд нижних иконок пользователя
  public static DataTable GetMenuIcon(object User, object Company)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetMenuIcon");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;

    return StoredProc.Select(Command);
  }

  // список служебных окон, которых нет в карте отчетов
  public static DataTable GetMenuUtility(object User, object Company)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetMenuUtility");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;

    return StoredProc.Select(Command);
  }

  // список компаний сотрудника
  public static DataTable GetCompany(object User)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetCompany");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;    

    return StoredProc.Select(Command);
  }

  // универсальная процедура запуска отчета
  public static DataTable Run(object Menu, object BaseName, object ProcName, object User, object Start = null, object Finish = null, object Last = null, object ReportMagic = null)
  {
    string procName = ProcName.ToString();

    if (!procName.Contains("["))
      procName = "[" + BaseName.ToString() + "]." + procName;

    var command = new SqlCommand(procName);
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    if (Start != null)
      command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;

    if (Finish != null)
      command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    if (Last != null)
      command.Parameters.Add("@Last", SqlDbType.Int).Value = Last;

    if (ReportMagic != null && ReportMagic.ToString() != "")
      command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = ReportMagic;

    if (procName.Contains("CUSTOM.Total"))
      command.Parameters.Add("@Report", SqlDbType.Int).Value = Menu;

    return StoredProc.Select(command, BaseName.ToString());
  }

  // универсальная процедура сохранения справочников
  public static DataTable SetReportDictionary(object User, object Text, object ProcName)
  {
    var command = new SqlCommand(ProcName.ToString());
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;

    return StoredProc.Select(command);
  }

  // загрузка сохраненных колонок отчета
  public static DataTable GetFieldUserMap(object Menu, object User)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetFieldUserMap");
    Command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // сохранение колонки отчета
  public static void SetFieldUserMap(object Menu, object User, object FieldName, object Name, object Width, object IsHidden, object SortOrder)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetFieldUserMap");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@FieldName", SqlDbType.VarChar, 255).Value = FieldName;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 255).Value = Name;
    command.Parameters.Add("@Width", SqlDbType.Int).Value = Width;
    command.Parameters.Add("@IsHidden", SqlDbType.Int).Value = IsHidden;    
    command.Parameters.Add("@SortOrder", SqlDbType.Int).Value = SortOrder;    
    StoredProc.ExecuteSilent(command);
  }

  // загрузка сохраненного окна отчета
  public static DataTable GetWindowUserMap(object Menu, object User)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetWindowUserMap");
    Command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // сохранение окна отчета
  public static void SetWindowUserMap(object Menu, object User, object OffsetX, object OffsetY, object Width, object Height, object IsAdjust)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].MENU.SetWindowUserMap");
    command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@OffsetX", SqlDbType.Int).Value = OffsetX;
    command.Parameters.Add("@OffsetY", SqlDbType.Int).Value = OffsetY;
    command.Parameters.Add("@Width", SqlDbType.Int).Value = Width;
    command.Parameters.Add("@Height", SqlDbType.Int).Value = Height;
    command.Parameters.Add("@IsAdjust", SqlDbType.Int).Value = IsAdjust;
    StoredProc.ExecuteSilent(command);
  }

  // список меню в зависимости от выбранного отчета
  public static DataTable GetFilter(object Menu, object User, object Company)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].MENU.GetFilter");
    Command.Parameters.Add("@Menu", SqlDbType.Int).Value = Menu;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    return StoredProc.Select(Command);
  }

  // универсальная процедура загрузки данных по фильтру
  public static DataTable RunFilter(object ProcName, object User, object Start = null, object Finish = null)
  {
    var command = new SqlCommand(ProcName.ToString());
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    if (Start != null)
      command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    if (Finish != null)
      command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;     

    return StoredProc.Select(command);
  }

  // настройки рабочего стола пользователя
  public static DataTable GetUserSetting(object User)
  {
    SqlCommand Command = new SqlCommand("[GTS_FRAMEWORK].USERS.GetSetting");   
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;    
    return StoredProc.Select(Command);
  }

  // сохранение настроек рабочего стола пользователя
  public static DataTable SetUserSetting(object User, object Magic, object Value)
  {
    var command = new SqlCommand("[GTS_FRAMEWORK].USERS.SetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Magic", SqlDbType.NVarChar, 4000).Value = Magic;
    command.Parameters.Add("@Value", SqlDbType.NVarChar, 4000).Value = Value;

    return StoredProc.Select(command);
  }
}

// процедуры для BI
public class BIBusiness
{
  // загрузка меню фильтров слева
  public static DataTable GetFilter(object User, object Window)
  {
    var Command = new SqlCommand("[BI_GTS].BI.GetFilter");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Window", SqlDbType.VarChar, 255).Value = Window;

    return StoredProc.Select(Command);
  }

  // показ значений фильтра
  public static DataTable RunFilter(object User, object Magic, object Window)
  {
    var Command = new SqlCommand("[BI_GTS].BI.RunFilter");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@Window", SqlDbType.VarChar, 255).Value = Window;

    return StoredProc.Select(Command);
  }

  // включение\отключение фильтра по легенде
  public static void SetLegendStatus2(object User, object Window, object Magic, object ID, object Status, object IsOne = null)
  {
    var command = new SqlCommand("[BI_GTS].BI.SetLegendStatus");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Window", SqlDbType.VarChar, 255).Value = Window;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    command.Parameters.Add("@ID", SqlDbType.VarChar, 255).Value = ID;
    command.Parameters.Add("@Status", SqlDbType.Int).Value = Status;
    command.Parameters.Add("@IsOne", SqlDbType.Int).Value = IsOne;

    StoredProc.ExecuteSilent(command);
  }

  // включение всех фильтров-легенд
  public static void ClearLegendStatus(object User, object Window)
  {
    var command = new SqlCommand("[BI_GTS].BI.ClearLegendStatus");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Window", SqlDbType.VarChar, 255).Value = Window;

    StoredProc.ExecuteSilent(command);
  }

  // ------------------------- Исполнительная дисциплина
  // основная процедура загрузки данных
  public static DataTable VisitCalc(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare)
  {
    var Command = new SqlCommand("[BI_GTS].VISIT.Calc");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;
    Command.Parameters.Add("@IsFirst", SqlDbType.Int).Value = IsFirst;
    Command.Parameters.Add("@IsFix", SqlDbType.Int).Value = IsFix;
    Command.Parameters.Add("@IsCompare", SqlDbType.Int).Value = IsCompare;

    return StoredProc.Select(Command);
  }

  // просмотр детальной информации при клике на график
  public static DataTable GetDetail(object User, object Start, object Finish)
  {
    var Command = new SqlCommand("[BI_GTS].VISIT.GetDetail");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(Command);
  }

  // расчет показателей для Исполнительной дисциплины по офисам
  public static DataTable CalcArea(object Area, object User, object Start, object Finish, object Period, object Magic, object IsCalc)
  {
    var Command = new SqlCommand("[BI_GTS].VISIT.Calc" + Area.ToString());
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;

    return StoredProc.Select(Command);
  }
  // ----------------------

  // ------------------------- OSA
  // основная процедура загрузки данных
  public static DataTable CalcOSA(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare)
  {
    var Command = new SqlCommand("[BI_GTS].OSA.Calc");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;
    Command.Parameters.Add("@IsFirst", SqlDbType.Int).Value = IsFirst;
    Command.Parameters.Add("@IsFix", SqlDbType.Int).Value = IsFix;
    Command.Parameters.Add("@IsCompare", SqlDbType.Int).Value = IsCompare;

    return StoredProc.Select(Command);
  }

  // включение всех фильтров-легенд
  public static void SetTempArt(object User, object Window, object Text)
  {
    var command = new SqlCommand("[BI_GTS].OSA.SetTempArt");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Window", SqlDbType.VarChar, 255).Value = Window;
    command.Parameters.Add("@Text", SqlDbType.VarChar, 4000).Value = Text;

    StoredProc.ExecuteSilent(command);
  }

  // детализация по отсутствующим позициям
  public static DataTable DetailOSA(object User, object Start, object Finish, object Period, object Magic, object IsCalc)
  {
    var Command = new SqlCommand("[BI_GTS].OSA.GetDetail");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;

    return StoredProc.Select(Command);
  }

  // ------------------------- OOS
  // основная процедура загрузки данных
  public static DataTable CalcOOS(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare)
  {
    var Command = new SqlCommand("[BI_GTS].OOS.Calc");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;
    Command.Parameters.Add("@IsFirst", SqlDbType.Int).Value = IsFirst;
    Command.Parameters.Add("@IsFix", SqlDbType.Int).Value = IsFix;
    Command.Parameters.Add("@IsCompare", SqlDbType.Int).Value = IsCompare;

    return StoredProc.Select(Command);
  }

  // детализация по отсутствующим позициям
  public static DataTable DetailOOS(object User, object Start, object Finish, object Period, object Magic, object IsCalc)
  {
    var Command = new SqlCommand("[BI_GTS].OOS.GetDetail");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;
    Command.Parameters.Add("@Period", SqlDbType.VarChar, 255).Value = Period;
    Command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    Command.Parameters.Add("@IsCalc", SqlDbType.Int).Value = IsCalc;

    return StoredProc.Select(Command);
  }
}

public class AppBusinessRh
{
  // список сетей
  public static DataTable GetNetwork(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetNetwork");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список ТТ
  public static DataTable GetPoint(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPoint");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetBrand(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetBrand");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetArt(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArt");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // настройки компании пользователя
  public static DataTable GetCompanySetting(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanySetting");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний
  public static DataTable GetCompany(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompany");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний-контрагентов в точках
  public static DataTable GetCompanyPointMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanyPointMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний-контрагентов в точках (версия 2)
  public static DataTable GetCompanyPointMapV2(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetCompanyPointMapV2");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список категорий фото
  public static DataTable GetPhotoCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPhotoCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // вставка визита
  public static void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object IsBorned, object GUID, object GeoTime = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisit");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@IsVisit", SqlDbType.Int).Value = IsVisit;
    command.Parameters.Add("@Date", SqlDbType.DateTime).Value = Date;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@GeoTime", SqlDbType.DateTime).Value = GeoTime;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Создание нового фотоотчета
  public static void SetPhotoReport(object Point, object User, object Company, object Category, object Brand, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoReport");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
    command.Parameters.Add("@Category", SqlDbType.Int).Value = Category;
    command.Parameters.Add("@Brand", SqlDbType.Int).Value = Brand;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // сохранение фото
  public static string SetPhoto(object Magic, object User, object GUID, object Name, object Lat, object Lon, object Error, object GeoTime = null, object Point = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhoto");
    SqlParameter Signature = command.Parameters.Add("@Signature", SqlDbType.VarChar, 4000);
    Signature.Direction = ParameterDirection.InputOutput;

    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Name", SqlDbType.VarChar, 1024).Value = Name;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@GeoTime", SqlDbType.VarChar, 255).Value = GeoTime;

    StoredProc.Execute(command, BaseName);

    return Signature.Value.ToString();
  }

  // матрицы по сети по формату
  public static DataTable GetArtNetworkMatrix(object User)
  {
    var command = new SqlCommand("APP.GetArtNetworkMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }


  // матрицы по сети по формату со статусом (для Кампари)
  public static DataTable GetArtNetworkMatrixExtended(object User)
  {
    var command = new SqlCommand("APP.GetArtNetworkMatrixExtended");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ 
  public static DataTable GetArtPointMatrix(object User)
  {
    var command = new SqlCommand("APP.GetArtPointMatrix");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // матрицы по ТТ со статусом (для Кампари)
  public static DataTable GetArtPointMatrixExtended(object User)
  {
    var command = new SqlCommand("APP.GetArtPointMatrixExtended");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // список анкет
  public static DataTable GetAction(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }


  // список анкет расширенный для Кампари
  public static DataTable GetActionExtended(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionExtended");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список анкет в ТТ
  public static DataTable GetActionPointMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionPointMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список брендов для анкет
  public static DataTable GetActionBrandMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetActionBrandMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список вопросов
  public static DataTable GetQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список подчиненных вопросов-ветвлений
  public static DataTable GetSlaveQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetSlaveQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список зависимых вопросов
  public static DataTable GetLinkedQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetLinkedQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список диапазонов ответов по числовым вопросам
  public static DataTable GetArtQuestionRange(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtQuestionRange");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список перечислимых ответов
  public static DataTable GetQuestionOption(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionOption");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение ответов по sku
  public static DataTable SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  //сохранение ответов (с мастер вопросом ветвление)
  public static DataTable SetArt2(object Point, object User, object Action, object Art, object Master, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetArt");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Art", SqlDbType.Int).Value = Art;
    command.Parameters.Add("@Master", SqlDbType.Int).Value = Master;
    command.Parameters.Add("@Question", SqlDbType.Int).Value = Question;
    command.Parameters.Add("@Option", SqlDbType.Int).Value = Option;
    command.Parameters.Add("@Answer", SqlDbType.NVarChar, 4000).Value = Answer;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  // Создание нового фотоотчета по промо-акции
  public static void SetPhotoAction(object Point, object User, object Action, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned, object Brand = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoAction");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 255).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 255).Value = Error;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;
    command.Parameters.Add("@Brand", SqlDbType.Int).Value = Brand;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // правка комментария к фото
  public static void SetPhotoDescription(object GUID, object Description)
  {
    string BaseName = SystemBusiness.GetBaseFromPhoto(GUID);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetPhotoDescription");
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Список заданий
  public static DataTable GetTask(object User)
  {
    var command = new SqlCommand("APP.GetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сообщений
  public static DataTable GetMessage(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command, BaseName);
  }

  // Список должностей компании
  public static DataTable GetUserRole(object User)
  {
    var command = new SqlCommand("APP.GetUserRole");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сотрудников компании
  public static DataTable GetUser(object User)
  {
    var command = new SqlCommand("APP.GetUser");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // список закреплений сотрудников за ТТ
  public static DataTable GetUserPointMap(object User)
  {
    var command = new SqlCommand("APP.GetUserPointMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Создание новой претензии
  public static DataTable SetTask(object User, object Point, object Text, object GUID, object PhotoID)
  {
    string BaseName = SystemBusiness.GetBase(User);
    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@PhotoID", SqlDbType.Int).Value = PhotoID;

    return StoredProc.Select(command, BaseName);
  }

  // установка модерации по претензии
  public static void SetTaskModerate(object Task, object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetTaskModerate");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    StoredProc.ExecuteSilent(command);
  }

  // Создание нового сообщения
  public static DataTable SetMessage(object Task, object User, object Text, object GUID, object Borned, object IsModerate)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetMessage");
    command.Parameters.Add("@Task", SqlDbType.VarChar, 255).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsModerate", SqlDbType.Int).Value = IsModerate;

    return StoredProc.Select(command, BaseName);
  }

  // уведомление о прочтении сообщения
  public static void SetMessageRead(object User, object Point, object Task)
  {
    var command = new SqlCommand("APP.SetMessageRead");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@TaskGUID", SqlDbType.VarChar, 255).Value = Task;
    StoredProc.ExecuteSilent(command);
  }

  // Список стандартов выкладки
  public static DataTable GetStandart(object User)
  {
    var command = new SqlCommand("APP.GetStandart");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список стандартов выкладки в привязке к ТТ
  public static DataTable GetStandartMap(object User)
  {
    var command = new SqlCommand("APP.GetStandartMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список фото стандарта выкладки
  public static DataTable GetStandartFile(object User)
  {
    var command = new SqlCommand("APP.GetStandartFile");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список тикетов для техподдержки
  public static DataTable GetTicket(object User)
  {
    var command = new SqlCommand("APP.GetTicket");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список тикетов для администратора
  public static DataTable GetTicketAdmin(object User)
  {
    var command = new SqlCommand("APP.GetTicketAdmin");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // сохранение информации об аппарате пользователя
  public static void SetPhoneInfo(object Phone, object Model, object Device, object Version, object AppVersion, object SendData)
  {
    var command = new SqlCommand("APP.SetPhoneInfo");
    command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 1024).Value = Model;
    command.Parameters.Add("@Device", SqlDbType.VarChar, 1024).Value = Device;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;
    command.Parameters.Add("@AppVersion", SqlDbType.VarChar, 255).Value = AppVersion;
    command.Parameters.Add("@SendData", SqlDbType.VarChar, 255).Value = SendData;

    StoredProc.ExecuteSilent(command);
  }

  // сохранение трекинга пользователя
  public static void SetTrack(object User, object Borned, object Start, object Lat, object Lon, object Error)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetTrack");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Start", SqlDbType.DateTime).Value = Start;
    command.Parameters.Add("@Lat", SqlDbType.VarChar, 255).Value = Lat;
    command.Parameters.Add("@Lon", SqlDbType.VarChar, 1024).Value = Lon;
    command.Parameters.Add("@Error", SqlDbType.VarChar, 1024).Value = Error;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Сохранение журнала ошибок
  public static DataTable SetError(object User, object Borned, object Description)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetLog");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;

    return StoredProc.Select(command, BaseName);
  }

  // Сохранение журнала ошибок
  public static void SetErrorWeb(object User, object Description)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetWebLog");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
    StoredProc.ExecuteSilent(command, BaseName);
  }

  // Замена (удаление) фото
  public static DataTable ReplacePhoto(object User, object GUID, object Magic)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.ReplacePhoto");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Magic", SqlDbType.VarChar, 255).Value = Magic;

    return StoredProc.Select(command, BaseName);
  }

  // Список фокусных задач
  public static DataTable GetFocusTask(object User)
  {
    var command = new SqlCommand("APP.GetFocusTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // маршрут фокусных задач
  public static DataTable GetFocusTaskTail(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskTail");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // файлы фокусных задач
  public static DataTable GetFocusTaskFiles(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskFiles");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // SKU фокусных задач
  public static DataTable GetFocusTaskArt(object User)
  {
    var command = new SqlCommand("APP.GetFocusTaskArt");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // уведомление о прочтении фокусной задачи
  public static void SetFocusTaskRead(object Task, object User, object Point)
  {
    var command = new SqlCommand("APP.SetFocusTaskRead");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    StoredProc.ExecuteSilent(command);
  }

  // Создание нового сообщения по фокусной задаче
  public static DataTable SetMessageFocus(object Task, object GUID, object User, object Point, object Text, object Borned, object IsBorned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var command = new SqlCommand("[" + BaseName + "].APP.SetMessageFocus");
    command.Parameters.Add("@Task", SqlDbType.Int).Value = Task;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@Text", SqlDbType.NVarChar, 4000).Value = Text;
    command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
    command.Parameters.Add("@IsBorned", SqlDbType.Int).Value = IsBorned;

    return StoredProc.Select(command, BaseName);
  }

  // загрузка предыдущих ответов по ТТ
  public static DataTable GetLastAnswer(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetLastAnswer");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список категорий задач
  public static DataTable GetTaskCategory(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetTaskCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение виртуальной даты визита
  public static void SetVisitDate(object Point, object User, object Borned, object Date)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisitDate");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
    command.Parameters.Add("@Date", SqlDbType.Date).Value = Date;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // список фото по SKU
  public static DataTable GetArtPhotos(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtPhotos");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список ссылок по SKU
  public static DataTable GetArtLinks(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetArtLinks");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список атрибутов ТТ компании
  public static DataTable GetPointAttribute(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPointAttribute");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список значений атрибутов ТТ компании
  public static DataTable GetPointAttributeValue(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetPointAttributeValue");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список подчиненных
  public static DataTable GetSlave(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlave");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список посещенных ТТ пользователем за сегодня
  public static DataTable GetSlaveVisit(object User)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveVisit");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command, BaseName);
  }

  // список фотоотчетов по визиту
  public static DataTable GetSlavePhoto(object Client, object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlavePhoto");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список фотоотчетов по визиту
  public static DataTable GetSlavePhoto2(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlavePhoto2");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список ответов на анкеты в ТТ пользователем за сегодня
  public static DataTable GetSlaveArtsAnswers2(object Client, object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveArtsAnswers2");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список ответов на анкеты в ТТ пользователем за сегодня
  public static DataTable GetSlaveArtsAnswers(object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveArtsAnswers");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список всех ответов за визит (фото и скю)
  public static DataTable GetSlaveAnswers(object Client, object Point, object User, object Borned)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveAnswers");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;

    return StoredProc.Select(Command, BaseName);
  }

  // список визитов по ТТ за выбранные даты
  public static DataTable GetSlaveVisitsOnDate(object Point, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBaseFromPoint(Point);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveVisitsOnDate");
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(Command, BaseName);
  }

  // список визитов по ТТ за выбранные даты версия 2
  public static DataTable GetSlaveVisitsOnDate2(object Client, object Point, object Start, object Finish)
  {
    string BaseName = SystemBusiness.GetBaseFromPoint(Point);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetSlaveVisitsOnDate2");
    Command.Parameters.Add("@Client", SqlDbType.Int).Value = Client;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    Command.Parameters.Add("@Start", SqlDbType.Date).Value = Start;
    Command.Parameters.Add("@Finish", SqlDbType.Date).Value = Finish;

    return StoredProc.Select(Command, BaseName);
  }

  // список остатков по Магниту
  public static DataTable GetMagnit(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetMagnit");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // сохранение информации об устройстве для каждого визита
  public static void SetVisitDevice(object User, object GUID, object Model = null, object Version = null)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisitDevice");
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
    command.Parameters.Add("@Model", SqlDbType.VarChar, 255).Value = Model;
    command.Parameters.Add("@Version", SqlDbType.VarChar, 255).Value = Version;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // список фото для вопросов
  public static DataTable GetQuestionPhotoMap(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionPhotoMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список уникальных фото-файлов для вопросов (для полной синхронизации)
  public static DataTable GetQuestionPhotos(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionPhotos");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список маршрутов на неделю
  public static DataTable GetWeekRoutes(object User, object KeyAPI)
  {
    SqlCommand Command = new SqlCommand("APP.GetWeekRoutes");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@KeyAPI", SqlDbType.VarChar, 255).Value = KeyAPI;

    return StoredProc.Select(Command);
  }

  // список маршрутов руководителя
  public static DataTable GetNodes(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetNodes");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // установить новую дату для маршрута
  public static DataTable SetRouteChanges(object NodeID, object PointID, object CompanyID, object UserID, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7)
  {
    SqlCommand Command = new SqlCommand("APP.SetRouteChanges");
    Command.Parameters.Add("@NodeID", SqlDbType.Int).Value = NodeID;
    Command.Parameters.Add("@PointID", SqlDbType.Int).Value = PointID;
    Command.Parameters.Add("@CompanyID", SqlDbType.Int).Value = CompanyID;
    Command.Parameters.Add("@UserID", SqlDbType.Int).Value = UserID;
    Command.Parameters.Add("@Day1", SqlDbType.Int).Value = Day1;
    Command.Parameters.Add("@Day2", SqlDbType.Int).Value = Day2;
    Command.Parameters.Add("@Day3", SqlDbType.Int).Value = Day3;
    Command.Parameters.Add("@Day4", SqlDbType.Int).Value = Day4;
    Command.Parameters.Add("@Day5", SqlDbType.Int).Value = Day5;
    Command.Parameters.Add("@Day6", SqlDbType.Int).Value = Day6;
    Command.Parameters.Add("@Day7", SqlDbType.Int).Value = Day7;

    return StoredProc.Select(Command);
  }

  // список файлов для вопросов
  public static DataTable GetQuestionFiles(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetQuestionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // получение списка файлов закрепленных за анкетой
  public static DataTable GetActionFiles(object User)
  {
    var Command = new SqlCommand("APP.GetActionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список визитов для стартовой страницы в приложении отчетности
  public static DataTable GetDashboardVisits(object user, object period)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetDashboardVisitsRH");
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@period", SqlDbType.Int).Value = period;

    return StoredProc.Select(Command, BaseName);
  }

  // получение данных по выбранному визиту
  public static DataTable GetVisitData(object point, object user, object borned)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetVisitData");
    Command.Parameters.Add("@point", SqlDbType.Int).Value = point;
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@borned", SqlDbType.VarChar, 255).Value = borned;

    return StoredProc.Select(Command, BaseName);
  }

  // получение данных по выбранному визиту
  public static DataTable GetVisitData2(object client, object point, object user, object borned)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetVisitData2");
    Command.Parameters.Add("@client", SqlDbType.Int).Value = client;
    Command.Parameters.Add("@point", SqlDbType.Int).Value = point;
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@borned", SqlDbType.VarChar, 255).Value = borned;

    return StoredProc.Select(Command, BaseName);
  }

  // поиск по ТТ и пользователям
  public static DataTable SearchData(object user, object search)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.SearchDataRH");
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@search", SqlDbType.VarChar, 255).Value = search;

    return StoredProc.Select(Command, BaseName);
  }

  // список нужных заданий
  public static DataTable GetTasksList(object user, object taskStatus)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetTasksLisRH");
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@taskStatus", SqlDbType.Int).Value = taskStatus;

    return StoredProc.Select(Command, BaseName);
  }

  // список визитов
  public static DataTable GetVisitsList(object user, object typeID, object id)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetVisitsListRH");
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@typeID", SqlDbType.Int).Value = typeID;
    Command.Parameters.Add("@id", SqlDbType.Int).Value = id;
    return StoredProc.Select(Command, BaseName);
  }

  // список сообщений
  public static DataTable GetMessagesList(object user, object taskID)
  {
    string BaseName = SystemBusiness.GetBase(user);

    if (BaseName == "")
      return null;

    var Command = new SqlCommand("[" + BaseName + "].APP.GetMessagesListRH");
    Command.Parameters.Add("@user", SqlDbType.Int).Value = user;
    Command.Parameters.Add("@taskID", SqlDbType.Int).Value = taskID;
    return StoredProc.Select(Command, BaseName);
  }

  //список вариантов для закрытие визита без заполнения обязательной отчетность
  public static DataTable GetOptionsVisitFinish(object User)
  {
    SqlCommand Command = new SqlCommand("APP.GetOptionsVisitFinish");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  //закрытие визита без заполнения обязательной отчетность
  public static void SetVisitFinish(object Point, object User, object Borned, object FinishID, object GUID)
  {
    string BaseName = SystemBusiness.GetBase(User);

    if (BaseName == "")
      return;

    var command = new SqlCommand("[" + BaseName + "].APP.SetVisitFinish");
    command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    command.Parameters.Add("@Borned", SqlDbType.VarChar, 255).Value = Borned;
    command.Parameters.Add("@FinishID", SqlDbType.Int).Value = FinishID;
    command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;

    StoredProc.ExecuteSilent(command, BaseName);
  }

  // список SKU для промо
  public static DataTable GetActionMatrix(object User)
  {
    SqlCommand Command = new SqlCommand("ACTIONS.GetActionMatrix");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // получение настроек с сервера
  public static DataTable GetSetting(object User)
  {
    var command = new SqlCommand("SYSTEM.GetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  public static DataTable UserExist(object Phone)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.UserExist");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    return StoredProc.Select(Command);
  }

  public static DataTable Logon(object Phone, object Pass)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.Logon");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    Command.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = Pass;
    return StoredProc.Select(Command);
  }

  public static DataTable SetUserPass(object Phone, object Pass)
  {
    SqlCommand Command = new SqlCommand("SYSTEM.SetUserPass");
    Command.Parameters.Add("@Phone", SqlDbType.VarChar, 255).Value = Phone;
    Command.Parameters.Add("@Pass", SqlDbType.VarChar, 255).Value = Pass;
    return StoredProc.Select(Command);
  }
}

public class AppBusinessToken
{
  // получение настроек с сервера
  public static DataTable GetSetting(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].SYSTEM.GetSetting");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // настройки компании пользователя
  public static DataTable GetCompanySetting(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetCompanySetting");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний
  public static DataTable GetCompany(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetCompany");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список компаний для фотоотчетов
  public static DataTable GetPhotoCompanyMap(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetPhotoCompanyMap");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список SKU
  public static DataTable GetArt(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetArt");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список фото по SKU
  public static DataTable GetArtPhotos(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetArtPhotos");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetBrand(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetBrand");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список товарных групп SKU
  public static DataTable GetCategory(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список категорий фото
  public static DataTable GetPhotoCategory(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetPhotoCategory");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Список стандартов выкладки
  public static DataTable GetStandart(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].APP.GetStandart");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список стандартов выкладки в привязке к ТТ
  public static DataTable GetStandartMap(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].APP.GetStandartMap");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список фото стандарта выкладки
  public static DataTable GetStandartFile(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].APP.GetStandartFile");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // список атрибутов ТТ компании
  public static DataTable GetPointAttribute(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetPointAttribute");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список значений атрибутов ТТ компании
  public static DataTable GetPointAttributeValue(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetPointAttributeValue");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список сетей
  public static DataTable GetNetwork(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetNetwork");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  public static DataTable GetPoint(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetPoint");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // матрицы SKU для каталога
  public static DataTable GetArtCatalog(object User, object Point)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetArtCatalog");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    Command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;

    return StoredProc.Select(Command);
  }

  // список анкет
  public static DataTable GetAction(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetAction");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // получение списка файлов закрепленных за анкетой
  public static DataTable GetActionFiles(object User)
  {
    var Command = new SqlCommand("[WB_TOKEN].APP.GetActionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список диапазонов ответов по числовым вопросам
  public static DataTable GetArtQuestionRange(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetArtQuestionRange");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список вопросов
  public static DataTable GetQuestion(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetQuestion");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список перечислимых ответов
  public static DataTable GetQuestionOption(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetQuestionOption");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // список файлов для вопросов
  public static DataTable GetQuestionFiles(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetQuestionFiles");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  //список вариантов для закрытие визита без заполнения обязательной отчетность
  public static DataTable GetOptionsVisitFinish(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetOptionsVisitFinish");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(Command);
  }

  // Настройки фотоаппарата для анкеты и вопроса
  public static DataTable GetActionQuestionSettings(object User)
  {
    SqlCommand Command = new SqlCommand("[WB_TOKEN].APP.GetActionQuestionSettings");
    Command.Parameters.Add("@User", SqlDbType.Int).Value = User;

    return StoredProc.Select(Command);
  }

  // Список заданий
  public static DataTable GetTask(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].APP.GetTask");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }

  // Список сообщений
  public static DataTable GetMessage(object User)
  {
    var command = new SqlCommand("[WB_TOKEN].APP.GetMessage");
    command.Parameters.Add("@User", SqlDbType.Int).Value = User;
    return StoredProc.Select(command);
  }
}
