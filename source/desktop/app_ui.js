var tableName = '';

function hideButton() {
  if (pageName.indexOf("add") != -1) {
    $$('btnTable').hide();
    $$('btnMap').hide();    
    $$('btnExcel').hide();
    $$('btnColumn').hide();    
    $$('btnExcelDownload').hide();

    return;
  }
  
  $$('btnExcel').show();
  $$('btnColumn').show();
  $$('btnExcelDownload').hide();

  $$('rowPager').show();

  switch (pageName) {
    case 'pointVisit':
      $$('btnMap').show();
      $$('btnTable').show(); 
      $$('btnExcelDownload').show();

      break;

    case 'userVisit':
      $$('btnMap').show();   
      $$('btnTable').show();
      $$('btnExcelDownload').show();
      
      break;

    case 'accVisitReport':
      $$('btnMap').hide();      
      $$('visitGeoPage').collapse();
      
      break;

    case 'reportPhoto':
      $$('btnMap').hide();
      $$('btnTable').hide();      
      $$('photoViewerPage').collapse();

      var grid = $$('photoView');

      if (photoView == 'TABLE') {
        grid.select(1);        
      }
      else if (photoView == 'ICON') {
        grid.select(2);
      }
      else if (photoView == 'PICTURE') {
        grid.select(3);
      }

      break;

    case 'reportTask':
      $$('btnMap').hide();      
      $$('taskPage').collapse();

      break;

    case 'reportPhotoPro':
      $$('btnMap').hide();
      $$('btnTable').hide();
      $$('btnExcel').hide();
      $$('btnColumn').hide();

      break;

    case 'mapDashboard':
      $$('btnMap').hide();
      $$('btnTable').hide();
      $$('btnExcel').hide();
      $$('btnColumn').hide();

      break;

    case 'reportTotal':
      var grid = $$('reportView');

      if (reportView == 'TABLE') {
        grid.select(1);
      }
      else if (reportView == 'PIVOT') {
        grid.select(2);
      }     

      break;

    default:
      $$('btnMap').hide();        
  }

  
}

