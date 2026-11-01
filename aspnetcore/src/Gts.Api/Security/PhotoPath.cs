namespace Gts.Api.Security;

/// <summary>
/// Безопасное разрешение пути к фото внутри каталога Photos.
///
/// ЧИНИТ уязвимость legacy System.GetPhotoBase64: там путь строился как
/// MapPath("/") + значение_от_клиента, что допускало обход каталога (../../)
/// и чтение произвольных файлов сервера. Здесь любой путь нормализуется и
/// проверяется, что он не выходит за пределы разрешённого корня Photos.
/// </summary>
public static class PhotoPath
{
    /// <summary>
    /// Возвращает абсолютный путь к файлу, если он лежит внутри <paramref name="photosRoot"/>,
    /// иначе null. Принимает как относительные пути, так и полные URL с ".../Photos/...".
    /// </summary>
    public static string? ResolveWithin(string photosRoot, string requested)
    {
        if (string.IsNullOrWhiteSpace(requested))
            return null;

        // Если прислали URL — берём хвост начиная с "Photos".
        int idx = requested.IndexOf("Photos", StringComparison.OrdinalIgnoreCase);
        string relative = idx >= 0 ? requested[idx..] : requested;

        relative = relative.Replace('\\', '/').TrimStart('/');

        // Отрезаем ведущий сегмент "Photos", т.к. он уже есть в photosRoot.
        if (relative.StartsWith("Photos/", StringComparison.OrdinalIgnoreCase))
            relative = relative["Photos/".Length..];

        var rootFull = Path.GetFullPath(photosRoot);
        var candidate = Path.GetFullPath(Path.Combine(rootFull, relative));

        // Главная проверка: итоговый путь обязан быть ВНУТРИ корня.
        var rootWithSep = rootFull.EndsWith(Path.DirectorySeparatorChar)
            ? rootFull
            : rootFull + Path.DirectorySeparatorChar;

        if (!candidate.StartsWith(rootWithSep, StringComparison.OrdinalIgnoreCase))
            return null;

        return candidate;
    }
}
