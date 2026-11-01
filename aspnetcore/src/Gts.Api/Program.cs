using Gts.Api.Infrastructure;
using Gts.Api.Services;
using Microsoft.AspNetCore.Mvc; // AddJsonOptions

var builder = WebApplication.CreateBuilder(args);

// --- Сервисы ---
builder.Services.AddControllers()
    .AddJsonOptions(o =>
    {
        // Мобильные шлют ключи в том же регистре, что и имена параметров (Phone/Pass/User),
        // но на всякий случай делаем связывание регистронезависимым.
        o.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

// Слой доступа к данным. Строка подключения — ТОЛЬКО из окружения/секретов.
builder.Services.AddScoped<IDatabase, SqlDatabase>();

// Бизнес-сервисы (порты *Business).
builder.Services.AddScoped<SystemService>();
builder.Services.AddScoped<AppService>();

// OpenAPI/Swagger — то, чего не было у ASMX.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- Конвейер ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // В проде — редирект на https (в legacy он был закомментирован в web.config).
    app.UseHttpsRedirection();
}

app.MapControllers();

app.Run();
