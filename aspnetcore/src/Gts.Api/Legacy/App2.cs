// Перенесено из source/App_Code/App2.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.Services;

namespace App2
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // матрица визитов
    [WebMethod(EnableSession = true)]
    public string GetMatrix(object User, object Point = null)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetMatrix(User, Point));
    }

    // список сетей
    [WebMethod(EnableSession = true)]
    public string GetNetwork(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetNetwork(User));
    }

    // список ТТ
    [WebMethod(EnableSession = true)]
    public string GetPoint(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetPoint(User));
    }

    // список анкет
    [WebMethod(EnableSession = true)]
    public string GetAction(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetAction(User));
    }

    // получение списка файлов закрепленных за анкетой
    [WebMethod(EnableSession = true)]
    public string GetActionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetActionFiles(User));
    }

    // список вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetQuestion(User));
    }

    // список подчиненных вопросов-ветвлений
    [WebMethod(EnableSession = true)]
    public string GetSlaveQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetSlaveQuestion(User));
    }

    // список файлов для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetQuestionFiles(User));
    }

    // загрузка предыдущих ответов по ТТ
    [WebMethod(EnableSession = true)]
    public string GetLastAnswer(object User, object Point)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetLastAnswer(User, Point));
    }

    // список перечислимых ответов
    [WebMethod(EnableSession = true)]
    public string GetQuestionOption(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetQuestionOption(User));
    }

    // матрицы SKU для каталога
    [WebMethod(EnableSession = true)]
    public string GetArtCatalog(object User, object Point)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetArtCatalog(User, Point));
    }

    // список ссылок по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtLinks(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetArtLinks(User));
    }

    // список форматов сетей
    [WebMethod(EnableSession = true)]
    public string GetFormat(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetFormat(User));
    }

    // список дистрибьюторов (или другое поле в зависимости от клиента)
    [WebMethod(EnableSession = true)]
    public string GetDistributor(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetDistributor(User));
    }

    // список заданий
    [WebMethod(EnableSession = true)]
    public string GetTask(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetTask(User));
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetMessage(User));
    }

    // Создание нового сообщения
    [WebMethod(EnableSession = true)]
    public void SetMessage(object TaskGUID, object User, object Text, object GUID, object Borned, object IsModerate)
    {
      App2Business.SetMessage(TaskGUID, User, Text, GUID, Borned, IsModerate);
    }

    //  Список клиентов для фотоотчетов
    [WebMethod(EnableSession = true)]
    public string GetPhotoCompanyMap(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetPhotoCompanyMap(User));
    }

    // Настройки фотоаппарата для анкеты и вопроса
    [WebMethod(EnableSession = true)]
    public string GetActionQuestionSettings(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetActionQuestionSettings(User));
    }

    // список визитов для стартовой страницы в приложении отчетности
    [WebMethod(EnableSession = true)]
    public string GetDashboardVisits(object User, object Start, object Finish, object Offset)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetDashboardVisits(User, Start, Finish, Offset));
    }

    // список SKU
    [WebMethod(EnableSession = true)]
    public string GetArt(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetArt(User));
    }

    // Сохранение визита
    [WebMethod(EnableSession = true)]
    public void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object GUID, object TimeZone)
    {
      App2Business.SetVisit(Point, User, IsVisit, Date, Lat, Lon, Error, Borned, GUID, TimeZone);
    }

    // Загрузка всей необходимой информации для распознавания
    [WebMethod(EnableSession = true)]
    public string GetAI(object User)
    {
      return ShareMethods.SerializeDataJSONMany(AppBusiness.GetAI(User));
    }

    // Загрузка всей необходимой информации для распознавания v2
    [WebMethod(EnableSession = true)]
    public string GetAI2(object User)
    {
      return ShareMethods.SerializeDataJSONMany(AppBusiness.GetAI2(User));
    }

    // список анкет с периодичностью раз в неделю, для которых сегодняшний визит не последний
    [WebMethod(EnableSession = true)]
    public string GetActionPeriod(object User)
    {
      return ShareMethods.SerializeDataJSON(App2Business.GetActionPeriod(User));
    }
  }
}
