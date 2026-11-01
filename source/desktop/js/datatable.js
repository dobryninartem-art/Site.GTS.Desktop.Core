// ----- Разметка стандартного функционала

// список посещенных ТТ
var pointVisit = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'OutCode' : "Код АСУ", { content: "textFilter" }], width: 80, minWidth: 80, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 60, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 60, sort: "string" },
    { id: "Name", header: [(isEng) ? 'sign' : "Вывеска", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 300, minWidth: 100, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 100, sort: "string", hidden: ['RH', 'LT'].includes(localStorage.getItem('SystemLang')) },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 80, sort: "string", hidden: ['RH', 'LT'].includes(localStorage.getItem('SystemLang')) },
    { id: "UserFilter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", hidden: ['RH', 'LT'].includes(localStorage.getItem('SystemLang')) },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 100, sort: "string" },
    { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], width: 80, minWidth: 80, css: { 'text-align': 'center' }, sort: "int" },
    { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], width: 80, minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 80, hidden: localStorage.getItem('SystemLang') === 'RH' }
  ],
  on: {
    onItemClick: function (id) {
      updateStatusPointVisit(this, id);
    },
    onCheck: function (id, col, val) {
      var item = this.getItem(id);

      if (item == null)
        return;

      setPointVisit(item);
    }    
  }
}

// список активных пользователей
var userVisit = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "UserID", header: [(isEng) ? 'User ID' : "ID Сотрудника", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Out Code' : "Код АСУ", { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'right' } },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 110, minWidth: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "UserFilter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "DaysWorked", header: [(isEng) ? 'Days worked' : "Отработано дней", { content: "textFilter" }], width: 110, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], width: 80, minWidth: 80, css: { 'text-align': 'center' }, sort: "int" },
    { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], width: 60, minWidth: 80, css: { 'text-align': 'center' }, sort: "string" }
  ],
  on: {
    onItemClick: function (id) { updateStatusUserVisit(this, id); },
    onCheck: function (id, col, val) {
      var item = this.getItem(id);
      if (item == null)
        return;
      setUserVisit(item);
    },
  }
}

