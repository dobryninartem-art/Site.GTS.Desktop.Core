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

      list.render();
    }

    list = $$('reportPhotoList');

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == photoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.status = status;
      list.updateItem(item.id, item);

      list.render();
    }
  }
}

var layoutPhoto = {
  id: "layoutPhoto",
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "icon", icon: "arrow-left", label: 'Назад', width: 100, click: "$$('navigation').back()" },
        {
          view: "toggle", type: "icon", id: "btn-hide-photo", offIcon: "eye", onIcon: "eye-slash", offLabel: "Скрыть", onLabel: "Показать", width: 110, hidden: (URLname != '' || localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM'),
          on: {
            onItemClick: function (id, e) {
              onHideButton(this.getValue());
            }
          }
        },
        { },
        {
          view: "button", type: "iconTop", icon: "repeat", width: 50,
          on: {
            onItemClick: function () {
              angle += 90;
              $('img.photofull').css('transform', 'rotate(' + angle + 'deg)');
            }
          }
        },
        { view: "button", type: "iconTop", icon: "map-marker", id: 'btnGeo', width: 50, click: "getGeo()" },
        { view: "button", type: 'iconTop', icon: "flag", id: 'btnCreateTask', width: 50, click: '$$("newTaskText").setValue(""); $$("createTask").show()', hidden: true },
      ]
    },    
    { view: "template", scroll: "xy", id: "photoDiv", template: "<img scr='' id='photofull'/>", type: "clean", autoheight: true },
    {
      borderless: true, height: 60, minHeight: 60, id: 'createTask', hidden: true,
      cols: [
        { view: "textarea", id: 'newTaskText', maxHeight: 400, minHeight: 60, placeholder: "Введите текст задания", type: "clean" },
        {
          view: "button", type: 'imageButton', image: "i/btnSend.png", label: "", width: 60, on: {
            onItemClick: function () {
              var text = $$('newTaskText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

              if (text == '') {
                webix.message({ type: "error", text: "Введите текст задания", expire: 1000 });
                return;
              }

              isTaskEdit = 1;
              $$('taskText').setValue(photoBorned + ': ' + text);

              send('SetPhotoFromReport', { 'User': localStorage.getItem('Author'), 'GUID': GUID, 'PhotoID': photoID }, null, null);
              sessionStorage.setItem(author.toString() + '_' + GUID.toString(), '');

              // получение base64
              $.ajax({
                url: URLname + 'Services/System.asmx/GetPhotoBase64',
                data: JSON.stringify({ 'FileName': pathToPhoto }),
                success: function (data) {
                  if (data.d == null) return;

                  var result = JSON.parse(data.d);

                  if (result.length == 0) return;

                  if (result[0].FileName != "data:,")
                    sessionStorage.setItem(author.toString() + '_' + GUID.toString(), result[0].FileName);
                }
              });

              $$('createTask').hide();
              $$('taskCategory').show();
              isTaskEditReport = 1;
            }
          }
        }
      ]
    },
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", id: 'photoLeft', icon: "angle-double-left", width: 50, click: "showPrevPhoto" },
        { view: "template", id: 'btnPhotoLayer', css: 'text-toolbar', borderless: true, template: "", height: 50 },
        { view: "button", type: 'iconTop', id: 'photoRight', icon: "angle-double-right", width: 50, click: 'showNextPhoto' },
      ]
    }
  ]
}

function zoom() {
  if ($('img.photofull').attr('style') == null || $('img.photofull').attr('style') == 'height: 100vh;') {
    var width = document.getElementById('photofull').naturalWidth;
    var height = document.getElementById('photofull').naturalHeight;

    $('img.photofull').css('width', width).css('height', height);
    $('img.photofull').parent().parent().css('width', width);
  }
  else {
    $('img.photofull').removeAttr('style').css('height', '100vh');
  }

  $$('photoDiv').scrollTo(0, 0);  
}

function getGeo() {
  if (sessionStorage.getItem('photoLat') == null) {
    webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });

    return;
  }

  if (sessionStorage.getItem('photoLat') != 0) {
    mapInit();

    $('#map').show();

    $$('geoMap').show();
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

      //listUpdate('visitDay', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });  
}