function refresh() {
  $$('photoViewerPage').collapse();
  $$('companyname').setValue(localStorage.getItem('CompanyName'));

  if (filterChange == null)
    filterChange = IsOnline;

  $$("btnColumn").show();  

  var item = $$('menuReport').getItem(pageID);
 
  if (pageName.indexOf("add") != -1) {   

    $$('addReportPivot').show();
    
    if (filterChange)
      getAdditionReport();

    return;
  }

  $$('artTypeList').hide();
  $$('photoTypeList').hide();
  $$('photoView').hide();
  $$('reportView').hide();

  if ((pageName != 'reportTotalCustom') || (pageName == 'reportTotal' && (saveHideMode))) {
    $$('saveReport').hide();
    $$('reportViewMy').hide();
    $$('templateInfo').hide();
    $$('reportView').hide();
  }

  switch (pageName) {

    case 'pointVisit':
      if (filterChange)
        getPointVisit();

      switch (viewName) {
        case 'table':          
          $$('pointVisit').show();

          $$('pointVisit').define('pager', 'pagerReport');
          $$('pointVisit').refresh();

          break;
        case 'map':
          $$('mapArea').show();
          $('#map').show();

          mapPointVisit();                    
         
          break;
      }

      $$('pointVisit').refresh();
      break;

    case 'userVisit':
      if (filterChange)
        getUserVisit();

      switch (viewName) {
        case 'table':
          $$('userVisit').show();

          $$('userVisit').define('pager', 'pagerReport');
          $$('userVisit').refresh();

          break;
        case 'map':
          $$('mapArea').show();
          $('#map').show();          

          mapActiveUser();
          
          break;
      }

      $$('userVisit').refresh();
      break;

    case 'reportPhoto':
      $$('photoTypeList').show();
      $$('photoView').show();
      $$('accPhotoReports').show();

      $$('reportPhoto').define('pager', 'pagerReport');
      $$('reportPhoto').refresh();

      $$('reportPhoto').show();

      hideFields('reportPhoto');      

      if (filterChange)
        getReportPhoto();
      
      break;

    case 'reportPhotoPro':
      $$('photoTypeListPro').show();
      $$('accPhotoReportsPro').show();
      $$('reportPhotoPro').show();

      $$('reportPhotoPro').define('pager', 'pagerReport');
      $$('reportPhotoPro').refresh();

      if (filterChange)
        getReportPhotoPro();
      break;

    case 'reportTotal':
      $$('artTypeList').show();
      $$('reportView').show();      
      $$('accPhotoReports').show(); 

      customReportID = -1;

      switch (reportView) {
        case 'TABLE':
          $$('reportTotal').show();

          $$('reportTotal').define('pager', 'pagerReport');
          $$('reportTotal').refresh();

          if (saveHideMode)
            hideFields('reportTotal');
          break;
        case 'PIVOT':
          $$('pivotStandart').show();
          break;
      }
      
      if (filterChange)
        getTotalReport();

      $$('reportTotal').refresh();
      break;

    case 'reportTotalCustom':
      $$('artTypeList').show();
      $$('reportView').hide();      

      $$('accPhotoReports').show();

      switch (reportView) {
        case 'TABLE':
          $$('reportTotal').show();

          $$('reportTotal').define('pager', 'pagerReport');
          $$('reportTotal').refresh();

          //hideFields('reportTotal');
          break;
        case 'PIVOT':
         // $$('pivotStandart').show();
          //getTotalReport();

          break;
      }

      if (filterChange)
        getTotalReportCustom();

      $$('reportTotal').refresh();
      break;

    case 'reportPhotoPro':
      $$('photoTypeListPro').show();
      $$('accPhotoReportsPro').show();
      $$('reportPhotoPro').show();

      $$('reportPhotoPro').define('pager', 'pagerReport');
      $$('reportPhotoPro').refresh();

      if (filterChange)
        getReportPhotoPro();
      break;

    case 'reportAI':
      $$('reportAI').show();
      break;

    case 'reportReady':
      if (filterChange)
        getReportReady();

      $$(pageName).show();

      $$('reportReady').refresh();
      break;

    case 'reportVisit':
      $$('accPhotoReports').show();

      $$('reportVisit').define('pager', 'pagerReport');
      $$('reportVisit').refresh();

      $$('reportVisit').show();      

      hideFields('reportVisit');

      if (filterChange)        
        getVisitReport();
     
      $$('reportVisit').refresh();
      break;

    case 'reportTask':
      $$('accTaskReports').show();

      break;

    case 'taskTask':
      $$('reportTask').show();

      $$('reportTask').define('pager', 'pagerReport');
      $$('reportTask').refresh();

      hideFields('reportTask');
      $$('taskView').hide();

      if (filterChange)
        getTaskReport();

      break;

    case 'taskFocus':
      $$('reportFocus').show();

      $$('reportFocus').define('pager', 'pagerReport');
      $$('reportFocus').refresh();

      hideFields('reportFocus');

      $$('taskView').hide();

      if (filterChange)
        getFocusReport();

      break;

    case 'task':
      $$('task').show();

      $$('task').define('pager', 'pagerReport');
      $$('task').refresh();

      hideFields('task');

      $$('taskView').show();

      getTask();

      break;

    case 'reportPivot':
      $$('reportPivot').show();

      //$$('reportPivot').refresh();
      break;

    case 'reportAdd':
      $$('reportAdd').show();
      break;

    case 'pivotDiscipline':
      $$('pivotDiscipline').show();

      if (filterChange)
        getPivotDiscipline();
      break;

    case 'pivotDisciplineUsers':
      $$('pivotDisciplineUsers').show();

      if (filterChange)
        getPivotDisciplineUsers();
      break;

    case 'routeTotal':
      $$('routeTotal').show();

      if (filterChange)
        getRouteTotal();
      break;

    case 'routeError':
      $$('routeError').show();

      if (filterChange)
        getRouteError();
      break;

    case 'reportStock':
      $$('reportStock').show();

      if (filterChange)
        getReportStock();
      break;
      
    case 'pivotVisitTotal':
      if (filterChange)
        getPivotVisitTotal();

      $$('pivotVisitTotal').show();

      $$('pivotVisitTotal').define('pager', 'pagerReport');
      $$('pivotVisitTotal').refresh();

      $$('pivotVisitTotal').refresh();
      break;

    case 'reportDashboard':
      $$('btnTable').hide();
      $$('btnExcel').hide();
      $$('btnColumn').hide();   
      $$('reportDashboard').show();
      break;

    case 'mapDashboard':
      $$('mapArea').show();
      $('#map').show();
      getMapDashboard();
      break;

    case 'mainDashboard':
      $$('btnTable').hide();
      $$('btnExcel').hide();
      $$('btnColumn').hide();   
      $$('mainDashboard').show();
      getReportDash();
      break;

    case 'reportDirectory':
      $$('reportDirectory').show();
      $$('menuMatrix').hide();
      $$('menuAP').hide();
      break;

    case 'reportMatrix':
      $$('menuMatrix').show();
      $$('menuAP').hide();
      break;
   
    case 'reportAP':
      $$('menuAP').show();
      $$('menuMatrix').hide();
      break;

    case 'reportDirectoryArt':
      $$('reportDirectoryArt').show();
      getDirectoryArt();
      break;

    case 'reportDirectoryArtPointMaps':
      $$('reportDirectoryArtPointMaps').show();
      getDirectoryArtPointMaps();
      break;

    case 'reportDirectoryArtFormatMap':
      $$('reportDirectoryArtFormatMap').show();
      getDirectoryArtFormatMap();
      break;

    case 'reportDirectoryArtNetworkMap':
      $$('reportDirectoryArtNetworkMap').show();
      getDirectoryArtNetworkMap();
      break;

    case 'reportAIMatrix':
      $$('reportAIMatrix').show();
      getReportAIMatrix();
      break;

    case 'reportAIMatrixTotal':
      $$('reportAIMatrixTotal').show();
      getReportAIMatrixTotal();
      break;

    case 'reportDirectoryAP':
      $$('reportDirectoryAP').show();
      getDirectoryAP();
      break;

  }

  if (item != null) {
    item.refreshed = false;
    $$('menuReport').refresh();
  }

  filterChange = IsOnline;
}

