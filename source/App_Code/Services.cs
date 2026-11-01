using System.Configuration;
using System.Web;
using System.Web.Services;

[WebService(Namespace = "gts.online")] 
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class Service : System.Web.Services.WebService
{
  /// <summary>
  /// Строка подключение к базе.
  /// </summary>
  public static string ConnectionString
  {
    get { return ConfigurationManager.ConnectionStrings["Database"].ConnectionString.ToString(); }
  }
  
  /// <summary>
  /// Путь к расположению файлов на сервере.
  /// </summary>
  public static string ApplicationPath
  {
    get { return HttpContext.Current.Server.MapPath(""); }
  }  
}