function showPhotoReport(photofile, text, borned, point, photo, status) {
  if (photofile.indexOf('data:image/png;base64,') != -1) 
    template = '<div><img class="photofull" src="' + photofile + '" id="photofull" onclick="zoom()"/></div>';
  else template = '<div><img class="photofull" src="' + URLname +  photofile + '" id="photofull" onclick="zoom()"/></div>';   

  $$('photoDiv').define('template', template);
  $$("photoDiv").scrollTo(0, 0);
  $$('photoDiv').refresh();
      
  var address = sessionStorage.getItem('pointAddress');
  if (address == null) address = '';

  $$('btnPhotoLayer').define('template', borned + ' ' + address  + ' ' + text);
  $$('btnPhotoLayer').refresh();

  if (point != -1) {
    $$('btnCreateTask').show();
    
    pointID = point;
    photoID = photo;

    GUID = +new Date;
    imagePhoto = null;

    pathToPhoto = URLname + photofile;
    photoBorned = "Задание по фото от " + borned;
  }

  if (photo != -1) {
    $$('btn-hide-photo').config.hidden = (URLname != '' || localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM');
    $$('btn-hide-photo').refresh();

    $$('photoLeft').show();
    $$('photoRight').show();
  }
  else {
    $$('btn-hide-photo').hide();
    $$('photoLeft').hide();
    $$('photoRight').hide();
  }

  if ($$('btn-hide-photo').isVisible()) {
    if (status == 0)
      $$('btn-hide-photo').setValue(0);
    else $$('btn-hide-photo').setValue(1);
  }
  
  angle = 0;
  $$('createTask').hide();
  $$('layoutPhoto').show();

  if ($$('btn-hide-photo').isVisible()) {
    if (status != null)
      $$('btn-hide-photo').setValue(status);    
  }
}


function toExcel(list) {
  if (list.count() != 0)
   webix.toExcel(list); 
}

function toPDF(list) {
  if (list.count() != 0)
    list.exportToPDF();
}

webix.protoUI({
  name: "activeList"
}, webix.ui.list, webix.ActiveContent);

// отчет по фото
var reportPhoto = {
  id: 'reportPhotos',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'icon', icon: "play", label: 'Применить', width: 150, click: "getPhotoReports" },
        { view: "button", type: 'icon', icon: "external-link-square", label: 'Новый интерфейс', width: 200, click: "top.location.href = 'desktop/app.html'", hidden: (URLname != '') },
        {},
        {
          view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, hidden: (URLname != ''),
          on: {
            onItemClick: function () {
              /*webix.toExcel($$('reportPhoto'), {
                columns: {
                  "status": {
                    header: "Скрыта", width: 60,
                    template: function (obj) {
                      return (obj.status == 1) ? 'Скрыта' : '';
                    },
                  },
                  "PointID": true, "OutCode": true, "Borned": true, "BornedTime": true, "VisitDate": true, "OfficeName": true, "CityName": true, "NetworkName": true,
                  "Name": true, "Address": true, "UserName": true, "MasterName": true, "CompanyName": true, "CategoryName": true, "BrandName": true, "ActionName": true, 
                  "Description": true, "Link": true, "Distance": true, "DistanceText": true
                }
              });*/
            }
          }
        },
        { view: "button", type: 'iconTop', icon: "archive", width: 50, click: "archivePhoto", hidden: (URLname != '') }        
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', borderless: true, height: 40, template: 'Отчет по фото' },
        { view: "button", type: 'iconTop', icon: "list", width: 50, click: "$$('reportPhotoList').show(); $$('searchReportPhotoList').show(); $$('reportPhoto').hide();" },
        { view: "button", type: 'iconTop', icon: "table", width: 50, click: "$$('reportPhoto').show(); $$('reportPhotoList').hide(); $$('searchReportPhotoList').hide();" }
      ]
    },
    {
      view: "search", value: "", placeholder: "Поиск по отчету...", id: 'searchReportPhotoList', type: "clean", hidden: true,
      on: {
        onTimedKeyPress: function () {
          var value = this.getValue().toUpperCase();
          var list = $$('reportPhotoList');

          if ((value == '') || (value.length < 3)) {
            if (value == '') list.filter('');

            return;
          }

          var search = value.split(' ');

          list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[0]) != -1; });
          if (search[1] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[1]) != -1; }, null, true);
          if (search[2] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[2]) != -1; }, null, true);
          if (search[3] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[3]) != -1; }, null, true);
          if (search[4] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[4]) != -1; }, null, true);
          if (search[5] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[5]) != -1; }, null, true);
          if (search[6] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[6]) != -1; }, null, true);
          if (search[7] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[7]) != -1; }, null, true);
          if (search[8] != null)
            list.filter(function (obj) { return obj.FullText.toString().toUpperCase().indexOf(search[8]) != -1; }, null, true);
        }
      }
    },
    {
      view: "datatable", id: "reportPhoto", select: true, hidden: (URLname != ''), resizeColumn: true, editable: true,
      scheme: {
        $init: function (item) {
          if (item.status == 1)
            item.$css = "passive";
          else item.$css = "active";

          if ($.isNumeric(item.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
            item.OutCode = item.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(item.Distance.toString().replace(new RegExp(",", 'g'), "."))) {
            item.Distance = item.Distance.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(item.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
            item.OutCode = item.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
        }
      },
      columns: [
        { id: "status", header: "Скрыть", template: "{common.checkbox()}", width: 50, hidden: (URLname != '' || localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') },
        { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "VisitDate", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "BornedTime", header: ["Время отчета", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CompanyName", header: ["Компания", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CategoryName", header: ["Категория", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtCategoryName", header: ["Категория SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "BrandName", header: ["Бренд", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtName", header: ["SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ActionName", header: ["Промо", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], adjust: "data", minWidth: 90, sort: "string" },
        { id: "Description", header: ["Комментарий", { content: "textFilter" }], adjust: "header", minWidth: 100, editor: "text", sort: "string" },
        { id: "Link", header: ["Ссылка", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Distance", header: ["Расстояние, м", { content: "textFilter" }], adjust: "data", minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
        { id: "DistanceText", header: ["Гео", { content: "textFilter" }], adjust: "data", minWidth: 50, css: { 'text-align': 'center' }, sort: "string" },
        { id: "FlagName", header: ["Источник", { content: "textFilter" }], adjust: "data", minWidth: 90, sort: "string" }
      ],
      on: {
        onItemClick: function (id) {
          if (id.column == "Description")
            return;

          var item = this.getItem(id);
          var taskID = item.ID;

          sessionStorage.setItem('photoLat', item.Lat);
          sessionStorage.setItem('photoLon', item.Lon);
          sessionStorage.setItem('photoError', item.Error);
          sessionStorage.setItem('pointLat', item.PointLat);
          sessionStorage.setItem('pointLon', item.PointLon);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);
          
          showPhotoReport(item.Link, item.Description + ' ' + item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.CategoryName + ' ' + item.ActionName, item.Borned, item.PointID, item.PhotoID, item.status);
        },
        onBeforeEditStart: function(id){
          var item = $$('reportPhoto').getItem(id);
          if (item.AnswerCompanyID != localStorage.getItem("CompanyID"))
            return false;
        },
        onAfterEditStop: function (state, editor, ignoreUpdate) {
          var item = $$("reportPhoto").getItem(editor.row);

          if (state.value != state.old) {
            $$('reportPhoto').render();

            $.ajax({
              url: '../Services/UI.asmx/PhotoDescriptionEdit',
              data: JSON.stringify({'ID': item.ID, 'Description': state.value }),
              success: function (data) {
                
              },
              error: function (xhr, ajaxOptions, thrownError) {
                //onError();
              }
            });
          }
        },
        onCheck: function (id, col, val) {
          var item = $$('reportPhoto').getItem(id);

          item.$css = (val == 0) ? 'passive' : 'active';
          $$('reportPhoto').render();

          send('SetPhotoHide', { 'ID': item.PhotoID, 'Status': val, 'User': localStorage.getItem('Author') }, null, null);
        }
      }
    },
    {
      view: "activeList", id: "reportPhotoList", select: true, type: "line", hidden: (URLname == ''), type: { height: "auto" },
      template: function (obj, common) {
        if (URLname != '' || localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM')
          return '<div class="list-point-item">' +
                   '<div class="reportphoto" style="background: url(' + URLname + obj.Photo + ') no-repeat center center; background-size: 340px 340px;"></div>' +
                   '<div class="list-message-text">' + obj.FullText + '</div>' +
                   '<div class="list-point-item-description">' + obj.Description + '</div>' +
                 '</div>';
        else {
          if (obj.status == 1)
            return '<div class="list-point-item">' +
                   '<div class="reportphoto" style="background: url(' + URLname + obj.Photo + ') no-repeat center center; background-size: 340px 340px;"></div>' +
                   '<div class="list-message-text">' + obj.FullText + '</div>' +
                   '<div class="list-point-item-description">' + obj.Description + '</div>' +
                   common.showButton(obj, common) +
                   '</div>';
          else
            return '<div class="list-point-item">' +
                   '<div class="reportphoto" style="background: url(' + URLname + obj.Photo + ') no-repeat center center; background-size: 340px 340px;"></div>' +
                   '<div class="list-message-text">' + obj.FullText + '</div>' +
                   '<div class="list-point-item-description">' + obj.Description + '</div>' +
                   common.hideButton(obj, common) +
                   '</div>';
        }          
      },            
      activeContent: {
        hideButton: {
          view: "button", type: "icon", icon: "eye", label: "Скрыть", width: 120, 
          on: {
            onItemClick: function (id, e) {
              var item = $$('reportPhotoList').getItem(this.config.$masterId);
              photoID = item.PhotoID;

              onHideButton(1);
            }
          }
        },
        showButton: {
          view: "button", type: "icon", icon: "eye-slash", label: "Показать", width: 120,
          on: {
            onItemClick: function (id, e) {
              var item = $$('reportPhotoList').getItem(this.config.$masterId);
              photoID = item.PhotoID;

              onHideButton(0);
            }
          }
        }
      },
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);
          var taskID = item.ID;
          sessionStorage.setItem('photoLat', item.Lat);
          sessionStorage.setItem('photoLon', item.Lon);
          sessionStorage.setItem('photoError', item.Error);
          sessionStorage.setItem('pointLat', item.PointLat);
          sessionStorage.setItem('pointLon', item.PointLon);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);

          showPhotoReport(item.Link, item.Description + ' ' + item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.CategoryName + ' ' + item.ActionName, item.Borned, item.PointID, item.PhotoID, item.status);
        }
      }
    }
  ]
}

function showPrevPhoto() {
  var list = $$('reportPhoto');
  
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

  showPhotoReport(item.Link, item.Description + ' ' + item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.CategoryName + ' ' + item.ActionName, item.Borned, item.PointID, item.PhotoID, item.status);
}

function showNextPhoto() {
  var list = $$('reportPhoto');
    
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

  showPhotoReport(item.Link, item.Description + ' ' + item.UserName + ', руководитель ' + item.MasterName + ', Компания ' + item.CompanyName + ', ' + item.CategoryName + ' ' + item.ActionName, item.Borned, item.PointID, item.PhotoID, item.status);
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
    
    var name = ((item.status == 1) ? '(скрытo) ' : '') +
               item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ' ' +
               item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
               item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
               ((item.ActionName == '') ? item.CategoryName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
               ((item.ActionName != '') ? 'Промо-акция ' + item.ActionName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' : '') +
               item.BrandName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ((item.ArtName == '') ? '' : ' ' + item.ArtName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_')) + ' от ' +
               item.VisitDate + ' ' +
               item.Description.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

    name = name.substring(0, 200);

    available_images.push(new AvailableImg(item.Link, name));
  }

  var date = $$('menuSetting').getItem(1).Description;

  var producer = localStorage.getItem('CompanyName').replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

  showProgress('navigation');

  $.ajax({
    url: URLname + 'Services/Archive.asmx/ArchivePhotoList',
    timeout: 120000,
    data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images }),
    success: function (data) {
      var path = producer + ' ' + date + '.zip';
      path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
      window.open('Archives/' + path, '_self', false);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr.responseText);
      
    },
    complete: function () {
      $$('navigation').hideProgress();
    }
  });
}

function getPhotoReports() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Photo',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': ($$('reportPhoto').isVisible() ? '0' : null), 'Magic': 'ALL' }),
    success: function (data) {
      $$('reportPhoto').clearAll();
      $$('reportPhoto').parse(data.d);      

      $$('reportPhotoList').clearAll();
      $$('reportPhotoList').parse(data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// отчет по SKU
var reportArt = {
  id: 'reportArts',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'icon', icon: "play", label: 'Применить', width: 150, click: "getArtTotalReport" },
        { view: "button", type: 'icon', icon: "external-link-square", label: 'Новый интерфейс', width: 200, click: "top.location.href = 'desktop/app.html'", hidden: (URLname != '') },
        {},
        { view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, click: "webix.toExcel($$('reportArtList'))", hidden: (URLname != '') }
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', borderless: true, height: 40, template: 'Отчет по SKU' }
      ]
    },
    {
      view: "datatable", id: "reportArtList", select: true, resizeColumn: true,
      scheme:{
        $init: function (obj) {
          if ($.isNumeric(obj.Answer.toString())) {
            obj.Answer = obj.Answer * 1;
          }
          if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.Code.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Code = obj.Code.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.PLUCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.PLUCode = obj.PLUCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }          
          /*if ($.isNumeric(obj.EAN.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.EAN = obj.EAN.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }*/
        }
      },
      columns: [
        { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "VisitDate", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserCompanyName", header: ["Компания сотрудника", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CompanyName", header: ["Компания", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtCategoryName", header: ["Группа", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "BrandName", header: ["Бренд", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtName", header: ["SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Code", header: ["Код SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "EAN", header: ["Штрих-код", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Answer", header: ["Ответ", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Link", header: ["Ссылка на фото", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" }
      ],
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);
          if (item.Link == '') return;

          sessionStorage.setItem('photoLat', item.Lat);
          sessionStorage.setItem('photoLon', item.Lon);
          sessionStorage.setItem('photoError', item.Error);

          sessionStorage.setItem('pointLat', item.PointLat);
          sessionStorage.setItem('pointLon', item.PointLon);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);

          showPhotoReport(item.Link, '', item.Borned, -1, -1);
        }
      }
    },
    {
      view: "datatable", id: "reportArtMain", select: true, hidden: true,
      columns: [
          { id: "Name", header: "Показатель", adjust: "data", minWidth: 100 },
          { id: "PointTotal", header: "Значение", adjust: "data", minWidth: 100, css: { 'text-align': 'center' } },
          { id: "Answer", header: "%", adjust: "data", minWidth: 50, css: { 'text-align': 'center' } }
      ]
    }
  ]
}