function searchColumn(config, field) {
  for (var i = 0; i < config.length; i++) {
    if (config[i].id == field) {
      return true;
    }
  }
  return false;
}

function excel() {
  var dataTable = pageName;

  if (pageName == 'taskTask') {
    webix.toExcel($$('reportTask'), { filterHTML: true });
    return;
  }

  if (pageName == 'taskFocus') {
    webix.toExcel($$('reportFocus'), { filterHTML: true });
    return;
  }

  if (dataTable == 'reportTotal' || dataTable == 'reportTotalCustom') {
    switch (reportView) {
      case 'TABLE':
        dataTable = 'reportTotal';       
        break;
      case 'PIVOT':
        dataTable = 'pivotStandart';         
    }
  }
     
  webix.toExcel($$(dataTable), { filterHTML: true, heights: false });  
}

//16.05.22 экспорт в excel сразу после формирования отчета
function toExcelDownload() {
  $$('companyname').setValue(localStorage.getItem('CompanyName'));
  webix.message({ type: "info", text: "Формируем отчет для загрузки...", expire: 3000 });

  switch (pageName) {

    case 'pointVisit':
      getPointVisit('xls');
      break;

    case 'userVisit':
      getUserVisit('xls');
      break;
  }
}

function excelDownload(reportName, dateReport) {
  var excelName
  switch (reportName) {
    case 'pointVisit':
      excelName = 'Посещенные ТТ ' + dateReport
      break;

    case 'userVisit':
      excelName = 'Активные сотрудники ' + dateReport
      break;
  }
  webix.message({ type: "success", text: "Отчет загружен.", expire: 2000 });
  webix.toExcel($$(reportName), { filterHTML: true, filename: excelName }); 
}
//

