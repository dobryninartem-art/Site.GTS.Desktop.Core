// Перенесено из source/App_Code/UI.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Services;

namespace UI
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // отправить смс
    [WebMethod(EnableSession = true)]
    public void SendSms(object Phone)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      DataTable data = SystemBusiness.GetPass(phone);

      if (data.Rows.Count == 0) return;

      string Pass = data.Rows[0]["Pass"].ToString();

      SMSC smsc = new SMSC();
      string[] r = smsc.send_sms(phone, "gts.online: Ваш пароль - " + Pass);

    }

    // список ТТ
    [WebMethod(EnableSession = true)]
    public string GetPoint(object User, object Flag)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetPoint(User, Flag));
    }

    // список ТТ для фокусных заданий
    [WebMethod(EnableSession = true)]
    public string GetTaskPoint(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetTaskPoint(User));
    }

    // сохранение ТТ
    [WebMethod(EnableSession = true)]
    public string SetPoint(object Point, object Company, object OfficeName, object CityName, object NetworkName, object Name, object Address, object FormatName, object IsMe, object Author, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetPoint(Point, Company, OfficeName, CityName, NetworkName, Name, Address, FormatName, IsMe, GUID, Author));
    }

    // определение геокоординат ТТ
    [WebMethod(EnableSession = true)]
    public void SetPointGeo(object Point, object Lat, object Lon)
    {
      UIBusiness.SetPointGeo(Point, Lat, Lon);
    }

    // Закрепление\открепление ТТ за пользователем
    [WebMethod(EnableSession = true)]
    public void SetPointMap(object User, object Point, object Status, object Author)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      UIBusiness.SetPointMap(User, Point, Status, Author);
    }

    // список заданий
    [WebMethod(EnableSession = true)]
    public string GetTask(object User, object Flag)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetTask(User, Flag));
    }

    //Создание нового задания(обновленная версия)
    [WebMethod(EnableSession = true)]
    public void SetTask(object Author, object Point, object Acceptor, object Text, object GUID, object PhotoID)
    {
      UIBusiness.SetTask(Author, Point, Acceptor, Text, GUID, PhotoID);
    }

    // Создание нового фокусного задания 
    [WebMethod(EnableSession = true)]
    public void SetTask2(object User, object Text, object GUID, object Finish, object Acceptor)
    {
      UIBusiness.SetTask2(User, Text, GUID, Finish, Acceptor);
    }

    // отправка уведомлений о прочтении задания
    [WebMethod(EnableSession = true)]
    public void SetTaskDelivered(object User, object Task)
    {
      UIBusiness.SetTaskDelivered(User, Task);
    }

    // список сообщений
    [WebMethod(EnableSession = true)]
    public string GetMessage(object User, object Flag = null, object Task = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetMessage(User, Flag, Task));
    }

    // Создание нового сообщения
    [WebMethod(EnableSession = true)]
    public void SetMessage(object Task, object User, object Text, object GUID)
    {
      UIBusiness.SetMessage(Task, User, Text, GUID);
    }

    //Отправка сообщения ответа на претензию
    [WebMethod(EnableSession = true)]
    public string SetTaskMessage(object Task, object User, object Text, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetTaskMessage(Task, User, Text, GUID));
    }

    //Отправка сообщения подтверждения ответа на претензию
    [WebMethod(EnableSession = true)]
    public string SetTaskModerate(object Task, object User, object Text, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetTaskModerate(Task, User, Text, GUID));
    }

    // Создание нового сообщения чата
    [WebMethod(EnableSession = true)]
    public string SetChat(object Acceptor, object User, object Text, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetChat(Acceptor, User, Text, GUID));
    }

    // Создание новой группы чата
    [WebMethod(EnableSession = true)]
    public string SetGroup(object User, object Name, object Description, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetGroup(User, Name, Description, GUID));
    }

    // отправка уведомлений о прочтении сообщений
    [WebMethod(EnableSession = true)]
    public void SetMessageRead(object User, object Message)
    {
      UIBusiness.SetMessageRead(User, Message);
    }

    // отправка уведомлений о доставке сообщений
    [WebMethod(EnableSession = true)]
    public void SetMessageDelivered(object User, object Message)
    {
      UIBusiness.SetMessageDelivered(User, Message);
    }

    // отправка уведомлений о доставке сообщений чата
    [WebMethod(EnableSession = true)]
    public void SetChatDelivered(object User, object Chat)
    {
      UIBusiness.SetChatDelivered(User, Chat);
    }

    // отправка уведомлений о прочтении сообщений чата
    [WebMethod(EnableSession = true)]
    public void SetChatRead(object User, object Chat)
    {
      UIBusiness.SetChatRead(User, Chat);
    }

    // список получателей задания
    [WebMethod(EnableSession = true)]
    public string GetAcceptor(object User, object Point = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetAcceptor(User, Point));
    }

    // список получателей задания в привязке к ТТ
    [WebMethod(EnableSession = true)]
    public string GetAcceptorMap(object User, object Point = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetAcceptorMap(User, Point));
    }

    // список получателей задания
    [WebMethod(EnableSession = true)]
    public string GetUser(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetUser(User));
    }

    // список заметок
    [WebMethod(EnableSession = true)]
    public string GetNote(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetNote(User, Point));
    }

    // Создание новой заметки
    [WebMethod(EnableSession = true)]
    public string SetNote(object User, object Point, object Text, object Category, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetNote(User, Point, Text, Category, GUID));
    }

    // сохранение фото на сервер
    [WebMethod(EnableSession = true)]
    public void UploadPhoto(object GUID, object User, string FileName, string ImageData, string Magic, object Company, object Flag = null)
    {
      try
      {
        String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString();
        if (!Directory.Exists(pathToYearFolder))
          Directory.CreateDirectory(pathToYearFolder);
        String pathToMonthFolder = pathToYearFolder + @"/" + DateTime.Now.Day.ToString();
        if (!Directory.Exists(pathToMonthFolder))
          Directory.CreateDirectory(pathToMonthFolder);

        if (ImageData != "")
        {
          FileStream fs = new FileStream(pathToMonthFolder + @"/" + @FileName + ".jpg", FileMode.Create);
          BinaryWriter bw = new BinaryWriter(fs);

          byte[] data = Convert.FromBase64String(ImageData);

          bw.Write(data);
          bw.Close();
        }

        string fileName = "Photos/" + Company.ToString() + '/' + DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString() + @"/" + @FileName + ".jpg";

        SystemBusiness.SetPhoto(Magic, User, GUID, fileName, Flag);
      }
      catch (IOException e)
      {
        return;
      }
    }

    // сохранение геокоординат фото на сервер
    [WebMethod(EnableSession = true)]
    public string SetPhotoGeo(object User, object GUID, object Lat = null, object Lon = null, object Error = null, object Point = null, object GeoTime = null, object Flag = null)
    {
      return ShareMethods.SerializeDataJSON(SystemBusiness.SetPhotoGeo(User, GUID, Lat, Lon, Error, Point, GeoTime, Flag));
    }

    // копирование фото в задание при постановке задания из фотоотчета
    [WebMethod(EnableSession = true)]
    public string SetPhotoFromReport(object User, object GUID, object PhotoID)
    {
      return ShareMethods.SerializeDataJSON(SystemBusiness.SetPhotoFromReport(User, GUID, PhotoID));
    }

    // сохранение фото пользователя на сервер
    [WebMethod(EnableSession = true)]
    public void UploadUserPhoto(object User, string ImageData)
    {
      try
      {
        String pathToYearFolder = HttpContext.Current.Server.MapPath("/") + @"/Photos/User";
        if (!Directory.Exists(pathToYearFolder))
          Directory.CreateDirectory(pathToYearFolder);

        string fileName = pathToYearFolder + @"/_" + @User.ToString() + ".jpg";

        FileStream fs = new FileStream(fileName, FileMode.Create);
        BinaryWriter bw = new BinaryWriter(fs);

        byte[] data = Convert.FromBase64String(ImageData);

        bw.Write(data);
        bw.Close();

        System.Drawing.Image imgQuadrat = System.Drawing.Image.FromFile(fileName);

        int size = ((float)imgQuadrat.Width > (float)imgQuadrat.Height) ? (int)imgQuadrat.Height : (int)imgQuadrat.Width;
        float srcY = ((int)imgQuadrat.Height - size) / 2 * 8 / 10;

        Bitmap sourse_bmp = new Bitmap(imgQuadrat);
        Bitmap destination_bmp = new Bitmap(size, size);
        Graphics gr = Graphics.FromImage(destination_bmp);
        gr.DrawImage(sourse_bmp, new Rectangle(0, 0, size, size), 0, (int)srcY, size, size, GraphicsUnit.Pixel);

        // сжатие и сохранение сжатой версии
        Bitmap imageSmall = new Bitmap(destination_bmp, 300, 300);

        using (Graphics g = Graphics.FromImage(imageSmall))
        {
          g.SmoothingMode = SmoothingMode.HighQuality;
          g.InterpolationMode = InterpolationMode.HighQualityBicubic;
          g.PixelOffsetMode = PixelOffsetMode.HighQuality;

          EncoderParameter myEncoderParameter = new EncoderParameter(Encoder.Quality, 70L);
          EncoderParameters myEncoderParameters = new EncoderParameters(1);
          myEncoderParameters.Param[0] = myEncoderParameter;
          System.Drawing.Imaging.ImageCodecInfo myImageCodecInfo = getEncoderInfo("image/jpeg");

          imageSmall.Save(pathToYearFolder + @"/" + @User.ToString() + ".jpg", myImageCodecInfo, myEncoderParameters);
        }

        // сжатие и сохранение сжатой версии icon
        Bitmap imageIcon = new Bitmap(destination_bmp, 60, 60);

        using (Graphics g = Graphics.FromImage(imageIcon))
        {
          g.SmoothingMode = SmoothingMode.HighQuality;
          g.InterpolationMode = InterpolationMode.HighQualityBicubic;
          g.PixelOffsetMode = PixelOffsetMode.HighQuality;

          EncoderParameter myEncoderParameter = new EncoderParameter(Encoder.Quality, 90L);
          EncoderParameters myEncoderParameters = new EncoderParameters(1);
          myEncoderParameters.Param[0] = myEncoderParameter;
          System.Drawing.Imaging.ImageCodecInfo myImageCodecInfo = getEncoderInfo("image/jpeg");

          imageIcon.Save(pathToYearFolder + @"/" + @User.ToString() + "_ico.jpg", myImageCodecInfo, myEncoderParameters);
        }

        imgQuadrat.Dispose();

        System.IO.File.Delete(fileName);

        SystemBusiness.SetUserPhoto(User, "Photos/User/" + @User.ToString() + "_ico.jpg");
      }
      catch (IOException e)
      {
        return;
      }
    }

    // список тикетов для техподдержки
    [WebMethod(EnableSession = true)]
    public string GetTicket(object User, object Company)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.GetTicket(User, Company));
    }

    // список тикетов для администратора системы
    [WebMethod(EnableSession = true)]
    public string GetTicketAdmin(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetTicketAdmin(User));
    }


    // Создание тикета для техподдержки
    [WebMethod(EnableSession = true)]
    public string SetTicket(object User, object Company, object Text, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetTicket(User, Company, Text, GUID));
    }

    // Создание тикета для администратора системы
    [WebMethod(EnableSession = true)]
    public string SetTicketAdmin(object User, object Text, object GUID)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetTicketAdmin(User, Text, GUID));
    }

    // список sku
    [WebMethod(EnableSession = true)]
    public string GetArt(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetArt(User, Point));
    }

    // матрицы по сети
    [WebMethod(EnableSession = true)]
    public string GetArtNetworkMatrix(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetArtNetworkMatrix(User));
    }

    // матрицы по ТТ
    [WebMethod(EnableSession = true)]
    public string GetArtPointMatrix(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetArtPointMatrix(User, Point));
    }

    // матрицы по ТТ (общее хранилище)
    [WebMethod(EnableSession = true)]
    public string GetArtMatrix(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetArtMatrix(User, Point));
    }

    // список ответов по sku
    [WebMethod(EnableSession = true)]
    public string GetArtAnswer(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetArtAnswer(User, Point));
    }

    //  сохранение ответов по sku
    [WebMethod(EnableSession = true)]
    public string SetArt(object Point, object User, object Action, object Art, object Question, object Option, object Answer = null, object GUID = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.SetArt(Point, User, Action, Art, Question, Option, Answer, GUID));
    }

    // Данные по пользователю для личного кабинета
    [WebMethod(EnableSession = true)]
    public string GetUsers(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetUsers(User));
    }

    //  сохранение данных по пользователю
    [WebMethod(EnableSession = true)]
    public string SetUsers(object User, object Phone, object Company, object LName, object FName, object MName, object RoleName, object Author = null)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      return ShareMethods.SerializeDataJSON(UIBusiness.SetUsers(User, phone, Company, LName, FName, MName, RoleName, Author));
    }

    private ImageCodecInfo getEncoderInfo(string mimeType)
    {
      // Get image codecs for all image formats
      ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

      // Find the correct image codec
      for (int i = 0; i < codecs.Length; i++)
        if (codecs[i].MimeType == mimeType)
          return codecs[i];
      return null;
    }

    // Список фото
    [WebMethod(EnableSession = true)]
    public string GetPhotoReport(object User, object Point = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetPhotoReport(User, Point));
    }

    // Список фото по промо
    [WebMethod(EnableSession = true)]
    public string GetPhotoAction(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetPhotoAction(User));
    }

    // Создание нового фотоотчета
    [WebMethod(EnableSession = true)]
    public string SetPhotoReport(object User, object Point, object Description, object Category, object Brand = null, object Company = null, object GUID = null)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetPhotoReport(User, Point, Description, Category, Brand, Company, GUID));
    }

    // Создание фото по промо
    [WebMethod(EnableSession = true)]
    public string SetPhotoAction(object User, object Point, object Description, object Action, object GUID = null)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.SetPhotoAction(User, Point, Description, Action, GUID));
    }

    // Список привязанных к ТТ пользователей
    [WebMethod(EnableSession = true)]
    public string GetPointUserMap(object User, object Point)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetPointUserMap(User, Point));
    }

    //  сохранение визита
    [WebMethod(EnableSession = true)]
    public void SetVisit(object Point, object User, object IsVisit, object Date, object Lat = null, object Lon = null, object Error = null, object GeoTime = null, object Flag = null)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      UIBusiness.SetVisit(Point, User, IsVisit, Date, Lat, Lon, Error, GeoTime, Flag);
    }

    // Список виртуальных дат визита
    [WebMethod(EnableSession = true)]
    public string GetVisitDate(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetVisitDate(User));
    }

    // сохранение виртуальной даты визита
    [WebMethod(EnableSession = true)]
    public void SetVisitDate(object Point, object User, object Date)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      if (Date.ToString() == "" || Date.ToString().Length > 10) return;

      UIBusiness.SetVisitDate(Point, User, Date);
    }

    // Список фотокатегорий
    [WebMethod(EnableSession = true)]
    public string GetPhotoCategories(object Company)
    {
      if (Company == null) return "";
      if (int.Parse(Company.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetPhotoCategories(Company));
    }

    // Список стандартов выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandart(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetStandart(User));
    }

    // Список стандартов выкладки в привязке к ТТ
    [WebMethod(EnableSession = true)]
    public string GetStandartMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetStandartMap(User));
    }

    // Список фото стандарта выкладки
    [WebMethod(EnableSession = true)]
    public string GetStandartFile(object Standart)
    {
      return ShareMethods.SerializeDataJSON(UIBusiness.GetStandartFile(Standart));
    }

    // Список чатов
    [WebMethod(EnableSession = true)]
    public string GetChatAcceptor(object User, object Flag = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetChatAcceptor(User, Flag));
    }

    // Список сообщений чатов
    [WebMethod(EnableSession = true)]
    public string GetChat(object User, object Flag = null)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetChat(User, Flag));
    }

    // Список сотрудников группы чата
    [WebMethod(EnableSession = true)]
    public string GetGroupUserMap(object User, object Group)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetGroupUserMap(User, Group));
    }

    // сохранение привязки сотрудника к группе чата
    [WebMethod(EnableSession = true)]
    public void SetGroupUserMap(object User, object Group, object Status)
    {
      if (User == null) return;
      if (int.Parse(User.ToString()) == -1) return;

      UIBusiness.SetGroupUserMap(User, Group, Status);
    }

    // сохранение информации об аппарате пользователя
    [WebMethod(EnableSession = true)]
    public void SetPhoneInfo(object Phone, object Model = null, object Device = null, object Version = null, object AppVersion = null)
    {
      string phone = Phone.ToString().Trim().Replace("(", "").Replace(")", "").Replace("-", "").Replace(" ", "");

      SystemBusiness.SetPhoneInfo(phone, Model, Device, Version, AppVersion);
    }

    // установка флага о прочтении ответа от техподдержки
    [WebMethod(EnableSession = true)]
    public void SetTicketRead(object User)
    {
      UIBusiness.SetTicketRead(User);
    }

    // установка флага о прочтении ответа от администратора системы
    [WebMethod(EnableSession = true)]
    public void SetTicketAdminRead(object User)
    {
      UIBusiness.SetTicketAdminRead(User);
    }

    // скрытие фото из фотоотчета
    [WebMethod(EnableSession = true)]
    public void SetPhotoHide(object ID, object Status, object User)
    {
      ReportBusiness.SetPhotoHide(ID, Status, User);
    }

    // подтверждение фото
    [WebMethod(EnableSession = true)]
    public void SetPhotoCheck(object ID, object Status, object User)
    {
      ReportBusiness.SetPhotoCheck(ID, Status, User);
    }

    // подтверждение фото (новое)
    [WebMethod(EnableSession = true)]
    public void SetPhotoCheck2(object ID, object Status, object User)
    {
      ReportBusiness.SetPhotoCheck2(ID, Status, User);
    }

    // установка оценки фото
    [WebMethod(EnableSession = true)]
    public void SetPhotoRating (object ID, object Rating, object User)
    {
      ReportBusiness.SetPhotoRating(ID, Rating, User);
    }

    // Список настроек пользователя
    [WebMethod(EnableSession = true)]
    public string GetSetting(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetSetting(User));
    }

    // сохранение настройки пользователя
    [WebMethod(EnableSession = true)]
    public void SetSetting(object User, object Magic, object Value)
    {
      UIBusiness.SetSetting(User, Magic, Value);
    }

    // правка примечания фото
    [WebMethod(EnableSession = true)]
    public void PhotoDescriptionEdit(object ID, object Description)
    {
      UIBusiness.PhotoDescriptionEdit(ID, Description);
    }

    // сохранение выбранных ТТ для задания
    [WebMethod(EnableSession = true)]
    public void SetTaskPoint(object User, object Text)
    {
      UIBusiness.SetTaskPoint(User, Text);
    }

    // сохранение информации об открытии фото
    [WebMethod(EnableSession = true)]
    public void SetPhotoLog(object User, object Photo)
    {
      UIBusiness.SetPhotoLog(User, Photo);
    }

    // список настроек компании для мобильной версии
    [WebMethod(EnableSession = true)]
    public string GetCompanySettingMobile(object Company)
    {
      if (Company == null) return "";
      if (int.Parse(Company.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(UIBusiness.GetCompanySettingMobile(Company));
    }

    // сохранение маршрута
    [WebMethod(EnableSession = true)]
    public void SetRoute(object Company, object Point, object Day1, object Day2, object Day3, object Day4, object Day5, object Day6, object Day7, object Key)
    {
      UIBusiness.SetRoute(Company, Point, Day1, Day2, Day3, Day4, Day5, Day6, Day7, Key);
    }

    //список категорий/ролей/сотрудников для постановки задания к ТТ
    [WebMethod(EnableSession = true)]
    public string GetTaskPointInfo(object Point, object Author)
    {
      return ShareMethods.SerializeDataJSONMany(UIBusiness.GetTaskPointInfo(Point, Author));
    }

    //Создание нового задания по тт
    [WebMethod(EnableSession = true)]
    public void SetTaskPoint2(object Point, object Text, object Category, object Role, object User, object Company, object GUID, object Type, object Author, object BornedVisit = null)
    {
      UIBusiness.SetTaskPoint2(Point, Text, Category, Role, User, Company, GUID, Type, Author, BornedVisit);
    }

  }

}
