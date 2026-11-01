var URLname = '../';

var company = localStorage.getItem('CompanyID');

var isEng = (localStorage.getItem('Lang') == 'ENG');

var procName, reportID, pageName = '', viewName = 'table';
var pageID;
var filterID;
var IsOnline;

var taskID, pointID, taskUserID, clientID;
var linkPhoto;
var filterChange;

var routeFlag = 2;

var taskVisitID = -1;
var taskVisitName = '';
var visitGUID = '';
var visitID = -1;
var visitList = null;

var customReportID;
var saveHideMode = true;
var customBeforeID;

var photoMagic = 'ALL', artMagic = 'ALL'; photoView = 'TABLE', reportView = 'TABLE';

// выбор справочников
function getReportDictionary(magic, elem, show) {
  if ($$('winFilter').isVisible())
    $$('winFilter').hide();    
  
  procName = magic;

  showProgress("navigation");

  if ((procName == 'ArtReport') || (procName == 'Action')) {
    $.ajax({
      url: URLname + 'Services/Report.asmx/GetReportDictionaryDate',
      timeout: 300000,
      data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'ProcName': procName, 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
      success: function (data) {
        listUpdate('report', 'all', data.d);

        badgeReportRefresh();

        if (show == null) {
          $$('searchReport').setValue('');
          $$('winFilter').show(elem, { pos: "right" });
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        onError();
      },
      complete: function () {
        $$("navigation").hideProgress();
      },
    });
    return;
  }

  $.ajax({
    url: URLname + 'Services/Report.asmx/GetReportDictionary',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'ProcName': procName }),
    success: function (data) {
      listUpdate('report', 'all', data.d);

      badgeReportRefresh();     

      if (show == null) {
        $$('searchReport').setValue('');
        $$('winFilter').show(elem, { pos: "right" });
      }
    },
    complete: function() {
      $$("navigation").hideProgress();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}



// выбор полей
function getField() {
  if ($$('winField').isVisible())
    $$('winField').hide();

  var list = $$('field');
  list.clearAll();

  for (var i = 0; i < $$(tableName).getState().hidden.length; i++) {
    if ($$(tableName).getState().hidden[i] != "status")
      list.add({
        Name: $$(tableName).getColumnConfig($$(tableName).getState().hidden[i]).header[0].text,
        FieldName: $$(tableName).getState().hidden[i],
        IsActive: 0
      });
  }

  for (var i = 0; i < $$(tableName).getState().ids.length; i++) {
    if ($$(tableName).getState().ids[i] != "status")
      list.add({
        Name: $$(tableName).getColumnConfig($$(tableName).getState().ids[i]).header[0].text,
        FieldName: $$(tableName).getState().ids[i],
        IsActive: 1
      });
      
  }

  list.refresh();
  
  $$('winField').show($$('btnColumn').$view, { pos: "left" }); 
}

function setAllReportFilter() {
  $$('report').data.each(
    function (item) {
      item.IsActive = 1;
    }
  );
  $$('report').refresh();

  setReportFilter(false);  
}

function clearReportFilter(magic) {
  procName = magic;
  //showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/SetReportDictionary',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': '', 'ProcName': procName }),
    complete: function () {
      var list = $$('report');

      var row = $$(list).find(function (obj) { return (obj.IsActive == 1) });

      for (var i = 0; i < row.length ; i++) 
        row[i].IsActive = 0;        
      
      list.refresh();      

      badgeReportRefresh();

      setFilterChange();

      if (IsOnline)
        refresh();

      var row;

      if (magic = 'Point') {
        row = $$('pointVisit').find(function (obj) { return (obj.status == 1) });

        for (var i = 0; i < row.length ; i++)
          row[i].status = 0;

        $$('pointVisit').refresh();
      }

      if (magic = 'Users') {
        row = $$('userVisit').find(function (obj) { return (obj.status == 1) });
        for (var i = 0; i < row.length ; i++)
          row[i].status = 0;

        $$('userVisit').refresh();
      }


      $$("navigation").hideProgress();
    }
  });   
}

function clearReportFilterAll() {
  $$('IsLastVisit').setValue(0);

  $.ajax({
    url: URLname + 'Services/Report.asmx/ClearAllFilter',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      setFilterChange();
      getSetting();

      var row = $$('pointVisit').find(function (obj) { return (obj.status == 1) });

      for (var i = 0; i < row.length ; i++)
        row[i].status = 0;

      $$('pointVisit').refresh();

      row = $$('userVisit').find(function (obj) { return (obj.status == 1) });
      for (var i = 0; i < row.length ; i++)
        row[i].status = 0;

      $$('userVisit').refresh();

      if (IsOnline)
        refresh();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
    
  });
}

