// ----- Разметка специальных отчетов для клиентов

//Отчет Магнит для компании Заказчик
var addMagnitReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Borned", header: ["Дата посещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Филиал", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "PointName", header: ["ММ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "PointCode", header: ["КодММ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["Мерчендайзер", { content: "excelFilter", mode: "text" }], width: 170, minWidth: 40, sort: "string" },
    { id: "ArtCode", header: ["КодТовара", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["НазваниеТовара", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "IsOSAName", header: ["Товар присутствует на полке (OSA Магнит)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "IsStockName", header: ["Риск виртуального стока", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OSAFact", header: ["Корректность OSA (факт)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "VirtAnswer", header: ["Обнаруженный виртуальный сток, шт", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsEmpty", header: ["Товар полностью отсутствует в магазине", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "What", header: ["Причина", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Stock", header: ["Остаток", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "VirtAnswer1", header: ["ТСД", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockAnswer", header: ["Факт", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
  ]
}

//Шторк "База с привязками"
var addStorckReportMainME = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "MainME", header: ["Основной мерчендайзер", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ME", header: ["Закрепленный мерчендайзер", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 40, sort: "string" },
    { id: "Freelancer", header: ["Самозанятый мерчендайзер", { content: "excelFilter", mode: "text" }], width: 180, minWidth: 40, sort: "string" },
    { id: "KAE", header: ["Закрепленный КАЕ", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 40, sort: "string" },
    { id: "TSM", header: ["Закрепленный TSM", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 40, sort: "string" },
    { id: "RSM", header: ["Закрепленный RSM", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 40, sort: "string" },
    { id: "PCT", header: ["Ставит ли РСМ/ТСМ стойки", { content: "excelFilter", mode: "text" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Да', 'Нет'] },
    { id: "AuthorPCT", header: ["Кто внес изменения/корректировки", { content: "excelFilter", mode: "text" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "BornedPCT", header: ["Дата последней корректировки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Responsible", header: ["Ответственный за локацию", { content: "excelFilter", mode: "text" }], width: 170, minWidth: 40, sort: "string" },
    { id: "ResponsibleEmail", header: ["Эл.адрес Ответственного за локацию", { content: "textFilter" }], width: 175, minWidth: 40, sort: "string" },
    { id: "ResponsiblePhone", header: ["Телефон Ответственного за локацию", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Status", header: ["Город проживания/командировочная", { content: "textFilter" }], width: 255, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Командировочная', 'Проживание',''] },
    { id: "AuthorStatus", header: ["Кто внес изменения/корректировки", { content: "excelFilter", mode: "text" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "BornedStatus", header: ["Дата последней корректировки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ContPers", header: ["Контактное лицо", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "ContPersEmail", header: ["Эл.адрес контактного лица", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ContPersPhone", header: ["Телефон контактного лица", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      var item = this.getItem(editor.row);
      if ((editor.column == "PCT" && item.IsEditPCT == 0) || (editor.column == "Status" && item.IsEditStatus == 0)) { return false; } // Запретить редактирование ячейки
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        var question;
        var option;
        var answer = null;
        //сохранение "Ставит ли РСМ/ТСМ стойки"
        if (editor.column == 'PCT') {
          switch (item.PCT) {
            case 'Нет': option = 1; break;
            case 'Да': option = 2; break;
          }
          question = 1
          item.AuthorPCT = localStorage.getItem('UserName');
          item.BornedPCT = 'Сегодня';
        }
        //сохранение "Город проживания/командировочная"
        if (editor.column == 'Status') {
          switch (item.Status) {
            case 'Командировочная': option = 1; break;
            case 'Проживание': option = 2; break;
            default: option = -1, answer = ''; break;
          }
          question = 2
          item.AuthorStatus = localStorage.getItem('UserName');
          item.BornedStatus = 'Сегодня';
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': null, 'Borned': null, 'Action': null, 'Art': null, 'Question': question, 'Option': option, 'Answer': answer, 'Company': localStorage.getItem('CompanyID'), 'Report': 235, 'Author': localStorage.getItem('Author') }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//Шторк "Отчет Дикси (желтые ценники)"
var addStorckReportDiksi = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Extra4", header: [{ text: "Film title", css: "header" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["Наименование SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string", editor: "text" }
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      // сохранение коментария
      if (state.value != state.old && editor.column == 'Comments') {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 104251, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//Шторк "Отчет для HR"
var addStorkReportForHR = {  
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Office", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "City", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["ID Анкор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "UserName", header: ["ФИО сотрудника", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "SumDurationNKA", header: ["Время NKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumDurationLKA", header: ["Время LKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PercentNKA", header: ["% NKA", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "PercentLKA", header: ["% LKA", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumDurationOffice", header: ["Время в точке Офис", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ]
}

//Шторк "Отчет для проверяющих"
var addStorckReportAuditors = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "UserAP", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Answer", header: ["Замечание", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string" },
    { id: "UserName", header: ["Проверяющий", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 150, minWidth: 100, sort: "string", editor: "text" }
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);

      // сохранение коментария
      if (state.value != state.old && editor.column == 'Comments') {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 88023, 'Art': -1, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
          success: function (data) {
          },
          error: function (xhr, ajaxOptions, thrownError) {
            onError();
          }
        });
      }
    }
  }
}

//Шторк "Отчет для ТМ"
var addStorckReportForTM = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Manager", header: ["Ответственный менеджер", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "EAN", header: ["Номенклатурный номер", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtNameNew", header: ["ПОСМ", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Distributor", header: ["Дистрибьютор", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },
    { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActionType", header: ["Согласно АП ЦО/Самостоятельно", { content: "textFilter" }], width: 210, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО сотрудника", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Start", header: ["Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Окончание периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 90, minWidth: 40, editor: "string", css: { 'text-align': 'center' } },
    { id: "UserName2", header: ["Ответственный за локацию", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 140, editor: "string", css: { 'text-align': 'center' } },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
  ]
}

//Шторк "Отчет ДМП (торцы Перекресток)"
var addStorckPerecrestokDMP = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["Наименование SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string", editor: "text" }
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      // сохранение коментария
      if (state.value != state.old && editor.column == 'Comments') {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 104250, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//Шторк "Отчет по браку"
var addStorckReportForDefect = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9016", header: ["Наименование оборудования", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Photo9586", header: ["Фото бракованной детали", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10052", header: ["Фото бракованной детали №2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10163", header: ["Фото бракованной детали №3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10190", header: ["Фото маркировки короба", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo9587", header: ["Фото инструкции по сборке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer10046", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }},
    { id: "Answer9585", header: ["Описание проблемы", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Answer9584", header: ["Факт установки", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9588", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    {
      id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 200, minWidth: 40, editor: "select", css: { 'text-align': 'center' },
      options: ['Да', 'Нет', 'Некорректное фото', 'Некорректное количество стоек', 'Некорректная дата установки', 'Некорректная дата окончания установки', 'Некорректное название стойки']
    },
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);

      if (state.value != state.old && editor.column == 'VerificationStatus') {
        var status = 10
        switch (item.VerificationStatus) {
          case 'Нет': status = 0; break;
          case 'Да': status = 1; break;
          case 'Некорректное фото': //при выборе ответа "некорректное фото" отправляется задание к фото
            webix.modalbox({
              title: "Подтвердите действие",
              buttons: ["Да", "Нет"],
              text: "Отправить задачу?",
              callback: function (result) {
                switch (result) {
                  case '0':
                    webix.message("Задача отправлена");
                    status = 2;
                    if (item.PhotoID9586 != null && item.PhotoID9586 != -1) {
                      send2('SetPhotoCheck', { 'ID': item.PhotoID9586, 'Status': status, 'User': localStorage.getItem('Author') });

                      item.VerificationStatus = 'Некорректное фото';
                      item.VerificationDate = 'Сегодня';

                      var GUID = +new Date;
                      // отправка задания
                      send2('SetTask', { 'Author': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': item.UserID, 'Text': 'Некорректное фото', 'GUID': GUID, 'PhotoID': item.PhotoID9586 });
                    };
                    break;
                  case '1':
                    webix.message("Отмена");
                    item.VerificationStatus = '';
                    break;
                }
              }
            });
            break;
          case 'Некорректное количество стоек': status = 3; break;
          case 'Некорректная дата установки': status = 4; break;
          case 'Некорректная дата окончания установки': status = 5; break;
          case 'Некорректное название стойки': status = 6; break;
        };

        if (item.PhotoID9586 != null && item.PhotoID9586 != -1 && status != 10) {

          send2('SetPhotoCheck', { 'ID': item.PhotoID9586, 'Status': status, 'User': localStorage.getItem('Author') });

          switch (status) {
            case 0: item.VerificationStatus = 'Нет'; break;
            case 1: item.VerificationStatus = 'Да'; break;
            case 2: item.VerificationStatus = 'Некорректное фото'; break;
            case 3: item.VerificationStatus = 'Некорректное количество стоек'; break;
            case 4: item.VerificationStatus = 'Некорректная дата установки'; break;
            case 5: item.VerificationStatus = 'Некорректная дата окончания установки'; break;
            case 6: item.VerificationStatus = 'Некорректное название стойки'; break;
          }
          item.VerificationDate = 'Сегодня';
        }
      }
    }
  }
}

//Шторк "Отчета по задачам"
var addStorckTaskReport = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 15, rowHeight: 78, leftSplit: 9,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "ActionName", header: ["№ задачи, формулировка задачи", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID Анкеты", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo9133", header: [{ text: "Cсылка на фото 1", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo9134", header: [{ text: "Cсылка на фото 2", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo9135", header: [{ text: "Cсылка на фото 3", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo9136", header: [{ text: "Cсылка на фото 4", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo9137", header: [{ text: "Cсылка на фото 5", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo7677", header: [{ text: "Cсылка на фото 6", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo7678", header: [{ text: "Cсылка на фото 7", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "Photo7679", header: [{ text: "Cсылка на фото 8", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 20, sort: "string" },
    { id: "VerificationAuthor", header: [{ text: "ФИО Проверяющего", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VerificationStatus", header: [{ text: "Отметка о проверке", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", editor: "select", options: ['0', '1', 'П+', '2', '3', '4', '5', '6', '7', '8', '9', '10'], css: { 'text-align': 'center' } },
    { id: "Task", header: ["Задачи", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'color': 'blue' } },
    { id: "TaskLink", header: [{ text: "Ссылка на Задания", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' } }
  ],
  on: {
    onBeforeEditStart: function (editor) {
      var item = this.getItem(editor.row);
      //если анкета не дмп, то нельзя ставить отметки кроме 0,1,П+, а если дмп, то нельзя отметку П+
      this.getColumnConfig("VerificationStatus").options = (item.IsDMP === 1) ? { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' } : { 0: '0', 1: '1', 'П+': 'П+' }
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      var status = 10
      if (state.value != state.old) {
        switch (item.VerificationStatus) {
          case '0':  status = 0;  break;
          case '1':  status = 1;  break;
          case 'П+': status = 7;  break;
          case '2':  status = 12; break;
          case '3':  status = 13; break;
          case '4':  status = 14; break;
          case '5':  status = 15; break;
          case '6':  status = 16; break;
          case '7':  status = 17; break;
          case '8':  status = 18; break;
          case '9':  status = 19; break;
          case '10': status = 20; break;
        }
      }
      if (item.PhotoID != null && item.PhotoID != -1 && status != 10) {
        send2('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') });

        switch (status) {
          case 0:  item.VerificationStatus = '0';  break;
          case 1:  item.VerificationStatus = '1';  break;
          case 7:  item.VerificationStatus = 'П+'; break;
          case 12: item.VerificationStatus = '2';  break;
          case 13: item.VerificationStatus = '3';  break;
          case 14: item.VerificationStatus = '4';  break;
          case 15: item.VerificationStatus = '5';  break;
          case 16: item.VerificationStatus = '6';  break;
          case 17: item.VerificationStatus = '7';  break;
          case 18: item.VerificationStatus = '8';  break;
          case 19: item.VerificationStatus = '9';  break;
          case 20: item.VerificationStatus = '10'; break;
        }
        item.VerificationAuthor = localStorage.getItem('UserName');
      }
    },
    // действия при клике на строку в столбце Задание
    onItemClick: function (id, e) {
      if (id.column == 'Task') {
        var item = this.getItem(id.row);
        var TaskPhotoID = item.PhotoID;

        e.stopPropagation();

        webix.ui({
          view: "window",
          id: "TaskReportWindow",
          height: 220,
          width: 300,
          position: "center",
          modal: true,
          head: {
            view: "toolbar", borderless: true,
            cols: [
              { view: "label", label: '<b> Задача к фото </b>', width: 215, align: 'center', css: { 'font-size': '16px' } },
              { view: "button", type: 'icon', icon: "fas fa-times", width: 30, click: "$$('TaskReportWindow').close()" }
            ]
          },
          body: {
            view: "toolbar", borderless: true,
            rows: [
              {
                cols: [
                  { view: "label", label: 'Выберете фото:' },
                  //при выборе номера фото в селекте, меняется ссылка на фото и ид фото для постановки задачи
                  {
                    view: "select", id: 'selectTaskReport', options: ["Фото № 1", "Фото № 2", "Фото № 3", "Фото № 4", "Фото № 5", "Фото № 6", "Фото № 7", "Фото № 8"],
                    on: {
                      onChange: function () {
                        var value = this.getValue();
                        switch (value) {
                          case 'Фото № 1': $$("labelTaskReport").define("label", item.Photo9133 === null ? 'нет фото' : item.Photo9133); TaskPhotoID = item.PhotoID;  break;
                          case 'Фото № 2': $$("labelTaskReport").define("label", item.Photo9134 === null ? 'нет фото' : item.Photo9134); TaskPhotoID = item.PhotoID2; break;
                          case 'Фото № 3': $$("labelTaskReport").define("label", item.Photo9135 === null ? 'нет фото' : item.Photo9135); TaskPhotoID = item.PhotoID3; break;
                          case 'Фото № 4': $$("labelTaskReport").define("label", item.Photo9136 === null ? 'нет фото' : item.Photo9136); TaskPhotoID = item.PhotoID4; break;
                          case 'Фото № 5': $$("labelTaskReport").define("label", item.Photo9137 === null ? 'нет фото' : item.Photo9137); TaskPhotoID = item.PhotoID5; break;
                          case 'Фото № 6': $$("labelTaskReport").define("label", item.Photo7677 === null ? 'нет фото' : item.Photo7677); TaskPhotoID = item.PhotoID5; break;
                          case 'Фото № 7': $$("labelTaskReport").define("label", item.Photo7678 === null ? 'нет фото' : item.Photo7678); TaskPhotoID = item.PhotoID5; break;
                          case 'Фото № 8': $$("labelTaskReport").define("label", item.Photo7679 === null ? 'нет фото' : item.Photo7679); TaskPhotoID = item.PhotoID5; break;
                        }
                        $$("labelTaskReport").refresh();
                        //если нет фото, то кнопка отправки задания неактивна
                        $$("labelTaskReport").data.label == 'нет фото' ? $$("buttonTaskReport").disable() : $$("buttonTaskReport").enable();
                      }
                    }
                  }
                ]
              },
              { view: "label", id: 'labelTaskReport', align: "center", width: 200 },
              { view: "textarea", id: 'newTextTaskReport', width: 250, height: 50, placeholder: (isEng) ? "Enter text" : "Введите комментарий", value: '' },
              // отправка задания
              {
                view: "button", id: 'buttonTaskReport', label: 'Отправить задание', width: 200, height: 30, align: 'center',
                click: function () {
                  var GUID = +new Date;
                  var newTextTaskReport = $$("newTextTaskReport").data.value == '' ? 'Некорректное фото' : $$("newTextTaskReport").data.value;

                  send2('SetTask', { 'Author': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': item.UserID, 'Text': newTextTaskReport, 'GUID': GUID, 'PhotoID': TaskPhotoID });

                  $$('TaskReportWindow').close();

                  webix.message({ type: "success", text: "Комментарий к фото отправлен", expire: 1500 });

                  //обновляем в таблице
                  item.TaskLink = 'Задача поставлена';
                  item.BornedTaskFinish = new Date();
                }
              }
            ]
          },
        }).show();
        //изначально отображаем ссылку на первое фото
        $$("labelTaskReport").define("label", item.Photo9133);
        $$("labelTaskReport").refresh();
        e.stopPropagation();
      }
      //переход в отчет с задачами
      if (id.column == 'TaskLink') {
        var item = this.getItem(id.row);
        //проверка наличие фразы "есть задача"
        if ((item.TaskLink.indexOf('Есть задача') != -1) || (item.TaskLink = 'Задача поставлена')) {
          $$('Start').setValue(item.BornedTaskStart);
          $$('Finish').setValue(item.BornedTaskFinish);
          $.ajax({
            url: '../../Services/Report.asmx/SetReportDictionary',
            data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': item.PointID }),
            success: function (data) {
              setFilterCount();
              var itemWindow = $$('menuUtility').getItem(68);
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
    }
  }
}

//Шторк "Отчет по наличию в LKA"
var addStorckReportLKA = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код точки АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "EAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9457", header: ["Ответ по наличию", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer3578", header: ["Суть проблемы", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "Answer9101", header: ["Комментарий", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" }
  ]
}

//Шторк "Отчет по оборудованию" 
var addStorckEquipmentReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
    { id: "SmartBorned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Manager", header: ["Ответственный менеджер", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "ArtName", header: ["ПОСМ", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Distributor", header: ["Дистрибьютор", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "OutCode", header: ["ID точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО сотрудника", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Start", header: ["Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "Finish", header: ["Окончание периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
    { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 40, editor: "string", adjust: "header" },
    { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 40, editor: "string", adjust: "header" }
  ]
}

//Шторк "Отчет по остаткам Пятерочка"
var addStorckReportStockPyaterochka = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCodePoint", header: ["Номер ТК", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Attribute298", header: ["Макрорегион 5ка", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Attribute299", header: ["УА Пятерочка", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Attribute300", header: ["Подформат 5ка", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "OutCodeArt", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", exportType: 'number', exportFormat: "#" },
    { id: "PLU", header: ["Код товара", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer7600", header: ["Остатки, ШТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer3578", header: ["Суть проблемы", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Answer9101", header: ["Комментарий", { content: "textFilter" }], width: 120, minWidth: 100, sort: "string" }
  ]
}

//Шторк "Отчет по проблемам"
var addStorckProblemReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCodePoint", header: ["Номер ТК", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "OutCodeArt", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "PLU", header: ["Код товара", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Answer3577", header: ["Количество в точке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer3578", header: ["Суть проблемы/наличие виртуальных стоков", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" }
  ]
}

//Шторк "Отчет по установке"
var addStorckInstallationReport = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.Location == null)
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "ActionID", header: ["ID анкеты", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["Наименование оборудования", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Quantity", header: ["Кол-во", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Ответственный", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    {
      id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 125, minWidth: 40, editor: "select", css: { 'text-align': 'center' },
      options: ['Да', 'Нет', 'Некорректное фото', 'Некорректное количество стоек', 'Некорректная дата установки', 'Некорректная дата окончания установки', 'Некорректное название стойки']
    },
    { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 170, minWidth: 40, editor: "string", css: { 'text-align': 'center' } },
    { id: "Agreement", header: ["Согласовано АП/Самостоятельно", { content: "textFilter" }], width: 210, minWidth: 40, editor: "string", css: { 'text-align': 'center' } },
    { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", editor: "text" }
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);

      if (state.value != state.old && editor.column == 'VerificationStatus') {
        var status = 10
        switch (item.VerificationStatus) {
          case 'Нет': status = 0; break;
          case 'Да': status = 1; break;
          case 'Некорректное фото': //при выборе ответа "некорректное фото" отправляется задание к фото
            webix.modalbox({
              title: "Подтвердите действие",
              buttons: ["Да", "Нет"],
              text: "Отправить задачу?",
              callback: function (result) {
                switch (result) {
                  case '0':
                    webix.message("Задача отправлена");
                    status = 2;
                    if (item.PhotoID != null && item.PhotoID != -1) {
                      send2('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') });

                      item.VerificationStatus = 'Некорректное фото';
                      item.VerificationDate = 'Сегодня';
                      var GUID = +new Date;
                      // отправка задания
                      send2('SetTask', { 'Author': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': item.UserID, 'Text': 'Некорректное фото', 'GUID': GUID, 'PhotoID': item.PhotoID });
                    };
                    break;
                  case '1':
                    webix.message("Отмена");
                    item.VerificationStatus = '';
                    break;
                }
              }
            });
            break;
          case 'Некорректное количество стоек': status = 3; break;
          case 'Некорректная дата установки': status = 4; break;
          case 'Некорректная дата окончания установки': status = 5; break;
          case 'Некорректное название стойки': status = 6; break;
        };

        if (item.PhotoID != null && item.PhotoID != -1 && status != 10) {
          send2('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') });

          switch (status) {
            case 0: item.VerificationStatus = 'Нет'; break;
            case 1: item.VerificationStatus = 'Да'; break;
            case 2: item.VerificationStatus = 'Некорректное фото'; break;
            case 3: item.VerificationStatus = 'Некорректное количество стоек'; break;
            case 4: item.VerificationStatus = 'Некорректная дата установки'; break;
            case 5: item.VerificationStatus = 'Некорректная дата окончания установки'; break;
            case 6: item.VerificationStatus = 'Некорректное название стойки'; break;
          }
          item.VerificationDate = 'Сегодня';
        }
      }
      // сохранение коментария
      if (state.value != state.old && editor.column == 'Comments') {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': item.ActionID, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
          success: function (data) {
          },
          error: function (xhr, ajaxOptions, thrownError) {
            onError();
          }
        });
      }
    }
  }
}

//Шторк "Отчет по установке Админ" 
var addStorckInstallationReportAdmin = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.Location == null)
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Location2", header: ["Локация 2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "EAN", header: [{ text: "Номенклатурный номер(SKU)", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["Наименование оборудования", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Quantity", header: ["Кол-во", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Ответственный", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
  ]
}

//Шторк "Расчет бонусов полевой структуре"
var addStorckUsersBonus = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 15, leftSplit: 5, rowHeight: 63,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "UserOutCode", header: [{ text: "Информация по сотруднику", colspan: 5, css: { 'text-align': 'center' } }, "ID сотрудника", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'string' },
    { id: "Region", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Регион", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterUserName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Ответственный", { content: "excelFilter", mode: "text" }], width: 140, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Должность", { content: "excelFilter", mode: "text" }], width: 95, minWidth: 40, sort: "string" },
    { id: "UserName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Сотрудник", { content: "excelFilter", mode: "text" }], width: 140, minWidth: 40, sort: "string" },

    { id: "ProcTask1", header: [{ text: "Focus Task 1", colspan: 10, css: { 'text-align': 'center' } }, { text: "max % бонуса Ft1", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NameTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Описание задачи Ft1", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "PlanTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Plan Ft1", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Fact Ft1", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NegativeAnswersTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Кол-во отриц.ответов при проверке в полях", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "СorrectedAnswersTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "Fact ИТОГ Ft1", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ExecutionTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "% выполн.плана Ft1 расчетный", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FromBonusTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "% от бонус.потенциала Ft1 для начисления", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask1", header: [{ text: "Focus Task 1", colspan: 10 }, { text: "% бонуса Ft1", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "ProcTask2", header: [{ text: "Focus Task 2", colspan: 10, css: { 'text-align': 'center' } }, { text: "max % бонуса Ft2", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NameTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Описание задачи Ft2", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "PlanTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Plan Ft2", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Fact Ft2", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NegativeAnswersTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Кол-во отриц.ответов при проверке в полях", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "СorrectedAnswersTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "Fact ИТОГ Ft2", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ExecutionTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "% выполн.плана Ft2 расчетный", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FromBonusTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "% от бонус.потенциала Ft2 для начисления", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask2", header: [{ text: "Focus Task 2", colspan: 10 }, { text: "% бонуса Ft2", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "ProcTask3", header: [{ text: "Focus Task 3", colspan: 10, css: { 'text-align': 'center' } }, { text: "max % бонуса Ft3", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NameTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Описание задачи Ft3", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "PlanTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Plan Ft3", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Fact Ft3", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NegativeAnswersTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Кол-во отриц.ответов при проверке в полях", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "СorrectedAnswersTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "Fact ИТОГ Ft3", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ExecutionTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "% выполн.плана Ft3 расчетный", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FromBonusTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "% от бонус.потенциала Ft3 для начисления", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask3", header: [{ text: "Focus Task 3", colspan: 10 }, { text: "% бонуса Ft3", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "ProcTask4", header: [{ text: "Focus Task 4", colspan: 10, css: { 'text-align': 'center' } }, { text: "max % бонуса Ft4", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NameTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Описание задачи Ft4", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "PlanTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Plan Ft4", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Fact Ft4", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NegativeAnswersTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Кол-во отриц.ответов при проверке в полях", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "СorrectedAnswersTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "Fact ИТОГ Ft4", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ExecutionTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "% выполн.плана Ft4 расчетный", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FromBonusTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "% от бонус.потенциала Ft4 для начисления", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask4", header: [{ text: "Focus Task 4", colspan: 10 }, { text: "% бонуса Ft4", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "BonusTask01", header: [{ text: "Бонус, %", colspan: 5, css: { 'text-align': 'center' } }, { text: "Ft1 % премии за выполн.плана", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask02", header: [{ text: "Бонус, %", colspan: 5 }, { text: "Ft2 % премии за выполн.плана", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask03", header: [{ text: "Бонус, %", colspan: 5 }, { text: "Ft3 % премии за выполн.плана", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BonusTask04", header: [{ text: "Бонус, %", colspan: 5 }, { text: "Ft4 % премии за выполн.плана", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "AllBonus", header: [{ text: "Бонус, %", colspan: 5 }, { text: "% Общий бонус", css: "multiline" } , { content: "textFilter" }], width: 65, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "RemarksAnswers", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4, css: { 'text-align': 'center' } }, { text: "Кол-во замечаний из анкеты проверяющего", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VerifiedPoint", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, { text: "Кол-во проверенных точек из анкеты проверяющего", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoefRemarks", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, { text: "Коэффициент от кол-ва замечаний", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FinalBonus", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, { text: "Итого % бонуса с учетом кэфф", css: "multiline" }, { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "WorkDay", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4, css: { 'text-align': 'center' } }, { text: "Референтное значение дней", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); /*только цифры*/ } },
    { id: "WorkDays", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, { text: "Отработанные дни по КАЕ/МЕ", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcWorkDays2", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, { text: "% отработанных дней", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcWorkDays", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, { text: "Расчет % выполнения с учетом отраб.дней", css: "multiline" }, { content: "textFilter" }], width: 125, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsCheck", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7, css: { 'text-align': 'center' } }, { text: "Отметка о проверке ответственного", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Да', 'Нет', 'Убрать отметку'] },
    { id: "CheckingUser", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "ФИО ответственного", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int" },
    { id: "CheckingDate", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, { text: "Дата проверки", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Comment", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, { text: "Комментарий при исключениях (текст)", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", editor: "text" },
    { id: "CheckingBonus", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, { text: "Бонус в % с учетом комментария", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text" },
    { id: "BonusControl", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, { text: "Контроль бонуса", css: "multiline" }, { content: "textFilter" }], width: 65, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CalculatProc", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, { text: "Расчет % выполнения с учетом комментариев и отработанных дней", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
  on: {
    onBeforeEditStart: function (id) {
      var item = this.getItem(id);
      if (id.column == "IsCheck" && item.IsEditBDM == 0) { return false; }
      if (id.column != "IsCheck" && ['Да', 'Нет'].includes(item.IsCheck)) { return false; }
      if (item.MasterUserID != localStorage.getItem('Author') && id.column != "WorkDay") { return false; } // Запретить редактирование ячейки, если не ответственный
      //if ((id.column == "Comment" || id.column == "CheckingBonus") && item.IsCheck != 'Нет') { return false; } // Запретить редактирование ячейки комментарий, если статус не "Нет"
      if (id.column == "WorkDay" && item.IsEdit != 1) { return false; }
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      const syncIcon = "<span class='fas fa-sync'></span>";
      var item = this.getItem(editor.row);
      if (editor.column == "CheckingBonus") {
        item.CheckingBonus = item.CheckingBonus !== null ? String(item.CheckingBonus).replace(/[^\d.]/g, "").replace(/^\.+|\.+$/g, "") : item.CheckingBonus; //оставляем только цифры (и точку для дробных)
        item.CheckingBonus = item.CheckingBonus == '' ? null : item.CheckingBonus //если значение бонуса пустое, чтобы не записался ноль
        state.value = item.CheckingBonus
      }
      if (editor.column == "WorkDay" && state.value == '') {
        item.WorkDay = state.old;
        return;
      }
      if (state.value != state.old && (state.value != '' || editor.column != "IsCheck")) {
        var status = null
        if (editor.column == "IsCheck" && ((state.value == 'Да' && state.old == 'Нет') || (state.value == 'Нет' && state.old == 'Да') || state.value == 'Убрать отметку')) {
          webix.message({ text: "Необходимо обновить отчет для перерасчета" });
          item.CalculatProc = syncIcon;
          item.BonusControl = syncIcon;
        }

        switch (item.IsCheck) {
          case 'Нет':
            status = 0;

            //Расчет % выполнения с учетом комментариев отдельно для МЕ, КАЕ и остальных
            item.CalculatProc = (item.CheckingBonus != '' && item.CheckingBonus && item.RoleName == 'Мерчендайзер') ?
              (((item.WorkDays || 0) / item.WorkDay) > 1) ? item.CheckingBonus : Math.round(item.CheckingBonus * (item.WorkDays / item.WorkDay))
              : item.CalculatProc;

            item.CalculatProc = (item.CheckingBonus != '' && item.CheckingBonus && item.RoleName == 'КАЕ') ?
              (((item.WorkDays || 0) / item.WorkDay) > 0.5) ? item.CheckingBonus : Math.round(item.CheckingBonus * (item.WorkDays / item.WorkDay))
              : item.CalculatProc;

            item.CalculatProc = (item.CheckingBonus != '' && item.CheckingBonus && item.RoleName != 'Мерчендайзер' && item.RoleName != 'КАЕ') ? item.CheckingBonus : item.CalculatProc;
            item.BonusControl = (item.CheckingBonus != '' && item.CheckingBonus) ? item.CheckingBonus : item.FinalBonus;

            break;
          case 'Да':
            status = 1;
            item.CalculatProc = (item.CheckingBonus != '' && item.CheckingBonus && state.old == 'Нет') ? item.ProcWorkDays : item.CalculatProc; //если "нет" поменяли на "да", то возвращаем "Расчет с учетом отработанных дней"
            item.BonusControl = item.FinalBonus
            item.CheckingBonus = '';
            item.Comment = '';
            break;
          case 'Убрать отметку':
            status = 10;
            item.CalculatProc = syncIcon;
            item.BonusControl = syncIcon;
            item.CheckingBonus = '';
            item.Comment = '';
            break;
        }
        if (editor.column == "WorkDay") {
          item.CalculatProc = syncIcon;
          item.ProcWorkDays = syncIcon;
          item.ProcWorkDays2 = syncIcon;

          //сохраняем рабочие дни
          $.ajax({
            url: '../../Services/Desktop.asmx/SetBonusPlan',
            data: JSON.stringify({ 'User': item.UserID, 'Start': item.Start, 'WorkDay': item.WorkDay, 'IsCheck': null, 'Comment': null, 'Bonus': null, 'Author': -1 }),
          });
          return;
        }
        //сохраняем коментарии
        $.ajax({
          url: '../../Services/Desktop.asmx/SetBonusPlan',
          data: JSON.stringify({ 'User': item.UserID, 'Start': item.Start, 'WorkDay': null, 'IsCheck': status, 'Comment': item.Comment, 'Bonus': item.CheckingBonus, 'Author': localStorage.getItem('Author') }),
        });

        item.CheckingUser = localStorage.getItem('UserName');
        item.CheckingDate = 'Сегодня';
      }
    }
  }
}

//Шторк "Срез по действиям"
var addStorckActivityReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "UserAP", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "UserName", header: ["ФИО", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "MasterUserName", header: ["ФИО Проверяющего", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "DaysWorked", header: ["Отработанно дней за период", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DayDuration", header: ["Ср.время смены", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "TravelDuration", header: ["Ср.время в пути", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "VisitNotWorked", header: ["Кол-во визитов с 2 фото(вход/выход)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Tasks", header: ["Отчет по задачам", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PhotoByTask", header: ["Отчет по задачам Отметка проверяющего", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "CheckAction", header: ["Анкета для проверяющего", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "LentaAP", header: ["Лента (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "LentaAnswers", header: ["Лента(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OkeyAP", header: ["Окей (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OkeyAnswers", header: ["Окей(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "AshanAP", header: ["Ашан (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "AshanAnswers", header: ["Ашан(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PerekrestokAP", header: ["Перекресток (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PerekrestokAnswers", header: ["Перекресток(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "KaruselAP", header: ["Карусель (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "KaruselAnswers", header: ["Карусель(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "MagnitAP", header: ["Магнит (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "MagnitAnswers", header: ["Магнит(отчет по проблемам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PyaterochkaAP", header: ["Пятерочка (кол-во точек в АП)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PyaterochkaAnswers", header: ["Пятерочка(отчет по остаткам)кол-во ответов", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Monitoring", header: ["Мониторинг Шторк", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "LKA", header: ["Отчет по промо LKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DistancePoints", header: ["Геолокация (>1000метров)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DurationMoreTwo", header: ["Длительность визита более 2ч, ГМ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "DurationMoreOne", header: ["Длительность визита более 1ч", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Travel", header: ["Корректность маршрута", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } }
  ]
}

//Шторк "Статус установки стоек по АП"
var addStorkReportForStand = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointCode", header: [{ text: "Код локации", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointCode2", header: [{ text: "Код локации2", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointID", header: ["ID", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 110, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Start", header: ["Старт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Финиш", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 40, sort: "string" },
    { id: "EAN", header: ["Код SKU", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PhotoLink", header: [{ text: "Статус установки", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9456", header: [{ text: "Действие по оборудованию", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Установлено', 'Не установлено', ''] },
    { id: "Answer10026", header: ["Причина неустановки", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", editor: "select", options: ['Не доставили в торговую точку', 'Потеряли / утилизировали в торговой точке', 'Сломали в торговой точке', 'Брак', 'Не разрешили установить без пропуска', 'Не разрешили установить', 'Точка закрыта на ремонт'] },
    { id: "Comment", header: ["Комментарии ТМ", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", editor: "text" },
    { id: "CommentAuthor", header: [{ text: "ФИО сотрудника от ТМ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "CommentBorned", header: [{ text: "Дата комментария", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["Тип установки", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ResponsibleUser", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Email", header: ["E-mail", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },
    { id: "UserPhone", header: ["Телефон", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "UsersAP", header: ["Все закрепленные за точкой", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" }
  ],
  on: {
    onBeforeEditStart: function (id) {
      const item = this.getItem(id);
      if (item.IsEdit == 0) { return false; }
      else if ((id.column == 'Answer10026' || id.column == 'Answer9456' ) && item.IsEdit == 1) { return false; }
    },
    onAfterEditStop: function (state, editor) {
      const item = this.getItem(editor.row);
      if (state.value != state.old && editor.column == 'Answer10026') {
        let option = -1
        switch (state.value) {
          case 'Не доставили в торговую точку': option = 3813; break;
          case 'Потеряли / утилизировали в торговой точке': option = 3814; break;
          case 'Сломали в торговой точке': option = 3815; break;
          case 'Брак': option = 3816; break;
          case 'Не разрешили установить без пропуска': option = 4494; break;
          case 'Не разрешили установить': option = 4560; break;
          case 'Точка закрыта на ремонт': option = 4561; break;
        }
        if (item.UserID != null) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': item.ActionID, 'Art': item.ArtID, 'Question': 10026, 'Option': option, 'Answer': state.value }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
        else {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetReportAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': null, 'Borned': null, 'Action': item.ActionID, 'Art': item.ArtID, 'Question': 2, 'Option': option, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
      else if (state.value != state.old) {
        let question
        switch (editor.column) {
          case 'Comment':
            question = 1;
            item.CommentAuthor = localStorage.getItem('UserName');
            item.CommentBorned = 'Сегодня';
            break;
          case 'Answer9456':
            question = 3;
            state.value = ['Установлено', 'Не установлено'].includes(state.value) ? state.value : '';
            break;
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': null, 'Borned': null, 'Action': item.ActionID, 'Art': item.ArtID, 'Question': question, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//GFD "График"
var addGfdReportRoute = {  
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.FName == 'Вакансия')
        item.$css = "red_highlight";
    }
  },
  columns: [
    { id: "OfficeName", header: ["Рег.офис", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
    { id: "", header: ["Область", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "", header: ["Район", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
    { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
    { id: "Extra1", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Extra2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
    { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
    { id: "UserNameTM", header: ["ТМ", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
    { id: "PhoneTM", header: ["Телефон ТМ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "EmailTM", header: ["Email ТМ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "UserNameSV", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
    { id: "PhoneSV", header: ["Телефон СВ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "EmailSV", header: ["Email СВ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "UserNameME", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
    { id: "PhoneME", header: ["Телефон МЕ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "EmailME", header: ["Email МЕ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
    { id: "Day1", header: ["Пн", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day2", header: ["Вт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day3", header: ["Ср", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day4", header: ["Чт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day5", header: ["Пт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day6", header: ["Сб", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day7", header: ["Вс", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["ID Клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } }
  ]
}

//GFD/Лидер Тим GFD "Отчет по заполнению анкет"
var addGfdReportFillingActions = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "UserID", header: ["ID МЕ", { content: "textFilter" }], width: 80, minWidth: 80, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Мерчендайзер", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 80, sort: "string" },
    { id: "MasterUserName", header: ["Супервайзер", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 80, sort: "string" },
    { id: "OfficeName", header: ["Рег.офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
    { id: "RegionName", header: ["Область", { content: "excelFilter", mode: "text" }], width: 70, sort: "string" },
    { id: "AreaName", header: ["Район", { content: "excelFilter", mode: "text" }], width: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", adjust: "header" },
    { id: "Extra1", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Extra2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
    { id: "EAN", header: ["EAN", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Группа", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "", header: ["Суббренд", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
    { id: "", header: ["Вариант товара", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
    { id: "", header: ["Размер упаковки", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
    { id: "", header: ["Доп.признак", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
    { id: "NameSKU", header: ["SKU", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
    { id: "Borned", header: ["Дата заполнения анкеты", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата заполнения анкеты", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "Answer9495", header: ["Количество фейсов на ОМП", { content: "textFilter" }], width: 100, minWidth: 80, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "PhotoAnswer9496", header: ["Фото ТСД/прайс-чекера при фиксации OOS и Вирт. остатка", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
    { id: "Answer9497", header: ["Причина OOS для GFD", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OutCodeAP", header: ["ID Клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoAnalysis", header: ["Фото ТСД анализ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
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

//Traditional trade "Аудит-Для распечатки"
var addTradeReportAuditForm1 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Name", header: [{ text: "Название", rotate: true }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Address", header: [{ text: "Адрес", rotate: true }, { content: "textFilter" }], width: 250, sort: "string" },
    { id: "Borned", header: [{ text: "Дата", rotate: true }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10528", header: [{ text: "Конфеты<br>Мерси", rotate: true }, { content: "textFilter" }], width: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10534", header: [{ text: "Раффаэло", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10529", header: [{ text: "Тоффифе", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10535", header: [{ text: "Коркунов", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10530", header: [{ text: "Мамба", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10536", header: [{ text: "Фрутелла", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10531", header: [{ text: "Фрумеладки", height: 100, rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10537", header: [{ text: "БонПари", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10532", header: [{ text: "Мерси<br>Плитка", rotate: true }, { content: "textFilter" }], width: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10538", header: [{ text: "Риттер<br>Спорт", rotate: true }, { content: "textFilter" }], width: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10533", header: [{ text: "Вертерс", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10539", header: [{ text: "Меллер", rotate: true }, { content: "textFilter" }], width: 25, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10543", header: [{ text: "Задача", rotate: true }, { content: "textFilter" }], width: 100, sort: "string" },
  ]
}

//Traditional trade "Аудит-Для рассылки"
var addTradeReportAuditForm2 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Name", header: [{ text: "Название", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 80, sort: "string" },
    { id: "Address", header: [{ text: "Адрес", css: "multiline" }, { content: "textFilter" }], width: 300, sort: "string" },
    { id: "Borned", header: [{ text: "Дата", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10528", header: [{ text: "Конфеты Мерси" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10534", header: [{ text: "Раффаэло" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10529", header: [{ text: "Тоффифе" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10535", header: [{ text: "Коркунов" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10530", header: [{ text: "Мамба" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10536", header: [{ text: "Фрутелла" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10531", header: [{ text: "Фрумеладки" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10537", header: [{ text: "Бон Пари" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10532", header: [{ text: "Мерси плитка" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10538", header: [{ text: "Риттер Спорт" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10533", header: [{ text: "Вертерс" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10539", header: [{ text: "Меллер" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo10508", header: ["Фото (касса)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
    { id: "Photo10507", header: ["Фото (полка)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
    { id: "Answer10543", header: ["Задача по точке", { content: "textFilter" }], width: 200, minWidth: 80, sort: "string", adjust: "header" },
  ]
}

//Traditional trade "Аудит-Традиционный канал"
var addTradeReportAudit = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string"},
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
    { id: "Extra2", header: [{ text: "Ответственный РСМ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 80, sort: "string" },
    { id: "Extra3", header: [{ text: "Дистрибьютор на территории", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
    { id: "Name", header: [{ text: "Название торговой точки", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 80, sort: "string" },
    { id: "Address", header: [{ text: "Адрес торговой точки", css: "multiline" }, { content: "textFilter" }], width: 300, sort: "string" },
    { id: "OutCode", header: ["ID Cislink", { content: "textFilter" }], width: 100, minWidth: 80, sort: "int" },
    { id: "Borned", header: [{ text: "Дата отчета", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10528", header: [{ text: "Конфеты Мерси", height: 120, rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10534", header: [{ text: "Раффаэло", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10529", header: [{ text: "Тоффифе", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10535", header: [{ text: "Коркунов", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10530", header: [{ text: "Мамба", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10536", header: [{ text: "Фрутелла", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10531", header: [{ text: "Фрумеладки", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10537", header: [{ text: "Бон Пари", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10532", header: [{ text: "Мерси плитка", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10538", header: [{ text: "Риттер Спорт", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10533", header: [{ text: "Вертерс", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10539", header: [{ text: "Меллер", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo10508", header: ["Фото (касса)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
    { id: "Photo10507", header: ["Фото (полка)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
    { id: "Answer10543", header: ["Задача по точке", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string", editor: "text" },
    { id: "DistributorDate", header: [{ text: "Дата передачи на дистрибьютора", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 80, sort: "string", editor: "date", css: { 'text-align': 'center' } },
    { id: "IsCheck", header: [{ text: "Отметка о выполнении задачи", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 80, sort: "string", editor: "select", css: { 'text-align': 'center' }, options: ['', 'Да', 'Нет'] },
    { id: "CheckDate", header: [{ text: "Дата отметки о выполнении", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Comment", header: [{ text: "Комментарий при невыполнении более месяца", css: "multiline" }, { content: "textFilter" }], width: 200, minWidth: 80, sort: "string", editor: "text" },
    { id: "CheckingUser", header: [{ text: "Последняя редакция", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      //сохранение ответа на вопрос 10543
      if (state.value != state.old && editor.column == 'Answer10543') {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 103949, 'Art': -1, 'Question': 10543, 'Option': -1, 'Answer': state.value }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
      //сохранение доп ответов отчета
      if (state.value != state.old && editor.column != 'Answer10543') {
        let questionID;
        switch (editor.column) {
          case 'DistributorDate': state.value = webix.i18n.parseFormatStr(state.value); item.DistributorDate = state.value; questionID = 1; break;
          case 'IsCheck': questionID = 2; item.CheckingUser = (state.value != '') ? localStorage.getItem('UserName') : ''; item.CheckDate = (state.value != '') ? 'Сегодня' : ''; break;
          case 'Comment': questionID = 3; break;
        }
        if (editor.column == 'IsCheck' && item.Answer10543 == '') {
          item.IsCheck = ''
          item.CheckingUser = ''
          item.CheckDate = ''
          return
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 103949, 'Art': null, 'Question': questionID, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': 239, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//KTNG LT "Visits detailed"
var addKtngVisitsDetailed = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["", { text: "Дата визита", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "WeekNum", header: ["", { text: "Номер недели", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitID", header: ["", "№ визита", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["", "№ Маршрут", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "PointCode", header: ["", "Код точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: ["", "Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["", "Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["", "Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "VisitLink", header: ["", { text: "Ссылка на визит", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'color': 'blue' } },
    { id: "Answer11000", header: ["", "Статус точки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Answer11001", header: ["", "Статус визита", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "", header: ["", { text: "Эффективность визита", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "Answer10581", header: ["", { text: "Комментарий по ситуации в ТТ", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "string" },
    { id: "", header: ["", { text: "Эффективность визита", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["", { text: "Качество фото", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["", { text: "Качество отчетности", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["", "Коммент", { content: "textFilter" }], width: 75, minWidth: 40, sort: "string" },
    { id: "", header: ["", { text: "Развернутый коммент", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "", header: ["", { text: "Дата проверки", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10559", header: ["", { text: "Есть ли в ТТ оборудование оверхед?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10560", header: ["", { text: "Сколько всего оверхедов в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10557", header: ["", { text: "Есть ли в ТТ оборудование Shop & Shop?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10558", header: ["", { text: "Сколько всего Shop & Shop в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer10561", header: ["", { text: "Есть ли в ТТ оборудование Напольный диспенсер?", css: "multiline_min" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10562", header: ["", { text: "Сколько всего напольных диспенсеров в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer11085", header: ["", { text: "Соблюдение планограммы", css: "multiline" }, { content: "textFilter" }], width: 95, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer11084", header: ["", { text: "Размещение стикеров", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer11086", header: ["", { text: "Статус данных (из опросника Мониторинг скю по тсд)", css: "multiline_min" }, { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
    { id: "StockAll", header: ["", { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockEntr", header: ["", { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExit", header: ["", { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockRes", header: ["", { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockEntrProc", header: ["", { text: "% стока в местах продаж на входе в тт", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitProc", header: ["", { text: "% стока в местах продаж на выходе из тт", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockVisitProc", header: ["", { text: "% вынесенного стока на визите", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "IsRefil", header: ["", { text: "Пополнение было?", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockZero", header: ["", { text: "Сток_ТСД больше нуля", css: "multiline" }, { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockStatus", header: ["", { text: "Сток_ТСД больше чем Сток на выходе", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku2", header: [{ text: "ESSE Super Slim Blue", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku3", header: [{ text: "ESSE Super Slim One", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku4", header: [{ text: "ESSE Super Slim Menthol", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku5", header: [{ text: "ESSE Exchange М (манго)", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku6", header: [{ text: "ESSE EXCHANGE W", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku7", header: [{ text: "ESSE inSecret", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku8", header: [{ text: "ESSE GOLDEN LEAF", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku9", header: [{ text: "ESSE Special Gold", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku10", header: [{ text: "ESSE PRESSO", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku11", header: [{ text: "ESSE Sense Himalaya Demi", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku12", header: [{ text: "ESSE Summer POP", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku13", header: [{ text: "Blooming Super Slim Blue", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "StockSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "StockEntrSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StockExitSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "StatusSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "ResSku14", header: [{ text: "BLOOMING SILVER", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { header: ["", "План Кол-во SKU", { content: "textFilter" }], width: 20 },
    { header: ["", "Факт Кол-во SKU ТСД", { content: "textFilter" }], width: 20 },
    { header: ["", "Разница (сколько SKU не хватает ТСД)", { content: "textFilter" }], width: 20 },
    { header: ["", "% ООS по ТСД", { content: "textFilter" }], width: 20 },
    { header: ["", "Факт Кол-во SKU на входе", { content: "textFilter" }], width: 20 },
    { header: ["", "Разница (сколько SKU не хватает на входе)", { content: "textFilter" }], width: 20 },
    { header: ["", "% ООS на входе", { content: "textFilter" }], width: 20 },
    { header: ["", "Факт Кол-во SKU на выходе", { content: "textFilter" }], width: 20 },
    { header: ["", "Разница (сколько SKU не хватает на выходе)", { content: "textFilter" }], width: 20 },
    { header: ["", "% ООS на выходе", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING SILVER", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE SS BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE SS EXCHANGE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE inSecret", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE MENTHOL", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE ONE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE PRESSO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Summer POP", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Silver", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING SILVER", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE inSecret", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE MENTHOL", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE ONE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE PRESSO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Summer POP", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Silver", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "BLOOMING SILVER", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE BLUE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE inSecret", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE MENTHOL", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE ONE", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE PRESSO", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Summer POP", { content: "textFilter" }], width: 20 },
    { header: ["", "ESSE Silver", { content: "textFilter" }], width: 20 },
    { header: ["", "План Кол-во SKU", { content: "textFilter" }], width: 20 },
    { header: ["", "Факт Кол-во SKU на входе", { content: "textFilter" }], width: 20 },
    { header: ["", "Факт Кол-во SKU на выходе", { content: "textFilter" }], width: 20 },
    { header: ["", "ГМ или ММ", { content: "textFilter" }], width: 20 },
    { header: ["", "РЦ ММ", { content: "textFilter" }], width: 20 },
  ],
  on: {
    //действия при клике на строку в столбце Задание
    onItemClick: function (id, e) {
      //переход в отчет визиты
      if (id.column == 'VisitLink') {
        var item = this.getItem(id);

        //сброс текущего фильтра тт/сотрудник
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });

        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Users", 'User': localStorage.getItem('Author'), 'Text': '' }),
        });

        //выбор тт/сотрудника в фильтре
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': item.PointID }),
          success: function (data) {
            setFilterChange();
            getSetting();
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });

        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': "Users", 'User': localStorage.getItem('Author'), 'Text': item.UserID }),
          success: function (data) {
            setFilterChange();
            getSetting();
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });

        e.stopPropagation();

        //переход в отчет Визиты        
        var itemWindow = $$('menuUtility').getItem(1);
        if (itemWindow != null)
          showReport(itemWindow, 1);

        e.stopPropagation();
      }
    }
  }
}

//Heaven Gifts "Отчет HG"
var addHgReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 110, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "UserName", header: ['ФИ сотрудника', { content: "excelFilter", mode: "text" }], width: 150, minWidth: 80, sort: "string" },
    { id: "Name", header: ["НазваниеТТ", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Название сети", { content: "excelFilter", mode: "text" }], width: 125, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10997", header: ["Наличие POSM HG", { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer11081", header: ["Наличие POSM конкурентов", { content: "textFilter" }], width: 210, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10892", header: ["Наличие оборудования HG", { content: "textFilter" }], width: 195, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10893", header: ["Наличие оборудования конкурентов", { content: "textFilter" }], width: 270, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer11039", header: ["Продажи в ТТ (за 7 дней)", { content: "textFilter" }], width: 190, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer10904", header: ["Активности конкурентов", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Procent", header: ["%установки APP Gifts", { content: "textFilter" }], width: 175, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "RRC", header: ["Мониторинг РРЦ", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
    { id: "Comment", header: ["Комментарии", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" }
  ]
}

//Heaven Gifts "Отчет HG 2"
var addHgReport2 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.UserName == 'Тотал' || item.NetworkName == 'Тотал')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "OfficeName", header: [{ text: "", colspan: 4 }, { text: "City or FF Area" }, { content: "excelFilter", mode: "text" }], width: 135, minWidth: 40, sort: "string" },
    { id: "UserName", header: [{ text: "", colspan: 4 }, { text: "Сотрудник" }, { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: [{ text: "", colspan: 4 }, { text: "Cеть" }, { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: [{ text: "", colspan: 4 }, { text: "Адрес тт" }, { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "", header: [{ text: "SO", colspan: 3 }, { text: "Target Monthly" }, { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
    { id: "MonthSO", header: [{ text: "SO", colspan: 3 }, { text: "SO this month" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "WeekSO", header: [{ text: "SO", colspan: 3 }, { text: "SO this week" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserAP", header: [{ text: "Distributions", colspan: 2 }, { text: "Pos ttl" }, { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Distrib", header: [{ text: "Distributions", colspan: 2 }, { text: "Distribution" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt143186", header: [{ text: "MO10000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate143186", header: [{ text: "MO10000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144356", header: [{ text: "BM16000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144356", header: [{ text: "BM16000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144357", header: [{ text: "CF8000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144357", header: [{ text: "CF8000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144039", header: [{ text: "BC10000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144039", header: [{ text: "BC10000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144438", header: [{ text: "BC18000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144438", header: [{ text: "BC18000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt143191", header: [{ text: "VI10000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate143191", header: [{ text: "VI10000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt143190", header: [{ text: "TI70000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate143190", header: [{ text: "TI70000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144439", header: [{ text: "LM-CD10000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144439", header: [{ text: "LM-CD10000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt143185", header: [{ text: "LM-MO5000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate143185", header: [{ text: "LM-MO5000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt143183", header: [{ text: "LM-OS4000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate143183", header: [{ text: "LM-OS4000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144358", header: [{ text: "LM-OS2600", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144358", header: [{ text: "LM-OS2600", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "CoverageArt144359", header: [{ text: "FL-CI5000", colspan: 2 }, { text: "Coverage" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Rate144359", header: [{ text: "FL-CI5000", colspan: 2 }, { text: "rate" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ]
}

//JTI "DC (%)"
var addJtiReportDC = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 80, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActionSIS", header: ["ID анкеты", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "ArtSIS", header: [{ text: "Количество скю SIS", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Attribute330", header: [{ text: "Кол-во шкафов (SIS) в тт", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ActionOH", header: ["ID анкеты", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "ArtOH", header: [{ text: "Количество скю OH", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Attribute329", header: [{ text: "Кол-во касс (OH) в тт", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ArtSum", header: [{ text: "Общее количество SKU на всех кассах", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "AnswerSum", header: [{ text: "Сумма SKU отсутствующих на всех работающих кассах", css: "multiline" }, { content: "textFilter" }], width: 195, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Procent", header: [{ text: "Уровень дистрибуции в точке (DC), %", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } }
  ]
}

//ФАМ "Визиты по клиентам"
var addFamClientVisits = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string",  },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "PlanVisit", header: ["План", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactVisit", header: ["Факт", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DifVisit", header: ["Разница", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//ФАМ "Выполнение ТЗ"
var addFamExecutionTZ = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  scheme: {
    $change: function (item) {
      if (item.Plans == null)
        item.$css = "light_blue_highlight";
    },
  },
  columns: [
    { id: "UserID", header: ["ID пользователя", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "MasterUserName", header: ["Руководитель", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Клиент", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActionName", header: ["Наименование ТЗ", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Start", header: ["Старт ТЗ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Окончание ТЗ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Plans", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 50, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer", header: ["Ответ", { content: "textFilter" }], width: 50, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Fact", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcExecut", header: ["Выполнение%", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//ФАМ "Ошибки Маршрутизации"
var addFamRoutingErrors = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "MasterUserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "PlanVisit", header: ["По плану", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "RouteVisit", header: ["По маршруту", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DifVisit", header: ["Разница", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
  ],
}

//ФАМ "Количественный KPI"
var addFamQuantitativeKPI = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "UserID", header: ["ID Пользователя", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "MasterUserName", header: ["Руководитель", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "PlanTiming", header: ["План (час)", { content: "textFilter" }], width: 75, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "FactTiming", header: ["Факт (час)", { content: "textFilter" }], width: 75, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CompletProc", header: ["По часам %", { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "RoutePlan", header: ["План", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "VisitFact", header: ["Факт", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "VisitProc", header: ["По визитам %", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "TotalProc", header: ["Итого %", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Arive "Выполнение плана продаж"
var addAriveSalesPlan = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true
  }, scheme: {
    $change: function (item) {
      $$("addAriveSalesPlan|1107").config.columns[5].header[0] = { text: "План продаж на " + item.NameMonth, css: "multiline" };
      $$("addAriveSalesPlan|1107").config.columns[6].header[0] = { text: "Факт продаж на " + item.NameMonth, css: "multiline" };
      $$("addAriveSalesPlan|1107").refreshColumns();
    }
  },
  columns: [
    { id: "Sort", header: ["№", { content: "textFilter" }], width: 40, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 500, minWidth: 40, sort: "string" },
    { id: "PointID", header: ["Код ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Фамилия кон-та", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "PointPlan", header: [{ text: "План продаж на месяц", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointFact", header: [{ text: "Факт продаж на месяц", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Procent", header: [{ text: "Процент выполнения плана, %", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Шторк "Бонусные задачи"
var addStorckInformationTasks = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 15, editable: true, leftSplit: 5, rowHeight: 63,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Region", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "DateLastEdit", header: [{ text: "Дата заполнения", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Task", header: ["№ задачи", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["Исполнитель", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "UserID", header: [{ text: "ID исполнителя", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
    { id: "TaskType", header: ["Тип задачи", { content: "textFilter" }], width: 220, minWidth: 40, sort: "string", editor: "select", options: ['ДМП, оборудование', 'Прикасса', 'Расширение доли полки', 'Выкладка планограммы', 'Выполнение задач подчиненными'] },
    { id: "Formulation", header: ["Формулировка", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string", editor: "select", options: null },
    { id: "F", header: [{ text: "Выберите F (достигаемый уровень в штуках или %)", css: "multiline" }, { content: "textFilter" }], width: 145, minWidth: 40, sort: "string", editor: "text" },
    { id: "M", header: [{ text: "Выберите M (номер полки, % от общего кол-ва точек)", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); /*только цифры*/ } },
    { id: "N", header: [{ text: "Выберите N (кол-во торговых точек)", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); } },
    { id: "R", header: [{ text: "Выберите R (кол-во крючков, касс, фейсов)", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", editor: "text" },
    { id: "T", header: [{ text: "Выберите T (период, кол-во дней)", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", editor: "text" },
    { id: "Y", header: [{ text: "Выберите Y (сеть)", css: "multiline" }, { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", editor: "multiselect", options: null },
    { id: "Z", header: [{ text: "Выберите Z (продукт)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", editor: "multiselect", options: null },
    { id: "X", header: [{ text: "Выберите Х (количество ДМП, страйп-лент и т.п)", css: "multiline" }, { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); } },
    { id: "Comments", header: [{ text: "Комментарий к формулировке (30 знаков)", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text", editParse: function (value) { return value.substring(0, 30); /*до 30 символов*/ } },
    { id: "TaskName", header: [{ text: "Формулировка задачи согласно утвержденного образца", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "NetworksID", header: ["ID сети", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Points", header: [{ text: "Закрепленные точки", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", editor: "text" },
    { id: "Plans", header: ["План", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ProcTask", header: ["Вес Задачи", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", editor: "text", css: { 'text-align': 'center' }, editParse: function (value) { let numValue = value.replace(/\D/g, ""); numValue = parseInt(numValue || 0); return Math.min(numValue, 100); } },
    { id: "Author", header: ["ФИО ответственного", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckFFM", header: [{ text: "Подтверждение FFM", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "select", options: ['Да', 'Убрать отметку'], css: { 'text-align': 'center' } },
    { id: "AuthorFFM", header: ["ФИО FFM", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckBDM", header: [{ text: "Подтверждение БДМ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "select", options: null, css: { 'text-align': 'center' } },
    { id: "CommentsBDM", header: [{ text: "Комментарий БДМ при отметке НЕТ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text" },
    { id: "AuthorBDM", header: ["ФИО БДМ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckBornedBDM", header: [{ text: "Дата подтверждения БДМ", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CopyUser", header: [{ text: "Копирование задачи", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", editor: "multiselect", options: null, css: { 'text-align': 'center' }, template: function (obj) { return `<span style="text-decoration: underline; color: blue;">${"Выбрать сотрудников"}</span>`; }, },
    { id: "CopyOldTask", header: [{ text: "Продублировать Задачу предыдущего периода", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, template: function (obj) { return `<span style="text-decoration: underline; color: blue;">${"Скопировать"}</span>`; } },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      let item = this.getItem(editor.row);

      // ========== 1. BDM ==========
      if (item.IsBDM != 0 && item.IsFFM == 0) {
        if (item.CheckFFM == 'Да') {
          if (editor.column !== "CheckBDM" && editor.column !== "CommentsBDM") {
            return false;
          }
          if (editor.column === "CheckBDM") {
            if (item.IsCheck == 1 && [1, 2, 3, 4].includes(item.TaskID)) {
              this.getColumnConfig("CheckBDM").options = ['Да', 'Разрешаю корректировку'];
            } else {
              this.getColumnConfig("CheckBDM").options = ['Да', 'Нет'];
            }
            return;
          }
          if (editor.column === "CommentsBDM") {
            // Комментарий доступен только если CheckBDM == 'Нет'
            if (item.CheckBDM == 'Нет') {
              return;
            } else {
              return false;
            }
          }
          return;
        } else {
          return false;
        }
      }

      // ========== 2. FFM ==========
      if (item.IsFFM != 0) {
        // FFM может менять CheckFFM, пока BDM не поставил 'Да' или 'Разрешаю корректировку'
        if (item.CheckBDM !== 'Да' && item.CheckBDM !== 'Разрешаю корректировку') {
          if (editor.column !== "CheckFFM") {
            return false;
          }
          return;
        } else {
          return false;
        }
      }

      // ========== 3. Обычные редакторы (IsEdit != 0) ==========
      if (item.IsEdit != 0) {

        // ProcTask(исключение для Амальская)
        if (localStorage.getItem('Author') == 30576 && editor.column == "ProcTask" && item.IsProcTask == 1) {
          return true;
        }

        if (item.CheckFFM == 'Да' || item.CheckBDM == 'Да' || item.CheckBDM == 'Разрешаю корректировку') {
          return false;
        }

        // Formulation
        if (editor.column == "Formulation") {
          switch (item.TaskType) {
            case 'ДМП, оборудование':
              this.getColumnConfig("Formulation").options = ['Размещение не менее X  ДМП по продукту Z согласно АП в сети Y на период не менее T дней', 'Согласование и установка не менее X ДМП сверх согласованных ЦО в тт сетей Y на период не менее T дней', 'Размещение не менее X страйп-лент в  N тт сети Y на период не менее T дней',
                'Размещение не менее X дополнительного оборудования Шторк подвесы/диспенсоры в тт сети Y на период не менее T дней', 'Согласование и установка не менее X напольного оборудования Шторк сверх согласованных ЦО в тт сетей Y на период не менее T дней'];
              break;
            case 'Прикасса':
              this.getColumnConfig("Formulation").options = ['Размещение не менее X страйп-лент на R кассах тт сети Y на период не менее T дней', 'Размещение не менее X страйп-лент ( другое прикассовое оборудование Шторк) на R кассах в кол-ве N тт сети Y на период не менее T дней', 'Размещение  продукта Z на прикассовой зоне в количестве N магазинов сети Y на период не менее T дней',
                'Размещение  продукта Z на прикассовой зоне, не ниже M полки в кол-ве N тт сети Y на период не менее T дней', 'Размещение продукта Z не менее, чем на R крючках прикассовой зоны в кол-ве N тт сети Y на период не менее T дней', 'Размещение  продукта Z  не менее чем на X кассах, в количестве N магазинов сети Y на период не менее T дней',
                'Размещение продукции Шторк на X кассах самообслуживания тт сети Y на период не менее T дней'];
              break;
            case 'Расширение доли полки':
              this.getColumnConfig("Formulation").options = ['Увеличение кол-ва фейсов позиции Z до кол-ва F в кол-ве N тт сети Y с периодом поддержания не менее T дней', 'Выкладка в категории продукта Z с долей полки не менее F% в кол-ве N  тт сети Y на период не менее T дней',
                'Cогласование и выкладка продукта Z лучше официальной планограммы на R фейсов в кол-ве N магазинов сети Y на период не менее T дней', 'Cогласование и выкладка продукции Шторк лучше официальной планограммы в кол-ве N магазинов сети Y на период не менее T дней', 'Увеличение выкладки продукта Z на N вертикалей в X торговых точек сети Y на период T дней'];
              break;
            case 'Выкладка планограммы':
              this.getColumnConfig("Formulation").options = ['Выкладка корпоративным блоком  в категории конфет не менее, чем в N магазинах  тт сети Y на период не менее T дней', 'Выкладка продукта Z в категории на полках не ниже полки M/не выше полки M в кол-ве N тт сети Y на период не менее T дней', 'Выкладка продукции не хуже чем по планограмме в кол-ве N тт сети Y  на период не менее T дней',
                'Выкладка продукта Z в категории не менее, чем M% тт сети Y на период не менее T дней', 'Выкладка всех sku минимум в 1 фейс в категории в кол-ве N тт сети Y на период не менее T дней', 'Размещение продукта Z в своей категории не менее, чем на R крючках в  кол-ве N тт сети Y  на период не менее T дней',
                'Найм X сотрудников проекта Самозанятые для работы в сети Y на период T дней', 'Увеличение товарного лимита продукции M в X торговых точек сети Y до N на период T дней', 'Согласование и отгрузка N продукта M в X торговых точек сети Y на период T дней', 'Выкладка ассортимента N единым блоком в X торговых точек сети Y на период T дней'];
              break;
            case 'Выполнение задач подчиненными':
              this.getColumnConfig("Formulation").options = ['Выполнение задач мерчандайзерами своей территории', 'Выполнение задач КАЕ своей территории'];
              break;
            default:
              return false;
          }
        }

        // Запрет на колонки BDM и FFM
        if (editor.column == "CheckBDM" || editor.column == "CommentsBDM" || editor.column == "CheckFFM") {
          return false;
        }

        // Y
        if (editor.column == "Y") {
          this.getColumnConfig("Y").options = ["Вся АП", "7 шагов", "Metro", "Авоська", "Агат Логистик", "Азбука вкуса", "Аникс", "Ароматный мир", "Арт Маркет", "Атак", "АШАН", "АШАН-СИТИ", "Батон", "Бахетле", "Бегемот_Кемерово", "Бегемот_Тамбов", "Близкий", "Болтрукевич", "Быстроном", "Верный", "Виктория (МСК)", "Виктория (СЗФО)", "Винлаб", "Вкустер", "Высшая лига Кострома", "Гипербола", "Глобус", "ГриНН_РФ", "Гулливер", "Гулливер_Кострома",
            "Десяточка_Кострома", "Десяточка_Хабаровский Край", "Детский Мир", "Дикси", "Доброцен", "Европа", "Золотой Ключик", "Караван_Чита", "Караван_Пенза", "Кировский", "Командор", "Кораблик", "Красный Яр", "Кэш-энд-Кэрри", "Лама", "Лента ГМ", "Лента ММ", "Лента СМ", "Лион", "Лион(Берега)", "Магнолия", "Макси", "Макс-Микс", "Мария - Ра", "Маяк", "Метрополис", "Миндаль", "Мираторг", "ММР", "Молния", "Монетка", "Наш Дисконт", "НК Сити", "Новоторг", "Окей ГМ", "Окей СМ", "ОРТ-Универсал", "ООО Глобус Маркет", "Пеликан", "Пеликан_Тольятти",
            "Пеликан_Хабаровск", "Перекресток", "Перекресток ГМ", "Петровский", "Пикник (Яблоко)", "Пловдив", "Пятерочка", "РАЗДВА", "Реалъ", "Реми", "Розница", "Русалка", "Русский Разгуляйка", "Самбери", "Семья", "Семья Пермь", "Семья_Калининград", "Сезон", "Система Глобус", "Слата", "СПАР", "Спар ГМ", "Спар СМ", "Спар_НН", "Спар_Тула", "Спар-экспресс", "Спутник", "Спутник_Улан Удэ", "Спутник_Чита", "Столица", "Тандер", "Тандер ГМ", "Титан", "Триумф", "Формат", "Хороший", "Холлифуд", "Хочу Еще", "Челны Хлеб", "Экономыч", "Яблоко_Крым",
            "Брусничка", "Ю Маркет", "Бутыль", "Супер Бабилон", "Южный-Синтез", "Гурман", "Зеленое Яблоко", "Центрторг", "Апельсин", "Бристоль", "Ценочист", "СПАР (формат)", "Городок", "Хлеб Соль", "Байрам", "НТС", "Абсолют", "Победа", "Спар-Омск"];
        }

        // Z
        if (editor.column == "Z") {
          this.getColumnConfig("Z").options = ['Мерси конфеты', 'Мерси плитка', 'Мамба жевательные конфеты', 'Мамба фрумеладки', 'Прикассовый ассортимент', 'Тоффифе', 'Вертерс', 'Полочный ассортимент', 'Весь ассортимент'];
        }

        // CopyUser
        if (editor.column == "CopyUser") {
          let userData = [];
          let uniqueUsers = {};
          this.data.each(function (obj) {
            if (!uniqueUsers[obj.UserID] && obj.UserID != item.UserID && (obj.IsEdit == 1 || obj.IsBDM == 1)) {
              uniqueUsers[obj.UserID] = true;
              userData.push({ UserID: obj.UserID, UserName: obj.UserName });
            }
          });
          this.getColumnConfig("CopyUser").options = userData.map(user => {
            return { id: user.UserID, value: user.UserName };
          });
        }

        // ProcTask
        if (editor.column == "ProcTask" && item.IsProcTask == 0) {
          return false;
        }

        return;
      }

      // ========== 4. Пользователь без прав ==========
      else {
        if (item.CheckFFM == 'Да' || item.CheckBDM == 'Да' || item.CheckBDM == 'Разрешаю корректировку') {
          return false;
        }
        if (editor.column == "ProcTask" && item.IsProcTask == 1) {
          return true;
        }
        return false;
      }
    },
    //сохранение ответов           
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      let item = this.getItem(editor.row);
      if (state.value != state.old && editor.column != 'CopyUser') {
        let question, answer;
        const sync = "<span class='fas fa-sync'></span>";
        switch (editor.column) {
          case 'TaskType': question = 1; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'Formulation': question = 2; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'F': question = 3; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'M': question = 4; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'N': question = 5; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'R': question = 6; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'T': question = 7; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'Y':
            question = 8; answer = state.value.includes("Вся АП") ? "Вся АП" : state.value; item.Y = answer; //Вся АП перекрывает другие варианты
            item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); item.NetworksID = sync;
            break;
          case 'Z': question = 9; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'X': question = 10; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'Points': question = 11; answer = state.value; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); break;
          case 'CheckBDM': question = 13; answer = state.value; item.CheckBornedBDM = 'Сегодня'; item.AuthorBDM = localStorage.getItem('UserName'); break;
          case 'CommentsBDM': question = 14; answer = state.value; break;
          case 'Comments': question = 15; answer = state.value; break;
          case 'ProcTask': question = 16; answer = state.value; break;
          case 'CheckFFM': question = 17; answer = state.value == "Убрать отметку" ? "" : state.value; item.AuthorFFM = localStorage.getItem('UserName'); break;
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': question, 'Option': null, 'Answer': answer, 'Company': localStorage.getItem('CompanyID'), 'Report': 248, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
      else if (state.value != state.old && state.value != '' && editor.column == 'CopyUser') {
        webix.confirm({
          text: "Скопировать задачу: '" + item.Task + "' выбранным сотрудникам?",
          callback: function (result) {
            if (result) {
              $.ajax({
                url: '../../Services/Desktop.asmx/SetReportAnswer',
                data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': 20, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': 248, 'Author': localStorage.getItem('Author') }),
                error: function (xhr, ajaxOptions, thrownError) { onError(); }
              });
              webix.message("Данные скопированны, необходимо обновить отчет");
            }
          }
        });
      }
    },
    onItemClick: function (id) {
      let item = this.getItem(id);
      if (id.column == 'CopyOldTask' && (item.IsEdit != 0 || item.IsBDM != 0)) {
        webix.confirm({
          text: "Скопировать задачу за прошлый период?",
          callback: function (result) {
            if (result) {
              const sync = "<span class='fas fa-sync'></span>";
              item.TaskType = sync; item.Formulation = sync; item.F = sync; item.M = sync; item.N = sync; item.R = sync; item.T = sync; item.Z = sync;
              item.X = sync; item.TaskName = sync; item.NetworksID = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
              $.ajax({
                url: '../../Services/Desktop.asmx/SetReportAnswer',
                data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': 22, 'Option': null, 'Answer': null, 'Company': localStorage.getItem('CompanyID'), 'Report': 248, 'Author': localStorage.getItem('Author') }),
                error: function (xhr, ajaxOptions, thrownError) { onError(); }
              });
              webix.message("Данные скопированны, необходимо обновить отчет");
            }
          }
        });
      }
    }
  },
}

//Шторк "ТАБЕЛЬ (платформа ШТОРК)"
var addStorckTimesheet = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "City", header: ["Город", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
    { id: "RegionCode", header: [{ text: "COST centers", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "RegionMaster", header: ["Ответственный", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "ContractType", header: [{ text: "Тип договора", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "DateHire", header: [{ text: "Дата приема", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "date" },
    { id: "DateDismissal", header: [{ text: "Дата увольнения", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "date" },
    { id: "Type", header: ["План/факт", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day1",  header: ["1",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day2",  header: ["2",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day3",  header: ["3",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day4",  header: ["4",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day5",  header: ["5",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day6",  header: ["6",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day7",  header: ["7",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day8",  header: ["8",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day9",  header: ["9",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day10", header: ["10", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day11", header: ["11", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day12", header: ["12", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day13", header: ["13", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day14", header: ["14", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day15", header: ["15", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day16", header: ["16", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day17", header: ["17", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day18", header: ["18", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day19", header: ["19", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day20", header: ["20", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day21", header: ["21", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day22", header: ["22", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day23", header: ["23", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day24", header: ["24", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day25", header: ["25", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day26", header: ["26", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day27", header: ["27", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day28", header: ["28", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day29", header: ["29", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day30", header: ["30", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "Day31", header: ["31", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] },
    { id: "SumDay", header: [{ text: "Кол-во раб.дней", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "HolidayPaid", header: [{ text: "Отпуск оплачиваемый (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "HolidayNoPaid", header: [{ text: "Отпуск за свой счет (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "Mission", header: [{ text: "Командировки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "SickLeave", header: [{ text: "Больничный (даты)", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "Absense", header: [{ text: "Прочие неявки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "Holidays", header: [{ text: "Региональные праздники (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "NonWork", header: [{ text: "Нерабочие дни у сотрудника (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      var item = this.getItem(editor.row);
      //доступ имеет только рук/бдм и роли по списку
      if (item.RegionMasterID == localStorage.getItem('Author') || item.MasterID == localStorage.getItem('Author') || item.IsEdit == 1 || item.IsMaster == 1) {
        if (editor.column.startsWith("Day")) {
          for (let i = 1; i <= 31; i++) {
            //запрет редактирования для дней которых нет в месяце
            if (editor.column == ("Day" + i) && i > item.DayCount) { return false; }
            //отметка 'Н' доступна только для факта, а 1 в факте только определенным ролям
            else { this.getColumnConfig("Day" + i).options = (item.Type == 'план') ? ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', ' '] : (item.IsEdit == 1) ? ['1', 'Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' '] : ['Б', 'О', 'ОСЧ', 'К', 'РП', 'НД', 'Н', ' ']; }
          }
        }        
        else if (item.Type == 'факт') { return false; }; //столбцы города и дата приема/увольнения рудактируются только в "плане"
      }
      else { return false; };
    },
    //сохранение ответов
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        let type, answer, borned = '01.01.3333'
        switch (editor.column) {   
          case 'DateHire': type = 3; answer = webix.i18n.parseFormatStr(state.value); item.DateHire = answer; break; //"Дата приема"
          case 'DateDismissal': type = 4; answer = webix.i18n.parseFormatStr(state.value); item.DateDismissal = answer; break; //"Дата увольнения"
          default:
            //отметка на день
            type = item.Type == 'план' ? 1 : 2;
            answer = state.value;
            const dateParts = item.Borned.split('.');
            borned = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
            borned.setDate(borned.getDate() + (editor.column.replace("Day", "") - 1)); //добавляем к началу месяца количество дней выбранного столбца
            item.SumDay = (state.value == '1' || state.old == '1') ? "<span class='fas fa-sync'></span>" : item.SumDay;
            item.SickLeave = (state.value == 'Б' || state.old == 'Б') ? "<span class='fas fa-sync'></span>" : item.SickLeave;
            item.HolidayPaid = (state.value == 'О' || state.old == 'О') ? "<span class='fas fa-sync'></span>" : item.HolidayPaid;
            item.HolidayNoPaid = (state.value == 'ОСЧ' || state.old == 'ОСЧ') ? "<span class='fas fa-sync'></span>" : item.HolidayNoPaid;
            item.Mission = (state.value == 'К' || state.old == 'К') ? "<span class='fas fa-sync'></span>" : item.Mission;
            item.Absense = (state.value == 'Н' || state.old == 'Н') ? "<span class='fas fa-sync'></span>" : item.Absense;
            item.Holidays = (state.value == 'РП' || state.old == 'РП') ? "<span class='fas fa-sync'></span>" : item.Holidays;
            item.NonWork = (state.value == 'НД' || state.old == 'НД') ? "<span class='fas fa-sync'></span>" : item.Absense;
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetTimesheet',
          data: JSON.stringify({ 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(borned), 'Type': type, 'Answer': answer, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  },
}

//Шторк "Tailor made"
var addStorckReportTaliorMade = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointExtra4", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 100, minWidth: 20, sort: "string" },
    { id: "PointExtra1", header: ["Ответственный менеджер", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "EAN", header: ["Номенклатурный номер", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["ПОСМ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "PointExtra3", header: ["Дистрибьютор", { content: "textFilter" }], width: 90, minWidth: 20, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 20, sort: "string" },
    { id: "ActionType", header: ["Согласно АП ЦО/Самостоятельно", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "UserName", header: ["ФИО сотрудника", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "Start", header: ["Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Окончание периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Ссылка на фото", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string" },
    { id: "Answer9456", header: ["Действие по оборудованию", { content: "textFilter" }], width: 190, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "PointExtra2", header: ["Ответственный за локацию", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
  ],
}

//Traditional trade "Срез Традиции"
var addTradeReportShear = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Region", header: ["Регион", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "PCM", header: ["Ответственный РСМ", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "UserName", header: [{ text: "Сотрудник, посетивший тт", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Distributor", header: [{ text: "Дистрибьютор на территории", css: "multiline" }, { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период отчета", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "AllVisits", header: [{ text: "Точек посещено", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitsNew", header: [{ text: "Из них новые точки", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answers10509", header: [{ text: "Заполнена инф-ция Шторк", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answers10510", header: [{ text: "Заполнена инф-ция конкуренты", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answers10507", header: [{ text: "Сделано фото полки", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answers10508", header: [{ text: "Сделано фото кассы", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answers10543", header: [{ text: "Кол-во поставленных задач", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "AnswersDistrib", header: [{ text: "Кол-во переданных на дистрибьютора задач", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "AnswersIsCheckYes", header: [{ text: "Кол-во выполненных задач", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "AnswersIsCheckNo", header: [{ text: "Кол-во задач с отметкой 'нет'", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
  ]
}

//Шторк "Мониторинг конкурентов СПб"
var addStorckMonitoringRivalSPb = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 20, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 20, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "Answer", header: ["Ответ", { content: "textFilter" }], width: 60, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Файл", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
  ]
}

//Шторк "Мониторинг Шторк СПб"
var addStorckMonitoringSPb = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 20, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 20, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "Answer", header: ["Ответ", { content: "textFilter" }], width: 60, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo", header: ["Файл", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
  ]
}

//Шторк "Контакты ПОДРОБНО"
var addStorckContacts = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 20, sort: "string" },
    { id: "UserExtra2", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 20, sort: "string" },
    { id: "UserExtra3", header: ["Город", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 20, sort: "string" },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "Email", header: ["Эл.почта", { content: "textFilter" }], width: 300, minWidth: 20, sort: "string" },
    { id: "UserExtra1", header: ["Телефон", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
  ]
}

//Шторк "Контакты СВОДНАЯ"
var addStorckContactsPivot = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 15, rowHeight: 72,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 20, sort: "string" },
    { id: "Volga", header: ["Волга", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "Siberia", header: ["Сибирь и ДВ", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "Ural", header: ["Урал", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "Northwest", header: ["Северо-Запад", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "South", header: ["Юг", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "Moscow", header: ["Москва", { content: "textFilter" }], width: 200, minWidth: 20, sort: "string" },
    { id: "AllRegions", header: ["Все регионы", { content: "textFilter" }], width: 300, minWidth: 20, sort: "string" },
  ]
}

//ПепсиКо "Итоговый отчет"
var addPepsikoFinalReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [{ text: "ID тт по ГТС", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Name", header: ["Регион ЛТ", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Extra3", header: [{ text: "Region Description", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Extra4", header: [{ text: "City Description", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "OutCode", header: [{ text: "Customer ID Source", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "NetworkName", header: [{ text: "Customer Description Source", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "OfficeName", header: ["Область", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "Address", header: ["Full Address", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Filter", header: [{ text: "Кол-во кулеров в точке заявлено", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActionStatus", header: [{ text: "Статус анкеты", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Info", header: [{ text: "Инфо по визиту", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", template: function () { return "ссылка"; }, css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "PointFound", header: [{ text: "Точка найдена", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoTask1", header: [{ text: "Фото(1) здания", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "PhotoTask2", header: [{ text: "Фото(2) здания", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "PhotoTask3", header: [{ text: "Фото(3) здания", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "PhotoSign", header: [{ text: "Фото вывески", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PhotoAddress", header: [{ text: "Фото адреса тт", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PointName", header: ["Название тт", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "ClientINN", header: ["ИНН клиента", { content: "textFilter" }], width: 90, sort: "string", exportType: 'number', exportFormat: "#" },
    { id: "PhotoINN", header: [{ text: "Фото ИНН", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Comment", header: ["Комментарии", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "ArtName", header: [{ text: "Наименование в GTS", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "FoundXO", header: [{ text: "ХО Pepsico найден", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "AvailabPlaceXO", header: [{ text: "ХО в доступном месте", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoXO1", header: [{ text: "Фото(1) ХО", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string" },
    { id: "PhotoXO2", header: [{ text: "Фото(2) ХО", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string" },
    { id: "PhotoXO3", header: [{ text: "Фото(3) ХО", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string" },
    { id: "BarCode", header: [{ text: "Бар-код ХО(сканирование)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", exportType: 'string' },
    { id: "BarCodeNum", header: [{ text: "Бар-код ХО(номер)", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", exportType: 'string' },
    { id: "PhotoBarCode1", header: [{ text: "Фото(1) баркод", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "PhotoBarCode2", header: [{ text: "Фото(2) баркод", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "PhotoBarCode3", header: [{ text: "Фото(3) баркод", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Serial", header: [{ text: "Серийный номер ХО(сканирование)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", exportType: 'string' },
    { id: "SerialNum", header: [{ text: "Серийный номер ХО(номер)", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "string", exportType: 'string' },
    { id: "PhotoSerial1", header: [{ text: "Фото(1) серийный номер", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PhotoSerial2", header: [{ text: "Фото(2) серийный номер", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PhotoSerial3", header: [{ text: "Фото(3) серийный номер", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "UserName", header: [{ text: "Контакты тт при отсутствии ХО (ФИО)", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Phone", header: [{ text: "Контакты тт при отсутствии ХО (Телефон)", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "CommentXO", header: [{ text: "Комментарии по ХО", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "CommentPoint", header: [{ text: "Комментарии по тт", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
  ],
  on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (id.column == 'Info') {
        
        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = item.Borned;
        VisitGUID = item.GUID;

        e.stopPropagation();

        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);
      }
    }
  },
}

//Barilla "Промо отчет"
var addBarillaPromoReport = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "ActionYear", header: ["Год", { content: "textFilter" }], width: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "ActionMonth", header: ["Месяц", { content: "textFilter" }], width: 50, sort: "int", css: { 'text-align': 'center' } },
    { id: "Period", header: ["Период промо", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["ТС", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "ActionName", header: [{ text: "№ промо (наименование)", css: "multiline" }, { content: "textFilter" }], width: 170, sort: "string" },
    { id: "ActionType", header: ["Категория", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "PointName", header: [{ text: "Внутренне наименование ТТ", css: "multiline" }, { content: "textFilter" }], width: 130, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "OutCode", header: ["Локация", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "UserASM", header: ["ASM", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "PointStatus", header: ["МА", { content: "textFilter" }], width: 120, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "IsPromoPrice", header: ["Промо-ценник", { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "AvailableDMP", header: [{ text: "Наличие ДМП", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' }},
    { id: "ViewDMP", header: ["Вид ДМП", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "Comment", header: ["Комментарии", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "VisitLink", header: [{ text: "Ссылка на отчет", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue' } },
    { id: "Photos", header: ["Ссылка фото", { content: "textFilter" }], width: 80, sort: "string" },
  ],
  on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (id.column == 'VisitLink' && item.VisitLink == 'ссылка') {
  
        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = item.Borned;
        VisitGUID = item.GUID;
  
        e.stopPropagation();
  
        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);
      }
    }
  },
}

//Айсберри "Отчет по матрице"
var addIceberryReportMatrix2 = {
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

//Айсберри "Длительные OOS"
var addIceberryDurationOOS2 = {
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
    { id: "EAN", header: ["ш/к", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "PLUCode", header: ["PLU", { content: "textFilter" }], width: 65, sort: "string" },
    { id: "PeriodWk", header: [{ text: "Период (недели)", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Availabil", header: ["Наличие", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonOOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, sort: "string", },
  ],
}

//Шторк "Сторчек Конфеты"
var addStorckStorchekCandies = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Answer15018", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, sort: "string", editor: "select", options: ['HM', 'C&C', 'SML', 'SMS', 'MM', 'Large Disc', 'Small Disc', 'Hard Disc', 'Alco SM', 'Alco Dsc'] },
    { id: "Answer15019", header: [{ text: "Кол-во регал", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15028", header: [{ text: "Кол-во полок в регале", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15020", header: [{ text: "Длина полки, см", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }},
    { id: "Answer15021", header: [{ text: "Всего СКЮ в категории", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15022", header: [{ text: "Корректировка общей длины полки, см", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15023", header: [{ text: "Ручной ввод длины полки категории, см", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "TotalShelfs", header: [{ text: "Всего полок", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' } },
    { id: "TotalShelfLen", header: [{ text: "Всего длина, см", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },

    { id: "Stock155418", header: [{ text: "Мерси скю на полке", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155418", header: [{ text: "Мерси длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155418", header: [{ text: "Мерси, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155418", header: [{ text: "Мерси, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155419", header: [{ text: "Тоффифе скю на полке", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155419", header: [{ text: "Тоффифе длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155419", header: [{ text: "Тоффифе, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155419", header: [{ text: "Тоффифе, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 105, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelfShareCandy", header: [{ text: "Доля полки Шторк (конфеты)", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShareCandy", header: [{ text: "Доля Шторк в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155420", header: [{ text: "Рафаэлло скю на полке", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155420", header: [{ text: "Рафаэлло длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155420", header: [{ text: "Рафаэлло, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155420", header: [{ text: "Рафаэлло, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 105, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155421", header: [{ text: "Роше (+Колл и Гарден) скю на полке", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155421", header: [{ text: "Роше (+колл и гарден) длина полки", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155421", header: [{ text: "Роше(+Колл и Гарден), Доля полки", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155421", header: [{ text: "Роше (+колл и Гарден), Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155422", header: [{ text: "Коркунов скю на полке", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155422", header: [{ text: "Коркунов длина полки", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155422", header: [{ text: "Коркунов, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155422", header: [{ text: "Коркунов, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155423", header: [{ text: "РЩД скю на полке", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155423", header: [{ text: "РЩД длина полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155423", header: [{ text: "РЩД, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155423", header: [{ text: "РЩД, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155424", header: [{ text: "Линдт скю на полке", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155424", header: [{ text: "Линдт длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155424", header: [{ text: "Линдт, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155424", header: [{ text: "Линдт, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155425", header: [{ text: "Комильфо скю на полке", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155425", header: [{ text: "Комильфо длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155425", header: [{ text: "Комильфо, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155425", header: [{ text: "Конмильфо, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155426", header: [{ text: "Конкурент 1 скю на полке", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155426", header: [{ text: "Конкурент 1 длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155426", header: [{ text: "Конкурент 1, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155426", header: [{ text: "Конкурент 1, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Stock155427", header: [{ text: "Конкурент 2 скю на полке", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfLen155427", header: [{ text: "Конкурент 2  длина полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfShare155427", header: [{ text: "Конкурент 2, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "AssortShare155427", header: [{ text: "Конкурент 2, Доля в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },

    { id: "ArtsTotal", header: [{ text: "Итого топ бренды, Кол-во СКЮ", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtsShelfLen", header: [{ text: "Итого топ бренды (длина выкладки, см)", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtsShare", header: [{ text: "Итого топ бренды, Доля СКЮ", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ArtsAssortShare", header: [{ text: "Итого топ бренды, Доля полки", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "PlanArt", header: [{ text: "Шторк план скю на полке", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "PlanCategory", header: [{ text: "Шторк план в категории", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "PlanShelfLen", header: [{ text: "Шторк план длина полки, см", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "PlanNumShelf", header: [{ text: "Шторк план кол-во полок", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "FactArt", header: [{ text: "Шторк факт скю на полке", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "FactCategory", header: [{ text: "Шторк факт доля категории", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FactShelfLen", header: [{ text: "Шторк факт длина полки, см", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "FactNumShelf", header: [{ text: "Шторк факт кол-во полок", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ExecArt", header: [{ text: "Выполнение скю на полке", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "ExecCategory", header: [{ text: "Выполнение факт доля категории", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "ExecShelfShare", header: [{ text: "Выполнение доля полки, см", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "ExecNumShelf", header: [{ text: "Выполнение факт кол-во полок", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo1", header: ["Фото 1", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo2", header: ["Фото 2", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo3", header: ["Фото 3", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string", editor: "text" },

    { id: "ActivArt1", header: ["Активность 1", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink1", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment1", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt2", header: ["Активность 2", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink2", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment2", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt3", header: ["Активность 3", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink3", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment3", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt4", header: ["Активность 4", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink4", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment4", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt5", header: ["Активность 5", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink5", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment5", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt6", header: ["Активность 6", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink6", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment6", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt7", header: ["Активность 7", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink7", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment7", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt8", header: ["Активность 8", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink8", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment8", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt9", header: ["Активность 9", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink9", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment9", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt10", header: ["Активность 10", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink10", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment10", header: ["Комментарий", { content: "textFilter" }], width: 95, sort: "string" },
  ],
  on: {
    onAfterEditStop: function (state, editor) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        let question = -1
        let option = -1

        if (editor.column == 'Answer15018' && state.value != '') {
          question = 15018
          option = -1
          switch (state.value) {
            case 'HM': option = 6112; break;
            case 'C&C': option = 6113; break;
            case 'SML': option = 6114; break;
            case 'SMS': option = 6115; break;
            case 'MM': option = 6116; break;
            case 'Large Disc': option = 6117; break;
            case 'Small Disc': option = 6118; break;
            case 'Hard Disc': option = 6120; break;
            case 'Alco SM': option = 6121; break;
            case 'Alco Dsc': option = 6122; break;
          }
        }
        else if (editor.column == 'Comment') { question = 15145 }

        if (question !== -1) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 116251, 'Art': -1, 'Question': question, 'Option': option, 'Answer': state.value }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

//Шторк "Сторчек Плитка"
var addStorckStorchekTile = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Answer15018", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, sort: "string", editor: "select", options: ['HM', 'C&C', 'SML', 'SMS', 'MM', 'Large Disc', 'Small Disc', 'Hard Disc', 'Alco SM', 'Alco Dsc'] },

    { id: "Qty155428", header: [{ text: "Мерси, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155428", header: [{ text: "Мерси, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155428", header: [{ text: "Мерси, % скю", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155428", header: [{ text: "Мерси, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155429", header: [{ text: "Ритр спорт, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155429", header: [{ text: "Ритр спорт, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155429", header: [{ text: "Ритр спорт, % скю", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155429", header: [{ text: "Ритр спорт, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155430", header: [{ text: "Ред, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155430", header: [{ text: "Ред, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155430", header: [{ text: "Ред, % скю", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155430", header: [{ text: "Ред, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155431", header: [{ text: "Бушерон, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155431", header: [{ text: "Бушерон, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155431", header: [{ text: "Бушерон, % скю", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155431", header: [{ text: "Бушерон, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155432", header: [{ text: "Спартак, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155432", header: [{ text: "Спартак, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155432", header: [{ text: "Спартак, % скю", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155432", header: [{ text: "Спартак, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155433", header: [{ text: "Коркунов, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155433", header: [{ text: "Коркунов, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155433", header: [{ text: "Коркунов, % скю", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155433", header: [{ text: "Коркунов, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155434", header: [{ text: "Линдт, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155434", header: [{ text: "Линдт, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155434", header: [{ text: "Линдт, % скю", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155434", header: [{ text: "Линдт, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155435", header: [{ text: "Киндер, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155435", header: [{ text: "Киндер, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155435", header: [{ text: "Киндер, % скю", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155435", header: [{ text: "Киндер, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155436", header: [{ text: "Конкурент 1, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155436", header: [{ text: "Конкурент 1, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155436", header: [{ text: "Конкурент 1, % скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155436", header: [{ text: "Конкурент 1, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Qty155437", header: [{ text: "Конкурент 2, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155437", header: [{ text: "Конкурент 2, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtProc155437", header: [{ text: "Конкурент 2, % скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FaceProc155437", header: [{ text: "Конкурент 2, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },

    { id: "ArtsTotal", header: [{ text: "Итого ТОПЫ, количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "FacesTotal", header: [{ text: "Итого ТОПЫ, количество фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtsProc", header: [{ text: "Итого ТОПЫ, % скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "FacesProc", header: [{ text: "Итого ТОПЫ, % фейсов", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Answer15021", header: [{ text: "Все Скю в категории", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15047", header: [{ text: "Количество фейсов в категории", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo1", header: ["Фото 1", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo2", header: ["Фото 2", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo3", header: ["Фото 3", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string", editor: "text" },

    { id: "ActivArt1", header: ["Активность 1", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink1", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment1", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt2", header: ["Активность 2", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink2", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment2", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt3", header: ["Активность 3", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink3", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment3", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt4", header: ["Активность 4", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink4", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment4", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt5", header: ["Активность 5", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink5", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment5", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt6", header: ["Активность 6", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink6", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment6", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt7", header: ["Активность 7", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink7", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment7", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt8", header: ["Активность 8", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink8", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment8", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt9", header: ["Активность 9", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink9", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment9", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt10", header: ["Активность 10", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink10", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment10", header: ["Комментарий", { content: "textFilter" }], width: 95, sort: "string" },
  ],
  on: {
    onAfterEditStop: function (state, editor) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        let question = -1
        let option = -1

        if (editor.column == 'Answer15018' && state.value != '') {
          question = 15018
          option = -1
          switch (state.value) {
            case 'HM': option = 6112; break;
            case 'C&C': option = 6113; break;
            case 'SML': option = 6114; break;
            case 'SMS': option = 6115; break;
            case 'MM': option = 6116; break;
            case 'Large Disc': option = 6117; break;
            case 'Small Disc': option = 6118; break;
            case 'Hard Disc': option = 6120; break;
            case 'Alco SM': option = 6121; break;
            case 'Alco Dsc': option = 6122; break;
          }
        }
        else if (editor.column == 'Comment') { question = 15145 }

        if (question !== -1) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 116256, 'Art': -1, 'Question': question, 'Option': option, 'Answer': state.value }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

//Шторк "Сторчек Мармелад"
var addStorckStorchekMarmalad = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Answer15018", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, sort: "string", editor: "select", options: ['HM', 'C&C', 'SML', 'SMS', 'MM', 'Large Disc', 'Small Disc', 'Hard Disc', 'Alco SM', 'Alco Dsc'] },

    { id: "Qty155438", header: [{ text: "Мамба,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155438", header: [{ text: "Мамба,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155439", header: [{ text: "Харибо,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155439", header: [{ text: "Харибо,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 125, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155440", header: [{ text: "Бон пари,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155440", header: [{ text: "Бон пари,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 125, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155441", header: [{ text: "Фрутелла,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155441", header: [{ text: "Фрутелла,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155442", header: [{ text: "Чупа Чупс,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155442", header: [{ text: "Чупа Чупс,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155443", header: [{ text: "М&M,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155443", header: [{ text: "M&M,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155444", header: [{ text: "Крут фрут,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155444", header: [{ text: "Крут фрут,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155445", header: [{ text: "Skittles,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155445", header: [{ text: "Skittles,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 125, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155446", header: [{ text: "Конкурент 1,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155446", header: [{ text: "Конкурент 1,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155447", header: [{ text: "Конкурент 2,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155447", header: [{ text: "Конкурент 2,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155448", header: [{ text: "Конкурент 3,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Face155448", header: [{ text: "Конкурент 3,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },

    { id: "ArtsTotal", header: [{ text: "Итого ТОПЫ,<br>количество скю", css: "multiline" }, { content: "textFilter" }], width: 105, sort: "string", css: { 'text-align': 'center' } },
    { id: "FacesTotal", header: [{ text: "Итого ТОПЫ,<br>количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15050", header: [{ text: "Вся категория, скю", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15051", header: [{ text: "Вся категория, фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfArts", header: [{ text: "Доля топ-брендов, скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelfFaces", header: [{ text: "Доля топ-брендов, количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelAllArts", header: [{ text: "Доля ШТОРК, скю", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelfAllFaces", header: [{ text: "Доля ШТОРК, количество фейсов (крючки/коробки)", css: "multiline" }, { content: "textFilter" }], width: 125, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Photo1", header: ["Фото 1", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo2", header: ["Фото 2", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo3", header: ["Фото 3", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string", editor: "text" },

    { id: "ActivArt1", header: ["Активность 1", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink1", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment1", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt2", header: ["Активность 2", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink2", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment2", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt3", header: ["Активность 3", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink3", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment3", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt4", header: ["Активность 4", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink4", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment4", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt5", header: ["Активность 5", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink5", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment5", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt6", header: ["Активность 6", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink6", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment6", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt7", header: ["Активность 7", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink7", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment7", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt8", header: ["Активность 8", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink8", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment8", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt9", header: ["Активность 9", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink9", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment9", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt10", header: ["Активность 10", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink10", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment10", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt11", header: ["Активность 11", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink11", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment11", header: ["Комментарий", { content: "textFilter" }], width: 95, sort: "string" },
  ],
  on: {
    onAfterEditStop: function (state, editor) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        let question = -1
        let option = -1

        if (editor.column == 'Answer15018' && state.value != '') {
          question = 15018
          option = -1
          switch (state.value) {
            case 'HM': option = 6112; break;
            case 'C&C': option = 6113; break;
            case 'SML': option = 6114; break;
            case 'SMS': option = 6115; break;
            case 'MM': option = 6116; break;
            case 'Large Disc': option = 6117; break;
            case 'Small Disc': option = 6118; break;
            case 'Hard Disc': option = 6120; break;
            case 'Alco SM': option = 6121; break;
            case 'Alco Dsc': option = 6122; break;
          }
        }
        else if (editor.column == 'Comment') { question = 15145 }

        if (question !== -1) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 116257, 'Art': -1, 'Question': question, 'Option': option, 'Answer': state.value }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

//Шторк "Сторчек Касса"
var addStorckStorchekKassa = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Answer15018", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 80, sort: "string", editor: "select", options: ['HM', 'C&C', 'SML', 'SMS', 'MM', 'Large Disc', 'Small Disc', 'Hard Disc', 'Alco SM', 'Alco Dsc'] },
    { id: "Answer15087", header: [{ text: "Количество КУ формата с", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15088", header: [{ text: "Количество КУ формата а/b", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15089", header: [{ text: "Количество КУ формата a/b/с", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15090", header: [{ text: "Количество КУ формата a/а", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15091", header: [{ text: "Количество КУ формата a/а/с", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15092", header: [{ text: "Количество КУ формата Алкомаркет", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15093", header: [{ text: "Количество КУ формата Лента", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15094", header: [{ text: "Количество КСО напольных", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15095", header: [{ text: "Количество КСО настольных", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "TotalKassa", header: [{ text: "ИТОГО касс", css: "multiline" }, { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' } },

    { id: "Qty155438", header: [{ text: "Мамба,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155438", header: [{ text: "Мамба,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155443", header: [{ text: "Харибо,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155443", header: [{ text: "Харибо,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155439", header: [{ text: "Бон пари,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155439", header: [{ text: "Бон пари,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155445", header: [{ text: "Фрутелла,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155445", header: [{ text: "Фрутелла,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155440", header: [{ text: "Чупа Чупс,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155440", header: [{ text: "Чупа Чупс,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty157373", header: [{ text: "Крут фрут,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks157373", header: [{ text: "Крут фрут,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155441", header: [{ text: "М&M,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155441", header: [{ text: "M&M,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty157374", header: [{ text: "Skittles,<br>количество СКЮ", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks157374", header: [{ text: "Skittles,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155442", header: [{ text: "Конкурент 1,<br>количество скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155442", header: [{ text: "Конкурент 1,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty157375", header: [{ text: "Конкурент 2,<br>количество скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks157375", header: [{ text: "Конкурент 2,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },
    { id: "Qty155444", header: [{ text: "Конкурент 3,<br>количество скю", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string", css: { 'text-align': 'center' } },
    { id: "Hooks155444", header: [{ text: "Конкурент 3,<br>количество крючков", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' } },

    { id: "ArtsTotal", header: [{ text: "ИТОГО топ бренды, количество скю", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' } },
    { id: "HooksTotal", header: [{ text: "ИТОГО топ бренды, количество крючков", css: "multiline" }, { content: "textFilter" }], width: 130, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15098", header: [{ text: "Вся категория, скю", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer15099", header: [{ text: "Вся категория, крючки", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' } },
    { id: "ShelfArts", header: [{ text: "Доля топ-брендов в ассортименте", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelfHooks", header: [{ text: "Доля топ-брендов по доле полки", css: "multiline" }, { content: "textFilter" }], width: 115, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelStorckArts", header: [{ text: "Доля ШТОРК в ассортименте, скю", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "ShelfStorckHooks", header: [{ text: "Доля ШТОРК по доле полки", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "string", css: { 'text-align': 'center' }, cssFormat: function (value) { return value > 80 ? "red_highlight" : "" } },
    { id: "Photo1", header: ["Фото 1", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo2", header: ["Фото 2", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Photo3", header: ["Фото 3", { content: "textFilter" }], width: 50, sort: "string" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string", editor: "text" },

    { id: "ActivArt1", header: ["Активность 1", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink1", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment1", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt2", header: ["Активность 2", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink2", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment2", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt3", header: ["Активность 3", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink3", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment3", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt4", header: ["Активность 4", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink4", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment4", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt5", header: ["Активность 5", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink5", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment5", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt6", header: ["Активность 6", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink6", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment6", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt7", header: ["Активность 7", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink7", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment7", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt8", header: ["Активность 8", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink8", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment8", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt9", header: ["Активность 9", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivLink9", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment9", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt10", header: ["Активность 10", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink10", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment10", header: ["Комментарий", { content: "textFilter" }], width: 85, sort: "string" },
    { id: "ActivArt11", header: ["Активность 11", { content: "textFilter" }], width: 90, sort: "string" },
    { id: "ActivLink11", header: ["Фото", { content: "textFilter" }], width: 40, sort: "string" },
    { id: "ActivComment11", header: ["Комментарий", { content: "textFilter" }], width: 95, sort: "string" },
  ],
  on: {
    onAfterEditStop: function (state, editor) {
      var item = this.getItem(editor.row);
      if (state.value != state.old) {
        let question = -1
        let option = -1

        if (editor.column == 'Answer15018' && state.value != '') {
          question = 15018
          option = -1
          switch (state.value) {
            case 'HM': option = 6112; break;
            case 'C&C': option = 6113; break;
            case 'SML': option = 6114; break;
            case 'SMS': option = 6115; break;
            case 'MM': option = 6116; break;
            case 'Large Disc': option = 6117; break;
            case 'Small Disc': option = 6118; break;
            case 'Hard Disc': option = 6120; break;
            case 'Alco SM': option = 6121; break;
            case 'Alco Dsc': option = 6122; break;
          }
        }
        else if (editor.column == 'Comment') { question = 15145 }

        if (question !== -1) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 116645, 'Art': -1, 'Question': question, 'Option': option, 'Answer': state.value }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

//Шторк "Мотивация"
var addStorckMotivation = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "EAN", header: [{ text: "Номенклатурный номер (SKU)", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "string" },
    { id: "Answer15116", header: ["Наименование оборудования", { content: "excelFilter", mode: "text" }], width: 350, sort: "string" },
    { id: "Answer15119", header: ["Кол-во", { content: "textFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 155, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО сотрудника", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ExecutionTask1", header: [{ text: "Выполнение декабрь по Задаче 1, %", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита 1", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo11", header: [{ text: "Фото стойка визит 1", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12", header: [{ text: "Фото полка визит 1", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Answer1", header: ["Статус 1", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "Borned2", header: ["Дата визита 2", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo21", header: [{ text: "Фото стойка визит 2", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo22", header: [{ text: "Фото полка визит 2", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Answer2", header: ["Статус 2", { content: "textFilter" }], width: 110, sort: "string" },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "VerificationAutor", header: ["Ответственный", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "VerificationStatus", header: [{ text: "Отметка о проверке", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: [' ', 'Да', 'Нет'] },
    { id: "CheckDups", header: [{ text: "Проверка на дубли из согласованной АП с ЦО", css: "multiline" }, { content: "textFilter" }], width: 120, sort: "string" },
    { id: "Comment", header: ["Комментарий", { content: "textFilter" }], width: 100, sort: "string", editor: "text" },
  ],
  on: {
    onBeforeEditStart: function (id) {
      const item = this.getItem(id);
      if (id.column == "VerificationStatus" && item.IsEditCheck == 0) { return false; }
      if (id.column == "Comment" && item.IsEditComment == 0) { return false; }
    },
    onAfterEditStop: function (state, editor) {
      const item = this.getItem(editor.row);
      if (state.value != state.old) {
        let question = -1

        if (editor.column == 'VerificationStatus' && ([' ', 'Да', 'Нет'].includes(state.value)) ) {
          question = 1
          item.VerificationAutor = localStorage.getItem('UserName');
          item.VerificationDate = 'Сегодня';
        }
        else if (editor.column == 'Comment') { question = 2 }

        if (question !== -1) {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetReportAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': item.Borned, 'Action': 116741, 'Art': item.ArtID, 'Question': question, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

//Шторк "Промо лок сети Построчно"
var addStorckPromoLockNetwork = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.PointID == -1)
        item.$css = "light_blue_highlight";
      if (item.PointID == -2)
        item.$css = "red_highlight";
    }
  },
  columns: [
    { id: "ActionID", header: ["id анкеты", { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [{ text: "Дата заполнения", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ActionName", header: ["Наименование промо", { content: "excelFilter", mode: "text" }], width: 350, sort: "string" },
    { id: "ActionDescription", header: ["Описание промо", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ActionPeriod", header: ["Период проведения", { content: "textFilter" }], width: 160, sort: "string", css: { 'text-align': 'center' } },
    { id: "Attribute355", header: [{ text: "ФИО ответственного за сеть", css: "multiline" }, { content: "textFilter" }], width: 150, sort: "string" },
    { id: "VerificationStatus", header: ["Подтверждено", { content: "textFilter" }], width: 95, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: [' ', 'Да'] },
    { id: "Photo15114", header: [{ text: "Фото полки", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12492N1", header: [{ text: "Фото ценника", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12492N2", header: [{ text: "Фото ценника", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12492N3", header: [{ text: "Фото ценника", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12492N4", header: [{ text: "Фото ценника", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12492N5", header: [{ text: "Фото ценника", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12493N1", header: [{ text: "Ссылка на фото Каталог", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12493N2", header: [{ text: "Ссылка на фото Каталог", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "string" },
    { id: "Photo12494N1", header: [{ text: "Ссылка на фото ДМП", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12494N2", header: [{ text: "Ссылка на фото ДМП", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12494N3", header: [{ text: "Ссылка на фото ДМП", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12494N4", header: [{ text: "Ссылка на фото ДМП", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
    { id: "Photo12494N5", header: [{ text: "Ссылка на фото ДМП", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "string" },
  ],
  on: {
    onBeforeEditStart: function (id) {
      const item = this.getItem(id);
      if (item.PointID !== -1) { return false; }
    },
    onAfterEditStop: function (state, editor) {
      const item = this.getItem(editor.row);
      if (state.value != state.old && ([' ', 'Да'].includes(state.value))) {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.OfficeID, 'User': item.CityID, 'Borned': null, 'Action': item.ActionID, 'Art': item.NetworkID, 'Question': 1, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  }
}

//Шторк "Промо лок сети Полный"
var addStorckPromoLockNetworkFull = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "ActionID", header: ["id анкеты", { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "ActionPeriod", header: ["Период заполнения", { content: "textFilter" }], width: 150, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Attribute355", header: [{ text: "ФИО менеджера сети", css: "multiline" }, { content: "textFilter" }], width: 150, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "ActionName", header: ["Наименование промо", { content: "excelFilter", mode: "text" }], width: 350, sort: "string" },
    { id: "ActionDescription", header: ["Описание промо", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ActionPeriod", header: ["Период проведения", { content: "textFilter" }], width: 160, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photo15114", header: ["Фото полки", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue', 'text-align': 'center' } },
    { id: "Photo12492", header: ["Фото ценника", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue', 'text-align': 'center' } },
    { id: "Photo12493", header: ["Фото каталог", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue', 'text-align': 'center' } },
    { id: "Photo12494", header: ["Фото ДМП", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-decoration': 'underline', 'color': 'blue', 'text-align': 'center' } },
  ],
  on: {
    onItemClick: function (id) {
      if ((['Photo15114', 'Photo12492', 'Photo12493', 'Photo12494'].includes(id.column))) {
        const item = this.getItem(id);
        let question = null;
         switch (id.column) {
           case 'Photo15114': question = item.Photo15114 == null ? null : 15114; break;
           case 'Photo12492': question = item.Photo12492 == null ? null : 12492; break;
           case 'Photo12493': question = item.Photo12493 == null ? null : 12493; break;
           case 'Photo12494': question = item.Photo12494 == null ? null : 12494; break;
         }
         if (question == null)  return;

        (async () => {
          //массив промисов для всех вызовов (фильтр по офис/город/сеть/анкета/вопрос)
          const promises = [
            setFilterDictionaryPromise('Office', item.OfficeID),
            setFilterDictionaryPromise('City', item.CityID),
            setFilterDictionaryPromise('Network', item.NetworkID),
            setFilterDictionaryPromise('Action', item.ActionID),
            setFilterDictionaryPromise('Question', question)
          ];
        
          await Promise.all(promises); //ждем выполнения всех запросов

          const itemWindow = $$('menuUtility').getItem(10);
          if (itemWindow != null) {
            showReport(itemWindow);
            getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
          }
        })();
      }
    } 
  }
}

//Barilla "Магнитерочка"
var addBarillaMagniterochka = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "VisitQuarter", header: ["Квартал", { content: "textFilter" }], width: 55, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitMonth", header: ["Месяц", { content: "textFilter" }], width: 50, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitWeek", header: ["Неделя", { content: "textFilter" }], width: 50, sort: "int", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "OutCode", header: ["Локация", { content: "textFilter" }], width: 70, sort: "string" },
    { id: "UserASM", header: ["ASM", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "MasterASM", header: ["Руководитель", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ActionFilter", header: ["Анкета", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "ArtName", header: ["Наименование SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Answer13429", header: [{ text: "Наличие товара", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer13373", header: ["Причины OOS", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Answer13381", header: ["Цена", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Photos13428", header: [{ text: "Ссылка на фото ТСД", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string" },
    { id: "PhotosOMP1", header: [{ text: "Ссылка на фото ОМП 1", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string" },
    { id: "PhotosOMP2", header: [{ text: "Ссылка на фото ОМП 2", css: "multiline" }, { content: "textFilter" }], width: 85, sort: "string" },
  ],
}

//Шторк "Статистика по визитам"
var addStorckVisitStatistic = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.SortOrder == 2)
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "PointID", header: ["id точки", { content: "textFilter" }], width: 65, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Сотрудник мерч", { content: "textFilter" }], width: 20, sort: "string" },
    { id: "", header: ["Руководитель кае", { content: "textFilter" }], width: 20, sort: "string" },
    { id: "UserNameFFM", header: ["ФФМ", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, sort: "string" },
    { id: "ActionName", header: ["Номер задачи", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "ArtName", header: ["Название оборудования", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Average", header: [{ text: "Среднее 3 мес", css: "multiline" }, { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'center' } },
    { id: "Month1", header: [{ text: "Текущий месяц", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "Month2", header: [{ text: "Прошлый месяц", css: "multiline" }, { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
    { id: "Month3", header: [{ text: "Позапрошлый месяц", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//GFD "Call Rate"
var addGfdCallRate = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "UserID", header: [{ text: "ID сотрудника", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Сотрудник ", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "UserAP", header: [{ text: "АП сотрудника", css: "multiline" }, { content: "textFilter" }], width: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointsRoute", header: [{ text: "Всего тт в маршруте", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "PlanVisit", header: [{ text: "Всего визитов по плану", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "int", css: { 'text-align': 'center' } },
    { id: "AllVisit", header: [{ text: "Факт визитов", css: "multiline" }, { content: "textFilter" }], width: 55, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactVisit", header: [{ text: "Факт визитов по маршруту", css: "multiline" }, { content: "textFilter" }], width: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitProc", header: [{ text: "% выполнения запланированных визитов для ЗП", css: "multiline" }, { content: "textFilter" }], width: 165, sort: "int", css: { 'text-align': 'center' } },
    { id: "RouteProc", header: [{ text: "%  корректность выполнения маршрута", css: "multiline" }, { content: "textFilter" }], width: 105, sort: "int", css: { 'text-align': 'center' } },
  ],
}

//Шторк "Бонусные спец задачи по сети"
var addStorckBonusTaskNetwork = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 15, editable: true, leftSplit: 2, rowHeight: 63,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "OfficeName", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "UserNameFFM", header: ["FFM", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "DateLastEdit", header: [{ text: "Дата заполнения", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "TaskType", header: ["Тип задачи", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "select", options: ['ОМП', 'POSM', 'OSA', 'Товарооборот'] },
    { id: "Formulation", header: ["Формулировка", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string", editor: "select", options: null },
    { id: "X", header: [{ text: "Введите X (количество фейсов/кг)", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); /*только цифры*/ } },
    { id: "Z", header: [{ text: "Выберите Z (продукт)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", editor: "multiselect", options: null },
    { id: "F", header: [{ text: "Выберите F (вид POSM)", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", editor: "select", options: ['Страйпленты', 'Шелфбанер', 'Ценник', 'Шелфтокер'] },
    { id: "M", header: [{ text: "Введите М (показатель ОSA)", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); } },
    { id: "N", header: [{ text: "Введите N (Коэффициент (% точек))", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text", editParse: function (value) { let numValue = value.replace(/\D/g, ""); numValue = parseInt(numValue || 0); return Math.min(numValue, 100); } },
    { id: "Comments", header: [{ text: "Комментарий к формулировке (30 знаков)", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text", editParse: function (value) { return value.substring(0, 30); /*до 30 символов*/ } },
    { id: "TaskName", header: [{ text: "Формулировка задачи согласно утвержденного образца", css: "multiline" }, { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "NetworkID", header: ["ID сети", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Author", header: ["ФИО ответственного", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckFFM", header: [{ text: "Подтверждение FFM", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "string", editor: "select", options: ['Да', 'Убрать отметку'], css: { 'text-align': 'center' } },
    { id: "AuthorFFM", header: ["ФИО FFM", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckBDM", header: [{ text: "Подтверждение БДМ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "select", options: null, css: { 'text-align': 'center' } },
    { id: "CommentsBDM", header: [{ text: "Комментарий БДМ при отметке НЕТ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text" },
    { id: "AuthorBDM", header: ["ФИО БДМ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "CheckBornedBDM", header: [{ text: "Дата подтверждения БДМ", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      const item = this.getItem(editor.row);

      //бдм может редактировать только CheckBDM и CommentsBDM, если ффм поставил Да(CheckFFM)
      if (item.IsBDM == 1) {
        if (editor.column === 'CheckBDM') {
          this.getColumnConfig('CheckBDM').options = (item.IsCheck == 1)
            ? (item.TaskID == 4
              ? ['Да', 'Разрешаю корректировку', 'Отменить задачу', 'Убрать отметку']
              : ['Да', 'Отменить задачу', 'Убрать отметку'])
            : ['Да', 'Нет', 'Убрать отметку'];
          return true;
        }
        if (editor.column === 'CommentsBDM') {
          return item.CheckBDM === 'Нет';
        }
        return false;
      }

      //ффм может ставить только свою отметку
      if (editor.column === 'CheckFFM') {
        return item.IsFFM == 1;
      }

      //у кого нет доступ на редактирование задания
      if (item.IsEdit != 1) {
        return false;
      }

      //доступны только бдм
      if (editor.column === 'CheckBDM' || editor.column === 'CommentsBDM') {
        return false;
      }

      //разные формулировки при разном выбранном типе
      if (editor.column === 'Formulation') {
        const options = {
          'ОМП': ['Выкладка корпоративным блоком в категории конфет не менее, чем в N% магазинов сети'],
          'POSM': ['Размещение не менее X оборудования F в N% тт сети', 'Размещение не менее X оборудования F сети'],
          'OSA': ['Достижение показателя OSA M% по АП зоны ответственности'],
          'Товарооборот': ['Достижение показателя отгрузок X кг по сети']
        }[item.TaskType];
        if (!options) return false;
        this.getColumnConfig('Formulation').options = options;
      }

      if (editor.column === 'Z') {
        this.getColumnConfig('Z').options = ['Мерси конфеты', 'Мерси плитка', 'Мамба жевательные конфеты', 'Мамба фурмеладки', 'Прикассовый ассортимент'];
      }

      return true;
    },
    //сохранение ответов           
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      let item = this.getItem(editor.row);
      if (state.value != state.old && editor.column != 'CopyUser') {
        let question, answer;
        const author = localStorage.getItem('UserName');
        const sync = "<span class='fas fa-sync'></span>";
        switch (editor.column) {
          case 'TaskType': question = 1; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'Formulation': question = 2; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'X': question = 3; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'Z': question = 4; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'F': question = 5; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'M': question = 6; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'N': question = 7; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = author; break;
          case 'CheckBDM': question = 13; answer = state.value == "Убрать отметку" ? "" : state.value; item.CheckBornedBDM = 'Сегодня'; item.AuthorBDM = author; break;
          case 'CommentsBDM': question = 14; answer = state.value; break;
          case 'Comments': question = 15; answer = state.value; break;
          case 'CheckFFM': question = 17; answer = state.value == "Убрать отметку" ? "" : state.value; item.AuthorFFM = author; break;
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.OfficeID, 'User': item.NetworkID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': question, 'Option': null, 'Answer': answer, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
          error: function () { onError(); }
        });
      }
    },
  },
}

//Шторк "Отчет для FFM"
var addStorckReportForFFM = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 15, editable: true, rowHeight: 63,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PeriodName", header: ["Период", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "Extra2", header: ["Регион", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Extra3", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 150, sort: "string" },
    { id: "NetworkName", header: [{ text: "Сети из маршрутного листа след месяца", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 140, sort: "string" },
    { id: "Points", header: [{ text: "Кол-во точек из маршрутного листа след месяца", css: "multiline" }, { content: "textFilter" }], width: 125, sort: "string", css: { 'text-align': 'center' } },
    { id: "Task", header: [{ text: "Наличие задачи по сети", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "CheckFFM", header: [{ text: "Снять задачу", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", editor: "select", options: ['снять', ' '], css: { 'text-align': 'center' } },
    { id: "AuthorFFM", header: ["ФФМ(фио)", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "BornedFFM", header: [{ text: "Дата", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
  ],
  on: {
    onBeforeEditStart: function (editor) {
      const item = this.getItem(editor.row);
      if (item.IsEdit != 1) {
        return false;
      }
    },
    onAfterEditStop: function (state, editor) {
      const item = this.getItem(editor.row);
      if (state.value != state.old) {
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.NetworkID, 'User': item.UserID, 'Borned': item.Borned, 'Action': null, 'Art': null, 'Question': 1, 'Option': null, 'Answer': item.CheckFFM, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
          error: function () { onError(); }
        });
      }
    },
  },
}