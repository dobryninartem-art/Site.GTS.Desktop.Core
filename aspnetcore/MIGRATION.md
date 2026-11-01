# Миграция GTS с ASMX (.NET Framework 4.8) на ASP.NET Core Web API

Эта папка — **фундамент и эталон** миграции, а не законченный перенос. Она создана в
ветке `feature/aspnetcore-migration` рядом с legacy-кодом (`/source`), не трогая его
(подход *strangler fig*: старое и новое работают параллельно, перенос идёт по частям).

> ⚠️ Код **не собран и не протестирован** в среде, где он готовился: там нет .NET SDK
> и SQL Server. Он написан «компилируемым по построению», но первую сборку и прогон
> против реальной БД нужно выполнить у вас (`dotnet build`, затем интеграционные
> проверки ответов). Всё, что помечено ниже как «проверить», — обязательно к проверке.

---

## 1. Главный принцип: не сломать мобильные приложения

Android (`ServerConnection.kt`) и, почти наверняка, iPhone обращаются к серверу так:

| Что | Значение |
|-----|----------|
| URL | `{BASE_URL}/Services/{Сервис}.asmx/{Метод}` (имя сервиса хранится с `.asmx`) |
| Метод | `POST` |
| Content-Type | `application/json` |
| Тело | JSON-объект именованных параметров: `{"User":"123","Point":"45"}` |
| Разбор ответа | `JSONObject(body)["d"]` — ждёт обёртку **`{"d": ...}`** (подпись ASMX ScriptService) |

**Вывод:** если новый API сохраняет эти правила — мобильные клиенты не меняются вообще
(ноль правок, ноль релизов в сторах, ничего не выкатывать на полевые устройства).
Именно это здесь и сделано: контроллеры отвечают по маршрутам `Services/*.asmx/Method`
и заворачивают payload в `{"d": ...}` (см. `Compatibility/AsmxResult.cs`).

Позже рядом можно добавить чистые REST-эндпоинты (`/api/...`) и переводить клиентов
на них постепенно — старый фасад при этом продолжает работать.

---

## 2. Детали совместимости, критичные для «drop-in» (проверить на реальных ответах)

Эти вещи ломают клиентов тихо (HTTP 200, но данные не парсятся), поэтому воспроизведены
намеренно — см. `Infrastructure/LegacyJson.cs`:

1. **Даты.** Старый `JavaScriptSerializer` отдавал `"\/Date(МИЛЛИСЕКУНДЫ)\/"`, а не ISO-8601.
   Повторено. Если отдать ISO (как делает System.Text.Json по умолчанию) — разбор дат на
   клиенте сломается. **Проверить** на колонке с датой, что формат совпадает байт-в-байт.
2. **`DBNull` → `null`**, **`byte[]` → base64-строка**, **`Guid` → строка** — воспроизведено.
3. **Строка в поле `d`.** Legacy-методы возвращали строку, и ScriptService клал её как
   строку: `{"d":"[{...}]"}`. Для методов, возвращавших не строку (`ConnectionSetting` →
   `string[]`), payload кладётся как массив: `{"d":[...]}`. Оба варианта поддержаны
   (`AsmxResult.FromJsonString` / `FromRawJson`).
4. **`GetServerDate`** в оригинале форматирует `"dd.mm.yyyy"` — где `mm` это **минуты**,
   а не месяц (баг оригинала). Порт сохраняет поведение буквально; решите, чинить ли на
   `"dd.MM.yyyy"` — это изменение поведения, поэтому вынесено в открытые вопросы (§6).

---

## 3. Что уже перенесено в этой ветке

```
aspnetcore/
  Gts.Api.sln
  src/Gts.Api/
    Program.cs                     — DI, маршрутизация, Swagger, https-redirect
    appsettings.json               — БЕЗ секретов; строка подключения из окружения
    Infrastructure/
      IDatabase.cs / SqlDatabase.cs — async-замена StoredProc (Select/SelectMany/Execute)
      LegacyJson.cs                 — сериализация, совместимая с JavaScriptSerializer
      Row.cs
    Compatibility/
      AsmxResult.cs                 — конверт {"d": ...}
    Security/
      PhotoPath.cs                  — безопасный путь к фото (фикс обхода каталога)
    Services/
      SystemService.cs             — порт SystemBusiness (Logon/Authorization/UserExist/…)
      AppService.cs                — срез AppBusiness (GetNetwork/GetPoint/GetCategory/…)
    Controllers/
      SystemController.cs          — Services/System.asmx/*  (эталон: авторизация + фото)
      AppController.cs             — Services/App.asmx/*      (эталон: массовый паттерн чтения)
```

Эти два сервиса — **копируемый образец**: на них видно все три типовых случая
(чтение по `@User`, многопараметрическая авторизация, файловый метод с фиксом безопасности).

---

## 4. Улучшения, уже заложенные в фундамент

- **async/await** на всём пути к БД — сервер держит кратно больше одновременных запросов.
- **Секреты вне кода.** Строка подключения читается из `ConnectionStrings__Database`
  (окружение) или User Secrets; в репозитории её нет. (В legacy она лежала в `Web.config`
  под `sa` открытым текстом.) **Отдельная задача (не код):** сменить засвеченные пароли —
  `sa` в `source/Web.config` и SMS-шлюз в `source/App_Code/smsc_api.cs` — и завести для
  приложения SQL-учётку с минимальными правами (`EXECUTE` на нужные процедуры), а не `sa`.
