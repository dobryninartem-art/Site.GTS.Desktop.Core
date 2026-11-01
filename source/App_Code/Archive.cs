using System.Web.Services;
using System.IO;
using System.Collections.Generic;
using ICSharpCode.SharpZipLib.Zip;
using System.Text.RegularExpressions;
using System;

namespace Archive
{
  [WebService(Namespace = "gts.online")] 
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // архивирование фото
    string siteAddress = System.Configuration.ConfigurationManager.AppSettings["SiteAddress"];
    public static string replaceInvalidCharactersInFilename(string input)
    {
      return Regex.Replace(input, @"[\\//:*?""<>|+]", "_");
    }
    
    public class AvailableImg
    {
      public string _path { get; set; }
      public string _name { get; set; }
    }

    private string GetLocalPath(string url)
    {
      if (string.IsNullOrEmpty(url))
        return string.Empty;

      Uri uri;
      string relative = Uri.TryCreate(url, UriKind.Absolute, out uri)
          ? Uri.UnescapeDataString(uri.AbsolutePath)   
          : url;

      return Server.MapPath("~/" + relative.TrimStart('/'));
    }

    [WebMethod(EnableSession = true)]
    public string ArchivePhotoList(object Producer, object Date, IList<AvailableImg> images)
    {
      string result = string.Empty;

      try
      {
        ZipConstants.DefaultCodePage = 866;
        string zipName = replaceInvalidCharactersInFilename(Producer + " " + Date) + ".zip";
        string zipPath = Server.MapPath("~/Archives/" + zipName);

        if (File.Exists(zipPath))
          File.Delete(zipPath);

        int added = 0;

        using (ZipFile zip = ZipFile.Create(zipPath))
        {
          zip.BeginUpdate();

          if (images != null)
          {
            int i = 0;
            foreach (AvailableImg element in images)
            {
              i++;

              string localPath = GetLocalPath(element._path);
              string entryName = replaceInvalidCharactersInFilename(element._name) + " (" + i + ").jpg";

              if (!File.Exists(localPath))
                continue;

              try
              {
                zip.Add(localPath, entryName);
                added++;
              }
              catch (Exception ex)
              {
                zip.AbortUpdate();
                return entryName + " " + ex.Message;
              }
            }
          }

          zip.CommitUpdate();
        }

        if (added == 0)
          result = "Ќе найдено ни одного файла дл€ архива";
      }
      catch (Exception ex)
      {
        result = ex.Message;
      }

      return result;
    }

    //после формировани€ архива с фото, будет отправлена ссылка дл€ скачивани€
    [WebMethod(EnableSession = true)]
    public string ArchivePhotoListSendEmail(object Producer, object Date, IList<AvailableImg> images, object archiveName, object userID, object photoCount)
    {
      string result = string.Empty;

      try
      {
        ZipFile zip; ZipConstants.DefaultCodePage = 866;
        string zipName = replaceInvalidCharactersInFilename(Producer.ToString() + " " + Date) + ".zip";
        string zipPath = Server.MapPath("~/Archives/" + zipName);

        if (File.Exists(zipPath))
            File.Delete(zipPath);
        zip = ZipFile.Create(zipPath);

        using (zip)
        {
          zip.BeginUpdate();

          int i = 0;
          if (images != null && images.Count > 0)
          {
            foreach (AvailableImg element in images)
            {
              i++;
              if (File.Exists(Server.MapPath("~/") + element._path.Replace(siteAddress, "")))
              try
              {
                  zip.Add(Server.MapPath("~/") + element._path.Replace(siteAddress, ""),
                    replaceInvalidCharactersInFilename(element._name) + " (" + i + ").jpg");
              }
              catch (Exception ex)
              {
                  result = replaceInvalidCharactersInFilename(element._name) + " (" + i + ").jpg" + " " + ex.Message;
                  return result;
              }

            }
          }
          zip.CommitUpdate();
          zip.Close();

          SystemBusiness.SendPhotoArchive(archiveName, userID, photoCount);
        }
      }
      catch (Exception ex)
      {
        result = ex.Message;
      }
      return result;
    }
  }
}
