function onResizePoint(point) {
  var obj = $$('point').getItem(point);

  if (obj.id == null) return;

  obj.hidden = 1;

  var lastText = obj.LastText;

  // определяем кол-во фотоотчетов
  if (lastText.indexOf("Фoтo") == -1) {
    if ($$('photo').find(function (objPhoto) { return (objPhoto.PointID.toString() == obj.id) }, true).PointID != null)
      lastText = lastText + '<br/>Фoтo';//: ' + count.length;
  }

  // определяем кол-во отчетов
  if (lastText.indexOf("SКU") == -1) {
    if ($$('artAnswer').find(function (objArt) { return (objArt.PointID.toString() == obj.id) }, true).PointID != null)
      lastText = lastText + '<br/>SКU'; //: ' + count.length;
  }

  // определяем кол-во заметок
  if (lastText.indexOf("Зaмeтки") == -1) {
    if ($$('note').find(function (objNote) { return (objNote.PointID.toString() == obj.id) }, true).PointID != null)
      lastText = lastText + '<br/>Зaмeтки';// ' + count.length;
  }

  if (lastText != obj.LastText) {
    obj.LastText = lastText;
    $$('point').updateItem(obj.id, obj);
  }  
}

function afterResizePoint() {
  // пересчитываем badges
  if (mainid != 0) return;

  var count = 0;
  var a = '', symbol = '';

  var elem = $('div[view_id="point"]').find('span.webix_badge').filter(':parent');

  if (elem.filter(":contains('A')").filter(':first').html() != null)
    a = ' A';

  if (elem.filter(":contains('!')").filter(':first').html() != null)
    symbol = ' !';

  elem.each(function () {
    var html = $(this).html();

    if (html != 'A' && html != '!')
      count = count + parseInt(html);
  })

  //$$('point').adjustRowHeight("title");
}

// -----  карта
function mapInit() {
  ymaps.ready(init);
}

function mapTrackingInit() {
  ymaps.ready(initTrack);
}

function mapUserGeoInit() {
  ymaps.ready(initUserGeo);
}

function mapPointGeoInit() {
  ymaps.ready(initPointGeo);
}

function mapVisitInit() {
  ymaps.ready(initVisit);
}



function getDistance(lat1, lon1, lat2, lon2) {
  var radius = 6378135;
  var rad = Math.PI / 180.0;
  //
  var theta = (lon2 * rad) - (lon1 * rad);
  var dist = Math.acos(Math.sin(lat1 * rad) * Math.sin(lat2 * rad) + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.cos(theta));
  if (dist < 0) { dist += Math.PI; }

  var result = Math.round(dist * radius);

  if (result > 1000)
    result = (result / 1000).toFixed(3).toString() + ' км';
  else result = result.toString() + ' м';

  return result;
}

function init() {
  if (myMap != null) myMap.destroy();

  var photoLat = sessionStorage.getItem('photoLat');
  var photoLon = sessionStorage.getItem('photoLon');
  var error = sessionStorage.getItem('photoError');
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = sessionStorage.getItem('pointLat');
  var pointLon = sessionStorage.getItem('pointLon');

  myMap = new ymaps.Map("map", {
    center: [photoLat, photoLon],
    controls: ['zoomControl'],
    zoom: 17
  },
  {
    autoFitToViewport: 'always'
  });
  
  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var photoMarker = new ymaps.Placemark([photoLat, photoLon],
    {
      hintContent: 'Визит ' + address,
      balloonContent: 'Визит по адресу: ' + address
    },
    {
      preset: 'islands#blueDotIcon'
    });

  myMap.geoObjects.add(photoMarker);

  var errorCircle = new ymaps.Circle([[photoLat, photoLon], error], {}, {
    draggable: false,
    fill: false
  });

  myMap.geoObjects.add(errorCircle);

  if (pointLat != 0) {
    var pointMarker = new ymaps.Placemark([pointLat, pointLon],
    {
      hintContent: address,
      balloonContent: 'ТТ по адресу: ' + address
    },
    {
      preset: 'islands#nightDotIcon'
    });

    myMap.geoObjects.add(pointMarker);


    var myPolyline = new ymaps.Polyline([[photoLat, photoLon], [pointLat, pointLon]],
      {
        hintContent: 'расстояние ' + getDistance(photoLat, photoLon, pointLat, pointLon)
      });

    myMap.geoObjects.add(myPolyline);
  }

  //myMap.setBounds(myMap.geoObjects.getBounds());

  myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function () { if (map.getZoom() > 10) map.setZoom(10); });

}

