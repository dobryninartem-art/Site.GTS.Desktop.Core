using System.Web.Services;

namespace Replication
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    /// <summary>
    /// Справочник торговых точек
    /// </summary>    
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetPoint()
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetPoint());
    }

    /// <summary>
    /// Справочник сотрудников
    /// </summary>    
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetUser()
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetUser());
    }

    /// <summary>
    /// Справочник SKU
    /// </summary>    
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetArt()
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetArt());
    }

    /// <summary>
    /// Справочник вопросов
    /// </summary>    
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetQuestion()
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetQuestion());
    }

    /// <summary>
    /// Опросные листы
    /// </summary>    
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetAction()
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetAction());
    }

    /// <summary>
    /// Визиты
    /// </summary>    
    /// <param name="Start">Дата - начало выгружаемого периода.</param>
    /// <param name="Finish">Дата - окончание выгружаемого периода.</param>
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetVisit(object Start = null, object Finish = null)
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetVisit(Start, Finish));
    }

    /// <summary>
    /// Ответы
    /// </summary>    
    /// <param name="Start">Дата - начало выгружаемого периода.</param>
    /// <param name="Finish">Дата - окончание выгружаемого периода.</param>
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetAnswer(object Start = null, object Finish = null)
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetAnswer(Start, Finish));
    }

    /// <summary>
    /// Фотоотчеты
    /// </summary>    
    /// <param name="Start">Дата - начало выгружаемого периода.</param>
    /// <param name="Finish">Дата - окончание выгружаемого периода.</param>
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string GetPhotoReport(object Start = null, object Finish = null)
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.GetPhotoReport(Start, Finish));
    }

    /// <summary>
    /// Синхронизация для Мерч4
    /// </summary>    
    /// <param name="Key">Ключ для обмена данными</param>
    /// <param name="Flag">Параметр для получаемых данных</param>
    /// <param name="dateFrom">Дата - начало выгружаемого периода.</param>
    /// <param name="dateTo">Дата - окончание выгружаемого периода.</param>
    /// <returns>json массив</returns>
    [WebMethod(EnableSession = true)]
    public string DataExchange(object Key, object Flag, object dateFrom = null, object dateTo = null)
    {
      return ShareMethods.SerializeDataJSON(ReplicationBusiness.DataExchange(Key, Flag, dateFrom, dateTo));
    }
  }
}
