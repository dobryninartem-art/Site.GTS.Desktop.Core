// ----- Разметка специальных отчетов для клиентов REPHOUSE
//АБ Фасовка Отчет ЦПЭ
var addInbevReportCPE = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "OutCode", header: ["№ ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Региональный центр", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "DSM", header: ["DSM", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "TSS", header: ["TSS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Tier", header: ["Тип сети", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "FormatName", header: ["Сегмент ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Attribute17", header: [{ text: "Кол-во SKU WO СИДР", css: "multilinetable" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute18", header: [{ text: "Кол-во SKU СИДР", css: "multilinetable" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer118", header: [{ text: "Кол-во фейсов ИНБЕВ ФАКТ", css: "multilinetable" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer119", header: [{ text: "Кол-во фейсов всей категории пива ФАКТ", autoheight: true, css: "multilinetable" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute19", header: [{ text: "Представленность на Теплой полке (пиво) план", css: "multilinetable" }, { content: "textFilter" }], width: 190, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Fact", header: [{ text: "Представленность на Теплой полке (пиво) факт, %", css: "multilinetable" }, { content: "textFilter" }], width: 210, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute20", header: [{ text: "Представленность в ХО сети (пиво)", css: "multilinetable" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer19", header: [{ text: "Кол-во фейсов в небрендир. ХО ИНБЕВ ФАКТ", css: "multilinetable" }, { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer18", header: [{ text: "Кол-во фейсов в небрендир. ХО ВСЕГО ФАКТ", css: "multilinetable" }, { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "FactXO", header: [{ text: "Представленность ХО Факт %", css: "multilinetable" }, { content: "textFilter" }], width: 80, minWidth: 130, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer17", header: [{ text: "Общее кол-во СКЮ Инбев", css: "multilinetable" }, { content: "textFilter" }], width: 80, minWidth: 110, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer122", header: ["Комментарий чего не хватает", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer20", header: [{ text: "Доп.места продаж ФАКТ инбев", css: "multilinetable" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer121", header: [{ text: "Доп.места продаж ФАКТ конкуренты", css: "multilinetable" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute3", header: [{ text: "Доп.места продаж", css: "multilinetable" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute21", header: [{ text: "Кол-во дверей ХО ABI", css: "multilinetable" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute22", header: [{ text: "Представленность в подтарке (только сеть X5)", css: "multilinetable" }, { content: "textFilter" }], width: 190, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute23", header: [{ text: "Представленность в Категорийных ХО", css: "multilinetable" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute24", header: [{ text: "Кол-во дверей ХО конкурентов", css: "multilinetable" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
  ],
}

//Мултон Отчет по промо
var addBiglPromoReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ActionID", header: ["ID промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PromoQuarterStart", header: ["Quarter", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PromoMonthStart", header: ["Month", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Channel", header: ["Канал", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "SalesGroup", header: ["SG", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["Тип", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "EquipType", header: ["Тип Оборудования", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "BrandName", header: ["Brand", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionName", header: ["ДМП", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Start", header: ["Начало размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Конец размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PlanStatus", header: ["План", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Fact", header: ["Факт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Performance", header: ["Выполнение %", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "InstallessReason", header: ["Причина отсутствия", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "UserNameSV", header: ["СВ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" }
  ],
}

//Мултон Визиты План/факт
var addMoultonVisitPlanFact = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "AgencyPointID", header: ["ID тт RH", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "MasterNodeName", header: ["Ответственное лицо", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "MasterUserName", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "NodeName", header: ["Маршрут", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "UserName", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "SalesGroup", header: ["SG", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PlanVisit", header: ["Визитов(п)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "FactVisit", header: ["Визитов(ф)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DifferenceVisit", header: ["Разница", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PlanVisitTime", header: ["Часов(п)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "FactVisitTime", header: ["Часов(ф)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PlanFactProc", header: ["Ваполнение %", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DayF1", header: ["1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF2", header: ["2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF3", header: ["3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF4", header: ["4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF5", header: ["5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF6", header: ["6", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF7", header: ["7", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF8", header: ["8", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF9", header: ["9", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF10", header: ["10", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF11", header: ["11", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF12", header: ["12", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF13", header: ["13", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF14", header: ["14", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF15", header: ["15", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF16", header: ["16", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF17", header: ["17", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF18", header: ["18", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF19", header: ["19", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF20", header: ["20", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF21", header: ["21", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF22", header: ["22", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF23", header: ["23", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF24", header: ["24", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF25", header: ["25", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF26", header: ["26", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF27", header: ["27", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF28", header: ["28", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF29", header: ["29", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF30", header: ["30", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayF31", header: ["31", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Мултон Отчет по OOS
var addMoultonReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт GTS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "SalesGroup", header: ["SG", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Available", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "ReasonOOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Мултон Промо Мултон
var addMoultonReportPromo = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт GTS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ActionID", header: ["ID промо GTS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "SalesGroup", header: ["SG", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Extra1", header: ["Тип промо(PromoName)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Start", header: ["Начало промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Конец промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ActionType", header: ["Тип промо", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "IsTrue", header: ["Все фото отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ActionName", header: ["Имя промо", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Col1 ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Пользователь", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
  ],
}

//Мултон Отчет ТМ
var addMoultonReportTM = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт GTS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ActionID", header: ["ID промо GTS", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Col1 ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "SalesGroup", header: ["SG", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "", header: ["Platform", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
    { id: "", header: ["Platform detailed", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Extra1", header: ["Тип промо(PromoName)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Start", header: ["Начало промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Конец промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "IsTrue", header: ["Все фото отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "", header: ["Margeting name", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
    { id: "ActionName", header: ["Имя промо", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
  ],
}

//Мултон План/факт тайминга
var addMoultonPlanFactTiming = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Col1 ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Timing", header: [{ text: "Время план, мин", css: "multilinetable" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Duration", header: [{ text: "Время от checkin до checkout, мин", css: "multilinetable" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Distance", header: ["Начало,м", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "GEO", header: ["Гео начала", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Distance2", header: ["Окончание,м", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "GEO2", header: ["Гео окончания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ResGEO", header: ["Гео Итог", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } }
  ],
}

//Мултон Отчет по контрактному оборудованию
var addMoultonReportContractEquipment = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PointOutCode", header: ["Код Мултон", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "SalesOffice", header: ["SOf", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "QuestionExtra2", header: ["Категория", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "QuestionExtra3", header: ["Название SKU", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "NetworkType", header: ["Канал", { content: "textFilter" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date", css: { 'text-align': 'center' } },
    { id: "InstallationStatus", header: ["Статус", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ReasonAbsence", header: ["Причина отсутствия", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Мултон Тайминг Book1
var addMoultonReportTimingBook1 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Type", { content: "textFilter" }], width: 80, minWidth: 60, sort: "string" },
    { id: "OfficeName", header: ["Region", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkType", header: [{ text: "Cust.Planning Level", css: "multilinetable" }, { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Customer", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "IsPlanTime", header: ["Plan", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "IsFactTime", header: ["Fact", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Мултон Тайминг Book2
var addMoultonReportTimingBook2 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "", header: ["Type", { content: "textFilter" }], width: 80, minWidth: 60, sort: "string" },
    { id: "OfficeName", header: ["Region", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkType", header: [{ text: "Cust.Planning Level", css: "multilinetable" }, { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Customer", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Timing", header: ["Тайминг ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayCount", header: [{ text: "Кол-во визитов в неделю", css: "multilinetable" }, { content: "textFilter" }], width: 125, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 135, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
  ],
}

//Мултон RED
var addMoultonReportRED = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserID", header: ["Id сотрудника", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "UserNameSV", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "UserNameME", header: ["Cотрудник", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис Анкор", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Company", header: ["Клиент", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата регистрации и старта работы", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date" },
    { id: "PlanFactProc", header: ["% отработки за месяц исходя из план факт визитов", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "IsRouteProc", header: ["% отработки за месяц исходя из план факт календарных дней", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "", header: ["План РЕД ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "DateUnpin", header: ["Дата открепления сотрудника", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date" },
  ],
}

//Мултон Статус обучения
var addMultonLearningReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "OfficeName", header: ["Регион,  в котором оказана услуга", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "int", adjust: "header" },
    { id: "Total", header: ["Всего физ лиц (чел)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Action1", header: ["Ассортимент (чел. прошли)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Action2", header: ["ДМП (чел. прошли)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Action3", header: ["Возражения (чел. прошли)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Action4", header: ["RED аудит (чел. прошли)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
  ],
}

//Мултон Свод по задачам
var addMultonReportTasks = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Borned", header: [{ text: "Дата постановки задачи", css: "multilinetable" }, { content: "textFilter" }], width: 130, minWidth: 40, css: { 'text-align': 'center' }, sort: "date" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "UserName", header: [{ text: "Территория код/ID или кто создал задачу (логин)", css: "multilinetable" }, { content: "textFilter" }], width: 195, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["SAP-код точки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "DayTasks", header: [{ text: "Количество поставленных задач", css: "multilinetable" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CompleteTasks", header: [{ text: "Количесво выполненных задач на дату выкачки", css: "multilinetable" }, { content: "textFilter" }], width: 185, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusTask", header: [{ text: "Статус выполнения на дату выкачки", css: "multilinetable" }, { content: "textFilter" }], width: 145, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CompleteProc", header: [{ text: "% выполненных задач на дату выкачки", css: "multilinetable" }, { content: "textFilter" }], width: 180, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Черноголовка Отчет по наличию
var addChgReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer1462", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer1460", header: ["Количество фейсов ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer1461", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Черноголовка Детализация счета
var addCompanyGetAccount = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Start", header: ["С", { content: "textFilter" }], width: 84, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["По", { content: "textFilter" }], width: 84, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "DayCount", header: ["Кратность", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Timing", header: ["Тайминг", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day1",  header: ["1",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day2",  header: ["2",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day3",  header: ["3",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day4",  header: ["4",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day5",  header: ["5",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day6",  header: ["6",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day7",  header: ["7",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day8",  header: ["8",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day9",  header: ["9",  { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day10", header: ["10", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day11", header: ["11", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day12", header: ["12", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day13", header: ["13", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day14", header: ["14", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day15", header: ["15", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day16", header: ["16", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day17", header: ["17", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day18", header: ["18", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day19", header: ["19", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day20", header: ["20", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day21", header: ["21", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day22", header: ["22", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day23", header: ["23", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day24", header: ["24", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day25", header: ["25", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day26", header: ["26", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day27", header: ["27", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day28", header: ["28", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day29", header: ["29", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day30", header: ["30", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Day31", header: ["31", { content: "textFilter" }], width: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalCount", header: ["Дней", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Черноголовка Отчет ДМП
var addChgReportDMP = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DSM", header: ["Код ТТ клиента", { content: "textFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ Pra_data", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Агентство", { content: "textFilter" }], template: "Анкор", width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra2", header: ["№ Опросника", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "EquipType", header: ["Вид ДМП", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["ТИП ДМП (КУ/ПРОМО)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra1", header: ["Кол-во ДМП", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionDescription", header: ["SKU на ДМП", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Период размещения", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },

    { id: "IsVisit1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "Fact1", header: [{ text: "Итого", colspan: 7 }, "Факт 1 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact2", header: [{ text: "Итого", colspan: 7 }, "Факт 2 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact3", header: [{ text: "Итого", colspan: 7 }, "Факт 3 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact4", header: [{ text: "Итого", colspan: 7 }, "Факт 4 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact5", header: [{ text: "Итого", colspan: 7 }, "Факт 5 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlanAll", header: [{ text: "Итого", colspan: 7 }, "Итого план визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFactAll", header: [{ text: "Итого", colspan: 7 }, "Итого факт визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "", header: ["Total", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
  ],
}

//Черноголовка XO
var addChgReportXO = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО СВ Анкор", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date" },
    { id: "EquipType", header: ["Наименование оборудования", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 60, sort: "string" },
    { id: "Availabil", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonAbsence", header: ["Причина отсутствия", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//МПК Фасовка Отчет по наличию
var addMpkfasReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 90, minWidth: 40, sort: "date" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "AvailabilArt", header: ["Наличие", { content: "selectFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", },
  ],
}

//МПК Горилла Отчет по наличию
var addMpkgorReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 90, minWidth: 40, sort: "date" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "AvailabilArt", header: ["Наличие", { content: "selectFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", },
  ],
}

//Любятово Отчет по наличию
var addLubyatovoReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ID", header: ["ID ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer2271", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer2272", header: ["Количество фейсов ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer2273", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Любятово Отчет cроки годности
var addLubyatovoReportExpirationDate = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "ID", header: ["ID ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer2281", header: ["Дата окончания срока годности", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Answer2280", header: ["Кол-во с подходящим сроком ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer2282", header: ["Сообщил ответственному в тт", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Answer2283", header: ["ФИО ЛПР", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
  ],
}

//Любятово Отчет ДМП
var addLubyatovoReportDMP = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DSM", header: ["Код ТТ клиента", { content: "textFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ Pra_data", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Агентство", { content: "textFilter" }], template: "Анкор", width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra2", header: ["№ Опросника", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "EquipType", header: ["Вид ДМП", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["ТИП ДМП (КУ/ПРОМО)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra1", header: ["Кол-во ДМП", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionDescription", header: ["SKU на ДМП", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Период размещения", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },

    { id: "IsVisit1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "Fact1", header: [{ text: "Итого", colspan: 7 }, "Факт 1 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact2", header: [{ text: "Итого", colspan: 7 }, "Факт 2 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact3", header: [{ text: "Итого", colspan: 7 }, "Факт 3 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact4", header: [{ text: "Итого", colspan: 7 }, "Факт 4 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact5", header: [{ text: "Итого", colspan: 7 }, "Факт 5 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlanAll", header: [{ text: "Итого", colspan: 7 }, "Итого план визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFactAll", header: [{ text: "Итого", colspan: 7 }, "Итого факт визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "", header: ["Total", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
  ],
}

//Фортуна OOS
var addFortuneReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "ReasonOOS", header: ["Причина отсутствия", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["ФО ТСД", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID анкеты", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
  ],
}

//Фортуна Данные по SKU
var addFortuneReportArt = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer2364", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2365", header: ["Фейсов", { content: "textFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2367", header: ["Цена", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2366", header: ["Остаток", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2370", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Promo", header: ["Наличие промо", { content: "selectFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2368", header: ["Цена в промо", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Dmp", header: ["ДМП", { content: "selectFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2375", header: ["Вид ДМП", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Фото SKU", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
  ],
}

//Фортуна Мониторинг конкурентов
var addFortuneCompMonitor = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer2408", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2405", header: ["Регулярная цена", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer2404", header: ["Акционная цена", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Answer2409", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
  ],
}

//Гипопо Отчет по наличию
var addGipopoReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 90, minWidth: 40, sort: "date" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "AvailabilArt", header: ["Наличие", { content: "selectFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", },
  ],
}

//Гипопо Отчет ДМП
var addGipopoReportDMP = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DSM", header: ["Код ТТ клиента", { content: "textFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ Pra_data", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Агентство", { content: "textFilter" }], template: "Анкор", width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra2", header: ["№ Опросника", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "EquipType", header: ["Вид ДМП", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["ТИП ДМП (КУ/ПРОМО)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string"},
    { id: "ActionExtra1", header: ["Кол-во ДМП", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionDescription", header: ["SKU на ДМП", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Период размещения", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },

    { id: "IsVisit1",    header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo1",      header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment1",    header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan1",  header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact1",  header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit2",    header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo2",      header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment2",    header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan2",  header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact2",  header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit3",    header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo3",      header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment3",    header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan3",  header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact3",  header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit4",    header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo4",      header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment4",    header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan4",  header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact4",  header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit5",    header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo5",      header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment5",    header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan5",  header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact5",  header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "Fact1",        header: [{ text: "Итого", colspan: 7 }, "Факт 1 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact2",        header: [{ text: "Итого", colspan: 7 }, "Факт 2 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact3",        header: [{ text: "Итого", colspan: 7 }, "Факт 3 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact4",        header: [{ text: "Итого", colspan: 7 }, "Факт 4 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact5",        header: [{ text: "Итого", colspan: 7 }, "Факт 5 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlanAll", header: [{ text: "Итого", colspan: 7 }, "Итого план визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFactAll", header: [{ text: "Итого", colspan: 7 }, "Итого факт визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "", header: ["Total", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
  ],
}

//Черноголовка Длительные OOS
var addChgDurationOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "AgencyPointID", header: [{ text: "ID Агентства", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "Borned", header: [{ text: "Дата последнего отчета", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "date", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "PeriodWk", header: [{ text: "Период (недели)", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Availabil", header: ["Наличие", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonOOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, sort: "string", },
  ],
}

//Черноголовка Отчет ДМП конкурентов
var addChgReportCompDMP = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "AgencyPointID", header: [{ text: "ID Агентства", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "WeekNum", header: ["Неделя", { content: "textFilter" }], width: 55, sort: "int", css: { 'text-align': 'center' }  },
    { id: "Borned", header: [{ text: "Дата визита", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "date", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "UserNameSV", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "ActionName", header: [{ text: "Наименование анкеты", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "SKU", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "InStock", header: ["Наличие", { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' } },
    { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Файл", { content: "textFilter" }], width: 100, sort: "string", },
  ],
}

//Айсберри Отчет по матрице
var addIceberryReportMatrix = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "OfficeName", header: ["Рег.офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "", header: ["Область", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "", header: ["Район", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "OutCode2", header: ["Код ТС", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "EAN", header: ["EAN", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "CategoryName", header: ["Группа", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "", header: ["Суббренд", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "ArtOutCode", header: ["Код PLU", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "", header: [{ text: "Вариант товара", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "", header: [{ text: "Размер упаковки", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "", header: ["Доп.признак", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Borned", header: [{ text: "Дата заполнения анкеты", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "date", css: { 'text-align': 'center' } },
    { id: "Borned2", header: [{ text: "Дата заполнения анкеты", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "date", css: { 'text-align': 'center' } },
    { id: "SumFaces", header: [{ text: "Количество фейсов на ОМП", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo", header: [{ text: "Фото ТСД/прайс-чекера при фиксации OOS и Вирт. остатка", css: "multiline" }, { content: "textFilter" }], width: 140, sort: "string" },
    { id: "ReasonOOS", header: ["Причина OOS ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "OutCode3", header: ["ID Клиента", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PhotoAnalysis", header: [{ text: "Фото ТСД анализ", css: "multiline" }, { content: "textFilter" }], width: 150, sort: "string" },
  ],
}

//Айсберри Длительные OOS
var addIceberryDurationOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "AgencyPointID", header: [{ text: "ID Агентства", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "Borned", header: [{ text: "Дата последнего отчета", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "date", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "PeriodWk", header: [{ text: "Период (недели)", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Availabil", header: ["Наличие", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonOOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, sort: "string", },
  ],
}