function initTrack() {
  if (myMap != null) myMap.destroy();
  
  var list = $$('track');

  var item = list.getItem(list.getFirstId());
  var startLat = item.Lat;
  var startLon = item.Lon;

  myMap = new ymaps.Map("map", {
    center: [startLat, startLon],
    controls: ['zoomControl'],
    zoom: 16
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var prevLat, prevLon;
  var i = 0, j = 0;

  for (var id in list.data.pull) {
    var item = list.getItem(id);    

    if (item.PointID != -1) {
      i = i + 1;

      var pointMarker = new ymaps.Placemark([item.Lat, item.Lon],
      {
        hintContent: item.Address,
        balloonContent: item.Address,
        iconContent:  i.toString()
      },
      {
        preset: 'islands#nightIcon'
      });

      myMap.geoObjects.add(pointMarker);
    }
    else {
      j = j + 1;
      var photoMarker = new ymaps.Placemark([item.Lat, item.Lon],
      {
        hintContent: item.Address,
        balloonContent: item.Address,
        iconContent: j.toString() + ' - ' + item.Borned
      },
      {
        preset: /*'islands#brownIcon'*/ 'islands#blueStretchyIcon'
      });
      myMap.geoObjects.add(photoMarker);

      if (prevLat != null) {
        var myPolyline = new ymaps.Polyline([[prevLat, prevLon], [item.Lat, item.Lon]], {} );

        myMap.geoObjects.add(myPolyline);
      }

      prevLat = item.Lat;
      prevLon = item.Lon;

      //myMap.geoObjects.add(errorCircle);
     
    }
  }

  myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function () { if (map.getZoom() > 10) map.setZoom(10); });
}




function initVisit() {
  if (myMap != null) myMap.destroy();

  var list = $$('reportVisit');

  var startLat, startLon;

  for (var i = 0; i < list.count() ; i++) {
    var item = list.getItem(list.data.order[i]);

    if (item.Lat != 0) {
      var startLat = item.Lat.toString();
      var startLon = item.Lon.toString();

      break;
    }
  }

  if (startLat == 0 || startLon == null) {
    webix.message({ type: "default", text: "Трекинг сотрудника не определен.", expire: 1000 });

    return;
  }

  $('#map').show();
  $$('geoVisits').show();

  myMap = new ymaps.Map("mapVisit", {
    center: [startLat, startLon],
    controls: ['zoomControl'],
    zoom: 16
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('mapVisit');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var prevLat, prevLon;  
 
  for (var i = 0; i < list.count() ; i++) {
    var item = list.getItem(list.data.order[i]);

    
    if (item.Lat != 0) {
      var photoMarker = new ymaps.Placemark([item.Lat, item.Lon],
      {
        hintContent: item.SortOrder + ". " + item.UserName + "<br/>" + item.Borned + " " + item.Start + "<br/>" + item.Address,
        balloonContent: item.UserName + "<br/>" + item.Address + "<br/>" + item.Borned,
        iconContent: item.SortOrder + ". " + item.UserName + ", " + item.Borned + " " + item.Start + ", " + item.Address
      },
      {
        preset: /*'islands#brownIcon'*/ 'islands#blueStretchyIcon'
      });
      myMap.geoObjects.add(photoMarker);
    }

  }
  
  myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function () { if (map.getZoom() > 10) map.setZoom(10); });
}







function initUserGeo() {
  if (myMap != null) myMap.destroy();

  var photoLat = sessionStorage.getItem('photoLat');
  var photoLon = sessionStorage.getItem('photoLon');
  var error = sessionStorage.getItem('photoError');
  
  myMap = new ymaps.Map("map", {
    center: [photoLat, photoLon],
    controls: ['zoomControl'],
    zoom: 18
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.controls.add('zoomControl');

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var photoMarker = new ymaps.Placemark([photoLat, photoLon],
    {
      hintContent: 'Геокоординаты сотрудника',
      balloonContent: 'Геокоординаты сотрудника'
    },
    {
      preset: 'islands#blueDotIcon'
    });

  var errorCircle = new ymaps.Circle([[photoLat, photoLon], error], {}, {
    draggable: false,
    fill: false
  });

  myMap.geoObjects.add(errorCircle);
  myMap.geoObjects.add(photoMarker);  
}

function initPointGeo() {
  if (myMap != null) myMap.destroy();

  var Lat = sessionStorage.getItem('pointLat');
  var Lon = sessionStorage.getItem('pointLon');
  
  if (Lat == null || Lat == 0) {
    var geocoder = ymaps.geocode(sessionStorage.getItem('pointAddress'), { results: 1 });

    geocoder.then(function (res) {
      if (res.geoObjects.getLength()) {
        var point = res.geoObjects.get(0);

        sessionStorage.setItem('pointLat', point.geometry.getCoordinates()[0]);
        sessionStorage.setItem('pointLon', point.geometry.getCoordinates()[1]);

        getPointGeo(sessionStorage.getItem('pointLat'), sessionStorage.getItem('pointLon'));        
      }      
    });
  }
  else getPointGeo(Lat, Lon);  
}

function getPointGeo(Lat, Lon) {
  myMap = new ymaps.Map("mapPoint", {
    center: [Lat, Lon],
    controls: ['zoomControl'],
    zoom: 17
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.controls.add('zoomControl');

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('mapPoint');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();


  var placemark = new ymaps.Placemark([Lat, Lon], { iconContent: '',  hintContent: sessionStorage.getItem('pointAddress'), balloonContent: sessionStorage.getItem('pointAddress')}, {
    iconImageHref: 'i/placemark.png',
    iconImageSize: [26, 26],
    iconImageOffset: [-3, -26],
    draggable: (localStorage.getItem('IsRoute') == 1)
  });
  myMap.geoObjects.add(placemark);

  placemark.events.add('dragend', function (e) {
    lat = placemark.geometry.getCoordinates()[0];
    lon = placemark.geometry.getCoordinates()[1];

    sessionStorage.setItem('pointLat', lat);
    sessionStorage.setItem('pointLon', lon);   
  });

  myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function () { if (map.getZoom() > 10) map.setZoom(10); });
}

function setInterfaceQuestion(element, answer) {
  //$$('answerYesNo').hide();  
  $$('answerFloat').hide();
  $$('answerText').hide();

  $$(element).setValue(answer);
  $$(element).refresh();
 

  $$(element).show();

  $$('answerArea').show();

  if (element == 'answerFloat') $('div.webix_layout_line').find('input:first').focus();
  if (element == 'answerText') $('div.webix_layout_line').find('textarea:first').focus();
  if (element == 'answerDate') $('div.webix_layout_line').find('textarea:first').focus();

  /*if (element == 'answerYesNo')
    $$(element).getList();*/
}

function setInterfaceList(question, name) {
  $$('answerArea').hide();

  $$('btnArtAnswerOption').define('template', name);
  $$('btnArtAnswerOption').refresh();

  getOptionList(question);
}

function setQuestionAnswer(item, point, action, art, question) {
  item.Answer = '';
  item.Photo = null;
  item.Lat = 0;
  item.Lon = 0;
  item.Error = 0;

  if ($$('artAnswer').count() != 0) {
    var row = $$('artAnswer').find(function (obj) { return (obj.PointID.toString() == point && obj.ActionID.toString() == action && obj.ArtID.toString() == art && obj.QuestionID.toString() == question) });

    if (row.length != 0) {

      for (var i = 0; i < row.length; i++)
        item.Answer = (item.Answer == '') ? row[i].Answer : (item.Answer + ', ' + row[i].Answer);

      item.Photo = row[0].Photo;
      item.Lat = row[0].Lat;
      item.Lon = row[0].Lon;
      item.Error = row[0].Error;
    }
  }
  

  $$('question').updateItem(item.id, item);
}

function artGroup(id) {
  if (id == 1) {
    $$('art').ungroup();
  }
  if (id == 2) {
    $$('art').define({
      templateBack: "<span class='artitem-group'>Бренд: #value#</span>",
      templateGroup: "<span class='artitem-group'> Бренд: #value#</span>"
    });

    $$('art').group({ by: "BrandName" });
  }

  if (id == 3) {
    $$('art').define({
      templateBack: "<span class='artitem-group'>Группа: #value#</span>",
      templateGroup: "<span class='artitem-group'> Группа: #value#</span>"
    });

    $$('art').group({ by: "CategoryName" });
  }
}

function findPoint(value, isMy) {
  var list = $$('point');  

  isMy = (isMy == 0) ? -2 : 1;

  if ((value == '') || (value.length < 3)) {
    if (value == '') {
      if (isMy == -2)
        list.filter(function (obj) { return (obj.LastText.toString() != '' || (obj.IsMy == 1 && obj.IsRoute != '') ) });
      else 
        list.filter(function (obj) { return obj.IsMy == isMy || obj.LastText.toString() != '' });

      list.hideOverlay();

      list.sort('#SortOrder#', 'asc', 'int');
      list.refresh();

      return;
    }

    //list.filter(function (obj) { return obj.IsMy == isMy || obj.LastText.toString() != '' });

    list.sort('#SortOrder#', 'asc', 'int');
    list.refresh();

    list.hideOverlay();
    
    return;
  }

  var search = value.split(' ');

  list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[0]) != -1) });
  if (search[1] != null)
    list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[1]) != -1) }, null, true);
  if (search[2] != null)
    list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[2]) != -1) }, null, true);
  if (search[3] != null)
    list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[3]) != -1) }, null, true);
  if (search[4] != null)
    list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[4]) != -1) }, null, true);
  if (search[5] != null)
    list.filter(function (obj) { return (obj.Address.toString().toUpperCase().indexOf(search[5]) != -1) }, null, true);

  if (list.data.count() == 0) {
    if ((localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'CLIENT_EXECUTOR' || localStorage.getItem('Magic') == 'TEAM') && (localStorage.getItem('IsPoint') == 1))
      //list.showOverlay('ТТ не найдены.<br/><br/><input type="button" value="Нажмите, чтобы создать ТТ" onclick="addNewPoint()" />');
      list.showOverlay('ТТ не найдены');
    else list.hideOverlay();
  }
  else list.hideOverlay();

  list.sort('#SortOrder#', 'asc', 'int');
  list.refresh();
}

