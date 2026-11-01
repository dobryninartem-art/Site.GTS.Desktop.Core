webix.protoUI({
  name: "activeList"
}, webix.ui.list, webix.ActiveContent);

//фильтр для отчетов, работает поиск по нулю
webix.ui.datafilter.extendedTextFilter = webix.extend({
  init: function (config) {
    config.compare = function (a, b) {
      return a != null && b != null && a.toString().toUpperCase().indexOf(b.toString().toUpperCase()) > -1;
    }
  }
}, webix.ui.datafilter.textFilter);

// список посещенных точек
var visitedPoint = {
  view: "datatable", id: "pointVisit", select: true, resizeColumn: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'OutCode' : "Код АСУ", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], width: 100, minWidth: 60, sort: "string" },
    { id: "Name", header: [(isEng) ? 'sign' : "Вывеска", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 300, minWidth: 100, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 150, minWidth: 100, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
    { id: "UserFilter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 150, minWidth: 100, sort: "string" },
    { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], width: 80, minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], width: 80, minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 80 }
  ],
  on: {
    onItemClick: function (id) { updateStatusPointVisit(id) },
    onCheck: function (id, col, val) { setPointVisit(id) },
    onAfterLoad: function () { this.adjustRowHeight();  }      
  }
}

// список активных пользователей
var visitedUser = {
  view: "datatable", id: "userVisit", select: true, resizeColumn: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
    { id: "UserID", header: [(isEng) ? 'User ID' : "ID Сотрудника", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }},
    { id: "OutCode", header: [(isEng) ? 'Out Code' : "Код АСУ", { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'right' } },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "UserFilter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
    { id: "DaysWorked", header: [(isEng) ? 'Days worked' : "Отработано дней", { content: "textFilter" }], width: 110, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" }
  ],
  on: {
    onItemClick: function (id) { updateStatusUserVisit(id) },
    onCheck: function (id, col, val) { setUserVisit(id) },
    onAfterLoad: function () { this.adjustRowHeight(); } 
  }
}

// отчет по фото
var reportPhoto = {
  view: "datatable", id: "reportPhoto", select: true, resizeColumn: true, /*editable: true,*/ fixedRowHeight: true, navigation: "true", pager: "pagerReport", rowLineHeight: 18, //rowHeight: 20, 
  scheme: {
    $init: function (item) {
      onPhotoReportInit(item);
    }
  },
  columns: [
    { id: "status", header: (isEng) ? 'hide' : "Скрыть", template: "{common.checkbox()}", adjust: "data", hidden: (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') },
    { id: "IsCheckName", header: [(isEng) ? 'Appr' : "Подтв.", { content: "textFilter" }], width: 40, minWidth: 40, hidden: (localStorage.getItem('IsPoint') == '0') },
    { id: "Rating", header: [(isEng) ? 'Rating' : "Оценка", { content: "textFilter" }], width: 40, minWidth: 40, hidden: (localStorage.getItem('IsPoint') == '0') },
    //{ id: 'photoIcon', header: [(isEng) ? 'Icon' : "Миниатюра", { content: "textFilter" }], template: '<div class="reportphoto-medium" style="background: url(#Link#) no-repeat center center; background-size: 100px 100px;"></div>', width: 80, css: { 'text-align': 'left' }, hidden: true },
    //{ id: 'photoPicture', header: [(isEng) ? 'Photo' : "Фото", { content: "textFilter" }], template: '<div class="reportphoto" style="background: url(#Link#) no-repeat center center; background-size: 240px 240px;"></div>', width: 210, css: { 'text-align': 'left' }, hidden: true },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "BornedTime", header: [(isEng) ? 'Time' : "Время отчета", { content: "textFilter" }], width: 40, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Category' : "Категория", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtCategoryName", header: [(isEng) ? 'Product group' : "Категория SKU", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ActionName", header: [(isEng) ? 'Action' : "Анкета", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Description", header: [(isEng) ? 'Comment' : "Комментарий", { content: "textFilter" }], adjust: "header", minWidth: 100, editor: "text", sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Ссылка", { content: "textFilter" }], width: 110, minWidth: 50, sort: "string", hidden: true },
    { id: "Distance", header: [(isEng) ? 'Distance, m' : "Расстояние, м", { content: "textFilter" }], width: 90, minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
    { id: "DistanceText", header: [(isEng) ? 'Geo' : "Гео", { content: "textFilter" }], width: 50, minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
    { id: "FlagName", header: [(isEng) ? 'Browser' : "Источник", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" }
  ],
  on: {
    onItemClick: function (id) {
      onPhotoClick($$('reportPhoto'), id);
    },
    onBeforeEditStart: function (id) {
      onBeforeEditPhoto($$('reportPhoto'), id);
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      onAfterEditStopPhoto($$('reportPhoto'), state, editor, ignoreUpdate);
    },
    onCheck: function (id, col, val) {
      onCheckPhoto($$('reportPhoto'), id, col, val);
    },
    onAfterLoad: function () { /*this.adjustRowHeight();*/ }      
  }

}

function onPhotoReportInit(item) {
  if (item.status == 1)
    item.$css = "passive";
  else item.$css = "active";

  if ($.isNumeric(item.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
    item.OutCode = item.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
  }
  if ($.isNumeric(item.Distance.toString().replace(new RegExp(",", 'g'), "."))) {
    item.Distance = item.Distance.toString().replace(new RegExp(",", 'g'), ".") * 1;
  }
}

function onPhotoClick(list, id) {  
  if (id.column == "Description")
    return;

  var item = list.getItem(id);
  var taskID = item.ID;

  sessionStorage.setItem('photoLat', item.Lat);
  sessionStorage.setItem('photoLon', item.Lon);
  sessionStorage.setItem('photoError', item.Error);
  sessionStorage.setItem('pointLat', item.PointLat);
  sessionStorage.setItem('pointLon', item.PointLon);
  sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

  sessionStorage.setItem('Borned', item.Borned);
  sessionStorage.setItem('UserTrackID', item.UserID);

  acceptorPhoto = '-1,' + item.UserID + '|';
  bornedPhoto = item.Borned

  var description = item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.ArtCategoryName + ', ' + item.BrandName + ' ' +
     item.ActionName + (item.CategoryName == '' ? '' : ', категория ФО: ' + item.CategoryName);

  $$('photoViewerPage').expand();
  showPhotoReport(item.Link, description, item.Borned, item.PointID, item.PhotoID, item.status, item.CompanyID, item.IsCheck, item.Description, item.Rating);
}

function onBeforeEditPhoto(list, id) {
  var item = list.getItem(id);
  if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
    return false;
}

function onAfterEditStopPhoto(list, state, editor, ignoreUpdate) {
  var item = list.getItem(editor.row);

  if (state.value != state.old) {
    list.render();

    $.ajax({
      url: '../Services/UI.asmx/PhotoDescriptionEdit',
      data: JSON.stringify({ 'ID': item.ID, 'Description': state.value }),
      success: function (data) { },
      error: function (xhr, ajaxOptions, thrownError) {
        //onError();
      }
    });
  }
}

function onCheckPhoto(list, id, col, val) {
  var item = list.getItem(id);

  item.$css = (val == 0) ? 'passive' : 'active';
  list.render();

  send('SetPhotoHide', { 'ID': item.PhotoID, 'Status': val, 'User': localStorage.getItem('Author') }, null, null);
}

function showPrevPhoto() {
  var list = $$('reportPhoto');

  if (pageName == 'reportTotal')
    list = $$('reportTotal');

  if (pageName == 'reportVisit')
    list = $$('photoVisit');

  var flag = null;

  list.eachRow(
    function (row) {
      if (list.isSelected(row))
        flag = -1;

      if (flag != -1)
        previd = row;
    });

  if (previd == null) return;

  var item = list.getItem(previd);
  
  if (item == null) return;

  list.select(item.id);

  var taskID = item.ID;

  sessionStorage.setItem('photoLat', item.Lat);
  sessionStorage.setItem('photoLon', item.Lon);
  sessionStorage.setItem('photoError', item.Error);
  sessionStorage.setItem('pointLat', item.PointLat);
  sessionStorage.setItem('pointLon', item.PointLon);
  sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

  acceptorPhoto = '-1,' + item.UserID + '|';
  bornedPhoto = item.Borned

  var description = item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName +/* ', ' + item.CategoryName +*/ ', ' + item.BrandName + ' ' +
     item.ActionName + (item.CategoryName == '' ? '' : ', категория ФО: ' + item.CategoryName);

  showPhotoReport(item.Link, description, item.Borned, item.PointID, item.PhotoID, item.status, item.CompanyID, item.IsCheck, item.Description, item.Rating);
}

function showNextPhoto() {
  var list = $$('reportPhoto');

  if (pageName == 'reportTotal')
    list = $$('reportTotal');

  if (pageName == 'reportVisit')
    list = $$('photoVisit');

  var nextid = null;

  list.eachRow(
    function (row) {
      if (nextid == -1)
        nextid = row;

       if (list.isSelected(row))
         nextid = -1;     

    });

  if (nextid == null) return;

  var item = list.getItem(nextid);

  if (item == null) return;

  list.select(item.id);

  var taskID = item.ID;

  sessionStorage.setItem('photoLat', item.Lat);
  sessionStorage.setItem('photoLon', item.Lon);
  sessionStorage.setItem('photoError', item.Error);
  sessionStorage.setItem('pointLat', item.PointLat);
  sessionStorage.setItem('pointLon', item.PointLon);
  sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

  acceptorPhoto = '-1,' + item.UserID + '|';
  bornedPhoto = item.Borned

  var description = item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName +/* ', ' + item.CategoryName +*/ ', ' + item.BrandName + ' ' +
     item.ActionName + (item.CategoryName == '' ? '' : ', категория ФО: ' + item.CategoryName);
    
  showPhotoReport(item.Link, description, item.Borned, item.PointID, item.PhotoID, item.status, item.CompanyID, item.IsCheck, item.Description, item.Rating);
}

function AvailableImg(path, name) {
  this._path = path;
  this._name = name;
}

function archivePhoto() {
  if ($$('reportPhoto').count() == 0) return;

  var list = $$('reportPhoto');

  var available_images = [];

  for (var i = 0; i < list.count() ; i++) {
    var item = list.getItem(list.data.order[i]);

      var name = '';
      
        if (localStorage.getItem('CompanyID') == 78) {
           name = (item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
           item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
           item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
           item.ArtName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_'));
        }

       else if (localStorage.getItem('CompanyID') == 279) {
           name = (item.OfficeName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
           item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
           item.Name.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
           item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_')) + '_' +
           ((item.CategoryName != '') ? 'ФО ' + item.CategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') + '_' +
           item.VisitDate;
       }

       else {
           name = ((item.status == 1) ? '(скрытo) ' : '') +
           item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
           item.Name.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
           item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
           item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
           ((item.ActionName == '') ? item.ArtCategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
           ((item.ActionName != '') ? 'Промо-акция ' + item.ActionName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
           ((item.CategoryName != '') ? 'ФО ' + item.CategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
           item.BrandName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ((item.ArtName == '') ? '' : ' ' + item.ArtName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_')) + ' от ' +
           item.VisitDate + ' ' +
           item.Description.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
       }

    name = name.substring(0, 200);

    available_images.push(new AvailableImg(item.Link, name));
  }

  var date = $$('btnPeriod').config.label;

  var producer = localStorage.getItem('CompanyName').replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

  showProgress('navigation');
  //если фото больше 40000, то не формируем архив
  if (list.count() > 40000) {
    alert("Размер архива превышает допустимый размер (40000 фото), пожалуйста выберите период меньше или примените фильтры.");
    $$('navigation').hideProgress();
  }
  //если фото больше 4000, то ссылка на архив будет отправлена на почту
  else if (list.count() > 4000) {
    var authorEmail = localStorage.Email

    if (authorEmail == '' || authorEmail === undefined) { //проверка наличия почты
      alert("Размер архива слишком большой. Для отправки ссылки на архив - обратитесь к администратору для регистрации вашего email адреса в системе.");
      $$('navigation').hideProgress();
    }
    else {
      var path = producer + ' ' + date + '.zip';
      path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

      $.ajax({
        url: URLname + 'Services/Archive.asmx/ArchivePhotoListSendEmail',
        data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images, 'archiveName': path, 'userID': localStorage.Author, 'photoCount': list.count() }),
      });

      alert("Размер архива слишком большой, на Вашу почту " + authorEmail + " будет отправлена ссылка для скачивания.");
      $$('navigation').hideProgress();
    }
  }
  //если фото меньше 4000, скачиваем архив сразу в браузере
  else {
    $.ajax({
      url: URLname + 'Services/Archive.asmx/ArchivePhotoList',
      timeout: 120000,
      data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images }),
      success: function (data) {
        var path = producer + ' ' + date + '.zip';
        path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
        window.open('../Archives/' + path, '_self', false);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
      },
      complete: function () {
        $$('navigation').hideProgress();
      }
    });
  }
}

function getReportPhoto() {
  showProgress("reportPhoto");  

  $.ajax({
    url: URLname + 'Services/Report.asmx/Photo',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue(), 'Magic': photoMagic }),
    success: function (data) {
      $$('reportPhoto').clearAll();
      $$('reportPhoto').parse(data.d, "json");      

      $$('reportPhoto').hideProgress();      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });      
    },
    complete: function () {
      $$("reportPhoto").hideProgress();
      setPhotoHeight();
    }
  });
}


var reportVisit = {
  view: "datatable", id: "reportVisit", select: true, resizeColumn: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24,
  columns: [
    {
      id: "TaskName", header: [(isEng) ? 'Task, m' : "Рекламация", { content: "excelFilter" }], adjust: "header", minWidth: 250,
      css: { 'text-decoration': 'underline', 'color': 'blue' }, sort: "string",
      hidden: (localStorage.getItem('CompanyID') != '111')
    },
    {
      id: "TaskUserName", header: [(isEng) ? 'Employee task' : "Инициатор", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string",
      hidden: (localStorage.getItem('CompanyID') != '111')
    },
    {
      id: "TaskBorned", header: [(isEng) ? 'Date of task' : "Дата рекламации", { content: "textFilter" }], width: 72, minWidth: 72,
      sort: "string", css: { 'text-align': 'center' },
      hidden: (localStorage.getItem('CompanyID') != '111')
    },
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }},
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], adjust: "data", sort: "int", css: { 'text-align': 'right' }},
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 72, minWidth: 72, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 72, minWidth: 72, sort: "string", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], adjust: "header", minWidth: 60, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], adjust: "header", minWidth: 60, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], adjust: "header", minWidth: 70, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], adjust: "header", minWidth: 70, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], adjust: "header", minWidth: 100, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
    { id: "Start", header: [(isEng) ? 'Start' : "Начало", { content: "textFilter" }], width: 60, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "GeoTime", header: [(isEng) ? 'Time' : "Точн. время", { content: "textFilter" }], width: 80, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Duration", header: [(isEng) ? 'Duration' : "Длит.", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Finish", header: [(isEng) ? 'Finish' : "Окончание", { content: "textFilter" }], width: 68, minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "PhotoCount", header: [(isEng) ? 'Info' : "Инфо", { content: "textFilter" }], width: 70, minWidth: 40, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "string" },
    { id: "ActionCount", header: [(isEng) ? 'Actions' : "Кол-во отчетов", { content: "textFilter" }], width: 100, minWidth: 40, css: { 'text-align': 'center' }, sort: "int" },
    { id: "Distance", header: [(isEng) ? 'Start, m' : "Начало, м", { content: "textFilter" }], adjust: "header", minWidth: 70, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "int" },
    { id: "IsRoute", header: [(isEng) ? 'Plan' : "План", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
    { id: "FlagName", header: [(isEng) ? 'Browser' : "Источник", { content: "textFilter" }], adjust: "header", minWidth: 100, sort: "string" },
    { id: "Distance2", header: [(isEng) ? 'Finish, m' : "Окончание, м", { content: "textFilter" }], adjust: "header", minWidth: 70, css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' }, sort: "int" },
    { id: "PhotoStart", header: [(isEng) ? 'First photo' : "1-ое фото", { content: "textFilter" }], adjust: "header", minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "PhotoFinish", header: [(isEng) ? 'Last photo' : "Посл. фото", { content: "textFilter" }], adjust: "header", minWidth: 40, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" }
    
  ],
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.Distance.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.Distance = obj.Distance.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
    }
  },
  on: {
    onAfterLoad: function () { this.adjustRowHeight(); },
    onItemClick: function (id) {
      var item = this.getItem(id);      

      if (id.column == 'TaskName') {        

        sessionStorage.setItem('PointID', item.PointID);
        sessionStorage.setItem('Borned', item.Borned);

        $$('taskVisitHeader').define('template', item.NetworkName + ', ' + item.CityName + ' ' + item.Address + ' (' + item.Borned + ')');
        $$('taskVisitHeader').refresh();

        getTaskVisit(item.GUID, item.id, item.TaskName);

        return;
      }

      if (id.column == 'Distance') {
        $$('photoViewerPage').collapse();

        sessionStorage.setItem('photoLat', item.Lat);
        sessionStorage.setItem('photoLon', item.Lon);
        sessionStorage.setItem('photoError', item.Error);
        sessionStorage.setItem('pointLat', item.PointLat);
        sessionStorage.setItem('pointLon', item.PointLon);
        sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

        sessionStorage.setItem('Borned', item.Borned);
        sessionStorage.setItem('UserTrackID', item.UserID);

        //$$('btnTrack').define('label', item.UserName + ' - трекинг за ' + item.Borned); $$('btnTrack').refresh();

        getGeoVisit();

        return;
      }

      if (id.column == 'Distance2') {
        $$('photoViewerPage').collapse();

        sessionStorage.setItem('photoLat', item.Lat2);
        sessionStorage.setItem('photoLon', item.Lon2);
        sessionStorage.setItem('photoError', item.Error2);
        sessionStorage.setItem('pointLat', item.PointLat);
        sessionStorage.setItem('pointLon', item.PointLon);
        sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

        sessionStorage.setItem('Borned', item.Borned);
        sessionStorage.setItem('UserTrackID', item.UserID);

        getGeoVisit();

        return;
      }

      if (id.column == 'PhotoCount') {
        VisitPointID = item.PointID;
        VisitUserID = item.UserID;
        VisitBorned = item.Borned;
        VisitGUID = item.GUID;

        //для планограммы
        sessionStorage.setItem('PointID', item.PointID);
        sessionStorage.setItem('Borned', item.Borned);

        $.ajax({
          url: '../Services/Visit.asmx/GetCaption',
          data: JSON.stringify({ 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'GUID': VisitGUID, 'Author': localStorage.getItem('Author') }),          
          success: function (data) {
            var list = $$('tableCaption');

            list.clearAll();
            list.parse(data.d, "json");
            
            $$('winVisit').show();

            getReport('[GTS].VISIT.GetInfo', '', 'Информация по визиту', 0, 1);
            getReport('[GTS].VISIT.GetPhotoAll', '', 'Все фото', 0, 1);
            getReport('[GTS].VISIT.GetPhoto', '', 'Фотоотчеты', 0, 1);
            getReport('[GTS].VISIT.GetArt', '', 'Анкеты', 0, 1);
            getReport('[GTS].VISIT.GetPhotoPromo', '', 'Фото по промо', 0, 1);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            onError();
          }
        });        
      }
    }
  }
}

// выбор рекламаций по визиту
function getTaskVisit(guid, id, taskName) {
  visitGUID = guid;
  visitID = id;

  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetTaskVisit',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'GUID': guid }),
    success: function (data) {
      var list = $$('listTask');

      list.clearAll();
      list.parse(data.d);

      taskVisitID = -1;
      taskVisitName = '';
      
      var item = list.getItem(list.getFirstId());

      if (item != null)
        $$('textTask').setValue(item.Description);

      if (taskName == 'Рекламация')
        $$('buttonTaskVisit').show();
      else $$('buttonTaskVisit').hide();


      getTaskVisitArt();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

function getTaskVisitArt() {
  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetVisitArt',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': sessionStorage.getItem('PointID'), 'Borned': sessionStorage.getItem('Borned') }),
    success: function (data) {
      var list = $$('taskVisitArt');

      list.clearAll();
      list.parse(data.d);      

      $$('winTaskVisit').show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}  

function getVisitReport() {
  showProgress("reportVisit");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Visit',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Lang': localStorage.getItem('Lang') }),
    success: function (data) {
      $$('reportVisit').clearAll();
      $$('reportVisit').parse(data.d);

      hideFields('reportVisit');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("reportVisit").hideProgress();
    }
  });
}

