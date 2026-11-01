// ----- Разметка специальных отчетов для клиентов UA

//ВинАгро "Отчет по мониторингу"
var addVinagroReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Area", header: ["Область", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "City", header: ["Город", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "FactName", header: ["Фактическое название", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Adress", header: ["Адрес", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "UserName", header: ["Аудитор", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string", adjust: "header" },
    { id: "Borned", header: ["Дата посещения", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Start", header: ["Начало визита", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "Finish", header: ["Конец визита", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "Duration", header: ["Продолжительность", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "Department", header: ["Торговый отдел", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Representation", header: ["Представленность", { content: "textFilter" }], width: 80, minWidth: 30, sort: "int", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "Standart", header: ["Стандарт", { content: "textFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "CountSKU", header: ["Количество SKU", { content: "textFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "CategoryPoint", header: ["Категория ТТ", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 160, minWidth: 30, sort: "string", adjust: "header" }
  ],
}

//ВинАгро "Анализ цен"
var addVinagroPriceReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", adjust: "header" },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", adjust: "header" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", adjust: "header" },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", adjust: "header" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", adjust: "header" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "UserName", header: ["Аудитор", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Borned", header: ["Дата посещения", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", adjust: "header" },
    { id: "Answer", header: ["Факт цены", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", adjust: "header" },
    { id: "Price", header: ["РРЦ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "int", adjust: "header" },
    { id: "DifferencePrice", header: ["Разница", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", adjust: "header" },
    { id: "Percents", header: ["% превышения/занижения", { content: "textFilter" }], width: 100, minWidth: 70, sort: "int", css: { 'text-align': 'center' }, adjust: "header", cssFormat: function (value) { return value > 0 ? "red_highlight" : value < 0 ? "blue_highlight" : undefined; } }
  ],
}

//ВинАгро "Эффективность Сотрудников"
var addVinagroStaffPerformance = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
    { id: "CountVisits", header: ["Количество визитов", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
    { id: "AVGPerPhoto", header: ["Среднее время просмотра, с", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "MinTimeUA", header: ["Начало смены UTC +2", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "MaxTimeUA", header: ["Окончание смены UTC +2", { content: "textFilter" }], width: 160, minWidth: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "MinTime", header: ["Начало смены UTC +3", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "MaxTime", header: ["Окончание смены UTC +3", { content: "textFilter" }], width: 160, minWidth: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "TasksPercents", header: ["Процент выполненных задач", { content: "textFilter" }], width: 80, minWidth: 30, sort: "int", css: { 'text-align': 'center' } }
  ],
}

//ВинАгро "Наличие товара"
var addVinagroReportStock = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "UserID", header: ["UserID", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["МЕ", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "PointID", header: ["PointID", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "OutCode", header: ["КодТТ", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "Name", header: ["Название ТТ", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "ArtID", header: ["ArtID", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
    { id: "ArtName", header: ["Название SKU", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
    { id: "InMatrix", header: ["В матрице", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } },
    { id: "InStock", header: ["Факт", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["% OOS", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } }
  ],
}

//ВинАгро "Рейтинг ТТ"
var addVinagroRatingStockPoints = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "UserID", header: ["UserID", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["МЕ", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "PointID", header: ["PointID", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "OutCode", header: ["КодТТ", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "Name", header: ["Название ТТ", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "InMatrix", header: ["В матрице", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } },
    { id: "InStock", header: ["Факт", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["% OOS", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "0.00" },
    { id: "Rating", header: ["Рейтинг", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", css: { 'text-align': 'center' } }
  ],
  on: {
    onItemClick: function (id) {

      if (id.column == 'Address') {

        var item = this.getItem(id);
        if (item.PointID == '') return;

        $.ajax({
          url: '../../Services/Report.asmx/SetPointVisit',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Status': 1 }),
          success: function (data) {
            setFilterCount();

            var itemWindow = $$('menuUtility').getItem(101);
            if (itemWindow != null) {
              showReport(itemWindow);
              getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });

      }
    }
  },
}


//ВинАгро "Рейтинг SKU"
var addVinagroRatingStockArts = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "ArtID", header: ["ArtID", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 250, minWidth: 200, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "EAN", header: ["Штрих код", { content: "textFilter" }], width: 140, minWidth: 140, sort: "int", exportType: 'number', exportFormat: "#" },
    { id: "Rating", header: ["Рейтинг", { content: "textFilter" }], width: 70, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CountAudit", header: ["Количество аудитов", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["% OOS", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "OutStock", header: ["Количество OOS", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' } }
  ],
  on: {
    onItemClick: function (id) {

      if (id.column == 'ArtName') {

        var item = this.getItem(id);
        if (item.ArtID == '') return;

        $.ajax({
          url: '../../Services/Report.asmx/SetArtVisit',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Art': item.ArtID, 'Status': 1 }),
          success: function (data) {
            setFilterCount();

            var itemWindow = $$('menuUtility').getItem(101);
            if (itemWindow != null) {
              showReport(itemWindow);
              getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });
      }
    }
  },
}


//ВинАгро "Мониторинг цен по сетям"
var addVinagroNetworkPriceReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.DiffResult == 'завышение')
        item.$css = "red_highlight";
      if (item.DiffResult == 'занижение')
        item.$css = "blue_highlight";
    }
  },
  columns: [
    { id: "ArtID", header: ["SKU ID", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "FactPrice", header: ["Факт цена ", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "MaxPrice", header: ["РРЦ max", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "MinPrice", header: ["РРЦ min", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "DiffPrice", header: ["Разница", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "DiffPercents", header: ["Процент отличия", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "DiffResult", header: ["Результат", { content: "selectFilter" }], width: 100, minWidth: 40, sort: "string" }
  ],
}

//ВинАгро "Учет визитов"
var addVinagroVisit = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "UserID", header: [(isEng) ? 'User ID' : "ID Сотрудника", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Out Code' : "Код АСУ", { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'right' } },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string", exportType: 'string' }
  ],
}

//ВинАгро "Отчет по задачам"
var addVinagroTasksReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "OfficeName", header: ["Область", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "UserName", header: ["Аудитор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "ActionName", header: ["Торговый отдел", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "CategoryName", header: ["Группа", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "EAN", header: ["Штрих-код", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", exportType: 'number', exportFormat: "#" },
    { id: "ArtName", header: ["Наименование SKU", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Answer", header: ["Присутствует", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//ВинАгро "Выполнение задач"
var addVinagroTasksReportGeneral = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "AllPoints", header: ["Количество совершенных визитов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "InStockPoints", header: ["Количество визитов в которых есть бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["% присутствия в посещённых ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PercentsRequired", header: ["Должно присутствовать в ТТ %", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "TaskPercent", header: ["% выполнения задачи", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } }
  ],
  on: {
    onItemClick: function (id) {
      if (id.column == 'BrandName') {

        var item = this.getItem(id);
        if (item.BrandID == '') return;

        //сброс текущего фильтра
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "ArtBrand", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });

        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': 'ArtBrand', 'User': localStorage.getItem('Author'), 'Text': item.BrandID }),
          success: function (data) {
            setFilterCount();

            var itemWindow = $$('menuUtility').getItem(106);
            if (itemWindow != null) {
              showReport(itemWindow);
              getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
          error: function (xhr, ajaxOptions, thrownError) { }
        });
      }
    }
  },
}

//ВинАгро "Нумерическая дистрибуция"
var addVinagroNumericalDistribution = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "ActionName", header: ["Анкета", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "Visits", header: ["Всего посещено ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Answers", header: ["ТТ в которых есть СКЮ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Distrib", header: ["Дистрибуция %", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
  ],
  on: {
    //переход в отчет "Нум.дистр.список" с фильтром по анкетам
    onItemClick: function (id) {
      if (id.column == 'ActionName') {
        var item = this.getItem(id);
        if (item.ActionID == '' || item.ActionID == 0) return;
        //сброс текущего фильтра анкет
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "ArtReport", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });
        //выбор анкеты в фильтре
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "ArtReport", 'User': localStorage.getItem('Author'), 'Text': item.ActionID }),
          success: function (data) {
            setFilterCount();

            var itemWindow = $$('menuUtility').getItem(110);
            if (itemWindow != null) {
              showReport(itemWindow);
              getPivotData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
          error: function (xhr, ajaxOptions, thrownError) { }
        });
      }
    }
  },
}

//ВинАгро "Качественная дистрибуция"
var addVinagroQualitativeDistribution = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "CategoryName", header: ["Группа", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "Visits", header: ["Всего посещено ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "AllSKU", header: ["Всего СКЮ в группе", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "AvailabSKU", header: ["Всего присутсвует СКЮ группы", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "AverageSKU", header: ["Среднее к-во СКЮ в ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
  ],
  on: {
    //переход в отчет "Нум.дистр.список" с фильтром по категории
    onItemClick: function (id) {
      if (id.column == 'CategoryName') {
        var item = this.getItem(id);
        if (item.ActionID == '' || item.ActionID == 0) return;
        //сброс текущего фильтра категорий
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "ArtCategory", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });
        //выбор категории в фильтре
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "ArtCategory", 'User': localStorage.getItem('Author'), 'Text': item.CategoryID }),
          success: function (data) {
            setFilterCount();

            var itemWindow = $$('menuUtility').getItem(110);
            if (itemWindow != null) {
              showReport(itemWindow);
              getPivotData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
          error: function (xhr, ajaxOptions, thrownError) { }
        });
      }
    }
  },
}

//Альбакор-Клион "Доля полки"
var addAlbacoreReportPartShelf = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["МE", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "PointID", header: ["Код ТТ", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["Категория", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "FacingCompany", header: ["Кол-во фейсов компании", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "FacingCategory", header: ["Кол-во фейсов категории", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "SKUCompany", header: ["Количество SKU компании", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "SKUCategory", header: ["Количество SKU категории", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "PercentsFacing", header: ["Доля полки", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "PercentsSKU", header: ["Доля SKU", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Execution", header: ["Выполнение", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value == 'Нет' ? "red_highlight" : undefined; } },
  ],
}

//Valesto "Отчет по категорям"
var addValestoReportCategory = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата звіту", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Місто", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Name", header: ["Вивіска", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адреса", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "UserName", header: ["Співробітник", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "PlanZNF", header: [{ text: "План SKU ЗНФ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactZNF", header: [{ text: "Факт SKU ЗНФ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "DiffZNF", header: ["Відхилення ЗНФ", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcZNF", header: ["Відхилення % ЗНФ", { content: "textFilter" }], width: 85, sort: "int", css: { 'text-align': 'center' } },
    { id: "PlanHBV", header: [{ text: "План SKU ХБВ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactHBV", header: [{ text: "Факт SKU ХБВ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "DiffHBV", header: ["Відхилення ХБВ", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcHBV", header: ["Відхилення % ХБВ", { content: "textFilter" }], width: 85, sort: "int", css: { 'text-align': 'center' } },
    { id: "PlanVTM", header: [{ text: "План SKU ВТМ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactVTM", header: [{ text: "Факт SKU ВТМ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "DiffVTM", header: ["Відхилення ВТМ", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcVTM", header: ["Відхилення % ВТМ", { content: "textFilter" }], width: 85, sort: "int", css: { 'text-align': 'center' } },
  ],
  on: {
    //переход в отчет "Отчет по категорям Детализацияк" с фильтром по тт/дате
    onItemClick: function (id) {
      const item = this.getItem(id);
      if (id.column == 'Address' && item.PointID !== -1) {
        //сброс текущего фильтра тт
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });
        //выбор тт в фильтре
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': item.PointID }),
          success: function (data) {
            setFilterCount();
            let visitDate = new Date(item.Borned.split('.').reverse().join('-'));
            //от даты визита до конца следующего месяца
            $$('Start').setValue(visitDate);
            $$('Finish').setValue(visitDate);
            $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
            $$('btnPeriod').refresh();

            const itemWindow = $$('menuUtility').getItem(1126);
            if (itemWindow != null) {
              showReport(itemWindow);
              getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
            }
          },
        });
      }
    }
  },
}

//Valesto "Отчет по категорям Детализация"
var addValestoReportCategoryDetail = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата звіту", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Місто", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Name", header: ["Вивіска", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адреса", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "UserName", header: ["Співробітник", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ArtName", header: ["СКЮ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Answer9309", header: ["Чому немає продукції", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Answer9310", header: ["Дні доставки", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Answer9509", header: ["Коментар", { content: "textFilter" }], width: 200, sort: "string" },
  ],
}