function getArtTotalReport() {
  showProgress("navigation");
  
  $.ajax({
    url: URLname + 'Services/Report.asmx/Art',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('reportArtList').clearAll();
      $$('reportArtList').parse(data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// отчет по промо
var reportAction = {
  id: 'reportActions',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'iconButton', icon: "play", label: 'Применить', width: 150, click: "getPromoReport" },
        { view: "button", type: 'iconButton', icon: "external-link-square", label: 'Новый интерфейс', width: 200, click: "top.location.href = 'desktop/app.html'", hidden: (URLname != '') },
        {},        
        { view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, click: "webix.toExcel($$('reportAction'))", hidden: (URLname != '') }
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', id: 'reportActionName', borderless: true, height: 40, template: 'Отчет по анкетам' }
      ]
    },
    {
      view: "datatable", id: "reportAction", select: true, resizeColumn: true,
      scheme: {
        $init: function (obj) {
          if ($.isNumeric(obj.Answer.toString())) {
            obj.Answer = obj.Answer * 1;
          }
          if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.Code.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Code = obj.Code.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.PLUCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.PLUCode = obj.PLUCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.Answer.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Answer = obj.Answer.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
        }
      },
      columns: [
        { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "VisitDate", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserCompanyName", header: ["Компания сотрудника", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CompanyName", header: ["Компания", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ActionName", header: ["Анкета", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtCategoryName", header: ["Группа", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "BrandName", header: ["Бренд", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtName", header: ["SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Code", header: ["Код SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "EANCode", header: ["Штрих-код", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Answer", header: ["Ответ", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Link", header: ["Ссылка на фото", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" }
      ],
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);
          if (item.Link == '') return;

          sessionStorage.setItem('photoLat', item.Lat);
          sessionStorage.setItem('photoLon', item.Lon);
          sessionStorage.setItem('photoError', item.Error);

          sessionStorage.setItem('pointLat', item.PointLat);
          sessionStorage.setItem('pointLon', item.PointLon);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);
          
          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);

          showPhotoReport(item.Link, '', item.Borned, -1, -1);
        }
      }
    }
  ]
}

function getPromoReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Action',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'IsPromo': IsPromo }),
    success: function (data) {
      $$('reportAction').clearAll();
      $$('reportAction').parse(data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// Визиты
var reportVisit = {
  id: 'reportVisits',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'iconButton', icon: "play", label: 'Применить', width: 150, click: "getVisitReport()" },
        { view: "button", type: 'iconButton', icon: "external-link-square", label: 'Новый интерфейс', width: 200, click: "top.location.href = 'desktop/app.html'", hidden: (URLname != '') },
        {},
        { view: "button", type: 'iconTop', icon: "globe", width: 50, click: "mapVisitInit();", hidden: (URLname != '') },
        { view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, click: "webix.toExcel($$('reportVisit'))", hidden: (URLname != '') }
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', borderless: true, height: 40, template: 'Отчет по визитам' }
      ]
    },
    {
      view: "datatable", id: "reportVisit", select: true, resizeColumn: true, fixedRowHeight: false,
      columns: [
        { id: "Borned", header: ["Дата визита", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "VisitDate", header: ["Дата отчета", { content: "textFilter" }], adjust: "data", width: 80, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 80, sort: "string" },
        { id: "Start", header: ["Начало", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
        { id: "GeoTime", header: ["Точн. время", { content: "textFilter" }], adjust: "data", minWidth: 100, css: { 'text-align': 'center' }, sort: "string" },
        { id: "Duration", header: ["Длит.", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
        { id: "Finish", header: ["Окончание", { content: "textFilter" }], adjust: "data", minWidth: 80, css: { 'text-align': 'center' }, sort: "string" },
        { id: "Distance", header: ["Расстояние, начало", { content: "textFilter" }], adjust: "data", minWidth: 130, css: { 'text-align': 'center' }, sort: "string" },
        { id: "IsRoute", header: ["План", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "FlagName", header: ["Источник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Distance2", header: ["Расстояние, окончание", { content: "textFilter" }], adjust: "data", minWidth: 150, css: { 'text-align': 'center' }, sort: "string" },
      ],
      scheme: {
        $init: function (obj) {
          if ($.isNumeric(obj.Distance.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Distance = obj.Distance.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }          
        }
      },
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);
          
          sessionStorage.setItem('photoLat', (item.Lat != 0) ? item.Lat : item.Lat2);
          sessionStorage.setItem('photoLon', (item.Lon != 0) ? item.Lon : item. Lon2);
          sessionStorage.setItem('photoError', (item.Error != 0) ? item.Error : item.Error2);
          sessionStorage.setItem('pointLat', item.PointLat);
          sessionStorage.setItem('pointLon', item.PointLon);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);

          $$('btnTrack').define('label', item.UserName + ' - трекинг за ' + item.Borned); $$('btnTrack').refresh();

          getGeo();
        }
      }
    }
  ]
}

function getVisitReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Visit',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('reportVisit').clearAll();
      $$('reportVisit').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// отчет по промо
var reportTotal = {
  id: 'reportTotals',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'iconButton', icon: "play", label: 'Применить', width: 150, click: "getTotalReport" },
        { view: "button", type: 'iconButton', icon: "external-link-square", label: 'Новый интерфейс', width: 200, click: "top.location.href = 'desktop/app.html'", hidden: (URLname != '') },
        {},
        { view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, hidden: (URLname != ''), click: "webix.toExcel($$('reportTotal'))" }
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', borderless: true, height: 40, template: 'Сводный отчет' }
      ]
    },
    {
      view: "datatable", id: "reportTotal", select: true, resizeColumn: true,
      scheme: {
        $init: function (obj) {
          if ($.isNumeric(obj.Answer.toString().replace(new RegExp(",", 'g'), "."))) {
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
          }
        }
      },
      columns: [
        { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 60, sort: "int", css: { 'text-align': 'right' }, sort: "string" },
        { id: "VisitDate", header: ["Дата визита", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "Borned", header: ["Дата отчета", { content: "textFilter" }], width: 80, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "UserCompanyName", header: ["Компания сотрудника", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "CompanyName", header: ["Компания", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "TypeName", header: ["Тип анкеты", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ActionName", header: ["Наименование анкеты", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtCategoryName", header: ["Группа", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "BrandName", header: ["Бренд", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "ArtName", header: ["SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Code", header: ["Код SKU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "PLUCode", header: ["Код PLU", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Answer", header: ["Ответ", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" },
        { id: "Link", header: ["Ссылка на фото", { content: "textFilter" }], adjust: "data", minWidth: 100, sort: "string" }
      ],
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);
          if (item.Link == '') return;

          sessionStorage.setItem('photoLat', item.Lat);
          sessionStorage.setItem('photoLon', item.Lon);
          sessionStorage.setItem('photoError', item.Error);
          sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

          sessionStorage.setItem('Borned', item.Borned);
          sessionStorage.setItem('UserTrackID', item.UserID);

          showPhotoReport(item.Link, '', item.Borned, -1, -1);
        }
      }
    }
  ]
}

function getTotalReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Total',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Last': null, 'Magic': 'ALL' }),
    success: function (data) {
      $$('reportTotal').clearAll();
      $$('reportTotal').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

// --------------- справочники
var settingid, procName;

function clearElem(id) {
  var item = $$('menuSetting').getItem(id);

  if (item == null) return;

  item.Description = 'все';

  $$('menuSetting').updateItem(id, item);
}

// настройка отчетов
var menuSetting = {
  id: "menuSettings",
  rows: [
   {
     view: "toolbar",
     cols: [
       { view: "button", type: "iconButton", icon: "arrow-left", label: 'Фильтры', click: "$$('navigation').back()" },
       //{ view: "template", css: 'text-toolbar', borderless: true, template: 'Фильтры' },
       {
         view: "button", type: "iconButton", icon: "times-circle", css: 'text-user', label: 'Очистить все', width: 120,
         on: {
           onItemClick: function () {
             webix.confirm({
               title: "Очистить все", ok: "Да", cancel: "Нет",  type: "confirm",
               text: "Очистить все фильтры?",
               callback: function (result) {
                 if (result) {
                   $.ajax({
                     url: URLname + 'Services/Report.asmx/ClearAllFilter',
                     data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
                     success: function (data) {
                       clearElem(10);
                       clearElem(11);
                       clearElem(12);
                       clearElem(13);
                       clearElem(20);
                       clearElem(21);
                       clearElem(30);
                       clearElem(40);
                       clearElem(41);
                       clearElem(50);
                       clearElem(51);
                       clearElem(52);
                     }
                   });

                 }
                 else
                   return false;
               }
             });
           }
         }
       }
     ]
   },
   {
     view: "list", template: "html->item_filter", id: 'menuSetting', select: false,
     data: [
       { id: 1, Name: 'Интервал дат', Description: 'сегодня', Icon: 'clock-o' },

       { id: 10, Name: 'Выбор офисов ТТ', Description: 'все', Icon: 'globe', ProcName: 'Office' },       
       { id: 11, Name: 'Выбор сетей ТТ', Description: 'все', Icon: 'globe', ProcName: 'Network' },
       { id: 12, Name: 'Выбор форматов ТТ', Description: 'все', Icon: 'globe', ProcName: 'Format' },
       { id: 13, Name: 'Выбор ТТ', Description: 'все', Icon: 'globe', ProcName: 'Point' },

       { id: 20, Name: 'Выбор должностей сотрудников', Description: 'все', Icon: 'user', ProcName: 'Role' },
       { id: 21, Name: 'Выбор сотрудников', Description: 'все', Icon: 'user', ProcName: 'Users' },

       { id: 30, Name: 'Выбор компаний', Description: 'все', Icon: 'building', ProcName: 'Company' },

       { id: 40, Name: 'Выбор категорий заданий', Description: 'все', Icon: 'filter', ProcName: 'Category' },
       { id: 41, Name: 'Выбор категорий фото', Description: 'все', Icon: 'filter', ProcName: 'PhotoCategory' },

       { id: 50, Name: 'Выбор товарных групп SKU', Description: 'все', Icon: 'star', ProcName: 'ArtCategory' },
       { id: 51, Name: 'Выбор брендов SKU', Description: 'все', Icon: 'star', ProcName: 'ArtBrand' },
       { id: 52, Name: 'Выбор SKU', Description: 'все', Icon: 'star', ProcName: 'Art' }
     ],
     type: {
       height: "auto",
       itemPhoto: function (obj) {
         return "<div class='menuface' style='background: url(" + obj.Icon + ") no-repeat center center;'></div>";
       }
     },
     on: {
       onItemClick: function (id) {
         var menuItem = this.getItem(id);

         settingid = id;
         procName = menuItem.ProcName;

         if (settingid == 1) {
           $$('periodList').show(); return;
         }
         else getReportDictionary();
       }
     }
   }
  ]
}

// выбор периода для отчетов
var periodList = {
  id: "periodList",
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "arrow-left", width: 50, click: "periodRefresh" },
        { view: "template",  css: 'text-toolbar', borderless: true, template: "Выбор дат" }
      ]
    },
    {
      view: "scrollview", scroll: "y",
      body: {
        rows: [
          { view: "datepicker", id: 'Start', label: 'Начало:', timepicker: false, height: 50, labelWidth: 110 },
          { view: "datepicker", id: 'Finish', label: 'Окончание:', timepicker: false, height: 50, labelWidth: 110 }
        ]
      }
    }
  ]
};

function periodRefresh() {
  var item = $$('menuSetting').getItem(1);
  item.Description = 'C ' + webix.i18n.parseFormatStr($$('Start').getValue()) + ' по ' + webix.i18n.parseFormatStr($$('Finish').getValue());
  $$('menuSetting').updateItem(item.id, item);

  $$('navigation').back();
}

// универсальный список
// список ТТ для отчетов
var listReport = {
  id: 'listReports',
  rows: [
    {
      view: "toolbar",
      cols: [
         { view: "button", type: "iconTop", icon: "fas fa-arrow-left", width: 50, click: "setReportFilter" },
         { view: "button", type: 'iconTop', icon: "far fa-check-square", width: 50, id: 'btnFilter', badge: 0, click: "setAllReportFilter" },
         {
           view: "segmented", multiview: true, value: 1, width: 100, id: 'filter_point',
           options: [
             { id: "1", value: "Мои" },
             { id: "2", value: "Все" }
           ],
           on: {
             onChange: function (newv, oldv) {
               if (newv == 1) {
                 $$('report').filter(function (obj) {
                   return (obj.IsMy == 1);
                 });
               }
               else {
                 $$('report').filter(function (obj) {
                   return (obj.IsMy != -1);
                 });
               }
             }
           }
         },
         {},
         { view: "button", type: 'iconTop', icon: "times-circle", width: 50, click: "clearReportFilter" },
      ]
    },
    {
      view: "search", value: "", placeholder: "Поиск...", id: 'searchReport', type: "clean",
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
      view: "list", id: "report", template: "html->item_checked", select: true, type: "line",
      type: {
        height: "auto",
        Badge: function (obj) {
          if (obj.IsActive == 1) {
            return '<img src="i/btnCheck.png" style="margin:0; padding: 0"/>';
          }
          else return '';
        }
      },
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          item.IsActive = (item.IsActive == 1) ? 0 : 1;
          $$('report').updateItem(id, item);

          badgeReportRefresh(settingid);
        }
      }
    }
  ]
};

