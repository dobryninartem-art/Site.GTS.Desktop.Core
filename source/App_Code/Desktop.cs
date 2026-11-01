using System.Web.Services;

namespace Desktop
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // список сотрудников для задания
    [WebMethod(EnableSession = true)]
    public string GetAcceptor(object User, object Point, object Client = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetAcceptor(User, Point, Client));
    }

    // скрытие меню для компании
    [WebMethod(EnableSession = true)]
    public string GetMenu(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetMenu(User));
    }

    // список готовых отчетов
    [WebMethod(EnableSession = true)]
    public string GetReportReady(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetReportReady(User));
    }

    // маршруты
    [WebMethod(EnableSession = true)]
    public string GetRoute(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetRoute(User));
    }

    // правка отчета по SKU
    [WebMethod(EnableSession = true)]
    public void SetAnswer(object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer)
    {
      DesktopBusiness.SetAnswer(Point, User, Borned, Action, Art, Question, Option, Answer);
    }

    // правка визита
    [WebMethod(EnableSession = true)]
    public void SetRoute(object Company, object Point, object User, object Link, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7, object Author)
    {
      DesktopBusiness.SetRoute(Company, Point, User, Link, Day1, Day2, Day3, Day4, Day5, Day6, Day7, Author);
    }

    // табель рабочего времени
    [WebMethod(EnableSession = true)]
    public string GetTimeSheet(object User, object Borned)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetTimeSheet(User, Borned));
    }

    // правка табеля рабочего времени
    [WebMethod(EnableSession = true)]
    public void SetTimeSheet(object User, object Borned, object Status)
    {
      DesktopBusiness.SetTimeSheet(User, Borned, Status);
    }

    // маршруты
    [WebMethod(EnableSession = true)]
    public string GetRoute2(object Company, object Start, object Finish, object User, object Flag, object OfficeName, object RoleName)
    {
      if (Company == null) return "";
      if (int.Parse(Company.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetRoute2(Company, Start, Finish, User, Flag, OfficeName, RoleName));
    }

    // сохранение маршрута
    [WebMethod(EnableSession = true)]
    public void SetRoute2(object Company, object Point, object RoleName, object CompanyName, object User, object Borned, object Value)
    {
      DesktopBusiness.SetRoute2(Company, Point, RoleName, CompanyName, User, Borned, Value);
    }

    // сохранение комментария к маршруту
    [WebMethod(EnableSession = true)]
    public void SetRouteDescription(object Company, object CompanyName, object Point, object User, object Borned, object Description, object Author)
    {
      DesktopBusiness.SetRouteDescription(Company, CompanyName, Point, User, Borned, Description, Author);
    }

    //копирование маршрута с текущей недели на следующую
    [WebMethod(EnableSession = true)]
    public void CopyRouteWeek(object Point, object User, object Company, object Author)
    {
      DesktopBusiness.CopyRouteWeek(Point, User, Company, Author);
    }

    //очистка маршрута сотрудника с завтра
    [WebMethod(EnableSession = true)]
    public void CleanRoute(object Point, object User, object Company, object Author)
    {
      DesktopBusiness.CleanRoute(Point, User, Company, Author);
    }

    //копирование маршрута с текущей недели на следующую по всем подчиненным сотрудникам
    [WebMethod(EnableSession = true)]
    public void CopyRouteWeekAll(object Flag, object Author)
    {
      DesktopBusiness.CopyRouteWeekAll(Flag, Author);
    }

    // список фото PLU
    [WebMethod(EnableSession = true)]
    public string GetPLU()
    {
      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetPLU());
    }

    // список рекламаций для визита
    [WebMethod(EnableSession = true)]
    public string GetTaskVisit(object User, object GUID)
    {
      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetTaskVisit(User, GUID));
    }

    // сохранение рекламации по визиту
    [WebMethod(EnableSession = true)]
    public void SetTaskVisit(object GUID, object Task, object User, object Description)
    {
      DesktopBusiness.SetTaskVisit(GUID, Task, User, Description);
    }

    // Винагро отчет по наличию для рекламаций по визиту
    [WebMethod(EnableSession = true)]
    public string GetVisitArt(object User, object Point, object Borned)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetVisitArt(User, Point, Borned));
    }

    //сохранение ответа для отчетов
    [WebMethod(EnableSession = true)]
    public void SetReportAnswer(object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer, object Company, object Report, object Author)
    {
        DesktopBusiness.SetReportAnswer(Point, User, Borned, Action, Art, Question, Option, Answer, Company, Report, Author);
    }

    //сохранение в таблицу для адресной программы 
    [WebMethod(EnableSession = true)]
    public void SetPointStatus(object PointID, object CompanyID, object Status, object Author)
    {
        DesktopBusiness.SetPointStatus(PointID, CompanyID, Status, Author);
    }

    // Загрузка меню
    [WebMethod(EnableSession = true)]
    public string GetMenuCustom(object Company, object MenuName, object Lang, object User)
    {
      if (Company == null) return "";
      if (int.Parse(Company.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetMenuCustom(Company, MenuName, Lang, User));
    }

    // маршруты конфигурация столбцов
    [WebMethod(EnableSession = true)]
    public string GetRouteConfig(object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetRouteConfig(Start, Finish));
    }

    // список категорий SKU
    [WebMethod(EnableSession = true)]
    public string GetDictionary(object Company, object ProcName, object Key)
    {
      if (Company == null) return "";
      if (int.Parse(Company.ToString()) == -1) return "";
      if (ProcName == null) return "";

      return ShareMethods.SerializeDataJSON(DesktopBusiness.GetDictionary(Company, ProcName, Key));
    }

    //Шторк сохранение комента по отчету "Расчет бонусов полевой структуре"
    [WebMethod(EnableSession = true)]
    public string SetBonusPlan(object User, object Start, object WorkDay, object IsCheck, object Comment, object Bonus, object Author)
        {
      return ShareMethods.SerializeDataJSON(DesktopBusiness.SetBonusPlan(User, Start, WorkDay, IsCheck, Comment, Bonus, Author));
    }

    //Шторк сохранение комента по отчету "ТАБЕЛЬ"
    [WebMethod(EnableSession = true)]
    public string SetTimesheet(object User, object Borned, object Type, object Answer, object Author)
    {
      return ShareMethods.SerializeDataJSON(DesktopBusiness.SetTimesheet(User, Borned, Type, Answer, Author));
    }

    //сохранение проверки визита
    [WebMethod(EnableSession = true)]
    public void SetVisitCheck(object Point, object User, object Borned, object GUID, object IsCheck, object Author)
    {
      DesktopBusiness.SetVisitCheck(Point, User, Borned, GUID, IsCheck, Author);
    }

    //сохранение статуса актуальности претензии
    [WebMethod(EnableSession = true)]
    public void SetTaskActual(object Task, object IsActual)
    {
      DesktopBusiness.SetTaskActual(Task, IsActual);
    }

    //удаление визита
    [WebMethod(EnableSession = true)]
    public void SetDeleteVisits(object Point, object User, object Borned, object Author)
    {
      DesktopBusiness.SetDeleteVisits(Point, User, Borned, Author);
    }

    //удаление задания
    [WebMethod(EnableSession = true)]
    public void SetDeleteTasks(object Task, object Author)
    {
      DesktopBusiness.SetDeleteTasks(Task, Author);
    }
  }
}
