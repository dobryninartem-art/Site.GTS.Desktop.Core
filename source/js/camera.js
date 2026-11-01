// mobile device
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function () {  
    app.receivedEvent('deviceready');   
  },

  getPhoneInfo: function () {
    if (window.device !== undefined) {
      try {
        send('SetPhoneInfo', { 'Phone': localStorage.getItem('Phone'), 'Model': device.model, 'Device': device.platform, 'Version': device.version, 'AppVersion': verData }, null, null);
      }
      catch (e) { }
    }
    else {      
      try {
        var model = navigator.userAgent;

        send('SetPhoneInfo', { 'Phone': localStorage.getItem('Phone'), 'Model': model, 'Device': '', 'Version': '', 'AppVersion': verData }, null, null);
      }
      catch (e) {
        //alert(e);
      }
    }
  },
  
  takePicture: function (guid, page) {
    var _GUID = guid;

    imagePhoto = null;

    var key = author.toString() + '_' + _GUID.toString();

    var flag = (isMobileDevice) ? 1 : 2;

    try {
      navigator.camera.getPicture(
      function (image) {
        imagePhoto = image;
        
        send('UploadPhoto', { 'GUID': _GUID, 'User': localStorage.getItem('Author'), 'FileName': key, 'ImageData': image, 'Magic': page, 'Company': localStorage.getItem('CompanyID'), 'Flag': flag }, null, null);

        try {
          // определяем геокоординаты
          navigator.geolocation.getCurrentPosition(
          function (position) {
            sessionStorage.setItem('photoLat', position.coords.latitude);
            sessionStorage.setItem('photoLon', position.coords.longitude);
            sessionStorage.setItem('photoError', position.coords.accuracy);

            var point = (isVisit == 1) ? pointID : null;

            var geoTime = getDateFromTimeStamp(position.timestamp);    

            send('SetPhotoGeo', { 'GUID': _GUID, 'User': localStorage.getItem('Author'), 'Lat': position.coords.latitude, 'Lon': position.coords.longitude, 'Error': position.coords.accuracy, 'Point': point, 'GeoTime': geoTime, 'Flag': flag }, null, null);

            // пытаемся обновить информацию по геокоординатам
            if (page == 'photo') {
              var row = $$("photo").find(function (obj) { return (obj.GUID.toString() == _GUID) }, true);
              if (row.id != null) {
                var item = list.getItem(row.id);
                item.Lat = position.coords.latitude;
                item.Lon = position.coords.longitude;
                item.Error = position.coords.accuracy;

                $$("photo").updateItem(item.id, item);
              }
            }
          },
          function (error) {            
            // пытаемся обновить информацию по геокоординатам
            if (page == 'photo') {
              var row = $$("photo").find(function (obj) { return (obj.GUID.toString() == _GUID) }, true);
              if (row.id != null) {
                var item = list.getItem(row.id);
                item.Lat = 0;
                item.Lon = 0;
                item.Error = 0;

                $$("photo").updateItem(item.id, item);
              }
            }
          },
          { maximumAge: 4000, timeout: 12000, enableHighAccuracy: true });

        }
        catch (e) {
        }
        
        onAfterPhotoUpload(page, key);

        //navigator.camera.cleanup(function () { }, function (message) { });
      },
      function (message) {
        //alert('Ошибка камеры: ' + message);
        //onAfterPhotoUpload(page, key);
      },
      {
        quality: 60,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: Dimension,
        targetHeight: Dimension,
        /*targetWidth: (page == 'photo' || page == 'art') ? 1920 : 1280,
        targetHeight: (page == 'photo' || page == 'art') ? 1920 : 960,*/
        correctOrientation: true,
        saveToPhotoAlbum: false
      });
    }
    catch (e) {
      //alert('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
    }
  },

  takeUserPhoto: function () {
    navigator.camera.getPicture(
    function (image) {
      if (image != null) {
        $.ajax({
          url: URLname + 'Services/UI.asmx/UploadUserPhoto',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'ImageData': image }),
          success: function (data) {
            var date = new Date();
            var time = date.getTime();

            $("div.facebig").removeAttr('style').attr('style', "background: url(" + URLname + "Photos/User/" + author + ".jpg?time=" + time + ") no-repeat center center; background-size: 150px 150px;");

          },
          error: function (xhr, ajaxOptions, thrownError) {
            
          }
        });                             
      }
    },
    function (message) {},
    {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1366,
      targetHeight: 768,
      correctOrientation: true
    })
  },

  getUserGeo: function () {
    showProgress("navigation");
    GUID = +new Date;

    imagePhoto = null;

    navigator.geolocation.getCurrentPosition(
    function (position) {
      $$('textChat').setValue('Геокоординаты сотрудника <span style="color: transparent">' + position.coords.latitude + '|' + position.coords.longitude + '|' + position.coords.accuracy + '</span>');

      saveChat();

      $$('navigation').hideProgress();
    },
    function (error) {
      $$('textChat').setValue('Геокоординаты сотрудника не определены');
      saveChat();

      $$('navigation').hideProgress();
    },
    { maximumAge: 4000, timeout: 10000, enableHighAccuracy: true });
  },

  getGeo: function () {
    navigator.geolocation.getCurrentPosition(
    function (position) {
      send('SetPointGeo', { 'Point': pointID, 'Lat': position.coords.latitude, 'Lon': position.coords.longitude }, null, null);
    },
    function (error) {

    },
    { maximumAge: 4000, timeout: 10000, enableHighAccuracy: true });
  },

  photoGeo: function (point, guid) {
    var _GUID = guid;

    if (point == null) return;

    if (point == -1) return;

    var dt = new Date();

    var flag = (isMobileDevice) ? 1 : 2;

    navigator.geolocation.getCurrentPosition(
    function (position) {
      var geoTime = getDateFromTimeStamp(position.timestamp);

      send('SetPhotoGeo', { 'GUID': _GUID, 'User': localStorage.getItem('Author'), 'Lat': position.coords.latitude, 'Lon': position.coords.longitude, 'Error': position.coords.accuracy, 'Point': point, 'GeoTime': geoTime, Flag: flag }, null, null);      
    },
    function (error) {
      
    },
    { maximumAge: 4000, timeout: 10000, enableHighAccuracy: true });
  },
  
  visitGeo: function (point) {
    if (point == null) return;

    if (point == -1) return;

    var dt = new Date();

    var flag = (isMobileDevice) ? 1: 2;

    navigator.geolocation.getCurrentPosition(
    function (position) {
      var geoTime = getDateFromTimeStamp(position.timestamp);
      
      send('SetVisit', { 'Point': point, 'User': localStorage.getItem('Author'), 'IsVisit': isVisit, 'Date': dt, 'Lat': position.coords.latitude, 'Lon': position.coords.longitude, 'Error': position.coords.accuracy, 'GeoTime': geoTime, 'Flag': flag }, null, null, null);
    },
    function (error) {
      send('SetVisit', { 'Point': point, 'User': localStorage.getItem('Author'), 'IsVisit': isVisit, 'Date': dt, 'Lat': null, 'Lon': null, 'Error': null, 'GeoTime': null, 'Flag': flag }, null, null, null);

      var item = $$('point-menu').getItem(2);
      item.Description = pointName + '<br/><span style="color: red">Координаты визита не определены</span>';
      $$('point-menu').updateItem(2, item);
    },
    { maximumAge: 4000, timeout: 10000, enableHighAccuracy: true });
  }, 

  setIconBadge: function (badge) {
    cordova.plugins.notification.badge.configure({
      title: "Новых сообщений: %d",
      autoClear: true
    });

    if (badge != 0)
      cordova.plugins.notification.badge.set(badge);
    else cordova.plugins.notification.badge.clear();    
  }  
};

