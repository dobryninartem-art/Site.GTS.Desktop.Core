using System.Web;
using System.Web.Services;
using System.Drawing;
using System.IO;
using System.Collections.Generic;
using ICSharpCode.SharpZipLib.Zip;
using System.Text.RegularExpressions;
using System.Data;

namespace System
{
  [WebService(Namespace = "gts.online")] 
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  // процедура проверки при входе
  public class Framework : System.Web.Services.WebService
  {
    [WebMethod(EnableSession = true)]
    public string[] ConnectionSetting()
    {
      string[] values = new string[4];
      values[0] = Configuration.ConfigurationManager.AppSettings["Language"];
      values[1] = Configuration.ConfigurationManager.AppSettings["SiteAddress"];
      values[2] = Configuration.ConfigurationManager.AppSettings["MobSiteAddress"];
      values[3] = Configuration.ConfigurationManager.AppSettings["AboutGts"];
      return values;
    }

    [WebMethod(EnableSession = true)]
    public string UserExist(object Phone)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      return ShareMethods.SerializeDataJSON(SystemBusiness.UserExist(phone));
    }

    [WebMethod(EnableSession = true)]
    public string Test()
    {
      return "Test OK";
    }

    [WebMethod(EnableSession = true)]
    public string Test2(string Data)
    {
      return Data.ToString();
    }

    [WebMethod(EnableSession = true)]
    public string SetUserPass(object Phone, object Pass)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""), pass = Pass.ToString().Trim();

      return ShareMethods.SerializeDataJSON(SystemBusiness.SetUserPass(phone, pass));
    }

    [WebMethod(EnableSession = true)]
    public string Logon(object Phone, object Pass)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""), pass = Pass.ToString().Trim();

      DataTable data = SystemBusiness.Logon(phone, pass);

      // определение названия базы
      foreach (DataRow dr in data.Rows)
      {
        StoredProc.BaseName = "GTS";
        foreach (DataColumn col in data.Columns)
        {
          if (col.ColumnName.ToString() == "BaseName") {
            StoredProc.BaseName = dr[col].ToString();

            break;
          }          
        }        
      }

      return ShareMethods.SerializeDataJSON(data);
    }

    [WebMethod(EnableSession = true)]
    public string Authorization(object Phone, object UserID, object Company, object Pass, object Magic)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""), pass = Pass.ToString().Trim();

      DataTable data = SystemBusiness.Authorization(phone, UserID, Company, pass, Magic);

      // определение названия базы
      foreach (DataRow dr in data.Rows)
      {
        StoredProc.BaseName = "GTS";
        foreach (DataColumn col in data.Columns)
        {
          if (col.ColumnName.ToString() == "BaseName")
          {
            StoredProc.BaseName = dr[col].ToString();

            break;
          }
        }
      }

      return ShareMethods.SerializeDataJSON(data);
    }

    [WebMethod(EnableSession = true)]
    public string GetUserInfo(object User)
    {
      return ShareMethods.SerializeDataJSON(SystemBusiness.GetUserInfo(User));
    }

    // фото в формате base64
    [WebMethod(EnableSession = true)]
    public string GetPhotoBase64(object FileName)
    {
      string fileName = @FileName.ToString();      

      if (fileName.IndexOf("http") != -1)
        fileName = fileName.Substring(fileName.IndexOf("Photos"), fileName.Length - fileName.IndexOf("Photos"));
      
      fileName = HttpContext.Current.Server.MapPath("/") + @fileName.ToString();

      if (File.Exists(fileName))
      {
        try
        {
          Image a = new Bitmap(fileName);

          using (MemoryStream ms = new MemoryStream())
          {
            a.Save(ms, a.RawFormat);
            byte[] imageBytes = ms.ToArray();

            return "[{ \"FileName\": \"data:image/png;base64," + Convert.ToBase64String(imageBytes) + "\" }]";
          }
        }
        catch (IOException e)
        {
          //return "ошибка:" + e.GetType().Name;
        };
        
      }
      //else return fileName + "не найден";
      return null;
    }    

    // генерация пути файла
    [WebMethod(EnableSession = true)]
    public string GetUploadFileName(string Key, string Company)
    {
      return "Photos/" + Company + "/" + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @Key + ".jpg";
    }

    // получение настроек с сервера
    [WebMethod(EnableSession = true)]
    public string GetSetting(object User)
    {
      return ShareMethods.SerializeDataJSON(SystemBusiness.GetSetting(User));
    }

    // Список фото
    [WebMethod(EnableSession = true)]
    public string GetCompany(object User, object Point = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetCompany(User, Point));
    }

    // сохранение заявки на подключение
    [WebMethod(EnableSession = true)]
    public void SetClaim(object CompanyName, object UserName, object Phone, object EMail, object Text)
    {
      SystemBusiness.SetClaim(CompanyName, UserName, Phone, EMail, Text);
    }

    // сохранение часового пояса пользователя
    [WebMethod(EnableSession = true)]
    public void SetTimeZone(object Phone, object TimeZone)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      UIBusiness.SetTimeZone(phone, TimeZone);
    }

    // переворот фото
    [WebMethod(EnableSession = true)]
    public void RotatePhoto(object fileName)
    {
      try
      {
        string siteAddress = Configuration.ConfigurationManager.AppSettings["SiteAddress"];
        string path = Server.MapPath("~/") + fileName.ToString().Replace(siteAddress, "");

        if (File.Exists(path))
        {
          //create an image object from the image in that path
          System.Drawing.Image img = System.Drawing.Image.FromFile(path);

          //rotate the image
          img.RotateFlip(RotateFlipType.Rotate90FlipNone);

          //save the image out to the file
          img.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);

          //release image file
          img.Dispose();
        }        
        
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}
