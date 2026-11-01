// Перенесено из source/uploadUser.aspx.cs (исходная кодировка: utf-8).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.IO;
using System.Web;

// Было: public partial class uploads_Default (страница uploadUser.aspx)
public class UploadUserPage : System.Web.UI.Page
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