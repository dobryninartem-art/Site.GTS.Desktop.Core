using System;
using System.IO;
using System.Web;

public partial class uploads_Default : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
    string error = null;
    string fileNames = string.Empty;
    try
    {
      HttpPostedFile hFile = Request.Files[0];

      string Author = Request.Form["Author"];

      if (hFile == null) return;

      String pathToFolder = HttpContext.Current.Server.MapPath("/") + @"/Photos/User/" + Author;
      if (!Directory.Exists(pathToFolder))
        Directory.CreateDirectory(pathToFolder);

      string fileName = hFile.FileName;
      string file = pathToFolder + @"/" + fileName;

      hFile.SaveAs(file);      
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