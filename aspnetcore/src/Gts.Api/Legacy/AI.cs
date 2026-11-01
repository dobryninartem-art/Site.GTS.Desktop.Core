// Перенесено из source/App_Code/AI.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System.Web.Services;

namespace AI
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {

    /// Распознавание

    /// Получение списка распознанных SKU
    /// <param name="PhotoID">ID фото</param>
    [WebMethod(EnableSession = true)]
    public string GetResultArt(object Company, object Photo)
    {
      return ShareMethods.SerializeDataJSON(AIBusiness.GetResultArt(Company, Photo));
    }

    /// Получение списка распознанных SKU с координатами
    /// <param name="PhotoID">ID фото</param>
    [WebMethod(EnableSession = true)]
    public string GetResult(object Company, object Photo, object Art)
    {
      return ShareMethods.SerializeDataJSON(AIBusiness.GetResult(Company, Photo, Art));
    }
  }
}