function findTaskPoint(value) {
  var list = $$('taskPoint');

  if ((value == '') || (value.length < 3)) {
     list.filter('');
     list.refresh();

      return;    
  }

  var search = value.toUpperCase().split(' ');

  list.filter(function (obj) {
    return (obj.Name.toString().toUpperCase().indexOf(search[0]) != -1 || obj.ID == -1)
  });

  if (search[1] != null)
    list.filter(function (obj) { return (obj.Name.toString().toUpperCase().indexOf(search[1]) != -1 || obj.ID == -1) }, null, true);
  if (search[2] != null)
    list.filter(function (obj) { return (obj.Name.toString().toUpperCase().indexOf(search[2]) != -1 || obj.ID == -1) }, null, true);
  if (search[3] != null)
    list.filter(function (obj) { return (obj.Name.toString().toUpperCase().indexOf(search[3]) != -1 || obj.ID == -1) }, null, true);
  if (search[4] != null)
    list.filter(function (obj) { return (obj.Name.toString().toUpperCase().indexOf(search[4]) != -1 || obj.ID == -1) }, null, true);
  if (search[5] != null)
    list.filter(function (obj) { return (obj.Name.toString().toUpperCase().indexOf(search[5]) != -1 || obj.ID == -1) }, null, true);
  
  list.refresh();
}

