using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace App
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
      return ShareMethods.SerializeDataJSON(AppBusiness.GetNetwork(User));
    }

    // список ТТ
    [WebMethod(EnableSession = true)]
    public string GetPoint(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetPoint(User));
    }

    // список товарных групп SKU
    [WebMethod(EnableSession = true)]
    public string GetCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetCategory(User));
    }

    // список брендов SKU
    [WebMethod(EnableSession = true)]
    public string GetBrand(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetBrand(User));
    }

    // список SKU
    [WebMethod(EnableSession = true)]
    public string GetArt(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArt(User));
    }

    // настройки компании пользователя
    [WebMethod(EnableSession = true)]
    public string GetCompanySetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetCompanySetting(User));
    }

    // список компаний
    [WebMethod(EnableSession = true)]
    public string GetCompany(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetCompany(User));
    }

    // список компаний-контрагентов в точках
    [WebMethod(EnableSession = true)]
    public string GetCompanyPointMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetCompanyPointMap(User));
    }

    // список компаний-контрагентов в точках версия 2
    // добавлены дополнительные поля для корректной работы агенств
    [WebMethod(EnableSession = true)]
    public string GetCompanyPointMapV2(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetCompanyPointMapV2(User));
    }

    // список категорий фото
    [WebMethod(EnableSession = true)]
    public string GetPhotoCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetPhotoCategory(User));
    }

    // Сохранение визита
    [WebMethod(EnableSession = true)]
    public void SetVisit(object Point, object User, object IsVisit, object Date, object Lat, object Lon, object Error, object Borned, object IsBorned, object GUID, object GeoTime = null)
    {
      AppBusiness.SetVisit(Point, User, IsVisit, Date, Lat, Lon, Error, Borned, IsBorned, GUID, GeoTime);
    }

    // Создание нового фотоотчета
    [WebMethod(EnableSession = true)]
    public void SetPhotoReport(object Point, object User, object Company, object Category, object Brand, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned)
    {
      AppBusiness.SetPhotoReport(Point, User, Company, Category, Brand, Description, GUID, Lat, Lon, Error, Borned, IsBorned);
    }

    //  Метод для сохранения фото на сервер
    private void UploadPhotoInternal(string methodName, object Magic, object User, object Company, object GUID, object ImageData, object Lat, object Lon, object Error, object GeoTime, object Point)
    {
      //  Получение параметров фото 
      string guid = GUID != null ? GUID.ToString() : "";
      string user = User != null ? User.ToString() : "";
      string imageData = ImageData != null ? ImageData.ToString() : "";
      string company = Company != null ? Company.ToString() : "";

      try
      {
        //  Проверка на подмену фото — логирование и выход
        if (imageData.Contains("Подмена фото"))
        {
          AppBusiness.SetErrorWeb(user, "Error " + methodName + ", GUID: " + guid + ", Error: " + imageData);
          return;
        }

        //  Проверка на пустое фото — логирование и выход
        if (string.IsNullOrEmpty(imageData))
        {
          AppBusiness.SetErrorWeb(user, "Error " + methodName + ", GUID: " + guid + ", Error: empty ImageData");
          return;
        }

        //  Получение времени чтобы папка и путь в БД совпадали
        DateTime now = DateTime.Now;

        //  Формирование пути к папке и создание если не существует
        string folder = BuildFolderPath(company, now);
        Directory.CreateDirectory(folder);

        //  Полный путь к файлу на диске и относительный путь для БД
        string fileName = BuildRelativePath(company, guid, now);
        string filePath = Path.Combine(folder, guid + ".jpg");

        //  Декодирование base64 и сохранение файла на диск
        byte[] data = Convert.FromBase64String(imageData);

        //  Атомарное создание файла — выбрасывает IOException, если файл с таким GUID уже существует
        try
        {
          using (var fs = new FileStream(filePath, FileMode.CreateNew, FileAccess.Write))
          {
            fs.Write(data, 0, data.Length);
          }
        }
        catch (IOException)
        {
          if (File.Exists(filePath))
          {
            AppBusiness.SetErrorWeb(user, "Duplicate " + methodName + ", GUID: " + guid + ", Error: file already exists");
            return;
          }
          //  Если файл не создался по другой причине — обрабатывать дальше
          throw; 
        }

        //  Запись информации о фото в БД, получение текста подписи
        string signature = AppBusiness.SetPhoto(Magic, user, guid, fileName, Lat, Lon, Error, GeoTime, Point);

        //  Если подпись есть — добавление текста поверх фото
        if (!string.IsNullOrEmpty(signature))
        {
          string drawError = SavePhotoWithSignature(filePath, signature, methodName);
          if (drawError != null)
            AppBusiness.SetErrorWeb(user, "Error DrawSignature in " + methodName + ", GUID: " + guid + ", Error: " + drawError);
        }

      }
      catch (Exception e)
      {
        //  Логирование ошибки и возврат клиенту JSON с описанием
        AppBusiness.SetErrorWeb(user, "Error " + methodName + ", GUID: " + guid + ", Error: " + e.Message);

        RespondWithError(methodName, e.Message, guid);
      }
    }

    //  Сохранение фото на сервер (обычный метод)
    [WebMethod(EnableSession = true)]
    public void UploadPhoto(object Magic, object User, object Company, object GUID, object ImageData, object Lat, object Lon, object Error, object GeoTime, object Point = null)
    {
      UploadPhotoInternal("UploadPhoto", Magic, User, Company, GUID, ImageData, Lat, Lon, Error, GeoTime, Point);
    }

    //  Сохранение фото на сервер (дублирующий метод)
    [WebMethod(EnableSession = true)]
    public void UploadPhotoBase64(object Magic, object User, object Company, object GUID, object ImageData, object Lat, object Lon, object Error, object GeoTime, object Point = null)
    {
      UploadPhotoInternal("UploadPhotoBase64", Magic, User, Company, GUID, ImageData, Lat, Lon, Error, GeoTime, Point);
    }

    //  Абсолютный путь к папке на диске для хранения фото
    private string BuildFolderPath(string company, DateTime now)
    {
      return Path.Combine(HttpContext.Current.Server.MapPath("/"), "Photos", company, now.Year + "_" + now.Month, now.Day.ToString());
    }

    //  Относительный путь для записи в БД
    private string BuildRelativePath(string company, string guid, DateTime now)
    {
      return "Photos/" + company + "/" + now.Year + "_" + now.Month + "/" + now.Day + "/" + guid + ".jpg";
    }

    //  Возврат клиенту JSON с описанием ошибки и кодом 500
    private void RespondWithError(string methodName, string message, string guid)
    {
      var response = HttpContext.Current.Response;
      response.Clear();
      response.StatusCode = 500;
      response.ContentType = "application/json";
      string safeMessage = message.Replace("\"", "\\\"");
      string json = "{\"error\":\"" + safeMessage + "\",\"guid\":\"" + guid + "\",\"method\":\""+ methodName + "\"}";
      response.Write(json);
      response.End();
    }

    //  Добавление текста подписи поверх фото
    private string SavePhotoWithSignature(string filePath, string signature, string methodName)
    {
      try
      {
        byte[] imageBytes;

        using (var image = Image.FromFile(filePath))
        using (var graphics = Graphics.FromImage(image))
        {
          //  Область для текста с отступом 5px от краёв
          var textBounds = graphics.VisibleClipBounds;
          textBounds.Inflate(-5, -5);

          //  Определение размера текста чтобы задать фон
          var font = new Font(SystemFonts.DefaultFont.FontFamily, 15, FontStyle.Regular);
          var size = graphics.MeasureString(signature, font, (int)textBounds.Width);
          var rect = new RectangleF(textBounds.X, textBounds.Y, textBounds.Width, size.Height);

          //  Добавление чёрного фона под текст
          graphics.FillRectangle(Brushes.Black, rect);

          //  Выбор цвета текста в зависимости от метода загрузки
          Brush textBrush = methodName == "UploadPhotoBase64" ? Brushes.White : Brushes.Yellow;

          //  Рисование текста выбранным цветом в области textBounds (с отступами)
          graphics.DrawString(signature, font, textBrush, textBounds);

          //  Кодировщик JPEG с качеством 74
          var jpegEncoder = ImageCodecInfo.GetImageEncoders()
              .First(c => c.FormatID == ImageFormat.Jpeg.Guid);
          var encoderParams = new EncoderParameters(1);
          encoderParams.Param[0] = new EncoderParameter(Encoder.Quality, 74L);

          //  Сохранение изображения в память
          using (var ms = new MemoryStream())
          {
            image.Save(ms, jpegEncoder, encoderParams);
            imageBytes = ms.ToArray();
          }
        }

        //  Перезапись файл на диск
        File.WriteAllBytes(filePath, imageBytes);
        return null;
      }
      catch (Exception e)
      {
        return e.Message;
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
        AppBusiness.SetErrorWeb(User, "Error UploadSound, GUID: " + GUID + ", Error: empty SoundData");
      }
    }

    // матрицы по сети по формату
    [WebMethod(EnableSession = true)]
    public string GetArtNetworkMatrix(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtNetworkMatrix(User));
        }

     // матрицы по сети по формату версия 2
     // новый метод получения матриц 
     // передается поле State а также параметры значение клиента и исполнителя для матриц по формату
     [WebMethod(EnableSession = true)]
     public string GetArtNetworkMatrixV2(object User)
     {
        return ShareMethods.SerializeDataJSON(AppBusiness.GetArtNetworkMatrixV2(User));
     }


    // матрицы по ТТ со статусом (для Кампари)
    [WebMethod(EnableSession = true)]
    public string GetArtNetworkMatrixExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtNetworkMatrixExtended(User));
    }


    // матрицы по ТТ
    [WebMethod(EnableSession = true)]
    public string GetArtPointMatrix(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtPointMatrix(User));
    }


    // матрицы по ТТ со статусом (для Кампари)
    [WebMethod(EnableSession = true)]
    public string GetArtPointMatrixExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtPointMatrixExtended(User));
    }

    // список анкет
    [WebMethod(EnableSession = true)]
    public string GetAction(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAction(User));
    }

    // список анкет расширенный для Кампари
    [WebMethod(EnableSession = true)]
    public string GetActionExtended(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetActionExtended(User));
    }

    // список анкет в ТТ
    [WebMethod(EnableSession = true)]
    public string GetActionPointMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(AppBusiness.GetActionPointMap(User));
    }

    // список брендов для акции
    [WebMethod(EnableSession = true)]
    public string GetActionBrandMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(AppBusiness.GetActionBrandMap(User));
    }

    // список вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetQuestion(User));
    }

    // список подчиненных вопросов-ветвлений
    [WebMethod(EnableSession = true)]
    public string GetSlaveQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveQuestion(User));
    }

    // список зависимых вопросов
    [WebMethod(EnableSession = true)]
    public string GetLinkedQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetLinkedQuestion(User));
    }

    // список диапазонов ответов по числовым вопросам
    [WebMethod(EnableSession = true)]
    public string GetArtQuestionRange(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtQuestionRange(User));
    }

    // список перечислимых ответов
    [WebMethod(EnableSession = true)]
    public string GetQuestionOption(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetQuestionOption(User));
    }

    //  сохранение ответов по sku
    [WebMethod(EnableSession = true)]
    public string SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SetArt(Point, User, Action, Art, Question, Option, Answer, GUID, Borned, IsBorned));
    }

    //сохранение ответов (с мастер вопросом ветвления)
    [WebMethod(EnableSession = true)]
    public void SetArt2(object Point, object User, object Action, object Art, object Master, object Question, object Option, object Answer, object GUID, object Borned, object IsBorned)
    {
      AppBusiness.SetArt2(Point, User, Action, Art, Master, Question, Option, Answer, GUID, Borned, IsBorned);
    }

    // удаление предыдущих ответов по мультиселект, применяется до вставки новых ответов
    [WebMethod(EnableSession = true)]
    public void DeleteMultiAnswer(object Point, object User, object Action, object Art, object Master, object Question, object Borned)
    {
      AppBusiness.DeleteMultiAnswer(Point, User, Action, Art, Master, Question, Borned);
    }

    // удаление фото
    [WebMethod(EnableSession = true)]
    public void DeletePhotoVisit(object User, object Photo)
    {
      AppBusiness.DeletePhotoVisit(User, Photo);
    }

    // Создание нового фотоотчета по промо-акции
    [WebMethod(EnableSession = true)]
    public void SetPhotoAction(object Point, object User, object Action, object Description, object GUID, object Lat, object Lon, object Error, object Borned, object IsBorned, object Brand = null)
    {
      AppBusiness.SetPhotoAction(Point, User, Action, Description, GUID, Lat, Lon, Error, Borned, IsBorned, Brand);
    }

    // правка комментария к фото
    [WebMethod(EnableSession = true)]
    public void SetPhotoDescription(object GUID, object Description)
    {
      AppBusiness.SetPhotoDescription(GUID, Description);
    }

    // список заданий
    [WebMethod(EnableSession = true)]
    public string GetTask(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetTask(User));
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetMessage(User));
    }

    // список должностей компании
    [WebMethod(EnableSession = true)]
    public string GetUserRole(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetUserRole(User));
    }

    // список сотрудников компании
    [WebMethod(EnableSession = true)]
    public string GetUser(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetUser(User));
    }

    // список закреплений сотрудников за ТТ
    [WebMethod(EnableSession = true)]
    public string GetUserPointMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetUserPointMap(User));
    }

    // Создание нового задания
    [WebMethod(EnableSession = true)]
    public string SetTask(object User, object Point, object Acceptor, object Text, object Category, object GUID, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SetTask(User, Point, Acceptor, Text, Category, GUID, Borned, IsBorned));
    }

    // Создание нового сообщения
    [WebMethod(EnableSession = true)]
    public string SetMessage(object Task, object User, object Text, object GUID, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SetMessage(Task, User, Text, GUID, Borned, IsBorned));
    }

    // отправка уведомлений о прочтении сообщений
    [WebMethod(EnableSession = true)]
    public void SetMessageRead(object User, object Point, object Task)
    {
      AppBusiness.SetMessageRead(User, Point, Task);
    }

    // Список стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandart(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetStandart(User));
    }

    // Список стандартов выкладки в привязке к ТТ
    [WebMethod(EnableSession = true)]
    public string GetStandartMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetStandartMap(User));
    }

    // Список фото стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandartFile(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetStandartFile(User));
    }

    // список тикетов для техподдержки
    [WebMethod(EnableSession = true)]
    public string GetTicket(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetTicket(User));
    }

    // список тикетов для администратора
    [WebMethod(EnableSession = true)]
    public string GetTicketAdmin(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetTicketAdmin(User));
    }

    // сохранение информации об аппарате пользователя(можно удалить метод после 07.2025)
    [WebMethod(EnableSession = true)]
    public void SetPhoneInfo(object Phone, object Model, object Device, object Version, object AppVersion, object SendData)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      AppBusiness.SetPhoneInfo(phone, Model, Device, Version, AppVersion, SendData);
    }

    // сохранение информации об аппарате пользователя
    [WebMethod(EnableSession = true)]
    public void SetPhoneInfo2(object Phone, object Model, object Device, object DeviceID, object Version, object AppVersion, object SendData)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      AppBusiness.SetPhoneInfo2(phone, Model, Device, DeviceID, Version, AppVersion, SendData);
    }

    // сохранение трекинга пользователя
    [WebMethod(EnableSession = true)]
    public void SetTrack(object User, object Borned, object Start, object Lat, object Lon, object Error)
    {
      AppBusiness.SetTrack(User, Borned, Start, Lat, Lon, Error);
    }
    
    // Сохранение журнала ошибок 
    [WebMethod(EnableSession = true)]
    public string SetError(object User, object Borned, object Description)
    {
      if (User == null || string.IsNullOrWhiteSpace(User.ToString())) return "";

      return ShareMethods.SerializeDataJSON(AppBusiness.SetError(User, Borned, Description));
    }

    // Замена (удаление) фото
    [WebMethod(EnableSession = true)]
    public string ReplacePhoto(object User, object GUID, object Magic)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.ReplacePhoto(User, GUID, Magic));
    }

    // Список фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTask(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetFocusTask(User));
    }

    // маршрут фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskTail(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetFocusTaskTail(User));
    }

    // файлы фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetFocusTaskFiles(User));
    }

    // SKU фокусных задач
    [WebMethod(EnableSession = true)]
    public string GetFocusTaskArt(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetFocusTaskArt(User));
    }

    // уведомление о прочтении фокусной задачи
    [WebMethod(EnableSession = true)]
    public void SetFocusTaskRead(object Task, object User, object Point)
    {
      AppBusiness.SetFocusTaskRead(Task, User, Point);
    }

    // Создание нового сообщения по фокусной задаче
    [WebMethod(EnableSession = true)]
    public string SetMessageFocus(object Task, object GUID, object User, object Point, object Text, object Borned, object IsBorned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SetMessageFocus(Task, GUID, User, Point, Text, Borned, IsBorned));
    }

    // загрузка предыдущих ответов по ТТ
    [WebMethod(EnableSession = true)]
    public string GetLastAnswer(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetLastAnswer(User));
    }

    // список категорий задач
    [WebMethod(EnableSession = true)]
    public string GetTaskCategory(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetTaskCategory(User));
    }

    // сохранение виртуальной даты визита
    [WebMethod(EnableSession = true)]
    public void SetVisitDate(object Point, object User, object Borned, object Date)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      if (Date.ToString() == "") return;

      AppBusiness.SetVisitDate(Point, User, Borned, Date);
    }

    // список фото по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtPhotos(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtPhotos(User));
    }

    // список ссылок по SKU
    [WebMethod(EnableSession = true)]
    public string GetArtLinks(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetArtLinks(User));
    }

    // список атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttribute(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetPointAttribute(User));
    }

    // список значений атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetPointAttributeValue(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetPointAttributeValue(User));
    }

    // системный список значений атрибутов ТТ компании
    [WebMethod(EnableSession = true)]
    public string GetSystemPointAttribute(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSystemPointAttribute(User));
    }

    // список подчиненных
    [WebMethod(EnableSession = true)]
    public string GetSlave(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlave(User));
    }

    // список посещенных ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisit(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveVisit(User));
    }

    // список созданных фото в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlavePhoto(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlavePhoto(Point, User, Borned));
    }

    // список созданных фото в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlavePhoto2(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlavePhoto2(Point, User, Borned));
    }

    // список ответов на анкеты в ТТ пользователем за сегодня
    [WebMethod(EnableSession = true)]
    public string GetSlaveArtsAnswers(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveArtsAnswers(Point, User, Borned));
    }

    //  All answers for the visit (photos and arts)
    [WebMethod(EnableSession = true)]
    public string GetSlaveAnswers(object Client, object Point, object User, object Borned)
    {
        return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveAnswers(Client, Point, User, Borned));
    }

    // список визитов по ТТ за выбранные даты
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisitsOnDate(object Point, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveVisitsOnDate(Point, Start, Finish));
    }

    // список визитов по ТТ за выбранные даты (вторая версия)
    [WebMethod(EnableSession = true)]
    public string GetSlaveVisitsOnDate2(object Client, object Point, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetSlaveVisitsOnDate2(Client, Point, Start, Finish));
    }

    // список остатков по Магниту
    [WebMethod(EnableSession = true)]
    public string GetMagnit(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetMagnit(User));
    }

    // сохранение информации об устройстве для каждого визита(можно удалить метод и процедуры у клиентов после 07.2025)
    [WebMethod(EnableSession = true)]
    public void SetVisitDevice(object User, object GUID, object Model = null, object Version = null)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      if (GUID.ToString() == "") return;

      AppBusiness.SetVisitDevice(User, GUID, Model, Version);
    }

    // сохранение информации об устройстве для каждого визита
    [WebMethod(EnableSession = true)]
    public void SetVisitDevice2(object User, object GUID, object Model = null, object DeviceID = null, object Version = null)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;
      if (GUID.ToString() == "") return;

      AppBusiness.SetVisitDevice2(User, GUID, Model, DeviceID, Version);
    }

    // список визитов для стартовой страницы в приложении отчетности
    [WebMethod(EnableSession = true)]
    public string GetDashboardVisits(object User, object Period)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetDashboardVisits(User, Period));
    }

    // получение данных по выбранному визиту
    [WebMethod(EnableSession = true)]
    public string GetVisitData(object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetVisitData(Point, User, Borned));
    }

    // получение списка отчетов
    [WebMethod(EnableSession = true)]
    public string GetReportList(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetReportList(User));
    }

    // поиск по ТТ и пользователям
    [WebMethod(EnableSession = true)]
    public string SearchData(object User, object Search)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SearchData(User, Search));
    }

    // показ списка визитов по выбранному пользователю/ТТ
    [WebMethod(EnableSession = true)]
    public string GetVisitsList(object User, object TypeID, object ID)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetVisitsList(User, TypeID, ID));
    }

    // получение списка файлов закрепленных за анкетой
    [WebMethod(EnableSession = true)]
    public string GetActionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetActionFiles(User));
    }

    // получение списка задач
    [WebMethod(EnableSession = true)]
    public string GetTasksList(object User, object PointID, object TaskStatus)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetTasksList(User, PointID, TaskStatus));
    }

    // получение списка сообщений по задаче
    [WebMethod(EnableSession = true)]
    public string GetMessagesList(object User, object TaskID)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetMessagesList(User, TaskID));
    }

    // список фото для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionPhotoMap(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetQuestionPhotoMap(User));
    }

    // список уникальных фото-файлов для вопросов (для полной синхронизации)
    [WebMethod(EnableSession = true)]
    public string GetQuestionPhotos(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetQuestionPhotos(User));
    }

    // список маршрутов на неделю
    [WebMethod(EnableSession = true)]
    public string GetWeekRoutes(object User, object KeyAPI)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetWeekRoutes(User, KeyAPI));
    }

    // список файлов для вопросов
    [WebMethod(EnableSession = true)]
    public string GetQuestionFiles(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetQuestionFiles(User));
    }

    // Create point on mobile app
    [WebMethod(EnableSession = true)]
    public string CreatePoint(object Point, object UserID, object Key, object Magic, object Company, object OfficeName, object CityName, object NetworkName, object Name, 
                           object Address, object FormatName, object Lat, object Lon, object OutCode,  object Filter = null, object IsGeo = null, 
                           object Extra1 = null, object Extra2 = null, object Extra3 = null, object Extra4 = null)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.CreatePoint(Point, UserID, Key, Magic, Company, OfficeName, CityName, NetworkName, Name, 
                  Address, FormatName, Lat, Lon, OutCode, Filter, IsGeo, Extra1, Extra2, Extra3, Extra4));
    }

    // Set point for user
    [WebMethod(EnableSession = true)]
    public void SetUserPointMap(object User, object Point, object Status, object Author, object Key, object Magic	)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      AppBusiness.SetUserPointMap(User, Point, Status, Author, Key, Magic);
    }

    // Send task from Photo
    [WebMethod(EnableSession = true)]
    public string SendTask(object user, object point, object text, object guID, object photoID)
    {
      AppBusiness.SendTask(user, point, text, guID, photoID);
      return "";
    }

    // список форматов сетей
    [WebMethod(EnableSession = true)]
    public string GetFormat(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetFormat(User));
    }

    // список дистрибьюторов (или другое поле в зависимости от клиента)
    [WebMethod(EnableSession = true)]
    public string GetDistributor(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetDistributor(User));
    }

    //  список ответов по визиту 
    [WebMethod(EnableSession = true)]
    public string GetVisitAnswers(object Client, object Point, object User, object Borned)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetVisitAnswers(Client, Point, User, Borned));
    }

    //список вариантов для закрытие визита без заполнения обязательной отчетность
    [WebMethod(EnableSession = true)]
    public string GetOptionsVisitFinish(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetOptionsVisitFinish(User));
    }

    //закрытие визита без заполнения обязательной отчетность
    [WebMethod(EnableSession = true)]
    public void SetVisitFinish(object Point, object User, object Borned, object FinishID, object GUID)
    {
      AppBusiness.SetVisitFinish(Point, User, Borned, FinishID, GUID);
    }

    // ---- Распознавание

    // загрузка моделей распознавания
    [WebMethod(EnableSession = true)]
    public string GetAIModels(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAIModels(User));
    }

    // загрузка анкет для распознавания
    [WebMethod(EnableSession = true)]
    public string GetAIActions(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAIActions(User));
    }

    // загрузка списка моделей для анкеты
    [WebMethod(EnableSession = true)]
    public string GetAIActionModelMaps(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAIActionModelMaps(User));
    }

    // Загрузка категорий SKU для распознавания
    [WebMethod(EnableSession = true)]
    public string GetAICategories(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAICategories(User));
    }

    // Загрузка SKU для распознавания
    [WebMethod(EnableSession = true)]
    public string GetAIArts(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAIArts(User));
    }
    
    //  сохранение ответов по распознаванию
    [WebMethod(EnableSession = true)]
    public void SetAIResult(object Company, object Point, object User, object Borned, object Action, object Category, object Art, object FileName, object Name, object x, object y, object x2, object y2, object Score, object ShelfNum, object HorizontNum)
    {
      String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
      String pathToMonthFolder = pathToYearFolder + @"/" + DateTime.Now.Day.ToString();

      string fileName = "AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @FileName + ".jpg";

      AppBusiness.SetAIResult(Company, Point, User, Borned, Action, Category, Art, FileName, Name, x, y, x2, y2, Score, ShelfNum, HorizontNum, fileName);      
    }

    //  сохранение ответов по распознаванию
    [WebMethod(EnableSession = true)]
    public void SetAIResult2(object Company, object GUID, object Array)
    {
      try
      {
        // Если пришёл объект/словарь — превращаем в JSON-строку.// Если уже строка — оставляем как есть.
        string arrayJson;
        if (Array == null)
        {
          arrayJson = null;
        }
        else if (Array is string)
        {
          arrayJson = (string)Array;
        }
        else
        {
          arrayJson = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(Array);
        }

        var command = new SqlCommand("[AI.GTS].APP.SetResult2");
        command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
        command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
        command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = (object)arrayJson ?? DBNull.Value;
        StoredProc.ExecuteSilent(command);
      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error SetAIResult2, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"SetAIResult2\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    //  сохранение ответов по распознаванию
    [WebMethod(EnableSession = true)]
    public void SetAIBoxes(object Company, object GUID, object Array)
    {
      try
      {
        // Если пришёл объект/словарь — превращаем в JSON-строку.// Если уже строка — оставляем как есть.
        string arrayJson;
        if (Array == null)
        {
          arrayJson = null;
        }
        else if (Array is string)
        {
          arrayJson = (string)Array;
        }
        else
        {
          arrayJson = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(Array);
        }

        var command = new SqlCommand("[AI.GTS].APP.SetBox");
        command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
        command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
        command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = (object)arrayJson ?? DBNull.Value;
        StoredProc.ExecuteSilent(command);
      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error SetAIBoxes, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"SetAIBoxes\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    //  сохранение ответов по распознаванию с новыми полями AreaID, BoxNum, ShelfNum
    [WebMethod(EnableSession = true)]
    public void SetAIBoxes2(object Company, object GUID, object Array)
    {
      try
      {
        // Если пришёл объект/словарь — превращаем в JSON-строку.// Если уже строка — оставляем как есть.
        string arrayJson;
        if (Array == null)
        {
          arrayJson = null;
        }
        else if (Array is string)
        {
          arrayJson = (string)Array;
        }
        else
        {
          arrayJson = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(Array);
        }

        var command = new SqlCommand("[AI.GTS].APP.SetBox2");
        command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
        command.Parameters.Add("@GUID", SqlDbType.VarChar, 255).Value = GUID;
        command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = (object)arrayJson ?? DBNull.Value;
        StoredProc.ExecuteSilent(command);
      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error SetAIBoxes2, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"SetAIBoxes2\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    //  сохранение всех ответов по анкетам распознавания (альтернативный вариант)
    [WebMethod(EnableSession = true)]
    public void UploadArtReportJson(object Company, object Point, object Borned, object User, object Array, object ArrayImages)
    {
      // ── Парсим дату из object (приходит строкой "dd.MM.yyyy" от Android-клиента) ──
      DateTime targetDate;
      if (Borned is DateTime)
      {
        targetDate = (DateTime)Borned;
      }
      else
      {
        string bornedStr = Borned == null ? "" : Borned.ToString();
        string[] formats = new string[] { "dd.MM.yyyy", "yyyy-MM-dd", "MM/dd/yyyy" };
        if (!DateTime.TryParseExact(
                bornedStr,
                formats,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None,
                out targetDate))
        {
          throw new ArgumentException( "Borned has unexpected format: '" + bornedStr + "'");
        }
      }

      string yearStr = targetDate.Year.ToString();
      string monthStr = targetDate.Month.ToString();
      string dayStr = targetDate.Day.ToString();

      string basePhotosPath = HttpContext.Current.Server.MapPath("~/Photos/");
      string pathToYearFolder = Path.Combine(basePhotosPath, Company.ToString(), yearStr + "_" + monthStr);
      if (!Directory.Exists(pathToYearFolder))
      {
        Directory.CreateDirectory(pathToYearFolder);
      }
      string pathToMonthFolder = Path.Combine(pathToYearFolder, dayStr);
      if (!Directory.Exists(pathToMonthFolder))
      {
        Directory.CreateDirectory(pathToMonthFolder);
      }

      try
      {
        string arrayJson;
        if (Array == null)
        {
          arrayJson = null;
        }
        else if (Array is string)
        {
          arrayJson = (string)Array;
        }
        else
        {
          arrayJson = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(Array);
        }

        string path = "Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString();

        string BaseName = SystemBusiness.GetBase(User);

        if (BaseName == "") return;

        var command = new SqlCommand("[" + BaseName + "].APP.SetArtReportJson");
        command.Parameters.Add("@Point", SqlDbType.Int).Value = Point;
        command.Parameters.Add("@Borned", SqlDbType.Date).Value = Borned;
        command.Parameters.Add("@User", SqlDbType.Int).Value = User;
        command.Parameters.Add("@Company", SqlDbType.Int).Value = Company;
        command.Parameters.Add("@Path", SqlDbType.VarChar, 255).Value = path;
        command.Parameters.Add("@Array", SqlDbType.NVarChar, -1).Value = (object)arrayJson ?? DBNull.Value;
        StoredProc.ExecuteSilent(command);

        // ── ArrayImages: тоже object, безопасно превращаем в JSON-строку ──
        string imagesJson;
        if (ArrayImages == null)
        {
          imagesJson = "[]";
        }
        else if (ArrayImages is string)
        {
          imagesJson = (string)ArrayImages;
        }
        else
        {
          imagesJson = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(ArrayImages);
        }
        var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        var arr = serializer.Deserialize<List<ImageItem>>(imagesJson);

        foreach (var img in arr)
        {
          byte[] bytes = Convert.FromBase64String(img.Data);
          string fileName = img.GUID + ".jpg";
          string fullPath = Path.Combine(pathToMonthFolder, fileName);
          if (!File.Exists(fullPath))
            File.WriteAllBytes(fullPath, bytes);
        }
      }
      catch (Exception e)
      {
        AppBusiness.SetErrorWeb(User, "Error UploadArtReportJson, Error: " + e.Message);
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write("{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," + "\"method\":\"UploadArtReportJson\"}");
        HttpContext.Current.Response.End();
      }
    }

    // сохранение фото с распознавания в специальную папку
    [WebMethod(EnableSession = true)]
    public void UploadAiPhoto(object Company, object GUID, object ImageData)
    {
      try
      {
        if (ImageData.ToString() != "")
        {
          String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
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
        }
        else
        {
          // запись ошибки о пустой фото
          AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto, GUID: " + GUID + ", Error: empty ImageData");
        }

      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto, GUID: " + GUID + ", Error: " + e.Message.ToString().Replace("'", ""));
      }
    }

    // сохранение фото с распознавания в специальную папку
    [WebMethod(EnableSession = true)]
    public void UploadAiPhoto2(object Company, object Point, object User, object Borned, object Action, object Category, object GUID, object ImageData)
    {
      try
      {
        if (ImageData.ToString() != "")
        {
          String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
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

          string filePath = "AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @GUID + ".jpg";

          //сохранение инфо о фото по распознаванию
          AppBusiness.SetAIPhoto2(Company, Point, User, Borned, Action, Category, GUID, filePath);
        }
        else
        {
          // запись ошибки о пустой фото
          AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto2, GUID: " + GUID + ", Error: empty ImageData");
        }

      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto2, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"UploadAiPhoto2\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    // сохранение фото с распознавания в специальную папку - без категории распознавания
    [WebMethod(EnableSession = true)]
    public void UploadAiPhoto3(object Company, object Point, object User, object Borned, object Action, object GUID, object ImageData)
    {
      try
      {
        if (ImageData.ToString() != "")
        {
          String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
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

          string filePath = "AI_Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @GUID + ".jpg";

          //сохранение инфо о фото по распознаванию
          AppBusiness.SetAIPhoto3(Company, Point, User, Borned, Action, GUID, filePath);
        }
        else
        {
          // запись ошибки о пустой фото
          AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto3, GUID: " + GUID + ", Error: empty ImageData");
        }

      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error UploadAiPhoto3, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"UploadAiPhoto3\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    // удаление результатов по распознаванию
    [WebMethod(EnableSession = true)]
    public void DeleteAIResult(object Company, object Point, object User, object Borned, object Action, object Category, object FileName)
    {
      AppBusiness.DeleteAIResult(Company, Point, User, Borned, Action, Category, FileName);

    }

    // удаление результатов по распознаванию
    [WebMethod(EnableSession = true)]
    public void DeleteAIResult2(object Company, object GUID)
    {
      try
      {
        AppBusiness.DeleteAIResult2(Company, GUID);
      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error DeleteAIResult2, GUID: " + GUID + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write(
            "{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," +
            "\"guid\":\"" + GUID + "\"," +
            "\"method\":\"DeleteAIResult2\"}"
        );
        HttpContext.Current.Response.End();
      }
    }

    

    class ImageItem { public string GUID; public string Data; }


    // удаление фото
    [WebMethod(EnableSession = true)]
    public void DeletePhoto(object User, object GUID)
    {
      AppBusiness.DeletePhoto(User, GUID);

    }

    // Общие настройки для распознавания
    [WebMethod(EnableSession = true)]
    public string GetAISetting(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAISetting(User));
    }

    // Вопросы для ветвления анкеты
    [WebMethod(EnableSession = true)]
    public string GetAIQuestion(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetAIQuestion(User));
    }

    // список маршрутов руководителя
    [WebMethod(EnableSession = true)]
    public string GetNodes(object User)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.GetNodes(User));
    }

    // установить новую дату для маршрута
    [WebMethod(EnableSession = true)]
    public string SetRouteChanges(object NodeID, object PointID, object CompanyID, object UserID, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7)
    {
      return ShareMethods.SerializeDataJSON(AppBusiness.SetRouteChanges(NodeID, PointID, CompanyID, UserID, Day1, Day2, Day3, Day4, Day5, Day6, Day7));
    }

    // Сохранение версии detection
    [WebMethod(EnableSession = true)]
    public void SetDetectionVersion(object User, object Company, object Version)
    {
      AppBusiness.SetDetectionVersion(User, Company, Version);
    }

    //  сохранение ответов по распознаванию
    [WebMethod(EnableSession = true)]
    public void SetAIUserInfo(object User, object Description)
    {
      try
      {
        var command = new SqlCommand("[AI.GTS].APP.SetAIUserInfo");
        command.Parameters.Add("@User", SqlDbType.Int).Value = User;
        command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;
        
        StoredProc.ExecuteSilent(command);
      }
      catch (IOException e)
      {
        AppBusiness.SetErrorWeb(User, "Error SetAIUserInfo, UserID = " + User.ToString() + ", Error: " + e.Message);

        // Возвращаем понятный ответ клиенту вместо HTML с stack trace
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.StatusCode = 500;
        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write("{\"error\":\"" + e.Message.Replace("\"", "\\\"") + "\"," + "\"method\":\"SetAIUserInfo\"}");
        HttpContext.Current.Response.End();
      }
    }

    [WebMethod(EnableSession = true)]
    public void SetAIError(object User, object Borned, object Description)
    {
      var command = new SqlCommand("[AI.GTS].APP.SetLog");
      command.Parameters.Add("@User", SqlDbType.Int).Value = User;
      command.Parameters.Add("@Borned", SqlDbType.DateTime).Value = Borned;
      command.Parameters.Add("@Description", SqlDbType.NVarChar, 4000).Value = Description;

      StoredProc.ExecuteSilent(command);
    }
  }
}
