# Перевод GTS с ASMX (.NET Framework 4.8) на ASP.NET Core (.NET 8)

## 1. Как устроено

```
aspnetcore/
  Gts.Api.sln
  src/Gts.Api/
    Program.cs        — запуск: конфигурация, раздача сайта, маршруты
    Legacy/           — ВЕСЬ код из source/App_Code и source/*.aspx.cs, перенесённый почти дословно
      Pages/          — бывшие upload.aspx, uploadUser.aspx, uploadExcel.aspx, soundUploader.aspx, Refresh.aspx
    Compat/           — слой совместимости: то, чего нет в .NET 8, но использует старый код
      SystemWeb.cs            HttpContext.Current, Server.MapPath, Request/Response, WebService, [WebMethod], Page
      ConfigurationManager.cs AppSettings / ConnectionStrings из appsettings.json и секретов
      JavaScriptSerializer.cs JSON в формате .NET Framework (даты \/Date(мс)\/, экранирование <>&')
      AsmxDispatcher.cs       обработчик /Services/{Служба}.asmx/{Метод}
      LegacySite.cs           раздача source/ (html, js, фото) и страниц *.aspx
    Controllers/, Services/, Infrastructure/
                      — образцы нового стиля (REST + async + DI) на /api/v1/*: System, App, Visit
  lib/                — ICSharpCode.SharpZipLib.dll (та же, что в source/Bin)
  offline-stubs/      — заглушки пакетов для проверочной сборки без NuGet; в VS не используются
```

Путь запроса из `desktop/visit.js`:

```
$.ajax({ url: '../Services/Visit.asmx/Run', data: JSON.stringify({...}) })      ← JS не менялся
  → AsmxDispatcher: служба Visit.asmx → класс Visit.Framework (Legacy/Visit.cs)
  → параметры из JSON по именам → вызов метода Run(...)                        ← код метода не менялся
  → VisitBusiness.Run → StoredProc.Select → процедура в SQL Server              ← Legacy/DbProc.cs
  → ShareMethods.SerializeDataJSON → строка JSON
  → AsmxDispatcher заворачивает в {"d":"[...]"}                                 ← как делал IIS
```

**Почему так, а не переписать всё заново.** В 511 методах около 150 содержат собственную логику
(обработка фото, проверки, zip, Excel). Переписать их без возможности прогнать на реальной базе —
значит почти наверняка где-то поменять поведение. Перенос «как есть» поверх слоя совместимости
сохраняет поведение, а модернизировать дальше можно по одной службе, сверяясь с работающим образцом.
Так же Microsoft рекомендует переводить приложения с System.Web (System.Web adapters).

## 2. Что проверено при подготовке

Сборка без ошибок (в режиме без NuGet, с заглушками пакетов). Запуск сервера без базы данных:

- раздача `index.html`, `desktop/*`, `webix/*`; закрыты `App_Code/`, `Bin/`, `Web.config`, `logs/`, `*.cs`;
- все **511** методов во всех **20** службах находятся диспетчером (сверено с исходниками);
- формат ответов: `{"d":"..."}` для строк, `{"d":[...]}` для массивов (`ConnectionSetting`), `{"d":null}` для void;
- экранирование `< > & '` → `\u003c \u003e \u0026 \u0027`, как у JavaScriptSerializer;
- адрес `APP.asmx` (в другом регистре, как в edit_visit.js) работает; лишние параметры (`GUID`) игнорируются;
- ошибки — HTTP 500 с `{"Message","StackTrace","ExceptionType"}`, нет параметра — текст как у ASMX;
- загрузка файлов через `uploadUser.aspx`, `uploadExcel.aspx`, `soundUploader.aspx`; поток `Refresh.aspx`;
- ошибки БД пишутся старым кодом в `logs/errors.log`, сервер при этом не падает.

**Не проверено (нет базы и Windows):** реальные ответы процедур, обработка фото через System.Drawing,
zip-архивы, отправка SMS и почты. Это и есть предмет вашего тестирования.

## 3. Отличия от старого сайта

| Что | Было | Стало | Почему |
|---|---|---|---|
| Секреты | пароль `sa` в Web.config, пароль SMS в коде | User Secrets / переменные окружения | не храним пароли в репозитории |
| Стек ошибок в ответе | всегда (`customErrors=Off`) | только при разработке | не раскрываем детали в проде |
| https | редирект закомментирован | включён вне режима разработки | |
| Журнал `logs/errors.log` | IIS не отдавал `.log` | закрыт явно | иначе статика .NET отдала бы его |
| Необязательные параметры (`object Answer = null`) | — | если не переданы, берётся значение по умолчанию | мягче, чем ASMX |
| Драйвер SQL | System.Data.SqlClient | Microsoft.Data.SqlClient, `Encrypt=False`, если не задано | прежнее поведение подключения |

## 4. Ограничения

- **System.Drawing работает только под Windows.** Для локального теста и IIS это не проблема.
  Для Linux/Docker обработку фото нужно перевести на ImageSharp или SkiaSharp.
- **SOAP не поддерживается** — только JSON-вызовы (как у сайта и мобильных приложений). Если внешние
  системы (интеграции `API_ARK.asmx`, `API_ELEMENT.asmx`) вызывают службы по SOAP/XML, их нужно проверить
  отдельно — скажите, добавлю.
- `ExcelPS.asmx` запускает `D:\transfer_clients\SQLtoXLS.ps1` — работает только на сервере, где этот скрипт есть.
- Сохранена гонка старого кода: статическое `StoredProc.BaseName` общее для всех пользователей.

## 5. Что дальше (после проверки)

1. **Публикация.** IIS + ASP.NET Core Hosting Bundle (In-Process). Сайт и API в одном приложении,
   `source/` указывается настройкой `Gts:LegacyWebRoot`.
2. **Безопасность** (не исправлялась, чтобы не менять поведение при сверке):
   - `User` в каждом методе приходит от клиента и не сверяется с сессией — можно читать чужие данные;
   - `System.asmx/GetPhotoBase64` читает файл по пути из запроса (возможен выход за пределы `Photos`) —
     исправленный вариант есть в `/api/v1/system/photo-base64`;
   - сменить засвеченные пароли `sa` и SMS-шлюза.
3. **Модернизация по службам.** Переносить службу из `Legacy/` в `Controllers/` + `Services/`
   по образцу `Visit`, `System`, `App` (async, DI, типизированные параметры), сверяя ответы со старой версией.