function findTask(value) {
  if (pointID != -1) return;

  var list = $$('task');

  var user = localStorage.getItem('Author');

  if ((value == '') || (value.length < 3)) {  

    list.filter('');
    // сортировка
    $$('task').sort('#id#', 'asc', 'int');
    $$('task').refresh();

    return;
  }

  var search = value.split(' ');
  
  list.filter(function (obj) { return ((obj.Address.toString().toUpperCase().indexOf(search[0]) != -1 || obj.Text.toString().toUpperCase().indexOf(search[0]) != -1)) });
  if (search[1] != null)
    list.filter(function (obj) { return ((obj.Address.toString().toUpperCase().indexOf(search[1]) != -1 || obj.Text.toString().toUpperCase().indexOf(search[0]) != -1)) }, null, true);
  if (search[2] != null)
    list.filter(function (obj) { return ((obj.Address.toString().toUpperCase().indexOf(search[2]) != -1 || obj.Text.toString().toUpperCase().indexOf(search[0]) != -1)) }, null, true);
  if (search[3] != null)
    list.filter(function (obj) { return ((obj.Address.toString().toUpperCase().indexOf(search[3]) != -1 || obj.Text.toString().toUpperCase().indexOf(search[0]) != -1)) }, null, true);
  if (search[4] != null)
    list.filter(function (obj) { return ((obj.Address.toString().toUpperCase().indexOf(search[4]) != -1 || obj.Text.toString().toUpperCase().indexOf(search[0]) != -1)) }, null, true);  

  // сортировка
  $$('task').sort('#id#', 'asc', 'int');
  $$('task').refresh();
}

