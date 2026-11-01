using System;
using System.Web;
using System.Web.Services;
using System.Data;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Xml.Linq;
using System.Threading.Tasks;

namespace AppToken
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // получение настроек с сервера
    [WebMethod(EnableSession = true)]
    public string GetSetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetSetting(User));
    }

    // настройки компании пользователя
    [WebMethod(EnableSession = true)]
    public string GetCompanySetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetCompanySetting(User));
    }

    // список компаний
    [WebMethod(EnableSession = true)]
    public string GetCompany(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetCompany(User));
    }

    //  Список клиентов для фотоотчетов
    [WebMethod(EnableSession = true)]
    public string GetPhotoCompanyMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetPhotoCompanyMap(User));
    }

    // список SKU
    [WebMethod(EnableSession = true)]
    public string GetArt(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetArt(User));
    }

    // список фото по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtPhotos(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetArtPhotos(User));
    }

    // список брендов SKU
    [WebMethod(EnableSession = true)]
    public string GetBrand(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetBrand(User));
    }

    // список товарных групп SKU
    [WebMethod(EnableSession = true)]
    public string GetCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetCategory(User));
    }

    // список категорий фото
    [WebMethod(EnableSession = true)]
    public string GetPhotoCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetPhotoCategory(User));
    }

    // Список стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandart(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetStandart(User));
    }

    // Список стандартов выкладки в привязке к ТТ
    [WebMethod(EnableSession = true)]
    public string GetStandartMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetStandartMap(User));
    }

    // Список фото стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandartFile(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetStandartFile(User));
    }

    // список атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttribute(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetPointAttribute(User));
    }

    // список значений атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttributeValue(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetPointAttributeValue(User));
    }

    // список сетей
    [WebMethod(EnableSession = true)]
    public string GetNetwork(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetNetwork(User));
    }

    // список ТТ
    [WebMethod(EnableSession = true)]
    public string GetPoint(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetPoint(User));
    }

    // матрицы SKU для каталога
    [WebMethod(EnableSession = true)]
    public string GetArtCatalog(object User, object Point)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetArtCatalog(User, Point));
    }

    // список анкет
    [WebMethod(EnableSession = true)]
    public string GetAction(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetAction(User));
    }

    // получение списка файлов закрепленных за анкетой
    [WebMethod(EnableSession = true)]
    public string GetActionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetActionFiles(User));
    }

    // список диапазонов ответов по числовым вопросам
    [WebMethod(EnableSession = true)]
    public string GetArtQuestionRange(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetArtQuestionRange(User));
    }

    // список вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetQuestion(User));
    }

    // список перечислимых ответов
    [WebMethod(EnableSession = true)]
    public string GetQuestionOption(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetQuestionOption(User));
    }

    // список файлов для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetQuestionFiles(User));
    }

    //список вариантов для закрытие визита без заполнения обязательной отчетность
    [WebMethod(EnableSession = true)]
    public string GetOptionsVisitFinish(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetOptionsVisitFinish(User));
    }

    // Настройки фотоаппарата для анкеты и вопроса
    [WebMethod(EnableSession = true)]
    public string GetActionQuestionSettings(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetActionQuestionSettings(User));
    }

    // список заданий
    [WebMethod(EnableSession = true)]
    public string GetTask(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetTask(User));
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessToken.GetMessage(User));
    }
  }
}