// сохранение справочников
function setReportFilter(closed) {
  var list = $$('report');

  //showProgress("navigation");

  var row = $$(list).find(function (obj) { return (obj.IsActive == 1) });

  var text = '';

  // сначала полностью очищаем список
  $.ajax({
    url: URLname + 'Services/Report.asmx/SetReportDictionary',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': '', 'ProcName': procName }),
    complete: function () {
      if (row.length == 0) {
        $$("navigation").hideProgress();

        setFilterChange();

        if (IsOnline)
          refresh();

        return;
      }

      for (var i = 0; i < row.length; i++) {
        if (text.length < 4000) {
          text = text + row[i].ID + '|';
        }
        else {
          $.ajax({
            url: URLname + 'Services/Report.asmx/SetReportDictionary',
            data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': text, 'ProcName': procName }),
            complete: function () {

            }
          });

          text = row[i].ID + '|';
        }
      }

      if (text != '')
        $.ajax({
          url: URLname + 'Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': text, 'ProcName': procName }),
          error: function (xhr, ajaxOptions, thrownError) {
            //alert(xhr);
          }
        });

      $$("navigation").hideProgress();

      setFilterChange();

      if (IsOnline)
        refresh();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });

  badgeReportRefresh();

  if (closed)
    $$('winFilter').hide();
}

function getSetting() {
  // загрузка меню 
  loadMenu('menuFilter');  
  loadMenu('menuReport');  
  loadMenu('photoTypeList'); 
  loadMenu('photoTypeListPro');
  loadMenu('menuTask');
  loadMenu('menuPivot');
  loadMenu('menuAI');
  loadMenu('menuDashboard');
  loadMenu('menuDirectory');
  loadMenu('menuMatrix');
  loadMenu('menuAP');
  loadMenu('photoView');
  loadMenu('artTypeList');
  loadMenu('reportView');

  // скрытие отчетов для пользователя
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetUserReport',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      result = JSON.parse(data.d);

      for (var i = 0; i < result.length; i++) {
        $$('menuReport').hideItem(result[i].ReportID);
      }
    }
  });

  // скрытие отчетов для всей компании
  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetMenu',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      result = JSON.parse(data.d);

      for (var i = 0; i < result.length; i++) {
        $$('menuReport').hideItem(result[i].ID);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
     // alert(xhr);
    }
  });

  // вставка дополнительных отчетов
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetAdditional',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('menuAdd').clearAll();
      $$('menuAdd').parse(data.d);      
    }
  });  
}

function loadMenu(menuName) {
  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetMenuCustom',
    data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'MenuName': menuName, 'Lang': localStorage.getItem('Lang'), 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var items = JSON.parse(data.d);
      var count = items.length;

      var menu = $$(menuName);
      menuData = [];

      for (var i = 0; i < count; i++) {       
        // нижнее меню
        menuData.push({
          id: items[i].id,
          value: items[i].value,
          icon: items[i].icon,
          Magic: items[i].Magic,
          CountName: items[i].CountName,
          SortOrder: items[i].SortOrder,
          Author: items[i].Author,          
          AccessCount: items[i].AccessCount
        });
      }

      menu.clearAll();
      menu.parse(menuData);      

      if (menuName == 'menuFilter') {
        $.ajax({
          url: URLname + 'Services/Report.asmx/GetSetting',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Lang': localStorage.getItem('Lang') }),
          success: function (data) {
            result = JSON.parse(data.d);

            //проверка статуса сотрудника и завершение сеанса в случае неактивности по компании
            if (result.length > 0) {
              if (result[0].UserStatus == 0) {
                alert('Этот логин больше не действителен. Обратитесь к вашему руководителю.');
                exit();
              };
            };

            for (var i = 0; i < result.length; i++) {
              var item = $$('menuFilter').getItem(result[i].ID);

              if (item != null) {
                item.badge = (result[i].CCount == 0) ? '' : result[i].CCount;
                item.value = result[i].FilterName;
                $$('menuFilter').updateItem(result[i].ID, item);
              }
            }
          }
        });
      }

      if (menuName == 'menuReport') {
        $$('menuReport').select(11);

        if (localStorage.getItem('IsRecognize') != 1) {
          $$('menuReport').remove(13);
        }
      }

      if (menuName == 'menuPivot') {
        //скрыть общий отчет по наличию от исполнителей
        if (localStorage.getItem('Magic') != 'CLIENT') {
          $$('menuPivot').remove(5);
        }
      }

      if (menuName == 'menuDashboard') {
        $$('menuDashboard').select(1);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
       alert(xhr);
    }
  });
}

