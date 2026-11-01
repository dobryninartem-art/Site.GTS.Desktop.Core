// Перенесено из source/App_Code/Custom.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System.Web.Services;

namespace Custom
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {

    // методы по кастомным отчетам

    // сохранение отчета
    [WebMethod(EnableSession = true)]
    public string SetReport(object ID, object Company, object Name, object Description, object SortOrder, object Status, object Author)
    {
      return CustomBusiness.SetReport(ID, Company, Name, Description, SortOrder, Status, Author);
    }

    // сохранение колонки отчета
    [WebMethod(EnableSession = true)]
    public void SetReportColumn(object Report, object FieldName, object Name, object SortOrder, object Width, object IsHidden, object Author)
    {
      CustomBusiness.SetReportColumn(Report, FieldName, Name, SortOrder, Width, IsHidden, Author);
    }

    // Список полей отчета
    [WebMethod(EnableSession = true)]
    public string GetReportField(object Menu, object User)
    {
      return ShareMethods.SerializeDataJSON(CustomBusiness.GetReportField(Menu, User));
    }

    // установка фильтров слева при правке отчета
    [WebMethod(EnableSession = true)]
    public string SetFilters(object Report, object User)
    {
      return ShareMethods.SerializeDataJSON(CustomBusiness.SetFilters(Report, User));     
    }

    // выполнение отчета
    [WebMethod(EnableSession = true)]
    public string GetReportTotal(object Report, object User, object Start, object Finish)
    {
      if (Report == null) return "";
      if (int.Parse(Report.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(CustomBusiness.GetReportTotal(Report, User, Start, Finish));
    }

    // удаление отчета
    [WebMethod(EnableSession = true)]
    public void DeleteReport(object Report, object Author)
    {
      CustomBusiness.DeleteReport(Report, Author);
    }

    // список для настройки доступа к отчету
    [WebMethod(EnableSession = true)]
    public string GetAccess(object Report, object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(CustomBusiness.GetAccess(Report, User));
    }

    // сохранение доступа к отчету
    [WebMethod(EnableSession = true)]
    public void SetAccess(object Report, object Role, object User, object Status, object Author)
    {
      CustomBusiness.SetAccess(Report, Role, User, Status, Author);
    }

    // информация по фото
    [WebMethod(EnableSession = true)]
    public string GetPhotoInfo(object Photo, object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(CustomBusiness.GetPhotoInfo(Photo, User));
    }

    // сохранение иконки снизу
    [WebMethod(EnableSession = true)]
    public void SetIcon(object Menu, object User, object Status)
    {
      CustomBusiness.SetIcon(Menu, User, Status);
    }
  }
}
