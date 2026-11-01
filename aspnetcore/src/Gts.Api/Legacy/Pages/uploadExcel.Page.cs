// Перенесено из source/uploadExcel.aspx.cs (исходная кодировка: utf-8).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Threading;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

// Было: public partial class uploads_Default (страница uploadExcel.aspx)
public class UploadExcelPage : System.Web.UI.Page
{
  protected void Page_Load(object sender, EventArgs e)
  {
    string error = null;
    string fileNames = string.Empty;
    try
    {
      HttpPostedFile hFile = Request.Files[0];

      string Magic = Request.Form["Magic"];
      string Company = Request.Form["Company"];

      if (hFile == null) return;

      string fileName = hFile.FileName;
      string file = ApplicationPath + @"/Temp/" + Magic + "_" + Company + ".txt";

      if (System.IO.File.Exists(file))
        System.IO.File.Delete(file);

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