- **Убрана гонка мультиарендности.** Вместо статического `StoredProc.BaseName` и замены
  подстроки `"GTS"` в строке подключения — выбор базы через `InitialCatalog` и передача
  базы параметром; имя базы берётся из `SYSTEM.GetBase(@User)`.
- **Фикс обхода каталога** в `GetPhotoBase64` (`Security/PhotoPath.cs`).
- **https-redirect** включён в проде (в legacy был закомментирован).
- Исходники в **UTF-8** (в legacy — Windows-1251).

---

## 5. Инвентаризация: сколько осталось

~**510 методов** в **20 ASMX-эндпоинтах**. Три эндпоинта `API*.asmx` используют один
`API.cs`. Порядок переноса рекомендую по важности для мобильных/боевых сценариев.

| Эндпоинт | Методов | Код legacy | Статус |
|----------|--------:|------------|--------|
| System.asmx | 15 | System.cs | ✅ эталон (перенесены ключевые) |
| App.asmx | 122 | App.cs | 🟡 срез-эталон (6 методов), остальное по образцу |
| App2.asmx | 25 | App2.cs | ⬜ |
| AppRh.asmx | 97 | AppRh.cs | ⬜ |
| AppToken.asmx | 27 | AppToken.cs | ⬜ |
| UI.asmx | 73 | UI.cs | ⬜ |
| Report.asmx | 50 | Report.cs | ⬜ |
| Desktop.asmx | 29 | Desktop.cs | ⬜ |
| Framework.asmx | 15 | Framework.cs | ⬜ |
| BI.asmx | 12 | BI.cs | ⬜ |
| Custom.asmx | 10 | Custom.cs | ⬜ |
| Action.asmx | 9 | Action.cs | ⬜ |
| Replication.asmx | 9 | Replication.cs | ⬜ |
| API.asmx / API_ARK / API_ELEMENT | 8 (общий) | API.cs | ⬜ |
| Visit.asmx | 5 | Visit.cs | ⬜ |
| AI.asmx | 2 | AI.cs | ⬜ |
| Archive.asmx | 2 | Archive.cs | ⬜ |
| ExcelPS.asmx | — | ExcelPS.cs | ⬜ |

---

## 6. Рецепт переноса одного метода (по эталону)

Для метода `App.asmx/GetPoint` (чтение по `@User`):

1. **Бизнес-метод** в соответствующем `*Service.cs`:
   ```csharp
   public Task<List<Row>> GetPointAsync(string? user, CancellationToken ct) =>
       ByUser("APP.GetPoint", user, ct);   // имя процедуры и параметры 1:1 с legacy
   ```
2. **Действие контроллера** в `*Controller.cs` под маршрутом сервиса:
   ```csharp
   [HttpPost("GetPoint")]
   public async Task<IActionResult> GetPoint([FromBody] UserRequest req, CancellationToken ct)
       => AsmxResult.FromJsonString(LegacyJson.SerializeRows(await _svc.GetPointAsync(req.User, ct)));
   ```
3. Параметры метода → поля `record`-запроса (имена **точно** как в legacy: `User`, `Phone`…).
4. Для методов-записи (void/Execute) — `IDatabase.ExecuteAsync`, результат оборачивать так же.
5. Для методов с OUTPUT-параметром — см. `SystemService.GetBaseAsync`.
6. Для методов с базой пользователя — получить её `GetBaseAsync(User)` и передать в `SelectAsync(..., baseName)`.

Параметро-тяжёлые сервисы (напр. `API.SetAnswer` с 10 необязательными) можно биндить
на `Dictionary<string,string?>` вместо record — но record даёт OpenAPI-документацию.

---

## 7. Открытые вопросы (решить до продакшена)

- **Авторизация (IDOR).** В legacy `EnableSession=true`, но `Session` не читается, а `User`
  принимается от клиента без сверки. В Core это надо закрыть по-настоящему: cookie/JWT и
  проверка, что `User` из тела принадлежит аутентифицированному субъекту. Пока фасад
  воспроизводит старое поведение — **не выкатывать в прод без этого слоя.**
- **Пароли.** Проверить, хэширует ли `SYSTEM.SetUserPass`/`Logon` пароли на стороне БД;
  если нет — отдельная задача по хэшированию (вне транспортного слоя).
- **`GetServerDate`**: чинить ли `mm`→`MM` (меняет поведение).
- **Формат дат** `/Date()/`: подтвердить на реальных ответах, что клиенты ждут именно его.
- **Загрузка файлов/фото** (`upload.aspx`, чанки `CHUNK_SIZE`): перенести как отдельные
  эндпоинты с `IFormFile`/потоковым приёмом — паттерн здесь ещё не заложен.

---

## 8. Как собрать и запустить (у вас, с .NET 8 SDK)

```bash
cd aspnetcore
dotnet restore
dotnet build                      # первая проверка компиляции
# строка подключения — через секреты, не в файл:
cd src/Gts.Api
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:Database" "Data Source=...;Initial Catalog=GTS;User ID=gts_app;Password=***;Encrypt=True;TrustServerCertificate=True"
dotnet run                        # Swagger на /swagger
```

Проверка совместимости (пример):
```bash
curl -s -X POST http://localhost:5443/Services/App.asmx/GetPoint \
  -H "Content-Type: application/json" -d '{"User":"123"}'
# ожидаем: {"d":"[{...}]"}  — и сверяем формат с ответом боевого ASMX
```
