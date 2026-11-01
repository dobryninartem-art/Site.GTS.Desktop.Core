// ----- Разметка специальных отчетов для клиентов LEADER TEAM
// отчет визиты Perfetti
var addVisitPerfetti = {
  view: "datatable", id: "reportVisit", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.VisitDel == 'Восстановить')
        item.$css = "red_highlight";
    }
  },
  columns: [
    { id: "UserID", header: [(isEng) ? 'User ID ' : "ID Сотр", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID PVM", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "NetworkCode2", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, hidden: (localStorage.getItem('SystemLang') === 'RH' && (localStorage.getItem('CompanyID') == '1')) },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 70, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", hidden: (localStorage.getItem('SystemLang') === 'RH' && (localStorage.getItem('CompanyID') == '1')) },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Start", header: [(isEng) ? 'Start' : "Начало", { content: "textFilter" }], width: 60, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (localStorage.getItem('SystemLang') === 'RH' && ![1, 17].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "Duration", header: [(isEng) ? 'Duration' : "Длит.", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (localStorage.getItem('SystemLang') === 'RH' && ![1, 17].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "Finish", header: [(isEng) ? 'Finish' : "Окончание", { content: "textFilter" }], width: 68, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (localStorage.getItem('SystemLang') === 'RH' && ![1, 17].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "PhotoCount", header: [(isEng) ? 'Info' : "Инфо", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "string" },
    { id: "OutCode", header: ["POS ID", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Extra2", header: [(isEng) ? 'Code 1C' : "Код 1С", { content: "textFilter" }], width: 270, minWidth: 40, sort: "string", hidden: true },
    { id: "GUID", header: ["GUID", { content: "textFilter" }], width: 165, sort: "string" },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      let item = this.getItem(editor.row);
      if (editor.column == "VisitCheck" && item.IsEditVC != 1) { { return false; }; }
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      if (editor.column == "VisitCheck" && state.value != state.old) {
        var item = this.getItem(editor.row);
        const visitCheck = item.VisitCheck == 'Да' ? 1 : 0;
        item.AuthorVC = localStorage.getItem('UserName');
        $.ajax({
          url: '../../Services/Desktop.asmx/SetVisitCheck',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'GUID': item.GUID, 'IsCheck': visitCheck, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    },
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

      closeAllFilters(this);

      if (id.column == 'PhotoCount') {
        e.stopPropagation();

        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = item.Borned;
        VisitGUID = item.GUID;

        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);

        e.stopPropagation();
        return false;
      }
    }
  }
}

//Perfetti График присутствия в тт
var addPerfettiCompanyRoute = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID PVM", { content: "textFilter" }], width: 65, sort: "int" },
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 100, sort: "int", hidden: true },
    { id: "OutCode", header: ["Pos id", { content: "textFilter" }], width: 120, sort: "int" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "DayCount", header: ["Частота", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "Timing", header: ["Длит, час", { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "TimingMinutes", header: ["План, мин", { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "TypeName", header: ["Тип", { content: "selectFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "TMName", header: ["ТМ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "TMPhone", header: ["Телефон ТМ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "SuperName", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "SuperPhone", header: ["Телефон СВ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "SuperEMail", header: ["Почта СВ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "MerchName", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "MerchPhone", header: ["Телефон МЕ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Start", header: [{ text: "Дата старта обслуживания", css: "multiline" }, { content: "selectFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } , hidden: true },
    { id: "Day1", header: ["ПН", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day2", header: ["ВТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day3", header: ["СР", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day4", header: ["ЧТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day5", header: ["ПТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day6", header: ["СБ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day7", header: ["ВС", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Total", header: ["Итого", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'center' } },
    { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 250 },
    { id: "StatusName", header: ["Статус", { content: "textFilter" }], width: 80, css: { 'text-align': 'center' } },
    { id: "VacancyOpenStart", header: [{ text: "Дата открытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "VacancyOpenPlan", header: [{ text: "Плановая дата закрытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 130, css: { 'text-align': 'center' } },
    { id: "VacancyOpenFact", header: [{ text: "Фактическая дата закрытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 125, css: { 'text-align': 'center' } },
    { id: "Extra1", header: [{ text: "Код тт", css: "multiline" }, { content: "textFilter" }], width: 90 },
    { id: "Extra2", header: ["Код 1С", { content: "textFilter" }], width: 270, hidden: true  },
    { id: "Extra3", header: ["Доп 3", { content: "textFilter" }], width: 80 },
    { id: "Extra4", header: ["Доп 4", { content: "textFilter" }], width: 80 },
  ]
}

//Abbott График присутствия в тт
var addAbbottCompanyRoute = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID GTS клиента", { content: "textFilter" }], width: 95, sort: "int" },
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 100, sort: "int", hidden: true },
    { id: "OutCode", header: ["Код тт клиента", { content: "textFilter" }], width: 120, sort: "int" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "DayCount", header: ["Частота", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "Timing", header: ["Длит, час", { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "TimingMinutes", header: ["План, мин", { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "TypeName", header: ["Тип", { content: "selectFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "TMName", header: ["ТМ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "TMPhone", header: ["Телефон ТМ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "SuperName", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "SuperPhone", header: ["Телефон СВ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "SuperEMail", header: ["Почта СВ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "MerchName", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "MerchPhone", header: ["Телефон МЕ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Start", header: [{ text: "Дата старта обслуживания", css: "multiline" }, { content: "selectFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' }, hidden: true },
    { id: "Day1", header: ["ПН", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day2", header: ["ВТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day3", header: ["СР", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day4", header: ["ЧТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day5", header: ["ПТ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day6", header: ["СБ", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Day7", header: ["ВС", { content: "textFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "Total", header: ["Итого", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'center' } },
    { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 250 },
    { id: "StatusName", header: ["Статус", { content: "textFilter" }], width: 80, css: { 'text-align': 'center' } },
    { id: "VacancyOpenStart", header: [{ text: "Дата открытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 100, css: { 'text-align': 'center' } },
    { id: "VacancyOpenPlan", header: [{ text: "Плановая дата закрытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 130, css: { 'text-align': 'center' } },
    { id: "VacancyOpenFact", header: [{ text: "Фактическая дата закрытия вакансии", css: "multiline" }, { content: "selectFilter" }], width: 125, css: { 'text-align': 'center' } },
    { id: "Extra1", header: [{ text: "Код тт", css: "multiline" }, { content: "textFilter" }], width: 90 },
    { id: "Extra2", header: ["Код 1С", { content: "textFilter" }], width: 270, hidden: true },
    { id: "Extra3", header: ["Доп 3", { content: "textFilter" }], width: 80 },
    { id: "Extra4", header: ["Доп 4", { content: "textFilter" }], width: 80 },
  ]
}

//Abbott "Отчет по ассортименту (IR)"
var addAbbottAssortmentIR = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
    columns: [
    { id: "PointID", header: ["ID GTS клиента", { content: "textFilter" }], width: 65, sort: "string" },
    { id: "VisitGUID", header: ["ID визита", { content: "textFilter" }], width: 155, sort: "string" },
    { id: "Info", header: [{ text: "visit_link", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "string", template: function () { return "ссылка на визит"; }, css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "Borned", header: ["visit_date_start", { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkCode", header: ["store_id", { content: "textFilter" }], width: 65, sort: "string" },
    { id: "Address", header: ["store_name", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "NetworkName", header: ["store_type", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "NetworkCode2", header: ["external_store_id", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "PointID", header: ["external_store_id2", { content: "textFilter" }], width: 110, sort: "int" },
    { id: "OfficeName", header: ["region_name", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "ArtName", header: ["product_name", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "EAN", header: ["barcode", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "PLUCode", header: ["PLU", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "CategoryName", header: ["macro_category_name", { content: "excelFilter", mode: "text" }], width: 135, sort: "string" },
    { id: "BrandName", header: ["brand_name", { content: "excelFilter", mode: "text" }], width: 85, sort: "string" },
    { id: "ArtCompany", header: ["brand_owner_name", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "Shelf", header: ["scene_type_name", { content: "excelFilter", mode: "text" }], width: 110, sort: "string" },
    { id: "AnswerIR", header: ["facing_fact IR", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer17", header: ["facing_fact ME", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer26", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Prise", header: ["price", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Foto", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
  ],
    on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (id.column == 'Info') {

        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = item.Borned;
        VisitGUID = item.VisitGUID;

        e.stopPropagation();

        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);
      }
    }
  }
}

//Abbott Горячая линия
var addAbbottHotline = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
    columns: [
    { id: "PointID", header: ["ID GTS клиента", { content: "textFilter" }], width: 65, sort: "string" },
    { id: "Client", header: ["Клиент", { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkCode2", header: ["Код ТТ", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "OutCode", header: ["Код ТС", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "OfficeName", header: [{ text: "Региональный офис", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 120, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "NameME", header: ["МЕ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "NameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "NameTM", header: ["ТМ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "ArtName", header: ["СКУ", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "EAN", header: ["ШК", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "ActionType", header: ["Категория", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "CategoryName", header: ["Группа", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "ArtID", header: ["SKU ID", { content: "textFilter" }], width: 65, sort: "int", css: { 'text-align': 'center' } },
    { id: "PLUCode", header: ["PLU", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "ActionCategory", header: [{ text: "Категория (обращения)", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Answer", header: [{ text: "Причина (обращения)", css: "multiline" }, { content: "textFilter" }], width: 250, sort: "string" },
    { id: "Extra3", header: ["REP", { content: "textFilter" }], width: 130, sort: "string" },
    { id: "AgencyPointID", header: [{ text: "Код клиента (GTS)", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Extra4", header: ["SFDC", { content: "textFilter" }], width: 70, sort: "string" },
  ]
}

//GFD "Отчет по заполнению анкет"
var addGfdReportFillingActionsLT = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "UserID", header: ["ID МЕ", { content: "textFilter" }], width: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Мерчендайзер", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "MasterUserName", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "OfficeName", header: ["Рег.офис", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "", header: ["Область", { content: "excelFilter", mode: "text" }], width: 60, sort: "string" },
    { id: "", header: ["Район", { content: "excelFilter", mode: "text" }], width: 50, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkCode", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkCode2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 150,  sort: "string" },
    { id: "EAN", header: ["EAN", { content: "textFilter" }], width: 120, sort: "string" },
    { id: "CategoryName", header: ["Группа", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "", header: ["Суббренд", { content: "textFilter" }], width: 65, sort: "string" },
    { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "", header: [{ text: "Вариант товара", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "", header: [{ text: "Размер упаковки", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "", header: ["Доп.признак", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "NameSKU", header: ["SKU", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Borned", header: [{ text: "Дата заполнения анкеты", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [{ text: "Дата заполнения анкеты", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "FacesOMP", header: [{ text: "Количество фейсов на ОМП", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoAnswer", header: [{ text: "Фото ТСД/прайс-чекера при фиксации OOS и Вирт. остатка", css: "multiline" }, { content: "textFilter" }], width: 150, sort: "string" },
    { id: "OOS", header: [{ text: "Причина OOS для GFD", css: "multiline" }, { content: "textFilter" }], width: 150, sort: "string" },
    { id: "PointID", header: ["ID Клиента", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoAnalysis", header: [{ text: "Фото ТСД анализ", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: 'Tasks', header: ["Кол-во комментариев", { content: "textFilter" }], width: 80, css: { 'text-align': 'center', 'text-decoration': 'underline' }, sort: "int" },
    { id: 'TaskText', header: ["Комментарий к фото", { content: "textFilter" }], width: 300, sort: "string" },
  ],
  on: {
    onItemClick: function (id, e) {
      const item = this.getItem(id);
      if (item == null)
        return;
      //переход в отчет "Претензии"
      if (id.column == 'Tasks') {
        if (item.Tasks > 0) {
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
              $$('Finish').setValue(new Date(visitDate.getFullYear(), visitDate.getMonth() + 2, 0));
              $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
              $$('btnPeriod').refresh();

              const itemWindow = $$('menuUtility').getItem(68);
              if (itemWindow != null) {
                showReport(itemWindow);
                getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
              }
            },
          });
        }
      }
    }
  }
}