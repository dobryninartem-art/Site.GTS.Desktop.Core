// Перенесено из source/App_Code/API.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System.Web.Services;
/// API для синхронизации

namespace API
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]
  public class Framework : WebService
  {}

  //синхронизация с ARK(GFD)
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]
  public class ARK : WebService
  {
    ///сохранение ответа
    [WebMethod]
    public void SetAnswer(object Key, object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer = null, object Photo = null)
    {
      APIBusiness.ARK_SetAnswer(Key, Point, User, Borned, Action, Art, Question, Option, Answer, Photo);
    }

    ///сохранение претензии к визиту
    [WebMethod]
    public void SetTask(object Key, object Point, object User, object Borned)
    {
      APIBusiness.ARK_SetTask(Key, Point, User, Borned);
    }

    ///сохранение справочника ТТ
    [WebMethod]
    public void SetPoint(object Key, object Point, object OfficeName, object CityName, object NetworkName, object Address, object Lat = null, object Lon = null)
    {
      APIBusiness.ARK_SetPoint(Key, Point, OfficeName, CityName, NetworkName, Address, Lat, Lon);
    }

    ///сохранение справочника сотрудники
    [WebMethod]
    public void SetUsers(object Key, object User, object LName, object FName, object RoleName, object Master = null, object MasterLName = null, object MasterFName = null, object MasterRoleName = null)
    {
      APIBusiness.ARK_SetUsers(Key, User, LName, FName, RoleName, Master, MasterLName, MasterFName, MasterRoleName);
    }

  }

  //синхронизация с Элемент(GFD)
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]
  public class ELEMENT : WebService
  {
    ///сохранение ответа
    [WebMethod]
    public void SetAnswer(object Key, object Point, object User, object Borned, object Action, object Art, object Question, object Option, object Answer = null, object Photo = null)
    {
      APIBusiness.ELEMENT_SetAnswer(Key, Point, User, Borned, Action, Art, Question, Option, Answer, Photo);
    }

    ///сохранение претензии к визиту
    [WebMethod]
    public void SetTask(object Key, object Point, object User, object Borned)
    {
      APIBusiness.ELEMENT_SetTask(Key, Point, User, Borned);
    }

    ///сохранение справочника ТТ
    [WebMethod]
    public void SetPoint(object Key, object Point, object OfficeName, object CityName, object NetworkName, object Address, object Lat = null, object Lon = null)
    {
      APIBusiness.ELEMENT_SetPoint(Key, Point, OfficeName, CityName, NetworkName, Address, Lat, Lon);
    }

    ///сохранение справочника сотрудники
    [WebMethod]
    public void SetUsers(object Key, object User, object LName, object FName, object RoleName, object Master = null, object MasterLName = null, object MasterFName = null, object MasterRoleName = null)
    {
      APIBusiness.ELEMENT_SetUsers(Key, User, LName, FName, RoleName, Master, MasterLName, MasterFName, MasterRoleName);
    }

  }
}