function setPhotoHeight() {
  grid = $$('reportPhoto');

  if (photoView == 'TABLE') {
    //  if (grid.isColumnVisible("photoIcon"))
    //    grid.hideColumn("photoIcon");
    //  if (grid.isColumnVisible("photoPicture"))
    //    grid.hideColumn("photoPicture");

    grid.adjustRowHeight("PointID", true);
    grid.refresh();
  }
  else if (photoView == 'ICON') {
    //  if (!grid.isColumnVisible("photoIcon"))
    //    grid.showColumn("photoIcon");
    //  if (grid.isColumnVisible("photoPicture"))
    //    grid.hideColumn("photoPicture");

    grid.adjustRowHeight("photoIcon", true);
    grid.refresh();
  }
  else if (photoView == 'PICTURE') {
    //  if (grid.isColumnVisible("photoIcon"))
    //    grid.hideColumn("photoIcon");
    //  if (!grid.isColumnVisible("photoPicture"))
    //    grid.showColumn("photoPicture");

    grid.adjustRowHeight("photoPicture", true);
    grid.refresh();
  }  
}

function mapInit() {
  ymaps.ready(init);
}

function mapInitPhotoGoogle() {
  var photoLat = Number(sessionStorage.getItem('photoLat'));
  var photoLon = Number(sessionStorage.getItem('photoLon'));
  var error = Number(sessionStorage.getItem('photoError'));
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = Number(sessionStorage.getItem('pointLat'));
  var pointLon = Number(sessionStorage.getItem('pointLon'));

  var mapContainer = document.getElementById('mapPhoto');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";  

  myMap = new google.maps.Map(mapContainer, {
    zoom: 17,
    center: new google.maps.LatLng(photoLat, photoLon)    
  });

  var markersBounds = new google.maps.LatLngBounds();  
    
  var photoMarker = new google.maps.Marker({
    position: { lat: photoLat, lng: photoLon },
    map: myMap,
    label: 'Фото',
    title: 'Координаты фото ' + address
  });

  markersBounds.extend(new google.maps.LatLng(photoLat, photoLon));

  if (pointLat != 0) {
    var pointMarker = new google.maps.Marker({
      position: { lat: pointLat, lng: pointLon },
      map: myMap,
      label: 'ТТ',
      title: 'ТТ по адресу: ' + address
    });

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
      }]
    });
    flightPath.setMap(myMap);
  
    markersBounds.extend(new google.maps.LatLng(pointLat, pointLon));
  }

  myMap.setCenter(markersBounds.getCenter(), myMap.fitBounds(markersBounds));
}

function mapInitUser() {
  ymaps.ready(initUser);
}

function mapInitPhoto() {
  ymaps.ready(initPhoto);
}

function mapInitVisit() {
  ymaps.ready(initVisit);
}

function mapMHP() {
  ymaps.ready(initMHP);
}

function mapInitTracking() {
  initTracking();
}

function init() {
  if (myMap != null) myMap.destroy();

  var list = $$('pointVisit');

  if (list.count() == 0)
    return;

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
  

  pointMarkers = [];

  clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedVioletClusterIcons',
    groupByCoordinates: false,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false
  });

  clustererActive = new ymaps.Clusterer({
   
  });

  var prevLat, prevLon;
  var i = 0;

   for (var id in list.data.pull) {
     var item = list.getItem(id);

     var name = item.NetworkName + '<br>' + item.CityName + ', ' + item.Address;
     var name2 = name + "<br/>Визитов: " + item.VisitCount + " (посл. " + item.Borned + ")" + 
       "<br/><a href='javascript:void(0)' onclick='updateStatusPointVisit(" + item.id + "); myMap.balloon.close();'>" + ((item.status == 0) ? "Выбрать" : "Отменить выбор") + "<a>";
     
    //if (item.Lat != 0) {
      pointMarkers[i] = new ymaps.Placemark([item.Lat, item.Lon],
       {
         hintContent: name,
         balloonContent: name2,
         iconContent: item.NetworkName
       },
       {
         preset: ((item.status == 0) ? 'islands#governmentCircleIcon' : 'islands#blueGovernmentIcon'),
         iconColor: '#3b5998'
         //preset: 'islands#nightIcon'
       });

      if (item.status == 1) {
        clustererActive.add(pointMarkers[i]);
      }

      i++;   
  }

  clusterer.add(pointMarkers);  

  myMap.geoObjects.add(clusterer);

  myMap.setBounds((clustererActive.getBounds() == null) ? clusterer.getBounds() : clustererActive.getBounds(), { checkZoomRange: true }).then(function () {
    if (map.getZoom() > 10)
      map.setZoom(10);
  });
  
}