// отчет визиты
var visit = {
  view: "datatable", id: "reportVisit", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang'))) ? false : {
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
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "TaskName", header: [(isEng) ? 'Task, m' : "Рекламация", { content: "excelFilter" }], adjust: "header", minWidth: 250, css: { 'text-decoration': 'underline', 'color': 'blue' }, sort: "string", hidden: (localStorage.getItem('CompanyID') != '111') },
    { id: "TaskUserName", header: [(isEng) ? 'Employee task' : "Инициатор", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", hidden: (localStorage.getItem('CompanyID') != '111') },
    { id: "TaskBorned", header: [(isEng) ? 'Date of task' : "Дата рекламации", { content: "textFilter" }], width: 72, minWidth: 72, sort: "string", css: { 'text-align': 'center' }, hidden: (localStorage.getItem('CompanyID') != '111') },
    { id: "PointID", header: [((localStorage.getItem('SystemLang') === 'LT') ? 'ID GTS клиента' : (isEng ? 'ID' : "ID ТТ")), { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: 'Tasks', header: [(isEng) ? 'Task' : "Кол-во комментариев", { content: "textFilter" }], width: 40, css: { 'text-align': 'center', 'text-decoration': 'underline' }, sort: "int" },
    { id: 'TaskText', header: [{ text: (isEng) ? 'Text task' : "Комментарий к фото", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "AgencyPointID", header: [(isEng) ? 'ID Agency' : "ID Агентства", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", hidden: (['RH', 'LT'].includes(localStorage.getItem('SystemLang')) && (localStorage.getItem('CompanyID') == '1')) },
    { id: "OutCode", header: [{ text: ((localStorage.getItem('SystemLang') === 'LT') ? 'Код тт 1С' : ((isEng) ? 'Code Point' : "Код АСУ")), css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", hidden: (['RH'].includes(localStorage.getItem('SystemLang')) && (localStorage.getItem('CompanyID') == '1')) },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" } ], width: 90,  minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 70, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 60, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", hidden: (['RH', 'LT'].includes(localStorage.getItem('SystemLang')) && (localStorage.getItem('CompanyID') == '1')) },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Start", header: [(isEng) ? 'Start' : "Начало", { content: "textFilter" }], width: 60, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "Duration", header: [(isEng) ? 'Duration' : "Длит.", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "Finish", header: [(isEng) ? 'Finish' : "Окончание", { content: "textFilter" }], width: 68, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "VisitFinish", header: [{ text: (isEng) ? 'The reason for the cancellation of the visit' : "Причина отмены визита", css: "multiline" }, { content: "textFilter" }], width: 105, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (['RH', 'LT'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "VisitCheck", header: [{ text: (isEng) ? 'Confirmation of the visit' : "Подтверждение визита", css: "multiline" }, { content: "textFilter" }], width: 100, css: { 'text-align': 'center' }, sort: "string", editor: "select", options: ['Да', 'Нет'] },
    { id: "AuthorVC", header: [{ text: (isEng) ? 'Confirmed an employee' : "ФИ подтвердившего", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", hidden: (['RH', 'LT'].includes(localStorage.getItem('SystemLang')) && [1].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "PhotoCount", header: [(isEng) ? 'Info' : "Инфо", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "string" },
    { id: "ActionCount", header: [(isEng) ? 'Actions' : "Отчеты", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center' }, sort: "int", hidden: (['RH', 'LT'].includes(localStorage.getItem('SystemLang')) && !(localStorage.getItem("CompanyID") == "1" || localStorage.getItem("CompanyID") == "21")) },
    { id: "IsAiPhotos", header: ["IR", { content: "textFilter" }], width: 40, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Distance", header: [(isEng) ? 'Start, m' : "Начало, м", { content: "textFilter" }], width: 90, minWidth: 70, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "int", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "IsRoute", header: [(isEng) ? 'Plan' : "План", { content: "selectFilter" }], width: 50, sort: "string", css: { 'text-align': 'center' }, hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    //{ id: "FlagName", header: [(isEng) ? 'Browser' : "Источник", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 100, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Distance2", header: [(isEng) ? 'Finish, m' : "Окончание, м", { content: "textFilter" }], width: 90, minWidth: 70, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "int", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "PhotoFinish", header: [(isEng) ? 'Last photo' : "Посл. фото", { content: "textFilter" }], width: 90, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1, 17, 104].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", hidden: ((['RH'].includes(localStorage.getItem('SystemLang')) && ![1, 17].includes(Number(localStorage.getItem('CompanyID')))) || (['LT'].includes(localStorage.getItem('SystemLang')))) },
    { id: "VisitDel", header: ["Удалить визит", { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, hidden: true },
    { id: "POS_ID", header: ["Код ТС(POS ID)", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", hidden: (!['LT'].includes(localStorage.getItem('SystemLang')))  },
    { id: "Code_1C", header: [(isEng) ? 'Code 1C' : "Код 1С", { content: "textFilter" }], width: 270, minWidth: 40, sort: "string", hidden: true },
    { id: "GUID", header: ["GUID визита", { content: "textFilter" }], width: 165, sort: "string" },
    { id: "CompanyNames", header: ["Клиенты", { content: "textFilter" }], width: 400, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1].includes(Number(localStorage.getItem('CompanyID')))) },
    { id: "VisitDevice", header: ["Источник", { content: "textFilter" }], width: 130, sort: "string", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) && ![1].includes(Number(localStorage.getItem('CompanyID')))) }
  ],
  on: {
    onCheck: function (id) {
      var item = this.getItem(id);
      if (item == null) return;
      setPointVisit(item);
    },
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

      if (id.column == 'TaskName') {
        e.stopPropagation();

        VisitPointID = item.PointID;
        VisitBorned = item.Borned;   
        taskVisitGUID = item.GUID;
        taskVisitID = item.id;
        taskVisitName = item.TaskName;
        
        var itemWindow = $$('menuUtility').getItem(112);
        if (itemWindow != null)
          showReport(itemWindow);

        $$('taskVisitHeader').define('template', item.NetworkName + ', ' + item.CityName + ' ' + item.Address + ' (' + item.Borned + ')');
        $$('taskVisitHeader').refresh();
        return;
      }

      if (id.column == 'Distance' || id.column == 'Distance2') {
        e.stopPropagation();

        sessionStorage.setItem('photoLat', (id.column == 'Distance') ? item.Lat : item.Lat2);
        sessionStorage.setItem('photoLon', (id.column == 'Distance') ? item.Lon : item.Lon2);

        if (sessionStorage.getItem('photoLat') == null || sessionStorage.getItem('photoLat') == 0) {
          webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });

          return false;
        }

        sessionStorage.setItem('photoError', item.Error);
        sessionStorage.setItem('pointLat', item.PointLat);
        sessionStorage.setItem('pointLon', item.PointLon);
        sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

        sessionStorage.setItem('Borned', item.Borned);
        sessionStorage.setItem('UserTrackID', item.UserID);

        // загрузка окна с координатами
        var itemWindow = $$('menuUtility').getItem(59);
        if (itemWindow != null)
          showReport(itemWindow);   

        $$("toolbarGeoTracking").show();

        e.stopPropagation();
        return false;
      }     

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
      //удаление визита
      if (id.column == 'VisitDel') {
        const table = $$(this);
        if (item.VisitDel == 'Удалить') {
          webix.modalbox({
            title: "Подтверждение удаления",
            buttons: ["Да", "Нет"],
            text: 'Вы действительно хотите удалить все данные по визиту от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
            width: 500
          }).then(function (result) {
            switch (result) {
              case "0":
                $.ajax({
                  url: '../../Services/Desktop.asmx/SetDeleteVisits',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Author': localStorage.getItem('Author') }),
                  success: function (data) {
                    item.VisitDel = 'Восстановить';
                    item.$css = "red_highlight";
                    table.unselect(item.id);
                    table.select(item.id)
                    webix.message("Визит добавлен на удаление");                  
                  },
                  error: function (xhr, ajaxOptions, thrownError) { }
                });              
              break;
            }
          });
        }
        else if (item.VisitDel == 'Восстановить') {
          webix.modalbox({
            title: "Подтверждение восстановления",
            buttons: ["Да", "Нет"],
            text: 'Вы хотите восстановить все данные по визиту от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
            width: 500
          }).then(function (result) {
            switch (result) {
              case "0":
                $.ajax({
                  url: '../../Services/Desktop.asmx/SetDeleteVisits',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Author': localStorage.getItem('Author') }),
                  success: function (data) {
                    item.VisitDel = 'Удалить';
                    item.$css = null
                    table.unselect(item.id);
                    table.select(item.id)
                    webix.message("Визит восстановлен");
                  },
                  error: function (xhr, ajaxOptions, thrownError) { }
                });               
              break;
            }
          });
        }

      }
    }
  }
}

// сводный отчет по визитам
var visitTotal = {
  view: "datatable", select: true, resizeColumn: true, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "OutCode", header: [(isEng) ? 'OutCode' : "Код АСУ", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "PointTotal", header: [(isEng) ? 'Outlets' : "ТТ в АП", { content: "textFilter" }], width: 80, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "PointVisit", header: [(isEng) ? 'Outlet visited' : "ТТ посещено", { content: "textFilter" }], width: 90, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "DaysWorked", header: [(isEng) ? 'Days worked' : "Отработано дней", { content: "textFilter" }], width: 110, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Visit", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], width: 70, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayDuration", header: [(isEng) ? 'Avg day' : "Ср. смена", { content: "textFilter" }], width: 90, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "VisitDuration", header: [(isEng) ? 'Avg visit' : "Ср. время визита", { content: "textFilter" }], width: 120, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "FreeDuration", header: [(isEng) ? 'Avg way' : "Ср. время в дороге", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "StartTime", header: [(isEng) ? 'Avg start' : "Ср. время начала", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "FinishTime", header: [(isEng) ? 'Avg finish' : "Ср. время окончания", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } }
  ]
}

// отчет Выполнение по маршруту
var routeTotal = {
  view: "datatable", select: true, resizeColumn: true, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.SortOrder == 0)
        item.$css = "totalRoute";
      if (item.PointID == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 90, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
    { id: "PlanClient", header: ["По плану", { content: "textFilter" }], width: 60, minWidth: 60, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlan", header: ["По маршруту", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact", header: ["Факт", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["Выполнение %", { content: "textFilter" }], width: 76, minWidth: 76, sort: "int", css: { 'text-align': 'center' } }
  ]
}

// Стандартный отчет
var reportStandart = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
    { id: "AgencyPointID", header: [(isEng) ? 'ID Agency' : "ID Агентства", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int" },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 60, minWidth: 40, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "UserCompanyName", header: [(isEng) ? 'User company' : "Компания сотрудника", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "TypeName", header: [(isEng) ? 'Type' : "Тип анкеты", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "ActionName", header: [(isEng) ? 'Form' : "Наименование анкеты", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "ArtCategoryName", header: [(isEng) ? 'Product group' : "Группа", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Code", header: [(isEng) ? 'SKU Code' : "Код SKU", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "PLUCode", header: [(isEng) ? 'PLU' : "Код PLU", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "EANCode", header: [(isEng) ? 'EAN' : "Штрих-код", { content: "textFilter" }], width: 110, minWidth: 40, sort: "int" },
    { id: "IsPromoArt", header: [(isEng) ? 'Promo SKU' : "Промо SKU", { content: "textFilter" }], width: 80, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Answer", header: [(isEng) ? 'Answer' : "Ответ", { content: "extendedTextFilter" }], width: 350, editor: "popup", minWidth: 40, sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "ReportName", header: [(isEng) ? 'Report type' : "Тип отчета", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "PhotoID", header: [(isEng) ? 'PhotoID' : "ID фото", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", hidden: true }
  ],
  on: {    
    onBeforeEditStart: function (id) {
      var item = this.getItem(id);
      if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
        return false;
      if (localStorage.getItem('IsTask') != 1)
        return false;
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);

      if (state.value != state.old) {
        this.render();

        if (editor.column == 'Answer') {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': item.ActionID, 'Art': item.ArtID, 'Question': item.QuestionID, 'Option': item.OptionID, 'Answer': state.value }),
            success: function (data) {
              //$$('reportTotal').render();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              onError();
            }
          });
        }
      }
    },
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

      if (item.PhotoID == -1)
        return;

      e.stopPropagation();

      closeAllFilters(this);

      currentPhotoList = this.config.id;
      currentPhotoID = item.PhotoID;

      var itemWindow = $$('menuUtility').getItem(61);
      if (itemWindow != null)
        showReport(itemWindow);

      e.stopPropagation();      
    }
  }
}

// Полный отчет
var reportStandartFull = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, adjustBatch: 100 },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, adjustBatch: 100 },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, adjustBatch: 100 },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 60, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "UserCompanyName", header: [(isEng) ? 'User company' : "Компания сотрудника", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "TypeName", header: [(isEng) ? 'Type' : "Тип анкеты", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ActionName", header: [(isEng) ? 'Form' : "Наименование анкеты", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ArtCategoryName", header: [(isEng) ? 'Product group' : "Группа", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Code", header: [(isEng) ? 'SKU Code' : "Код SKU", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "PLUCode", header: [(isEng) ? 'PLU' : "Код PLU", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "EANCode", header: [(isEng) ? 'EAN' : "Штрих-код", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", adjustBatch: 100 },
    { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Answer", header: [(isEng) ? 'Answer' : "Ответ", { content: "extendedTextFilter" }], width: 350, editor: "popup", minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "PhotoID", header: [(isEng) ? 'PhotoID' : "ID фото", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", hidden: true, adjustBatch: 100 }
  ],
  on: {
    onBeforeEditStart: function (id) {
      var item = this.getItem(id);
      if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
        return false;
      if (localStorage.getItem('IsTask') != 1)
        return false;
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = this.getItem(editor.row);

      if (state.value != state.old) {
        this.render();

        if (editor.column == 'Answer') {
          $.ajax({
            url: '../../Services/Desktop.asmx/SetAnswer',
            data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': item.ActionID, 'Art': item.ArtID, 'Question': item.QuestionID, 'Option': item.OptionID, 'Answer': state.value }),
            success: function (data) {
              //$$('reportTotal').render();
            },
            error: function (xhr, ajaxOptions, thrownError) {
              onError();
            }
          });
        }
      }
    },
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

      if (item.PhotoID == -1)
        return;

      e.stopPropagation();

      currentPhotoList = this.config.id;
      currentPhotoID = item.PhotoID;

      var itemWindow = $$('menuUtility').getItem(61);
      if (itemWindow != null)
        showReport(itemWindow);

      e.stopPropagation();
    }
  }
}

// справочник по скю
var directoryArt = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "textFilter" }], width: 300, minWidth: 70, sort: "string" },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 150, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtLink", header: ["Ссылка", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtPhotoLink", header: ["Визуализация", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
  ]
}

// справочник матрица скю в тт
var directoryArtPointMaps = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "PointID", header: ["ТТ ID", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 70, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "PointOutCode", header: ["Код АСУ ТТ", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "excelFilter", mode: "text" }], width: 250, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

// справочник матрица скю по форматам
var directoryArtFormatMap = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

// справочник матрица скю по сетям
var directoryArtNetworkMap = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "excelFilter", mode: "text" }], width: 300, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

