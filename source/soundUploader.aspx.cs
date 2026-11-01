using System;
using System.Web;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public partial class uploads_Default : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
    string error = null;
    string fileNames = string.Empty;
    try
    {
      HttpPostedFile hFile = Request.Files[0];
      
      string Type =       Request.Form["Type"];
      string Point =      Request.Form["Point"];
      string User =       Request.Form["Author"];
      string Art =        Request.Form["Art"];
      string Action =     Request.Form["Action"];
      string Question =   Request.Form["Question"];
      string GUID =       Request.Form["GUID"];
      string Borned =     Request.Form["Borned"];
      string CompanyID =  Request.Form["CompanyID"];


      if (hFile == null) return;
      
      // определение пути файла
      String pathToFolder = HttpContext.Current.Server.MapPath("/") + @"/Sounds/" + CompanyID.ToString(); 
      if (!Directory.Exists(pathToFolder))
        Directory.CreateDirectory(pathToFolder);
      String pathToMonthFolder = pathToFolder;
      if (!Directory.Exists(pathToMonthFolder))
        Directory.CreateDirectory(pathToMonthFolder);

      //string Ext = System.IO.Path.GetExtension(fileName).ToLower();

      string fileName = hFile.FileName;
      string file = pathToFolder + '/' + User + '_' + GUID + '.' + Type;

      hFile.SaveAs(file);

      AppBusiness.SetArt(Point, User, Action, Art, Question, "-1", Type, User + '_' + GUID, Borned, "1") ;
    }
    catch (Exception ex)
    {
      error = "Ошибка при загрузке файла на сервер: " + ex.Message;
    }
  }

  public static string ApplicationPath
  {
    get { return HttpContext.Current.Server.MapPath(""); }
  }
}