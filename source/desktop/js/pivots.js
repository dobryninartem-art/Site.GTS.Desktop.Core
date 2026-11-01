// ----- Разметка сводных таблиц

// отчет Визиты план-факт
var distipline = {
  view: "pivot-load", mode: "table", locale: { lang: "ru" }, url: "", 
  datatable: {
    minX: false,
    maxX: false,
    footer: true,
    cleanRows: false,
    totalColumn: true,
    columnWidth: 36,
  },
  override: new Map([
    [pivot.services.Backend, MyBackend],
    [pivot.views.table, Table],
    [pivot.services["LocalData"], Local]
  ]),
  predicates: {
    date: webix.Date.dateToStr("%d.%m.%Y")
  }
}

var distipline_structure = {
  rows: ["ID","OutCode", "OfficeName", "CityName", "NetworkName", "Address", "CompanyName", "Percents", "SumVisitPlan", "SumVisitFact"],
  columns: ["Borned"],
  values: [
    { name: "VisitPlan", operation: "sum" },
    { name: "VisitFact", operation: "sum" }
  ],
  filters:
    [
      { name: "OfficeName" },
      { name: "CityName" },
      { name: "NetworkName" },
      { name: "Name" },
      { name: "Address" },
      { name: "CompanyName" }
    ],
  rowTotals: true
};