function initUser() {
  if (myMap != null) myMap.destroy();

  var list = $$('userVisit');

  if (list.count() == 0)
    return;

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


  userMarkers = [];

  clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedVioletClusterIcons',
    groupByCoordinates: false,
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false
  });

  clustererActive = new ymaps.Clusterer({

  });

  var prevLat, prevLon;
  var i = 0;

  for (var id in list.data.pull) {
    var item = list.getItem(id);

    var name = item.UserName + '<br>' + item.RoleName + '<br>Руководитель: ' + item.MasterName;
    var name2 = name + "<br/>Визитов: " + item.VisitCount + " (посл. " + item.Borned + ")" +
      "<br/><a href='javascript:void(0)' onclick='updateStatusUserVisit(" + item.id + "); myMap.balloon.close();'>" + ((item.status == 0) ? "Выбрать" : "Отменить выбор") + "<a>";

    if (item.Lat != 0) {
      userMarkers[i] = new ymaps.Placemark([item.Lat, item.Lon],
       {
         hintContent: name,
         balloonContent: name2,
         iconContent: item.UserName
       },
       {
         preset: ((item.status == 0) ? 'islands#blueRunCircleIcon' : 'islands#blueRunIcon'),
         iconColor: '#3b5998'
         //preset: 'islands#nightIcon'
       });

      if (item.status == 1) {
        clustererActive.add(userMarkers[i]);
      }

      i++;
    }    
  }

  clusterer.add(userMarkers);

  myMap.geoObjects.add(clusterer);

  myMap.setBounds((clustererActive.getBounds() == null) ? clusterer.getBounds() : clustererActive.getBounds(), { checkZoomRange: true }).then(function () {
    if (map.getZoom() > 10)
      map.setZoom(10);
  });
}

