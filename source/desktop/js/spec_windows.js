// ----- Здесь указываем разметку уникальных окон


// -------------------- Функционал Карта покрытия
function mapPointDashboard(list) {
  // контейнер для карты
  var mapContainer = document.getElementById('map');  

  // обработка данных
  var locations = []
  var names = []
  var addresses = []
  var colors = []
  var markersBounds = new google.maps.LatLngBounds();

  for (var i = 0; i < list.length; i++) {
    var item = list[i];

    locations.push({ lat: item.Lat, lng: item.Lon });
    names.push({ name: item.NetworkName });
    addresses.push({ address: item.Address });
    colors.push({ color: item.Color })

    markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lon));
  }
  
  var notInWork = 0;
  for (var i = 0; i < colors.length; i++) {
    if (colors[i].color === '/res/red.png')
      notInWork++;
  }

  var notServiced = 0;
  for (var i = 0; i < colors.length; i++) {
    if (colors[i].color === '/res/grey.png')
      notServiced++;
  }

  var Serviced = 0;
  for (var i = 0; i < colors.length; i++) {
    if (colors[i].color === '/res/green.png')
      Serviced++;
  }

  // отключение всех лишних значков на карте
  var noPoi = [{ featureType: "poi", stylers: [{ visibility: "off" }] }];

  // установка параметров карты
  var map = new google.maps.Map(mapContainer, {
    zoom: 6,
    mapTypeControl: false,
    styles: noPoi,
    center: { lat: locations[0].lat, lng: locations[0].lng }
  });

  // создание всех маркеров
  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      optimized: true,
      icon: colors[i].color,
      map: map,
      clickable: true,
      title: names[i].name + ', ' + addresses[i].address
    });
  });

  // создание информационного окна для каждого маркера
  var info = new google.maps.InfoWindow();
  for (let i = 0; i < markers.length; i++) {
    google.maps.event.addListener(markers[i], 'click', function () {
      info.__proto__.close;
      info.setContent('Вывеска: ' + names[i].name + '<br>' +
        'Адрес: ' + addresses[i].address);
      info.open(map, this);
    });
  };

  // создание иконок для легенды
  var icons = {
    connected: {
      name: 'Обслуживается (' + Serviced + ')',
      icon: '/res/green.png'
    },
    notservic: {
      name: 'Не обслуживается (' + notServiced + ')',
      icon: '/res/grey.png'
    },
    notconnected: {
      name: 'Вакансия (' + notInWork + ')',
      icon: '/res/red.png'
    }
  };

  // создание легенды
  var legend = document.createElement('div');
  legend.id = 'legend';

  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);

  // параметры кластеров
  mcOptions = {
    maxZoom: 8,
    styles: [{
      textColor: 'white',
      url: '/res/cluster.png',
      height: 48,
      width: 48
    },]
  }

  //// создание кластеров
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers, mcOptions });
  map.fitBounds(markersBounds);
}

function getmapDashboard(menuID, report, procName, reportName) {
  var win_id = report + '|' + menuID;

  var start = webix.i18n.parseFormatStr($$('Start').getValue());
  var finish = webix.i18n.parseFormatStr($$('Finish').getValue())

  $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
  $$('btnPeriod').define('tooltip', '');
  $$('btnPeriod').refresh();

  $$("task_" + win_id).define("tooltip", reportName + " (" + start + '-' + finish + ")");
  $$("task_" + win_id).refresh();

  // Получение данных для Карты с ТТ
  $.ajax({
    url: '../../Services/Framework.asmx/SetUserCompany',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $.ajax({
        url: '../../Services/Framework.asmx/Run',
        timeout: 300000,
        data: JSON.stringify({ 'Menu': menuID, 'BaseName': 'GTS', 'ProcName': procName, 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish, 'Last': null, 'ReportMagic': null }),
        success: function (data) {
          var data = JSON.parse(data.d);
          if (data.length == 0)
            return;

          $('#map').show();

          mapPointDashboard(data);
        },
        complete: function () {
          $$(report).hideProgress();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr);
        }
      });
    },    
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });  
}

var mapDashboard = {
  rows: [
    { view: "template", content: "map" }    
  ]  
}
// -- конец Функционал Карта покрытия


// -------------------- Функционал Просмотр координат визита
function getvisitGeo(menuID, report, procName, reportName) {
  $('#mapVisit').show();

  var photoLat = Number(sessionStorage.getItem('photoLat'));
  var photoLon = Number(sessionStorage.getItem('photoLon'));
  //var error = Number(sessionStorage.getItem('photoError'));
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = Number(sessionStorage.getItem('pointLat'));
  var pointLon = Number(sessionStorage.getItem('pointLon'));

  var mapContainer = document.getElementById('mapVisit');


  myMap = new google.maps.Map(mapContainer, {
    zoom: 17,
    center: new google.maps.LatLng(photoLat, photoLon)
  });

  var markersBounds = new google.maps.LatLngBounds();

  var photoMarker = new google.maps.Marker({
    position: { lat: photoLat, lng: photoLon },
    map: myMap,
    label: 'Визит',
    title: 'Координаты визита: ' + address
  });

  markersBounds.extend(new google.maps.LatLng(photoLat, photoLon));

  if (pointLat != 0) {
    var pointMarker = new google.maps.Marker({
      position: { lat: pointLat, lng: pointLon },
      map: myMap,
      label: 'ТТ',
      title: 'ТТ по адресу: ' + address
    });

    markersBounds.extend(new google.maps.LatLng(pointLat, pointLon));

    var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    var flightPath = new google.maps.Polyline({
      path: [{ lat: photoLat, lng: photoLon }, { lat: pointLat, lng: pointLon }],
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 1,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }],
    });

    flightPath.setMap(myMap);
  }

  myMap.setCenter(markersBounds.getCenter(), myMap.fitBounds(markersBounds));  
}

var visitGeo = {
  rows: [
    {
      view: "toolbar", id: "toolbarGeoTracking",
      cols: [
        { view: "label", label: (isEng) ? 'Tracking' : 'Трекинг', width: 55 },
        { view: "icon", icon: "fas fa-street-view", click: "getGeoTracking()" },
        { view: "list", id: "geoTracking", hidden: true },
        {},
      ]
    },
    { view: "template", content: "mapVisit" }
  ]
}

//просмотр трекинга визитов
function getGeoTracking() {
  $.ajax({
    url: '../Services/Report.asmx/GeoTracking',
    timeout: 300000,
    data: JSON.stringify({ 'User': sessionStorage.getItem('UserTrackID'), 'Borned': sessionStorage.getItem('Borned') }),
    success: function (data) {
      $$('geoTracking').clearAll();
      $$('geoTracking').parse(data.d, "json");
      $('#mapVisit').show();

      initTracking();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
      $$("navigation").hideProgress();
    },
    complete: function () {

    }
  });
}

function initTracking() {
  var list = $$('geoTracking');
  if (list.data.count() == 0) return;

  try { if (myMap != null) myMap.destroy(); }
  catch (err) {}

  var pointLat = Number(sessionStorage.getItem('pointLat'));
  var pointLon = Number(sessionStorage.getItem('pointLon'));
  var mapContainer = document.getElementById('mapVisit');

  myMapTracking = new google.maps.Map(mapContainer, {
    zoom: 17,
    center: new google.maps.LatLng(pointLat, pointLon)
  });

  var markersBounds = new google.maps.LatLngBounds();

  var prevLat = 0, prevLon = 0

  for (var id in list.data.pull) {
    var item = list.getItem(id);

    markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lon));

    if (item.PointID != -1) {
      pointLapel = (item.SortOrder != null) ? item.SortOrder : 'ТТ';
      var pointMarker = new google.maps.Marker({
        position: { lat: item.Lat, lng: item.Lon },
        map: myMapTracking,
        label: pointLapel + '',
        title: 'ТТ по адресу: ' + item.Address + ', ' + item.StartGeo + ((item.FinishGeo == '') ? '' : '-' + item.FinishGeo)
      });
    }
    else {
      var pointMarker = new google.maps.Marker({
        position: { lat: item.Lat, lng: item.Lon },
        map: myMapTracking,
        label: {
          text: (item.StartGeo == item.FinishGeo) ? item.StartGeo : item.StartGeo + '-' + item.FinishGeo,
          color: 'black',
          fontSize: "10px"
        },
        title: '',
        icon: {
          url: "images/markers/svg/Arrow_3.svg",
          scaledSize: new google.maps.Size(8, 8)
        }
      });

      if (prevLat != 0) {
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

        var flightPath = new google.maps.Polyline({
          path: [{ lat: prevLat, lng: prevLon }, { lat: item.Lat, lng: item.Lon }],
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 0.9,
          strokeWeight: 1,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
        });

        flightPath.setMap(myMapTracking);
      }

      prevLat = item.Lat;
      prevLon = item.Lon;
    }
  }

  myMapTracking.setCenter(markersBounds.getCenter(), myMapTracking.fitBounds(markersBounds));
}
// -- конец Функционал Просмотр координат визита


// -------------------- Функционал Просмотр фото
var currentPhotoID, currentPhotoList;
var pointID, clientID, linkPhoto, borned, rating, oldRating, GUID, acceptor;

var ratingValues = ["-", "1", "2", "3", "4", "5"];

if (localStorage.getItem('CompanyID') == 218)
  ratingValues = ["-", "0", "0,5", "0,8", "1,0", "1,2"];