function badgeReportRefresh(count) {
  var row = $$('report').find(function (obj) { return (obj.IsActive == 1) }); 

  if (count == null)
     count = row.length;
  
  var item = $$('menuFilter').getItem(filterID);
  if (item == null)
    return;

  item.badge = (count == 0) ? '' : count;
  item.value = (row.length == 0) ? item.value : item.CountName;
  $$('menuFilter').updateItem(filterID, item);
}

var listReport = {
  id: 'listReports',
  rows: [
    {
      view: "toolbar", height: 40, borderless: true,
      cols: [
         { view: "button", type: "icon", width: 80, label: (isEng) ? 'All' : "Все", icon: "far fa-check-square", id: 'btnFilter', click: function () { setAllReportFilter(); } },
         { view: "button", type: "icon", width: 120, label: (isEng) ? 'Clear' : "Очистить", icon: "fas fa-trash-alt", click: function () { clearReportFilter(procName); } },
         {},
         { view: "button", type: 'icon', icon: "fas fa-times", width: 50, click: function () { $$('winFilter').hide(); } },
      ]
    },
    {
      view: "search", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", id: 'searchReport', type: "clean",
      on: {
        onTimedKeyPress: function () {
          var value = this.getValue().toUpperCase();
          var list = $$('report');

          if ((value == '') || (value.length < 3)) {
            if (value == '') list.filter('');

            return;
          }

          var search = value.split(' ');

          list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[0]) != -1; });
          if (search[1] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[1]) != -1; }, null, true);
          if (search[2] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[2]) != -1; }, null, true);
          if (search[3] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[3]) != -1; }, null, true);
          if (search[4] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[4]) != -1; }, null, true);
          if (search[5] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[5]) != -1; }, null, true);
          if (search[6] != null)
            list.filter(function (obj) { return obj.Name.toString().toUpperCase().indexOf(search[6]) != -1; }, null, true);
        }
      }
    },
    {
      view: "list", id: "report", template: "html->item_checked2", select: true, type: "line",  autowidth: true,
      type: {
        height: "auto",
        Badge: function (obj) {
          if (obj.IsActive == 1) {
            return "<div style='float: left; margin: 0; padding: 0; width: 20px'><i class='fas fa-check-square blue-color'></i></div>";//'<img src="../i/btnCheck.png" style="margin:0; padding: 0"/>';
          }
          else return '';
        }
      },
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          item.IsActive = (item.IsActive == 1) ? 0 : 1;
          $$('report').updateItem(id, item);

          setReportFilter();
        }
      }
    }
  ]
};

var listField = {
  id: 'listFields',
  rows: [
    {
      view: "toolbar", height: 40, borderless: true,
      cols: [
         //{ view: "button", type: "icon", width: 80, label: "Все", icon: "check-square-o", id: 'btnField', badge: 0, click: function () { setAllFieldFilter(); } },
         //{ view: "button", type: "icon", width: 120, label: "Очистить", icon: "trash", click: function () { clearFieldFilter(); } },
         {},
         { view: "button", type: 'icon', icon: "fas fa-times", width: 40, click: function () { $$('winField').hide(); } },
      ]
    },
    
    {
      view: "list", id: "field", template: "html->item_checked2", select: true, type: "line", autowidth: true,
      type: {
        height: "auto",
        Badge: function (obj) {
          if (obj.IsActive == 1) {
            return "<div style='float: left; margin: 0; padding: 0; width: 20px'><i class='far fa-check-square'></i></div>";//'<img src="../i/btnCheck.png" style="margin:0; padding: 0"/>';
          }
          else return '';
        }
      },
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          item.IsActive = (item.IsActive == 1) ? 0 : 1;
          $$('field').updateItem(id, item);

          if (item.IsActive == 0) {
            if ($$(tableName).isColumnVisible(item.FieldName))
              $$(tableName).hideColumn(item.FieldName);
          }
          else {
            if (!$$(tableName).isColumnVisible(item.FieldName))
              $$(tableName).showColumn(item.FieldName);
          }

          $$('btnColumn').define('badge', $$(tableName).getState().hidden.length);
          $$('btnColumn').refresh();

          if (saveHideMode) {
            $.ajax({
              url: URLname + 'Services/Report.asmx/SetHiddenField',
              data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Table': tableName, 'Field': item.FieldName, 'Status': item.IsActive }),
              error: function (xhr, ajaxOptions, thrownError) {
                //alert(xhr);
              }
            });
          }
        }
      }
    }
  ]
};

