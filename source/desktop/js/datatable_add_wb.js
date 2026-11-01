// ----- Разметка специальных отчетов для клиентов WBR

//GFD "Отчет по заполнению анкет"
var addGfdReportFillingActionsWB = {
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
    { id: "NetworkCode2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "NetworkCode", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
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

//Морозко "Визиты"
var addMorozkoReportVisit = {
  view: "datatable", id: "reportVisit", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "PointID", header: [(isEng ? 'ID' : "ID ТТ"), { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: 'Tasks', header: [(isEng) ? 'Task' : "Кол-во комментариев", { content: "textFilter" }], width: 40, css: { 'text-align': 'center', 'text-decoration': 'underline' }, sort: "int" },
    { id: 'TaskText', header: [{ text: (isEng) ? 'Text task' : "Комментарий к фото", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "AgencyPointID", header: [(isEng) ? 'ID Agency' : "ID Агентства", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int" },
    { id: "OutCode", header: [{ text: (isEng ? 'Code Point' : "Код АСУ"), css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int" },
    { id: "VisitDate", header: [(isEng ? 'Date of visit' : "Дата визита"), { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 70, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 60, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "VisitFinish", header: [{ text: (isEng) ? 'The reason for the cancellation of the visit' : "Причина отмены визита", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "VisitCheck", header: [{ text: (isEng) ? 'Confirmation of the visit' : "Подтверждение визита", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", editor: "text" },
    { id: "AuthorVC", header: [{ text: (isEng) ? 'Confirmed an employee' : "ФИ подтвердившего", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "PhotoCount", header: [(isEng) ? 'Info' : "Инфо", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "string" },
    { id: "ActionCount", header: [(isEng) ? 'Actions' : "Отчеты", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center' }, sort: "int" },
    { id: "IsAiPhotos", header: ["IR", { content: "textFilter" }], width: 40, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string" },
    { id: "GUID", header: ["GUID визита", { content: "textFilter" }], width: 165, sort: "string" },
    { id: "Comments", header: ["Комментарий к визиту", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", editor: "text" },
  ],
  on: {
    onCheck: function (id) {
      var item = this.getItem(id);
      if (item == null) return;
      setPointVisit(item);
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      if ((editor.column == "VisitCheck" || editor.column == "Comments") && state.value != state.old) {
        var item = this.getItem(editor.row);
        var question = editor.column == "VisitCheck" ? 1 : 2;
        item.AuthorVC = editor.column == "VisitCheck" ? localStorage.getItem('UserName') : item.AuthorVC;
        $.ajax({
          url: '../../Services/Desktop.asmx/SetReportAnswer',
          data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': item.Borned, 'Action': null, 'Art': null, 'Question': question, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': currentMenuID, 'Author': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    },
    onItemDblClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

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
              let visitDate = new Date(item.VisitDate.split('.').reverse().join('-'));
              //от даты визита до конца следующего месяца
              $$('Start').setValue(visitDate);
              $$('Finish').setValue(new Date(visitDate.getFullYear(), visitDate.getMonth() + 2, 0));
              $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
              $$('btnPeriod').refresh();

              var itemWindow = $$('menuUtility').getItem(68);
              if (itemWindow != null) {
                showReport(itemWindow);
                getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
              }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
          });
        }
      }
    }
  }
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