// справочник адресная программа 
var directoryAP = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: (['LT', 'RH'].includes(localStorage.getItem('SystemLang'))),
  columns: [
    { id: "ID", header: [(['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) ? "ID клиента" : "ID", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "FormatName", header: ["Формат", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 70, sort: "string" },
    { id: "PointOutCode", header: [(localStorage.getItem('SystemLang') === 'LT') ? "Код ТС (POS ID)" : (localStorage.getItem('SystemLang') === 'RH') ? "Код клиента" : "Код АСУ", { content: "textFilter" }], width: 120, minWidth: 70, sort: "int" },
    { id: "Lat", header: ["Ширина", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", hidden: (['LT','RH'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Lon", header: ["Долгота", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", hidden: (['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) },
    { id: "StatusTT", header: ["Статус точки", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", editor: "select", options: ['Обслуживается', 'Не обслуживается', 'Вакансия'], hidden: (['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) },
    { id: "CompanyNames", header: ["Клиенты", { content: "textFilter" }], width: 250, minWidth: 70, sort: "string", hidden: (localStorage.getItem('Magic') == 'CLIENT') },
    { id: "UserName", header: ["Закрепленные пользователи", { content: "textFilter" }], width: 1000, minWidth: 70, sort: "string", hidden: (['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) },
    { id: "AgencyPointID", header: ["ID Агентства", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, hidden: !(['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) },
    { id: "IsActiv", header: ["Подключена", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, hidden: !(['LT', 'RH'].includes(localStorage.getItem('SystemLang'))) },
  ],
  on: {
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      let item = this.getItem(editor.row);
      if (state.value != state.old) {
        let status
        //сохранение "СтатуcТТ"
        switch (item.StatusTT) {
          case 'Обслуживается':
            status = 1;
            break;
          case 'Не обслуживается':
            status = 2;
            break;
          case 'Вакансия':
            status = 3;
            break;
        }
        $.ajax({
          url: '../../Services/Desktop.asmx/SetPointStatus',
          data: JSON.stringify({ 'PointID': item.ID, 'CompanyID': localStorage.getItem('CompanyID'), 'Status': status, 'Author': localStorage.getItem('Author') }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  },
}

// Распознавание матрицы
var AIMatrix = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "excelFilter", mode: "text" }], width: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 30, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 60, minWidth: 30, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 50, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Product group' : "Группа", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Code", header: [(isEng) ? 'SKU Code' : "Код SKU", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "PLUCode", header: [(isEng) ? 'PLU' : "Код PLU", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "EAN", header: [(isEng) ? 'EAN' : "ШK", { content: "textFilter" }], width: 50, minWidth: 30, sort: "string" },
    { id: "IsMatrix", header: [(isEng) ? 'Matrix' : "Матрица", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "IsExists", header: [(isEng) ? 'Place' : "На полке", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 10, sort: "string" }
  ],
  on: {   
    onItemClick: function (id) {
      var item = this.getItem(id);
      if (item == null)
        return;

      if (item.PhotoID == -1)
        return;

      e.stopPropagation();

      currentPhotoList = this.config.id;
      currentPhotoID = item.PhotoID;

      var itemWindow = $$('menuUtility').getItem(61);
      if (itemWindow != null)
        showReport(itemWindow);

      e.stopPropagation();      
    }
  }
}

// Распознавание матрицы - сводный
var AIMatrixTotal = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "excelFilter", mode: "text" }], width: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 30, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 60, minWidth: 30, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 50, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MatrixCount", header: [(isEng) ? 'Matrix' : "Матрица", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "ExistsCount", header: [(isEng) ? 'Place' : "На полке", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Percents", header: [(isEng) ? 'Percents' : "%", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" }
  ]
}

// Отчет Задания
var reportTask = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, editable: true,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.TaskDel == 'Восстановить')
        item.$css = "red_highlight";
    }
  },
  columns: [
    { id: "ID", header: ["№", { content: "textFilter" }], width: 70, minWidth: 20, sort: "int", sort: "string", css: { 'text-align': 'center' } },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 65, minWidth: 40, sort: "int" },
    { id: "AgencyPointID", header: [(isEng) ? 'ID Agency' : "ID Агентства", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int" },
    { id: "OutCode", header: [((localStorage.getItem('SystemLang') === 'WB') ? 'Код клиента' : ((isEng) ? 'Code' : "Код ТТ")), { content: "textFilter" }], width: 60, minWidth: 20, sort: "string" },
    { id: "NetworkCode", header: [(isEng) ? 'Network Code' : "Код Сети", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string", hidden: !['WB'].includes(localStorage.getItem('SystemLang')) },
    { id: "BornedDay", header: [(isEng) ? 'Date task' : "Дата задания", { content: "textFilter" }], width: 90, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    //{ id: "BornedTime", header: [(isEng) ? 'Time' : "Время отчета", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "InitiatorName", header: [(isEng) ? 'Author' : "Отправитель задания", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 20, sort: "string" },
    { id: "InitiatorCompanyName", header: [(isEng) ? 'Author company' : "Компания отправитель", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Recipient' : "Получатель", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 20, sort: "string" },
    { id: "UserRoleName", header: [(isEng) ? 'Recipient' : "Должность", { content: "excelFilter", mode: "text" }], minWidth: 20, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 20, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Recipient company' : "Компания получатель", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 300, minWidth: 20, sort: "string" },
    { id: "BornedVisit", header: [(isEng) ? 'Date visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "TypeName", header: [(isEng) ? 'Type' : "Тип", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 20, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Category' : "Категория", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 20, sort: "string" },
    { id: "Text", header: [(isEng) ? 'Text' : "Текст задания", { content: "textFilter" }], width: 250, minWidth: 20, sort: "string" },
    { id: "LastText", header: [(isEng) ? 'Last Text' : "Последний ответ", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "StatusName", header: [(isEng) ? 'Status' : "Статус", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsActual", header: [(isEng) ? 'Actual' : "Актуальность", { content: "selectFilter", mode: "text" }], width: 100, minWidth: 20, sort: "string", editor: "select", options: ['', 'Не актуально'] },
    { id: "PhotoTask", header: [(isEng) ? 'Link Task' : "ФО Задание", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "PhotoAnswer", header: [(isEng) ? 'Link Answer' : "ФО Ответ", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
    { id: "IsVisit", header: [(isEng) ? 'Alert' : "Alert", { content: "textFilter" }], adjust: "header", minWidth: 100, sort: "string", hidden: (!['RH', 'LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "BornedClose", header: [(isEng) ? 'Date close' : "Дата закрытия", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "TaskDel", header: [(isEng) ? 'Delete Task' : "Удалить задание", { content: "textFilter" }], width: 110, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, hidden: true },
  ],
  on: {
    onAfterLoad: function () { this.adjustRowHeight(); },
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (id.column != 'IsActual' && id.column != 'TaskDel') {
        if (item == null)
          return;

        e.stopPropagation();

        currentTaskID = item.ID;
        currentPointID = item.PointID;
        currentUserID = item.UserID;

        var itemWindow = $$('menuUtility').getItem(79);
        if (itemWindow != null)
          showReport(itemWindow);

        e.stopPropagation();
      }
      //удаление задания
      if (id.column == 'TaskDel') {
        const table = $$(this);
        if (item.TaskDel == 'Удалить') {
          webix.modalbox({
            title: "Подтверждение удаления",
            buttons: ["Да", "Нет"],
            text: 'Вы действительно хотите удалить задание №' + item.ID + ' от ' + item.BornedDay + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
            width: 500
          }).then(function (result) {
            switch (result) {
              case "0":
                $.ajax({
                  url: '../../Services/Desktop.asmx/SetDeleteTasks',
                  data: JSON.stringify({ 'Task': item.ID, 'Author': localStorage.getItem('Author') }),
                  success: function (data) {
                    item.TaskDel = 'Восстановить';
                    item.$css = "red_highlight";
                    table.unselect(item.id);
                    table.select(item.id)
                    webix.message("Задание добавлено на удаление");
                  },
                  error: function (xhr, ajaxOptions, thrownError) { }
                });
                break;
            }
          });
        }
        else if (item.TaskDel == 'Восстановить') {
          webix.modalbox({
            title: "Подтверждение восстановления",
            buttons: ["Да", "Нет"],
            text: 'Вы хотите восстановить задание №' + item.ID + ' от ' + item.BornedDay + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
            width: 500
          }).then(function (result) {
            switch (result) {
              case "0":
                $.ajax({
                  url: '../../Services/Desktop.asmx/SetDeleteTasks',
                  data: JSON.stringify({ 'Task': item.ID, 'Author': localStorage.getItem('Author') }),
                  success: function (data) {
                    item.TaskDel = 'Удалить';
                    item.$css = null
                    table.unselect(item.id);
                    table.select(item.id)
                    webix.message("Задание восстановлено");
                  },
                  error: function (xhr, ajaxOptions, thrownError) { }
                });
                break;
            }
          });
        }
      }
    },
    onBeforeEditStart: function (id) {
      if (id.column == "IsActual" && localStorage.getItem('Magic') != 'CLIENT') { return false; }
    },
    onAfterEditStop: function (state, editor) {
      //сохранение статуса актуальности претензии
      if (editor.column == 'IsActual') {
        let newState = state.value == 'Не актуально' ? 1 : null;
        let oldState = state.old == 'Не актуально' ? 1 : null;
        if (newState != oldState) {
          let item = this.getItem(editor.row);
          $.ajax({
            url: '../../Services/Desktop.asmx/SetTaskActual',
            data: JSON.stringify({ 'Task': item.ID, 'IsActual': newState }),
            error: function (xhr, ajaxOptions, thrownError) { onError(); }
          });
        }
      }
    }
  }
}

// отчет Фото ПРО
webix.ready(function () {
  if (!document.querySelector(".photo-preview-popup")) {
    var node = webix.html.create("div", {
      "class": "photo-preview-popup",
      "style": "display:none; position:fixed; z-index:10000; border:1px solid #ccc; background:#fff; box-shadow: 0 4px 15px rgba(0,0,0,0.5); pointer-events:none;" 
    });

    // Мгновенно скрывать при наведении на саму область превью
    node.onmouseenter = function () {
      this.style.display = "none";
      this._lastId = null;
    };

    document.body.appendChild(node);
    window.photoPreviewNode = node;

    if (window.photoPreviewNode) {
      window.photoPreviewNode.onclick = function (e) {
        const delBtn = e.target.closest(".preview-btn-delete");
        const repBtn = e.target.closest(".preview-btn-replace");

        if (delBtn) {
          const photoId = delBtn.getAttribute("data-photo-id");
          //const rowId = delBtn.getAttribute("data-row-id");

          //const item = $$('companyActionList').getItem(rowId);

          // Вызываем окно подтверждения удаления
          processPhotoDelete(photoId);
        }

        if (repBtn) {
          const photoId = repBtn.getAttribute("data-photo-id");
          //const rowId = delBtn.getAttribute("data-row-id");

          //const item = $$('companyActionList').getItem(rowId);
          
          processPhotoReplace(photoId);
        }
      };
    }
  }
});

var photoPro = {
  view: "dataview",
  select: true,
  type: {
    width: 190,
    height: 254,
  },
  template: function (obj) {
    // Проверяем FullText на наличие данных
    const infoText = (obj.FullText && obj.FullText.trim() !== "" && obj.FullText !== "undefined") ? obj.FullText : "";

    return `<div class="photo-item-wrapper"><img src="${obj.Link}" class="responsive-photo" /><div class="photo-info-layer">${infoText}</div> 
       <div class="photo-link-icon js-open-details"></div><input type="checkbox" title="подтверждение фото" class="photo-checkbox webix_table_checkbox" ${obj.IsPhotoCheck ? "checked" : ""} /></div>`;
  },
  onClick: {
    "js-open-details": function (e, id) {
      var item = this.getItem(id);
      if (item == null)
        return;

      e.stopPropagation();

      VisitPointID = item.PointID;
      VisitUserID = item.UserID;
      VisitBorned = item.Borned;
      VisitGUID = ""; //item.GUID;

      var itemWindow = $$('menuUtility').getItem(60);
      if (itemWindow != null)
        showReport(itemWindow);

      e.stopPropagation();
      return false;   
    }
  },
  on: {   
    onMouseMove: function (id, e) {
      const item = this.getItem(id);
      const node = window.photoPreviewNode;

      if (item && node) {
        if (node._lastId === id) return;
        node._lastId = id;

        // 1. Получаем координаты маленькой карточки
        const itemNode = this.getItemNode(id);
        const rect = itemNode.getBoundingClientRect();

        // 2. Сначала отрисовываем контент, чтобы браузер понял будущий размер попапа
        node.innerHTML = `<img src="${item.Link}" style="max-width:500px; max-height:500px; display:block;" />`;
        node.style.display = "block";

        // 3. Вычисляем размеры превью
        const previewWidth = node.offsetWidth;
        const previewHeight = node.offsetHeight;

        // 4. Проверка ПРАВОЙ границы экрана
        let left = rect.right + 10;
        if (left + previewWidth > window.innerWidth) {
          // Если не влезает справа — показываем СЛЕВА от карточки
          left = rect.left - previewWidth - 10;
        }

        // 5. Проверка НИЖНЕЙ границы экрана
        let top = rect.bottom - 100; // Ваша базовая точка (чуть выше низа карточки)
        if (top + previewHeight > window.innerHeight) {
          // Если уходит вниз — прижимаем к нижнему краю экрана с отступом
          top = window.innerHeight - previewHeight - 20;
        }

        // Защита от ухода за верхнюю границу (на всякий случай)
        if (top < 10) top = 10;

        // 6. Применяем координаты
        node.style.left = left + "px";
        node.style.top = top + "px";
      }
    },
    onMouseOut: function () {
      if (window.photoPreviewNode) {
        window.photoPreviewNode.style.display = "none";
        window.photoPreviewNode._lastId = null; // Сбрасываем ID
      }
    },
    onItemClick: function (id, e) {
      // Скрываем превью при клике, чтобы не мешало
      if (window.photoPreviewNode) window.photoPreviewNode.style.display = "none";

      if (e.target?.classList.contains('photo-checkbox')) {
        const item = this.getItem(id);
        const newStatus = item.IsPhotoCheck ? 0 : 1;
        item.IsPhotoCheck = newStatus;
        e.target.checked = !!newStatus;

        $.ajax({
          url: '../../Services/UI.asmx/SetPhotoCheck2',
          data: JSON.stringify({ 'ID': item.PhotoID, 'Status': newStatus, 'User': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
        });

        return false;
      }
      $$("iconAddMenu_" + this.config.id)?._menu?.hide();
      showPhotoVisit(this, id, e);
    }
  }
}

var photo = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $init: function (item) {
      if (item.status == 1)
        item.$css = "passive";
      else item.$css = "active";
    }
  },
  columns: [
    { id: "status", header: (isEng) ? 'hide' : "Скрыть", template: "{common.checkbox()}", width: 20, hidden: (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') },
    { id: "IsPhotoCheck", header: [{ text: "ФО подтв.", css: "multiline" }], template: "{common.checkbox()}", css: { 'text-align': 'center' }, width: 40 },
    { id: "IsCheckName", header: ["Отметка о проверке", { content: "textFilter" }], width: 40, minWidth: 40, hidden: (localStorage.getItem('CompanyID') !== '192') },
    //{ id: "Rating", header: [(isEng) ? 'Rating' : "Оценка", { content: "excelFilter", mode: "text" }], width: 40, minWidth: 40, hidden: (localStorage.getItem('IsPoint') == '0') },
    { id: 'Tasks', header: [(isEng) ? 'Task' : "Кол-во комментариев", { content: "textFilter" }], width: 40, css: { 'text-align': 'center', 'text-decoration': 'underline' }, sort: "int" },
    { id: 'TaskText', header: [{ text: (isEng) ? 'Text task' : "Комментарий к фото", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string" },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, sort: "int" },
    { id: "AgencyPointID", header: [(isEng) ? 'ID Agency' : "ID Агентства", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int" },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "BornedTime", header: [(isEng) ? 'Time' : "Время отчета", { content: "textFilter" }], width: 40, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 100, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 100, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Category' : "Категория", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtCategoryName", header: [(isEng) ? 'Product group' : "Категория SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ActionName", header: [(isEng) ? 'Action' : "Анкета", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Description", header: [(isEng) ? 'Comment' : "Комментарий", { content: "textFilter" }], width: 120, minWidth: 80, editor: "text", sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Ссылка", { content: "textFilter" }], width: 110, minWidth: 50, sort: "string" },
    { id: "Distance", header: [(isEng) ? 'Distance, m' : "Расстояние, м", { content: "textFilter" }], width: 90, minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
    { id: "DistanceText", header: [(isEng) ? 'Geo' : "Гео", { content: "textFilter" }], width: 50, minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
    { id: "FlagName", header: [(isEng) ? 'Browser' : "Источник", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" }
  ],
  on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);

      closeAllFilters(this);

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
      else if (!['status', 'IsPhotoCheck'].includes(id.column)) {
        VisitPointID = item.PointID;
        VisitBorned = item.Borned;

        showPhotoVisit(this, id, e);
      }
    },
    onBeforeEditStart: function (id) {
      var item = this.getItem(id);
      if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
        return false;
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      onAfterEditStopPhoto(this, state, editor, ignoreUpdate);
    },
    onCheck: function (id, column, val) {
      var item = this.getItem(id);

      if (column == 'status') {
        item.$css = (val == 0) ? 'passive' : 'active';
        this.render();

        $.ajax({
          url: '../../Services/UI.asmx/SetPhotoHide',
          data: JSON.stringify({ 'ID': item.PhotoID, 'Status': val, 'User': localStorage.getItem('Author') }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr);
          }
        });
      }
      else if (column == 'IsPhotoCheck') {
        $.ajax({
          url: '../../Services/UI.asmx/SetPhotoCheck2',
          data: JSON.stringify({ 'ID': item.PhotoID, 'Status': val, 'User': localStorage.getItem('Author') }),
          error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
        });
      }
    }
  }
}

//Аналитика по тт
var planVisit = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  columns: [
    { id: "PointID", header: ["ID", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["ФорматТТ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "StatusTT", header: ["Статус точки", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string" },
    { id: "Company", header: ["Компания", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", hidden: (localStorage.getItem('Magic') == 'CLIENT') },
    { id: "PlanVisit", header: ["План визитов", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "PlanRoute", header: ["План по маршруту", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Users", header: ["Закрепленные полевые сотрудники", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
    { id: "Masters", header: ["Руководитель", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
  ],
}

//Готовые отчеты
var reportReady = {
  view: "datatable", select: true, resizeColumn: true, rowLineHeight: 24, rowHeight: 24,
  columns: [
    { id: "Name", header: [(isEng) ? 'Name' : "Наименование", { content: "textFilter" }], width: 400, minWidth: 40, sort: "string" },
    { id: "Start", header: [(isEng) ? 'Start' : "Начало", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }  },
    { id: "Finish", header: [(isEng) ? 'Finish' : "Окончание", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }  },
    { id: "Link", header: [(isEng) ? 'Link' : "Ссылка", { content: "textFilter" }], width: 600, minWidth: 40, sort: "string", css: { 'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer' } },
    { id: "Description", header: [(isEng) ? 'Description' : "Описание", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" }
  ],
  on: {
    onItemClick: function (id) {
      var item = this.getItem(id);
      if (item.Link == '') return;

      window.open(item.Link, "_blank");
    }
  }
}

//справочник по сотрудникам
var directoryUser = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "UserID", header: ["ID", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Phone", header: ["Логин", { content: "textFilter" }], width: 150, minWidth: 60, sort: "string" },
    { id: "LName", header: ["Фамилия", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "FName", header: ["Имя", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "MName", header: ["Фильтр", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 60, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 200, minWidth: 60, sort: "string" },
    { id: "IsMobile", header: ["Полевой", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", exportFormat: localStorage.getItem('CompanyID') == '192' ? "000#" : undefined },
    { id: "Email", header: ["Email", { content: "textFilter" }], width: 230, minWidth: 40, sort: "string" },
    { id: "IsBI", header: ["BI Исп.дисц.", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
  ]
}

//Визиты план-факт(таблица)
var reportRoute = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24, 
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.PointID == null)
        item.$css = "light_blue_highlight";

      // Обновляем заголовки для каждого дня
      if (item.CompanyName == '') {
        var table = $$("reportRoute|1123");
        var columns = table.config.columns;

        for (var i = 1; i <= 31; i++) {
          var dayP = item["DayP" + i];
          var dayF = item["DayF" + i];

          // Находим индексы столбцов по их ID
          var planColumnIndex = columns.findIndex(col => col.id === "DayP" + i);
          var factColumnIndex = columns.findIndex(col => col.id === "DayF" + i);

          if (planColumnIndex !== -1) {
              columns[planColumnIndex].header[0] = dayP == null ? "План" : { text: "План " + dayP, css: "multiline" };
          }

          if (factColumnIndex !== -1) {
              columns[factColumnIndex].header[0] = dayF == null ? "Факт" : { text: "Факт " + dayF, css: "multiline" };
          }
        }
        table.refreshColumns();
      }
    },
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "OutCode", header: [{ text: "Код тт (Код АСУ)", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", hidden: (localStorage.getItem('CompanyID') != '443' && localStorage.getItem('CompanyID') != '442')},
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Percents", header: ["%", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumVisitPlan", header: ["Итого план", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumVisitFact", header: ["Итого факт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP1",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF1",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP2",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF2",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP3",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF3",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP4",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF4",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP5",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF5",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP6",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF6",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP7",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF7",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP8",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF8",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP9",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center',"border-left": "1px solid #b1b1b1" } },
    { id: "DayF9",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP10", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF10", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP11", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF11", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP12", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF12", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP13", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF13", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP14", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF14", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP15", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF15", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP16", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF16", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP17", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF17", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP18", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF18", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP19", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF19", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP20", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF20", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP21", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF21", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP22", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF22", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP23", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF23", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP24", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF24", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP25", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF25", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP26", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF26", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP27", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF27", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP28", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF28", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP29", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF29", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP30", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF30", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP31", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF31", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
  ]
}

//Маршруты по сотрудникам(таблица)
var routeUsers = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  scheme: {
    $change: function (item) {
      if (item.PointID == null)
        item.$css = "light_blue_highlight";

      // Обновляем заголовки для каждого дня
      if (item.CompanyName == '') {
        const table = $$("routeUsers|1124");
        const columns = table.config.columns;
        for (let i = 1; i <= 31; i++) {
          const dayP = item["DayP" + i];
          const dayF = item["DayF" + i];
          const colP = columns.find(c => c.id === "DayP" + i);
          if (colP) {
            colP.header[0] = dayP == null ? "План" : { text: "План " + dayP, css: "multiline" };
          }
          const colF = columns.find(c => c.id === "DayF" + i);
          if (colF) {
            colF.header[0] = dayF == null ? "Факт" : { text: "Факт " + dayF, css: "multiline" };
          }
        }
        table.refreshColumns();
      }
    },
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "UserID", header: ["ID Сотрудника", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Percents", header: ["%", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumVisitPlan", header: ["Итого план", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "SumVisitFact", header: ["Итого факт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP1",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF1",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP2",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF2",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP3",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF3",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP4",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF4",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP5",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF5",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP6",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF6",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP7",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF7",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP8",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF8",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP9",  header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF9",  header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP10", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF10", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP11", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF11", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP12", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF12", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP13", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF13", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP14", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF14", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP15", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF15", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP16", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF16", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP17", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF17", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP18", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF18", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP19", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF19", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP20", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF20", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP21", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF21", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP22", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF22", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP23", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF23", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP24", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF24", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP25", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF25", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP26", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF26", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP27", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF27", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP28", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF28", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP29", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF29", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP30", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF30", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
    { id: "DayP31", header: ["План", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center', "border-left": "1px solid #b1b1b1" } },
    { id: "DayF31", header: ["Факт", { content: "textFilter" }], width: 50, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
  ],
  on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

      closeAllFilters(this);

      if (id.column.indexOf("Day") === 0) {
        e.stopPropagation();

        var start = webix.i18n.parseFormatStr($$('Start').getValue());
        var selectedDate = $$('Start').getValue();
        if (!selectedDate) return;

        // 2. Извлекаем номер дня из "Day21" -> 21
        var dayNumber = id.column.replace('P', '').replace('F', '').replace("Day", "");
        // Добавляем ведущий ноль: 5 -> 05
        var formattedDay = ("0" + dayNumber).slice(-2);

        // 3. Получаем Месяц и Год (JS методы:getMonth() возвращает 0-11, поэтому +1)
        var mm = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        var yyyy = selectedDate.getFullYear();

        // 4. Собираем строку ДД.ММ.ГГГГ
        var newDateStr = formattedDay + "." + mm + "." + yyyy;

        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = newDateStr;
        VisitGUID = "";  // item.GUID;

        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);

        e.stopPropagation();
        return false;
      }
    }
  }
}

//График присутствия в ТТ
var companyRoute = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: (localStorage.getItem('CompanyID') == '1051') && (['WB'].includes(localStorage.getItem('SystemLang'))) ? false : {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: [((localStorage.getItem('SystemLang') === 'LT') ? ((localStorage.getItem('CompanyID') === '101') ? 'ID PVM' : 'ID GTS клиента') : (isEng ? 'ID' : "ID ТТ")), { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "AgencyPointID", header: [((localStorage.getItem('SystemLang') === 'LT') ? 'Код тт (AG)' : (isEng ? 'ID Agency' : "ID Агентства")), { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", hidden: (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "OutCode", header: [((localStorage.getItem('SystemLang') === 'LT') ? ((localStorage.getItem('CompanyID') === '101') ? 'Pos id' : 'Код тт клиента') : (isEng ? 'OutCode' : "Код клиента")), { content: "textFilter" }], width: 120, minWidth: 40, sort: "int" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Регион", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "MultonExtra3", header: ["Customer Name", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "MultonExtra2", header: ["Sales Group", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "MultonExtra4", header: ["Vol GR", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Name", header: [(isEng) ? 'sign' : "Вывеска", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "DayCount", header: [(isEng) ? 'DayCount' : "Частота", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, hidden: (localStorage.getItem('CompanyID') == '1051') && (['WB'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Timing", header: [(isEng) ? 'Timing' : "Длит, час", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, hidden: (localStorage.getItem('CompanyID') == '1051') && (['WB'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Visits", header: [(isEng) ? 'Visits' : "Посещения", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", hidden: ![23, 24].includes(Number(localStorage.getItem('CompanyID'))) },
    { id: "TimingMinutes", header: [(isEng) ? 'Plan,min' : "План, мин", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "TypeName", header: [(isEng) ? 'TypeName' : "Тип", { content: "selectFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "TMName", header: [(isEng) ? 'TM' : "ТМ", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "TMPhone", header: [(isEng) ? 'TM Phone' : "Телефон ТМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "TMEMail", header: [(isEng) ? 'TM EMail' : "Почта ТМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", hidden: (localStorage.getItem('SystemLang') != 'LT') },
    { id: "SuperName", header: [(isEng) ? 'Superviser' : "Супервайзер", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "SuperPhone", header: [(isEng) ? 'Super Phone' : "Телефон СВ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "SuperEMail", header: [(isEng) ? 'Super EMail' : "Почта СВ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", hidden: (localStorage.getItem('CompanyID') == '26') },
    { id: "MerchName", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 200, sort: "string", hidden: !['WB'].includes(localStorage.getItem('SystemLang')) },
    { id: "MerchPhone", header: [(isEng) ? 'Me Phone' : "Телефон МЕ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", hidden: (localStorage.getItem('SystemLang') != 'LT') },
    { id: "Start", header: [(isEng) ? 'Begin' : "Дата старта обслуживания", { content: "selectFilter" }], width: 100, minWidth: 40, sort: "string", hidden: (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Day1", header: ["ПН", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day2", header: ["ВТ", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day3", header: ["СР", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day4", header: ["ЧТ", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day5", header: ["ПТ", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day6", header: ["СБ", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Day7", header: ["ВС", { content: "textFilter" }], width: 100, minWidth: 80 },
    { id: "Total", header: [(isEng) ? 'Total' : "Итого", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 250, minWidth: 40 },
    { id: "StatusName", header: ["Статус", { content: "textFilter" }], width: 80, minWidth: 40 },
    { id: "VacancyOpenStart", header: ["Дата открытия вакансии", { content: "selectFilter" }], width: 180, minWidth: 40 , hidden: (['LT'].includes(localStorage.getItem('SystemLang')))},
    { id: "VacancyOpenPlan", header: ["Плановая дата закрытия вакансии", { content: "selectFilter" }], width: 150, minWidth: 40 , hidden: (['LT'].includes(localStorage.getItem('SystemLang')))},
    { id: "VacancyOpenFact", header: ["Фактическая дата закрытия вакансии", { content: "selectFilter" }], width: 150, minWidth: 40 , hidden: (['LT'].includes(localStorage.getItem('SystemLang')))},
    { id: "DateLastVisit", header: [{ text: "Дата последнего посещения", css: "multilinetable" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", hidden: (localStorage.getItem('CompanyID') !== '17' && localStorage.getItem('CompanyID') !== '18') },
    { id: "Extra1", header: ["Доп 1", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') == '17') || (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Extra2", header: ["Доп 2", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') == '17') || (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Extra3", header: ["Доп 3", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') == '17') || (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "Extra4", header: ["Доп 4", { content: "textFilter" }], width: 120, minWidth: 40, hidden: (localStorage.getItem('CompanyID') == '17') || (['LT'].includes(localStorage.getItem('SystemLang'))) },
    { id: "DowntimeDay", header: [{ text: "Количество дней простоя точки", css: "multilinetable" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "int", hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "VacancyCategory", header: ["Категория вакансии", { content: "selectFilter" }], width: 150, minWidth: 40, sort: "string", hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "FactProc", header: [{ text: "% отработки по таймингу за прошлую неделю", css: "multilinetable" }, { content: "textFilter" }], width: 185, minWidth: 40, sort: "int", hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "FactProcVisit", header: [{ text: "% отработки по визитам за прошлую неделю", css: "multilinetable" }, { content: "textFilter" }], width: 180, minWidth: 40, sort: "int", hidden: (localStorage.getItem('CompanyID') != '17') },
    { id: "NetworkCode2", header: ["Код тт 1С", { content: "textFilter" }], width: 90, minWidth: 40, hidden: (!['LT'].includes(localStorage.getItem('SystemLang'))) },
  ]
}

//"Отчет по сайту"
var reportSite = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Author", header: [{ text: "ID пользователя", css: "multiline" }, { content: "textFilter" }], width: 95, sort: "int", css: { 'text-align': 'center' } },
    { id: "AuthorUserName", header: ["Пользователь", { content: "excelFilter" }], width: 150, sort: "string" },
    { id: "Report", header: ["Отчет", { content: "excelFilter" }], width: 120, sort: "string" },
    { id: "UserName", header: ["Исполнитель", { content: "excelFilter" }], width: 90, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 100, sort: "string" },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 65, sort: "int", css: { 'text-align': 'center' } },
    { id: "Start", header: ["Старт", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Finish", header: ["Финиш", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "Received", header: ["Время запроса", { content: "textFilter" }], width: 140, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
  ],
}

//"Визиты на удаление"
var reportDeleteVisits = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 100, sort: "string" },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserID", header: [{ text: "ID Сотрудника", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", },
    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 90, sort: "string" },
    { id: "Status", header: ["Статус", { content: "textFilter", mode: "text" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "AuthorUserName", header: ["Инициатор удаления", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Received", header: ["Время запроса", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "VisitDel", header: [{ text: "Восстановить визит", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' } },
  ],
  on: {
    onItemClick: function (id, e) {
      let item = this.getItem(id);
      if (item.Status != 'Удален') {
        if (id.column == 'VisitDel') {
          const table = $$(this);
          if (item.VisitDel == 'Удалить') {
            webix.modalbox({
              title: "Подтверждение удаления",
              buttons: ["Да", "Нет"],
              text: 'Вы действительно хотите удалить все данные по визиту от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
              width: 500
            }).then(function (result) {
              switch (result) {
                case "0":
                  $.ajax({
                    url: '../../Services/Desktop.asmx/SetDeleteVisits',
                    data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Author': localStorage.getItem('Author') }),
                    success: function (data) {
                      item.VisitDel = 'Восстановить';
                      table.unselect(item.id);
                      table.select(item.id)
                      webix.message("Визит добавлен на удаление");
                    },
                    error: function (xhr, ajaxOptions, thrownError) { }
                  });
                break;
              }
            });
          }
          else if (item.VisitDel == 'Восстановить') {
            webix.modalbox({
              title: "Подтверждение восстановления",
              buttons: ["Да", "Нет"],
              text: 'Вы хотите восстановить все данные по визиту от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
              width: 500
            }).then(function (result) {
              switch (result) {
                case "0":
                  $.ajax({
                    url: '../../Services/Desktop.asmx/SetDeleteVisits',
                    data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Author': localStorage.getItem('Author') }),
                    success: function (data) {
                      item.VisitDel = 'Удалить';
                      table.unselect(item.id);
                      table.select(item.id)
                      webix.message("Визит восстановлен");
                    },
                    error: function (xhr, ajaxOptions, thrownError) { }
                  });
                break;
              }
            });
          }
        }
      }
    }
  },
}

//"Задания на удаление"
var reportDeleteTasks = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "TaskID", header: [{ text: "ID Задания", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 20, sort: "int", sort: "string" },
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "InitiatorName", header: [{ text: "Отправитель задания", css: "multiline" }, { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "UserName", header: ["Получатель", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string" },
    { id: "Text", header: [{ text: "Текст задания", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string" },
    { id: "Status", header: ["Статус", { content: "textFilter", mode: "text" }], width: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "AuthorUserName", header: ["Инициатор удаления", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "Received", header: ["Время запроса", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
    { id: "TaskDel", header: [{ text: "Восстановить визит", css: "multiline" }, { content: "textFilter" }], width: 100, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' } },
  ],
  on: {
    onItemClick: function (id, e) {
      let item = this.getItem(id);
      if (item.Status != 'Удален') {
        if (id.column == 'TaskDel') {
          const table = $$(this);
          if (item.TaskDel == 'Удалить') {
            webix.modalbox({
              title: "Подтверждение удаления",
              buttons: ["Да", "Нет"],
              text: 'Вы действительно хотите удалить задание №' + item.TaskID + ' от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
              width: 500
            }).then(function (result) {
              switch (result) {
                case "0":
                  $.ajax({
                    url: '../../Services/Desktop.asmx/SetDeleteTasks',
                    data: JSON.stringify({ 'Task': item.TaskID, 'Author': localStorage.getItem('Author') }),
                    success: function (data) {
                      item.TaskDel = 'Восстановить';
                      table.unselect(item.id);
                      table.select(item.id)
                      webix.message("Задание добавлено на удаление");
                    },
                    error: function (xhr, ajaxOptions, thrownError) { }
                  });
                  break;
              }
            });
          }
          else if (item.TaskDel == 'Восстановить') {
            webix.modalbox({
              title: "Подтверждение восстановления",
              buttons: ["Да", "Нет"],
              text: 'Вы хотите восстановить задание №' + item.TaskID + ' от ' + item.Borned + ' сотрудника ' + item.UserName + ' по адресу ' + item.OfficeName + ', ' + item.CityName + ', ' + item.Address + '?',
              width: 500
            }).then(function (result) {
              switch (result) {
                case "0":
                  $.ajax({
                    url: '../../Services/Desktop.asmx/SetDeleteTasks',
                    data: JSON.stringify({ 'Task': item.TaskID, 'Author': localStorage.getItem('Author') }),
                    success: function (data) {
                      item.TaskDel = 'Удалить';
                      table.unselect(item.id);
                      table.select(item.id)
                      webix.message("Задание восстановлено");
                    },
                    error: function (xhr, ajaxOptions, thrownError) { }
                  });
                  break;
              }
            });
          }
        }
      }
    }
  },
}