// Перенесено из source/Refresh.aspx.cs (исходная кодировка: utf-8).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.Threading;
using System.Data;

// Было: public partial class result (страница Refresh.aspx)
public class RefreshPage : System.Web.UI.Page
{
  int sleepDefault = 20; 
  int sleepLong = 60;
  int sleepExtraLong = 120;
  int sleepSec = 20;
  int i = 0;

  DateTime lastMessage = DateTime.Now;

  protected void Page_Load(object sender, EventArgs e)
  {
    string User = Request.QueryString["id"];

    TimeSpan ts;
    int minutes;

    if (User == "null") return;
            
    while (0 < 1) {
      Response.ContentType = "text/event-stream";
      Response.CacheControl = "no-cache";

      Response.Write(string.Format("data: {0}\n\n", "connect"));
      try
      {
        Response.Flush();
      }
      catch (Exception exc) {
        break;
      }

      ts = (DateTime.Now - lastMessage);
      minutes = Convert.ToInt32(ts.TotalMinutes);

      if ((minutes >= 5) && (minutes <= 10))
        sleepSec = sleepLong;
      else
      {
        if (minutes > 10)
          sleepSec = sleepExtraLong;
        else
          if (minutes > 60)
            break;
      }

      GetData(User);
      Thread.Sleep(sleepSec * 1000);
    }
  }

  private void GetData(object User)
  {
    DataTable data = SystemBusiness.GetRefresh(User);
    var count = data.Rows.Count;
    
    if (count > 0)
    {
      Response.Write(string.Format("data: {0}|{1}\n\n", data.Rows[0]["MessageID"], data.Rows[0]["Magic"]));
      try
      {
        Response.Flush();
      }
      catch (Exception exc)
      {
        i = 1;
        
        return;
      }

      lastMessage = DateTime.Now;
      sleepSec = sleepDefault;
      return;
    }
  }
}