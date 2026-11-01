using System.Threading;
using System.Web.Services;
using System.Web.UI;

namespace BI
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    /// BI

    // загрузка меню фильтров слева
    [WebMethod(EnableSession = true)]
    public string GetFilter(object User, object Window)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.GetFilter(User, Window));
    }

    // показ значений фильтра
    [WebMethod(EnableSession = true)]
    public string RunFilter(object User, object Magic, object Window)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.RunFilter(User, Magic, Window));
    }

    // включение\отключение фильтра по легенде
    [WebMethod(EnableSession = true)]
    public void SetLegendStatus2(object User, object Window, object Magic, object ID, object Status, object IsOne = null)
    {
      BIBusiness.SetLegendStatus2(User, Window, Magic, ID, Status, IsOne);
    }

    // включение всех фильтров-легенд
    [WebMethod(EnableSession = true)]
    public void ClearLegendStatus(object User, object Window)
    {
      BIBusiness.ClearLegendStatus(User, Window);
    }


    // ------------------- Исполнительная диспциплина

    [WebMethod(EnableSession = true)]
    public string BA_Distipline2(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare = null)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.VisitCalc(User, Start, Finish, Period, Magic, IsCalc, IsFirst, IsFix, IsCompare));
    }
    
    // просмотр детальной информации при клике на график
    [WebMethod(EnableSession = true)]
    public string GetDetail(object User, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.GetDetail(User, Start, Finish));
    }

    // расчет показателей для Исполнительной дисциплины по офисам
    [WebMethod(EnableSession = true)]
    public string CalcArea(object Area, object User, object Start, object Finish, object Period, object Magic, object IsCalc)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.CalcArea(Area, User, Start, Finish, Period, Magic, IsCalc));
    }

    // ------------------- OSA 
    [WebMethod(EnableSession = true)]
    public string BA_OSA(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare = null)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.CalcOSA(User, Start, Finish, Period, Magic, IsCalc, IsFirst, IsFix, IsCompare));
    }

    // обновление статуса для таблицы SKU
    [WebMethod(EnableSession = true)]
    public void SetTempArt(object User, object Window, object Text)
    {
      BIBusiness.SetTempArt(User, Window, Text);
    }

    // детализация по отсутствующим позициям
    [WebMethod(EnableSession = true)]
    public string BA_OSADetail(object User, object Start, object Finish, object Period, object Magic, object IsCalc)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.DetailOSA(User, Start, Finish, Period, Magic, IsCalc));
    }

    // ------------------- OOS 
    [WebMethod(EnableSession = true)]
    public string BA_OOS(object User, object Start, object Finish, object Period, object Magic, object IsCalc, object IsFirst, object IsFix, object IsCompare = null)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.CalcOOS(User, Start, Finish, Period, Magic, IsCalc, IsFirst, IsFix, IsCompare));
    }

    // детализация по отсутствующим позициям
    [WebMethod(EnableSession = true)]
    public string BA_OOSDetail(object User, object Start, object Finish, object Period, object Magic, object IsCalc)
    {
      return ShareMethods.SerializeDataJSON(BIBusiness.DetailOOS(User, Start, Finish, Period, Magic, IsCalc));
    }
  }
}
