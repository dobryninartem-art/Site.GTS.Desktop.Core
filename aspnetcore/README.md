# Gts.Api — порт GTS на ASP.NET Core Web API

Фундамент миграции legacy ASMX-сайта (`/source`, .NET Framework 4.8) на ASP.NET Core 8.
Делается подходом *strangler fig*: новый API поднимается рядом и совместим с текущими
клиентами, перенос методов идёт по частям.

**Ключевое:** API сохраняет контракт ASMX (`POST /Services/{Сервис}.asmx/{Метод}`,
JSON-объект параметров, ответ в обёртке `{"d": ...}`), поэтому **мобильные приложения
(Android/iPhone) переписывать не нужно** — см. подробности и статус в [MIGRATION.md](./MIGRATION.md).

Статус: эталон на сервисах `System` и `App`. Код не собран в среде подготовки
(нет .NET SDK/SQL Server) — сборку и тесты против БД выполнить у себя.

## Структура
- `src/Gts.Api/Infrastructure` — async-слой БД + совместимая сериализация
- `src/Gts.Api/Compatibility` — конверт `{"d": ...}`
- `src/Gts.Api/Services` — бизнес-логика (порты `*Business`)
- `src/Gts.Api/Controllers` — ASMX-совместимые маршруты
- `src/Gts.Api/Security` — фикс безопасного пути к фото

## Запуск
См. раздел 8 в [MIGRATION.md](./MIGRATION.md).

## Безопасность
Строка подключения и любые секреты — только через переменные окружения / User Secrets.
В репозитории секретов нет. Отдельно необходимо сменить засвеченные в legacy пароли
(`sa` в `source/Web.config`, SMS-шлюз в `source/App_Code/smsc_api.cs`).
