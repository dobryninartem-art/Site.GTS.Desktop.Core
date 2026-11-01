// Перенесено из source/App_Code/AppRh.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
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

namespace AppRh
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // текущая дата
    [WebMethod(EnableSession = true)]
    public string GetServerDate()
    {
      return DateTime.Now.ToString("dd.mm.yyyy");
    }

    // список сетей
    [WebMethod(EnableSession = true)]
    public string GetNetwork(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetNetwork(User));
    }

    // список ТТ
    [WebMethod(EnableSession = true)]
    public string GetPoint(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetPoint(User));
    }

    // список товарных групп SKU
    [WebMethod(EnableSession = true)]
    public string GetCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetCategory(User));
    }

    // список брендов SKU
    [WebMethod(EnableSession = true)]
    public string GetBrand(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetBrand(User));
    }

    // список SKU
    [WebMethod(EnableSession = true)]
    public string GetArt(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArt(User));
    }

    // настройки компании пользователя
    [WebMethod(EnableSession = true)]
    public string GetCompanySetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetCompanySetting(User));
    }

    // список компаний
    [WebMethod(EnableSession = true)]
    public string GetCompany(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetCompany(User));
    }

    // список компаний-контрагентов в точках
    [WebMethod(EnableSession = true)]
    public string GetCompanyPointMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetCompanyPointMap(User));
    }

    // список компаний-контрагентов в точках (версия 2)
    [WebMethod(EnableSession = true)]
    public string GetCompanyPointMapV2(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetCompanyPointMapV2(User));
    }

    // список категорий фото
    [WebMethod(EnableSession = true)]
    public string GetPhotoCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetPhotoCategory(User));
    }

    // Сохранение визита
    [WebMethod(EnableSession = true)]
    public void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object IsBorned, object GUID, object GeoTime = null)
    {
      AppBusinessRh.SetVisit(Point, User, IsVisit, Date, Lat, Lon, Error, Borned, IsBorned, GUID, GeoTime);
    }

    // Создание нового фотоотчета
    [WebMethod(EnableSession = true)]
    public void SetPhotoReport(object Point, object User, object Company, object Category, object Brand, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned)
    {
      AppBusinessRh.SetPhotoReport(Point, User, Company, Category, Brand, Description, GUID, Lat, Lon, Error, Borned, IsBorned);
    }

    // сохранение фото на сервер
    [WebMethod(EnableSession = true)]
    public void UploadPhoto(object Magic, object User, object Company, object GUID, object ImageData, object Lat, object Lon, object Error, object GeoTime, object Point = null)
    {
      try
      {
        if (ImageData.ToString().Contains("Подмена фото"))
        {
          AppBusinessRh.SetErrorWeb(User, "Error UploadPhoto, GUID: " + GUID + ", Error: " + ImageData);
        }
        else {
          if (ImageData.ToString() != "")
          {
            // --
            String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
            if (!Directory.Exists(pathToYearFolder))
              Directory.CreateDirectory(pathToYearFolder);
            String pathToMonthFolder = pathToYearFolder + @"/" + DateTime.Now.Day.ToString();
            if (!Directory.Exists(pathToMonthFolder))
              Directory.CreateDirectory(pathToMonthFolder);

            FileStream fs = new FileStream(pathToMonthFolder + @"/" + @GUID + ".jpg", FileMode.Create);
            BinaryWriter bw = new BinaryWriter(fs);

            byte[] data = Convert.FromBase64String(ImageData.ToString());

            bw.Write(data);
            bw.Close();
            //--

            string fileName = "Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @GUID + ".jpg";
            string signature = AppBusinessRh.SetPhoto(Magic, User, GUID, fileName, Lat, Lon, Error, GeoTime, Point);

            if (signature != "")
            {
              using (var image = Image.FromFile(pathToMonthFolder + @"/" + @GUID + ".jpg"))
              {
                using (var graphics = Graphics.FromImage(image))
                {
                  var textBounds = graphics.VisibleClipBounds;
                  textBounds.Inflate(-5, -5);

                  Font bigFont = new Font(SystemFonts.DefaultFont.FontFamily, 14, FontStyle.Regular);

                  var size = graphics.MeasureString(signature, bigFont);
                  var rect = new RectangleF(textBounds.X, textBounds.Y, size.Width, size.Height);
                  //Filling a rectangle before drawing the string.
                  graphics.FillRectangle(Brushes.Black, rect);

                  graphics.DrawString(
                      signature,
                      bigFont,
                      Brushes.Red,
                      textBounds
                  );
                }

                image.Save(pathToMonthFolder + @"/" + @GUID + "(1).jpg");

                image.Dispose();
              }

              // пересохранение файла
              using (var image = Image.FromFile(pathToMonthFolder + @"/" + @GUID + "(1).jpg"))
              {
                image.Save(pathToMonthFolder + @"/" + @GUID + ".jpg");

                image.Dispose();

              }

              // удаление копии
              System.IO.File.Delete(pathToMonthFolder + @"/" + @GUID + "(1).jpg");
            }
          }
          else {
            // запись ошибки о пустой фото
            AppBusinessRh.SetErrorWeb(User, "Error UploadPhoto, GUID: " + GUID + ", Error: empty ImageData");
          }
        }
      }
      catch (IOException e)
      {
        AppBusinessRh.SetErrorWeb(User, "Error UploadPhoto, GUID: " + GUID + ", Error: " + e.Message.ToString().Replace("'", ""));
      }
    }

    // сохранение аудиозаписи на сервер
    [WebMethod(EnableSession = true)]
    public void UploadSound(object Magic, object User, object Company, object GUID, object SoundData)
    {
      if (SoundData.ToString() != "")
      {
        String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/Sounds/" + Company.ToString(); //+ '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
        if (!Directory.Exists(pathToYearFolder))
          Directory.CreateDirectory(pathToYearFolder);
        String pathToMonthFolder = pathToYearFolder;// + @"/" + DateTime.Now.Day.ToString()
        if (!Directory.Exists(pathToMonthFolder))
          Directory.CreateDirectory(pathToMonthFolder);

        FileStream fs = new FileStream(pathToMonthFolder + @"/" + @GUID + ".mp3", FileMode.Create);
        BinaryWriter bw = new BinaryWriter(fs);

        byte[] data = Convert.FromBase64String(SoundData.ToString());

        bw.Write(data);
        bw.Close();

        string fileName = "Sounds/" + Company.ToString() + @"/" + @GUID + ".mp3";
      }
      else
      {
        // запись ошибки о пустой фото
        AppBusinessRh.SetErrorWeb(User, "Error UploadSound, GUID: " + GUID + ", Error: empty SoundData");
      }
    }

    // матрицы по сети по формату
    [WebMethod(EnableSession = true)]
    public string GetArtNetworkMatrix(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtNetworkMatrix(User));
    }


    // матрицы по ТТ со статусом (для Кампари)
    [WebMethod(EnableSession = true)]
    public string GetArtNetworkMatrixExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtNetworkMatrixExtended(User));
    }


    // матрицы по ТТ
    [WebMethod(EnableSession = true)]
    public string GetArtPointMatrix(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtPointMatrix(User));
    }


    // матрицы по ТТ со статусом (для Кампари)
    [WebMethod(EnableSession = true)]
    public string GetArtPointMatrixExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtPointMatrixExtended(User));
    }

    // список анкет
    [WebMethod(EnableSession = true)]
    public string GetAction(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetAction(User));
    }

    // список анкет расширенный для Кампари
    [WebMethod(EnableSession = true)]
    public string GetActionExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetActionExtended(User));
    }

    // список анкет в ТТ
    [WebMethod(EnableSession = true)]
    public string GetActionPointMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetActionPointMap(User));
    }

    // список брендов для акции
    [WebMethod(EnableSession = true)]
    public string GetActionBrandMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetActionBrandMap(User));
    }

    // список вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetQuestion(User));
    }

    // список подчиненных вопросов-ветвлений
    [WebMethod(EnableSession = true)]
    public string GetSlaveQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveQuestion(User));
    }

    // список зависимых вопросов
    [WebMethod(EnableSession = true)]
    public string GetLinkedQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetLinkedQuestion(User));
    }

    // список диапазонов ответов по числовым вопросам
    [WebMethod(EnableSession = true)]
    public string GetArtQuestionRange(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtQuestionRange(User));
    }

    // список перечислимых ответов
    [WebMethod(EnableSession = true)]
    public string GetQuestionOption(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetQuestionOption(User));
    }

    //  сохранение ответов по sku
    [WebMethod(EnableSession = true)]
    public string SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetArt(Point, User, Action, Art, Question, Option, Answer, GUID, Borned, IsBorned));
    }

    //сохранение ответов (с мастер вопросом ветвление)
    [WebMethod(EnableSession = true)]
    public string SetArt2(object Point, object User, object Action, object Art, object Master, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetArt2(Point, User, Action, Art, Master, Question, Option, Answer, GUID, Borned, IsBorned));
    }

    // Создание нового фотоотчета по промо-акции
    [WebMethod(EnableSession = true)]
    public void SetPhotoAction(object Point, object User, object Action, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned, object Brand = null)
    {
      AppBusinessRh.SetPhotoAction(Point, User, Action, Description, GUID, Lat, Lon, Error, Borned, IsBorned, Brand);
    }

    // правка комментария к фото
    [WebMethod(EnableSession = true)]
    public void SetPhotoDescription(object GUID, object Description)
    {
      AppBusinessRh.SetPhotoDescription(GUID, Description);
    }

    // список заданий
    [WebMethod(EnableSession = true)]
    public string GetTask(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetTask(User));
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetMessage(User));
    }

    // список должностей компании
    [WebMethod(EnableSession = true)]
    public string GetUserRole(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetUserRole(User));
    }

    // список сотрудников компании
    [WebMethod(EnableSession = true)]
    public string GetUser(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetUser(User));
    }

    // список закреплений сотрудников за ТТ
    [WebMethod(EnableSession = true)]
    public string GetUserPointMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetUserPointMap(User));
    }

    //  Create a new task
    [WebMethod(EnableSession = true)]
    public string SetTask(object User, object Point, object Text, object GUID, object PhotoID)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetTask(User, Point, Text, GUID, PhotoID));
    }

    // Создание нового сообщения
    [WebMethod(EnableSession = true)]
    public string SetMessage(object Task, object User, object Text, object GUID, object Borned, object IsModerate)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetMessage(Task, User, Text, GUID, Borned, IsModerate));
    }

    // отправка уведомлений о прочтении сообщений
    [WebMethod(EnableSession = true)]
    public void SetMessageRead(object User, object Point, object Task)
    {
      AppBusinessRh.SetMessageRead(User, Point, Task);
    }

    //  установка модерации по претензии
    [WebMethod(EnableSession = true)]
    public void SetTaskModerate(object Task, object User)
    {
      AppBusinessRh.SetTaskModerate(Task, User);
    }

    // Список стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandart(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetStandart(User));
    }

    // Список стандартов выкладки в привязке к ТТ
    [WebMethod(EnableSession = true)]
    public string GetStandartMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetStandartMap(User));
    }

    // Список фото стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandartFile(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetStandartFile(User));
    }

    // список тикетов для техподдержки
    [WebMethod(EnableSession = true)]
    public string GetTicket(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetTicket(User));
    }

    // список тикетов для администратора
    [WebMethod(EnableSession = true)]
    public string GetTicketAdmin(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetTicketAdmin(User));
    }

    // сохранение информации об аппарате пользователя
    [WebMethod(EnableSession = true)]
    public void SetPhoneInfo(object Phone, object Model, object Device, object Version, object AppVersion, object SendData)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      AppBusinessRh.SetPhoneInfo(phone, Model, Device, Version, AppVersion, SendData);
    }

    // сохранение трекинга пользователя
    [WebMethod(EnableSession = true)]
    public void SetTrack(object User, object Borned, object Start, object Lat, object Lon, object Error)
    {
      AppBusinessRh.SetTrack(User, Borned, Start, Lat, Lon, Error);
    }
    
    // Сохранение журнала ошибок 
    [WebMethod(EnableSession = true)]
    public string SetError(object User, object Borned, object Description)
    {
      if (User == null || string.IsNullOrWhiteSpace(User.ToString())) return "";

      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetError(User, Borned, Description));
    }

    // Замена (удаление) фото
    [WebMethod(EnableSession = true)]
    public string ReplacePhoto(object User, object GUID, object Magic)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.ReplacePhoto(User, GUID, Magic));
    }

    // Список фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTask(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetFocusTask(User));
    }

    // маршрут фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskTail(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetFocusTaskTail(User));
    }

    // файлы фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetFocusTaskFiles(User));
    }

    // SKU фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskArt(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetFocusTaskArt(User));
    }

    // уведомление о прочтении фокусной задачи
    [WebMethod(EnableSession = true)]
    public void SetFocusTaskRead(object Task, object User, object Point)
    {
      AppBusinessRh.SetFocusTaskRead(Task, User, Point);
    }

    // Создание нового сообщения по фокусной задаче
    [WebMethod(EnableSession = true)]
    public string SetMessageFocus(object Task, object GUID, object User, object Point, object Text, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetMessageFocus(Task, GUID, User, Point, Text, Borned, IsBorned));
    }

    // загрузка предыдущих ответов по ТТ
    [WebMethod(EnableSession = true)]
    public string GetLastAnswer(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetLastAnswer(User));
    }

    // список категорий задач
    [WebMethod(EnableSession = true)]
    public string GetTaskCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetTaskCategory(User));
    }

    // сохранение виртуальной даты визита
    [WebMethod(EnableSession = true)]
    public void SetVisitDate(object Point, object User, object Borned, object Date)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      if (Date.ToString() == "") return;

      AppBusinessRh.SetVisitDate(Point, User, Borned, Date);
    }

    // список фото по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtPhotos(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtPhotos(User));
    }

    // список ссылок по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtLinks(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetArtLinks(User));
    }

    // список атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttribute(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetPointAttribute(User));
    }

    // список значений атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttributeValue(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetPointAttributeValue(User));
    }

    // список подчиненных
    [WebMethod(EnableSession = true)]
    public string GetSlave(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlave(User));
    }

    // список посещенных ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisit(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveVisit(User));
    }

    // список созданных фото в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlavePhoto(object Client, object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlavePhoto(Client, Point, User, Borned));
    }

    // список созданных фото в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlavePhoto2(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlavePhoto2(Point, User, Borned));
    }

    // список ответов на анкеты в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlaveArtsAnswers2(object Client, object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveArtsAnswers2(Client, Point, User, Borned));
    }

    // список ответов на анкеты в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlaveArtsAnswers(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveArtsAnswers(Point, User, Borned));
    }

    //  All answers for the visit (photos and arts)
    [WebMethod(EnableSession = true)]
    public string GetSlaveAnswers(object Client, object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveAnswers(Client, Point, User, Borned));
    }

    // список визитов по ТТ за выбранные даты
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisitsOnDate(object Point, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveVisitsOnDate(Point, Start, Finish));
    }

    // list of visits by store for selected dates v2
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisitsOnDate2(object Client, object Point, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSlaveVisitsOnDate2(Client, Point, Start, Finish));
    }

    // список остатков по Магниту
    [WebMethod(EnableSession = true)]
    public string GetMagnit(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetMagnit(User));
    }

    // сохранение информации об устройстве для каждого визита
    [WebMethod(EnableSession = true)]
    public void SetVisitDevice(object User, object GUID, object Model = null, object Version = null)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      if (GUID.ToString() == "") return;

      AppBusinessRh.SetVisitDevice(User, GUID, Model, Version);
    }

    // список фото для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionPhotoMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetQuestionPhotoMap(User));
    }

    // список уникальных фото-файлов для вопросов (для полной синхронизации)
    [WebMethod(EnableSession = true)]
    public string GetQuestionPhotos(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetQuestionPhotos(User));
    }

    // список маршрутов на неделю
    [WebMethod(EnableSession = true)]
    public string GetWeekRoutes(object User, object KeyAPI)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetWeekRoutes(User, KeyAPI));
    }

    // список маршрутов руководителя
    [WebMethod(EnableSession = true)]
    public string GetNodes(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetNodes(User));
    }

    // установить новую дату для маршрута
    [WebMethod(EnableSession = true)]
    public string SetRouteChanges(object NodeID, object PointID, object CompanyID, object UserID, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetRouteChanges(NodeID, PointID, CompanyID, UserID, Day1, Day2, Day3, Day4, Day5, Day6, Day7));
    }

    // список файлов для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetQuestionFiles(User));
    }

    // получение списка файлов закрепленных за анкетой
    [WebMethod(EnableSession = true)]
    public string GetActionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetActionFiles(User));
    }

    // список визитов для стартовой страницы в приложении отчетности
    [WebMethod(EnableSession = true)]
    public string GetDashboardVisits(object user, object period)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetDashboardVisits(user, period));
    }

    // получение данных по выбранному визиту
    [WebMethod(EnableSession = true)]
    public string GetVisitData(object point, object user, object borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetVisitData(point, user, borned));
    }

    // получение данных по выбранному визиту
    [WebMethod(EnableSession = true)]
    public string GetVisitData2(object client, object point, object user, object borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetVisitData2(client, point, user, borned));
    }

    // поиск по ТТ и пользователям
    [WebMethod(EnableSession = true)]
    public string SearchData(object user, object search)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.SearchData(user, search));
    }

    // список нужных заданий
    [WebMethod(EnableSession = true)]
    public string GetTasksList(object user, object taskStatus)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetTasksList(user, taskStatus));
    }

    // список визитов
    [WebMethod(EnableSession = true)]
    public string GetVisitsList(object user, object typeID, object id)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetVisitsList(user, typeID, id));
    }

    // список сообщений 
    [WebMethod(EnableSession = true)]
    public string GetMessagesList(object user, object taskID)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetMessagesList(user, taskID));
    }

    //список вариантов для закрытие визита без заполнения обязательной отчетность
    [WebMethod(EnableSession = true)]
    public string GetOptionsVisitFinish(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetOptionsVisitFinish(User));
    }

    //закрытие визита без заполнения обязательной отчетность
    [WebMethod(EnableSession = true)]
    public void SetVisitFinish(object Point, object User, object Borned, object FinishID, object GUID)
    {
      AppBusinessRh.SetVisitFinish(Point, User, Borned, FinishID, GUID);
    }

    // список SKU для промо
    [WebMethod(EnableSession = true)]
    public string GetActionMatrix(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetActionMatrix(User));
    }

    // получение настроек с сервера
    [WebMethod(EnableSession = true)]
    public string GetSetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusinessRh.GetSetting(User));
    }

    [WebMethod(EnableSession = true)]
    public string UserExist(object Phone)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      return ShareMethods.SerializeDataJSON(AppBusinessRh.UserExist(phone));
    }

    [WebMethod(EnableSession = true)]
    public string Logon(object Phone, object Pass)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""), pass = Pass.ToString().Trim();

      DataTable data = AppBusinessRh.Logon(phone, pass);

      // определение названия базы
      foreach (DataRow dr in data.Rows)
      {
        StoredProc.BaseName = "REPHOUSE";
        foreach (DataColumn col in data.Columns)
        {
          if (col.ColumnName.ToString() == "BaseName")
          {
            StoredProc.BaseName = dr[col].ToString();

            break;
          }
        }
      }
      return ShareMethods.SerializeDataJSON(data);
    }

    [WebMethod(EnableSession = true)]
    public string SetUserPass(object Phone, object Pass)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", ""), pass = Pass.ToString().Trim();

      return ShareMethods.SerializeDataJSON(AppBusinessRh.SetUserPass(phone, pass));
    }

    [WebMethod(EnableSession = true)]
    public string Test()
    {
      return "Test OK";
    }

    [WebMethod(EnableSession = true)]
    public string Test2(string Data)
    {
      return Data.ToString();
    }

  }
}