var photoInfo = {
  cols: [
    {
      minWidth: 400,
      rows: [
        {
          cols: [
            {
              cols: [
                { view: "icon", icon: "fas fa-save", tooltip: "Сохранить фото", click: "savePhotoPro()"  },
                { view: "icon", icon: "fas fa-search-plus", tooltip: "Увеличить фото", click: "zoomPro()" },
                { view: "icon", icon: "fas fa-redo", tooltip: "Повернуть фото", click: "RotatePhotoPro()" },
                { view: "icon", icon: "fas fa-map-marked-alt", tooltip: "На карте", click: "getGeo()" },
                { view: "icon", icon: "fas fa-eye", id: "icnHidePhoto", tooltip: "Скрыть фото от клиента", click: "onHidePhoto()", hidden: (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM')},
                { view: "icon", icon: "fas fa-search", id: "icnToggleMagnifier", tooltip: "Включить лупу", click: "toggleMagnifier()", css: "icon-magnifier-off" },
                {},
                { view: "icon", icon: "fas fa-angle-double-left", tooltip: "Следующее фото", click: "showPrevImage()" },
                { view: "icon", icon: "fas fa-angle-double-right", tooltip: "Предыдущее фото", click: "showNextImage()" },
                {},
                { view: "icon", id: "icnCheckPhoto", click: "setCheckPhoto()" }                
              ]
            },
          ]
        },
        {
          cols: [
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblBorned', template: "Дата:", width: 130 },
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblGeoTime', template: "Время ФО:", width: 150 },
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblStart', template: "Начало визита:" },
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblFinish', template: "Окончание визита:" },
          ]
        },
        { height: 5, },
        {
          cols: [
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblOfficeName', template: "Офис:" },
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCityName', template: "Город:" },
          ]
        },
        {
          cols: [
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblNetworkName', template: "Сеть:" },
            { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblName', template: "Вывеска:" },
          ]
        },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblAdress', template: "Адрес:" },

        { height: 10, },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblUserName', template: "Сотрудник:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblMasterName', template: "Руководитель:" },
        { height: 10, },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCategory', template: "Категория фотоотчета:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblActionName', template: "Анкета:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblQuestionName', template: "Вопрос:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblBrand', template: "Бренд:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblArtName', template: "SKU:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblArtCategoryName', template: "Категория SKU:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCompany', template: "Компания:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblDescription', template: "Комментарий:" },
        { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblTask', template: "Комментарий к фото:" },
        { view: "button", id: 'btnPlanograms', label: 'Планограммы', click: function () { getPlanograms() }, hidden: (localStorage.getItem('CompanyID') != 111) },
        {
          id: "areaRecognize",
          rows: [
            {
              view: "button", label: "Показать распознанные SKU",
              on: {
                onItemClick: function () {
                  resultArtPhoto(null);
                }
              }
            },
            {
              view: "datatable", id: "recSKU", select: true, resizeColumn: true, fixedRowHeight: false, rowHeight: 24,
              columns: [
                //{ id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], minWidth: 90, sort: "string" },
                { id: "ArtName", header: [(isEng) ? 'Name' : "Название", { content: "textFilter" }], width: 150, minWidth: 40, fillspace: true, sort: "string" },
                { id: "CCount", header: [(isEng) ? 'Faces' : "Фейсы", { content: "textFilter" }], width: 50, minWidth: 10, sort: "int", css: { 'text-align': 'center' } }
              ],
              on: {
                onItemClick: function (id) {
                  var item = this.getItem(id);
                  resultArtPhoto(item.ArtID);
                }
              }
            }
          ]
        },
        { id: "freeArea" },
        { view: "template", css: "photo_window_labels", autoheight: true, template: "<big>Комментарий к фото</big>", css: { 'text-align': 'center' } },
        {
          cols: [
            { view: "textarea", id: 'newTaskTextPro', maxHeight: 100, minHeight: 40, height: 70, placeholder: (isEng) ? "Enter text" : "Введите текст комментария", type: "clean", css: { 'background': '#dadee0' } },
            {
              view: "icon", icon: 'fas fa-paper-plane', tooltip: "Отправить комментарий к фото", 
              on: {
                onItemClick: function () {
                  var text = $$('newTaskTextPro').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
                  $$('newTaskTextPro').setValue('');

                  if (text == '') {
                    webix.message({ type: "error", text: (isEng) ? "Enter text" : "Введите текст комментария", expire: 1000 });
                    return;
                  }
                  $.ajax({
                    url: '../../Services/UI.asmx/SetTask',
                    timeout: 120000,
                    data: JSON.stringify({ 'Author': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': acceptor, 'Text': ('Комментарий к фото от ' + borned + ': ' + text), 'GUID': GUID, 'PhotoID': currentPhotoID }),
                    success: function (data) { webix.message({ type: "success", text: "Комментарий к фото отправлен", expire: 2000 }); },
                    error: function (xhr, ajaxOptions, thrownError) { alert(xhr.responseText); }
                  });
                }
              }
            }
          ]
        },
        { height: 60, }
      ]
    },
    { view: "resizer" },
    {
      rows: [
        { view: "template", scroll: false, id: "photoDivFull2", template: "<img src='' id='photofull2' onclick='zoomPro()'/>", type: "line" },
        { view: "template", id: "templateCanvasTestArt", content: "canvasTestArtPic", scroll: "xy", hidden: true }
      ]
    }
  ]
}

// Переменная для хранения состояния лупы
var magnifierEnabled = false;

// Функция переключения лупы
function toggleMagnifier() {
  magnifierEnabled = !magnifierEnabled;

  // Сохраняем состояние в localStorage
  localStorage.setItem('magnifierEnabled', magnifierEnabled ? '1' : '0');

  // Меняем иконку кнопки
  var icon = $$('icnToggleMagnifier');
  if (magnifierEnabled) {
    icon.define({ icon: "fas fa-search", tooltip: "Выключить лупу" });
    icon.$view.classList.remove("icon-magnifier-off");
  } else {
    icon.define({ icon: "fas fa-search", tooltip: "Включить лупу" });
    icon.$view.classList.add("icon-magnifier-off");
  }
  icon.refresh();

  // Пересоздаем лупу на текущем фото
  var img = document.getElementById('photofull2');
  if (img && img.src) {
    if (magnifierEnabled) {
      initMagnifier('photofull2');
    } else {
      removeMagnifier();
    }
  }
}

// Функция удаления лупы
function removeMagnifier() {
  var glass = document.getElementById("magnifier_glass");
  if (glass) {
    glass.style.display = "none";
    glass.remove(); // Полностью удаляем элемент
  }

  var img = document.getElementById('photofull2');
  if (img) {
    img.onmousemove = null;
    img.onmouseleave = null;
  }
}

// Инициализация лупы (исправленная версия)
function initMagnifier(imgId) {
  // Если лупа выключена в настройках - не инициализируем
  if (!magnifierEnabled) return;

  var img = document.getElementById(imgId);
  if (!img) return;

  // Удаляем старую лупу если есть
  var oldGlass = document.getElementById("magnifier_glass");
  if (oldGlass) {
    oldGlass.remove();
  }

  // Создаем элемент лупы
  var glass = document.createElement("DIV");
  glass.setAttribute("id", "magnifier_glass");
  glass.setAttribute("class", "webix_magnifier");
  document.body.appendChild(glass);

  // Обработчик движения мыши
  img.onmousemove = function (e) {
    glass.style.display = "block";

    var rect = img.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Защита от выхода за границы
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      glass.style.display = "none";
      return;
    }

    // Коэффициент увеличения
    var zoom = 2;

    var glassWidth = glass.offsetWidth;
    var glassHeight = glass.offsetHeight;

    // Позиционирование лупы
    var glassLeft = e.pageX - glassWidth / 2;
    var glassTop = e.pageY - glassHeight / 2;

    glass.style.left = glassLeft + "px";
    glass.style.top = glassTop + "px";

    // Фон лупы
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    // Позиция фона
    var posX = (x * zoom) - (glassWidth / 2);
    var posY = (y * zoom) - (glassHeight / 2);

    // Ограничиваем позицию
    posX = Math.min(Math.max(posX, 0), img.width * zoom - glassWidth);
    posY = Math.min(Math.max(posY, 0), img.height * zoom - glassHeight);

    glass.style.backgroundPosition = "-" + posX + "px -" + posY + "px";
  };

  img.onmouseleave = function () {
    glass.style.display = "none";
  };
}

function getphotoInfo(menuID, report, procName, reportName) {
  showImage(currentPhotoID);
}

function savePhotoPro() {
  list = $$(currentPhotoList);

  var selecterID = list.getSelectedId();
  var item = list.getItem(selecterID);

  window.open(item.Link);
}

function zoomPro() {
  // 1. Скрываем элемент лупы, если он существует
  var glass = document.getElementById("magnifier_glass");
  if (glass) glass.style.display = "none";

  // 2. Отключаем обработчик движения мыши на картинке, 
  // чтобы лупа не появилась снова, пока мы в "оригинальном размере"
  var img = document.getElementById('photofull2');
  if (img) img.onmousemove = null;

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
  else {
    fix_sizePro(document.getElementById(photo), elem, true);

    initMagnifier('photofull2')
  }

  $$(elem).scrollTo(0, 0);
}

function RotatePhotoPro() {
  $.ajax({
    url: '../Services/System.asmx/RotatePhoto',
    timeout: 120000,
    data: JSON.stringify({ 'fileName': linkPhoto }),
    success: function (data) {},
    error: function (xhr, ajaxOptions, thrownError) {},
    complete: function () {
      $('#photofull2').attr('src', $('#photofull2').attr('src') + '?' + Math.random());
      //$$('navigation').hideProgress();
    }
  });
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

  // Рассчитываем коэффициенты масштабирования
  var ratioW = width / iWidth;
  var ratioH = height / iHeight;
  var ratio = Math.min(ratioW, ratioH); // Выбираем меньший, чтобы влезло целиком

  img.style.width = parseInt(iWidth * ratio) + 'px';
  img.style.height = parseInt(iHeight * ratio) + 'px';
}

/*function get_dim_pro(img, elem) {
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
}*/

function getGeo() {
  if (sessionStorage.getItem('photoLat') == null || sessionStorage.getItem('photoLat') == 0) {
    webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });
    return false;
  }

  // загрузка окна с координатами
  var itemWindow = $$('menuUtility').getItem(59);
  if (itemWindow != null)
    showReport(itemWindow);

  $$("toolbarGeoTracking").hide();

  //e.stopPropagation(); --11.04.25 удалить, если нет проблем с показом окна координат
  return false;
}

function showImage(photoID) {
  // Загрузка состояния лупы из localStorage
  var savedState = localStorage.getItem('magnifierEnabled');
  magnifierEnabled = (savedState === '1');

  // Установка иконки кнопки лупы
  var toggleIcon = $$('icnToggleMagnifier');
  if (toggleIcon) {
    if (magnifierEnabled) {
      toggleIcon.define({ icon: "fas fa-search", tooltip: "Выключить лупу" });
      toggleIcon.$view.classList.remove("icon-magnifier-off");
    } else {
      toggleIcon.define({ icon: "fas fa-search", tooltip: "Включить лупу" });
      toggleIcon.$view.classList.add("icon-magnifier-off");
    }
    toggleIcon.refresh();
  }

  //очистка полей
  const icon = "<span class='webix_icon wxi-sync'></span>"
  $$('photoDivFull2').define('template', icon); $$('photoDivFull2').refresh();
  $$('lblOfficeName').define('template', '<b> Офис: </b>' + icon); $$('lblOfficeName').refresh();
  $$('lblCityName').define('template', '<b> Город: </b>' + icon); $$('lblCityName').refresh();
  $$('lblNetworkName').define('template', '<b> Сеть: </b>' + icon); $$('lblNetworkName').refresh();
  $$('lblName').define('template', '<b> Вывеска: </b>' + icon); $$('lblName').refresh();
  $$('lblAdress').define('template', '<b> Адрес: </b>' + icon); $$('lblAdress').refresh();
  $$('lblBorned').define('template', '<b> Дата: </b>' + icon); $$('lblBorned').refresh();
  $$('lblGeoTime').define('template', '<b> Время ФО: </b>' + icon); $$('lblGeoTime').refresh();
  $$('lblStart').define('template', '<b>Начало визита: </b>' + icon); $$('lblStart').refresh();
  $$('lblFinish').define('template', '<b>Окончание визита: </b>' + icon); $$('lblFinish').refresh();
  $$('lblUserName').define('template', '<b> Сотрудник: </b>' + icon); $$('lblUserName').refresh();
  $$('lblMasterName').define('template', '<b> Руководитель: </b>' + icon); $$('lblMasterName').refresh();
  $$('lblCategory').define('template', '<b> Категория фотоотчета: </b>' + icon); $$('lblCategory').refresh();
  $$('lblBrand').define('template', '<b> Бренд: </b>' + icon); $$('lblBrand').refresh();
  $$('lblDescription').define('template', '<b> Комментарий: </b>' + icon); $$('lblDescription').refresh();
  $$('lblActionName').define('template', '<b> Анкета: </b>' + icon); $$('lblActionName').refresh();
  $$('lblQuestionName').define('template', '<b> Вопрос: </b>' + icon); $$('lblQuestionName').refresh();
  $$('lblCompany').define('template', '<b> Компания: </b>' + icon); $$('lblCompany').refresh();
  $$('freeArea').show();
  $$('areaRecognize').hide();

  $.ajax({
    url: '../../Services/Custom.asmx/GetPhotoInfo',
    timeout: 300000,
    data: JSON.stringify({ 'Photo': photoID, 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var item = JSON.parse(data.d);

      if (item[0].Link.indexOf('mp3') != -1) {
        return;
      }

      $$('photoDivFull2').show();
      $$('templateCanvasTestArt').hide();
      
      $$('photoDivFull2').define('template', "<div><img src='" + item[0].Link + "' id='photofull2'' onclick='zoomPro()'/></div>");
      $$('photoDivFull2').define('scroll', 'false');
      $$('photoDivFull2').refresh();

      $$('lblOfficeName').define('template', '<b> Офис: </b>' + item[0].OfficeName);
      $$('lblOfficeName').refresh();

      $$('lblCityName').define('template', '<b> Город: </b>' + item[0].CityName);
      $$('lblCityName').refresh();

      $$('lblNetworkName').define('template', '<b> Сеть: </b>' + item[0].NetworkName);
      $$('lblNetworkName').refresh();

      $$('lblName').define('template', '<b> Вывеска: </b>' + item[0].Name);
      $$('lblName').refresh();

      $$('lblAdress').define('template', '<b> Адрес: </b>' + item[0].Address);
      $$('lblAdress').refresh();

      $$('lblBorned').define('template', '<b> Дата: </b>' + item[0].Borned);
      $$('lblBorned').refresh();

      item[0].GeoTime != null ? $$('lblGeoTime').show() : $$('lblGeoTime').hide();
      $$('lblGeoTime').define('template', '<b> Время ФО: </b>' + item[0].GeoTime);
      $$('lblGeoTime').refresh();

      item[0].Start != null ? $$('lblStart').show() : $$('lblStart').hide();
      $$('lblStart').define('template', '<b>Начало визита: </b>' + item[0].Start);
      $$('lblStart').refresh();

      item[0].Finish != null ? $$('lblFinish').show() : $$('lblFinish').hide();
      $$('lblFinish').define('template', '<b>Окончание визита: </b>' + item[0].Finish);
      $$('lblFinish').refresh();

      $$('lblUserName').define('template', '<b> Сотрудник: </b>' + item[0].UserName);
      $$('lblUserName').refresh();

      item[0].MasterName != '' ? $$('lblMasterName').show() : $$('lblMasterName').hide();
      $$('lblMasterName').define('template', '<b> Руководитель: </b>' + item[0].MasterName);
      $$('lblMasterName').refresh();

      item[0].CategoryName != '' ? $$('lblCategory').show() : $$('lblCategory').hide();
      $$('lblCategory').define('template', '<b> Категория фотоотчета: </b>' + item[0].CategoryName);
      $$('lblCategory').refresh();

      item[0].BrandName != '' ? $$('lblBrand').show() : $$('lblBrand').hide();
      $$('lblBrand').define('template', '<b> Бренд: </b>' + item[0].BrandName);
      $$('lblBrand').refresh();

      item[0].ArtName != '' ? $$('lblArtName').show() : $$('lblArtName').hide();
      $$('lblArtName').define('template', '<b> SKU: </b>' + item[0].ArtName);
      $$('lblArtName').refresh();

      item[0].ArtCategoryName != '' ? $$('lblArtCategoryName').show() : $$('lblArtCategoryName').hide();
      $$('lblArtCategoryName').define('template', '<b> Категория SKU: </b>' + item[0].ArtCategoryName);
      $$('lblArtCategoryName').refresh();

      item[0].Description != '' ? $$('lblDescription').show() : $$('lblDescription').hide();
      $$('lblDescription').define('template', '<b> Комментарий: </b>' + item[0].Description);
      $$('lblDescription').refresh();

      item[0].TaskText != '' ? $$('lblTask').show() : $$('lblTask').hide();
      $$('lblTask').define('template', '<b> Комментарий к фото: </b>' + item[0].TaskText);
      $$('lblTask').refresh();

      item[0].ActionName != '' ? $$('lblActionName').show() : $$('lblActionName').hide();
      $$('lblActionName').define('template', '<b> Анкета: </b>' + item[0].ActionName);
      $$('lblActionName').refresh();

      item[0].QuestionName != '' ? $$('lblQuestionName').show() : $$('lblQuestionName').hide();
      $$('lblQuestionName').define('template', '<b> Вопрос: </b>' + item[0].QuestionName);
      $$('lblQuestionName').refresh();

      $$('lblCompany').define('template', '<b> Компания: </b>' + item[0].CompanyName);
      $$('lblCompany').refresh();
      
      $$('icnHidePhoto').define('icon', item[0].IsHidden == 1 ? 'fas fa-eye-slash' : 'fas fa-eye');
      $$('icnHidePhoto').define('tooltip', item[0].IsHidden == 1 ? 'Отобразить фото для клиента' : 'Скрыть фото от клиента');
      $$('icnHidePhoto').refresh();

      $$('icnCheckPhoto').define('icon', item[0].IsPhotoCheck == 1 ? 'far fa-check-square' : 'far fa-square');
      $$('icnCheckPhoto').define('tooltip', item[0].IsPhotoCheck == 1 ? 'Снять подтверждение фото' : 'Подтвердить фото');
      $$('icnCheckPhoto').refresh();

      //$$('photoRatingPro').config.hidden = (localStorage.getItem('IsPoint') == '0');
      //$$('photoRatingPro').refresh();

      pointID = item[0].PointID;
      clientID = item[0].CompanyID;
      linkPhoto = item[0].Link;
      borned = item[0].Borned;
      rating = item[0].Rating;
      oldRating = item[0].Rating;
      sessionStorage.setItem('photoLat', item[0].Lat);
      sessionStorage.setItem('photoLon', item[0].Lon);
      sessionStorage.setItem('pointLat', item[0].PointLat);
      sessionStorage.setItem('pointLon', item[0].PointLon);

      currentPhotoID = photoID;

      GUID = +new Date;

      acceptor = item[0].UserID;

      // вставляем список фото справа
      if (currentPhotoData != null) {
        const list = $$('rightPhotoList');
        list.clearAll();
        list.parse(currentPhotoData);

        // 1. Ищем элемент, у которого поле PhotoID совпадает с переменной photoID
        var target = list.find(function (obj) {
          return obj.PhotoID == photoID;
        }, true); // true вернет один объект, а не массив

        if (target) {
          // 2. Устанавливаем выделение по ID, который определил Webix при парсинге
          list.select(target.id);

          // 3. Фокусируем (прокручиваем список к элементу)
          list.showItem(target.id);
        }
      }

      //if (rating != null) {
      //  $$('photoRatingPro').setValue(rating);
      //  $$('photoRatingPro').refresh();
      //}

      //если фото по распознаванию, открывается список найденных SKU
      if (item[0].IsRecognize == 1) {
        $$('freeArea').hide();
        $$('areaRecognize').show();

        // загрузка распознанных SKU
        $.ajax({
          url: '../../Services/AI.asmx/GetResultArt',
          timeout: 300000,
          data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Photo': photoID }),
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
        //$$('freeArea').show();
        $$('areaRecognize').hide();
      }

      fix_sizePro();

      // лупа
      document.getElementById('photofull2').src = item[0].Link;

      // 2. Ждем микросекунду, чтобы DOM обновился, и вешаем лупу
      setTimeout(function () {
        if (magnifierEnabled) {
          initMagnifier('photofull2');
        } else {
          removeMagnifier();
        }
      }, 100);

      // сохранение информации об открытии фото
      $.ajax({
        url: '../../Services/UI.asmx/SetPhotoLog',
        timeout: 120000,
        data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Photo': photoID }),
      });

    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    }
  });  
}

function showNextImage() {
  $$('photoDivFull2').show();
  $$('templateCanvasTestArt').hide();

  var list = $$(currentPhotoList);

  var selecterID = list.getSelectedId();
  var nextID = list.getNextId(selecterID);

  if (nextID === undefined)
    return

  var item = list.getItem(nextID);
  list.select(nextID);

  showImage(item.PhotoID);
}

function showPrevImage() {
  $$('photoDivFull2').show();
  $$('templateCanvasTestArt').hide();

  list = $$(currentPhotoList);

  var selecterID = list.getSelectedId();
  var prevID = list.getPrevId(selecterID);

  if (prevID === undefined)
    return

  var item = list.getItem(prevID);
  list.select(prevID);

  showImage(item.PhotoID);
}

function onCheckRatingPro(rating)
{
  if (currentPhotoID != null && currentPhotoID != -1 && oldRating != rating) {

    send('SetPhotoRating', { 'ID': currentPhotoID, 'Rating': rating, 'User': localStorage.getItem('Author') });

    var list = $$(currentPhotoList);

    var row = list.find(function (obj) { return (obj.PhotoID.toString() == currentPhotoID) }, true);

    if (row.id != null) {
      var item = list.getItem(row.id);
      item.Rating = rating;
      list.updateItem(item.id, item);
    }
  }
}

//скрытие фото
function onHidePhoto() {
  let status = ($$('icnHidePhoto').config.icon == 'fas fa-eye' ? 1 : 0);

  $.ajax({
    url: '../../Services/UI.asmx/SetPhotoHide',
    data: JSON.stringify({ 'ID': currentPhotoID, 'Status': status, 'User': localStorage.getItem('Author') }),
    error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
  });

  $$('icnHidePhoto').define('icon', status == 1 ? 'fas fa-eye-slash' : 'fas fa-eye');
  $$('icnHidePhoto').define('tooltip', status == 1 ? 'Отобразить фото для клиента' : 'Скрыть фото от клиента');
  $$('icnHidePhoto').refresh();
}

//подтверждение фото
function setCheckPhoto() {
  let status = ($$('icnCheckPhoto').config.icon == 'far fa-square' ? 1 : 0);

  $.ajax({
    url: '../../Services/UI.asmx/SetPhotoCheck2',
    data: JSON.stringify({ 'ID': currentPhotoID, 'Status': status, 'User': localStorage.getItem('Author') }),
    error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
  });

  $$('icnCheckPhoto').define('icon', status == 1 ? 'far fa-check-square' : 'far fa-square');
  $$('icnCheckPhoto').define('tooltip', status == 1 ? 'Снять подтверждение фото' : 'Подтвердить фото');
  $$('icnCheckPhoto').refresh();
}

//показ разметки по скю(фото по распознованию)
function resultArtPhoto(art) {
  $$('photoDivFull2').hide();
  $$('templateCanvasTestArt').show();
  $('#canvasTestArtPic').show();

  const canvas = document.getElementById('canvasTestArtPic');
  const ctx = canvas.getContext('2d');

  // ВАЖНО: переменные должны быть доступны для onmousemove
  var image = new Image();
  var itemsData = [];
  var currentScale = 1;
  var isShowText = (art == null) ? 1 : 0;
  const zoomRadius = 100;

  // Вспомогательная функция отрисовки (теперь она видна везде)
  function redrawBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 1. Фото
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // 2. Слой
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 3. Рамки
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.font = "10px Roboto";
    for (var i = 0; i < itemsData.length; i++) {
      drawBound(itemsData[i].ArtName, itemsData[i].BoundTop, itemsData[i].BoundLeft, itemsData[i].BoundRight, itemsData[i].BoundBottom, currentScale, isShowText);
    }
    ctx.stroke();
  }

  image.onload = function () {
    var view = $$("templateCanvasTestArt");
    var dom = view.getNode();

    currentScale = Math.min(dom.clientWidth / image.naturalWidth, dom.clientHeight / image.naturalHeight);

    canvas.width = image.naturalWidth * currentScale;
    canvas.height = image.naturalHeight * currentScale;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    // Загрузка данных
    $.ajax({
      url: '../../Services/AI.asmx/GetResult',
      data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Photo': currentPhotoID, Art: art }),
      success: function (data) {
        itemsData = JSON.parse(data.d);
        redrawBase();
      }
    });
  };

  image.src = linkPhoto;

  // ОБРАБОТЧИК МЫШИ
  canvas.onmousemove = function (e) {
    if (!image.complete || itemsData.length === 0) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    redrawBase(); // Очистка и перерисовка фона

    ctx.save();
    // Создаем круг
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, zoomRadius, 0, Math.PI * 2);
    ctx.clip();

    // Рассчитываем область копирования из оригинала Мы хотим, чтобы центр лупы соответствовал мыши в масштабе 1:1
    const sourceX = mouseX / currentScale - zoomRadius;
    const sourceY = mouseY / currentScale - zoomRadius;
    const sourceSide = zoomRadius * 2;

    ctx.drawImage(
      image,
      sourceX, sourceY, sourceSide, sourceSide,
      mouseX - zoomRadius, mouseY - zoomRadius, sourceSide, sourceSide
    );

    ctx.restore();

    // Рисуем рамку лупы
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, zoomRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  canvas.onmouseleave = function () {
    redrawBase();
  };

  function drawBound(artName, boundTop, boundLeft, boundRight, boundBottom, scale, isShowText) {
    var top = boundTop * scale;
    var left = boundLeft * scale;
    var right = boundRight * scale;
    var bottom = boundBottom * scale;
    ctx.rect(left, top, right - left, bottom - top);
    /*if (isShowText == 1) {
      ctx.strokeText(artName, left, top + 10);
    }*/
  }
}

// -- конец Функционал Просмотр фото


// -------------------- Функционал Просмотр задания
var currentTaskID, currentPointID, currentUserID;
function getmessages(menuID, report, procName, reportName) {
  $.ajax({
    url: '../../Services/Report.asmx/GetMessage',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Task': currentTaskID }),
    success: function (data) {
      $$('messageTask').clearAll();
      $$('messageTask').parse(data.d);
    },
    error: function () {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () { }
  });
}

var messages = {
  rows: [
    {
      view: "list", id: "messageTask", autowidth: true, type: { height: "auto" },
      sort: {
        by: "#id#",
        dir: "asc",
        as: "int"
      },
      template: function (obj) {
        var user;
        var photo = getMessagePhoto(obj.Photo);

        if (obj.UserID == currentUserID) {
          user = "<div class='list-point-item-usertext-small'><i class='fa fa-angle-double-right'></i> " + obj.UserName + "</div>";

          return '<div class="list-point-item" style="padding-top: 2px;">' +
            '<div style="float: left; "><i class="fa fa-angle-double-right fa-4x fa-fw gray"></i> </div>' +
            '<div style="margin-left: 70px; background-color: #dae2ed; padding: 8px;">' +
            '<div style="float: right; width: 40px; text-align: right"><div class="borned">' + obj.Borned + '</div></div>' +
            '<div class="list-message-text">' + obj.Text + '</div>' + photo + user +
            '</div>' +
            '</div>';
        }
        else {
          user = "<div class='list-point-item-usertext-small'><i class='fa fa-angle-double-right'></i> " + obj.UserName + "</div>";

          return '<div class="list-point-item" style="padding-top: 2px;">' +
            '<div style="float: right; "><i class="fa fa-angle-double-left fa-4x fa-fw gray"></i> </div>' +
            '<div style="margin-right: 70px; background-color: #e8e9eb; padding: 8px;">' +
            '<div style="float: right; width: 40px; text-align: left"><div class="borned">' + obj.Borned + '</div></div>' +
            '<div class="list-message-text">' + obj.Text + '</div>' + photo + user +
            '</div>' +
            '</div>';
        }
      },
      on: {
        onItemClick: function (id, e) {
          showPhotoVisit(this, id, e);
        },
      }
    },
    { view: "resizer" },
    {
      id: 'textMessages', borderless: true, height: 60, minHeight: 60,
      cols: [
        { view: "textarea", id: 'textMessage', maxHeight: 400, minHeight: 60, placeholder: "Введите сообщение", type: 'clean' },
        {
          view: "icon", icon: "fas fa-paper-plane", tooltip: "Отправить сообщение", hidden: (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang'))),
          on: {
            onItemClick: function () {
              var text = $$('textMessage').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
              if (text == '') return;

              $$("textMessage").setValue('');

              var fileName = '';
              var GUID = +new Date;

              var record = {
                id: GUID, GUID: GUID, TaskID: currentTaskID, UserID: localStorage.getItem('Author'), Text: text, Borned: getDateTime(), UserName: 'я', Photo: fileName
              };

              var id = $$("messageTask").add(record);
              $$('messageTask').showItem(id);

              send2('SetMessage', { 'Task': currentTaskID, 'User': localStorage.getItem('Author'), 'Text': text, 'GUID': GUID });                            
            }
          }
        },
      ]
    },
    {
      hidden: (!['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')) || (localStorage.getItem('CompanyID') == 1 && localStorage.getItem('RoleName') != 'Супервайзер' && localStorage.getItem('RoleName') != 'Территориальный менеджер'  && localStorage.getItem('RoleName') != 'Администратор')),
      cols: [
        {},
        {
          view: "button", type: "icon", icon: "fas fa-paper-plane", label: (localStorage.getItem('CompanyID') != 1) ? "Отправить ответ" : "Отправить МЕ", css: "task_button",
          on: {
            onItemClick: function () {
              var text = $$('textMessage').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
              if (text == '') {
                webix.message({ type: "error", text: "Введите текст сообщения", expire: 1000 });
                return;
              };

              $$("textMessage").setValue('');

              var fileName = '';
              var GUID = +new Date;

              var record = {
                id: GUID, GUID: GUID, TaskID: currentTaskID, UserID: localStorage.getItem('Author'), Text: text, Borned: getDateTime(), UserName: 'я', Photo: fileName
              };

              var id = $$("messageTask").add(record);
              $$('messageTask').showItem(id);

              send2('SetTaskMessage', { 'Task': currentTaskID, 'User': localStorage.getItem('Author'), 'Text': text, 'GUID': GUID });
            }
          }
        },
        {},
        {
          view: "button", type: "icon", icon: "fas fa-paper-plane", label: "Отправить Клиенту", hidden: (localStorage.getItem('CompanyID') != 1), css: "task_button",
          on: {
            onItemClick: function () {
              var text = $$('textMessage').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

              $$("textMessage").setValue('');

              var fileName = '';
              var GUID = +new Date;

              var record = {
                id: GUID, GUID: GUID, TaskID: currentTaskID, UserID: localStorage.getItem('Author'), Text: text, Borned: getDateTime(), UserName: 'я', Photo: fileName
              };

              var id = $$("messageTask").add(record);
              $$('messageTask').showItem(id);

              send2('SetTaskModerate', { 'Task': currentTaskID, 'User': localStorage.getItem('Author'), 'Text': text, 'GUID': GUID });
            }
          }
        },
        {},
      ]
    }
  ]
}

function getMessagePhoto(photo) {
  if (photo == '') return '';
  const siteAddress = localStorage.getItem('SiteAddress');
  return result = "<div class='messagephoto' style='background: url(" + siteAddress + photo + ") no-repeat center center; background-size: 240px 260px; width: 200px; height: 200px;'></div>"
}
// -- конец Функционал Задания


// -------------------- Функционал Маршруты на неделю
var tab = '';

var routes = {  
  cols: [
    {
      id: 'routeTable', 
      rows: [
        {
          view: "toolbar", 
          elements: [
            {},
            {
              view: "icon", icon: "fas fa-cloud-download-alt", tooltip: (isEng) ? 'Download from template' : "Загрузить из шаблона",
              on: {
                onItemClick: function (id) {

                  download('route');
                }
              }
            }                        
          ]
        },
        {
          view: "datatable", id: "route", select: true, editable: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
          columns: [
            { id: "Link", header: ["АП", { content: "excelFilter", mode: "text" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "ID", header: ["ID ТТ", { content: "textFilter" }], width: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
            { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 70, sort: "string" },
            { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 70, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 70, sort: "string" },
            { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 70, sort: "string" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 100, sort: "string" },
            { id: "Day1", header: ["ПН", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day2", header: ["ВН", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day3", header: ["СР", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day4", header: ["ЧТ", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day5", header: ["ПТ", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day6", header: ["СБ", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "Day7", header: ["ВС", { content: "textFilter" }], width: 50, editor: "select", options: ['Да', 'Нет'], css: { 'text-align': 'center' } },
            { id: "UserID", header: ["ID сотрудника", { content: "textFilter" }], width:50, minWidth: 20, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
            { id: "UserName", header: ["ФИО", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, adjust: "data", sort: "string" },
            { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, sort: "string" },
            { id: "MasterName", header: ["Руководитель", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, sort: "string" }
          ],
          on: {
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              if (state.value != state.old) {
                var item = this.getItem(editor.row);

                if (item.Day1 == 'Нет') item.Day1 = '';
                if (item.Day2 == 'Нет') item.Day2 = '';
                if (item.Day3 == 'Нет') item.Day3 = '';
                if (item.Day4 == 'Нет') item.Day4 = '';
                if (item.Day5 == 'Нет') item.Day5 = '';
                if (item.Day6 == 'Нет') item.Day6 = '';
                if (item.Day7 == 'Нет') item.Day7 = '';

                this.updateItem(item.id, item);

                SetRoute(item.ID, item.UserID, item.Link, item.Day1, item.Day2, item.Day3, item.Day4, item.Day5, item.Day6, item.Day7);
              }
            }
          }
        }
      ]
    },
    {
      id: 'routeDownloads', hidden: true,
      rows: [
        {
          view: "toolbar", borderless: true,
          elements: [
            {
              view: "icon", icon: "fas fa-arrow-left", //tooltip: (isEng) ? 'Download from template' : "Загрузить из шаблона",
              on: {
                onItemClick: function (id) {
                  if ($$('btn-route-download-run').isVisible())
                    getroutes();

                  $$('btn-route-download').show();
                  $$('btn-route-download-run').hide();

                  $$('routeTable').show();
                  $$('routeDownloads').hide();
                }
              }
            },
            {
              view: "icon", id: 'btn-route-download-run', icon: "fas fa-play", tooltip: (isEng) ? 'Run' : 'Применить',             
              on: {
                onItemClick: function (id) {
                  loadRoute();
                }
              }              
            },
            {
              view: "icon", id: 'btn-route-download', icon: "fas fa-cloud-download-alt", tooltip: (isEng) ? 'Download' : "Загрузить",              
              on: {
                onItemClick: function () {
                  tab = 'route';
                  $$("excelUploader").define("formData", { Magic: 'route', Company: localStorage.getItem('CompanyID') });
                  $$("excelUploader").fileDialog();
                }
              }
            },
            { view: "template", css: 'text-toolbar', borderless: true, template: 'Загрузка маршрутов из файла' }
          ]
        },
        {
          view: "datatable", id: "routeDownload", select: true, adjust: true, datatype: "mycsv", editable: true, resizeColumn: true, rowHeight: 24,
          columns: [
            { id: "check", header: { content: "masterCheckbox" }, checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40 },
            { id: "data0", header: ["АП", { content: "textFilter" }], adjust: "data", minWidth: 20, css: { 'text-align': 'center' } },
            { id: "data1", header: ["ID", { content: "textFilter" }], adjust: "data", minWidth: 20, css: { 'text-align': 'right', 'background-color': '#fff799 !important' } },
            { id: "data2", header: ["Офис", { content: "textFilter" }], width: 70, sort: "string", editor: "text" },
            { id: "data3", header: ["Город", { content: "textFilter" }], width: 70, sort: "string", editor: "text" },
            { id: "data4", header: ["Сеть", { content: "textFilter" }], width: 70, sort: "string", editor: "text" },
            { id: "data5", header: ["Вывеска", { content: "textFilter" }], width: 70, sort: "string", editor: "text" },
            { id: "data6", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 100, sort: "string", editor: "text" },
            { id: "data7", header: ["ПН", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data8", header: ["ВТ", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data9", header: ["СР", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data10", header: ["ЧТ", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data11", header: ["ПТ", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data12", header: ["СБ", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data13", header: ["ВС", { content: "textFilter" }], width: 50, sort: "string", editor: "select", options: ['Да', 'Нет'] },
            { id: "data14", header: ["ID сотрудника", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
            { id: "data15", header: ["ФИО", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "data16", header: ["Должность", { content: "textFilter" }], width: 120, minWidth: 80, sort: "string" },
            { id: "Result", header: ["Результат", { content: "textFilter" }], width: 120, hidden: true }
          ]
        }
      ]
    }
  ]    
}

function getroutes() {
  var list = $$("route");

  webix.extend(list, webix.ProgressBar);

  showProgress('route');

  $.ajax({
    url: '../../Services/Desktop.asmx/GetRoute',
    timeout: 300000,
    data: JSON.stringify({
      'User': localStorage.getItem('Author')
    }),
    success: function (data) {
      list.clearAll();
      list.parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    },
    complete: function () {
      hideProgress('route');
    }
  });
}

function SetRoute(point, user, link, day1, day2, day3, day4, day5, day6, day7) {
  $.ajax({
    url: '../../Services/Desktop.asmx/SetRoute',
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

function onExcelUploadRoute() {
  list = $$('routeDownload');

  $$('btn-route-download').hide();
  $$('btn-route-download-run').show();

  showProgress(list);

  for (var id in list.data.pull) {
    var item = list.getItem(id);

    if (item.data0 == "АП" || item.data0 == "") {
      list.remove(id);
    }
    else {
      item.data7 = (item.data7.trim() == 'Нет') ? '' : item.data7.trim();
      item.data8 = (item.data8.trim() == 'Нет') ? '' : item.data8.trim();
      item.data9 = (item.data9.trim() == 'Нет') ? '' : item.data9.trim();
      item.data10 = (item.data10.trim() == 'Нет') ? '' : item.data10.trim();
      item.data11 = (item.data11.trim() == 'Нет') ? '' : item.data11.trim();
      item.data12 = (item.data12.trim() == 'Нет') ? '' : item.data12.trim();
      item.data13 = (item.data13.trim() == 'Нет') ? '' : item.data13.trim();
    }
  }

  list.eachRow(function (id) {
    this.getItem(id).check = "on";
  });
  list.refresh();

  if (list.count() == 0)
    list.showOverlay('Новых или измененных данных не обнаружено.');
  else $$('btn-route-download-run').show();

  list.hideProgress();
}

function loadRoute() {
  list = $$('routeDownload');

  if (list.count() == 0) return;
  
  var interval = setInterval(
    function () {
      var item = list.find(function (obj) {
        return (obj.check == "on")
      }, true);

      if (item.data0 == null) {
        clearInterval(interval);

        list.refresh();
      }

      sendExport('../../Services/Desktop.asmx/SetRoute',
        {
          'Company': localStorage.getItem('CompanyID'), 'Point': item.data1, 'User': item.data14, 'Link': item.data0, 'Day1': $.trim(item.data7), 'Day2': $.trim(item.data8), 'Day3': $.trim(item.data9),
          'Day4': $.trim(item.data10), 'Day5': $.trim(item.data11), 'Day6': $.trim(item.data12), 'Day7': $.trim(item.data13), 'Author': localStorage.getItem('Author')
        },
        list, item, item.id);
    },
    200);    
}

// -- конец Функционал Маршруты на неделю


// -------------------- Функционал Маршруты на месяц
var routeFlag = 2;

var routes2 = 
{
  cols: [
    {
      id: 'route2Table', 
      rows: [
        {
          view: "toolbar", borderless: true,
          elements: [
            {
              view: "button", type: 'icon', id: 'btnPeriodRoute', icon: 'far fa-calendar-alt', label: "08.02.2017 - 08.02.2017", width: 200, tooltip: "Интервал дат маршрутов",
              on: {                
                onItemClick: function (id) {                  
                  $$('winPeriodRoute').show(this.$view);
                }
              }              
            },
            //  {
            //    view: "segmented", multiview: true, value: 2, width: 300, id: 'segmentedRoute',
            //    options: [
            //      { id: "2", value: "По сотрудникам" },
            //      { id: "1", value: "Маршруты по ТТ" }
            //    ],
            //    on: {
            //      onChange: function (newv, oldv) {
            //        routeFlag = newv;
            //        setRouteFilterChange2();
            //  
            //      }
            //    }
            //  },
            //  { view: "checkbox", id: "IsRouteTime", labelRight: "Режим с таймингом", labelWidth: 14, customCheckbox: true, value: 0, click: function () { setRouteFilterChange2(); } },
            {},  
            {
              view: "icon", icon: "fas fa-cloud-download-alt", tooltip: (isEng) ? 'Download from template' : "Загрузить из шаблона",
              on: {
                onItemClick: function (id) {

                  download('route2');
                }
              }
            }     
          ]
        },
        {
          view: "datatable", id: "route2", select: true, resizeColumn: true, editable: true, fixedRowHeight: true, rowHeight: 24, leftSplit: 18,
          scheme: {
            $change: function (item) {
              if (item.VisitPlan > item.VisitPlan2)
                item.$css = "highlight";
            }
          },
          columns: [
            { id: "PointID", header: ['ID ТТ', { content: 'textFilter' }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
            { id: "UserID", header: ["ID сотрудника", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
            { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string" },
            { id: "Extra1", header: ["Доп1", { content: "textFilter" }], width: 40, minWidth: 40, sort: "string" },
            { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
            { id: "CityName", header: ["Город", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
            { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
            { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
            { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
            { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
            { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
            { id: "CompanyName", header: ["Клиент", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
            { id: "VisitPlan", header: ["План", { content: "textFilter" }], width: 30, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
            { id: "VisitPlan2", header: ["Визитов", { content: "textFilter" }], width: 30, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactCount", header: ["Факт", { content: "textFilter" }], width: 35, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
            { id: "FactPercent", header: ["Факт, %", { content: "textFilter" }], width: 35, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
            { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", editor: "popup" }
          ],
          on: {
            onItemClick: function (id, e, node) {
              if (["PointID", "UserID", "OutCode", "Extra1", "OfficeName", "CityName", "NetworkName", "Name", "Address", "MasterName", "UserName",
                   "RoleName", "CompanyName", "VisitPlan", "VisitPlan2", "FactCount", "FactPercent", "Description"].includes(id.column))
                return;

              // проверка на текущую дату
              var columnDate = this.getColumnConfig(id.column).footer[0].text;
              columnDate = new Date(columnDate.substring(6) + '-' + columnDate.substring(3, 5) + '-' + columnDate.substring(0, 2));
              var currentDate = new Date();
              currentDate = currentDate.setDate(currentDate.getDate() - 2);

              //  if ($$('IsRouteTime').getValue() == 0) {
                var item = this.getItem(id);
              
              //    if ($$('IsRouteTime').getValue() == 0) {
                  if (item[id.column] == '')
                    item[id.column] = 'Да';
                  else
                    item[id.column] = '';
              
                  $$('route2').updateItem(item.id, item);
                  $$('route2').editStop();
              
                  SetRoute2(item.PointID, item.RoleName, item.CompanyName, item.UserID, $$('route2').getColumnConfig(id.column).footer[0].text, item[id.column]);
              //    }
              //  }
            },
            onAfterEditStop: function (state, editor, ignoreUpdate) {
              if (state.value != state.old) {
                var item = $$("route2").getItem(editor.row);

                if (editor.column == "Description") {
                  SetRouteDescription2(item.CompanyName, item.PointID, item.UserID, webix.i18n.parseFormatStr($$('StartRoute').getValue()), state.value);
                  return;
                }


                // проверка на текущую дату
                var columnDate = editor.config.footer[0].text;
                columnDate = new Date(columnDate.substring(6) + '-' + columnDate.substring(3, 5) + '-' + columnDate.substring(0, 2));
                var currentDate = new Date();
                currentDate = currentDate.setDate(currentDate.getDate() - 10);
                
                if (state.value == 'Нет')
                  item[editor.column] = '';

                $$('route2').updateItem(item.id, item);

                SetRoute2(item.PointID, item.RoleName, item.CompanyName, item.UserID, editor.config.footer[0].text, state.value);
              }
            }
          },
          ready: function () {
            const table = this;

            //даты для инфо
            const format = d => d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
            const today = new Date();
            const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
            const monday = new Date(today); monday.setDate(today.getDate() - (today.getDay() || 7) + 1);
            const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
            const nextMonday = new Date(monday); nextMonday.setDate(monday.getDate() + 7);
            const nextSunday = new Date(nextMonday); nextSunday.setDate(nextMonday.getDate() + 6);
            const [tomorrowStr, mondayStr, sundayStr, nextMondayStr, nextSundayStr] = [format(tomorrow), format(monday), format(sunday), format(nextMonday), format(nextSunday)];

            const menu = webix.ui({
              view: "contextmenu", autowidth: true,
              data: [ { id: 1, value: "Скопировать маршрут на следующую неделю" }, { id: 2, value: "Очистить маршрут" }, { id: 3, value: "Скопировать маршрут по всем сотрудникам" } ],
              on: {
                onMenuItemClick: function (itemId) {
                  const selectedId = table.getSelectedId();
                  if (!selectedId && itemId != 3) {
                    webix.message("Выделите строку");
                    return;
                  }
                  const row = table.getItem(selectedId);
                  let point
                  switch (itemId) {
                    case '1':
                      webix.modalbox({
                        text: `Скопировать маршрут сотрудника ${ row.UserName } на следующую неделю (${ nextMondayStr } &#8209;${ nextSundayStr })? <br> Если маршрут уже есть, он будет перезаписан.`,
                        buttons: ["По выбранной ТТ", "По всем ТТ", "Отмена"],
                        width: 400
                      }).then(function (result) {
                          switch (result) {
                            case '0': point = row.PointID; break;
                            case '1': point = -1; break;
                            case '2': return;
                        }
                        $.ajax({
                          url: '../../Services/Desktop.asmx/CopyRouteWeek',
                          data: JSON.stringify({ 'Point': point, 'User': row.UserID, 'Company': row.CompanyID, 'Author': localStorage.getItem('Author') }),
                          success: function () { webix.message({ text: `Маршрут скопирован с ${mondayStr}&#8209;${sundayStr} на ${nextMondayStr}&#8209;${nextSundayStr} <br><br> Обновите данные, чтобы увидеть изменения`, type: "success", expire: 7000 }); },
                          error: function (xhr, ajaxOptions, thrownError) { webix.message({ type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000 }); }
                        });
                      });
                      break;
                    case '2':
                      webix.confirm({
                        ok: "Да", cancel: "Нет", width: 300,
                        text: `Очистить маршрут по сотруднику ${row.UserName} c ${tomorrowStr}?`
                      }).then(function () {
                        $.ajax({
                          url: '../../Services/Desktop.asmx/CleanRoute',
                          data: JSON.stringify({ 'Point': row.PointID, 'User': row.UserID, 'Company': row.CompanyID, 'Author': localStorage.getItem('Author') }),
                          success: function () { webix.message({ text: `Маршрут сотрудника ${row.UserName} очищен <br><br> Обновите данные, чтобы увидеть изменения`, type: "success", expire: 7000 }); },
                          error: function (xhr, ajaxOptions, thrownError) { webix.message({ type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000 }); }
                        });
                      })
                      break;
                    case '3':
                      webix.modalbox({
                        text: `Скопировать маршруты на следующую неделю (${nextMondayStr}&#8209;${nextSundayStr})? <br> Если маршрут уже есть, он будет перезаписан.`,
                        buttons: ["Только подчиненных", "Свой и подчиненных", "Отмена"],
                        width: 400
                      }).then(function (result) {
                        switch (result) {
                          case '2': return;
                        }
                        $.ajax({
                          url: '../../Services/Desktop.asmx/CopyRouteWeekAll',
                          data: JSON.stringify({ 'Flag': result, 'Author': localStorage.getItem('Author') }),
                          success: function () { webix.message({ text: `Маршруты скопированы с ${mondayStr}&#8209;${sundayStr} на ${nextMondayStr}&#8209;${nextSundayStr} <br><br> Обновите данные, чтобы увидеть изменения`, type: "success", expire: 7000 }); },
                          error: function (xhr, ajaxOptions, thrownError) { webix.message({ type: "error", text: "Ошибка обновления данных. Повторите попытку.", expire: 1000 }); }
                        });
                      });
                      break;
                  }
                }
              }
            });
            menu.attachTo(this);
          }
        }
      ]
    },
    {
      id: 'route2Downloads', hidden: true,
      rows: [
        {
          view: "toolbar", borderless: true,
          elements: [
            {
              view: "icon", icon: "fas fa-arrow-left",              
              on: {
                onItemClick: function () {
                  if ($$('btn-route-download-run2').isVisible())
                    getroutes2(webix.i18n.parseFormatStr($$('StartRoute').getValue()), webix.i18n.parseFormatStr($$('FinishRoute').getValue()));

                  $$('btn-route-download2').show();
                  $$('btn-route-download-run2').hide();

                  $$('route2Table').show();
                  $$('route2Downloads').hide();
                }
              }
            },
            {
              view: "icon", id: 'btn-route-download-run2', icon: "fas fa-play", tooltip: (isEng) ? 'Run' : 'Применить',
              on: {
                onItemClick: function (id) {
                  loadRoute2();
                }
              }
            },
            {
              view: "icon", id: 'btn-route-download2', icon: "fas fa-cloud-download-alt", tooltip: (isEng) ? 'Download' : "Загрузить",
              on: {
                onItemClick: function () {
                  tab = 'route2';
                  $$("excelUploader").define("formData", { Magic: 'route2', Company: localStorage.getItem('CompanyID') });
                  $$("excelUploader").fileDialog();
                }
              }
            },
            { view: "template", css: 'text-toolbar', borderless: true, template: 'Загрузка маршрутов из файла' }
          ]
        },
        {
          view: "datatable", id: "route2Download", select: true, adjust: true, datatype: "mycsv", editable: true, resizeColumn: true, fixedRowHeight: true, rowHeight: 24,
          columns: [
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
            { id: "data12", header: ["Клиент", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
            { id: "data13", header: ["План", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "data14", header: ["Визитов", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "data15", header: ["Факт", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "data16", header: ["Факт, %", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
            { id: "data17", header: ["Комментарий", { content: "textFilter" }], width: 45, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
          ]
        }
      ]
    }
  ]    
}

function getroutes2(start, finish) {
  var list = $$("route2");

  webix.extend(list, webix.ProgressBar);

  $$('btnPeriodRoute').define('label', webix.i18n.parseFormatStr($$('StartRoute').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('FinishRoute').getValue()));
  $$('btnPeriodRoute').refresh();

  showProgress('route2');

  $.ajax({
    url: '../../Services/Desktop.asmx/GetRoute2',
    timeout: 300000,
    data: JSON.stringify({
      'Company': localStorage.getItem('CompanyID'), 'Start': webix.i18n.parseFormatStr($$('StartRoute').getValue()), 'Finish': webix.i18n.parseFormatStr($$('FinishRoute').getValue()), 'User': localStorage.getItem('Author'), 'Flag': routeFlag, 'OfficeName': '', 'RoleName': ''
    }),
    success: function (data) {
      list.clearAll();
      list.parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    },
    complete: function () {
      hideProgress('route2');
    }
  });
}

function setRouteFilterChange2() {
  $.ajax({
    url: '../../Services/Desktop.asmx/GetRouteConfig',
    timeout: 300000,
    data: JSON.stringify({ 'Start': webix.i18n.parseFormatStr($$('StartRoute').getValue()), 'Finish': webix.i18n.parseFormatStr($$('FinishRoute').getValue()) }),
    success: function (data) {

      // установка таблицы
      $$('route2').config.columns = [
        { id: "PointID", header: ['ID ТТ', { content: 'textFilter' }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
        { id: "UserID", header: ["ID сотрудника", { content: "textFilter" }], width: 50, minWidth: 40, css: { 'text-align': 'right', 'background-color': '#fff799 !important' }, sort: "string" },
        { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string" },
        { id: "Extra1", header: ["Доп1", { content: "textFilter" }], width: 40, minWidth: 40, sort: "string" },
        { id: "OfficeName", header: ["Офис", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
        { id: "CityName", header: ["Город", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
        { id: "NetworkName", header: ["Сеть", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
        { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
        { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "UserName", header: ["Сотрудник", { content: "textFilter" }], width: 90, minWidth: 40, sort: "string" },
        { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
        { id: "CompanyName", header: ["Клиент", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string" },
        { id: "VisitPlan", header: ["План", { content: "textFilter" }], width: 30, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
        { id: "VisitPlan2", header: ["Визитов", { content: "textFilter" }], width: 30, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
        { id: "FactCount", header: ["Факт", { content: "textFilter" }], width: 35, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
        { id: "FactPercent", header: ["Факт, %", { content: "textFilter" }], width: 35, minWidth: 20, sort: "int", css: { 'text-align': 'center' } },
        { id: "Description", header: ["Комментарий", { content: "textFilter" }], width: 60, minWidth: 40, sort: "string", editor: "text" }
      ];

      var columns = webix.toArray($$('route2').config.columns);

      var list = JSON.parse(data.d);

      for (var i = 0; i < list.length; i++) {
        var obj = list[i];

        columns.insertAt({
          id: obj.id,
          header: [obj.header, { content: "textFilter" }],
          width: 40,
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

      getroutes2(webix.i18n.parseFormatStr($$('StartRoute').getValue()), webix.i18n.parseFormatStr($$('FinishRoute').getValue()));
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
    url: '../../Services/Desktop.asmx/SetRoute2',
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
    url: '../../Services/Desktop.asmx/SetRouteDescription',
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
              sendExport('../../Services/Desktop.asmx/SetRouteDescription', { 'Company': localStorage.getItem('CompanyID'), 'CompanyName': item.data12, 'Point': item.data0, 'User': item.data1, 'Borned': list.config.columns[i + 1].footer[0].text, 'Description': item.data17, 'Author': localStorage.getItem('Author') }, list, item, item.id);
            else
              sendExport('../../Services/Desktop.asmx/SetRouteDescription', { 'Company': localStorage.getItem('CompanyID'), 'CompanyName': item.data12, 'Point': item.data0, 'User': item.data1, 'Borned': list.config.columns[i + 1].footer[0].text, 'Description': item.data17, 'Author': localStorage.getItem('Author') }, list, item, item.id);
          }
        }
        else if (i > 18) {
          if (itemRoute != null) {
            if (list.getText(item.id, list.columnId(i)) != listRoute.getText(itemRoute.id, listRoute.columnId(i - 1)))
              sendExport('../Services/Desktop.asmx/SetRoute2', { 'Company': localStorage.getItem('CompanyID'), 'Point': item.data0, 'RoleName': item.data11, 'CompanyName': item.data12, 'User': item.data1, 'Borned': list.config.columns[i].footer[0].text, 'Value': list.getText(item.id, list.columnId(i)) }, list, item, item.id);
          }
          else
            sendExport('../../Services/Desktop.asmx/SetRoute2', { 'Company': localStorage.getItem('CompanyID'), 'Point': item.data0, 'RoleName': item.data11, 'CompanyName': item.data12, 'User': item.data1, 'Borned': list.config.columns[i].footer[0].text, 'Value': list.getText(item.id, list.columnId(i)) }, list, item, item.id);
        }
      }

      list.remove(item.id);

    },
    200);    
}

function onExcelUploadRoute2() {
  list = $$('route2Download');
  listRoute = $$('route2');

  $$('btn-route-download2').hide();
  $$('btn-route-download-run2').show();

  showProgress(list);

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

  list.hideProgress();
}

function setRouteInterval(id) {
  switch (id) {
    case '1':
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

      $$('StartRoute').setValue(firstDay);
      $$('FinishRoute').setValue(lastDay);

      break;

    case '2':
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      $$('StartRoute').setValue(firstDay);
      $$('FinishRoute').setValue(lastDay);

      break;

    case '3':
      var startDay = 1;
      var now = new Date();
      var d = now.getDay();
      var weekStart = new Date(now.valueOf() - (7 + (d <= 0 ? 7 - startDay : d - startDay)) * 86400000);
      var weekEnd = new Date(weekStart.valueOf() + 6 * 86400000);

      $$('StartRoute').setValue(weekStart);
      $$('FinishRoute').setValue(weekEnd);
      break;

    case '4':
      var startDay = 1;
      var now = new Date();
      var d = now.getDay();
      var weekStart = new Date(now.valueOf() - (d <= 0 ? 7 - startDay : d - startDay) * 86400000);
      var weekEnd = new Date(weekStart.valueOf() + 6 * 86400000);

      $$('StartRoute').setValue(weekStart);
      $$('FinishRoute').setValue(weekEnd);
      break;

    case '5':
      $$('StartRoute').setValue(new Date(new Date() - 24 * 3600 * 1000));
      $$('FinishRoute').setValue(new Date(new Date() - 24 * 3600 * 1000));

      break;

    case '6':
      $$('StartRoute').setValue(new Date());
      $$('FinishRoute').setValue(new Date());

      break;
    case '7':
      $$('StartRoute').setValue(new Date(new Date() - 24 * 3600 * 1000));
      $$('FinishRoute').setValue(new Date());

      break;
  }

  //setRouteFilterChange();

  $$('winPeriodRoute').hide();
}
// -- конец Функционал Маршруты на месяц

// -------------------- Функционал Создание и правка кастомного отчета
//var customReportID = -1;

var repCustom = {
  rows: [
    {
      id: "saveReport", hidden: true,
      cols: [
        { view: "text", id: "reportName", placeholder: "Название отчета", value: "", width: 250 },
        { view: "text", id: "reportDescription", placeholder: "Описание отчета", value: "", width: 400 },
        { view: "combo", id: "reportSortOrder", value: "по порядку", options: ["по порядку", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"], width: 130 },
        { view: "button", id: "buttonSaveReport", value: "СОХРАНИТЬ", width: 120, click: "saveReport()" },
        {}
      ]
    },
    {
      id: "editReport", hidden: true,
      cols: [
        {},
        {
          view: "button", id: "buttonEditReport", css: "icon_btn", label: '<span class="webix_icon far fa-edit"></span><span class="text">Редактировать отчет</span>',
          width: 190, click: "editReport()"
        },
        {
          view: "button", id: "buttonAccessReport", css: "icon_btn", label: '<span class="webix_icon fas fa-user"></span><span class="text">Дать доступ</span>',
          width: 170, click: "getAccess()"
        },
        {
          view: "button", id: "buttonDeleteReport", css: "icon_btn_delete", label: '<span class="webix_icon far fa-trash-alt"></span><span class="text" style="color: red">Удалить</span>',
          width: 100, click: "deleteReport()"
        }
      ]
    },
    {
      view: "template", id: "templateInfo", height: 60, 
      template: "Установите <b>последовательность</b> колонок, передвигая их мышкой. В полях фильтра вы можете задать <b>свое название</b> колонки.<br/>" +
        "Задайте <b>ширину</b> колонок с помощью мыши. <br/>Вы можете предварительно <b>загрузить</b> данные кнопкой Обновить, чтобы протестировать отчет."
    },
    {
      view: "datatable", id: "tableCustom", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
      headermenu: {
        autowidth: true,
        scroll: true
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
        { id: "QuestionName", header: [(isEng) ? 'Question' : "Вопрос", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
        { id: "Answer", header: [(isEng) ? 'Answer' : "Ответ", { content: "extendedTextFilter" }], width: 350, editor: "popup", minWidth: 40, sort: "string", adjustBatch: 100 },
        { id: "Link", header: [(isEng) ? 'Link' : "Файл", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjustBatch: 100 },
        { id: "Filter", header: [(isEng) ? 'Filter' : "Фильтр", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", adjustBatch: 100 },
        { id: "PhotoID", header: [(isEng) ? 'PhotoID' : "ID фото", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string", adjustBatch: 100 }
      ]
    }
  ]
}

function getrepCustom(menuID, report, procName, reportName) {
  customMenuID = menuID;
  var isAdd = (menuID > 1000000) ? true : false;
  var table = $$('tableCustom');

  if (isAdd) { 
    webix.alert({
      title: "Новый отчет", ok: "Понятно", width: 500,
      text: "Для первичной настройки отчета <b>слева</b> выберите фильтры, по которым будет строиться отчет. Выбор начинайте с <u>Доп. анкет</u> и\\или <u>Промо-акций</u> - " +
        "необходимо выбрать <b>хотя бы одну</b> анкету или промо. </br></br> При необходимости выберите отдельные вопросы, список SKU, адресную программу и сотрудников, " +
        "визиты которых хотите учитывать в отчете.<br/></br>" +
        "Далее <b>скройте</b> те колонки, которых не должно быть в отчете, установите нужную ширину оставшихся колонок.<br/></br>" +
        "Когда все будет готово, введите название, описание отчета и выберите номер по порядку в списке отчетов. <br/><br/>Нажмите кнопку <b>СОХРАНИТЬ</b><br/>"
    });

    // очистка всех фильтров
    clearAllFilter()

    $$('saveReport').show();
    //$$('templateInfo').show();
    $$('editReport').hide();

    $$("reportName").setValue('');
    $$("reportDescription").setValue('');
    $$("reportSortOrder").setValue('по порядку');
 
    // показываем скрытые столбцы
    var hiddenCount = table.getState().hidden.length;
    var hiddenColumn = table.getState().hidden;

    for (var i = 0; i < hiddenCount; i++)
      table.showColumn(hiddenColumn[i]);

    currentMenuID = -1;

    var menu = $$('popupRightMenu');

    createFilterMenu();

    menu.define("height", parseInt($(window).height()) - 80);
    menu.resize();

    menu.show($$("buttonFilter").$view);
    
  }
  else {
  }
}

function saveReport() {
  var table = 'tableCustom';

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
    url: '../../Services/Custom.asmx/SetReport',
    data: JSON.stringify({
      'ID': (currentMenuID == -1) ? null : currentMenuID, 'Company': localStorage.getItem("CompanyID"), 'Name': name, 'Description': description,
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
          //$$('reportView').hide();
          //$$('reportViewMy').hide();
          //$$("btnColumn").hide();
          //$$("reportTotal").hide();          
          //saveHideMode = true;
          
          getMenuUtilityAfterCreate(reportID);
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
    complete: function () {
      clearAllFilter();      
    }
  });
}

//обновления списка отчетов и открытие нового кастомного
function getMenuUtilityAfterCreate(reportID) {
  getLeftMenu();
  $$("win_repCustom|" + customMenuID).hide();
  $.ajax({
    url: '../../Services/Framework.asmx/GetMenuIcon',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $$('menuUtility').clearAll();
      $$('menuUtility').parse(data.d);

      var itemWindow = $$('menuUtility').getItem(reportID);
      if (itemWindow != null) {
        showReport(itemWindow);
        getReportData(itemWindow.id, itemWindow.WindowName, itemWindow.GetProcName, itemWindow.value, null);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

function setReportColumn(report, fieldName, name, sortOrder, width, isHidden) {
  $.ajax({
    url: '../../Services/Custom.asmx/SetReportColumn',
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

function editReport() {
  // установка фильтров
  $.ajax({
    url: '../../Services/Custom.asmx/SetFilters',
    timeout: 300000,
    data: JSON.stringify({ 'Report': currentMenuID, 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var items = JSON.parse(data.d);

      $$("reportName").setValue(items[0].Name);
      $$("reportDescription").setValue(items[0].Description);
      $$("reportSortOrder").setValue(items[0].SortOrder);

      //getSetting();

      $$('saveReport').show();
      $$('templateInfo').show();
      $$('editReport').hide();
      //$$("btnColumn").show();

      //pageName = 'reportTotal';
      //saveHideMode = false;
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
            url: '../../Services/Custom.asmx/DeleteReport',
            data: JSON.stringify({
              'Report': currentMenuID, 'Author': localStorage.getItem('Author')
            }),
            success: function (data) {
              //обновление бокового меню и закрытие отчета
              getLeftMenu();
              $$("win_reportCustom|" + currentMenuID).hide();
              //$$('saveReport').hide();
              //$$('templateInfo').hide();
              //$$('editReport').hide();
              //$$('reportView').hide();
              //$$('reportViewMy').hide();
              //$$("btnColumn").hide();
              //$$("reportTotal").hide();
              //saveHideMode = true;
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
    url: '../../Services/Custom.asmx/GetAccess',
    data: JSON.stringify({
      'Report': currentMenuID, 'User': localStorage.getItem('Author')
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
// -- конец Создание и правка кастомного отчета

// Кастомный отчет
var reportCustom = {
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
    { id: "WeekNumber", header: [(isEng) ? 'Week' : "Неделя", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, adjustBatch: 100 },
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

function getreportCustom(menuID, report, procName, reportName) {
  getReportData(menuID, report, procName, reportName);
}

//список рекламаций по визитам (ВинАгро)
function gettaskVisitVinagro(menuID, report, procName, reportName) {
  getTaskVisit(taskVisitGUID, taskVisitID, taskVisitName);
}

//окно рекламации
var taskVisitVinagro = {
  rows: [
    {
      rows: [
        {
          view: "toolbar", height: 40, borderless: true, css: "headerLine",
          cols: [
            {
              view: "button", id: 'buttonTaskVisit', type: "icon", width: 120, label: "Сохранить", icon: "fas fa-save", css: "headerLine",
              click: function () {
                var taskID = '';
                var taskName = '';
  
                var list = $$('listTask');
  
                for (var _id in list.data.pull) {
                  var item = list.getItem(_id);
  
                  if (item != null) {
                    if (item.IsActive == 1) {
                      taskID = taskID + item.id + '|';
                      taskName = taskName + item.Name + ', ';
                    }
                  }
                }
                saveTaskVisit(taskID, taskName);
              }
            },
            { view: "button", type: "danger", label: "Планограммы", width: 150, css: "headerLine", click: function () { getPlanograms() } },
            {},
          ]
        },
        { view: "template", id: 'taskVisitHeader', css: 'text-toolbar', borderless: true, template: "", height: 40 },
      ]
    },
    {
      rows: [
        {
          cols: [
            {
              view: "list", id: "listTask", template: "<div class='list-point-item'> <div class='list-point-item-text-small'>{common.Badge()} #Name#</div> </div>", select: true, type: "line", width: 280,
              type: {
                height: "auto",
                Badge: function (obj) {
                  if (obj.IsActive == 1) { return "<div style='float: left; margin: 0; padding: 0; width: 20px'><i class='far fa-check-square blue-color'></i></div>"; }
                  else return '';
                }
              },
              on: {
                onItemClick: function (id) {
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
    }
  ]
}

//планограммы (ВинАгро)
function getphotoVinagro(menuID, report, procName, reportName) {}

//окно для просмотра дополнительных фото
var photoVinagro = {
  rows: [
    {
      cols: [
        { view: "template", id: 'btnPhotoLayerFull', css: 'text-toolbar', borderless: true, template: "", height: 20, css: "headerLine", },
        { view: "datatable", id: "photoAdditional", height: 0, select: true, borderless: true, css: "headerLine", },
        { view: "icon", icon: "fas fa-angle-double-left", width: 40, css: "headerLine", click: function () { showPrevAdditPhoto(); } },
        { view: "icon", icon: "fas fa-angle-double-right", width: 40, css: "headerLine", click: function () { showNextAdditPhoto(); } },      
      ]
    },
    { view: "template", scroll: false, id: "photoDivFull", template: "<img scr='' id='photofulladd'/>", type: "line" }
  ]
}


///постановка задачи к визиту/тт
var createTaskPoint = {
  autowidth: true,
  rows: [
    {
      cols: [
        { view: "template", id: "pointAddress", template: "", autoheight: true },
        { view: "select", id: "selectTaskPointType", options: [{ id: 2, value: "Задание к Визиту" }, { id: 3, value: "Задание к ТТ" }], value: 2, width: 150, on: { onChange: "onTaskTypeChange" } },
        { view: "icon", icon: "fas fa-question-circle", tooltip: "Задание к визиту - задание будет отправлено МЕ выполнившему визит<br>Задание к тт - можно выбрать произвольного получателя или должность", width: 30, align: "center" }
      ]
    },
    {
      cols: [
        { width: 10 },
        { view: "textarea", id: 'newTaskPointText', height: 175, width: 250, placeholder: "Введите текст задания", type: "clean" },
        { width: 10 },
        {
          rows: [
            { height: 4 },
            { view: "template", id: "previewTaskPointPhoto", height: 125, width: 125 },
            {},
            {
              cols: [
                {},
                { view: "icon", icon: 'fas fa-camera', tooltip: "Добавить фото", click: "selectPhoto()" },
                {
                  view: "icon", id: "removeTaskPointPhotoBtn", icon: 'fas fa-trash', tooltip: "Удалить фото", hidden: true,
                  click: function () { tasks2.PhotoBase64 = null; $$("previewTaskPointPhoto").define("template", ""); $$("previewTaskPointPhoto").refresh(); $$("removeTaskPointPhotoBtn").hide(); }
                },
                {},
              ]
            },
            { height: 4 },
          ]
        },
        { width: 10 },
        {
          rows: [
            { width: 250, height: 4 },
            { view: "select", id: 'selectTaskPointCompany', options: [], tooltip: "Выберите компанию", hidden: true },
            { height: 5 },
            { view: "select", id: 'selectTaskPointCategory', options: [], tooltip: "Выберите категорию для задания" },
            { height: 5 },
            { view: "select", id: 'selectTaskPointRole', options: [], tooltip: "Выберите роль для задания", on: { onChange: "syncSelects" } },
            { height: 5 },
            { view: "select", id: 'selectTaskPointUser', options: [], tooltip: "Выберите сотрудника для задания", on: { onChange: "syncSelects" } },
            {},
            {
              view: "icon", icon: 'fas fa-paper-plane', tooltip: "Отправить задание",
              on: {
                onItemClick: function () {                  
                  let text = $$('newTaskPointText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
                  $$('newTaskPointText').setValue('');

                  if (text == '') {
                    webix.message({ type: "error", text: "Введите текст задания", expire: 1000 });
                    return;
                  }

                  const type = $$('selectTaskPointType').getValue();
                  const win = this.getTopParentView();
                  const user = (type == 2) ? tasks2.User : Number($$('selectTaskPointUser').getValue());
                  const bornedVisit = (type == 2) ? tasks2.Borned : null;
                  const company = Number($$('selectTaskPointCompany').getValue());
                  tasks2.GUID = tasks2.GUID + '_' + type

                  //для визитов не старше месяца
                  if (type == 2 && (Date.now() - new Date(tasks2.Borned.split('.').reverse().join('-'))) / 86400000 > 31) {
                    webix.message({ type: "error", text: "Нельзя ставить задание к визиту старше месяца", expire: 3000 });
                    return
                  }

                  $.ajax({
                    url: '../../Services/UI.asmx/SetTaskPoint2',
                    data: JSON.stringify({ 'Point': tasks2.Point, 'Text': text, 'Category': Number($$('selectTaskPointCategory').getValue()), 'Role': Number($$('selectTaskPointRole').getValue()), 'User': user, 'Company': company, 'BornedVisit': bornedVisit, 'GUID': tasks2.GUID, 'Type': type, 'Author': localStorage.getItem('Author') }),
                    success: function (data) {
                      webix.message({ type: "success", text: "Задание отправлено", expire: 2000 });
                      $$(win).hide();

                      //сохраняем фото в CHAT.Photos(если есть)
                      if (tasks2.PhotoBase64 && tasks2.PhotoBase64.length > 0) {
                        const imageData = tasks2.PhotoBase64.split(',')[1] || tasks2.PhotoBase64;

                        $.ajax({
                          url: '../../Services/App.asmx/UploadPhoto',
                          data: JSON.stringify({ 'Magic': 'TASKPOINT', User: localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID'), 'GUID': tasks2.GUID, 'ImageData': imageData, 'Lat': 0, 'Lon': 0, 'Error': 0, 'GeoTime': null, 'Point': tasks2.Point }),
                          success: function () { },
                          error: function (xhr, ajaxOptions, thrownError) { onError(); }
                        });
                      }
                    },
                    error: function (xhr, ajaxOptions, thrownError) { alert(xhr.responseText); }
                  });
                }
              }
            },
            { height: 4 }
          ]
        },
        { width: 10 },
      ]
    }
  ]
};