function badgeReportRefresh(id, count) {
  if (count == null)
    count = $$('report').find(function (obj) { return (obj.IsActive == 1) }).length;

  $$('btnFilter').define('badge', count);
  $$('btnFilter').refresh();

  // обновляем меню
  var item = $$('menuSetting').getItem(id);
  if (item == null)
    return;

  item.Description = (count == 0) ? 'все' : 'выбрано: ' + count;
  $$('menuSetting').updateItem(item.id, item);
}

// очистка фильтра
function clearReportFilter() {
  var list = $$('report');
  for (var id in list.data.pull) {
    var item = list.getItem(id);

    item.IsActive = 0;
    list.updateItem(id, item);
  }

  badgeReportRefresh(settingid);
}

// выбор справочников
function getReportDictionary() {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetReportDictionary',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'ProcName': procName }),
    success: function (data) {
      listUpdate('report', 'all', data.d);

      badgeReportRefresh(settingid);

      if (settingid == 13) {
        $$('report').filter(function (obj) {
          return (obj.IsMy == 1 || obj.IsActive == 1);
        });

        $$('filter_point').show();
      }
      else $$('filter_point').hide();

      $$('searchReport').setValue('');
      $$('listReports').show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}



// сохранение справочников
function setReportFilter() {
  var list = $$('report');

  showProgress("navigation");

  var row = $$(list).find(function (obj) { return (obj.IsActive == 1) });

  var text = '';

  // сначала полностью очищаем список
  $.ajax({
    url: URLname + 'Services/Report.asmx/SetReportDictionary',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': '', 'ProcName': procName }),
    complete: function () {
      if (row.length == 0) {
        $$("navigation").hideProgress();
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
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': text, 'ProcName': procName })
        });

      $$("navigation").hideProgress();
    }
  });

  badgeReportRefresh(settingid);

  $$('navigation').back();
}

