using System.Data;
using System.Web.Services;

namespace Report
{
  [WebService(Namespace = "gts.online")] 
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // отчет по заданиям
    [WebMethod(EnableSession = true)]
    public string Task(object User, object Start = null, object Finish = null, object IsMy = null, object Point = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";      

      return ShareMethods.SerializeDataJSON(ReportBusiness.Task(User, Start, Finish, IsMy, Point));
    }

    // отчет по фокусным заданиям
    [WebMethod(EnableSession = true)]
    public string TaskFocus(object User, object Start = null, object Finish = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.TaskFocus(User, Start, Finish));
    }

    // история по ТТ
    [WebMethod(EnableSession = true)]
    public string TaskHistory(object User, object Start = null, object Finish = null, object IsMy = null, object Point = null)
    {      
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.TaskHistory(User, Start, Finish, IsMy, Point));
    }

    // отчет по фото
    [WebMethod(EnableSession = true)]
    public string Photo(object User, object Start, object Finish, object Last = null, object Magic = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Photo(User, Start, Finish, Last, Magic));
    }

    // отчет по SKU
    [WebMethod(EnableSession = true)]
    public string Art(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Art(User, Start, Finish));
    }

    // отчет по промо
    [WebMethod(EnableSession = true)]
    public string Action(object User, object Start, object Finish, object IsPromo)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Action(User, Start, Finish, IsPromo));
    }

    // индекс 1
    [WebMethod(EnableSession = true)]
    public string Index1(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Index1(User, Start, Finish));
    }

    // отчет по визитам
    [WebMethod(EnableSession = true)]
    public string Visit(object User, object Start, object Finish,  object Lang)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

     return ShareMethods.SerializeDataJSON(ReportBusiness.Visit(User, Start, Finish, Lang));
    }

    // трекинг по дню по сотруднику
    [WebMethod(EnableSession = true)]
    public string Tracking(object User, object Borned)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Tracking(User, Borned));
    }

    // трекинг по дню по сотруднику
    [WebMethod(EnableSession = true)]
    public string GeoTracking(object User, object Borned)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GeoTracking(User, Borned));
    }

    // универсальная процедура выбора справочников
    [WebMethod(EnableSession = true)]
    public string GetReportDictionary(object User, object ProcName)
    {      
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetReportDictionary(User, ProcName));
    }

    // универсальная процедура выбора справочников с учетом календаря
    [WebMethod(EnableSession = true)]
    public string GetReportDictionaryDate(object User, object ProcName, object Start, object Finish)
    {      
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetReportDictionaryDate(User, ProcName, Start, Finish));
    }

    // универсальная процедура сохранения справочников
    [WebMethod(EnableSession = true)]
    public void SetReportDictionary(object User, object Text, object ProcName)
    {
      ReportBusiness.SetReportDictionary(User, Text, ProcName);
    }

    // установка выбранных точек для загрузки матрицы по ТТ
    [WebMethod(EnableSession = true)]
    public void SetArtPointDictionary(object Company, object Text)
    {
      ReportBusiness.SetArtPointDictionary(Company, Text);
    }

    // установка выбранных пользователей для загрузки маршрутов по ТТ
    [WebMethod(EnableSession = true)]
    public void SetUserPointDictionary(object Company, object Text)
    {
      ReportBusiness.SetUserPointDictionary(Company, Text);
    }

    // меню настроек отчетов
    [WebMethod(EnableSession = true)]
    public string GetSetting(object User, object Lang)
    {      
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetSetting(User, Lang));
    }

    // список всех брендов
    [WebMethod(EnableSession = true)]
    public string GetBrandAll(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetBrandAll(User));
    }

    // сброс пароля пользователя
    [WebMethod(EnableSession = true)]
    public void ClearAllFilter(object User)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      ReportBusiness.ClearAllFilter(User);
    }

    // сводный отчет
    [WebMethod(EnableSession = true)]
    public string Total(object User, object Start, object Finish, object Last = null, object Magic = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Total(User, Start, Finish, Last, Magic));
    }

    // Отчет по распознаванию по матрицам
    [WebMethod(EnableSession = true)]
    public string AIMatrix(object User, object Start, object Finish, object Last = null, object Magic = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.AIMatrix(User, Start, Finish, Last, Magic));
    }

    // Отчет по распознаванию по матрицам по ТТ сводный
    [WebMethod(EnableSession = true)]
    public string AIMatrixTotal(object User, object Start, object Finish, object Last = null, object Magic = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.AIMatrixTotal(User, Start, Finish, Last, Magic));
    }

    // список дополнительных отчетов
    [WebMethod(EnableSession = true)]
    public string GetAdditional(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetAdditional(User));
    }

    // список полей дополнительного отчета
    [WebMethod(EnableSession = true)]
    public string GetField(object Report)
    {
      return ShareMethods.SerializeDataJSON(ReportBusiness.GetField(Report));
    }

    // список дополнительных отчетов
    [WebMethod(EnableSession = true)]
    public string Run(object Report, object User, object Start, object Finish, object Last = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Run(Report, User, Start, Finish, Last));
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User, object Task)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetMessage(User, Task));
    }

    // список посещенных точек
    [WebMethod(EnableSession = true)]
    public string GetPointVisit(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetPointVisit(User, Start, Finish));
    }

    // список активных пользователей
    [WebMethod(EnableSession = true)]
    public string GetUserVisit(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetUserVisit(User, Start, Finish));
    }

    // добавление тт в список выбранных ТТ на визите
    [WebMethod(EnableSession = true)]
    public string SetPointVisit(object User, object Point, object Status)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.SetPointVisit(User, Point, Status));
    }

    // добавление SKU в список выбранных SKU на визите
    [WebMethod(EnableSession = true)]
    public string SetArtVisit(object User, object Art, object Status)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.SetArtVisit(User, Art, Status));
    }

    // добавление пользователей в список выбранных пользователей на визите
    [WebMethod(EnableSession = true)]
    public string SetUserVisit(object User, object Acceptor, object Status)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.SetUserVisit(User, Acceptor, Status));
    }

    // список скрытых полей отчета
    [WebMethod(EnableSession = true)]
    public string GetHiddenField(object User, object Table)
    {
      return ShareMethods.SerializeDataJSON(ReportBusiness.GetHiddenField(User, Table));
    }

    // сохранение скрытых полей отчетов
    [WebMethod(EnableSession = true)]
    public string SetHiddenField(object User, object Table, object Field, object Status)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.SetHiddenField(User, Table, Field, Status));
    }

    // аналитика: визиты план-факт
    [WebMethod(EnableSession = true)]
    public string Discipline(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Discipline(User, Start, Finish));
    }

    // аналитика: план-факт по визитам
    [WebMethod(EnableSession = true)]
    public string Route(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Route(User, Start, Finish));
    }

    // аналитика: план-факт по визитам и пользователям
    [WebMethod(EnableSession = true)]
    public string RouteUsers(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.RouteUsers(User, Start, Finish));
    }

    // аналитика: сводный отчет по визитам
    [WebMethod(EnableSession = true)]
    public string VisitTotal(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.VisitTotal(User, Start, Finish));
    }

    // Список скрытых от пользователя отчетов
    [WebMethod(EnableSession = true)]
    public string GetUserReport(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetUserReport(User));
    }

    // Список фото по визиту
    [WebMethod(EnableSession = true)]
    public string GetVisitPhoto(object Point, object User, object Borned, object GUID = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetVisitPhoto(Point, User, Borned, GUID));
    }

    // Список дополнительных фото
    [WebMethod(EnableSession = true)]
    public string GetAdditionalPhotos(object Point, object Borned)
    {
      if (Point == null) return "";
      if (int.Parse(Point.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.GetAdditionalPhotos(Point, Borned));
    }


    // тест
    [WebMethod(EnableSession = true)]
    public string Test(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Test(User));
    }

    // маршруты сводный
    [WebMethod(EnableSession = true)]
    public string RouteTotal(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.RouteTotal(User, Start, Finish));
    }

    // ошибки маршрутизации
    [WebMethod(EnableSession = true)]
    public string RouteError(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.RouteError(User, Start, Finish));
    }

    // отчет по наличию
    [WebMethod(EnableSession = true)]
    public string Stock(object User, object Start, object Finish, object Last)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.Stock(User, Start, Finish, Last));
    }

    // фото для финального отчета  Дикси
    [WebMethod(EnableSession = true)]
    public string DiksiGetPhoto(object Point, object User, object Borned, object Art)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.DiksiGetPhoto(Point, User, Borned, Art));
    }

    // справочник по скю
    [WebMethod(EnableSession = true)]
    public string DirectoryArt(object User)
    {
        if (User == null) return "";
        if (int.Parse(User.ToString()) == -1) return "";

        return ShareMethods.SerializeDataJSON(ReportBusiness.DirectoryArt(User));
    }

    // справочник матрица скю в тт
    [WebMethod(EnableSession = true)]
    public string DirectoryArtPointMaps(object User)
    {
        if (User == null) return "";
        if (int.Parse(User.ToString()) == -1) return "";

        return ShareMethods.SerializeDataJSON(ReportBusiness.DirectoryArtPointMaps(User));
    }

    // справочник матрица скю по форматам
    [WebMethod(EnableSession = true)]
    public string DirectoryArtFormatMap(object User)
    {
        if (User == null) return "";
        if (int.Parse(User.ToString()) == -1) return "";
    
        return ShareMethods.SerializeDataJSON(ReportBusiness.DirectoryArtFormatMap(User));
    }
    
    // справочник матрица скю по сетям
    [WebMethod(EnableSession = true)]
    public string DirectoryArtNetworkMap(object User)
    {
        if (User == null) return "";
        if (int.Parse(User.ToString()) == -1) return "";
    
        return ShareMethods.SerializeDataJSON(ReportBusiness.DirectoryArtNetworkMap(User));
    }

    // справочник адресная программа
    [WebMethod(EnableSession = true)]
    public string DirectoryAP(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.DirectoryAP(User));
    }

        //  Get data for Map
        [WebMethod(EnableSession = true)]
    public string MapPointReport(object User, object Start, object Finish)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ReportBusiness.MapPointReport(User, Start, Finish));
    }

  }
}
