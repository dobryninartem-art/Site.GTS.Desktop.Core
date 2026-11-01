using System.Web.Services;

namespace Visit
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {

    // Информация по визиту

    // Получение списка заголовков по визиту
    [WebMethod(EnableSession = true)]
    public string GetCaption(object Point, object User, object Borned, object GUID, object Author)
    {
      return ShareMethods.SerializeDataJSON(VisitBusiness.GetCaption(Point, User, Borned, GUID, Author));
    }

    // Получение списка ответов по визиту
    [WebMethod(EnableSession = true)]
    public string GetFullMatrixByVisit(object Company, object Point, object User, object Borned, object IsEdit, object Author, object GUID = null)
    {
      return ShareMethods.SerializeDataJSONMany(VisitBusiness.GetFullMatrixByVisit(Company, Point, User, Borned, IsEdit, Author, GUID));
    }

    // Получение списка фото по визиту
    [WebMethod(EnableSession = true)]
    public string GetPhotoByVisit(object Company, object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(VisitBusiness.GetPhotoByVisit(Company, Point, User, Borned));
    }

    // Запуск процедуры с параметрами
    [WebMethod(EnableSession = true)]
    public string Run(object ProcName, object Point, object User, object Borned, object GUID, object ParamName, object Author)
    {
      return ShareMethods.SerializeDataJSON(VisitBusiness.Run(ProcName, Point, User, Borned, GUID, ParamName, Author));
    }

    // создание визита
    [WebMethod(EnableSession = true)]
    public void SetVisit(object Point, object User, object Borned)
    {
      VisitBusiness.SetVisit(Point, User, Borned);
    }
  }
}
