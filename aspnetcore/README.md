# GTS на ASP.NET Core (.NET 8)

Весь сайт `source/` (страницы, JS, 511 веб-методов `/Services/*.asmx/*`, загрузка файлов `*.aspx`)
запускается одним приложением .NET 8. JS-файлы, Android и iPhone **не меняются**: адреса и формат
ответов (`{"d": ...}`) те же, что у старого ASMX.

## Запуск в Visual Studio 2022

Нужны: VS 2022 **17.8+** и рабочая нагрузка **ASP.NET and web development** (в неё входит .NET 8 SDK).

1. Переключитесь на ветку `migration` (Git → Manage Branches → `origin/migration` → Checkout).
2. Откройте `aspnetcore/Gts.Api.sln`.
3. Строка подключения — через секреты, не в файлах: ПКМ по проекту **Gts.Api → Manage User Secrets**:
   ```json
   {
     "ConnectionStrings": {
       "Database": "Data Source=localhost;Initial Catalog=GTS;User ID=...;Password=..."
     }
   }
   ```
   Это та же строка, что была в `source/Web.config`. Если в ней нет параметра `Encrypt`, приложение
   добавит `Encrypt=False` — как вёл себя старый драйвер. Для SMS добавьте туда же
   `"AppSettings": { "SmscLogin": "...", "SmscPassword": "..." }`.
4. **F5.** Откроется `http://localhost:5080/` — тот же `index.html`, что на боевом сайте.
   Профиль «Gts.Api (Swagger)» открывает Swagger для новых адресов `/api/v1/*`.

Сайт берёт страницы, скрипты и фото прямо из папки `source/` репозитория (настройка `Gts:LegacyWebRoot`
в `appsettings.json`). Загруженные при тестировании фото попадут в `source/Photos` — не коммитьте их.

## Что проверить

| Сценарий | Где | Что затрагивает |
|---|---|---|
| Вход по телефону и паролю | `index.html` | `System.asmx/Logon`, `Authorization` |
| Рабочий стол, отчёты, сводные | `desktop/app.html` | `Desktop`, `Report`, `UI`, `Framework.asmx` |
| Карточка визита, фото визита | `desktop/visit.js`, `desktop/js/edit_visit.js` | `Visit.asmx`, `APP.asmx/DeletePhotoVisit` |
| Загрузка фото / аватара / звука / Excel | формы сайта | `upload.aspx`, `uploadUser.aspx`, `soundUploader.aspx`, `uploadExcel.aspx` |
| Уведомления о сообщениях | открытая страница сайта | `Refresh.aspx` (поток событий) |
| Архив фото в zip | раздел фотоотчётов | `Archive.asmx` |
| Мобильное приложение | в настройках указать адрес `http://<IP компьютера>:5080` | `App.asmx`, `AppToken.asmx`, `System.asmx` |

Список методов любой службы: откройте в браузере `http://localhost:5080/Services/App.asmx`.
Ошибки старого кода при работе с БД пишутся, как и раньше, в `source/logs/errors.log`;
ошибки самого приложения — в окно Output (Debug) в VS.

Подробнее об устройстве, отличиях и ограничениях — [MIGRATION.md](./MIGRATION.md).