function setAllReportFilter() {
  $$('report').data.each(
    function (item) {
      item.IsActive = 1;

      //$$('report').updateItem(item.id, item);
    }
  );
  $$('report').refresh();

  badgeReportRefresh(settingid);
}

var layoutStandartFile = {
  id: "layoutStandartFile",
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "arrow-left", width: 50, click: "$$('navigation').back()" },
         { view: "template", id: 'btnFileLayer', css: 'text-toolbar', borderless: true },
        {
          view: "button", type: "iconTop", icon: "repeat", width: 50,
          on: {
            onItemClick: function () {
              angle += 90;
              $('img.photofull').css('transform', 'rotate(' + angle + 'deg)');
            }
          }
        }
      ]
    },
    { view: "template", scroll: "xy", id: "fileDiv", template: "<img scr='' id='photofull'/>", type: "clean", autoheight: true },
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "angle-double-left", width: 50, click: "showPrevFile" },
        {},
        { view: "button", type: 'iconTop',  icon: "angle-double-right", width: 50, click: 'showNextFile' },
      ]
    }
  ]
}

function showPrevFile() {
  var list = $$('standartFile');
  var item = list.getItem(list.getPrevId(list.getSelectedId(), 1));

  if (item == null) return;

  list.select(item.id);

  showStandartFile(item.FilePath, standartName);
}

function showNextFile() {
  var list = $$('standartFile');

  var id = list.getSelectedId();
  if (id == "")
    id = list.getFirstId();

  var item = list.getItem(list.getNextId(id, 1));

  if (item == null) return;

  list.select(item.id);

  showStandartFile(item.FilePath, standartName);
}

function showStandartFile(photofile, name) {
  template = '<div><img class="photofull" src="' + URLname + 'admin' + photofile + '" id="photofull" onclick="zoom()"/></div>';

  $$('fileDiv').define('template', template);
  $$("fileDiv").scrollTo(0, 0);
  $$('fileDiv').refresh();

  var address = sessionStorage.getItem('pointAddress');
  if (address == null) address = '';

  $$('btnFileLayer').define('template', name);
  $$('btnFileLayer').refresh();

  angle = 0;
  
  $$('layoutStandartFile').show();
}

function getAddReportPivot() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/' + procName,
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('reportArtList').clearAll();
      $$('reportArtList').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}