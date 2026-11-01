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

      string Magic = Request.Form["Magic"];
      string Author = Request.Form["Author"];
      string GUID = Request.Form["GUID"];
      string CompanyID = Request.Form["Company"];
      string Flag = Request.Form["Flag"];

      if (hFile == null) return;
      
      string fileName = hFile.FileName;
      string file = ApplicationPath + @"/Photos/Temp/" + fileName;

      hFile.SaveAs(file);

      // определение пути файла
      String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/Photos/" + CompanyID.ToString() + "/" + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
      if (!Directory.Exists(pathToYearFolder))
        Directory.CreateDirectory(pathToYearFolder);
      String pathToMonthFolder = pathToYearFolder + @"/" + DateTime.Now.Day.ToString();
      if (!Directory.Exists(pathToMonthFolder))
        Directory.CreateDirectory(pathToMonthFolder);

      //string Ext = System.IO.Path.GetExtension(fileName).ToLower();

      fileName = pathToMonthFolder + @"/" + Author + "_" + GUID + ".jpg";
      

      // преобразование
      System.Drawing.Image img = System.Drawing.Image.FromFile(file);

      int width, height;

      if (((float)img.Width > (float)img.Height))
      {
        width = ((float)img.Width > 1440) ? 1440 : (int)img.Width;
        height = Convert.ToInt32((float)img.Height / ((float)img.Width / width));
      }
      else {
        height = ((float)img.Height > 1440) ? 1440 : (int)img.Height;
        width = Convert.ToInt32((float)img.Width / ((float)img.Height / height));
      }
               
      Bitmap imageSmall = new Bitmap(img, width, height);

      using (Graphics g = Graphics.FromImage(imageSmall))
      {
        g.SmoothingMode = SmoothingMode.HighQuality;
        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        g.PixelOffsetMode = PixelOffsetMode.HighQuality;

        EncoderParameter myEncoderParameter = new EncoderParameter(Encoder.Quality, 60L);
        EncoderParameters myEncoderParameters = new EncoderParameters(1);
        myEncoderParameters.Param[0] = myEncoderParameter;
        System.Drawing.Imaging.ImageCodecInfo myImageCodecInfo = getEncoderInfo("image/jpeg");

        imageSmall.Save(fileName, myImageCodecInfo, myEncoderParameters);
      }

      string filePath = @"Photos/" + CompanyID.ToString() + "/" + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + Author + "_" + GUID + ".jpg";


      SystemBusiness.SetPhoto(Magic, Author, GUID, filePath, Flag);

      // удаление исходного файла
      img.Dispose();
      System.IO.File.Delete(file);
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

  private ImageCodecInfo getEncoderInfo(string mimeType)
  {
    // Get image codecs for all image formats
    ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

    // Find the correct image codec
    for (int i = 0; i < codecs.Length; i++)
      if (codecs[i].MimeType == mimeType)
        return codecs[i];
    return null;
  }
}