function initPhoto() {
  if (myMap != null) myMap.destroy();

  var photoLat = sessionStorage.getItem('photoLat');
  var photoLon = sessionStorage.getItem('photoLon');
  var error = sessionStorage.getItem('photoError');
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = sessionStorage.getItem('pointLat');
  var pointLon = sessionStorage.getItem('pointLon');

  myMap = new ymaps.Map("mapPhoto", {
    center: [photoLat, photoLon],
    controls: ['zoomControl'],
    zoom: 17
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('mapPhoto');
  mapContainer.style.width = width/2 + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var photoMarker = new ymaps.Placemark([photoLat, photoLon],
    {
      hintContent: 'Координаты фото ' + address,
      balloonContent: 'Координаты фото: ' + address
    },
    {
      preset: 'islands#blueVideoCircleIcon'
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
      preset: 'islands#blueHomeCircleIcon'
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

function initVisitGoogle() {
  var photoLat = Number(sessionStorage.getItem('photoLat'));
  var photoLon = Number(sessionStorage.getItem('photoLon'));
  var error = Number(sessionStorage.getItem('photoError'));
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = Number(sessionStorage.getItem('pointLat'));
  var pointLon = Number(sessionStorage.getItem('pointLon'));

  var mapContainer = document.getElementById('mapVisit');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";


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

function initVisit() {
  if (myMap != null) myMap.destroy();

  var photoLat = sessionStorage.getItem('photoLat');
  var photoLon = sessionStorage.getItem('photoLon');
  var error = sessionStorage.getItem('photoError');
  var address = sessionStorage.getItem('pointAddress');

  var pointLat = sessionStorage.getItem('pointLat');
  var pointLon = sessionStorage.getItem('pointLon');

  myMap = new ymaps.Map("mapVisit", {
    center: [photoLat, photoLon],
    controls: ['zoomControl'],
    zoom: 17
  },
  {
    autoFitToViewport: 'always'
  });

  myMap.container.getElement().style.width = width + 'px';
  myMap.container.getElement().style.height = height + 'px';

  var mapContainer = document.getElementById('mapVisit');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";

  myMap.container.fitToViewport();

  var photoMarker = new ymaps.Placemark([photoLat, photoLon],
    {
      hintContent: 'Координаты визита ' + address,
      balloonContent: 'Координаты визита: ' + address
    },
    {
      preset: 'islands#blueGovernmentCircleIcon'
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
      preset: 'islands#blueHomeCircleIcon'
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

  $('#mapMHP').show();
}

// просмотр визитов на карте МХП
function initMHP() {
  var list = $$('visitMHP');

  if (list.data.count() == 0)
    return;


  var mapContainer = document.getElementById('mapMHP');
  mapContainer.style.width = width + "px";
  mapContainer.style.height = height + "px";

  var locations = []
  var networknames = []
  var citynames = []
  var addressnames = []
  var usernames = []
  var masternames = []
  var routetimenames = []
  var visittimenames = []
  var istruenames = []
  
  var markersBounds = new google.maps.LatLngBounds();

  for (var id in list.data.pull) {
    var item = list.getItem(id);
    locations.push({ lat: item.Lat, lng: item.Lon });
    networknames.push({ networkname: item.NetworkName });
    citynames.push({ cityname: item.CityName });
    addressnames.push({ addressname: item.Address });
    usernames.push({ username: item.MerchName });
    masternames.push({ mastername: item.SuperName });
    routetimenames.push({ routetimename: item.RouteTime });
    visittimenames.push({ visittimename: item.VisitTime });
    istruenames.push({ istruename: item.IsTrue });
    
    markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lon));
  }

  var map = new google.maps.Map(mapContainer, {
    zoom: 4,
    center: { lat: locations[0].lat, lng: locations[0].lng }
  });

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      map: map,
      icon: (istruenames[i].istruename == 'да' ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : (visittimenames[i].visittimename == '-' ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'  : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png')),

      title: networknames[i].networkname + ' ' + citynames[i].cityname + ' ' + addressnames[i].addressname + ', ' + usernames[i].username + ', руководитель: ' + masternames[i].mastername + 
        ', План: ' + routetimenames[i].routetimename + ' факт: ' + visittimenames[i].visittimename
    });
  });

  /*var markerCluster = new MarkerClusterer(map, markers,
    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });*/

  map.setCenter(markersBounds.getCenter(), map.fitBounds(markersBounds));
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

function hideFields(table, isNotHide) {
  tableName = table;
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/GetHiddenField',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Table': table }),
    success: function (data) {
      var list = $$('tableSetting');

      list.clearAll();
      list.parse(data.d);

      //проверка статуса сотрудника и завершение сеанса в случае неактивности по компании
      var result = JSON.parse(data.d);
      if (result.length > 0) {
        if (result[0].UserStatus == 0) {
          alert('Этот логин больше не действителен. Обратитесь к вашему руководителю.');
          exit();
        };
      };

      //05.03.24 уведомление для должников
     // if ([91, 326].includes(parseInt(localStorage.getItem('CompanyID')))) {
     //   webix.alert({ type: "alert-warning", title: "Предупреждение", text: "В связи с задолженностью по оплате услуг за период октябрь 2023 - февраль 2024, услуги в ближайшее время могут быть отключены" })
     // }

      if (isNotHide || isNotHide == null) {
        for (var i = 0; i < $$(table).config.columns.length; i++) {
          var columnName = $$(table).config.columns[i].id;

          if (columnName == "status") {
            if (!$$(table).isColumnVisible("status"))
              $$(table).showColumn("status");
          }
        }

        // сначала показываем скрытые столбцы
        var hiddenCount = $$(table).getState().hidden.length;
        var hiddenColumn = $$(table).getState().hidden;

        for (var i = 0; i < hiddenCount; i++)
          $$(table).showColumn(hiddenColumn[i]);

        // потом скрываем скрытые
        for (var id in list.data.pull)
          if ($$(table).isColumnVisible(list.getItem(id).FieldName))
            $$(table).hideColumn(list.getItem(id).FieldName);
      }

      $$('btnColumn').define('badge', $$(table).getState().hidden.length);
      $$('btnColumn').refresh();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function download() {
  var text = '';
  
  if (tab == 'route') {
    $$('routeDownload').clearAll();

    text = 'Для загрузки маршрутов из файла Microsoft Excel необходимо выполнить следущие шаги:<br/>' +
      '1. Выгрузите шаблон маршрутов. Для этого нажмите кнопку "Экспорт в Excel" на странице маршрутов.<br/>' +
      '   В полученном файле напротив дня недели, в который запланировано посещение ТТ, будет указано "Да".<br><br/>' +
      '2. НЕ МЕНЯЯ разметку файла проставьте "Да" напротив ТТ и дней маршрутов (поле ID не изменяйте).<br><br/>' +
      '3. Сохраните файл как текст юникод .txt. Внимание! Для браузера Firefox требуется пересохранение файла в текстовом редакторе в формат UTF-8.<br><br/>' +
      '4. Нажмите кнопку "Загрузить" и выберите сохраненный файл. Если структура файла не изменена, на форме отразятся загруженные данные.<br/>' +
      '   Внимание! Показаны будут только изменяемые или новые данные.<br/><br/>' +
      '5. Нажмите кнопку "Применить". Данные будут загружены.';

    $$('btn-route-download').show();
    $$('btn-route-download-run').hide();

    $$('routeDownload').showOverlay(text);
    $$('routeDownloads').show();
  }

  if (tab == 'route2') {
    $$('route2Download').clearAll();

    text = 'Для загрузки маршрутов из файла Microsoft Excel необходимо выполнить следущие шаги:<br/>' +
      '1. Выгрузите шаблон маршрутов. Для этого нажмите кнопку "Экспорт в Excel" на странице маршрутов.<br/>' +
      '   В полученном файле напротив дня недели, в который запланировано посещение ТТ, будет указано "Да".<br><br/>' +
      '2. НЕ МЕНЯЯ разметку файла проставьте "Да" напротив ТТ и дней маршрутов (поле ID не изменяйте).<br><br/>' +
      '3. Сохраните файл как текст юникод .txt. Внимание! Для браузера Firefox требуется пересохранение файла в текстовом редакторе в формат UTF-8.<br><br/>' +
      '4. Нажмите кнопку "Загрузить" и выберите сохраненный файл. Если структура файла не изменена, на форме отразятся загруженные данные.<br/>' +
      '   Внимание! Показаны будут только изменяемые или новые данные.<br/><br/>' +
      '5. Нажмите кнопку "Применить". Данные будут загружены.';

    $$('btn-route-download2').show();
    $$('btn-route-download-run2').hide();

    $$('route2Download').showOverlay(text);
    $$('route2Downloads').show();
  }
}

function onExcelUploadRoute() {
  list = $$('routeDownload');

  $$('btn-route-download').hide();
  $$('btn-route-download-run').show();

  showProgress($$('navigation'));

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

  $$('navigation').hideProgress();
}

function loadRoute() {
  list = $$('routeDownload');

  if (list.count() == 0) return;

  showProgress($$('navigation'));

  var interval = setInterval(
  function () {
    var item = list.find(function (obj) {
      return (obj.check == "on")
    }, true);

    if (item.data0 == null) {
      clearInterval(interval);

      list.refresh();
    }

    sendExport('../Services/Desktop.asmx/SetRoute',
     {
       'Company': company, 'Point': item.data1, 'User': item.data14, 'Link': item.data0, 'Day1': $.trim(item.data7), 'Day2': $.trim(item.data8), 'Day3': $.trim(item.data9),
       'Day4': $.trim(item.data10), 'Day5': $.trim(item.data11), 'Day6': $.trim(item.data12), 'Day7': $.trim(item.data13), 'Author': localStorage.getItem('Author')
     },
     list, item, item.id);
  },
  200);

  $$('navigation').hideProgress();
}

function onExcelUpload(item) {
  $$(tab + 'Download').hideOverlay();

  var list = $$(tab + 'Download');
  showProgress($$('navigation'));

  list.clearAll();

  list.load("../Temp/" + tab + "_" + localStorage.getItem('CompanyID') + ".txt", "mycsv", {
    error: function (text, data, http_request) {
      webix.alert("Ошибка загрузки данных!");
      $$('navigation').hideProgress();
    },
    success: function (text, data, http_request) {
      $$('navigation').hideProgress();

      if (tab = 'route') {
        onExcelUploadRoute();
      }
      if (tab = 'route2') {
        onExcelUploadRoute2();
      }
    } 
  });
}

// отправка (при экспорте )
function sendExport(proc, record, list, item, id) {
  $.ajax({
    url: proc,
    data: JSON.stringify(record),
    success: function (data) {
      list.remove(id);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      item.Result = 'Ошибка загрузки данных.';
      //list.updateItem(id, item);
    }
  });
}

function onError() {
  webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
}

function initTracking() {
  var list = $$('geoTracking');
  if (list.data.count() == 0) return;

  try {
    if (myMap != null) myMap.destroy();
  } 
  catch (err){
    
  }
  

  var pointLat = Number(sessionStorage.getItem('pointLat'));
  var pointLon = Number(sessionStorage.getItem('pointLon'));

  var mapContainer = document.getElementById('mapVisit');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";

  //$('#mapVisit').html('');

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
      pointLapel = (item.SortOrder != null) ? item.SortOrder : 'ТТ'; //24.02.22 порядковый номер визита на карте трекинга
      var pointMarker = new google.maps.Marker({
        position: { lat: item.Lat, lng: item.Lon },
        map: myMapTracking,
        label: pointLapel + '',
        title: 'ТТ по адресу: ' + item.Address + ', ' + item.StartGeo + ((item.FinishGeo == '') ? '' : '-' + item.FinishGeo)
      });

      //markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lat));
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

function mapActiveUser() {

  var list = $$('userVisit');
  if (list.data.count() == 0) return;

  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";

  var locations = []
  var usernames = []
  var borneds = []
  var markersBounds = new google.maps.LatLngBounds();

  for (var id in list.data.pull) {
    var item = list.getItem(id);
    locations.push({ lat: item.Lat, lng: item.Lon });
    usernames.push({ username: item.UserName });
    borneds.push({ borned: item.Borned });
    markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lon));
  }

  var map = new google.maps.Map(mapContainer, {
    zoom: 4,
    center: { lat: locations[0].lat, lng: locations[0].lng }
  });

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      title: usernames[i].username + ' ' + borneds[i].borned
    });
  });

  var markerCluster = new MarkerClusterer(map, markers,
      { imagePath: 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js' });

  map.setCenter(markersBounds.getCenter(), map.fitBounds(markersBounds));
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

function mapPointVisit() {

  var list = $$('pointVisit');
  if (list.data.count() == 0) return;

  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width / 2 + "px";
  mapContainer.style.height = height + "px";

  var locations = []
  var networkNames = []
  var addresses = []
  var borneds = []
  var userName = []
  var markersBounds = new google.maps.LatLngBounds();

  for (var id in list.data.pull) {
    var item = list.getItem(id);
    locations.push({ lat: item.Lat, lng: item.Lon });
    networkNames.push({ networkName: item.NetworkName });
    addresses.push({ address: item.Address });
    borneds.push({ borned: item.Borned });
    userName.push({ user: item.UserName })
    markersBounds.extend(new google.maps.LatLng(item.Lat, item.Lon));
  }

  var map = new google.maps.Map(mapContainer, {
    zoom: 4,
    center: { lat: locations[0].lat, lng: locations[0].lng }
  });

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      title: networkNames[i].networkName + ' ' + addresses[i].address + ' ' + borneds[i].borned + ', ' + userName[i].user
    });
  });

  var markerCluster = new MarkerClusterer(map, markers,
    { imagePath: 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js' });

  map.setCenter(markersBounds.getCenter(), map.fitBounds(markersBounds));
}

function mapPointDashboard() {

  // таблица с данными
  var list = $$('mapDashboard');
  if (list.data.count() == 0) return;

  // контейнер для карты
  var mapContainer = document.getElementById('map');
  mapContainer.style.width = width - 200 + "px";
  mapContainer.style.height = height - 50 + "px";

  // обработка данных
  var locations = []
  var names = []
  var addresses = []
  var colors = []
  var markersBounds = new google.maps.LatLngBounds();

  for (var id in list.data.pull) {
    var item = list.getItem(id);
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
    }
    ,notservic: {
      name: 'Не обслуживается (' + notServiced + ')',
      icon: '/res/grey.png'
    }
    ,notconnected: {
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