var reportTotal = {
  view: "datatable", id: "reportTotal", select: true, resizeColumn: true, editable: true, fixedRowHeight: false, pager: "pagerReport", dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  scheme: {
    $init: function (obj) {
      /*if ($.isNumeric(obj.Answer.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.Answer = obj.Answer.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.Code.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.Code = obj.Code.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.PLUCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.PLUCode = obj.PLUCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }*/
    }
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, adjustBatch: 100 },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, adjustBatch: 100 },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, adjustBatch: 100 },
    { id: "VisitDate", header: [(isEng) ? 'Date of visit' : "Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "UserCompanyName", header: [(isEng) ? 'User company' : "Компания сотрудника", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "TypeName", header: [(isEng) ? 'Type' : "Тип анкеты", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ActionName", header: [(isEng) ? 'Form' : "Наименование анкеты", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ArtCategoryName", header: [(isEng) ? 'Product group' : "Группа", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Code", header: [(isEng) ? 'SKU Code' : "Код SKU", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "PLUCode", header: [(isEng) ? 'PLU' : "Код PLU", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "EANCode", header: [(isEng) ? 'EAN' : "Штрих-код", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 },
    // { id: "IsPromoArt", header: [(isEng) ? 'Promo SKU' : "Промо SKU", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'center' }, sort: "string", adjustBatch: 100 },
    { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Answer", header: [(isEng) ? 'Answer' : "Ответ", { content: "extendedTextFilter" }], width: 350, editor: "popup", minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    //{ id: "ReportName", header: [(isEng) ? 'Report type' : "Тип отчета", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", adjustBatch: 100 },
    { id: "PhotoID", header: [(isEng) ? 'PhotoID' : "ID фото", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", hidden: true, adjustBatch: 100 }
  ],
  on: {
    onAfterLoad: function () {
        //this.adjustRowHeight(null, false);
    },
    onBeforeEditStart: function (id) {
        if (customReportID != -1)
            return false;

      var item = $$('reportTotal').getItem(id);
      if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
        return false;
      if (localStorage.getItem('IsTask') != 1)
        return false;
    },
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = $$('reportTotal').getItem(editor.row);

      if (state.value != state.old) {
        $$('reportTotal').render();

        if (editor.column == 'Answer') {
          $.ajax({
            url: '../Services/Desktop.asmx/SetAnswer',
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
    onItemClick: function (id) {
      var item = this.getItem(id);

      // если запуск из обычного отчета
      if (customReportID == -1 || customReportID == null) {
        if (item.Link == '') return;

        if (item.Link.indexOf('jpg') == -1) {
          return;
        }

        var item = $$('reportTotal').getItem(id);
        var taskID = item.ID;

        sessionStorage.setItem('photoLat', item.Lat);
        sessionStorage.setItem('photoLon', item.Lon);
        sessionStorage.setItem('photoError', item.Error);
        sessionStorage.setItem('pointLat', item.PointLat);
        sessionStorage.setItem('pointLon', item.PointLon);
        sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

        sessionStorage.setItem('Borned', item.Borned);
        sessionStorage.setItem('UserTrackID', item.UserID);

        acceptorPhoto = '-1,' + item.UserID + '|';
        bornedPhoto = item.Borned

        $$('photoViewerPage').expand();

        var description = item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.ArtCategoryName + ', ' + item.BrandName + ' ' +
          item.ActionName + (item.CategoryName == '' ? '' : ', категория ФО: ' + item.CategoryName);

        showPhotoReport(item.Link, description, item.Borned, item.PointID, item.PhotoID, -1, item.CompanyID, item.IsCheck, item.Description, item.Rating);
      }
      else {
        // если запуск кастомного отчета
        if (item.PhotoID == -1)
          return;

        showProgress("accPhotoReport");
        
        $.ajax({
          url: '../Services/Custom.asmx/GetPhotoInfo',
          timeout: 300000,
          data: JSON.stringify({ 'Photo': item.PhotoID, 'User': localStorage.getItem('Author') }),
          success: function (data) {
            var item = JSON.parse(data.d);

            sessionStorage.setItem('photoLat', item[0].Lat);
            sessionStorage.setItem('photoLon', item[0].Lon);
            sessionStorage.setItem('photoError', item[0].Error);
            sessionStorage.setItem('pointLat', item[0].PointLat);
            sessionStorage.setItem('pointLon', item[0].PointLon);
            sessionStorage.setItem('pointAddress', item[0].Name + ' ' + item[0].Address);

            sessionStorage.setItem('Borned', item[0].Borned);
            sessionStorage.setItem('UserTrackID', item[0].UserID);

            acceptorPhoto = '-1,' + item[0].UserID + '|';
            bornedPhoto = item[0].Borned;

            $$('photoViewerPage').expand();

            var description = item[0].UserName + ', руководитель ' + item[0].MasterName + ', Компания ' + item[0].CompanyName + ', ' + item[0].ArtCategoryName + ', ' + item[0].BrandName + ' ' +
              item[0].ActionName + (item[0].CategoryName == '' ? '' : ', категория ФО: ' + item[0].CategoryName);

            showPhotoReport(item[0].Link, description, item[0].Borned, item[0].PointID, item[0].PhotoID, -1, item[0].CompanyID, null, item[0].Description, null);
            
          },
          error: function (xhr, ajaxOptions, thrownError) {
            webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
          },
          complete: function () {
            $$("accPhotoReport").hideProgress();
          }
        });
      }
    }
  }
}

//присвоение стандартных имен для общего отчета(меняются от кастомных)
function reportTotalSetColumns() {
  let columnlength = $$('reportTotal').config.columns.length - 1
  for (let i = 0; i <= columnlength; i++) {
    let columnID = $$('reportTotal').config.columns[i].id;
    let columnName = $$('reportTotal').config.columns[i].header[0].text;
    switch (columnID) {
      case "PointID": columnName = [(isEng) ? 'ID' : "ID ТТ"]; break;
      case "OutCode": columnName = [(isEng) ? 'Code' : "Код ТТ"]; break;
      case "WeekNumber": columnName = [(isEng) ? 'Week' : "Неделя"]; break;
      case "VisitDate": columnName = [(isEng) ? 'Date of visit' : "Дата визита"]; break;
      case "Borned": columnName = [(isEng) ? 'Date of report' : "Дата отчета"]; break;
      case "OfficeName": columnName = [(isEng) ? 'Office' : "Офис"]; break;
      case "CityName": columnName = [(isEng) ? 'City' : "Город"]; break;
      case "NetworkName": columnName = [(isEng) ? 'Network' : "Сеть"]; break;
      case "Name": columnName = [(isEng) ? 'Sign' : "Вывеска"]; break;
      case "FormatName": columnName = [(isEng) ? 'Format' : "Формат",]; break;
      case "Address": columnName = [(isEng) ? 'Address' : "Адрес"]; break;
      case "UserName": columnName = [(isEng) ? 'Employee' : "Сотрудник"]; break;
      case "MasterName": columnName = [(isEng) ? 'Head' : "Руководитель"]; break;
      case "RoleName": columnName = [(isEng) ? 'Position' : "Должность"]; break;
      case "UserCompanyName": columnName = [(isEng) ? 'User company' : "Компания сотрудника"]; break;
      case "CompanyName": columnName = [(isEng) ? 'Company' : "Компания"]; break;
      case "TypeName": columnName = [(isEng) ? 'Type' : "Тип анкеты"]; break;
      case "ActionName": columnName = [(isEng) ? 'Form' : "Наименование анкеты"]; break;
      case "ArtCategoryName": columnName = [(isEng) ? 'Product group' : "Группа"]; break;
      case "BrandName": columnName = [(isEng) ? 'Brand' : "Бренд"]; break;
      case "ArtName": columnName = ["SKU"]; break;
      case "Code": columnName = [(isEng) ? 'SKU Code' : "Код SKU"]; break;
      case "PLUCode": columnName = [(isEng) ? 'PLU' : "Код PLU"]; break;
      case "EANCode": columnName = [(isEng) ? 'EAN' : "Штрих-код"]; break;
      case "QuestionName": columnName = [(isEng) ? 'Question' : "Вопрос"]; break;
      case "Answer": columnName = [(isEng) ? 'Answer' : "Ответ"]; break;
      case "Link": columnName = [(isEng) ? 'Link' : "Файл"]; break;
      case "Filter": columnName = [(isEng) ? 'Filter' : "Фильтр"]; break;
      case "PhotoID": columnName = [(isEng) ? 'PhotoID' : "ID фото"]; break;
    }
    $$('reportTotal').config.columns[i].header[0].text = columnName;
  }
};

var reportAIMatrix = {
  view: "datatable", id: "reportAIMatrix", select: true, resizeColumn: true, editable: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.Code.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.Code = obj.Code.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.PLUCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.PLUCode = obj.PLUCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
    }
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "textFilter" }], width: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 30, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 50, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Company' : "Компания", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Product group' : "Группа", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Code", header: [(isEng) ? 'SKU Code' : "Код SKU", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "PLUCode", header: [(isEng) ? 'PLU' : "Код PLU", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "EAN", header: [(isEng) ? 'EAN' : "ШK", { content: "textFilter" }], width: 50, minWidth: 30, sort: "string" },
    { id: "IsMatrix", header: [(isEng) ? 'Matrix' : "Матрица", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "IsExists", header: [(isEng) ? 'Place' : "На полке", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 10, sort: "string" }
  ],
  on: {   
    onAfterLoad: function () { this.adjustRowHeight(); },
    onItemClick: function (id) {
      var item = this.getItem(id);

      if (item.Link == '') return;

      if (item.Link.indexOf('jpg') == -1) {
        return;
      }

      showImage(item);
    }
  }
}

function getReportAIMatrix() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/AIMatrix',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue(), 'Magic': artMagic }),
    success: function (data) {

      $$('reportAIMatrix').clearAll();
      $$('reportAIMatrix').parse(data.d);

      hideFields('reportAIMatrix');
      $$('rowPager').show();      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var reportAIMatrixTotal = {
  view: "datatable", id: "reportAIMatrixTotal", select: true, resizeColumn: true, editable: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }     
    }
  },
  columns: [
    { id: "PointID", header: [(isEng) ? 'ID' : "ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "textFilter" }], width: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: [(isEng) ? 'Date of report' : "Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 30, sort: "string" },
    { id: "FormatName", header: [(isEng) ? 'Format' : "Формат", { content: "textFilter" }], width: 60, minWidth: 30, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 240, minWidth: 50, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "MatrixCount", header: [(isEng) ? 'Matrix' : "Матрица", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "ExistsCount", header: [(isEng) ? 'Place' : "На полке", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" },
    { id: "Percents", header: [(isEng) ? 'Percents' : "%", { content: "textFilter" }], width: 60, minWidth: 10, css: { 'text-align': 'center' }, sort: "string" }
  ]
}


function getReportAIMatrixTotal() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/AIMatrixTotal',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue(), 'Magic': artMagic }),
    success: function (data) {

      $$('reportAIMatrixTotal').clearAll();
      $$('reportAIMatrixTotal').parse(data.d);

      hideFields('reportAIMatrixTotal');
      $$('rowPager').show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function getTotalReport() {
  showProgress("accPhotoReport");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Total',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': 1, 'Magic': artMagic }),
    success: function (data) {
      if (reportView == 'TABLE') {
        $$('reportTotal').clearAll();
        $$('reportTotal').parse(data.d);

        if (saveHideMode)
          hideFields('reportTotal');
        
        $$('rowPager').show();
      }
      else {
        $$('rowPager').hide();       

        pivotData = JSON.parse(data.d);

        var structurePivot = {
          rows: ["PointID", "CityName", "NetworkName", "Address", "UserName", "Borned"],
          columns: ["ActionName", "ArtName", "QuestionName"],
          values: [{ name: "Answer", operation: "any" }],
          filters:
            [
              { name: "OutCode" }, { name: "CityName" }, { name: "NetworkName" }, { name: "Name" }, 
              { name: "UserName" }, { name: "RoleName" }, { name: "MasterName" }, 
              { name: "ArtCategoryName" }, { name: "ArtBrandName" }, { name: "ArtName" }, { name: "Code" }, { name: "PLUCode" },
              { name: "CompanyName" }, { name: "ActionName" }, { name: "QuestionName" }
            ]
        };

        var fieldPivot = [
          { id: "PointID", value: "ID ТТ", type: "number", width: 50 },
          { id: "OutCode", value: "Код ТТ", type: "text", width: 60 },
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

        $$("pivotStandart").parse(pivotData, structurePivot, fieldPivot);        
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("accPhotoReport").hideProgress();
    }
  });
}

var reportTask = {
    view: "datatable", id: "reportTask", select: true, resizeColumn: true, fixedRowHeight: true, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, resizeRow: true,
  columns: [
    { id: "ID", header: ["№", { content: "textFilter" }], width: 60, minWidth: 20, sort: "int", sort: "string" },
    { id: "OutCode", header: [(isEng) ? 'Code' : "Код ТТ", { content: "textFilter" }], width: 60, minWidth: 20, sort: "int", sort: "string" },
    { id: "BornedDay", header: [(isEng) ? 'Date' : "Дата", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "BornedTime", header: [(isEng) ? 'Time' : "Время отчета", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "InitiatorName", header: [(isEng) ? 'Author' : "Отправитель задания", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "InitiatorCompanyName", header: [(isEng) ? 'Author company' : "Компания отправитель", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Recipient' : "Получатель", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "UserRoleName", header: [(isEng) ? 'Recipient' : "Должность", { content: "textFilter" }], minWidth: 20, sort: "string" },
    { id: "CompanyName", header: [(isEng) ? 'Recipient company' : "Компания получатель", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 300, minWidth: 20, sort: "string" },
    { id: "CategoryName", header: [(isEng) ? 'Category' : "Категория", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string" },
    { id: "Text", header: [(isEng) ? 'Text' : "Текст задания", { content: "textFilter" }], width: 250, minWidth: 20, sort: "string" },
    { id: "LastText", header: [(isEng) ? 'Last Text' : "Последний ответ", { content: "textFilter" }], width: 150, minWidth: 20, sort: "string" },
    { id: "StatusName", header: [(isEng) ? 'Status' : "Статус", { content: "textFilter" }], width: 80, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "PhotoTask", header: [(isEng) ? 'Link Task' : "ФО Задание", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string" },
    { id: "PhotoAnswer", header: [(isEng) ? 'Link Answer' : "ФО Ответ", { content: "textFilter" }], width: 60, minWidth: 20, sort: "string" }
  ],
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.ID.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.ID = obj.ID.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
    }
  },
  on: {
    onAfterLoad: function () { this.adjustRowHeight(); },
    onItemClick: function (id) {
      var item = this.getItem(id);
      getMessageIntoReport(item.ID, item.NetworkName + ' ' + item.Address + ', № ' + item.ID + ', Дата: ' + item.BornedDay + ' ' + item.BornedTime + ', категория ' + item.CategoryName + ((item.Status == 0) ? ' Задание закрыто' : ''), item.Status, item.PointID, item.UserID);
    }
  }
}

function getTaskReport() {
  // Показать индикатор загрузки
  $$("progressIcon").show();

  $.ajax({
    url: URLname + 'Services/Report.asmx/Task',
    timeout: 300000,
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify({
      'User': localStorage.getItem('Author'),
      'Start': webix.i18n.parseFormatStr($$('Start').getValue()),
      'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()),
      'IsMy': 0,
      'Point': null
    }),
    success: function (response) {
      $$('reportTask').clearAll();
      $$('reportTask').parse(response.d);
      hideFields('reportTask');

      // Скрыть индикатор загрузки после успешной обработки данных
      $$("progressIcon").hide();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({
        type: "error",
        text: "Потеряно соединение с сервером. Данные не получены.",
        expire: 1000
      });

      // Скрыть индикатор загрузки в случае ошибки
      $$("progressIcon").hide();
    }
  });
}

// Инициализация индикатора загрузки
webix.ui({
  view: "window",
  id: "progressIcon",
  move: false,
  position: "center",
  modal: true,
  head: false,
  body: {
    cols: [
      { view: "icon", icon: "fas fa-sync fa-spin", css: "webix_primary", width: 50, height: 50 },
      { view: "label", label: "Загрузка данных...", align: "left" }
    ]
  }
});

// Скрыть индикатор загрузки при инициализации
$$("progressIcon").hide();

var reportFocus = {
  view: "datatable", id: "reportFocus", select: true, resizeColumn: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
  columns: [
      { id: "TaskID", header: ["№", { content: "textFilter" }], width: 40, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
      { id: "CityName", header: [(isEng) ? 'City' : "Город", { content: "textFilter" }], width: 90, minWidth: 60, sort: "string" },
      { id: "NetworkName", header: [(isEng) ? 'Network' : "Сеть", { content: "textFilter" }], width: 110, minWidth: 60, sort: "string" },
      { id: "Name", header: [(isEng) ? 'Sign' : "Вывеска", { content: "textFilter" }], width: 140, minWidth: 60, sort: "string" },
      { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 180, minWidth: 60, sort: "string" },
      { id: "TaskName", header: [(isEng) ? 'Task' : "Задание", { content: "textFilter" }], width: 180, minWidth: 60, sort: "string" },
      { id: "Borned", header: [(isEng) ? 'Date' : "Дата", { content: "textFilter" }], width: 60, sort: "string" },
      { id: "UserName", header: [(isEng) ? 'Recipient' : "Получатель", { content: "textFilter" }], width: 140, minWidth: 60, sort: "string" },
      { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 140, minWidth: 60, sort: "string" },
      { id: "Text", header: [(isEng) ? 'Answer' : "Ответ", { content: "textFilter" }], width: 250, minWidth: 60, sort: "string" },
      { id: "Status", header: [(isEng) ? 'Status' : "Статус", { content: "textFilter" }], width: 250, minWidth: 60, sort: "string" }
  ],
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.TaskID.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.TaskID = obj.TaskID.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
    }
  },
  on: {
    onAfterLoad: function () { this.adjustRowHeight(); },
    onItemClick: function (id) {
      var item = this.getItem(id);

      if (item.Link == '') {
        $$('photoViewerTask2').collapse();
        return;
      }

      $$('photoViewerTask2').expand();

      var photofile = item.Link;

      var template = '<div><img src="' + photofile + '" id="photofull" onclick="zoom(\'photoDivTask\')"/></div>';
      var container = $('div[view_id="photoDivTask"]');

      var width = container.width();
      var height = container.height();

      $$('photoDivTask2').define('template', template);
      $$('photoDivTask2').define('width', width);
      $$('photoDivTask2').define('height', height);
      $$('photoDivTask2').define('scroll', 'false');
      // $$("photoDiv").scrollTo(0, 0);
      $$('photoDivTask2').refresh();

      fix_size('photoDivTask2');
    }
  }
}

function getFocusReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/TaskFocus',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('reportFocus').clearAll();
      $$('reportFocus').parse(data.d);

      hideFields('reportFocus');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var photoID = -1;
var pathToPhoto = '';
var photoBorned = '';
var angle = 0;

function onHideButton(status) {
  if (photoID != null && photoID != -1) {

    send('SetPhotoHide', { 'ID': photoID, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);

    var list = $$('reportPhoto');

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == photoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.status = status;
      list.updateItem(item.id, item);

      item.$css = (status == 1) ? 'passive' : 'active';
      list.render();
    }
  }
}

function onCheckButton(status) {
  if (photoID != null && photoID != -1) {

    send('SetPhotoCheck', { 'ID': photoID, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);

    var list = $$('reportPhoto');

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == photoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.IsCheck = status;
      item.IsCheckName = (status == 0) ? '' : 'Да';
      list.updateItem(item.id, item);      
    }
  }
}

function onCheckRating(rating) {
  if (photoID != null && photoID != -1) {

    send('SetPhotoRating', { 'ID': photoID, 'Rating': rating, 'User': localStorage.getItem('Author') });

    var list = $$('reportPhoto');

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == photoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.Rating = rating;
      list.updateItem(item.id, item);
    }
  }
}

function getGeo() {
  if (sessionStorage.getItem('photoLat') == null) {
    webix.message({ type: "default", text: "Геокоординаты фото не определены.", expire: 1000 });

    return;
  }

  if (sessionStorage.getItem('photoLat') != 0) {
    
    $$('geoMap').show();
    $('#mapPhoto').show();

    /*if (localStorage.getItem('Phone').indexOf('+38', 0) == -1)
      mapInitPhoto();
    else*/ mapInitPhotoGoogle();

    
  }
  else webix.message({ type: "default", text: "Геокоординаты фото не определены.", expire: 1000 });
}

function getGeoVisit() {
  if (sessionStorage.getItem('photoLat') == null) {
    webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });

    return;
  }

  if (sessionStorage.getItem('photoLat') != 0) {
    $$('photoViewerPage').expand();
    $$('accPhotoReport').show();
    $$('visitGeoPage').show();
    $('#mapVisit').show();

    /*if (localStorage.getItem('Phone').indexOf('+38', 0) == -1)
      mapInitVisit();
    else*/ initVisitGoogle();
  }
  else webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });
}

// трекинг по сотруднику по дню
function getTracking() {
  $.ajax({
    url: URLname + 'Services/Report.asmx/Tracking',
    data: JSON.stringify({ 'Borned': sessionStorage.getItem('Borned'), 'User': sessionStorage.getItem('UserTrackID') }),
    success: function (data) {
      listUpdate('track', 'all', data.d);
      if ($$('track').count() != 0) {
        mapTrackingInit();

        $('#map').show();

        $$('geoMap').show();
      }
      else {
        webix.message({ type: "default", text: "Трекинг сотрудника не определен.", expire: 1000 });
        return;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });
}

function showPhotoReport(photofile, text, borned, point, photo, status, company, isCheck, description, rating) {
  if (photofile.indexOf('mp3') != -1) {
    return;
  }

  sessionStorage.setItem('PointID', point);
  sessionStorage.setItem('Borned', borned);

  $$("newTaskText").setValue("");

  template = '<div><img src="' + photofile + '" id="photofull" onclick="zoom()"/></div>';

  var container = $('div[view_id="photoDiv"]');

  //var width = container.width();
  //var height = container.height();  

  $$('photoDiv').define('template', template);
  //$$('photoDiv').define('width', width);
  //$$('photoDiv').define('height', height);
  $$('photoDiv').define('scroll', 'false');
 // $$("photoDiv").scrollTo(0, 0);
  $$('photoDiv').refresh();

  var address = sessionStorage.getItem('pointAddress');
  if (address == null) address = '';

  $$('btnPhotoLayer').define('template', borned + ' ' + address + ' ' + text + ' <b> ' + description + ' </b>');
  $$('btnPhotoLayer').refresh();

  if (point != -1) {
    //$$('btnCreateTask').show();

    pointID = point;
    photoID = photo;
    clientID = company;
    linkPhoto = photofile;

    GUID = +new Date;
    imagePhoto = null;

    pathToPhoto = URLname + photofile;
    photoBorned = "Задание по фото от " + borned;
  }

  if (photo != -1) {
    $$('btn-hide-photo').config.hidden = (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM');
    $$('btn-hide-photo').refresh();

    $$('btn-check-photo').config.hidden = (localStorage.getItem('IsPoint') == '0');
    $$('btn-check-photo').refresh();

    $$('photoRating').config.hidden = (localStorage.getItem('IsPoint') == '0');
    $$('photoRating').refresh();

    $$('photoLeft').show();
    $$('photoRight').show();
  }
  else {
    $$('btn-hide-photo').hide();
    $$('btn-check-photo').hide();
    $$('photoRating').hide();
    $$('photoLeft').hide();
    $$('photoRight').hide();
  }

  if ($$('btn-hide-photo').isVisible()) {
    if (status == -1) {
      $$('btn-hide-photo').hide();
    }
    else if (status == 0)
      $$('btn-hide-photo').setValue(0);
    else $$('btn-hide-photo').setValue(1);
  }

  angle = 0;
  //$$('createTask').hide();
  $$('photoArea').show();

  if ($$('btn-hide-photo').isVisible()) {
    if (status != null)
      $$('btn-hide-photo').setValue(status);
  }

  if ($$('btn-check-photo').isVisible()) {
    if (isCheck != null) {
      $$('btn-check-photo').setValue(isCheck);
      $$('btn-check-photo').refresh();
    }
  }

  if ($$('photoRating').isVisible()) {
    if (rating != null) {
      $$('photoRating').setValue(rating);
      $$('photoRating').refresh();
    }
  }

  fix_size();

  // сохранение информации об открытии фото
  $.ajax({
    url: URLname + 'Services/UI.asmx/SetPhotoLog',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Photo': photo }),
    success: function (data) {

    },
    error: function (xhr, ajaxOptions, thrownError) {
     // alert(xhr.responseText);
    }
    
  });
  
}

function getPlanograms() {

  var pointID = sessionStorage.getItem('PointID');
  var borned = sessionStorage.getItem('Borned');

  $.ajax({
    url: '../Services/Report.asmx/GetAdditionalPhotos',
    data: JSON.stringify({ 'Point': pointID, 'Borned': borned }),
    success: function (data) {
      var list = $$('photoAdditional');

      list.clearAll();
      list.parse(data.d, "json");

      //list.show();

      var firstid = list.getFirstId();

      var item = list.getItem(firstid);

      list.select(item.id);

      if (item == null)
        return;

      showAdditionalPhoto(item.Link, item.Borned, item.PointID, item.PhotoID, item.Description, item.CategoryName);

    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    }
  });
}

function showAdditionalPhoto(photofile, borned, point, photo, description, categoryname) {

  photo = 'photofulladd';
  elem = $$('photoDivFull');

  template2 = '<div><img src="' + photofile + '" id="photofulladd" onclick="zoomAdd() "/></div>';  //onclick="zoom()
  
  $$('photoDivFull').define('template', template2);
  $$('photoDivFull').define('scroll', 'false');
  $$('photoDivFull').refresh();

  var address = sessionStorage.getItem('pointAddress');
  if (address == null) address = '';

  $$('btnPhotoLayerFull').define('template', borned + ' ' + address + ' ' + ' <b> ' + categoryname + ' </b>' +  description );
  $$('btnPhotoLayerFull').refresh();

  $$('winPhoto').show();

  fix_sizeAdd();
}

function showNextAdditPhoto() {
  var list = $$('photoAdditional');

  var nextid = null;

  list.eachRow(
    function (row) {
      if (nextid == -1)
        nextid = row;

      if (list.isSelected(row))
        nextid = -1;

    });

  if (nextid == null) return;

  var item = list.getItem(nextid);

  if (item == null) return;

  list.select(item.id);

  showAdditionalPhoto(item.Link, item.Borned, item.PointID, item.PhotoID, item.Description, item.CategoryName);
}

function showPrevAdditPhoto() {
  var list = $$('photoAdditional');

  var flag = null;

  list.eachRow(
    function (row) {
      if (list.isSelected(row))
        flag = -1;

      if (flag != -1)
        previd = row;
    });

  if (previd == null) return;

  var item = list.getItem(previd);

  if (item == null) return;

  list.select(item.id);

  showAdditionalPhoto(item.Link, item.Borned, item.PointID, item.PhotoID, item.Description, item.CategoryName);
}

function zoomAdd(photo, elem) {
  if (photo == null)
    photo = 'photofulladd';

  if (elem == null)
    elem = $$('photoDivFull');

  var width = document.getElementById(photo).naturalWidth;
  var height = document.getElementById(photo).naturalHeight;

  var photoWidth = document.getElementById(photo).width;

  if (photoWidth != width) {
    $('img.' + photo).css('width', width).css('height', height);
    $('img.' + photo).parent().parent().css('width', width);

    elem.define('scroll', "xy");
    elem.refresh();
  }
  else
    fix_size(document.getElementById(photo), elem, true);

  $$(elem).scrollTo(0, 0);
}

function fix_sizeAdd(img, elem, getDim) {
  if (img == null)
    img = document.getElementById('photofulladd');

  if (getDim) {
    get_dim(img, elem);
    return;
  }

  img.onload = function (event) {
    event = event || window.event;
    var img = event.target || event.srcElement;
    get_dim(img, elem);
  }
}

function getMessageIntoReport(task, text, status, point, user) {
  taskID = task;
  pointID = point;
  taskUserID = user;

  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/GetMessage',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Task': taskID }),
    success: function (data) {
      $$('messageTask').clearAll();
      $$('messageTask').parse(data.d);

      $$('taskPage').expand();
    },
    error: function () {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$('navigation').hideProgress();

      $$('photoViewerTask2').collapse();
    }
  });
}

function fix_size(img, elem, getDim) {
  if (img == null)
    img = document.getElementById('photofull');

  if (getDim) {
    get_dim(img, elem);
    return;
  }

  img.onload = function (event) {
    event = event || window.event;
    var img = event.target || event.srcElement;
    get_dim(img, elem);
  }
}

function get_dim(img, elem) {
  if (elem == null)
    elem = $$('photoDiv');

  var width = elem.$width;
  var height = elem.$height;

  var iWidth = img.naturalWidth;
  var iHeight = img.naturalHeight;

  if (iHeight >= iWidth) {
    img.style.height = height + 'px';
    img.style.width = parseInt(iWidth * (height / iHeight)) + 'px';
  }
  else {
    img.style.width = width + 'px';
    img.style.height = parseInt(iHeight * (width / iWidth)) + 'px';
  }
}

function zoom(photo, elem) {
  if (photo == null)
    photo = 'photofull';

  if (elem == null)
    elem = $$('photoDiv');

  var width = document.getElementById(photo).naturalWidth;
  var height = document.getElementById(photo).naturalHeight;

  var photoWidth = document.getElementById(photo).width;

  if (photoWidth != width) {
    $('img.' + photo).css('width', width).css('height', height);
    $('img.' + photo).parent().parent().css('width', width);

    elem.define('scroll', "xy");
    elem.refresh();
  }
  else
    fix_size(document.getElementById(photo), elem, true);

  $$(elem).scrollTo(0, 0);
}

// аналитика: сводный отчет по визитам
var pivotVisitTotal = {
  view: "datatable", id: "pivotVisitTotal", select: true, resizeColumn: true, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24,
  scheme: {
    $init: function (obj) {
      if ($.isNumeric(obj.PointTotal.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.PointTotal = obj.PointTotal.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.PointVisit.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.PointVisit = obj.PointVisit.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
      if ($.isNumeric(obj.Visit.toString().replace(new RegExp(",", 'g'), "."))) {
        obj.Visit = obj.Visit.toString().replace(new RegExp(",", 'g'), ".") * 1;
      }
    }
  },
  columns: [
    { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "OutCode", header: [(isEng) ? 'OutCode' : "Код АСУ", { content: "textFilter" }], width: 100, minWidth: 30, sort: "string" },
    { id: "PointTotal", header: [(isEng) ? 'Outlets' : "ТТ в АП", { content: "textFilter" }], width: 80, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "PointVisit", header: [(isEng) ? 'Outlet visited' : "ТТ посещено", { content: "textFilter" }], width: 90, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "DaysWorked", header: [(isEng) ? 'Days worked' : "Отработано дней", { content: "textFilter" }], width: 110, minWidth: 30, sort: "int", css: { 'text-align': 'center' } },
    { id: "Visit", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], width: 70, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "DayDuration", header: [(isEng) ? 'Avg day' : "Ср. смена", { content: "textFilter" }], width: 90, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "VisitDuration", header: [(isEng) ? 'Avg visit' : "Ср. время визита", { content: "textFilter" }], width: 120, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "FreeDuration", header: [(isEng) ? 'Avg way' : "Ср. время в дороге", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "StartTime", header: [(isEng) ? 'Avg start' : "Ср. время начала", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } },
    { id: "FinishTime", header: [(isEng) ? 'Avg finish' : "Ср. время окончания", { content: "textFilter" }], width: 140, minWidth: 30, sort: "string", css: { 'text-align': 'center' } }
  ]
}



var pivotDiscipline = {
  view: "pivot-load", id: "pivotDiscipline", mode: "table", locale: { lang: "ru" }, url: "", hidden: true,
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

function getPivotDiscipline() {
  showProgress("navigation");  

  $.ajax({
    url: URLname + 'Services/Report.asmx/Route',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      pivotData = JSON.parse(data.d);

      var structurePivot = {
        rows: ["ID", "OfficeName", "CityName", "NetworkName", "Address", "CompanyName", "Percents"],
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

      var fieldPivot = [
        { id: "ID", value: "ID ТТ", type: "number", width: 50 },
        { id: "OfficeName", value: "Офис", type: "text", width: 100 },
        { id: "CityName", value: "Город", type: "text", width: 100 },
        { id: "NetworkName", value: "Сеть", type: "text", width: 90 },
        { id: "Name", value: "Вывеска", type: "text", width: 80 },
        { id: "Address", value: "Адрес", type: "text", width: 260 },
        { id: "CompanyName", value: "Компания", type: "text", width: 80 },
        { id: "Percents", value: "%", type: "number", width: 40 },
        { id: "Borned", value: "Дата", type: "text",  width: 50 },
        { id: "VisitPlan", value: "План", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
        { id: "VisitFact", value: "Факт", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
      ];

      $$("pivotDiscipline").parse(pivotData, structurePivot, fieldPivot);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
      $$("navigation").hideProgress();
    },
    complete: function () {
      $$("navigation").hideProgress();      
    }
  });
}

var pivotDisciplineUsers = {
  view: "pivot-load", id: "pivotDisciplineUsers", mode: "table", locale: { lang: "ru" }, url: "", hidden: true,
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

function getPivotDisciplineUsers() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/RouteUsers',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      pivotData = JSON.parse(data.d);

      var structurePivot = {
        rows: ["ID", "OfficeName", "CityName", "NetworkName", "Address", "CompanyName", "UserName", "Percents"],
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

      var fieldPivot = [
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
        { id: "Borned", value: "Дата", type: "text", width: 50 },
        { id: "VisitPlan", value: "План", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
        { id: "VisitFact", value: "Факт", type: "number", format: webix.Number.numToStr({ decimalSize: 0 }), width: 40 },
      ];

      $$("pivotDisciplineUsers").parse(pivotData, structurePivot, fieldPivot);
      //$$("pivotDisciplineUsers").show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var routeTotal = {
  view: "datatable", id: "routeTotal", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $change: function (item) {
      if (item.SortOrder == 0)
        item.$css = "totalRoute";
      if (item.PointID == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 90, minWidth: 90, sort: "string" },
    { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "PlanClient", header: ["По плану", { content: "textFilter" }], width: 60, minWidth: 60, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlan", header: ["По маршруту", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact", header: ["Факт", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["Выполнение %", { content: "textFilter" }], width: 76, minWidth: 76, sort: "string", css: { 'text-align': 'center' } }
  ]
}

function getRouteTotal() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/RouteTotal',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('routeTotal').clearAll();
      $$('routeTotal').parse(data.d);

      hideFields('routeTotal');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var routeError = {
  view: "datatable", id: "routeError", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 40, minWidth: 40, sort: "string" },
    /*{ id: "OutCode", header: ["Код", { content: "textFilter" }], width: 40, minWidth: 40, sort: "string" },*/
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
    /*{ id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },*/
    { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
    /*{ id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 90, minWidth: 90, sort: "string" },*/
    { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
    { id: "PlanClient", header: ["По плану", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlan", header: ["По маршруту", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Delta", header: ["Разница", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 80, sort: "string" },
  ]
}

function getRouteError() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/RouteError',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('routeError').clearAll();
      $$('routeError').parse(data.d);

      hideFields('routeError');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var reportStock = {
  view: "datatable", id: "reportStock", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 70, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "MasterName", header: ["СВ", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "UserName", header: ["МЕ", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 140, minWidth: 140, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 170, minWidth: 150, sort: "string" },
    { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "Code", header: ["Код SKU", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string" },
    { id: "InMatrix", header: ["В матрице", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "InStock", header: ["Наличие", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "Amount", header: ["Количество", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "InStockPercents", header: ["% Присутствия", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } },
    { id: "Percents", header: ["% OOS", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", css: { 'text-align': 'center' } }
  ]
}

function getReportStock() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Stock',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue()}),
    success: function (data) {
      $$('reportStock').clearAll();
      $$('reportStock').parse(data.d);

      hideFields('reportStock');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function getPivotVisitTotal() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/VisitTotal',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('pivotVisitTotal').clearAll();
      $$('pivotVisitTotal').parse(data.d);

      hideFields('pivotVisitTotal');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var reportAdditional = {
  view: "datatable", id: "reportAdditional", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24,
}

var mapMHP = {
  view: "template", content: "mapMHP", id: 'reportMapMHP'
}

function getAdditionReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Run',
    timeout: 300000,
    data: JSON.stringify({ 'Report': pageID, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue() }),
    success: function (data) {
      result = data;

      data = JSON.parse(data.d);

      var pivotContainer = document.getElementById('addReportPivot');
      pivotContainer.style.width = "auto";
      pivotContainer.style.height = document.querySelector('.webix_view .webix_multiview').offsetHeight - 90 + "px";

      $$('rowPager').hide();

      if (pageName == 'addMagnitReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addMagnitReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addMagnitReport", select: true, resizeColumn: true, fixedRowHeight: false, pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Borned", header: ["Дата посещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Филиал", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "PointName", header: ["ММ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "PointCode", header: ["КодММ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "UserName", header: ["Мерчендайзер", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string" },
            { id: "ArtCode", header: ["КодТовара", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "ArtName", header: ["НазваниеТовара", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "IsOSAName", header: ["Товар присутствует на полке (OSA Магнит)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "IsStockName", header: ["Риск виртуального стока", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "OSAFact", header: ["Корректность OSA (факт)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "VirtAnswer", header: ["Обнаруженный виртуальный сток, шт", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "IsEmpty", header: ["Товар полностью отсутствует в магазине", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "What", header: ["Причина", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Stock", header: ["Остаток", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "VirtAnswer1", header: ["ТСД", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "StockAnswer", header: ["Факт", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
          ],
          data: data
        }).show();
      }
            
      if (pageName == 'addColaVisitsReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addColaVisitsReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addColaVisitsReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "RowNumber", header: [(isEng) ? '№ п/п' : "№ п/п", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Region", header: [(isEng) ? 'Region' : "Region", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Office", header: [(isEng) ? 'Commercial Territory' : "Commercial Territory", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NumSVMR", header: [(isEng) ? 'Номер SVMR Shared' : "Номер SVMR Shared", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NumSAP", header: [(isEng) ? 'SAP номер клиента' : "SAP номер клиента", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PointID", header: [(isEng) ? 'id ТТ' : "id ТТ", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Network", header: [(isEng) ? 'Клиент (название сети)' : "Клиент (название сети)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CPL", header: [(isEng) ? 'CPL' : "CPL", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "TypeCPL", header: [(isEng) ? 'TYPE OF CPL' : "TYPE OF CPL", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "City", header: [(isEng) ? 'Город' : "Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: [(isEng) ? 'Адрес клиента' : "Адрес клиента", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CostHour", header: [(isEng) ? 'Cтоимость часа (60мин.) оказания услуг без НДС' : "Cтоимость часа (60мин.) оказания услуг без НДС", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CostHourNDS", header: [(isEng) ? 'Cтоимость часа (60мин.) оказания услуг с НДС' : "Cтоимость часа (60мин.) оказания услуг с НДС", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Timing", header: [(isEng) ? 'Тайминг' : "Тайминг", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CostVisit", header: [(isEng) ? 'Стоимость визита с НДС' : "Стоимость визита с НДС", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            // план
            { id: "PlanDay1", header: [(isEng) ? 'пн' : "пн", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay2", header: [(isEng) ? 'вт' : "вт", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay3", header: [(isEng) ? 'ср' : "ср", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay4", header: [(isEng) ? 'чт' : "чт", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay5", header: [(isEng) ? 'пт' : "пт", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay6", header: [(isEng) ? 'сб' : "сб", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PlanDay7", header: [(isEng) ? 'вс' : "вс", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "TotalPlans", header: [(isEng) ? 'Итого визитов в неделю' : "Итого визитов в неделю", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "PointStatus", header: [(isEng) ? 'Статус' : "Статус", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PointStartDate", header: [(isEng) ? 'Дата запуска' : "Дата запуска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PointFinishDate", header: [(isEng) ? 'Дата снятия с обслуживания' : "Дата снятия с обслуживания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            //факт
            { id: "Week1Day1", header: [(isEng) ? 'пн1' : "пн1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day2", header: [(isEng) ? 'вт1' : "вт1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day3", header: [(isEng) ? 'ср1' : "ср1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day4", header: [(isEng) ? 'чт1' : "чт1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day5", header: [(isEng) ? 'пт1' : "пт1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day6", header: [(isEng) ? 'сб1' : "сб1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week1Day7", header: [(isEng) ? 'вс1' : "вс1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "VisitsTotalWeek1", header: [(isEng) ? 'Total with VAT1' : "Total with VAT1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CommentCCHWeek1", header: [(isEng) ? 'Comment CCH1' : "Comment CCH1", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CommentAgencyWeek1", header: [(isEng) ? 'Comment agency1' : "Comment agency1", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            { id: "Week2Day1", header: [(isEng) ? 'пн2' : "пн2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day2", header: [(isEng) ? 'вт2' : "вт2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day3", header: [(isEng) ? 'ср2' : "ср2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day4", header: [(isEng) ? 'чт2' : "чт2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day5", header: [(isEng) ? 'пт2' : "пт2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day6", header: [(isEng) ? 'сб2' : "сб2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week2Day7", header: [(isEng) ? 'вс2' : "вс2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "VisitsTotalWeek2", header: [(isEng) ? 'Total with VAT2' : "Total with VAT2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CommentCCHWeek2", header: [(isEng) ? 'Comment CCH2' : "Comment CCH2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CommentAgencyWeek2", header: [(isEng) ? 'Comment agency2' : "Comment agency2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            { id: "Week3Day1", header: [(isEng) ? 'пн3' : "пн3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day2", header: [(isEng) ? 'вт3' : "вт3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day3", header: [(isEng) ? 'ср3' : "ср3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day4", header: [(isEng) ? 'чт3' : "чт3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day5", header: [(isEng) ? 'пт3' : "пт3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day6", header: [(isEng) ? 'сб3' : "сб3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week3Day7", header: [(isEng) ? 'вс3' : "вс3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "VisitsTotalWeek3", header: [(isEng) ? 'Total with VAT3' : "Total with VAT3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CommentCCHWeek3", header: [(isEng) ? 'Comment CCH3' : "Comment CCH3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CommentAgencyWeek3", header: [(isEng) ? 'Comment agency3' : "Comment agency3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            { id: "Week4Day1", header: [(isEng) ? 'пн4' : "пн4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day2", header: [(isEng) ? 'вт4' : "вт4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day3", header: [(isEng) ? 'ср4' : "ср4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day4", header: [(isEng) ? 'чт4' : "чт4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day5", header: [(isEng) ? 'пт4' : "пт4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day6", header: [(isEng) ? 'сб4' : "сб4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week4Day7", header: [(isEng) ? 'вс4' : "вс4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "VisitsTotalWeek4", header: [(isEng) ? 'Total with VAT4' : "Total with VAT4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CommentCCHWeek4", header: [(isEng) ? 'Comment CCH4' : "Comment CCH4", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CommentAgencyWeek4", header: [(isEng) ? 'Comment agency4' : "Comment agency4", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            { id: "Week5Day1", header: [(isEng) ? 'пн5' : "пн5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day2", header: [(isEng) ? 'вт5' : "вт5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day3", header: [(isEng) ? 'ср5' : "ср5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day4", header: [(isEng) ? 'чт5' : "чт5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day5", header: [(isEng) ? 'пт5' : "пт5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day6", header: [(isEng) ? 'сб5' : "сб5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Week5Day7", header: [(isEng) ? 'вс5' : "вс5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "VisitsTotalWeek5", header: [(isEng) ? 'Total with VAT5' : "Total with VAT5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "CommentCCHWeek5", header: [(isEng) ? 'Comment CCH5' : "Comment CCH5", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CommentAgencyWeek5", header: [(isEng) ? 'Comment agency5' : "Comment agency5", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },

            { id: "VisitsTotalMonth", header: [(isEng) ? 'Фактическое кол-во визитов в месяц' : "Фактическое кол-во визитов в месяц", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CostTotalMonth", header: [(isEng) ? 'Стоимость за месяц с НДС' : "Comment agency", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CostTotalMonthNDS", header: [(isEng) ? 'Стоимость за месяц без НДС' : "Стоимость за месяц без НДС", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
          ],
          data: data
        }).show();
      }

      if (pageName == 'addLindtPromoReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addLindtPromoReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addLindtPromoReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "ActionID", header: [(isEng) ? 'Promo ID' : "Promo ID", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "OutPointID", header: [(isEng) ? 'Код ТТ ЛТ' : "Код ТТ ЛТ", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
            { id: "Identifier", header: [(isEng) ? 'Идентификатор' : "Идентификатор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "TypeKA", header: [(isEng) ? 'NKA / LKA' : "NKA / LKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Division", header: [(isEng) ? 'Дивизион' : "Дивизион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "RegionName", header: [(isEng) ? 'Регион' : "Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: [(isEng) ? 'Город' : "Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NetworkName", header: [(isEng) ? 'Сеть' : "Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PointCode", header: [(isEng) ? 'Номер ТТ' : "Номер ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: [(isEng) ? 'Address' : "Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CoreType", header: [(isEng) ? 'Core/Non-core' : "Core/Non-core", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "WhoseDelivery", header: [(isEng) ? 'Чьими силами доставка' : "Чьими силами доставка", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "WhoseSetup", header: [(isEng) ? 'Чьими силами установка' : "Чьими силами установка", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "WhoseLayout", header: [(isEng) ? 'Чьими силами выкладка продукта' : "Чьими силами выкладка продукта", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "AgreementLevel", header: [(isEng) ? 'Level of agreement' : "Level of agreement", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "TypeDMP", header: [(isEng) ? 'Тип ДМП' : "Тип ДМП", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "DisplayType", header: [(isEng) ? 'Display Type 2' : "Display Type 2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Branded", header: [(isEng) ? 'Branded/Non-Branded' : "Branded/Non-Branded", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "BrandName", header: [(isEng) ? 'Бренд' : "Бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Start", header: [(isEng) ? 'Начало периода' : "Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Finish", header: [(isEng) ? 'Конец периода' : "Конец периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Comment", header: [(isEng) ? 'Комментарии от ТП Линдт' : "Комментарии от ТП Линдт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Plann", header: [(isEng) ? 'План установки' : "План установки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Fact", header: [(isEng) ? 'Факт установки' : "Факт установки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "AnswerDate", header: [(isEng) ? 'Дата ответа' : "Дата ответа", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Primarys", header: [(isEng) ? 'Primary/ Repeated placement' : "Primary/ Repeated placement", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "TopCity", header: [(isEng) ? 'Top-city' : "Top-city", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityPriority", header: [(isEng) ? 'City Priority' : "City Priority", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Month", header: [(isEng) ? 'Месяц зачета' : "Месяц зачета", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Mouthpiece ", header: [(isEng) ? 'Терция' : "Терция", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "HalfYear", header: [(isEng) ? 'Полугодие' : "Полугодие", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "FullYear", header: [(isEng) ? 'Год' : "Год", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PhotoLink", header: [(isEng) ? 'Ссылка на фото' : "Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
          ],
          data: data
        }).show();
      }

      //Global Functional Drinks "Отчет по заполнению анкет"
      if (pageName == 'addGfdReportFillingActions') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addGfdReportFillingAction');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addGfdReportFillingActions", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "UserID", header: ["ID МЕ", { content: "textFilter" }], width: 80, minWidth: 80, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["Мерчендайзер", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "MasterUserName", header: ["Супервайзер", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "OfficeName", header: ["Рег.офис", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "RegionName", header: ["Область", { content: "textFilter" }], width: 70, sort: "string" },
            { id: "AreaName", header: ["Район", { content: "textFilter" }], width: 70, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
            { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Extra1", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
            { id: "Extra2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
            { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "EAN", header: ["EAN", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "CategoryName", header: ["Группа", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "", header: ["Суббренд", { content: "textFilter" }], width: 90, sort: "string" },
            { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "", header: ["Вариант товара", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "", header: ["Размер упаковки", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "", header: ["Доп.признак", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "NameSKU", header: ["SKU", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "Borned", header: ["Период анкеты\ Вопрос", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Borned", header: ["Дата заполнения анкеты", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9495", header: ["Количество фейсов на ОМП", { content: "textFilter" }], width: 100, minWidth: 80, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PhotoAnswer9496", header: ["Фото ТСД/прайс-чекера при фиксации OOS и Вирт. остатка", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer9497", header: ["Причина OOS для GFD", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "OutCodeAP", header: ["ID Клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } }
          ],
          data: data
        }).show();
      }

      //Global Functional Drinks "График"
      if (pageName == 'addGfdReportRoute') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addGfdReportRoute');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addGfdReportRoute", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
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
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
            { id: "", header: ["Нас. пункт", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
            { id: "Extra1", header: ["Код ТТ", { content: "textFilter" }], width: 80, sort: "string" },
            { id: "Extra2", header: ["Код ТС", { content: "textFilter" }], width: 80, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес Торговой Точки", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "UserNameTM", header: ["ТМ", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "PhoneTM", header: ["Телефон ТМ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string"},
            { id: "EmailTM", header: ["Email ТМ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string"},
            { id: "UserNameSV", header: ["Супервайзер", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "PhoneSV", header: ["Телефон СВ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
            { id: "EmailSV", header: ["Email СВ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
            { id: "UserNameME", header: ["Мерчандайзер", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "PhoneME", header: ["Телефон МЕ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
            { id: "EmailME", header: ["Email МЕ", { content: "textFilter" }], width: 130, minWidth: 80, sort: "string" },
            { id: "Day1", header: ["Пн", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day2", header: ["Вт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day3", header: ["Ср", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day4", header: ["Чт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day5", header: ["Пт", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day6", header: ["Сб", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "Day7", header: ["Вс", { content: "textFilter" }], width: 90, minWidth: 80, sort: "string", css: { 'text-align': 'center' }},
            { id: "OutCode", header: ["ID Клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "data", css: { 'text-align': 'center' } }
          ],
          data: data
        }).show();
      }

      //KTNG "Отчет по представленности"
      if (pageName == 'addKtngAvailabilityReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addKtngAvailabilityReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addKtngAvailabilityReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          scheme: {
            $change: function (item) {
              if (item.PlaceType == 'Допуск к работе')
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "Borned", header: [{ text: "Visit info", colspan: 3 }, "Visit Date", { content: "textFilter" } ], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "VisitStart", header: [{ text: "Visit info", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "VisitFinish", header: [{ text: "Visit info", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "UserName", header: [{ text: "Merch info" }, "Name", { content: "textFilter" }], sort: "string", width: 150 },
            { id: "OutCode", header: [{ text: "Store info", colspan: 5 }, "POS Code", { content: "textFilter" }], sort: "string", width: 100 },
            { id: "NetworkName", header: [{ text: "Store info", colspan: 5 }, "Chain", { content: "textFilter" }], sort: "string", width: 110 },
            { id: "CityName", header: [{ text: "Store info", colspan: 5 }, "City", { content: "textFilter" }], sort: "string", adjust: "header" },
            { id: "Address", header: [{ text: "Store info", colspan: 5 }, "Address", { content: "textFilter" }], sort: "string", width: 250 },
            { id: "PlaceType", header: [{ text: "Store info", colspan: 5 }, "Type", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "Admittance", header: [{ text: "Допуск к работе", colspan: 2 }, "Допущен", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "string", width: 70 },
            { id: "Comments", header: [{ text: "Допуск к работе", colspan: 2 }, "Комментарии", { content: "textFilter" }], sort: "string", width: 100 },
            { id: "Total", header: [{ text: "Total", colspan: 3 }, "Total", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "StartTotal", header: [{ text: "Total", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndTotal", header: [{ text: "Total", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "StartSKU1", header: [{ text: "ESSE Blue", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU1", header: [{ text: "ESSE Blue", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU1", header: [{ text: "ESSE Blue", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU2", header: [{ text: "ESSE Exchange", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU2", header: [{ text: "ESSE Exchange", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU2", header: [{ text: "ESSE Exchange", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU3", header: [{ text: "ESSE One", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU3", header: [{ text: "ESSE One", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU3", header: [{ text: "ESSE One", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU4", header: [{ text: "ESSE Menthol", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU4", header: [{ text: "ESSE Menthol", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU4", header: [{ text: "ESSE Menthol", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU5", header: [{ text: "ESSE Special Gold", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU5", header: [{ text: "ESSE Special Gold", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU5", header: [{ text: "ESSE Special Gold", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU6", header: [{ text: "ESSE Exchange Mango", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU6", header: [{ text: "ESSE Exchange Mango", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU6", header: [{ text: "ESSE Exchange Mango", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "StartSKU7", header: [{ text: "Blooming Blue", colspan: 3 }, "Start", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "EndSKU7", header: [{ text: "Blooming Blue", colspan: 3 }, "End", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", width: 60 },
            { id: "OOSSKU7", header: [{ text: "Blooming Blue", colspan: 3 }, "OOS Reason", { content: "textFilter" }], sort: "string", width: 200 },
            { id: "PhotoStart", header: [{ text: "Results", colspan: 4 }, "Photo Start", { content: "textFilter" }], sort: "string", adjust: "header" },
            { id: "PhotoEnd", header: [{ text: "Results", colspan: 4 }, "Photo End", { content: "textFilter" }], sort: "string", adjust: "header" },
            { id: "PhotoEnd2", header: [{ text: "Results", colspan: 4 }, "Photo End2", { content: "textFilter" }], sort: "string", adjust: "header" },
            { id: "PhotoEnd3", header: [{ text: "Results", colspan: 4 }, "Photo End3", { content: "textFilter" }], sort: "string", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //Перекресток "Сводный"
      if (pageName == 'addPerecrestokSummaryReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addPerecrestokSummaryReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addPerecrestokSummaryReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "PointOutCode", header: ["Код ТТ", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
            { id: "WeekNumber", header: ["Неделя", { content: "textFilter" }], width: 70,sort: "int", css: { 'text-align': 'center' } },
            { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string",  css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "FormatName", header: ["Формат", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 300, sort: "string" },
            { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "header" },
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "CompanyName", header: ["Компания", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ActionType", header: ["Тип анкеты", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ActionName", header: ["Наименование анкеты", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "CategoryName", header: ["Группа", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "ArtName", header: ["Наименование оборудования", { content: "textFilter" }], width: 250, sort: "string"},
            { id: "ArtOutCode", header: ["Код скю", { content: "textFilter" }], width: 100, minWidth: 80, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9610", header: ["Наличие оборудования", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9611", header: ["Причина отсутствия", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer9622", header: ["Когда установлено", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Photo9612", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" }
          ],
          data: data
        }).show();
      }

      //Перекресток "Мониторинг оборудования"
      if (pageName == 'addPerecrestokMonitoringEquipment') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addPerecrestokMonitoringEquipment');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addPerecrestokMonitoringEquipment", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Дивизион", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string"},
            { id: "PointOutCode", header: ["sap номер СМ", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 300, sort: "string" },
            { id: "ArtID", header: ["ID sku", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["Вид оборудования", { content: "textFilter" }], width: 250, minWidth: 80, sort: "string" },
            { id: "Available", header: ["Наличие в СМ", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer1", header: ["Гендерные праздники", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo1", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer2", header: ["Витрины/фасад", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo2", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer3", header: ["Входная группа", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo3", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer4", header: ["Торговый зал", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo4", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer5", header: ["Прилавочная зона", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo5", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer6", header: ["Кассовая зона", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo6", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer7", header: ["Зона кафе/кофе поинт", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo7", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //Перекресток "Замер антикражн.рамок"
      if (pageName == 'addPerecrestokMeasuringAntiTheft') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addPerecrestokMeasuringAntiTheft');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addPerecrestokMeasuringAntiTheft", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Дивизион", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string"},
            { id: "PointOutCode", header: ["sap номер СМ", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 300, sort: "string" },
            { id: "ArtName", header: ["Вид оборудования", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "Answer9764", header: ["Наличие в СМ", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9612", header: ["Кол-во в СМ", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9761", header: ["Ширина", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9763", header: ["Глубина", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9762", header: ["Высота", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //Перекресток "Мониторинг зон"
      if (pageName == 'addPerecrestokMeasuringZones') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addPerecrestokMeasuringZones');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addPerecrestokMeasuringZones", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Borned", header: ["Дата визита", '', { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "PointID", header: ["ID ТТ", '', { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Дивизион", '', { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "PointOutCode", header: ["sap номер СМ", '', { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' }, adjust: "header" },
            { id: "Address", header: ["Адрес", '',{ content: "textFilter" }], width: 300, sort: "string" },
            { id: "SKU142005", header: [{ text: "Вход", colspan: 3 }, "витрины (общий вид)", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142007", header: [{ text: "Вход", colspan: 3 }, "тамбур (междверное пространство)", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142006", header: [{ text: "Вход", colspan: 3 }, "входная зона до касс", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142025", header: [{ text: "Оформление Торцов (топер, боковины)" }, "фото всех имеющихся торцов", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142024", header: [{ text: "Прилавочная зона" }, "общее фото с разных сторон", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142020", header: [{ text: "Кафе и/или кофе поинт", colspan: 4 }, "общее фото ", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142022", header: [{ text: "Кафе и/или кофе поинт", colspan: 4 }, "фото прилавка", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142021", header: [{ text: "Кафе и/или кофе поинт", colspan: 4 }, "фото витрины", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142023", header: [{ text: "Кафе и/или кофе поинт", colspan: 4 }, "посадочная зона", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142009", header: [{ text: "Зона ФрОв", colspan: 4 }, "пристенные холодильники", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142008", header: [{ text: "Зона ФрОв", colspan: 4 }, "общий вид", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142010", header: [{ text: "Зона ФрОв", colspan: 4 }, "холодильник для ягод", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142011", header: [{ text: "Зона ФрОв", colspan: 4 }, "сухая выкладка", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142013", header: [{ text: "Кассовая зона ", colspan: 7 }, "клик рама А3", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142014", header: [{ text: "Кассовая зона ", colspan: 7 }, "наклейка на кассовый экран", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142015", header: [{ text: "Кассовая зона ", colspan: 7 }, "табачный диспенсер", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142016", header: [{ text: "Кассовая зона ", colspan: 7 }, "плакат А4 (спроси кассира)", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142018", header: [{ text: "Кассовая зона ", colspan: 7 }, "монетница", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142017", header: [{ text: "Кассовая зона ", colspan: 7 }, "разделитель", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "SKU142019", header: [{ text: "Кассовая зона ", colspan: 7 }, "общий вид", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //KTNG "By each chain"
      if (pageName == 'addKtngReportNetwork') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addKtngReportNetwork');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addKtngReportNetwork", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          scheme: {
            $change: function (item) {
              if (item.Network == 'Total')
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "Network", header: ["Chain", '', { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "VisitsAll", header: ["Visit", 'Call #', { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Visits", header: ["Effective", 'Call #', { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "VisitsBefore", header: [{ text: "OOS POS #", colspan: 3 }, "Before visit", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "VisitsAfter", header: [{ text: "OOS POS #", colspan: 3 }, "After visit", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "Result", header: [{ text: "OOS POS #", colspan: 3 }, "Result", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "Packs", header: ["Stock supplied", 'Packs', { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //KTNG "By each SKU"
      if (pageName == 'addKtngReportSKU') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addKtngReportSKU');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addKtngReportSKU", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          scheme: {
            $change: function (item) {
              if (item.ArtName == 'Total')
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "ArtName", header: ["SKU", '', { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
            { id: "VisitsAll", header: ["Visit", 'Call #', { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Visits", header: ["Effective", 'Call #', { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "VisitsBefore", header: [{ text: "OOS POS #", colspan: 3 }, "Before visit", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "VisitsAfter", header: [{ text: "OOS POS #", colspan: 3 }, "After visit", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "Result", header: [{ text: "OOS POS #", colspan: 3 }, "Result", { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
            { id: "Packs", header: ["Stock supplied", 'Packs', { content: "textFilter" }], css: { 'text-align': 'center' }, sort: "int", adjust: "header" },
          ],
          data: data
        }).show();
      }

      //KTNG "For each performer" (Отчет по сотруднику)
      if (pageName == 'addKtngEmployeeReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addKtngEmployeeReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addKtngEmployeeReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "UserName", header: ['', 'Name', { content: "textFilter" }], width: 300, minWidth: 80, sort: "string" },
            { id: "VisitsTotal", header: [{ text: "Visits", colspan: 2 }, "Total", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "VisitsEffective", header: [{ text: "Visits", colspan: 2 }, "Effective", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Dixy", header: [{ text: "Packs placed", colspan: 9 }, "Dixy", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Pyaterochka", header: [{ text: "Packs placed", colspan: 9 }, "Pyaterochka", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Magnit", header: [{ text: "Packs placed", colspan: 9 }, "Magnit", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Verny", header: [{ text: "Packs placed", colspan: 9 }, "Verny", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Perekrestok", header: [{ text: "Packs placed", colspan: 9 }, "Perekrestok", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "EuroSpar", header: [{ text: "Packs placed", colspan: 9 }, "EuroSpar", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Bristol", header: [{ text: "Packs placed", colspan: 9 }, "Bristol", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "AzbukaVkusa", header: [{ text: "Packs placed", colspan: 9 }, "Azbuka Vkusa", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
            { id: "Miratorg", header: [{ text: "Packs placed", colspan: 9 }, "Miratorg", { content: "textFilter" }], sort: "int", adjust: "header", css: { 'text-align': 'center' }, },
          ],
          data: data
        }).show();
      }

      //Traditional trade  "Аудит-Традиционный канал"
      if (pageName == 'addTradeReportAudit') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addTradeReportAudit');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addTradeReportAudit", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", editable: true, rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Extra2", header: [{ text:"Ответственный РСМ", css:"multiline" }, { content: "textFilter" }], width: 110, minWidth: 80, sort: "string" },
            { id: "Extra3", header: [{ text: "Дистрибьютор на территории", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "Name", header: [{ text: "Название торговой точки", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 80, sort: "string" },
            { id: "Address", header: [{ text: "Адрес торговой точки", css: "multiline" }, { content: "textFilter" }], width: 300, sort: "string" },
            { id: "OutCode", header: ["ID Cislink", { content: "textFilter" }], width: 100, minWidth: 80, sort: "int", adjust: "header" },
            { id: "Borned", header: [{ text: "Дата отчета", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10528", header: [{ text: "Конфеты Мерси", height: 120, rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10534", header: [{ text: "Раффаэло", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10529", header: [{ text: "Тоффифе", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10535", header: [{ text: "Коркунов",rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10530", header: [{ text: "Мамба", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10536", header: [{ text: "Фрутелла", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10531", header: [{ text: "Фрумеладки", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10537", header: [{ text: "Бон Пари", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10532", header: [{ text: "Мерси плитка", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10538", header: [{ text: "Риттер Спорт", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10533", header: [{ text: "Вертерс", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10539", header: [{ text: "Меллер", rotate: true }, { content: "textFilter" }], width: 25, minWidth: 10, sort: "int", css: { 'text-align': 'center' } },
            { id: "Photo10508", header: ["Фото (касса)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Photo10507", header: ["Фото (полка)", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header" },
            { id: "Answer10543", header: ["Задача по точке", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", adjust: "header", editor: "text" },
            { id: "DistributorDate", header: [{ text: "Дата передачи на дистрибьютора", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 80, sort: "string", editor: "date", css: { 'text-align': 'center' } },
            { id: "IsCheck", header: [{ text: "Отметка о выполнении задачи", css: "multiline" }, { content: "textFilter" }], width: 135, minWidth: 80, sort: "string", editor: "select", css: { 'text-align': 'center' }, options: ['','Да','Нет'] },
            { id: "CheckDate", header: [{ text: "Дата отметки о выполнении", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "Comment", header: [{ text: "Комментарий при невыполнении более месяца", css: "multiline" }, { content: "textFilter" }], width: 200, minWidth: 80, sort: "string", editor: "text" },
            { id: "CheckingUser", header: [{ text: "Последняя редакция", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 80, sort: "string" },
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addTradeReportAudit").getItem(editor.row);
              //сохранение ответа на вопрос 10543
              if (state.value != state.old && editor.column == 'Answer10543') {
                $$('addTradeReportAudit').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 103949, 'Art': -1, 'Question': 10543, 'Option': -1, 'Answer': state.value }),
                  success: function (data) {
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    onError();
                  }
                });
              }
              //сохранение доп ответов отчета
              if (state.value != state.old && editor.column != 'Answer10543') {
                if (editor.column == 'DistributorDate') {
                  state.value = webix.i18n.parseFormatStr(state.value);
                  item.DistributorDate = state.value;
                  var QuestionID = 1
                }

                if (editor.column == 'IsCheck') {
                  var QuestionID = 2
                  item.CheckingUser = (state.value != '') ? localStorage.getItem('UserName') : '';
                  item.CheckDate = (state.value != '') ? 'Сегодня' : '';
                }

                if (editor.column == 'Comment') {
                  var QuestionID = 3
                }

                $$('addTradeReportAudit').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetReportAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 103949, 'Art': null, 'Question': QuestionID, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': addReportID, 'Author': localStorage.getItem('Author') }),
                  success: function (data) {},
                  error: function (xhr, ajaxOptions, thrownError) {onError();}
                });
              }
            }
          },
          data: data
        }).show();
      }

      //Traditional trade  "Аудит-Для распечатки"
      if (pageName == 'addTradeReportAuditForm1') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addTradeReportAuditForm1');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addTradeReportAuditForm1", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table_border", pager: "pagerReport", editable: true, rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Name", header: [{ content: "textFilter" }, { text: "Название", rotate: true }], width: 100,  sort: "string" },
            { id: "Address", header: [{ content: "textFilter" }, { text: "Адрес", rotate: true }], width: 250, sort: "string" },
            { id: "Borned", header: [{ content: "textFilter" }, { text: "Дата", rotate: true }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10528", header: [{ content: "textFilter" }, { text: "Конфеты<br>Мерси", rotate: true }], width: 40,  sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10534", header: [{ content: "textFilter" }, { text: "Раффаэло", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10529", header: [{ content: "textFilter" }, { text: "Тоффифе", rotate: true }], width: 25,  sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10535", header: [{ content: "textFilter" }, { text: "Коркунов", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10530", header: [{ content: "textFilter" }, { text: "Мамба", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10536", header: [{ content: "textFilter" }, { text: "Фрутелла", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10531", header: [{ content: "textFilter" }, { text: "Фрумеладки", height: 100, rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10537", header: [{ content: "textFilter" }, { text: "БонПари", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10532", header: [{ content: "textFilter" }, { text: "Мерси<br>Плитка", rotate: true }], width: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10538", header: [{ content: "textFilter" }, { text: "Риттер<br>Спорт", rotate: true }], width: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10533", header: [{ content: "textFilter" }, { text: "Вертерс", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10539", header: [{ content: "textFilter" }, { text: "Меллер", rotate: true }], width: 25, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10543", header: [{ content: "textFilter" }, { text: "Задача", rotate: true }], width: 100, sort: "string" },
          ],
          data: data
        }).show();
      }


      //Traditional trade  "Аудит-Для рассылки"
      if (pageName == 'addTradeReportAuditForm2') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addTradeReportAuditForm2');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addTradeReportAuditForm2", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "Name", header: [{ text: "Название", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 80, sort: "string" },
            { id: "Address", header: [{ text: "Адрес", css: "multiline" }, { content: "textFilter" }], width: 300, sort: "string" },
            { id: "Borned", header: [{ text: "Дата", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10528", header: [{ text: "Конфеты Мерси" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10534", header: [{ text: "Раффаэло" }, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10529", header: [{ text: "Тоффифе"}, { content: "textFilter" }], width: 25, minWidth: 10, adjust: "header", sort: "int", css: { 'text-align': 'center' } },
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
          ],
          data: data
        }).show();
      }

      //KTNG LT "Visits detailed"
      if (pageName == 'addKtngVisitsDetailed') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addKtngVisitsDetailed');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addKtngVisitsDetailed", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
            columns: [
            { id: "Borned", header: ["",{ text: "Дата визита", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "WeekNum", header: ["",{ text: "Номер недели", css: "multiline" }, { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "VisitID", header: ["","№ визита", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "UserName", header: ["","№ Маршрут", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "PointCode", header: ["","Код точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "Address", header: ["","Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["","Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["","Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "VisitLink", header: ["",{ text: "Ссылка на визит", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'color': 'blue' } },
            { id: "Answer11000", header: ["","Статус точки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "Answer11001", header: ["","Статус визита", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string" },
            { id: "", header: ["",{ text: "Эффективность визита", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
            { id: "Answer10581", header: ["",{ text: "Комментарий по ситуации в ТТ", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "string" },
            { id: "", header: ["",{ text: "Эффективность визита", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "", header: ["",{ text: "Качество фото", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "", header: ["",{ text: "Качество отчетности", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "", header: ["","Коммент", { content: "textFilter" }], width: 75, minWidth: 40, sort: "string" },
            { id: "", header: ["",{ text: "Развернутый коммент", css: "multiline" }, { content: "textFilter" }],width: 90, minWidth: 40, sort: "string" },
            { id: "", header: ["",{ text: "Дата проверки", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10559", header: ["",{ text: "Есть ли в ТТ оборудование оверхед?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10560", header: ["",{ text: "Сколько всего оверхедов в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10557", header: ["",{ text: "Есть ли в ТТ оборудование Shop & Shop?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10558", header: ["",{ text: "Сколько всего Shop & Shop в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer10561", header: ["",{ text: "Есть ли в ТТ оборудование Напольный диспенсер?", css: "multiline_min" }, { content: "textFilter" }],width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10562", header: ["",{ text: "Сколько всего напольных диспенсеров в ТТ?", css: "multiline_min" }, { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer11085", header: ["",{ text: "Соблюдение планограммы", css: "multiline" }, { content: "textFilter" }], width: 95, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer11084", header: ["",{ text: "Размещение стикеров", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer11086", header: ["",{ text: "Статус данных (из опросника Мониторинг скю по тсд)", css: "multiline_min" }, { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
            { id: "StockAll", header: ["",{ text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockEntr", header: ["",{ text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockExit", header: ["",{ text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockRes", header: ["",{ text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockEntrProc", header: ["",{ text: "% стока в местах продаж на входе в тт", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockExitProc", header: ["",{ text: "% стока в местах продаж на выходе из тт", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockVisitProc", header: ["",{ text: "% вынесенного стока на визите", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "IsRefil", header: ["",{ text: "Пополнение было?", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockZero", header: ["",{ text: "Сток_ТСД больше нуля", css: "multiline" }, { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockStatus", header: ["",{ text: "Сток_ТСД больше чем Сток на выходе", css: "multiline_min" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "StockSku1",     header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток ТСД", css: "multiline" }, { content: "textFilter" }], width: 40, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "StockEntrSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток на входе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StockExitSku1", header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Сток на выходе", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "StatusSku1",    header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Статус наличия", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ActSku1",       header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Действия с товарным запасом", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string" },
            { id: "ResSku1",       header: [{ text: "ESSE Exchange", colspan: 6 }, { text: "Итого пополнено", css: "multiline" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

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

            { header: ["","План Кол-во SKU", { content: "textFilter" }], width: 20 },
            { header: ["","Факт Кол-во SKU ТСД", { content: "textFilter" }], width: 20 },
            { header: ["","Разница (сколько SKU не хватает ТСД)", { content: "textFilter" }], width: 20 },
            { header: ["","% ООS по ТСД", { content: "textFilter" }], width: 20 },
            { header: ["","Факт Кол-во SKU на входе", { content: "textFilter" }], width: 20 },
            { header: ["","Разница (сколько SKU не хватает на входе)", { content: "textFilter" }], width: 20 },
            { header: ["","% ООS на входе", { content: "textFilter" }], width: 20 },
            { header: ["","Факт Кол-во SKU на выходе", { content: "textFilter" }], width: 20 },
            { header: ["","Разница (сколько SKU не хватает на выходе)", { content: "textFilter" }], width: 20 },
            { header: ["","% ООS на выходе", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING SILVER", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE SS BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE SS EXCHANGE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE inSecret", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE MENTHOL", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE ONE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE PRESSO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Summer POP", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Silver", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING SILVER", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE inSecret", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE MENTHOL", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE ONE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE PRESSO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Summer POP", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Silver", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","BLOOMING SILVER", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE BLUE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE MANGO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE EXCHANGE W", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE GOLDEN LEAF", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE inSecret", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE MENTHOL", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE ONE", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE PRESSO", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE SPECIAL GOLD", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Sense Himalaya Demi", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Summer POP", { content: "textFilter" }], width: 20 },
            { header: ["","ESSE Silver", { content: "textFilter" }], width: 20 },
            { header: ["","План Кол-во SKU", { content: "textFilter" }], width: 20 },
            { header: ["","Факт Кол-во SKU на входе", { content: "textFilter" }], width: 20 },
            { header: ["","Факт Кол-во SKU на выходе", { content: "textFilter" }], width: 20 },
            { header: ["","ГМ или ММ", { content: "textFilter" }], width: 20 },
            { header: ["","РЦ ММ", { content: "textFilter" }], width: 20 },
          ],
          on: {
            //действия при клике на строку в столбце Задание
            onItemClick: function (id) {
              //переход в отчет визиты
              if (id.column == 'VisitLink') {
                var item = this.getItem(id);
                //сброс текущего фильтра тт/сотрудник
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Users", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                //выбор тт/сотрудника в фильтре
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': item.PointID }),
                  success: function (data) {
                      setFilterChange();
                      getSetting();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Users", 'User': localStorage.getItem('Author'), 'Text': item.UserID }),
                  success: function (data) {
                      setFilterChange();
                      getSetting();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });
                //переход в отчет Визиты
                showProgress("navigation");
                $.ajax({
                  url: URLname + 'Services/Report.asmx/Visit',
                  timeout: 300000,
                  data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Lang': localStorage.getItem('Lang') }),
                  success: function (data) {
                    $$('reportVisit').clearAll();
                    $$('reportVisit').parse(data.d);

                    hideFields('reportVisit');
                    $$("reportVisit").hideProgress();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
                  },
                  complete: function () {
                    pageName = 'reportVisit'
                    $$('menuReport').select(5);
                    $$('accPhotoReports').show();
                    $$('reportVisit').refresh();
                    $$('reportVisit').show();
                  }
                });
              }
            }
          },
          data: data
        }).show();
        }

      // Heaven Gifts "Отчет HG"
      if (pageName == 'addHgReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addHgReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addHgReport", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 

          columns: [
            { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string"},
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string"},
            { id: "UserName", header: ['ФИ сотрудника', { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "Name", header: ["НазваниеТТ", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string"},
            { id: "NetworkName", header: ["Название сети", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string"},
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10997", header: ["Наличие POSM HG", { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answer11081", header: ["Наличие POSM конкурентов", { content: "textFilter" }], width: 210, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10892", header: ["Наличие оборудования HG", { content: "textFilter" }], width: 195, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10893", header: ["Наличие оборудования конкурентов", { content: "textFilter" }], width: 270, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer11039", header: ["Продажи в ТТ (за 7 дней)", { content: "textFilter" }], width: 190, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer10904", header: ["Активности конкурентов", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Procent", header: ["%установки APP Gifts", { content: "textFilter" }], width: 175, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "RRC", header: ["Мониторинг РРЦ", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
            { id: "Comment", header: ["Комментарии", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string"}
          ],
          data: data
        }).show();
      }

      // X5 "Мониторинг январь"
      if (pageName == 'addX5Monitoring') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addX5Monitoring');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addX5Monitoring", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          scheme: {
            $change: function (item) {
              if (item.UserID == 0)
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string"},
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string"},
            { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "OutCode", header: ["SAP номер СМ", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "ActionID", header: ["ID анкеты", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "ActionName", header: ["Название анкеты", { content: "textFilter" }], width: 240, minWidth: 40, sort: "string" },
            { id: "Presence", header: ["Наличие", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ReasonAbsence", header: ["Причина отсутствия", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "Design", header: ["Дизайн", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
          ],
          data: data
        }).show();
      }

      // JTI "DC (%)"
      if (pageName == 'addJtiReportDC') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addJtiReportDC');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addJtiReportDC", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
            { id: "PointID", header: ["ID", { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ActionSIS", header: ["ID анкеты", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
            { id: "ArtSIS", header: [{ text: "Количество скю SIS", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Attribute330", header: [{ text: "Кол-во аудированных шкафов (SIS) в тт", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ActionOH", header: ["ID анкеты", { content: "textFilter" }], width: 75, sort: "int", css: { 'text-align': 'center' } },
            { id: "ArtOH", header: [{ text: "Количество скю OH", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Attribute329", header: [{ text: "Кол-во аудированных касс (OH) в тт", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ArtSum", header: [{ text: "Общее количество SKU на всех аудированных кассах", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "AnswerSum", header: [{ text: "Сумма SKU отсутствующих на всех работающих кассах", css: "multiline" }, { content: "textFilter" }], width: 195, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Procent", header: [{ text: "Уровень дистрибуции в точке (DC), %", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
          ],
          data: data
        }).show();
      }

      // X5 "Мониторинг февраль"
      if (pageName == 'addX5MonitoringFeb') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addX5MonitoringFeb');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addX5MonitoringFeb", select: true, resizeColumn: true, fixedRowHeight: false, css: "colorful_table", pager: "pagerReport", rowLineHeight: 24, rowHeight: 24, 
          columns: [
              { id: "OutCode", header: ["Код точки Х5", { content: "textFilter" }], width: 100, minWidth: 80, sort: "string", css: { 'text-align': 'center' } },
              { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
              { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 80, sort: "string" },
              { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
              { id: "ArtName", header: ["Наименование СКЮ", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
              { id: "InStock", header: ["В наличии", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
              { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
          ],
          data: data
        }).show();
      }

      // Heaven Gifts "Отчет HG 2"
      if (pageName == 'addHgReport2') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addHgReport2');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addHgReport2", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", rowHeight: 24,
          scheme: {
              $change: function (item) {
                  if (item.UserName == 'Тотал' || item.NetworkName == 'Тотал')
                      item.$css = "light_blue_highlight";
              }
          },
          columns: [
            { id: "OfficeName", header: [{ text: "", colspan: 4 }, { text: "City or FF Area" }, { content: "textFilter" }], width: 135, minWidth: 40, sort: "string" },
            { id: "UserName", header: [{ text: "", colspan: 4 }, { text: "Сотрудник" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: [{ text: "", colspan: 4 }, { text: "Cеть" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
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
          ],
          data: data
        }).show();
      }

    // Шторк "Отчет по оборудованию" 
      if (pageName == 'addStorckEquipmentReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckEquipmentReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckEquipmentReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "SmartBorned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }},
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Manager", header: ["Ответственный менеджер", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "ArtName", header: ["ПОСМ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Distributor", header: ["Дистрибьютор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "OutCode", header: ["ID точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' }},
            { id: "UserName", header: ["ФИО сотрудника", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Start", header: ["Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Finish", header: ["Окончание периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 40, editor: "string", adjust: "header" },
            { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 40, editor: "string", adjust: "header" }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет по установке" 
      if (pageName == 'addStorckInstallationReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckInstallationReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckInstallationReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,
          scheme: {
            $change: function (item) {
              if (item.Location == null)
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "ActionID", header: ["ID анкеты", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["Наименование оборудования", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Quantity", header: ["Кол-во", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' }},
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["Ответственный", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            {id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 40, editor: "select", css: { 'text-align': 'center' }, adjust: "header",
              options: ['Да', 'Нет', 'Некорректное фото', 'Некорректное количество стоек', 'Некорректная дата установки', 'Некорректная дата окончания установки', 'Некорректное название стойки']
            },
            { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 40, editor: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "Agreement", header: ["Согласовано АП/Самостоятельно", { content: "textFilter" }], width: 40, editor: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "data", editor: "text" }
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckInstallationReport").getItem(editor.row);
              if (state.value != state.old && editor.column == 'VerificationStatus') {
                var status = 10
                switch (item.VerificationStatus) {
                  case 'Нет':
                    status = 0;
                    break;
                  case 'Да':
                    status = 1;
                    break;
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
                              send('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);
                              var list = $$('addStorckInstallationReport');
                              item.VerificationStatus = 'Некорректное фото';
                              item.VerificationDate = 'Сегодня';
                              list.updateItem(item.id, item);
                              var GUID = +new Date;
                              var Acceptor = '-1,' + item.UserID + '|';
                              // отправка задания
                              send('SetPhotoFromReport', { 'User': localStorage.getItem('Author'), 'GUID': GUID, 'PhotoID': item.PhotoID }, null, null);
                              send('SetTask', { 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': Acceptor, 'Text': 'Некорректное фото', 'Category': 6, 'GUID': GUID }, null, null);
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
                  case 'Некорректное количество стоек':
                    status = 3;
                    break;
                  case 'Некорректная дата установки':
                    status = 4;
                    break;
                  case 'Некорректная дата окончания установки':
                    status = 5;
                    break;
                  case 'Некорректное название стойки':
                    status = 6;
                    break;
                };

                if (item.PhotoID != null && item.PhotoID != -1 && status != 10) {

                  send('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);

                  var list = $$('addStorckInstallationReport');

                  switch (status) {
                    case 0:
                      item.VerificationStatus = 'Нет';
                      break;
                    case 1:
                      item.VerificationStatus = 'Да';
                      break;
                    case 2:
                      item.VerificationStatus = 'Некорректное фото';
                      break;
                    case 3:
                      item.VerificationStatus = 'Некорректное количество стоек';
                      break;
                    case 4:
                      item.VerificationStatus = 'Некорректная дата установки';
                      break;
                    case 5:
                      item.VerificationStatus = 'Некорректная дата окончания установки';
                      break;
                    case 6:
                      item.VerificationStatus = 'Некорректное название стойки';
                      break;
                  }
                  item.VerificationDate = 'Сегодня';
                  list.updateItem(item.id, item);
                }
              }
              // сохранение коментария
              if (state.value != state.old && editor.column == 'Comments') {
                $$('addStorckInstallationReport').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': item.ActionID, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
                  success: function (data) {
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    onError();
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }

      // Шторк "Отчет для ТМ"
      if (pageName == 'addStorckReportForTM') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportForTM');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportForTM", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Manager", header: ["Ответственный менеджер", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "EAN", header: ["Номенклатурный номер", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }},
            { id: "ArtNameNew", header: ["ПОСМ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Distributor", header: ["Дистрибьютор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string"},
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string"},
            { id: "Quantity", header: ["Количество", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ActionType", header: ["Согласно АП ЦО/Самостоятельно", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["ФИО сотрудника", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Start", header: ["Начало периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Finish", header: ["Окончание периода", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "VerificationAnswer", header: ["Действие по оборудованию", { content: "textFilter" }], width: 40, editor: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "UserName2", header: ["Ответственный за локацию", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 100, editor: "string", adjust: "data"},
            { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет для HR"
      if (pageName == 'addStorkReportForHR') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorkReportForHR');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorkReportForHR", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "Office", header: ["Регион", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "City", header: ["Город", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
            { id: "OutCode", header: ["ID Анкор", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }, exportType: 'string' },
            { id: "UserName", header: ["ФИО сотрудника", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "SumDurationNKA", header: ["Время NKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "SumDurationLKA", header: ["Время LKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PercentNKA", header: ["% NKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PercentLKA", header: ["% LKA", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "SumDurationOffice", header: ["Время в точке Офис", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
          ],
          data: data
        }).show();
      }

      // Шторк "Статус установки стоек по АП с ЦО"
      if (pageName == 'addStorkReportForStand') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorkReportForStand');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorkReportForStand", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "PointCode", header: ["Код локации", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PointID", header: ["ID", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Start", header: ["Старт", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Finish", header: ["Финиш", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "EAN", header: ["Код SKU", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "PhotoLink", header: ["Статус установки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Answer9456", header: ["Действие по оборудованию", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer10026", header: ["Причина неустановки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header"},
            { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "ResponsibleUser", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "Email", header: ["E-mail", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },
            { id: "UserPhone", header: ["Телефон", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string"},
            { id: "UsersAP", header: ["Все закрепленные за точкой", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет по установке Админ" 
      if (pageName == 'addStorckInstallationReportAdmin') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckInstallationReportAdmin');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckInstallationReportAdmin", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,
          scheme: {
            $change: function (item) {
              if (item.Location == null)
                item.$css = "light_blue_highlight";
            }
          },
          columns: [
            { id: "Location", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "ArtName", header: ["Наименование оборудования", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Quantity", header: ["Кол-во", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["Ответственный", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "PhotoLink", header: ["Ссылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет по проблемам"
      if (pageName == 'addStorckProblemReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckProblemReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckProblemReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,

          columns: [
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "OutCodePoint", header: ["Номер ТК", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "OutCodeArt", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#"  },
            { id: "PLU", header: ["Код товара", { content: "textFilter" }], width: 100, minWidth: 100, sort: "int", adjust: "header", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#"  },
            { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Answer3577", header: ["Количество в точке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer3578", header: ["Суть проблемы/наличие виртуальных стоков", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет по остаткам Пятерочка"
      if (pageName == 'addStorckReportStockPyaterochka') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportStockPyaterochka');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportStockPyaterochka", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,

          columns: [
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "OutCodePoint", header: ["Номер ТК", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "FormatName", header: ["Формат", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Attribute298", header: ["Макрорегион 5ка", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Attribute299", header: [" УА Пятерочка", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Attribute300", header: ["Подформат 5ка", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "OutCodeArt", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#"  },
            { id: "PLU", header: ["Код товара", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Answer7600", header: ["Остатки, ШТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer3578", header: ["Суть проблемы", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header"},
            { id: "Answer9101", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "data" }
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет для проверяющих"
      if (pageName == 'addStorckReportAuditors') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportAuditors');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportAuditors", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,

          columns: [
            { id: "UserAP", header: ["Ответственный", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data", css: { 'text-align': 'center' } },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Answer", header: ["Замечание", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "data" },
            { id: "UserName", header: ["Проверяющий", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 100, sort: "string", adjust: "data", editor: "text" }
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckReportAuditors").getItem(editor.row);
              // сохранение коментария
              if (state.value != state.old && editor.column == 'Comments') {
                $$('addStorckReportAuditors').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 88023, 'Art': -1, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
                  success: function (data) {
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    onError();
                  }
                });
              }             
            }
          },
          data: data
        }).show();
      }

      // Шторк "Отчета по задачам"
      if (pageName == 'addStorckTaskReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckTaskReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckTaskReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true, leftSplit: 9,
          columns: [
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "ActionName", header: ["№ задачи, формулировка задачи", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "ActionID", header: ["ID Анкеты", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }  },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }  },
            { id: "Photo9133", header: ["Cсылка на фото 1", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo9134", header: ["Cсылка на фото 2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo9135", header: ["Cсылка на фото 3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo9136", header: ["Cсылка на фото 4", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo9137", header: ["Cсылка на фото 5", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo7677", header: ["Cсылка на фото 6", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo7678", header: ["Cсылка на фото 7", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo7679", header: ["Cсылка на фото 8", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "VerificationAuthor", header: ["ФИО Проверяющего", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
            { id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", editor: "select", options: ['0','1','П+','2','3','4','5','6','7','8','9','10'], css: { 'text-align': 'center' } },
            { id: "Task", header: ["Задачи", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'color': 'blue' } },
            { id: "TaskLink", header: ["Ссылка на Задания", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' } }
          ],
          on: {
            onBeforeEditStart: function (editor) {
              var item = $$("addStorckTaskReport").getItem(editor.row);
              //если анкета не дмп, то нельзя ставить отметки кроме 0,1,П+, а если дмп, то нельзя отметку П+
              $$("addStorckTaskReport").getColumnConfig("VerificationStatus").options = (item.IsDMP === 1) ? {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10'} : {0:'0',1:'1','П+':'П+'}
            },
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckTaskReport").getItem(editor.row);
              var status = 10
              if (state.value != state.old) {
                switch (item.VerificationStatus) {
                  case '0':
                    status = 0;
                    break;
                  case '1':
                    status = 1;
                    break;
                  case 'П+':
                    status = 7;
                    break;
                  case '2':
                    status = 12;
                    break;
                  case '3':
                    status = 13;
                    break;
                  case '4':
                    status = 14;
                    break;
                  case '5':
                    status = 15;
                    break;
                  case '6':
                    status = 16;
                    break;
                  case '7':
                    status = 17;
                    break;
                  case '8':
                    status = 18;
                    break;
                  case '9':
                    status = 19;
                    break;
                  case '10':
                    status = 20;
                    break;
                }
              }

              if (item.PhotoID != null && item.PhotoID != -1 && status != 10) {

              send('SetPhotoCheck', { 'ID': item.PhotoID, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);

              var list = $$('addStorckTaskReport');
              switch (status) {
                case 0:
                  item.VerificationStatus = '0';
                  break;
                case 1:
                  item.VerificationStatus = '1';
                  break;
                case 7:
                  item.VerificationStatus = 'П+';
                  break;
                case 12:
                  item.VerificationStatus = '2';
                  break;
                case 13:
                  item.VerificationStatus = '3';
                  break;
                case 14:
                  item.VerificationStatus = '4';
                  break;
                case 15:
                  item.VerificationStatus = '5';
                  break;
                case 16:
                  item.VerificationStatus = '6';
                  break;
                case 17:
                  item.VerificationStatus = '7';
                  break;
                case 18:
                  item.VerificationStatus = '8';
                  break;
                case 19:
                  item.VerificationStatus = '9';
                  break;
                case 20:
                  item.VerificationStatus = '10';
                  break;
              }
              item.VerificationAuthor = localStorage.getItem('UserName');
              list.updateItem(item.id, item);
            }
          },
          //действия при клике на строку в столбце Задание
          onItemClick: function (id) {
            if (id.column == 'Task') {
              var item = $$("addStorckTaskReport").getItem(id.row)
              var TaskPhotoID = item.PhotoID;
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
                    { view: "button", type: 'icon', icon: "times", width: 30, click: function () { $$('TaskReportWindow').close() } }
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
                                case 'Фото № 1':
                                  $$("labelTaskReport").define("label", item.Photo9133 === null ? 'нет фото' : item.Photo9133);
                                  TaskPhotoID = item.PhotoID;
                                  break;
                                case 'Фото № 2':
                                  $$("labelTaskReport").define("label", item.Photo9134 === null ? 'нет фото' : item.Photo9134);
                                  TaskPhotoID = item.PhotoID2;
                                  break;
                                case 'Фото № 3':
                                  $$("labelTaskReport").define("label", item.Photo9135 === null ? 'нет фото' : item.Photo9135);
                                  TaskPhotoID = item.PhotoID3;
                                  break;
                                case 'Фото № 4':
                                  $$("labelTaskReport").define("label", item.Photo9136 === null ? 'нет фото' : item.Photo9136);
                                  TaskPhotoID = item.PhotoID4;
                                  break;
                                case 'Фото № 5':
                                  $$("labelTaskReport").define("label", item.Photo9137 === null ? 'нет фото' : item.Photo9137);
                                  TaskPhotoID = item.PhotoID5;
                                  break;
                                case 'Фото № 6':
                                  $$("labelTaskReport").define("label", item.Photo7677 === null ? 'нет фото' : item.Photo7677);
                                  TaskPhotoID = item.PhotoID5;
                                  break;
                                case 'Фото № 7':
                                  $$("labelTaskReport").define("label", item.Photo7678 === null ? 'нет фото' : item.Photo7678);
                                  TaskPhotoID = item.PhotoID5;
                                  break;
                                case 'Фото № 8':
                                  $$("labelTaskReport").define("label", item.Photo7679 === null ? 'нет фото' : item.Photo7679);
                                  TaskPhotoID = item.PhotoID5;
                                  break;
                              }
                              $$("labelTaskReport").refresh();
                              //если нет фото, то кнопка отправки задания неактивна
                              $$("labelTaskReport").data.label == 'нет фото' ? $$("buttonTaskReport").disable() : $$("buttonTaskReport").enable();
                            }
                          }
                        }
                      ]
                    },
                    { view: "label", id: 'labelTaskReport', align: "center", width: 200},
                    { view: "textarea", id: 'newTextTaskReport', width: 250, height: 50, placeholder: (isEng) ? "Enter text" : "Введите комментарий", value: '' },
                    // отправка задания
                    {
                      view: "button", id: 'buttonTaskReport', label: 'Отправить задание', width: 200, height: 30, align: 'center',
                      click: function () {
                        var list = $$('addStorckTaskReport');
                        var GUID = +new Date;
                        var Acceptor = '-1,' + item.UserID + '|';
                        var newTextTaskReport = $$("newTextTaskReport").data.value == '' ? 'Некорректное фото' : $$("newTextTaskReport").data.value;
                        send('SetPhotoFromReport', { 'User': localStorage.getItem('Author'), 'GUID': GUID, 'PhotoID': TaskPhotoID }, null, null);
                        send('SetTask', { 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': Acceptor, 'Text': newTextTaskReport, 'Category': 6, 'GUID': GUID }, null, null);
                        $$('TaskReportWindow').close();
                        webix.message({ type: "success", text: "Претензия отправлена", expire: 1500 });
                        //обновляем в таблице
                        item.TaskLink = 'Задача поставлена';
                        item.BornedTaskFinish = new Date();
                        list.updateItem(item.id, item);
                      }
                    }
                  ]
                },
              }).show();
              //изначально отображаем ссылку на первое фото
              $$("labelTaskReport").define("label", item.Photo9133);
              $$("labelTaskReport").refresh();
            }
            //переход в отчет с задачами
            if (id.column == 'TaskLink') {
              var item = $$("addStorckTaskReport").getItem(id.row)
              //проверка наличие фразы "есть задача"
              if ((item.TaskLink.indexOf('Есть задача') != -1) || (item.TaskLink = 'Задача поставлена')) {
                showProgress("navigation");
                $.ajax({
                  url: URLname + 'Services/Report.asmx/Task',
                  timeout: 300000,
                  data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': item.BornedTaskStart, 'Finish': item.BornedTaskFinish, 'IsMy': 0, 'Point': item.PointID }),
                  success: function (data) {
                    $$('reportTask').clearAll();
                    $$('reportTask').parse(data.d);

                    hideFields('reportTask');
                    $$("navigation").hideProgress();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
                  },
                  complete: function () {                  
                    $$('accTaskReports').show();
                    $$('accTaskReports').refresh();
                  }
                });
              }

            }
          }
          },
          data: data
        }).show();
      }

      // Шторк "Отчет по наличию в LKA"
      if (pageName == 'addStorckReportLKA') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportLKA');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportLKA", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "OutCode", header: ["Код точки АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' }},
            { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "EAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#"  },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9457", header: ["Ответ по наличию", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Answer3578", header: ["Суть проблемы", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" },
            { id: "Answer9101", header: ["Комментарий", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "data" }
          ],
          data: data
        }).show();
      }

      // Шторк "Срез по действиям"
      if (pageName == 'addStorckActivityReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckActivityReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckActivityReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "UserAP", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string"},
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string"},
            { id: "MasterUserName", header: ["ФИО Проверяющего", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
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
          ],
          data: data
        }).show();
      }

      // Шторк "Отчет по браку"
      if (pageName == 'addStorckReportForDefect') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportForDefect');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportForDefect", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,
          columns: [
            { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string"},
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string"},
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Answer9016", header: ["Наименование оборудования", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string"},
            { id: "Photo9586", header: ["Фото бракованной детали", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo10052", header: ["Фото бракованной детали №2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo10163", header: ["Фото бракованной детали №3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo10190", header: ["Фото маркировки короба", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Photo9587", header: ["Фото инструкции по сборке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Answer10046", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Answer9585", header: ["Описание проблемы", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Answer9584", header: ["Факт установки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Answer9588", header: [" Комментарий", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string"},
            { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            {
              id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 40, editor: "select", css: { 'text-align': 'center' }, adjust: "header",
              options: ['Да', 'Нет', 'Некорректное фото', 'Некорректное количество стоек', 'Некорректная дата установки', 'Некорректная дата окончания установки', 'Некорректное название стойки']
            },
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckReportForDefect").getItem(editor.row);
              if (state.value != state.old && editor.column == 'VerificationStatus') {
                var status = 10
                switch (item.VerificationStatus) {
                  case 'Нет':
                    status = 0;
                    break;
                  case 'Да':
                    status = 1;
                    break;
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
                              send('SetPhotoCheck', { 'ID': item.PhotoID9586, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);
                              var list = $$('addStorckReportForDefect');
                              item.VerificationStatus = 'Некорректное фото';
                              item.VerificationDate = 'Сегодня';
                              list.updateItem(item.id, item);
                              var GUID = +new Date;
                              var Acceptor = '-1,' + item.UserID + '|';
                              // отправка задания
                              send('SetPhotoFromReport', { 'User': localStorage.getItem('Author'), 'GUID': GUID, 'PhotoID': item.PhotoID9586 }, null, null);
                              send('SetTask', { 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Acceptor': Acceptor, 'Text': 'Некорректное фото', 'Category': 6, 'GUID': GUID }, null, null);
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
                  case 'Некорректное количество стоек':
                    status = 3;
                    break;
                  case 'Некорректная дата установки':
                    status = 4;
                    break;
                  case 'Некорректная дата окончания установки':
                    status = 5;
                    break;
                  case 'Некорректное название стойки':
                    status = 6;
                    break;
                };

                if (item.PhotoID9586 != null && item.PhotoID9586 != -1 && status != 10) {

                  send('SetPhotoCheck', { 'ID': item.PhotoID9586, 'Status': status, 'User': localStorage.getItem('Author') }, null, null);

                  var list = $$('addStorckReportForDefect');

                  switch (status) {
                    case 0:
                      item.VerificationStatus = 'Нет';
                      break;
                    case 1:
                      item.VerificationStatus = 'Да';
                      break;
                    case 2:
                      item.VerificationStatus = 'Некорректное фото';
                      break;
                    case 3:
                      item.VerificationStatus = 'Некорректное количество стоек';
                      break;
                    case 4:
                      item.VerificationStatus = 'Некорректная дата установки';
                      break;
                    case 5:
                      item.VerificationStatus = 'Некорректная дата окончания установки';
                      break;
                    case 6:
                      item.VerificationStatus = 'Некорректное название стойки';
                      break;
                  }
                  item.VerificationDate = 'Сегодня';
                  list.updateItem(item.id, item);
                }
              }
            }
          },
          data: data
        }).show();
      }

      // Шторк "База с привязками"
      if (pageName == 'addStorckReportMainME') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportMainME');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportMainME", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,
          columns: [
            { id: "PointID", header: ["ID точки", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
            { id: "OfficeName", header: ["Регион", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "OutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "MainME", header: ["Основной мерчендайзер", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "ME", header: ["Закрепленный мерчендайзер", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
            { id: "KAE", header: ["Закрепленный КАЕ", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
            { id: "TSM", header: ["Закрепленный TSM", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
            { id: "RSM", header: ["Закрепленный RSM", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
            { id: "PCT", header: ["Ставит ли РСМ/ТСМ стойки", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Да', 'Нет']},
            { id: "AuthorPCT", header: ["Кто внес изменения/корректировки", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "BornedPCT", header: ["Дата последней корректировки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Responsible", header: ["Ответственный за локацию", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "ResponsibleEmail", header: ["Эл.адрес Ответственного за локацию", { content: "textFilter" }], width: 175, minWidth: 40, sort: "string" },
            { id: "ResponsiblePhone", header: ["Телефон Ответственного за локацию", { content: "textFilter" }], width: 170, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Status", header: ["Город проживания/командировочная", { content: "textFilter" }], width: 255, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Командировочная', 'Проживание'] },
            { id: "AuthorStatus", header: ["Кто внес изменения/корректировки", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "BornedStatus", header: ["Дата последней корректировки", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "ContPers", header: ["Контактное лицо", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
            { id: "ContPersEmail", header: ["Эл.адрес контактного лица", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "ContPersPhone", header: ["Телефон контактного лица", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
          ],
          on: {
            onBeforeEditStart: function (editor) {
              var item = $$("addStorckReportMainME").getItem(editor.row);
              if ((editor.column == "PCT" && item.IsEditPCT == 0) || (editor.column == "Status" && item.IsEditStatus == 0)) {
                return false; // Запретить редактирование ячейки
              }
            },
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckReportMainME").getItem(editor.row);
              if (state.value != state.old) {
                var question
                var option
                //сохранение "Ставит ли РСМ/ТСМ стойки"
                if (editor.column == 'PCT') {
                  switch (item.PCT) {
                    case 'Нет':
                      option = 1;
                      break;
                    case 'Да':
                      option = 2;
                      break;
                  }
                  question = 1
                  item.AuthorPCT = localStorage.getItem('UserName');
                  item.BornedPCT = 'Сегодня';
                }
                //сохранение "Город проживания/командировочная"
                if (editor.column == 'Status') {
                  switch (item.Status) {
                    case 'Командировочная':
                      option = 1;
                      break;
                    case 'Проживание':
                      option = 2;
                      break;
                  }
                  question = 2
                  item.AuthorStatus = localStorage.getItem('UserName');
                  item.BornedStatus = 'Сегодня';
                }
                $$('addStorckReportMainME').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetReportAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': null, 'Borned': null, 'Action': null, 'Art': null, 'Question': question, 'Option': option, 'Answer': null, 'Company': localStorage.getItem('CompanyID'), 'Report': addReportID, 'Author': localStorage.getItem('Author') }),
                  success: function (data) {},
                  error: function (xhr, ajaxOptions, thrownError) {onError();}
                });
              }      
            }
          },
          data: data
        }).show();
      }

      //Шторк "Расчет бонусов полевой структуре"
      if (pageName == 'addStorckUsersBonus') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckUsersBonus');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckUsersBonus", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true, leftSplit: 5,
          columns: [
            { id: "UserOutCode", header: [{ text: "Информация по сотруднику", colspan: 5 }, "ID сотрудника", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'string' },
            { id: "Region", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Регион", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "MasterUserName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Ответственный", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string" },
            { id: "RoleName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Должность", { content: "textFilter" }], width: 95, minWidth: 40, sort: "string" },
            { id: "UserName", header: [{ text: "Информация по сотруднику", colspan: 5 }, "Сотрудник", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string" },

            { id: "ProcTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "max % бонуса Ft1", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NameTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Описание задачи Ft1", { content: "textFilter" }], width: 320, minWidth: 40, sort: "string" },
            { id: "PlanTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Plan Ft1", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Fact Ft1", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NegativeAnswersTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Кол-во отриц.ответов при проверке в полях", { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "СorrectedAnswersTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "TotalTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "Fact ИТОГ Ft1", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ExecutionTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "% выполн.плана Ft1 расчетный", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FromBonusTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "% от бонус.потенциала Ft1 для начисления ", { content: "textFilter" }], width: 155, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask1", header: [{ text: "Focus Task 1", colspan: 10 }, "% бонуса Ft1", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "ProcTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "max % бонуса Ft2", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NameTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Описание задачи Ft2", { content: "textFilter" }], width: 320, minWidth: 40, sort: "string" },
            { id: "PlanTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Plan Ft2", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Fact Ft2", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NegativeAnswersTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Кол-во отриц.ответов при проверке в полях", { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, },
            { id: "СorrectedAnswersTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "TotalTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "Fact ИТОГ Ft2", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ExecutionTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "% выполн.плана Ft2 расчетный", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FromBonusTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "% от бонус.потенциала Ft2 для начисления ", { content: "textFilter" }], width: 155, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask2", header: [{ text: "Focus Task 2", colspan: 10 }, "% бонуса Ft2", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "ProcTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "max % бонуса Ft3", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NameTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Описание задачи Ft3", { content: "textFilter" }], width: 320, minWidth: 40, sort: "string" },
            { id: "PlanTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Plan Ft3", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Fact Ft3", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NegativeAnswersTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Кол-во отриц.ответов при проверке в полях", { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "СorrectedAnswersTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "TotalTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "Fact ИТОГ Ft3", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ExecutionTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "% выполн.плана Ft3 расчетный", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FromBonusTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "% от бонус.потенциала Ft3 для начисления ", { content: "textFilter" }], width: 155, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask3", header: [{ text: "Focus Task 3", colspan: 10 }, "% бонуса Ft3", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "ProcTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "max % бонуса Ft4", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NameTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Описание задачи Ft4", { content: "textFilter" }], width: 320, minWidth: 40, sort: "string" },
            { id: "PlanTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Plan Ft4", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Fact Ft4", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "NegativeAnswersTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Кол-во отриц.ответов при проверке в полях", { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "СorrectedAnswersTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Кол-во тт с отриц.полевой отметкой, закрытых через отчет по задачам", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "TotalTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "Fact ИТОГ Ft4", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ExecutionTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "% выполн.плана Ft4 расчетный", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FromBonusTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "% от бонус.потенциала Ft4 для начисления ", { content: "textFilter" }], width: 155, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask4", header: [{ text: "Focus Task 4", colspan: 10 }, "% бонуса Ft4", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "BonusTask1", header: [{ text: "Бонус, %", colspan: 5 }, "Ft1 % премии за выполн.плана", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask2", header: [{ text: "Бонус, %", colspan: 5 }, "Ft2 % премии за выполн.плана", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask3", header: [{ text: "Бонус, %", colspan: 5 }, "Ft3 % премии за выполн.плана", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "BonusTask4", header: [{ text: "Бонус, %", colspan: 5 }, "Ft4 % премии за выполн.плана", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "AllBonus", header: [{ text: "Бонус, %", colspan: 5 }, "% Общий бонус", { content: "textFilter" }], width: 75, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "RemarksAnswers", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, "Кол-во замечаний из анкеты проверяющего", { content: "textFilter" }], width: 125, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "VerifiedPoint", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, "Кол-во проверенных точек из анкеты проверяющего", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "CoefRemarks", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, "Коэффициент от кол-ва замечаний", { content: "textFilter" }], width: 55, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "FinalBonus", header: [{ text: "С учетом коэффициента по замечаниям в полях", colspan: 4 }, "Итого % бонуса с учетом кэфф", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "WorkDay", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, { text: "Референтное значение дней", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text", editParse: function (value) { return value.replace(/\D/g, ""); /*только цифры*/ } },
            { id: "WorkDays", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, "Отработанные дни по КАЕ/МЕ", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ProcWorkDays2", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, "% отработанных дней", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "ProcWorkDays", header: [{ text: "Расчет с учетом отработанных дней", colspan: 4 }, "Расчет % выполнения с учетом отраб.дней", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

            { id: "IsCheck", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Отметка о проверке ответственного", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "select", options: ['Да', 'Нет'] },
            { id: "CheckingUser", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "ФИО ответственного", { content: "textFilter" }], width: 150, minWidth: 40, sort: "int" },
            { id: "CheckingDate", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Дата проверки", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Comment", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Комментарий при исключениях (текст)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", editor: "text" },
            { id: "CheckingBonus", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Бонус в % с учетом комментария", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "text" },
            { id: "BonusControl", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Контроль бонуса", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "CalculatProc", header: [{ text: "Подтверждение расчета Ответственным", colspan: 7 }, "Расчет % выполнения с учетом комментариев и отработанных дней", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
          ],
          on: {
            onBeforeEditStart: function (id) {
              var item = $$("addStorckUsersBonus").getItem(id);
              if (item.MasterUserID != localStorage.getItem('Author') && id.column != "WorkDay") {
                return false; // Запретить редактирование ячейки, если не ответственный
              }          
              if (( id.column == "Comment" || id.column == "CheckingBonus" )&& item.IsCheck != 'Нет') {
                return false; // Запретить редактирование ячейки комментарий, если статус не "Нет"
              }
              if (id.column == "WorkDay" && item.IsEdit != 1) {
                return false;
              }           
            },
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckUsersBonus").getItem(editor.row);
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
                    break;
                }
                if (editor.column == "WorkDay") {
                  item.CalculatProc = "<span class='fas fa-sync'></span>";
                  item.ProcWorkDays = "<span class='fas fa-sync'></span>";
                  item.ProcWorkDays2 = "<span class='fas fa-sync'></span>";

                  //сохраняем рабочие дни
                  $.ajax({
                    url: URLname + 'Services/Desktop.asmx/SetBonusPlan',
                    data: JSON.stringify({ 'User': item.UserID, 'Start': item.Start, 'WorkDay': item.WorkDay, 'IsCheck': null, 'Comment': null, 'Bonus': null, 'Author': -1 }),
                  });
                  return;
                }
                //сохраняем коментарии
                $.ajax({
                  url: URLname + 'Services/Desktop.asmx/SetBonusPlan',
                  data: JSON.stringify({ 'User': item.UserID, 'Start': item.Start, 'WorkDay': null, 'IsCheck': status, 'Comment': item.Comment, 'Bonus': item.CheckingBonus, 'Author': localStorage.getItem('Author') }),
                });

                item.CheckingUser = localStorage.getItem('UserName');
                item.CheckingDate = 'Сегодня';
              }
            }
          },
          data: data
        }).show();
      }

      //Шторк "Отчет ДМП (торцы Перекресток)"
      if (pageName == 'addStorckPerecrestokDMP') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckPerecrestokDMP');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckPerecrestokDMP", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,

          columns: [
            { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["Наименование SKU", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string", editor: "text" }
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckPerecrestokDMP").getItem(editor.row);
              // сохранение коментария
              if (state.value != state.old && editor.column == 'Comments') {
                $$('addStorckPerecrestokDMP').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 104250, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
                  success: function (data) {
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    onError();
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }

      //Шторк "Отчет Дикси (желтые ценники)"
      if (pageName == 'addStorckReportDiksi') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportDiksi');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportDiksi", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true,

          columns: [
            { id: "Extra4", header: [{ text: "Film title", css: "header" }, { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#"  },
            { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "ArtName", header: ["Наименование SKU", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
            { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
            { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
            { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string", editor: "text" }
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckReportDiksi").getItem(editor.row);
              // сохранение коментария
              if (state.value != state.old && editor.column == 'Comments') {
                $$('addStorckReportDiksi').render();
                $.ajax({
                  url: '../Services/Desktop.asmx/SetAnswer',
                  data: JSON.stringify({ 'Point': item.PointID, 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(item.Borned), 'Action': 104251, 'Art': item.ArtID, 'Question': 9101, 'Option': -1, 'Answer': state.value }),
                  success: function (data) {
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                    onError();
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }

      //Шторк "Бонусные задачи"
      if (pageName == 'addStorckInformationTasks') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckInformationTasks');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckInformationTasks", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true, leftSplit: 5, rowHeight: 72,

          columns: [
            { id: "DateLastEdit", header: [{ text: "Дата заполнения", css: "multiline" }, { content: "textFilter" }], width: 75, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "Task", header: ["№ задачи", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
            { id: "UserName", header: ["Исполнитель", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "UserID", header: [{ text: "ID исполнителя", css: "multiline" }, { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
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
            { id: "TaskName", header: [{ text: "Формулировка задачи согласно утвержденного образца", css: "multiline" }, { content: "textFilter" }], width: 300, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "NetworksID", header: ["ID сети", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
            { id: "Points", header: [{ text: "Закрепленные точки", css: "multiline" }, { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", editor: "text" },
            { id: "Plans", header: ["План", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Author", header: ["ФИО ответственного", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "CheckBDM", header: [{ text: "Подтверждение БДМ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "select", options: null, css: { 'text-align': 'center' } },
            { id: "CommentsBDM", header: [{ text: "Комментарий БДМ при отметке НЕТ", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", editor: "text" },
            { id: "AuthorBDM", header: ["ФИО БДМ", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "CheckBornedBDM", header: [{ text: "Дата подтверждения БДМ", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "CopyUser", header: [{ text: "Копирование задачи", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", editor: "multiselect", options: null, css: { 'text-align': 'center' }, template: function (obj) { return `<span style="text-decoration: underline; color: blue;">${"Выбрать сотрудников"}</span>`; }, },
            { id: "CopyOldTask", header: [{ text: "Продублировать Задачу предыдущего периода", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, template: function (obj) { return `<span style="text-decoration: underline; color: blue;">${"Скопировать"}</span>`; } },
          ],
          on: {
            onBeforeEditStart: function (editor) {
              let item = $$("addStorckInformationTasks").getItem(editor.row);
              if (item.IsEdit != 0 || item.IsBDM != 0) {
                if (item.CheckBDM == 'Да' && (editor.column == "TaskType" || editor.column == "Formulation" || editor.column == "F" || editor.column == "M" || editor.column == "N" || editor.column == "R" ||
                  editor.column == "T" || editor.column == "Y" || editor.column == "Z" || editor.column == "X" || editor.column == "Points")) { return false; } //если стоит Да, редактирование закрыто
                else if (editor.column == "Formulation") {
                  switch (item.TaskType) {
                    case 'ДМП, оборудование':
                      $$("addStorckInformationTasks").getColumnConfig("Formulation").options = ['Размещение не менее X  ДМП по продукту Z согласно АП в сети Y на период не менее T дней', 'Согласование и установка не менее X ДМП сверх согласованных ЦО в тт сетей Y на период не менее T дней', 'Размещение не менее X страйп-лент в  N тт сети Y на период не менее T дней',
                        'Размещение не менее X дополнительного оборудования Шторк подвесы/диспенсоры в тт сети Y на период не менее T дней', 'Согласование и установка не менее X напольного оборудования Шторк сверх согласованных ЦО в тт сетей Y на период не менее T дней'];
                      break;
                    case 'Прикасса':
                      $$("addStorckInformationTasks").getColumnConfig("Formulation").options = ['Размещение не менее X страйп-лент на R кассах тт сети Y на период не менее T дней', 'Размещение не менее X страйп-лент ( другое прикассовое оборудование Шторк) на R кассах в кол-ве N тт сети Y на период не менее T дней', 'Размещение  продукта Z на прикассовой зоне в количестве N магазинов сети Y на период не менее T дней',
                        'Размещение  продукта Z на прикассовой зоне, не ниже M полки в кол-ве N тт сети Y на период не менее T дней', 'Размещение продукта Z не менее, чем на R крючках прикассовой зоны в кол-ве N тт сети Y на период не менее T дней', 'Размещение  продукта Z  не менее чем на X кассах, в количестве N магазинов сети Y на период не менее T дней',
                        'Размещение продукции Шторк на X кассах самообслуживания тт сети Y на период не менее T дней'];
                      break;
                    case 'Расширение доли полки':
                      $$("addStorckInformationTasks").getColumnConfig("Formulation").options = ['Увеличение кол-ва фейсов позиции Z до кол-ва F в кол-ве N тт сети Y с периодом поддержания не менее T дней', 'Выкладка в категории продукта Z с долей полки не менее F% в кол-ве N  тт сети Y на период не менее T дней',
                        'Cогласование и выкладка продукта Z лучше официальной планограммы на R фейсов в кол-ве N магазинов сети Y на период не менее T дней', 'Cогласование и выкладка продукции Шторк лучше официальной планограммы в кол-ве N магазинов сети Y на период не менее T дней'];
                      break;
                    case 'Выкладка планограммы':
                      $$("addStorckInformationTasks").getColumnConfig("Formulation").options = ['Выкладка корпоративным блоком  в категории конфет не менее, чем в N магазинах  тт сети Y на период не менее T дней', 'Выкладка продукта Z в категории на полках не ниже полки M/не выше полки M в кол-ве N тт сети Y на период не менее T дней', 'Выкладка продукции не хуже чем по планограмме в кол-ве N тт сети Y  на период не менее T дней',
                        'Выкладка продукта Z в категории не менее, чем M% тт сети Y на период не менее T дней', 'Выкладка всех sku минимум в 1 фейс в категории в кол-ве N тт сети Y на период не менее T дней', 'Размещение продукта Z в своей категории не менее, чем на R крючках в  кол-ве N тт сети Y  на период не менее T дней'];
                      break;
                    case 'Выполнение задач подчиненными':
                      $$("addStorckInformationTasks").getColumnConfig("Formulation").options = ['Выполнение задач мерчандайзерами своей территории', 'Выполнение задач КАЕ своей территории'];
                      break;
                    default:
                      return false; //запрет редактирования, если не выбран тип
                  }
                }
                else if (item.IsBDM == 0 && (editor.column == "CheckBDM" || editor.column == "CommentsBDM")) { return false; } //редактировать может только BDM/DSM
                else if (editor.column == "CheckBDM") {
                  if (item.IsCheck == 1 && [1, 2, 3, 4].includes(item.TaskID)) { $$("addStorckInformationTasks").getColumnConfig("CheckBDM").options = ['Да', 'Разрешаю корректировку'] }
                  else { $$("addStorckInformationTasks").getColumnConfig("CheckBDM").options = ['Да', 'Нет'] }; //'Разрешаю корректировку' можно выбирать только в текущем месяце}
                }
                else if (editor.column == "CommentsBDM" && item.CheckBDM != 'Нет') { return false; } //редактировать можно только при ответе Нет
                else if (editor.column == "Y") {
                  $$("addStorckInformationTasks").getColumnConfig("Y").options = ["Вся АП", "7 шагов", "Metro", "Авоська", "Азбука вкуса", "Аникс", "Ароматный мир", "Арт Маркет", "Атак", "АШАН", "АШАН-СИТИ", "Бахетле", "Бегемот_Кемерово", "Бегемот_Тамбов", "Близкий", "Болтрукевич", "Быстроном", "Верный", "Виктория (МСК)", "Виктория (СЗФО)", "Винлаб", "Вкустер", "Высшая лига Кострома", "Глобус", "ГриНН_РФ", "Гулливер", "Гулливер_Кострома",
                    "Десяточка_Кострома", "Десяточка_Хабаровский Край", "Детский Мир", "Дикси", "Доброцен", "Европа", "Золотой Ключик", "Караван_Чита","Караван_Пенза","Кировский","Командор", "Кораблик", "Красный Яр", "Кэш-энд-Кэрри", "Лама", "Лента ГМ", "Лента ММ", "Лента СМ", "Лион", "Лион(Берега)", "Магнолия", "Макси","Макс-Микс", "Мария - Ра", "Маяк", "Метрополис", "Миндаль", "Мираторг", "Молния", "Монетка", "Наш Дисконт", "НК Сити", "Новоторг", "Окей ГМ", "Окей СМ", "ОРТ-Универсал", "Пеликан", "Пеликан_Тольятти",
                    "Пеликан_Хабаровск", "Перекресток", "Перекресток ГМ", "Петровский","Пикник (Яблоко)", "Пловдив", "Пятерочка", "РАЗДВА", "Реалъ", "Реми", "Розница", "Русский Разгуляйка", "Самбери", "Семья", "Семья Пермь", "Семья_Калининград","Сезон", "Система Глобус", "Слата", "СПАР", "Спар ГМ", "Спар СМ", "Спар_НН", "Спар_Тула", "Спар-экспресс", "Спутник", "Спутник_Улан Удэ", "Спутник_Чита", "Столица", "Тандер", "Тандер ГМ", "Титан", "Триумф", "Формат", "ХлебСоль","Хороший", "Холлифуд", "Челны Хлеб", "Экономыч", "Яблоко_Крым"]
                }
                else if (editor.column == "Z") { $$("addStorckInformationTasks").getColumnConfig("Z").options = ['Мерси конфеты', 'Мерси плитка', 'Мамба жевательные конфеты', 'Мамба фрумеладки', 'Прикассовый ассортимент', 'Тоффифе', 'Вертерс', 'Полочный ассортимент', 'Весь ассортимент'] }
                else if (editor.column == "CopyUser") {
                  let userData = [];
                  let uniqueUsers = {};
                  $$("addStorckInformationTasks").data.each(function (obj) {
                    //исключаем дубли и сотрудника выбранной строки, и оставляем только к кому есть доступ
                    if (!uniqueUsers[obj.UserID] && obj.UserID != item.UserID && (obj.IsEdit == 1 || obj.IsBDM == 1)) {
                      uniqueUsers[obj.UserID] = true;
                      userData.push({ UserID: obj.UserID, UserName: obj.UserName });
                    }
                  });
                  $$("addStorckInformationTasks").getColumnConfig("CopyUser").options = userData.map(user => {
                    return { id: user.UserID, value: user.UserName };
                  });
                }
              }
              else if (editor.column == "CheckBDM" && item.IsCheck == 1 && [1, 2, 3, 4].includes(item.TaskID)) {
                $$("addStorckInformationTasks").getColumnConfig("CheckBDM").options = ['Да', 'Разрешаю корректировку'];
              }
              else { return false; };
            },
            //сохранение ответов           
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              let item = $$("addStorckInformationTasks").getItem(editor.row);
              if (state.value != state.old && editor.column != 'CopyUser') {
                let question, answer;
                const sync = "<span class='fas fa-sync'></span>";
                switch (editor.column) {
                  case 'TaskType':
                    question = 1; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'Formulation':
                    question = 2; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'F':
                    question = 3; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'M':
                    question = 4; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'N':
                    question = 5; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'R':
                    question = 6; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'T':
                    question = 7; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'Y':
                    question = 8; answer = state.value.includes("Вся АП") ? "Вся АП" : state.value; item.Y = answer; //Вся АП перекрывает другие варианты
                    item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName'); item.NetworksID = sync;
                    break;
                  case 'Z':
                    question = 9; answer = state.value; item.TaskName = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'X':
                    question = 10; answer = state.value; item.TaskName = sync; item.Plans = sync; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'Points':
                    question = 11; answer = state.value; item.DateLastEdit = 'Сегодня'; item.Author = localStorage.getItem('UserName');
                    break;
                  case 'CheckBDM':
                    question = 13;
                    answer = state.value;
                    item.CheckBornedBDM = 'Сегодня';
                    item.AuthorBDM = localStorage.getItem('UserName');
                    break;
                  case 'CommentsBDM':
                    question = 14;
                    answer = state.value;
                    break;
                  case 'Comments':
                    question = 15;
                    answer = state.value;
                    break;
                }
                $.ajax({
                  url: '../Services/Desktop.asmx/SetReportAnswer',
                  data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': question, 'Option': null, 'Answer': answer, 'Company': localStorage.getItem('CompanyID'), 'Report': addReportID, 'Author': localStorage.getItem('Author') }),
                  error: function (xhr, ajaxOptions, thrownError) { onError(); }
                });
              }
              else if (state.value != state.old && state.value != '' && editor.column == 'CopyUser') {
                webix.confirm({
                  text: "Скопировать задачу: '" + item.Task + "' выбранным сотрудникам?",
                  callback: function (result) {
                    if (result) {
                      $.ajax({
                        url: '../Services/Desktop.asmx/SetReportAnswer',
                        data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': 20, 'Option': null, 'Answer': state.value, 'Company': localStorage.getItem('CompanyID'), 'Report': addReportID, 'Author': localStorage.getItem('Author') }),
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
                        url: '../Services/Desktop.asmx/SetReportAnswer',
                        data: JSON.stringify({ 'Point': null, 'User': item.UserID, 'Borned': item.Borned, 'Action': item.TaskID, 'Art': null, 'Question': 22, 'Option': null, 'Answer': null, 'Company': localStorage.getItem('CompanyID'), 'Report': addReportID, 'Author': localStorage.getItem('Author') }),
                        error: function (xhr, ajaxOptions, thrownError) { onError(); }
                      });
                      webix.message("Данные скопированны, необходимо обновить отчет");
                    }
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }

      //Шторк "ТАБЕЛЬ (платформа ШТОРК)"
      if (pageName == 'addStorckTimesheet') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckTimesheet');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckTimesheet", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport", editable: true, leftSplit: 4,

          columns: [
            //{ id: "City", header: ["Город Анкор", { content: "selectFilter" }], width: 125, minWidth: 40, sort: "string", editor: "select", options: ['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Новосибирск', 'Уфа', 'Ростов-на-Дону', 'Пермь', 'Краснодар', 'Челябинск', 'Самара', 'Воронеж', 'Екатеринбург', 'Казань','Красноярск','Иркутск'] },
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
            { id: "Day1",  header: ["1",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day2",  header: ["2",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day3",  header: ["3",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day4",  header: ["4",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day5",  header: ["5",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day6",  header: ["6",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day7",  header: ["7",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day8",  header: ["8",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day9",  header: ["9",  { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day10", header: ["10", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day11", header: ["11", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day12", header: ["12", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day13", header: ["13", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day14", header: ["14", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day15", header: ["15", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day16", header: ["16", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day17", header: ["17", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day18", header: ["18", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day19", header: ["19", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day20", header: ["20", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day21", header: ["21", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day22", header: ["22", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day23", header: ["23", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day24", header: ["24", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day25", header: ["25", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day26", header: ["26", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day27", header: ["27", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day28", header: ["28", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day29", header: ["29", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day30", header: ["30", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "Day31", header: ["31", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
            { id: "SumDay", header: [{ text: "Кол-во раб.дней", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "HolidayPaid", header: [{ text: "Отпуск оплачиваемый (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
            { id: "HolidayNoPaid", header: [{ text: "Отпуск за свой счет (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
            { id: "Mission", header: [{ text: "Командировки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
            { id: "SickLeave", header: [{ text: "Больничный (даты)", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
            { id: "Absense", header: [{ text: "Прочие неявки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
          ],
          on: {
            onBeforeEditStart: function (editor) {
              var item = $$("addStorckTimesheet").getItem(editor.row);
              //доступ имеет только рук/бдм и роли по списку
              if (item.RegionMasterID == localStorage.getItem('Author') || item.MasterID == localStorage.getItem('Author') || item.IsEdit == 1) {
                if (editor.column.startsWith("Day")) {
                  for (let i = 1; i <= 31; i++) {
                    //запрет редактирования для дней которых нет в месяце
                    if (editor.column == ("Day" + i) && i > item.DayCount) { return false; }
                    //отметка 'Н' доступна только для факта, а 1 в факте только определенным ролям
                    else { $$("addStorckTimesheet").getColumnConfig("Day" + i).options = (item.Type == 'план') ? ['1', 'Б', 'О', 'ОСЧ', 'К', ' '] : (item.IsEdit == 1) ? ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] : ['Б', 'О', 'ОСЧ', 'К', 'Н', ' ']; }
                  }
                }
                //столбцы города и дата приема/увольнения рудактируются только в "плане"
                else if (item.Type == 'факт') { return false; };
              }
              else { return false; };
            },
            //сохранение ответов
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              var item = $$("addStorckTimesheet").getItem(editor.row);
              if (state.value != state.old) {
                let type, answer, borned = '01.01.3333'
                switch (editor.column) {
                  case 'DateHire':
                    //"Дата приема"
                    type = 3;
                    answer = webix.i18n.parseFormatStr(state.value);
                    item.DateHire = answer;
                    break;
                  case 'DateDismissal':
                    //"Дата увольнения"
                    type = 4;
                    answer = webix.i18n.parseFormatStr(state.value);
                    item.DateDismissal = answer;
                    break;
                  /*case 'City':
                    //"Город Анкор"
                    type = 5;
                    answer = state.value;
                    break;*/
                  default:
                    //отметка на день
                    type = item.Type == 'план' ? 1 : 2;
                    answer = state.value;
                    const dateParts = item.Borned.split('.');
                    borned = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
                    borned.setDate(borned.getDate() + (editor.column.replace("Day", "") - 1)); //добавляем к началу месяца количество дней выбранного столбца
                    item.SumDay         = (state.value == '1'   || state.old == '1')    ? "<span class='fas fa-sync'></span>" : item.SumDay;
                    item.SickLeave      = (state.value == 'Б'   || state.old == 'Б')    ? "<span class='fas fa-sync'></span>" : item.SickLeave;
                    item.HolidayPaid    = (state.value == 'О'   || state.old == 'О')    ? "<span class='fas fa-sync'></span>" : item.HolidayPaid;
                    item.HolidayNoPaid  = (state.value == 'ОСЧ' || state.old == 'ОСЧ')  ? "<span class='fas fa-sync'></span>" : item.HolidayNoPaid;
                    item.Mission        = (state.value == 'К'   || state.old == 'К')    ? "<span class='fas fa-sync'></span>" : item.Mission;
                    item.Absense        = (state.value == 'Н'   || state.old == 'Н')    ? "<span class='fas fa-sync'></span>" : item.Absense;
                }
                $.ajax({
                  url: '../Services/Desktop.asmx/SetTimesheet',
                  data: JSON.stringify({ 'User': item.UserID, 'Borned': webix.i18n.parseFormatStr(borned), 'Type': type, 'Answer': answer, 'Author': localStorage.getItem('Author') }),
                  success: function (data) { },
                  error: function (xhr, ajaxOptions, thrownError) { onError(); }
                });
              }
            }
          },
          data: data
        }).show();
      }

      // Arive "Выполнение плана продаж"
      if (pageName == 'addAriveSalesPlan') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addAriveSalesPlan');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addAriveSalesPlan", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          scheme: {
            $change: function (item) {
              $$("addAriveSalesPlan").config.columns[5].header[0] = { text: "План продаж на " + item.NameMonth, css: "multiline" };
              $$("addAriveSalesPlan").config.columns[6].header[0] = { text: "Факт продаж на " + item.NameMonth, css: "multiline" };
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
          data: data
        }).show();
      }

      // Traditional trade "Срез Традиции"
      if (pageName == 'addTradeReportShear') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addTradeReportShear');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addTradeReportShear", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "Region", header: ["Регион", { content: "textFilter" }], width: 120, minWidth: 20, sort: "string" },
            { id: "PCM", header: ["Ответственный РСМ", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Distributor", header: [{ text: "Дистрибьютор на территории", css: "multiline" }, { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
            { id: "Period", header: ["Период отчета", { content: "textFilter" }], width: 110, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
            { id: "AllVisits", header: [{ text: "Точек посещено", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answers10509", header: [{ text: "Заполнена инф-ция Шторк", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answers10510", header: [{ text: "Заполнена инф-ция конкуренты", css: "multiline" }, { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answers10507", header: [{ text: "Сделано фото полки", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answers10508", header: [{ text: "Сделано фото кассы", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "Answers10543", header: [{ text: "Кол-во поставленных задач", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "AnswersDistrib", header: [{ text: "Кол-во переданных на дистрибьютора задач", css: "multiline" }, { content: "textFilter" }], width: 170, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "AnswersIsCheckYes", header: [{ text: "Кол-во выполненных задач", css: "multiline" }, { content: "textFilter" }], width: 140, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "AnswersIsCheckNo", header: [{ text: "Кол-во задач с отметкой 'нет'", css: "multiline" }, { content: "textFilter" }], width: 110, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
          ],
          data: data
        }).show();
      }

      //ВинАгро "Отчет по мониторингу"
      if (pageName == 'addVinagroReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
          data: data
        }).show();
      }

      //ВинАгро "Анализ цен"
      if (pageName == 'addVinagroPriceReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroPriceReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroPriceReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
            { id: "Percents", header: ["% превышения/занижения", { content: "textFilter" }], width: 100, minWidth: 70, sort: "int", css: { 'text-align': 'center' }, adjust: "header", cssFormat: function (value) { return value > 0 ? "red_highlight" : value < 0 ? "blue_highlight" : undefined;} }
          ],
          data: data
        }).show();
      }

      //ВинАгро "Эффективность Сотрудников"
      if (pageName == 'addVinagroStaffPerformance') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroStaffPerformance');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroStaffPerformance", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
          data: data
        }).show();
      }

      //ВинАгро "Наличие товара"
      if (pageName == 'addVinagroReportStock') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroReportStock');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroReportStock", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
          data: data
        }).show();
      }

      //ВинАгро "Рейтинг ТТ"
      if (pageName == 'addVinagroRatingStockPoints') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroRatingStockPoints');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroRatingStockPoints", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
                  url: URLname + 'Services/Report.asmx/SetPointVisit',
                  data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Status': 1 }),
                  success: function (data) {
                    setFilterChange();
                    getSetting();

                    pageID = 58;
                    pageName = 'addVinagroReportStock';
                    procName = 'VINAGRO.ReportStock';

                    getAdditionReport();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });

              }
            }
          },
          data: data
        }).show();
      }

      //ВинАгро "Рейтинг SKU"
      if (pageName == 'addVinagroRatingStockArts') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroRatingStockArts');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroRatingStockArts", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
          columns: [
            { id: "ArtID", header: ["ArtID", { content: "textFilter" }], width: 90, minWidth: 90, sort: "int", css: { 'text-align': 'center' } },
            { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 120, minWidth: 120, sort: "string" },
            { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 250, minWidth: 200, sort: "string", css: { 'text-decoration': 'underline' }, 'color': 'blue' },
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
                  url: URLname + 'Services/Report.asmx/SetArtVisit',
                  data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Art': item.ArtID, 'Status': 1 }),
                  success: function (data) {
                    setFilterChange();
                    getSetting();

                    pageID = 58;
                    pageName = 'addVinagroReportStock';
                    procName = 'VINAGRO.ReportStock';

                    getAdditionReport();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });

              }
            }
          },
          data: data
        }).show();
      }

      //Альбакор-Клион "Доля полки"
      if (pageName == 'addAlbacoreReportPartShelf') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addAlbacoreReportPartShelf');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addAlbacoreReportPartShelf", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
            { id: "Execution", header: ["Выполнение", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, cssFormat: function(value) { return value == 'Нет' ? "red_highlight" : undefined; }  },
          ],
          data: data
        }).show();
      }

      //ВинАгро "Мониторинг цен по сетям"
      if (pageName == 'addVinagroNetworkPriceReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroNetworkPriceReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroNetworkPriceReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, pager: "pagerReport",
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
          data: data
        }).show();
      }

      //ВинАгро "Учет визитов"
      if (pageName == 'addVinagroVisit') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroVisit');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroVisit", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "status", header: { content: "masterCheckbox" }, template: "{common.checkbox()}", width: 40 },
            { id: "UserID", header: [(isEng) ? 'User ID' : "ID Сотрудника", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' } },
            { id: "OutCode", header: [(isEng) ? 'Out Code' : "Код АСУ", { content: "textFilter" }], width: 60, sort: "string", css: { 'text-align': 'right' } },
            { id: "UserName", header: [(isEng) ? 'Employee' : "Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
            { id: "OfficeName", header: [(isEng) ? 'Office' : "Офис", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
            { id: "RoleName", header: [(isEng) ? 'Position' : "Должность", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
            { id: "MasterName", header: [(isEng) ? 'Head' : "Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
            { id: "VisitCount", header: [(isEng) ? 'Visits' : "Визитов", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
            { id: "Borned", header: [(isEng) ? 'Last visit' : "Посл. визит", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string", exportType: 'string'}
          ],
          data: data
        }).show();
      }

      //ВинАгро "Отчет по задачам"
      if (pageName == 'addVinagroTasksReport') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroTasksReport');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroTasksReport", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
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
          data: data
        }).show();
      }

      //ВинАгро "Выполнение задач"
      if (pageName == 'addVinagroTasksReportGeneral') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroTasksReportGeneral');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroTasksReportGeneral", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
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

                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': 'ArtBrand', 'User': localStorage.getItem('Author'), 'Text': item.BrandID }),
                  success: function (data) {
                    setFilterChange();
                    getSetting();

                    pageID = 182;
                    pageName = 'addVinagroTasksReport';
                    procName = 'VINAGRO.TasksReport';

                    getAdditionReport();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });

              }
            }
          },
          data: data
        }).show();
      }

      //ВинАгро "Нумерическая дистрибуция"
      if (pageName == 'addVinagroNumericalDistribution') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroNumericalDistribution');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroNumericalDistribution", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "ActionName", header: ["Анкета", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
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
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "ArtReport", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                //выбор анкеты в фильтре
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "ArtReport", 'User': localStorage.getItem('Author'), 'Text': item.ActionID }),
                  success: function (data) {
                    setFilterChange();
                    getSetting();

                    pageID = 228;
                    pageName = 'addVinagroNumericalDistributionList';
                    procName = 'VINAGRO.NumericalDistributionList';

                    getAdditionReport();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }

      //ВинАгро "Качественная дистрибуция"
      if (pageName == 'addVinagroQualitativeDistribution') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addVinagroQualitativeDistribution');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addVinagroQualitativeDistribution", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
          columns: [
            { id: "CategoryName", header: ["Группа", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
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
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "ArtCategory", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                //выбор категории в фильтре
                $.ajax({
                  url: URLname + 'Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "ArtCategory", 'User': localStorage.getItem('Author'), 'Text': item.CategoryID }),
                  success: function (data) {
                    setFilterChange();
                    getSetting();

                    pageID = 228;
                    pageName = 'addVinagroNumericalDistributionList';
                    procName = 'VINAGRO.NumericalDistributionList';

                    getAdditionReport();
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  }
                });
              }
            }
          },
          data: data
        }).show();
      }
      
      //ВинАгро "Нумерическая дистрибуция список" (сводный)
      if (pageName == 'addVinagroNumericalDistributionList') {
        $('#addReportPivot').html('');
        $$('btnExcel').show();
        $$('btnColumn').hide();
        $$('rowPager').hide();

        var structurePivot = {
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

        var fieldPivot = [
          { id: "PointID", value: "ID", type: "number", width: 50 },
          { id: "OfficeName", value: "Офис", type: "text", width: 100 },
          { id: "CityName", value: "Город", type: "text", width: 100 },
          { id: "NetworkName", value: "Сеть", type: "text", width: 90 },
          { id: "Name", value: "Вывеска", type: "text", width: 80 },
          { id: "Address", value: "Адрес", type: "text", width: 250 },
          { id: "ArtName", value: "SKU", type: "text", width: 250 },
          { id: "Answer", value: "", type: "number", width: 250 },
        ];
        $$("VinagroDistribution").parse(data, structurePivot, fieldPivot);
        $$("VinagroDistribution").show();
      }

      //Шторк "Tailor made"
      if (pageName == 'addStorckReportTaliorMade') {
        $('#addReportPivot').html('');
        $('#addReportPivot').show();

        $$('btnExcel').show();
        $$('rowPager').show();
        $$('btnColumn').show();
        hideFields('addStorckReportTaliorMade');

        webix.ui({
          container: "addReportPivot",
          view: "datatable", id: "addStorckReportTaliorMade", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, css: "colorful_table", pager: "pagerReport",
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
          data: data
        }).show();
      }      

    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

var reportReady = {
  view: "datatable", id: "reportReady", select: true, resizeColumn: true, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "Name", header: [(isEng) ? 'Name' : "Наименование", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
    { id: "Start", header: [(isEng) ? 'Start' : "Начало", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
    { id: "Finish", header: [(isEng) ? 'Finish' : "Окончание", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
    { id: "Link", header: [(isEng) ? 'Link' : "Ссылка", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string", css: { 'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer' } },
    { id: "Description", header: [(isEng) ? 'Description' : "Описание", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" }
  ],
  on: {
    onItemClick: function (id) {
      var item = this.getItem(id);
      if (item.Link == '') return;

      window.open(item.Link, "_blank");
    }
  }
}

function getReportReady() {
  showProgress("reportReady");
 
  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetReportReady',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportReady').clearAll();
      $$('reportReady').parse(data.d, "json");

      $$('reportReady').hideProgress();     
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
      $$("navigation").hideProgress();
    },
    complete: function () {

    }
  });
}

var addReportPivot = { 
  view: "template", id: "addReportPivot", content: "addReportPivot", scroll: true
}

function getGeoTracking() {
  
  $.ajax({
    url: URLname + 'Services/Report.asmx/GeoTracking',
    timeout: 300000,
    data: JSON.stringify({ 'User': sessionStorage.getItem('UserTrackID'), 'Borned': sessionStorage.getItem('Borned') }),
    success: function (data) {
      $$('geoTracking').clearAll();
      $$('geoTracking').parse(data.d, "json");

      $$('photoViewerPage').expand();
      $$('accPhotoReport').show();
      $$('visitGeoPage').show();
      $('#mapVisit').show();

      mapInitTracking();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
      $$("navigation").hideProgress();
    },
    complete: function () {

    }
  });
}

// маршруты
function getRoute2(start, finish) {
  showProgress('navigation');

  $.ajax({
    url: '../Services/Desktop.asmx/GetRoute2',
    timeout: 300000,
    data: JSON.stringify({
      'Company': company, 'Start': start, 'Finish': finish, 'User': localStorage.getItem('Author'), 'Flag': routeFlag, 'OfficeName': ''/*$$('RouteOfficeID').getValue()*/, 'RoleName': ''/*$$('RouteRoleID').getValue()*/
    }),
    success: function (data) {
      $$('route2').clearAll();
      $$('route2').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    },
    complete: function () {
      hideProgress('navigation');
    }
  });

}

function setRouteFilterChange2() {
  $.ajax({
    url: URLname + '../Services/Desktop.asmx/GetRouteConfig',
    timeout: 300000,
    data: JSON.stringify({ 'Start': webix.i18n.parseFormatStr($$('StartRoute').getValue()), 'Finish': webix.i18n.parseFormatStr($$('FinishRoute').getValue()) }),
    success: function (data) {

      // установка таблицы
      $$('route2').config.columns = [
        { id: "PointID", header: ['ID ТТ', { content: 'textFilter' }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
        { id: "UserID", header: ["ID сотрудника", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "Extra1", header: ["Доп1", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "CompanyName", header: ["Клиент", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "VisitPlan", header: ["План", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "VisitPlan2", header: ["Визитов", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "FactCount", header: ["Факт", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "FactPercent", header: ["Факт, %", { content: "textFilter" }], width: 50, minWidth: 50, sort: "int", css: { 'text-align': 'center' } },
        { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 50, sort: "string", editor: "text" }
      ];

      var columns = webix.toArray($$('route2').config.columns);

      var list = JSON.parse(data.d);

      for (var i = 0; i < list.length; i++) {
        var obj = list[i];

        columns.insertAt({
          id: obj.id,
          header: [obj.header, { content: "textFilter" }],
          width: obj.width,
          minWidth: obj.minWidth,
          sort: 'string',
          css: (obj.IsHoliday == 1) ? { 'text-align': 'center', 'background-color': '#fff799 !important' } : { 'text-align': 'center' },
          editor: "text",
          footer: obj.Borned
        }, 18);
      }

      $$('route2').refreshColumns();


      // установка таблицы для загрузки
      $$('route2Download').config.columns = [
        { id: "check", header: { content: "masterCheckbox" }, checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40 },
        { id: "data0", header: ["ID ТТ", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "int" },
        { id: "data1", header: ["ID сотрудника", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "int" },
        { id: "data2", header: ["Код ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "data3", header: ["Доп1", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "data4", header: ["Офис", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "data5", header: ["Город", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "data6", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
        { id: "data7", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "data8", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
        { id: "data9", header: ["Руководитель", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "data10", header: ["Сотрудник", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "data11", header: ["Должность", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "data12", header: ["Клиент", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
        { id: "data13", header: ["План", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "data14", header: ["Визитов", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "data15", header: ["Факт", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
        { id: "data16", header: ["Факт, %", { content: "textFilter" }], width: 50, minWidth: 50, sort: "int", css: { 'text-align': 'center' } },
        { id: "data17", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 50, sort: "string" },
      ];

      columns = webix.toArray($$('route2Download').config.columns);

      for (var i = 0; i < list.length; i++) {
        var obj = list[i];

        columns.insertAt({
          id: 'data' + (parseInt(obj.id.replace(new RegExp("Day", 'g'), "").trim()) + 17).toString(),
          header: [obj.header, { content: "textFilter" }],
          width: obj.width,
          minWidth: obj.minWidth,
          sort: 'string',
          css: (obj.IsHoliday == 1) ? { 'text-align': 'center', 'background-color': '#fff799 !important' } : { 'text-align': 'center' },
          footer: obj.Borned
        }, 19);
      }

      $$('route2Download').refreshColumns();

      getRoute2(webix.i18n.parseFormatStr($$('StartRoute').getValue()), webix.i18n.parseFormatStr($$('FinishRoute').getValue()));
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError()
    },
    complete: function () {

    }
  });
}

function SetRoute2(point, role, company, user, borned, value) {
  $.ajax({
    url: '../Services/Desktop.asmx/SetRoute2',
    data: JSON.stringify({
      'Company': localStorage.getItem('CompanyID'), 'Point': point, 'RoleName': role, 'CompanyName': company, 'User': user, 'Borned': borned, 'Value': value
    }),
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({
        type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000
      });
    }
  });
}

function SetRouteDescription2(company, point, user, borned, description) {
  $.ajax({
    url: '../Services/Desktop.asmx/SetRouteDescription',
    data: JSON.stringify({
      'Company': localStorage.getItem('CompanyID'), 'CompanyName': company, 'Point': point, 'User': user, 'Borned': borned, 'Description': description, 'Author': localStorage.getItem('Author')
    }),
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({
        type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000
      });
    }
  });
}

function loadRoute2() {
  list = $$('route2Download');
  listRoute = $$('route2');

  if (list.count() == 0) return;

  showProgress($$('navigation'));

  var interval = setInterval(
    function () {
      var item = list.find(function (obj) {
        return (obj.data0 != null)
      }, true);

      if (item.data0 == null) {
        clearInterval(interval);

        list.refresh();
      }

      var itemRoute = listRoute.find(function (obj) {
        return (obj.PointID == item.data0 && obj.UserID == item.data1 && obj.RoleName == item.data11 && obj.CompanyName == item.data12)
      }, true)

      for (var i = 0; i < list.config.columns.length; i++) {
        if (i == 18) {
          if (itemRoute != null) {
            if (list.getText(item.id, list.columnId(i)) != listRoute.getText(itemRoute.id, listRoute.columnId(i - 1)))
              sendExport('../Services/Desktop.asmx/SetRouteDescription', { 'Company': company, 'CompanyName': item.data12, 'Point': item.data0, 'User': item.data1, 'Borned': list.config.columns[i + 1].footer[0].text, 'Description': item.data17, 'Author': localStorage.getItem('Author') }, list, item, item.id);
            else
              sendExport('../Services/Desktop.asmx/SetRouteDescription', { 'Company': company, 'CompanyName': item.data12, 'Point': item.data0, 'User': item.data1, 'Borned': list.config.columns[i + 1].footer[0].text, 'Description': item.data17, 'Author': localStorage.getItem('Author') }, list, item, item.id);
          }
        }
        else if (i > 18) {
          if (itemRoute != null) {
            if (list.getText(item.id, list.columnId(i)) != listRoute.getText(itemRoute.id, listRoute.columnId(i - 1)))
              sendExport('../Services/Desktop.asmx/SetRoute2', { 'Company': company, 'Point': item.data0, 'RoleName': item.data11, 'CompanyName': item.data12, 'User': item.data1, 'Borned': list.config.columns[i].footer[0].text, 'Value': list.getText(item.id, list.columnId(i)) }, list, item, item.id);
          }
          else
            sendExport('../Services/Desktop.asmx/SetRoute2', { 'Company': company, 'Point': item.data0, 'RoleName': item.data11, 'CompanyName': item.data12, 'User': item.data1, 'Borned': list.config.columns[i].footer[0].text, 'Value': list.getText(item.id, list.columnId(i)) }, list, item, item.id);
        }
      }

      list.remove(item.id);

    },
    200);

  $$('navigation').hideProgress();
}

function onExcelUploadRoute2() {
  list = $$('route2Download');
  listRoute = $$('route2');

  $$('btn-route-download2').hide();
  $$('btn-route-download-run2').show();

  showProgress($$('navigation'));

  for (var id in list.data.pull) {
    var item = list.getItem(id);

    if (item.data0 == "ID ТТ" || item.data0 == "") {
      list.remove(id);
    }
    else {
      var itemRoute = listRoute.find(function (obj) {
        return (obj.PointID == item.data0 && obj.UserID == item.data1 && obj.RoleName == item.data11 && obj.CompanyName == item.data12)
      }, true)

      isNotEdit = true;

      for (var i = 0; i < list.config.columns.length; i++) {
        if (i > 17) {
          if (itemRoute != null) {
            if (list.getText(item.id, list.columnId(i)) != listRoute.getText(itemRoute.id, listRoute.columnId(i - 1))) {
              isNotEdit = false;
              break;
            }
          }
        }
      }

      if (isNotEdit)
        list.remove(id);
    }
  }

  if (list.count() == 0)
    list.showOverlay('Новых или измененных данных не обнаружено.');
  else $$('btn-route-download-run2').show();

  $$('navigation').hideProgress();
}
//фотоПро
var reportPhotoPro = {
  view: "dataview",
  select: true,
  id: "reportPhotoPro",
  type: {
    height: 400
  },
  template: "<img src='#Link#' style='height: 240px'> <br> #NetworkName# #Address# #Borned# #UserName# ",
  on: {
    onItemClick: function (id) {
      var item = this.getItem(id);
      visitList = this;
      showImage(item);
    }
  }
}

function getReportPhotoPro() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Photo',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue(), 'Magic': photoMagic }),
    success: function (data) {
      $$('reportPhotoPro').clearAll();
      $$('reportPhotoPro').parse(data.d);

      //если выбраны "все строки", то их количество равно количеству фото (для корректности отображения)
      if ($$('reportPhotoPro').getPager().config.size == 1000000) {
        $$('reportPhotoPro').getPager().config.size = $$('reportPhotoPro').count();
        $$('reportPhotoPro').refresh();
        //после отображения таблицы, возвращенем общее значение строк при выборе "все строки" (для корректного отображения в других отчетах)
        $$('reportPhotoPro').getPager().config.size = 1000000;       
      }

      if (!$$('reportPhotoPro').count()) {
        webix.extend($$("reportPhotoPro"), webix.OverlayBox);
        $$("reportPhotoPro").showOverlay("<div style='margin:75px; font-size:20px;'>Нет данных по выбранным параметрам</div>");
      } else {
        webix.extend($$("reportPhotoPro"), webix.OverlayBox);
        $$("reportPhotoPro").hideOverlay();
      }

    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function archivePhotoPro() {
  if ($$('reportPhotoPro').count() == 0) return;

  var list = $$('reportPhotoPro');

  var available_images = [];

  for (var i = 0; i < list.count(); i++) {
    var item = list.getItem(list.data.order[i]);

    var name = '';

    if (localStorage.getItem('CompanyID') == 78) {
      name = (item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
        item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        item.ArtName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_'));
    }

    else if (localStorage.getItem('CompanyID') == 279) {
      name = (item.OfficeName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
        item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
        item.Name.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + '_' +
        item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_')) + '_' +
        ((item.CategoryName != '') ? 'ФО ' + item.CategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') + '_' +
        item.VisitDate;
    }

    else {
      name = ((item.status == 1) ? '(скрытo) ' : '') +
        item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
        item.Name.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
        item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        ((item.ActionName == '') ? item.ArtCategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
        ((item.ActionName != '') ? 'Промо-акция ' + item.ActionName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
        ((item.CategoryName != '') ? 'ФО ' + item.CategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
        item.BrandName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ((item.ArtName == '') ? '' : ' ' + item.ArtName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_')) + ' от ' +
        item.VisitDate + ' ' +
        item.Description.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
    }

    name = name.substring(0, 200);

    available_images.push(new AvailableImg(item.Link, name));
  }

  var date = $$('btnPeriod').config.label;

  var producer = localStorage.getItem('CompanyName').replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

  showProgress('navigation');
  //если фото больше 40000, то не формируем архив
  if (list.count() > 40000) {
    alert("Размер архива превышает допустимый размер (40000 фото), пожалуйста выберите период меньше или примените фильтры.");
    $$('navigation').hideProgress();
  }
  //если фото больше 4000, то ссылка на архив будет отправлена на почту (для GFD если больше 500 (у них большой развер фото))
  else if ((list.count() > 4000) || (list.count() > 500 && localStorage.getItem('CompanyID') == 404)) {
    var authorEmail = localStorage.Email

    if (authorEmail == '' || authorEmail === undefined) { //проверка наличия почты
      alert("Размер архива слишком большой. Для отправки ссылки на архив - обратитесь к администратору для регистрации вашего email адреса в системе.");
      $$('navigation').hideProgress();
    }
    else {
      var path = producer + ' ' + date + '.zip';
      path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

      $.ajax({
        url: URLname + 'Services/Archive.asmx/ArchivePhotoListSendEmail',
        data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images, 'archiveName': path, 'userID': localStorage.Author, 'photoCount': list.count() }),
      });

      alert("Размер архива слишком большой, на Вашу почту " + authorEmail + " будет отправлена ссылка для скачивания.");
      $$('navigation').hideProgress();
    }
  }
  //если фото меньше 4000, скачиваем архив сразу в браузере
  else {
    $.ajax({
      url: URLname + 'Services/Archive.asmx/ArchivePhotoList',
      timeout: 120000,
      data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images }),
      success: function (data) {
        var path = producer + ' ' + date + '.zip';
        path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
        window.open('../Archives/' + path, '_self', false);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
      },
      complete: function () {
        $$('navigation').hideProgress();
      }
    });
  }

}

function savePhotoPro() {
  list = $$('reportPhotoPro');

  var selecterID = list.getSelectedId();
  var item = list.getItem(selecterID);

  window.open(item.Link);
}

function zoomPro() {
  photo = 'photofull2';
  elem = $$('photoDivFull2');

  var width = document.getElementById(photo).naturalWidth;
  var height = document.getElementById(photo).naturalHeight;

  var photoWidth = document.getElementById(photo).width;

  if (photoWidth != width) {
    $('img.' + photo).css('width', width).css('height', height);
    $('img.' + photo).parent().parent().css('width', width);

    elem.define('scroll', "xy");
    elem.refresh();
  }
  else
    fix_sizePro(document.getElementById(photo), elem, true);

  $$(elem).scrollTo(0, 0);
}

function fix_sizePro(img, elem, getDim) {
  if (img == null)
    img = document.getElementById('photofull2');

  elem = $$('photoDivFull2');
  if (getDim) {
    get_dim_pro(img, elem);
    return;
  }

  img.onload = function (event) {
    event = event || window.event;
    var img = event.target || event.srcElement;
    get_dim_pro(img, elem);
  }
}

function get_dim_pro(img, elem) {
  var width = elem.$width;
  var height = elem.$height;

  var iWidth = img.naturalWidth;
  var iHeight = img.naturalHeight;

  if (iHeight >= iWidth) {
    img.style.height = height + 'px';
    img.style.width = parseInt(iWidth * (height / iHeight)) + 'px';
  }
  else {
    img.style.width = width + 'px';
    img.style.height = parseInt(iHeight * (width / iWidth)) + 'px';
  }
}

function showImage(item) {
  $$('photoDivFull2').show();
  $$('templateCanvasTestArt').hide();
  
  template2 = "<div><img src='" + item.Link + "' id='photofull2''/></div>";
  $$('photoDivFull2').define('template', template2);
  $$('photoDivFull2').define('scroll', 'false');
  $$('photoDivFull2').refresh();

  $$('lblNetworkName').define('template', '<b> Сеть: </b>' + item.NetworkName);
  $$('lblNetworkName').refresh();

  $$('lblName').define('template', '<b> Вывеска: </b>' + item.Name);
  $$('lblName').refresh();

  $$('lblAdress').define('template', '<b> Адрес: </b>' + item.Address);
  $$('lblAdress').refresh();

  $$('lblBorned').define('template', '<b> Дата: </b>' + item.Borned);
  $$('lblBorned').refresh();

  item.Start != null ? $$('lblStart').show() : $$('lblStart').hide();
  $$('lblStart').define('template', '<b>Начало визита: </b>' + item.Start);
  $$('lblStart').refresh();

  item.Finish != null ? $$('lblFinish').show() : $$('lblFinish').hide();
  $$('lblFinish').define('template', '<b>Окончание визита: </b>' + item.Finish);
  $$('lblFinish').refresh();

  $$('lblUserName').define('template', '<b> Сотрудник: </b>' + item.UserName);
  $$('lblUserName').refresh();

  item.MasterName != '' ? $$('lblMasterName').show() : $$('lblMasterName').hide();
  $$('lblMasterName').define('template', '<b> Руководитель: </b>' + item.MasterName);
  $$('lblMasterName').refresh();

  $$('lblCategory').define('template', '<b> Категория фотоотчета: </b>' + item.CategoryName);
  $$('lblCategory').refresh();

  item.BrandName != '' ? $$('lblBrand').show() : $$('lblBrand').hide();
  $$('lblBrand').define('template', '<b> Бренд: </b>' + item.BrandName);
  $$('lblBrand').refresh();

  item.Description != '' ? $$('lblDescription').show() : $$('lblDescription').hide();
  $$('lblDescription').define('template', '<b> Комментарий: </b>' + item.Description);
  $$('lblDescription').refresh();

  item.ActionName != '' ? $$('lblActionName').show() : $$('lblActionName').hide();
  $$('lblActionName').define('template', '<b> Анкета: </b>' + item.ActionName);
  $$('lblActionName').refresh();

  item.QuestionName != '' ? $$('lblQuestionName').show() : $$('lblQuestionName').hide();
  $$('lblQuestionName').define('template', '<b> Вопрос: </b>' + item.QuestionName);
  $$('lblQuestionName').refresh();

  $$('lblCompany').define('template', '<b> Компания: </b>' + item.CompanyName);
  $$('lblCompany').refresh();

  $$('photoRatingPro').config.hidden = (localStorage.getItem('IsPoint') == '0');
  $$('photoRatingPro').refresh();
  
  pointID = item.PointID;
  photoID = item.PhotoID;
  clientID = item.CompanyID;
  linkPhoto = item.Link;
  borned = item.Borned;
  rating = item.Rating
  oldRating = item.Rating

  GUID = +new Date;

  acceptor = '-1,' + item.UserID + '|';

  //для планограммы
  sessionStorage.setItem('PointID', item.PointID);
  sessionStorage.setItem('Borned', item.Borned);

  if (rating != null) {
    $$('photoRatingPro').setValue(rating);
    $$('photoRatingPro').refresh();
  }

  // если у компании есть распознавание, открывается список найденных SKU
  if (localStorage.getItem('IsRecognize') == 1) {
    $$('freeArea').hide();
    $$('areaRecognize').show();

    // загрузка распознанных SKU
    $.ajax({
      url: URLname + 'Services/AI.asmx/GetArt',
      timeout: 300000,
      data: JSON.stringify({ 'PhotoID': photoID }),
      success: function (data) {
        $$('recSKU').clearAll();
        $$('recSKU').parse(data.d, "json");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
      }
    });
  }
  else {
    $$('freeArea').show();
    $$('areaRecognize').hide();
  }


  $$('photoWind').show();
  fix_sizePro();

  // сохранение информации об открытии фото
  $.ajax({
    url: URLname + 'Services/UI.asmx/SetPhotoLog',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Photo': photoID }),    
  });
}

function showNextImage(list) {
  $$('photoDivFull2').show();
  $$('templateCanvasTestArt').hide();

  if (list == null)
    list = $$('reportPhotoPro');

  var selecterID = list.getSelectedId();
  var nextID = list.getNextId(selecterID);

  if (nextID === undefined)
    return

  var item = list.getItem(nextID);
  list.select(nextID);

  showImage(item);
}

function showPrevImage(list) {
  $$('photoDivFull2').show();
  $$('templateCanvasTestArt').hide();

  if (list == null)
    list = $$('reportPhotoPro');

  var selecterID = list.getSelectedId();
  var prevID = list.getPrevId(selecterID);

  if (prevID === undefined)
    return

  var item = list.getItem(prevID);
  list.select(prevID);

  showImage(item);
}

function onCheckRatingPro(rating) {
  if (photoID != null && photoID != -1 && oldRating != rating) {

    send('SetPhotoRating', { 'ID': photoID, 'Rating': rating, 'User': localStorage.getItem('Author') });

    var list = $$('reportPhotoPro');

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == photoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.Rating = rating;
      list.updateItem(item.id, item);
    }
  }
}

//дашборды
var mainDashboard = {
  id: "mainDashboard", //width: "300", height: "auto",
  rows: [
    {
      cols: [
        {
          rows: [
            //спидометр "Выполнения плана по тт"
            { view: "template", id: "DashPlanPoints", content: "DashPlanPoints", autoheight: true },
            //диаграмма "Выполнения плана по тт"
            {
              view: "chart",
              id: "chartPlanPoints",
              height: 70,
              type: "barH",
              border: false,
              padding: {
                top: 0,
                bottom: 0,
                right: 45,
                left: 60
              },
              legend: {
                values: [{ text: "Всего по маршруту", color: "#4E82BC" }, { text: "Посещено", color: "#92D04F" }, { text: "Не посещено", color: "#EE452F" }],
                valign: "middle",
                align: "right",
                layout: "y",
              },
              series: [
                {
                  value: "#Points#",
                  color: "#4E82BC",
                  label: "#Points#"
                },
                {
                  value: "#Visits#",
                  color: "#92D04F",
                  label: "#Visits#"
                },
                {
                  value: "#NotVisits#",
                  color: "#EE452F",
                  label: "#NotVisits#"
                }
              ],
            },
          ]
        },
        {
          rows: [
            //спидометр "Выполнения плана по визитам"
            { view: "template", id: "DashPlanVisits", content: "DashPlanVisits", autoheight: true },
            //диаграмма "Выполнения плана по визитам"
            {
              view: "chart",
              id: "chartPlanVisits",
              height: 70,
              type: "barH",
              border: false,
              padding: {
                top: 0,
                bottom: 0,
                right: 45,
                left: 60
              },
              legend: {
                values: [{ text: "Всего визитов", color: "#4E82BC" }, { text: "Выполнено", color: "#92D04F" }, { text: "Не выполнено", color: "#EE452F" }],
                valign: "middle",
                align: "right",
                layout: "y",
              },
              series: [
                {
                  value: "#PointsAll#",
                  color: "#4E82BC",
                  label: "#PointsAll#"
                },
                {
                  value: "#VisitsAll#",
                  color: "#92D04F",
                  label: "#VisitsAll#"
                },
                {
                  value: "#NotVisitsAll#",
                  color: "#EE452F",
                  label: "#NotVisitsAll#"
                }
              ],
            },
          ]
        },
        {
          rows: [
            //спидометр "Всего в АП"
            { view: "template", id: "DashPlanAP", content: "DashPlanAP", autoheight: true },
            //диаграмма "Всего в АП"
            {
              view: "chart",
              id: "chartPlanAP",
              height: 70,
              type: "barH",
              border: false,
              padding: {
                top: 0,
                bottom: 0,
                right: 45,
                left: 60
              },
              legend: {
                values: [{ text: "Всего в АП", color: "#4E82BC" }, { text: "Посещено", color: "#92D04F" }, { text: "Не посещено", color: "#EE452F" }],
                valign: "middle",
                align: "right",
                layout: "y",
              },
              series: [
                {
                  value: "#PointsAP#",
                  color: "#4E82BC",
                  label: "#PointsAP#"
                },
                {
                  value: "#VisitsAP#",
                  color: "#92D04F",
                  label: "#VisitsAP#"
                },
                {
                  value: "#NotVisitsAP#",
                  color: "#EE452F",
                  label: "#NotVisitsAP#"
                }
              ],
            },
          ]
        },
      ]
    },
    { height: 20 },
    {
      cols: [
        //график визиты сотрудников по дня
        {
          view: "chart",
          id: "splineVisitsUsers",
          height: 200,
          padding: {
            top: 10,
          },
          type: "spline",
          value: "#VisitsUser#",
          item: {
            borderColor: "#4E82BC",
            color: "#ffffff"
          },
          tooltip: {
            template: "#VisitsUser#"
          },
          line: {
            color: "#4E82BC",
            width: 3
          },
          xAxis: {
            template: "#MonthDay#",
            title: "Активные сотрудники"
          },
          offset: 0,
          yAxis: {
            template: function (obj) {
              return (Number.isInteger(Number(obj)) ? obj.replace(".0", "") : "")
            }
          },
        },
        //график визиты в тт по дням
        {
          view: "chart",
          id: "splineVisitsPoints",
          height: 200,
          padding: {
            top: 10,
          },
          type: "spline",
          value: "#VisitsPoint#",
          item: {
            borderColor: "#4E82BC",
            color: "#ffffff"
          },
          tooltip: {
            template: "#VisitsPoint#"
          },
          line: {
            color: "#4E82BC",
            width: 3
          },
          xAxis: {
            template: "#MonthDay#",
            title: "Посещенные тт"
          },
          offset: 0,
          yAxis: {
            template: function (obj) {
              return (Number.isInteger(Number(obj)) ? obj.replace(".0", "") : "")
            }
          },
        },
      ]
    },
    { height: 20 },
    {
      cols: [
        {
          rows: [
            { view: "label", id: "visitsDay", label: "<span class='dashboard-big'>0</span>", align: "center" },
            { view: "label", label: "Среднее визитов в день", css: { 'text-align': 'center', 'font-weight': 'bold', 'font-size': '35px' } }

          ]
        },
        {
          rows: [
            { view: "label", id: "visitsWeek", label: "<span class='dashboard-big'>0</span>", align: "center" },
            { view: "label", label: "Среднее визитов в неделю", css: { 'text-align': 'center', 'font-weight': 'bold' } }

          ]
        },
        {
          rows: [
            { view: "label", id: "durationDay", label: "<span class='dashboard-big'>0</span>", align: "center" },
            { view: "label", label: "Средняя смена", css: { 'text-align': 'center', 'font-weight': 'bold' } }

          ]
        },
        {
          rows: [
            { view: "label", id: "durationVisit", label: "<span class='dashboard-big'>0</span>", align: "center" },
            { view: "label", label: "Среднее время визита", css: { 'text-align': 'center', 'font-weight': 'bold' } }

          ]
        },
        {
          rows: [
            { view: "label", id: "durationTravel", label: "<span class='dashboard-big'>0</span>", align: "center" },
            { view: "label", label: "Среднее время в дороге", css: { 'text-align': 'center', 'font-weight': 'bold' } }
          ]
        } 
      ]
    },
    {}
  ]
}

 // Получение данных для дашбордам
function getReportDash() {
  showProgress("navigation");

  //данные по спидометрам, диаграмма и лейблам
  $.ajax({
    url: URLname + 'Services/Report.asmx/Run',
    timeout: 300000,
    data: JSON.stringify({ 'Report': 226, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue() }),
    success: function (data) {
      datasetDash = JSON.parse(data.d);
      $$('chartPlanPoints').clearAll();
      $$('chartPlanPoints').parse(data.d);
      $$('chartPlanVisits').clearAll();
      $$('chartPlanVisits').parse(data.d);
      $$('chartPlanAP').clearAll();
      $$('chartPlanAP').parse(data.d);

      $$('visitsDay').define('label', "<span class='dashboard-big'>" + datasetDash[0].VisitsDay + "</span>");
      $$('visitsDay').refresh();
      $$('visitsWeek').define('label', "<span class='dashboard-big'>" + datasetDash[0].VisitsWeek + "</span>");
      $$('visitsWeek').refresh();
      $$('durationDay').define('label', "<span class='dashboard-big'>" + datasetDash[0].DurationDay + "</span>");
      $$('durationDay').refresh();
      $$('durationVisit').define('label', "<span class='dashboard-big'>" + datasetDash[0].DurationVisit + "</span>");
      $$('durationVisit').refresh();
      $$('durationTravel').define('label', "<span class='dashboard-big'>" + datasetDash[0].DurationTravel + "</span>");
      $$('durationTravel').refresh();

      $('#DashPlanPoints').html('');
      $('#DashPlanPoints').show();
      new JustGage({
        id: 'DashPlanPoints',
        title: "Выполнение плана по тт",
        relativeGaugeSize: true,
        symbol: '%',
        counter: true,
        pointer: true,
        customSectors: [{ color: "#EE452F", lo: 0, hi: 50 }, { color: "#FEF833", lo: 50.5, hi: 70 }, { color: "#F9C032", lo: 70.5, hi: 90 }, { color: "#92D04F", lo: 90.5, hi: 100 }],
        value: datasetDash[0].ProcentPoint
      });

      $('#DashPlanVisits').html('');
      $('#DashPlanVisits').show();
      new JustGage({
        id: 'DashPlanVisits',
        title: "Выполнение плана по визитам",
        relativeGaugeSize: true,
        symbol: '%',
        counter: true,
        pointer: true,
        customSectors: [{ color: "#EE452F", lo: 0, hi: 50 }, { color: "#FEF833", lo: 50.5, hi: 70 }, { color: "#F9C032", lo: 70.5, hi: 90 }, { color: "#92D04F", lo: 90.5, hi: 100 }],
        value: datasetDash[0].ProcentVisit
      });

      $('#DashPlanAP').html('');
      $('#DashPlanAP').show();
      new JustGage({
        id: 'DashPlanAP',
        title: "Всего в АП",
        relativeGaugeSize: true,
        symbol: '%',
        counter: true,
        pointer: true,
        customSectors: [{ color: "#EE452F", lo: 0, hi: 50 }, { color: "#FEF833", lo: 50.5, hi: 70 }, { color: "#F9C032", lo: 70.5, hi: 90 }, { color: "#92D04F", lo: 90.5, hi: 100 }],
        value: datasetDash[0].ProcentAP
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
    }
  })

  //данные по графикам
  $.ajax({
    url: URLname + 'Services/Report.asmx/Run',
    timeout: 300000,
    data: JSON.stringify({ 'Report': 227, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': $$('IsLastVisit').getValue() }),
    success: function (data) {
      $$('splineVisitsUsers').clearAll();
      $$('splineVisitsUsers').parse(data.d);
      $$('splineVisitsPoints').clearAll();
      $$('splineVisitsPoints').parse(data.d);

    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  })

}

// справочник по скю
var reportDirectoryArt = {
  view: "datatable", id: "reportDirectoryArt", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string"},
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string"},
    { id: "ArtName", header: ["Наименование", { content: "textFilter" }], width: 300, minWidth: 70, sort: "string"},
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", exportType: 'number', exportFormat: "#" },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtLink", header: ["Ссылка", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtPhotoLink", header: ["Визуализация", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
  ]
}

function getDirectoryArtPointMaps() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/DirectoryArtPointMaps',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportDirectoryArtPointMaps').clearAll();
      $$('reportDirectoryArtPointMaps').parse(data.d);

      hideFields('reportDirectoryArtPointMaps');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// справочник матрица скю в тт
var reportDirectoryArtPointMaps = {
  view: "datatable", id: "reportDirectoryArtPointMaps", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "PointID", header: ["ТТ ID", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "PointName", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 70, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "PointOutCode", header: ["Код АСУ ТТ", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "textFilter" }], width: 250, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", exportType: 'number', exportFormat: "#" },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

function getDirectoryArt() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/DirectoryArt',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportDirectoryArt').clearAll();
      $$('reportDirectoryArt').parse(data.d);

      hideFields('reportDirectoryArt');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// справочник матрица скю по форматам
var reportDirectoryArtFormatMap = {
  view: "datatable", id: "reportDirectoryArtFormatMap", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "textFilter" }], width: 300, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", exportType: 'number', exportFormat: "#" },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

function getDirectoryArtFormatMap() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/DirectoryArtFormatMap',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportDirectoryArtFormatMap').clearAll();
      $$('reportDirectoryArtFormatMap').parse(data.d);

      hideFields('reportDirectoryArtFormatMap');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// справочник матрица скю по сетям
var reportDirectoryArtNetworkMap = {
  view: "datatable", id: "reportDirectoryArtNetworkMap", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  scheme: {
    $change: function (item) {
      if (item.IsArtCompName == '')
        item.$css = "light_blue_highlight";
    }
  },
  columns: [
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtID", header: ["ID SKU", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "CategoryName", header: ["Тов. Группа", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "ArtName", header: ["Наименование", { content: "textFilter" }], width: 300, minWidth: 70, sort: "string" },
    { id: "ArtEAN", header: ["Штрих-код", { content: "textFilter" }], width: 120, minWidth: 70, sort: "string", exportType: 'number', exportFormat: "#" },
    { id: "PLUCode", header: ["PLU код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtCode", header: ["Код", { content: "textFilter" }], width: 90, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "State", header: ["Статус", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "IsArtCompName", header: ["Тип SKU", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
  ]
}

function getDirectoryArtNetworkMap() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/DirectoryArtNetworkMap',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportDirectoryArtNetworkMap').clearAll();
      $$('reportDirectoryArtNetworkMap').parse(data.d);

      hideFields('reportDirectoryArtNetworkMap');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// справочник адресная программа 
var reportDirectoryAP = {
  view: "datatable", id: "reportDirectoryAP", select: true, resizeColumn: true, fixedRowHeight: false, editable: true, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "ID", header: ["ID", { content: "textFilter" }], width: 90, minWidth: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "CityName", header: ["Город", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 300, minWidth: 70, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "FormatName", header: ["ФорматТТ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Lat", header: ["Ширина", { content: "textFilter" }], width: 100, minWidth: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Lon", header: ["Долгота", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string" },
    { id: "StatusTT", header: ["Статус точки", { content: "textFilter" }], width: 150, minWidth: 70, sort: "string", editor: "select", options: ['Обслуживается', 'Не обслуживается', 'Вакансия'] },
    { id: "UserName", header: ["Закрепленные пользователи", { content: "textFilter" }], width: 1000, minWidth: 70, sort: "string" },
  ],  
  on: {    
    onAfterEditStop: function (state, editor, ignoreUpdate) {
      var item = $$("reportDirectoryAP").getItem(editor.row);
      if (state.value != state.old) {
       var status
       //сохранение "СтатутТТ"
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
          
          $$('reportDirectoryAP').render();
        $.ajax({
          url: '../Services/Desktop.asmx/SetPointStatus',
          data: JSON.stringify({ 'PointID': item.ID, 'CompanyID': localStorage.getItem('CompanyID'), 'Status': status, 'Author': localStorage.getItem('Author') }),
          success: function (data) { },
          error: function (xhr, ajaxOptions, thrownError) { onError(); }
        });
      }
    }
  },
     
}     

function getDirectoryAP() {
  showProgress("navigation");
  $.ajax({
      url: URLname + 'Services/Report.asmx/DirectoryAP',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
        $$('reportDirectoryAP').clearAll();
        $$('reportDirectoryAP').parse(data.d);

        hideFields('reportDirectoryAP');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function getMapDashboard() {
  showProgress("navigation");

  // Получение данных для Карты с ТТ (REPORT.MapPointReport)
  $.ajax({
    url: URLname + 'Services/Report.asmx/MapPointReport',
    timeout: 300000,
    data: JSON.stringify({
      'User': localStorage.getItem('Author'),
      'Start': webix.i18n.parseFormatStr($$('Start').getValue()),
      'Finish': webix.i18n.parseFormatStr($$('Finish').getValue())
    }),
    success: function (data) {
      $$('mapDashboard').clearAll();
      $$('mapDashboard').parse(data.d);

      if (!$$('mapDashboard').count())
        $$('mapDashboard').showOverlay("Нет данных по выбранным параметрам");
      else
        $$("mapDashboard").hideOverlay();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
      mapPointDashboard();
    }
  });
}

var mapDashboard = {
  view: "datatable", id: "mapDashboard", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 24, rowHeight: 24, 
  columns: [
    { id: "PointID" },
    { id: "Lat" },
    { id: "Lon" },
    { id: "Color" },
    { id: "NetworkName" },
    { id: "CityName" },
    { id: "Address" }]
}

var standartReportPivot = {
  view: "pivot-load", id: "pivotStandart", mode: "table", locale: { lang: "ru" }, url: "",
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

// ВинАгро "Нумерическая дистрибуция список" (разметка сводный)
var VinagroDistribution = {
  view: "pivot-load", id: "VinagroDistribution", mode: "table", locale: { lang: "ru" }, url: "", // width: 700,
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
}

function saveReport() {
  var table = 'reportTotal';

  var name = $$('reportName').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var description = $$('reportDescription').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var sortOrder = $$('reportSortOrder').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
 
  if (name == '') {
    webix.message({
      type: "error", text: "Введите название отчета", expire: 1000
    });
    return;
  }

  if (description == '') {
    webix.message({
      type: "error", text: "Введите описание отчета", expire: 1000
    });
    return;
  }

  if (sortOrder == 'по порядку' || sortOrder == '') {
    webix.message({
      type: "error", text: "Выберите номер по порядку отчета", expire: 1000
    });
    return;
  }

  $.ajax({
    url: '../Services/Custom.asmx/SetReport',
    data: JSON.stringify({
      'ID': (customReportID == -1) ? null : customReportID, 'Company': localStorage.getItem("CompanyID"), 'Name': name, 'Description': description,
      'SortOrder': sortOrder, 'Status': 1, 'Author': localStorage.getItem('Author')      
    }),
    success: function (data) {
      var result = data.d.split('|');

      if (result[1] != '')
        alert(result[1]);
      else {
        if (result[0] == -1) {
          alert('Ошибка вставки данных!');
        }
        else {
          var reportID = result[0];

          // вставка колонок          
          var sort = 0;
          
          var columns = $$(table).getColumns(true);
          columns.forEach(function (column) {
            if ($$(table).isColumnVisible(column.id)) {
              sort = sort + 1;
              setReportColumn(reportID, column.id, (column.header[1].value == '') ? column.header[0].text : column.header[1].value, sort, column.width, 0);

              column.header[1].value = '';
            }
            else 
              setReportColumn(reportID, column.id, (column.header[1].value == '') ? column.header[0].text : column.header[1].value, sort, column.width, 1);            
          });
          
           // очистка фильтра
          $$(table).eachColumn(function (id, col) {
            var filter = this.getFilter(id);
            if (filter) {
              if (filter.setValue) filter.setValue("")	
              else filter.value = "";					
            }
          });
          $$(table).filterByAll();

          $$(table).clearAll();
          
          $$('saveReport').hide();
          $$('templateInfo').hide();
          $$('editReport').hide();
          $$('reportView').hide();
          $$('reportViewMy').hide();
          $$("btnColumn").hide();
          $$("reportTotal").hide();

          saveHideMode = true;
        }        
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
    complete: function () {
      clearReportFilterAll();
      getSetting();
    }
  });
}

function setReportColumn(report, fieldName, name, sortOrder, width, isHidden) {
  $.ajax({
    url: '../Services/Custom.asmx/SetReportColumn',
    data: JSON.stringify({
      'Report': report, 'FieldName': fieldName, 'Name': name, 'SortOrder': sortOrder, 'Width': width, 'IsHidden': isHidden, 'Author': localStorage.getItem('Author')
    }),
    success: function (data) {
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    }
  });
}

function getCustomReport(report) {
  var table = 'reportTotal';

  // установка колонок отчета
  $.ajax({
    url: '../Services/Custom.asmx/GetReportField',
    timeout: 300000,
    data: JSON.stringify({ 'Menu': report, 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var items = JSON.parse(data.d);
      var arrayColumn = JSON.stringify(JSON.parse(data.d));
      var count = items.length;      

      // сначала оставляем только нужные столбцы
      var columns = $$(table).getColumns(true);
      columns.forEach(function (column) {
        if (arrayColumn.includes(column.id))
          $$(table).showColumn(column.id);
        else
          $$(table).hideColumn(column.id);
      });

      // потом настраиваем видимые
      for (var j = 0; j < items.length; j++) {
        var column = $$(table).getColumnConfig(items[j].FieldName);

        column.header[0].text = items[j].Name;
        column.width = items[j].Width;
        if (items[j].IsHidden)
          $$(table).hideColumn(column.id);

        var columnIndexToMove = $$(table).getColumnIndex(column.id);
        $$(table).moveColumn(columnIndexToMove, items[j].SortOrder);
      }

      $$(table).refreshColumns();      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    }
  });
}

function getTotalReportCustom() {
  showProgress("accPhotoReport");
  $$('editReport').hide();

  $.ajax({
    url: '../Services/Custom.asmx/GetReportTotal',
    timeout: 300000,
    data: JSON.stringify({ 'Report': customReportID, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      if (reportView == 'TABLE') {
        $$('reportTotal').clearAll();
        $$('reportTotal').parse(data.d);                
        
        $$('rowPager').show();
        $$('reportView').hide();
      }      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("accPhotoReport").hideProgress();
    }
  });
}

function editReport() {
  // установка фильтров
  $.ajax({
    url: '../Services/Custom.asmx/SetFilters',
    timeout: 300000,
    data: JSON.stringify({ 'Report': customReportID, 'User': localStorage.getItem('Author') }),
    success: function (data) {  
      var items = JSON.parse(data.d);

      $$("reportName").setValue(items[0].Name);
      $$("reportDescription").setValue(items[0].Description);
      $$("reportSortOrder").setValue(items[0].SortOrder);      

      getSetting();

      $$('saveReport').show();
      $$('templateInfo').show();
      $$('editReport').hide();
      $$("btnColumn").show();

      pageName = 'reportTotal';
      saveHideMode = false;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("accPhotoReport").hideProgress();
    }
  });
}

function deleteReport() {  
  webix.modalbox({
    title: "Подтвердите действие",
    buttons: ["Удалить", "Отмена"],
    text: "Подтвердите удаление отчета",
    callback: function (result) {
      switch (result) {
        case '0':
          $.ajax({
            url: '../Services/Custom.asmx/DeleteReport',
            data: JSON.stringify({
              'Report': customReportID, 'Author': localStorage.getItem('Author')
            }),
            success: function (data) {
              $$('saveReport').hide();
              $$('templateInfo').hide();
              $$('editReport').hide();
              $$('reportView').hide();
              $$('reportViewMy').hide();
              $$("btnColumn").hide();
              $$("reportTotal").hide();

              saveHideMode = true;
            },
            error: function (xhr, ajaxOptions, thrownError) {
              alert(xhr.responseText);
            }
          });
          break;
        case '1':
          break;
      }
    }
  });  
}

function getAccess() {
  $.ajax({
    url: '../Services/Custom.asmx/GetAccess',
    data: JSON.stringify({
      'Report': customReportID, 'User': localStorage.getItem('Author')
    }),
    success: function (data) {
      listUpdate('listReportAccess', 'all', data.d);

      $$('winReportAccess').show($$('buttonAccessReport').$view);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    }
  });
}