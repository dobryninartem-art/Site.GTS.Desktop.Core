using System.Web.Services;

namespace Framework
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // методы по рабочему столу пользовател€

    // сохранение компании дл€ пользовател€
    [WebMethod(EnableSession = true)]
    public void SetUserCompany(object User, object Company)
    {
      FrameworkBusiness.SetUserCompany(User, Company);
    }


    // левое меню - карта сайта
    [WebMethod(EnableSession = true)]
    public string GetMenu(object User, object Company)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetMenu(User, Company));
    }

    // р€д нижних иконок пользовател€
    [WebMethod(EnableSession = true)]
    public string GetMenuIcon(object User, object Company)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetMenuIcon(User, Company));
    }

    // список служебных окон, которых нет в карте отчетов
    [WebMethod(EnableSession = true)]
    public string GetMenuUtility(object User, object Company)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetMenuUtility(User, Company));
    }

    // список компаний сотрудника
    [WebMethod(EnableSession = true)]
    public string GetCompany(object User)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetCompany(User));
    }

    // универсальна€ процедура запуска отчета
    [WebMethod(EnableSession = true)]
    public string Run(object Menu, object BaseName, object ProcName, object User, object Start = null, object Finish = null, object Last = null, object ReportMagic = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(FrameworkBusiness.Run(Menu, BaseName, ProcName, User, Start, Finish, Last, ReportMagic));
    }

    // загрузка сохраненных колонок отчета
    [WebMethod(EnableSession = true)]
    public string GetFieldUserMap(object Menu, object User)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetFieldUserMap(Menu, User));
    }

    // сохранение колонки отчета
    [WebMethod(EnableSession = true)]
    public void SetFieldUserMap(object Menu, object User, object FieldName, object Name, object Width, object IsHidden, object SortOrder)
    {
      FrameworkBusiness.SetFieldUserMap(Menu, User, FieldName, Name, Width, IsHidden, SortOrder);
    }

    // загрузка сохраненного окна отчета
    [WebMethod(EnableSession = true)]
    public string GetWindowUserMap(object Menu, object User)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetWindowUserMap(Menu, User));
    }

    // сохранение окна отчета
    [WebMethod(EnableSession = true)]
    public void SetWindowUserMap(object Menu, object User, object OffsetX, object OffsetY, object Width, object Height, object IsAdjust)
    {
      FrameworkBusiness.SetWindowUserMap(Menu, User, OffsetX, OffsetY, Width, Height, IsAdjust);
    }

    // список меню в зависимости от выбранного отчета
    [WebMethod(EnableSession = true)]
    public string GetFilter(object Menu, object User, object Company)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetFilter(Menu, User, Company));
    }

    // универсальна€ процедура загрузки данных по фильтру
    [WebMethod(EnableSession = true)]
    public string RunFilter(object ProcName, object User, object Start = null, object Finish = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(FrameworkBusiness.RunFilter(ProcName, User, Start, Finish));
    }

    // универсальна€ процедура сохранени€ справочников
    [WebMethod(EnableSession = true)]
    public void SetReportDictionary(object User, object Text, object ProcName)
    {
      FrameworkBusiness.SetReportDictionary(User, Text, ProcName);
    }

    // настройки рабочего стола пользовател€
    [WebMethod(EnableSession = true)]
    public string GetUserSetting(object User)
    {
      return ShareMethods.SerializeDataJSON(FrameworkBusiness.GetUserSetting(User));
    }

    // сохранение настроек рабочего стола пользовател€
    [WebMethod(EnableSession = true)]
    public void SetUserSetting(object User, object Magic, object Value)
    {
      FrameworkBusiness.SetUserSetting(User, Magic, Value);
    }
  }
}