function getUserProfile() {
  showProgress("menulist");

  $.ajax({
    url: URLname + 'Services/UI.asmx/GetUsers',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var result = JSON.parse(data.d);

      $$("menulist").hideProgress();
     
      

      if (result.length == 0) return;

      $$('lname').setValue(result[0].LName); $$('lname').refresh();
      $$('fname').setValue(result[0].FName); $$('fname').refresh();
      $$('mname').setValue(result[0].MName); $$('mname').refresh();
      $$('rolename').setValue(result[0].RoleName); $$('rolename').refresh();

      if (result[0].Photo == '')
        $$('fileName').define("template", "<div class='facebig' style='background: url(i/noPhoto.jpg) no-repeat center center; background-size: 150px 150px;'></div>");
      else {
        var photo = result[0].Photo.replace(new RegExp("_ico", 'g'), "");

        $$('fileName').define("template", "<div class='facebig' style='background: url(" + URLname + photo + ") no-repeat center center; background-size: 150px 150px;'></div>");
      }

      $$('fileName').refresh();

      $$('userInfo').show();
      $$('userInfo-header').show();
      return;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $$("menulist").hideProgress();
    }
  });
}


function visitBack() {
  taskID = -1;
  $('#btnAddTask').hide();

  var isPoint = $$("multiVisit").getActiveId();
  
  var element = '';

  switch (isPoint) {
    case 'point-menu':
      element = 'pointLine'; break;   
    default:
      element = 'point-menu';            
  }

  if (element == 'pointLine') {
    if (isVisit == 1) {

      var itemSetting = $$('companySetting').getItem(2);
      if (itemSetting != null) {
        if (itemSetting.status == 1) {
          Visit(null);
        }
        else $$(element).show();
      }
      else $$(element).show();
    }
    else $$(element).show();
  }
  else $$(element).show();
}

function validate(value) {
  val = value.replace(/[^\d,.]*/g, '')
                       .replace(/([,.])[,.]+/g, '$1')
                       .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
  if (val != value || value == '') {
    $$('answerFloat').setValue(val);
    $$('answerFloat').refresh();
    $$('answerFloat').focus();
  }
}

function _setChatBadge(obj) {
  var flagText = '';
  var badge = '';

  // определяем кол-во новых для меня сообщений
  var count = $$('chat').find(function (objChat) { return (objChat.AcceptorID.toString() == obj.id && objChat.IRead == 0) });
    
  obj.Badge = count.length;

  $$('chatAcceptor').updateItem(obj.id, obj);
}

function setChatBadge() {
  for (var id in $$('chatAcceptor').data.pull) {
    _setChatBadge($$('chatAcceptor').getItem(id));
  }
}

function savePointGeo() {
  var item = $$('point').getItem(pointID);

  if (item != null)
    if (localStorage.getItem('IsRoute') == 1) {
      if (item.Lat != sessionStorage.getItem('pointLat') || item.Lon != sessionStorage.getItem('pointLon')) {
        item.Lat = sessionStorage.getItem('pointLat');
        item.Lon = sessionStorage.getItem('pointLon');

        $$('point').updateItem(item.id, item);

        var pointmenu = $$('point-menu').getItem(300);

        if (sessionStorage.getItem('pointLat') == 0)
          pointmenu.Description = 'Определить местоположение';
        else
          pointmenu.Description = '';

        $$('point-menu').updateItem(300, pointmenu);

        $.ajax({
          url: URLname + '/Services/UI.asmx/SetPointGeo',
          data: JSON.stringify({ 'Point': pointID, 'Lat': sessionStorage.getItem('pointLat'), 'Lon': sessionStorage.getItem('pointLon') }),
          success: function (data) {

          },
          error: function (xhr, ajaxOptions, thrownError) {
            //webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
          }
        });
      }
    }

  if (myMap != null)
    myMap.destroy();
  $$('navigation').back();
}