var distipline_field = [
  { id: "ID", value: "ID ТТ", type: "number", width: 50 },
  { id: "OutCode", value: "Код АСУ", type: "text", width: 100},
  { id: "OfficeName", value: "Офис", type: "text", width: 100 },
  { id: "CityName", value: "Город", type: "text", width: 100 },
  { id: "NetworkName", value: "Сеть", type: "text", width: 90 },
  { id: "Name", value: "Вывеска", type: "text", width: 80 },
  { id: "Address", value: "Адрес", type: "text", width: 260 },
  { id: "CompanyName", value: "Компания", type: "text", width: 80 },
  { id: "Percents", value: "%", type: "number", width: 40 },
  { id: "SumVisitPlan", value: "Итого план", type: "number", width: 40 },
  { id: "SumVisitFact", value: "Итого факт", type: "number", width: 40 },
  { id: "Borned", value: "Дата", type: "text", width: 50 },
  { id: "VisitPlan", value: "План", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
  { id: "VisitFact", value: "Факт", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
];


// отчет Маршруты по сотрудникам
var disciplineUsers = {
  view: "pivot-load", mode: "table", locale: { lang: "ru" }, url: "", 
  datatable: {
    minX: false,
    maxX: false,
    footer: true,
    cleanRows: false,
    totalColumn: true,
    columnWidth: 36,
  },
  override: new Map([
    [pivot.services.Backend, MyBackend],
    [pivot.views.table, Table],
    [pivot.services["LocalData"], Local]
  ]),
  predicates: {
    date: webix.Date.dateToStr("%d.%m.%Y")
  }
}

var disciplineUsers_structure = {
  rows: ["ID", "OfficeName", "CityName", "NetworkName", "Address", "CompanyName", "UserName", "Percents", "SumVisitPlan", "SumVisitFact"],
  columns: ["Borned"],
  values: [
    { name: "VisitPlan", operation: "sum" },
    { name: "VisitFact", operation: "sum" }
  ],
  filters:
    [
      { name: "OfficeName" },
      { name: "CityName" },
      { name: "NetworkName" },
      { name: "Name" },
      { name: "Address" },
      { name: "CompanyName" },
      { name: "UserName" },
      { name: "MasterName" },
    ],
  rowTotals: true
};

var disciplineUsers_field = [
  { id: "ID", value: "ID ТТ", type: "number", width: 50 },
  { id: "OfficeName", value: "Офис", type: "text", width: 100 },
  { id: "CityName", value: "Город", type: "text", width: 100 },
  { id: "NetworkName", value: "Сеть", type: "text", width: 90 },
  { id: "Name", value: "Вывеска", type: "text", width: 80 },
  { id: "Address", value: "Адрес", type: "text", width: 260 },
  { id: "CompanyName", value: "Компания", type: "text", width: 80 },
  { id: "UserName", value: "Сотрудник", type: "text", width: 80 },
  { id: "MasterName", value: "Руководитель", type: "text", width: 80 },
  { id: "Percents", value: "%", type: "number", width: 40 },
  { id: "SumVisitPlan", value: "Итого план", type: "number", width: 40 },
  { id: "SumVisitFact", value: "Итого факт", type: "number", width: 40 },
  { id: "Borned", value: "Дата", type: "text", width: 50 },
  { id: "VisitPlan", value: "План", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
  { id: "VisitFact", value: "Факт", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
];


// отчет Стандартный сводная таблица
var reportStandartPivot = {
  view: "pivot-load", mode: "table", locale: { lang: "ru" }, url: "",
  datatable: {
    minX: false,
    maxX: false,
    footer: false,
    cleanRows: false,
    totalColumn: false,
  },
  override: new Map([
    [pivot.services.Backend, MyBackend],
    [pivot.views.table, Table],
    [pivot.services["LocalData"], Local]
  ]),
  predicates: {
    date: webix.Date.dateToStr("%d.%m.%Y")
  }
}

var reportStandartPivot_structure = {
  rows: ["PointID", "OfficeName", "CityName", "NetworkName", "Address", "UserName", "Borned"],
  columns: ["ActionName", "ArtName", "QuestionName"],
  values: [{ name: "Answer", operation: "any" }],
  filters:
    [
      { name: "OutCode" }, { name: "Name" }, { name: "RoleName" }, { name: "MasterName" },
      { name: "ArtCategoryName" }, { name: "ArtBrandName" }, { name: "Code" }, { name: "PLUCode" },
      { name: "CompanyName" }
    ]
};

var reportStandartPivot_field = [
  { id: "PointID", value: "ID ТТ", type: "number", width: 50 },
  { id: "OutCode", value: "Код ТТ", type: "text", width: 60 },
  { id: "OfficeName", value: "Офис", type: "text", width: 80 },
  { id: "CityName", value: "Город", type: "text", width: 80 },
  { id: "NetworkName", value: "Сеть", type: "text", width: 80 },
  { id: "Name", value: "Вывеска", type: "text", width: 80 },
  { id: "Address", value: "Адрес", type: "text", width: 160 },
  { id: "UserName", value: "Сотрудник", type: "text", width: 80 },
  { id: "RoleName", value: "Должность", type: "text", width: 80 },
  { id: "MasterName", value: "Руководитель", type: "text", width: 80 },
  { id: "Borned", value: "Дата", type: "string", width: 70 },
  { id: "ArtCategoryName", value: "Тов. группа", type: "text", width: 60 },
  { id: "ArtBrandName", value: "Бренд", type: "text", width: 60 },
  { id: "ArtName", value: "SKU", type: "text", width: 60 },
  { id: "Code", value: "Код SKU", type: "text", width: 60 },
  { id: "PLUCode", value: "PLU", type: "text", width: 60 },
  { id: "CompanyName", value: "Компания", type: "text", width: 60 },
  { id: "ActionName", value: "Анкета", type: "text", width: 60 },
  { id: "QuestionName", value: "Вопрос", type: "text", width: 60 },
  { id: "Answer", value: "Ответ", type: "text", format: webix.Number.numToStr({ decimalSize: 0 }), width: 100 },
];

//ВинАгро "Нумерическая дистрибуция список"
var addVinagroNumericalDistributionList = {
  view: "pivot-load", mode: "table", locale: { lang: "ru" }, url: "",
  datatable: {
    minX: false,
    maxX: false,
    footer: false,
    cleanRows: false,
    columnWidth: 100,
  },
  override: new Map([
    [pivot.services.Backend, MyBackend],
    [pivot.views.table, Table],
    [pivot.services["LocalData"], Local]
  ]),
  predicates: {
    date: webix.Date.dateToStr("%d.%m.%Y")
  }
};

var addVinagroNumericalDistributionList_structure = {
  rows: ["PointID", "OfficeName", "CityName", "NetworkName", "Name", "Address"],
  columns: ["ArtName"],
  values: [
    { name: "Answer", operation: "max" },
  ],
  filters: [
    { name: "OfficeName" },
    { name: "CityName" },
    { name: "NetworkName" },
    { name: "Name" },
    { name: "Address" },
    { name: "ArtName" },
  ],
};

var addVinagroNumericalDistributionList_field = [
  { id: "PointID", value: "ID", type: "number", width: 50 },
  { id: "OfficeName", value: "Офис", type: "text", width: 100 },
  { id: "CityName", value: "Город", type: "text", width: 100 },
  { id: "NetworkName", value: "Сеть", type: "text", width: 90 },
  { id: "Name", value: "Вывеска", type: "text", width: 80 },
  { id: "Address", value: "Адрес", type: "text", width: 250 },
  { id: "ArtName", value: "SKU", type: "text", width: 250 },
  { id: "Answer", value: "", type: "number", width: 250 },
];