// список рекламаций по визитам
var listTaskVisit = {
  id: 'listTaskVisits',
  rows: [

    {
      cols: [
        {
          view: "list", id: "listTask", template: "html->item_checked3", select: true, type: "line", width: 280,
          type: {
            height: "auto",
            Badge: function (obj) {
              if (obj.IsActive == 1) {
                return "<div style='float: left; margin: 0; padding: 0; width: 20px'><i class='far fa-check-square blue-color'></i></div>";//'<img src="../i/btnCheck.png" style="margin:0; padding: 0"/>';
              }
              else return '';
            }
          },
          on: {
            onItemClick: function (id) {
              /*for (var _id in this.data.pull) {
                var item = this.getItem(_id);
                item.IsActive = 0;
                $$('listTask').updateItem(_id, item);
              }*/

              var item = this.getItem(id);

              item.IsActive = (item.IsActive == 1) ? 0 : 1;
              $$('listTask').updateItem(id, item);

              taskVisitID = item.id;
              taskVisitName = item.Name;
            }
          }
        },
        { view: "resizer" },
        {
          view: "datatable", id: "taskVisitArt", select: true, resizeColumn: true, fixedRowHeight: false, minWidth: 450,
          columns: [
            { id: "ArtID", header: [(isEng) ? 'ID' : "ID", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
            { id: "CategoryName", header: [(isEng) ? 'Category' : "Категория", { content: "textFilter" }], width: 70, sort: "string", fillspace: 2 },
            { id: "Name", header: [(isEng) ? 'SKU' : "Название", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string", fillspace: 5 },
            { id: "IsMatrix", header: [(isEng) ? 'Matrix' : "В матрице", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int" },
            { id: "Fact", header: [(isEng) ? 'Fact' : "Факт", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int" }
          ]
        }
      ]
    },
    { view: "textarea", id: 'textTask', maxHeight: 60, minHeight: 60, placeholder: "Введите комментарий", type: 'clean' }
  ]
};

function saveTaskVisit(taskID, taskName) {
  if (taskVisitID == -1)
    return;

  if (visitGUID == '')
    return;

  $.ajax({
    url: URLname + 'Services/Desktop.asmx/SetTaskVisit',
    data: JSON.stringify({ 'GUID': visitGUID, 'Task': taskID, 'User': localStorage.getItem('Author') , 'Description': $$('textTask').getValue()  }),
    success: function (data) {
      var item = $$('reportVisit').getItem(visitID);
      var pointID = item.PointID;
      var userID = item.UserID;

      if (item != null) {
        item.TaskName = taskVisitName;
        $$('reportVisit').updateItem(item.id, item);
      }

      $$('winTaskVisit').hide();

      sendTaskVisit(pointID, userID, $$('textTask').getValue(), taskName);

      //send('SetTask', { 'User': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': '-1|' + userID, 'Text': 'РЕКЛАМАЦИЯ К ВИЗИТУ: ' + $$('textTask').getValue(), 'Category': 15, 'GUID': '' }, '', null);

    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });  
}

function sendTaskVisit(pointID, userID, text, taskName) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/SetTask',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': '-1,' + userID, 'Text': 'РЕКЛАМАЦИЯ К ВИЗИТУ: ' + taskName + text, 'Category': 6, 'GUID': visitGUID }),
    success: function (data) {     

    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

// выбор посещенных ТТ
function getPointVisit(toExcel) {
  if (toExcel == null) showProgress("navigation")
  else var dateReport = '(' + webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()) + ')'
  //showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/GetPointVisit',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('pointVisit').clearAll();
      $$('pointVisit').parse(data.d);

      hideFields('pointVisit');
    },
    complete: function () {
      if (toExcel != null) excelDownload('pointVisit', dateReport);
      $$("navigation").hideProgress();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

// выбор активных сотрудников
function getUserVisit(toExcel) {
  if (toExcel == null) showProgress("navigation")
  else var dateReport = '(' + webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()) + ')'
  //showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/GetUserVisit',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('userVisit').clearAll();
      $$('userVisit').parse(data.d);

      hideFields('userVisit');
    },
    complete: function () {
      if (toExcel != null) excelDownload('userVisit', dateReport);
      $$("navigation").hideProgress();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}

function updateStatusPointVisit(id) {
  var item = $$('pointVisit').getItem(id);

  if (item == null)
    return;

  item.status = (item.status == 1) ? 0 : 1;
  $$('pointVisit').updateItem(id, item);

  setPointVisit(id);
}

function setPointVisit(id) {
  var item = $$('pointVisit').getItem(id);

  $.ajax({
    url: URLname + 'Services/Report.asmx/SetPointVisit',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Status': item.status }),
    success: function (data) {
      filterID = 13;
      procName = 'Point';

      var count = $$('pointVisit').find(function (obj) { return (obj.status == 1) }).length;

      badgeReportRefresh(count, 'pointVisit');
      setFilterChange();
      getSetting();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });                      
}

function updateStatusUserVisit(id) {
  var item = $$('userVisit').getItem(id);

  if (item == null)
    return;

  item.status = (item.status == 1) ? 0 : 1;
  $$('userVisit').updateItem(id, item);

  setUserVisit(id);
}

function setUserVisit(id) {
  var item = $$('userVisit').getItem(id);

  $.ajax({
    url: URLname + 'Services/Report.asmx/SetUserVisit',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Acceptor': item.UserID, 'Status': item.status }),
    success: function (data) {
      filterID = 21;
      procName = 'Users';

      var count = $$('userVisit').find(function (obj) { return (obj.status == 1) }).length;

      badgeReportRefresh(count);
      setFilterChange();
      getSetting();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}

function setReportInterval(id) {
  switch (id) {
    case '1':
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

      $$('Start').setValue(firstDay);
      $$('Finish').setValue(lastDay);

      break;

    case '2':
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      $$('Start').setValue(firstDay);
      $$('Finish').setValue(lastDay);

      break;

    case '3':
      var startDay = 1;
      var now = new Date();
      var d = now.getDay();
      var weekStart = new Date(now.valueOf() - (7 + (d <= 0 ? 7 - startDay : d - startDay)) * 86400000);
      var weekEnd = new Date(weekStart.valueOf() + 6 * 86400000);

      $$('Start').setValue(weekStart);
      $$('Finish').setValue(weekEnd);
      break;

    case '4':
      var startDay = 1; 
      var now = new Date();
      var d = now.getDay(); 
      var weekStart = new Date(now.valueOf() - (d <= 0 ? 7 - startDay : d - startDay) * 86400000); 
      var weekEnd = new Date(weekStart.valueOf() + 6 * 86400000); 

      $$('Start').setValue(weekStart);
      $$('Finish').setValue(weekEnd);
      break;

    case '5':
      $$('Start').setValue(new Date(new Date() - 24 * 3600 * 1000));
      $$('Finish').setValue(new Date(new Date() - 24 * 3600 * 1000));

      break;

    case '6':
      $$('Start').setValue(new Date());
      $$('Finish').setValue(new Date());

      break;
    case '7':
      $$('Start').setValue(new Date(new Date() - 24 * 3600 * 1000));
      $$('Finish').setValue(new Date());

      break;
  }

  $$('winPeriod').hide();
}

function setFilterChange() {
  var list = $$('menuReport');

  for (var id in list.data.pull) {
    var item = list.getItem(id);
    item.refreshed = (IsOnline) ? true : false;
  }

  list.refresh();
}


function getCompany(point, flag) {
  if (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') return;


  $.ajax({
    url: URLname + 'Services/System.asmx/GetCompany',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('company', flag, data.d);      

      for (var id in $$('company').data.pull) {
        var company = $$('company').getItem(id);

        var name = $$('acceptor').find(function (obj) { return ((obj.ID.toString() == company.ID) && (obj.IsCompany == 1)) }, true);

        if (name.Name != null)
          company.Name = name.Name;
      }
      $$('company').refresh();

      if (point != null) {
        $$('company').filter(function (obj) {
          return obj.PointID.toString() == point;
        });     
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('company');
      
    }
  });
}

// список получателей задания в привязке к ТТ
function GetAcceptorMap(point, flag) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetAcceptorMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('acceptorMap', flag, data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('acceptorMap');
    },
    complete: function () {
      if (point != null)
        getAcceptorList(point);
    }
  });
}

function getAcceptorList(point) {
  for (var id in $$('acceptor').data.pull) {
    var acceptor = $$('acceptor').getItem(id);

    acceptor.PointID = -1;
    acceptor.IsActive = 0;

    row = $$('acceptorMap').find(function (obj) { return (obj.PointID.toString() == point && obj.ID.toString() == acceptor.ID && obj.IsCompany.toString() == acceptor.IsCompany) }, true);

    if ((row.ID != null) && (row.ID != localStorage.getItem('CompanyID')))
      acceptor.PointID = point;
  }
  $$('acceptor').refresh();

  $$('acceptor').filter(function (obj) {
    return obj.PointID.toString() == point;
  });

  $$('newTask').show();
}

function saveTask() {
  //var fileName = (sessionStorage.getItem(localStorage.getItem('Author').toString() + '_' + GUID.toString()) === null) ? '' : localStorage.getItem('Author').toString() + '_' + GUID.toString();

  var fileName = (imagePhoto == null) ? '' : 'data:image/png;base64,' + imagePhoto;

  var text = $$('newTaskText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

  if (text == '') {
    webix.message({ type: "error", text: (isEng) ? 'Enter the text' : "Введите текст задания", expire: 1000 });
    return;
  }

  // формирование списка получателей
  var acceptor = '', acceptorText = 'Получатели:';
  var isNot = 0;
  var magic = localStorage.getItem('Magic');

  $$('acceptor').data.each(function (item) {
    if (item.IsActive == 1) {
      var newAcceptor = (item.IsCompany == 1) ? item.ID.toString() + ',-1|' : '-1,' + item.ID.toString() + '|';

      if (magic == 'EXECUTOR' || magic == 'EXECUTOR_EX') {
        if (isNot == 0) {
          if (item.IsCompany == 1)
            isNot = 1;
        }
        else {
          if (item.IsCompany != 1)
            isNot = 0;
        }
      }

      acceptor = acceptor + newAcceptor;

      acceptorText = acceptorText + '<br/>' + item.Name;
    }
  });

  if (acceptor == '') {
    webix.message({ type: "error", text: (isEng) ? 'Select recipients' : "Выберите получателей задания", expire: 1000 });
    return;
  }

  // отправка задания
  send('SetTask', { 'User': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': acceptor, 'Text': text, 'Category': categoryID, 'GUID': GUID }, null, null);

  $$('newTaskText').setValue();

  $$('photoArea').show();

  $$("newTaskText").setValue("");
}

function getMessagePhoto(photo) {
  if (photo == '') return '';
  const siteAddress = localStorage.getItem('SiteAddress');
  return result = "<div class='messagephoto' style='background: url(" + siteAddress + photo + ") no-repeat center center; background-size: 240px 260px; width: 200px; height: 200px;'></div>"
}

function setAdditionalColumn(report) {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetField',
    data: JSON.stringify({ 'Report': report }),
    success: function (data) {
      var result = JSON.parse(data.d);

      $$('reportAdditional').clearAll();
      $$('reportAdditional').config.columns = null;
      
      for (var i = 0; i < result.length; i++)
        result[i].header = [result[i].header.toString(), { content: "textFilter" }];

      $$('reportAdditional').config.columns = result;
      $$('reportAdditional').refreshColumns();

      $$('reportAdditional').show();
      
      getAdditionReport(report)
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });
}

function getRoute() {
  $.ajax({
    url: '../Services/Desktop.asmx/GetRoute',
    timeout: 300000,
    data: JSON.stringify({
      'User': localStorage.getItem('Author')
    }),
    success: function (data) {
      $$('route').clearAll();
      $$('route').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    },
    complete: function () {
      hideProgress('navigation');
    }
  });
}

function SetRoute(point, user, link, day1, day2, day3, day4, day5, day6, day7) {
  $.ajax({
    url: '../Services/Desktop.asmx/SetRoute',
    data: JSON.stringify({
      'Company': localStorage.getItem('CompanyID'), 'Point': point, 'User': user, 'Link': link, 'Day1': day1, 'Day2': day2, 'Day3': day3, 'Day4': day4, 'Day5': day5, 'Day6': day6, 'Day7': day7, 'Author': localStorage.getItem('Author')
    }),
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({
        type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000
      });
    }
  });
}

function getTimeSheet(borned) {
  $.ajax({
    url: '../Services/Desktop.asmx/GetTimeSheet',
    data: JSON.stringify({
      'User': localStorage.getItem('Author'), 'Borned': borned
    }),
    success: function (data) {
      $$('timeSheet').clearAll();
      $$('timeSheet').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    },
    complete: function () {
      hideProgress('navigation');
    }
  });
}