var sourceServer;

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

var isMobileDevice = isMobile.any();
var isIOS = isMobile.iOS();

var author = localStorage.getItem('Author');
var username = localStorage.getItem('UserName');
var rolename = localStorage.getItem('RoleName');

// Количество пустых срабатывания таймера для смены таймера на более медленный
var timerCountMax = 10;

// какой таймер в настоящий момент работает
var timerCount;
var timerMagic = '';

// настройка таймера штатной синхронизации
var secondTimerReplication = 30;
var timerReplication;

// настройка таймера долгой синхронизации
var secondTimerLongReplication = 120;
var timerLongReplication;

// настройка таймера "спящей" синхронизации
var secondTimerSleepReplication = 120;
var timerSleepReplication;

// настройка таймера очистки очереди на отправку
var secondTimerTail = 30;
var timerTail;

// настройка таймера полной синхронизации
var secondTimerAllReplication = 60 * 60;
var timerAll;

var isTailWork;

// глобальные настройки 
$.ajaxSetup({
  type: "POST",
  timeout: 300000,
  contentType: "application/json; charset=utf-8",
  dataType: "json"
});

webix.i18n.pager = {
  first: "<<",
  last: ">>",
  next: ">",
  prev: "<"
};

// бд
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

function connectDB(f) {
  var request = indexedDB.open("gts", 12);
  request.onerror = function (err) {
    //alert('not connect DB');
  };
  request.onsuccess = function () {
    // При успешном открытии вызвали коллбэк передав ему объект БД
    f(request.result);
  }
  request.onupgradeneeded = function (e) {
    // Если БД еще не существует, то создаем хранилище объектов.
    try {
      e.currentTarget.result.createObjectStore("point", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("acceptor", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("company", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("companyPhoto", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("acceptorMap", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("user", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("brand", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("art", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("artNetworkMatrix", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("artPointMatrix", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("artAnswer", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("question", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("artMatrix", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("action", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("actionPoint", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("actionMatrix", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("visitDay", { keyPath: "key" });
    } catch (e) { };   
    try {
      e.currentTarget.result.createObjectStore("photo", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("option", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("track", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("taskhistory", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("photoCategory", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("report", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("standart", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("standartMap", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("companyStandart", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("chatAcceptor", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("chatContact", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("chat", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("photoPromo", { keyPath: "key" });
    } catch (e) { };
    try {
      e.currentTarget.result.createObjectStore("taskAcceptor", { keyPath: "key" });
    } catch (e) { };
    
    connectDB(f);
  }
}

function updateDb(key, record) {  
  try {
    connectDB(function (db) {
      var request = db.transaction([key], "readwrite").objectStore(key).delete("0");
            
      request.onsuccess = function () {      
        db.transaction([key], "readwrite").objectStore(key).add({ "key": "0", "record": record });        
      }     
    });
  }
  catch (e) {    
  };
}

// создание кэша
function setCash(key, record, flag) {
  connectDB(function (db) {
    if (flag == 'all') {
      updateDb(key, record);
      
      return;
    }

    try {
      // если модификация записи
      var request = db.transaction([key], "readonly").objectStore(key).get("0");

      request.onsuccess = function () {
        var cash = request.result;

        if (cash == null)
          updateDb(key, record);
        else {
          try {
            var element = [JSON.parse(JSON.stringify(cash.record))];

            element.push(record);

            updateDb(key, JSON.stringify(element));
          }
          catch (e) { };
        }
      }
    }
    catch (e) { };
  });
}

// изменение одной записи в кеше
function updateCash(key, record, operator) {
  connectDB(function (db) {
    try {
      var request = db.transaction([key], "readonly").objectStore(key).get("0");
      request.onsuccess = function () {
        var storage
        try {
          storage = request.result.record;
        }
        catch (e) { };

        if (storage == null) return;

        var cash = JSON.parse(storage);
        if (cash == null) return;
      }

      var GUID = record.GUID;
      if (GUID != null) {
        for (var i = 0; i < cash.length; i++) {
          if (cash[i].GUID == GUID) {
            if (operator != 'delete')
              cash[i] = record;
            else
              cash.splice(0, 1);

            updateDb(key, JSON.stringify(cash));
            break;
          }
        }
        return;
      }

      var ID = record.ID;
      if (ID != null) {
        for (var i = 0; i < cash.length; i++) {
          if (cash[i].ID == ID) {
            if (operator != 'delete')
              cash[i] = record;
            else
              cash.splice(0, 1);

            updateDb(key, JSON.stringify(cash));
            break;
          }
        }
      }
      else {
        var ID = record.id;

        for (var i = 0; i < cash.length; i++) {
          if (cash[i].id == ID) {
            if (operator != 'delete')
              cash[i] = record;
            else
              cash.splice(0, 1);

            updateDb(key, JSON.stringify(cash));
            break;
          }
        }
      }
    }
    catch (e) { };
  });
}

// загрузка данных из кэша
function getCash(list) {
  connectDB(function (db) {
    try {
      var objectStore = db.transaction([list], "readonly").objectStore(list);//.get("0");
      
      var request = objectStore.get("0");
      
      request.onsuccess = function () {
        if (request.result == null) return;

        $$(list).clearAll();
        $$(list).parse(request.result.record);

        if (list == 'point')
          findPoint('', 0);
      }
    }
    catch (e) {
      //alert(e + ' list=' + list);
    };
  });
}

// поиск по ID в списках
function isExists(list, ID, _GUID, _User) {
  for (var id in list.data.pull)
    if (list.getItem(id).ID == ID)
      return id;

  // если не нашли, проверяем по GUID (если есть) для своих записей (в случае, если обновление идет из очереди)
  if ((_GUID != null) && (_User != null) && (_User = localStorage.getItem('Author'))) {
    for (var id in list.data.pull)
      if ((list.getItem(id).ID == _GUID) && (list.getItem(id).UserID == _User))
        return id;
  }

  return -2;
}

function getDateTime() {
  var dt = new Date();

  var hours = dt.getHours().toString();
  hours = (hours.length == 1) ? '0' + hours : hours;

  var minutes = dt.getMinutes().toString()
  minutes = (minutes.length == 1) ? '0' + minutes : minutes

  return hours + ":" + minutes;
}

function getDate() {
  var dt = new Date();

  var days = dt.getDate().toString();
  days = (days.length == 1) ? '0' + days : days;

  var months = (dt.getMonth()+1).toString();
  months = (months.length == 1) ? '0' + months : months;

  var year = dt.getFullYear().toString()

  return days + "." + months + '.' + year;
}

// мягкое обновление данных в list
function listUpdate(element, flag, data) {
  var list = $$(element);  

  // если полная синхронизация
  if (flag == 'all') {
    list.clearAll();
    list.parse(data);    

    // перезаписываем кэш
    setCash(element, data, flag);    

  }
  else {
    var result = JSON.parse(data);

    for (var i = 0; i < result.length; i++) {
      var record = result[i];
      var id = -2;

      if (record.ID == null) {
        var elem = list.getItem(record.id);

        if (elem != null) id = elem.id;
      }
      else id = isExists(list, record.ID, record.GUID, record.UserID)

      if (id != -2) {
        list.updateItem(id, record);        

        updateCash(element, record);
      }
      else {
        var newid = list.add(record);
        list.showItem(newid);

        // добавляем запись в кэш
        //if (isMobileDevice)
        setCash(element, record, flag);        
      }
    }    
  }
}

// ---- универсальные процедуры отправки
// обновление после успешной вставки
function setAddedRow(result, list, id) {
  if (list == null) return;
  if (result == null) return;

  // если id элемента не определен, ищем элемент
  if (id == null)
    id = $$(list).find(function (obj) { return (obj.GUID.toString() == result.GUID) }, true).id;

  if (id == null) return;

  try {
    if (result.id == null) {
      $$(list).updateItem(id, result);
      updateCash(list, result);
    }
    else {
      if (list == 'point') {
        $$(list).remove(id);
        $$(list).add(result);
      }

     // $$(list).refresh();
    }
  }
  catch (e) { }  
}

// отправка (универсальная)
function send(proc, record, list, id, jstext) {
  var ID = id;

  $.ajax({
    url: URLname + 'Services/UI.asmx/' + proc,
    data: JSON.stringify(record),
    success: function (data) {
      // если все ок - обновляем элемент списка list по id
      try {
        if (proc == 'SetUsers')
          GetUser();
        if (proc == 'SetTask2') {
          getMessage('all', null);          
        }
          

        if (data.d == null) return;

        var result = JSON.parse(data.d)[0];

        setAddedRow(result, list, ID);
      }
      catch (e) {
        return;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr.responseText);

      // если ошибка - добавляем в очередь
      addTail(proc, record, list, id);
    },
    complete: function () {
      if (jstext != null)
        if (jstext != '') {
          try {
            eval(jstext);
          }
          catch (e) {
          }
        }
    }
  });
}

  // создание очереди на отправку (универсальная)
function addTail(proc, record, list, id) {
  var ID = id;

  // сначала пробуем отправить что пришло
  $.ajax({
    url: URLname + 'Services/UI.asmx/' + proc,
    data: JSON.stringify(record),
    success: function (data) {
      // если все ок - обновляем элемент списка list по id
      try {
        if (data.d == null) return;

        var result = JSON.parse(data.d)[0];

        setAddedRow(result, list, ID)
      }
      catch (e) {
        return;
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // только если не получилось, записываем в очередь
      var tail = localStorage.getItem("Tail");

      if (tail == null)
        localStorage.setItem("Tail", JSON.stringify(new function () {
          this[proc] = [record];
        }));
      else {
        var element = JSON.parse(tail);

        if (element[proc] == null)
          element[proc] = [record];
        else element[proc].push(record);

        localStorage.setItem("Tail", JSON.stringify(element));
      }

      var menu = $$('menulist').getItem(10);
      if (menu != null) {
        menu.Description = 'Данные ожидают отправки';
        $$('menulist').updateItem(10, menu);
      }

      // и запускаем таймер на отправку       
      if (timerTail == null)
        timerTail = setInterval(function () { if (isTailWork != 1) sendTail(); }, 1000 * secondTimerTail);

      if (isTailWork == 0)
        sendTail();
    }
  });
}


  // очистка очереди (универсальная)
function sendTail() {
  var storage = localStorage.getItem("Tail");
  
  if ((storage == '{}') || (storage == null) || (storage == '')) {
    clearTimeout(timerTail);
    timerTail = null;
    localStorage.removeItem("tail");

    isTailWork = 0;

    var menu = $$('menulist').getItem(10);
    if (menu != null) {
      menu.Description = 'Данные отправлены';
      $$('menulist').updateItem(10, menu);
    }

    return;
  }

  isTailWork = 1;

  var tail = JSON.parse(storage);

  for (var proc in tail) {
    $.ajax({
      url: URLname + 'Services/UI.asmx/' + proc,
      data: JSON.stringify(tail[proc][0]),
      success: function (data) {
        tail[proc].splice(0, 1);

        if (tail[proc].length == 0) delete tail[proc];

        localStorage.setItem("Tail", JSON.stringify(tail));

        try {
          var result = JSON.parse(data.d);

          // попытка обновить задание
          if (result[0] != null) {
            if (proc == 'SetTask')
              setAddedRow(result[0], 'task', null);

            // попытка обновить сообщение
            if (proc == 'SetMessage')
              setAddedRow(result[0], 'messages', null);
          }
        }
        catch (e) {
        }

        sendTail();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        isTailWork = 0;
      }
    });
  }
}
  //----

  // вспомогательные процедуры
function exit() {
  window.location.hash = "";

  country = localStorage.getItem('CountryID');
  countryName = localStorage.getItem('CountryName');
  mask = localStorage.getItem('Mask');
  
  phone = localStorage.getItem('Phone');
  
  localStorage.clear();
  sessionStorage.clear();
  
  if (sourceServer != null)
    sourceServer.close();

  localStorage.setItem('CountryID', country);
  localStorage.setItem('CountryName', countryName);
  localStorage.setItem('Mask', mask);
  localStorage.setItem('Phone', phone);

  top.location.href = '../index.html';
}

  // сохранение фото пользователя в кеш
function saveImage(url, key) {
  var img = document.createElement("img");
  img.src = url;

  img.onload = function () {
    canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var canvasURL = canvas.toDataURL("image/png");

    if (canvasURL != "data:,")
      sessionStorage.setItem(key, canvas.toDataURL("image/png"));
  }
}

  // запрос base64 из базы
function loadImage(filename, user, GUID) {
  $.ajax({
    url: URLname + 'Services/System.asmx/GetPhotoBase64',
    data: JSON.stringify({
      'FileName': filename
    }),
    success: function (data) {
      if (data.d == null) return;

      var result = JSON.parse(data.d);

      if (result.length == 0) return;

      if (result[0].FileName != "data:,")
        sessionStorage.setItem(user.toString() + '_' + GUID.toString(), result[0].FileName);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      result = 'error';
    }
  });
}

function paintPhoto(user, photo) {
  if (user == null) return;

  if (photo == '')
    return "<div class='chatface'><div class='face' style='background: url(i/noPhoto_ico.jpg) no-repeat center center;'></div></div>";
  else {
    var img = sessionStorage.getItem(user + '_');

    if (img == null) {
      // запрос к базе на base64
      loadImage(URLname + photo, user, '');

      return "<div class='chatface'><div class='face' userid='" + user + "' style='background: url(" + URLname + photo + ") no-repeat center center;'></div></div>";
    }
    else
      return "<div class='chatface'><div class='face' style='background: url(" + img + ") no-repeat center center;'></div></div>";
  }
}

function paintPhotoButton(photo) {
  if (photo == '')
    return "<div class='face-button' style='background: url(i/noPhoto_ico.jpg) no-repeat center center;'></div>";
  else return "<div class='face-button' style='background: url(" + URLname + photo + ") no-repeat center center;'></div>";

}

function messagePhoto(user, GUID, photo) {
  if (photo == '') return '';
  if (photo == null) return '';

  if (GUID == null) GUID = '';
  var result = '';

  // если фото только что создано
  if (photo.indexOf('data:image/png;base64,') != -1) {
    return "<div class='messagephoto' style='background: url(" + photo + ") no-repeat center center; background-size: 240px 260px;'></div>";
  }
  
  var img = sessionStorage.getItem(user.toString() + '_' + GUID.toString());

  if (img == null) {
    if (photo == '') return '';

    result = "<div class='messagephoto' style='background: url(" + URLname + photo + ") no-repeat center center; background-size: 240px 260px;'></div>"

    // запрос к базе на base64
    loadImage(URLname + photo, user, GUID);    
  }
  else {
    if (img.indexOf('data:image/png;base64,') == -1) {
      img = 'data:image/png;base64,' + img;
      sessionStorage.setItem(user.toString() + '_' + GUID.toString(), img);
    }

    result = "<div class='messagephoto' style='background: url(" + img + ") no-repeat center center; background-size: 240px 260px;'></div>";
  }

  return result;
}

function chatPhoto( photo) {
  if (photo == '') return '';
  if (photo == null) return '';

    var result = '';

  // если фото только что создано
  if (photo.indexOf('data:image/png;base64,') != -1) {
    return "<div class='messagephoto' style='background: url(" + photo + ") no-repeat center center; background-size: 240px 260px;'></div>";
  }

  return "<div class='messagephoto' style='background: url(" + URLname + photo + ") no-repeat center center; background-size: 240px 260px;'></div>";
}

// показ фото в фотоотчете
function showReportPhoto(user, GUID, photo, num) {
 // if (isMobile) {
    if (num == -1) {
      return "<div class='report-photo' style='background: url(i/btnCamera.png) no-repeat center center; background-size: 56px 56px;'></div>";
    }
 // }

  if (photo == '') return '';
  if (photo == null) return '';

  if (GUID == null) GUID = '';
  var result = '';

  // если фото только что создано
  if (photo.indexOf('data:image/png;base64,') != -1) {
    return "<div class='messagephoto' style='background: url(" + photo + ") no-repeat center center; background-size: 240px 260px;'></div>";
  }

  var img = sessionStorage.getItem(user.toString() + '_' + GUID.toString());

  if (img == null) {
    if (photo == '') return '';

    result = "<div class='messagephoto' style='background: url(" + URLname + photo + ") no-repeat center center; background-size: 240px 260px;'></div>"

    // запрос к базе на base64
    loadImage(URLname + photo, user, GUID);
  }
  else {
    if (img.indexOf('data:image/png;base64,') == -1) {
      img = 'data:image/png;base64,' + img;
      sessionStorage.setItem(user.toString() + '_' + GUID.toString(), img);
    }

    result = "<div class='messagephoto' style='background: url(" + img + ") no-repeat center center; background-size: 240px 260px;'></div>";
  }

  return result;
}

  // получение настроек с сервера
function getSettingSystem() {
  $.ajax({
    url: URLname + 'Services/System.asmx/GetSetting',
    data: JSON.stringify({
      'User': localStorage.getItem('Author')
    }),
    success: function (data) {
      var result = JSON.parse(data.d);

      if (result.length == 0) return;

      for (var i = 0; i < result.length; i++) {
        var setting = result[i];

        if (setting.Magic == 'TIMER_REPLICATION') {
          if (secondTimerReplication != setting.Value) {
            secondTimerReplication = setting.Value;

            if (timerReplication != null) {
              clearTimeout(timerReplication);
              timerReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerReplication);
            }
          }
        }

        if (setting.Magic == 'TIMER_LONG_REPLICATION') {
          if (secondTimerLongReplication != setting.Value) {
            secondTimerLongReplication = setting.Value;

            if (timerLongReplication != null) {
              clearTimeout(timerLongReplication);
              timerLongReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerLongReplication);
            }
          }
        }

        if (setting.Magic == 'TIMER_SLEEP_REPLICATION') {
          if (secondTimerSleepReplication != setting.Value) {
            secondTimerSleepReplication = setting.Value;

            if (timerSleepReplication != null) {
              clearTimeout(timerSleepReplication);
              timerSleepReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerSleepReplication);
            }
          }
        }

        if (setting.Magic == 'TIMER_ALL_REPLICATION') {
          if (secondTimerAllReplication != setting.Value) {
            secondTimerAllReplication = setting.Value;

            // перезапускаем таймер
            clearTimeout(timerAll);
            timerReplicationAll = setInterval(function () { refreshAll('all') }, 1000 * secondTimerAllReplication);
          }
        }

        if (setting.Magic == 'TIMER_COUNT') {
          if (timerCountMax != setting.Value)
            timerCountMax = setting.Value;
        }

        if (setting.Magic == 'LEN_TEXT') {
          localStorage.setItem('len_text', setting.Value);
        }

        if (setting.Magic == 'VERSION') {
          var item = $$('menulist').getItem(90);

          item.Name = 'Справка';

          if (verData != setting.Value) 
             if (item != null) 
              item.Name = item.Name + ' (<span class="alert">обновите версию!</span>)';
          
          $$('menulist').updateItem(item.id, item);
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $$("point").hideProgress();
    }
  });
}

function getLastText(text) {
  var len_text = localStorage.getItem('len_text');

  if (len_text == null) len_text = 200;

  if (text.length <= len_text) return text;

  var result = text.substring(0, len_text);

  var pos = result.lastIndexOf(" ");

  if (pos == -1) return result;

  return result.substring(0, pos);
}

function setUserPass() {
  if ($$('pass1').getValue() == '') {
    webix.message({
      type: "error", text: "Введите пароль!", expire: 1000
    });

    return;
  }

  if (localStorage.getItem('SystemLang') === 'RH') {
    if ($$('pass1').getValue().length < 6 || $$('pass2').getValue().length < 6) {
      webix.message({
          type: "error", 
          text: "Введите пароль не менее 6 символов!", 
          expire: 1000
      });
      return;
    }
  }

  if ($$('pass2').getValue() == '') {
    webix.message({
      type: "error", text: "Введите подтверждение пароля!", expire: 1000
    });

    return;
  }

  if ($$('pass1').getValue() != $$('pass2').getValue()) {
    webix.message({
      type: "error", text: "Пароль и подтверждение пароля не совпадают!", expire: 1000
    });

    return;
  }

  showProgress("navigation");

  $.ajax({
    url: URLname + '/Services/System.asmx/SetUserPass',
    data: JSON.stringify({
      'Phone': $$('phonefull1').config.label, 'Pass': $$('pass1').getValue()
    }),
    success: function (data) {
      var info = JSON.parse(data.d);

      if (info.length == 1) {
        localStorage.setItem('Author', info[0].ID);
        localStorage.setItem('UserName', info[0].UserName);
        localStorage.setItem('RoleName', info[0].RoleName);
        localStorage.setItem('Photo', info[0].Photo);
        localStorage.setItem('CompanyID', info[0].CompanyID);
        localStorage.setItem('CompanyName', info[0].CompanyName);
        localStorage.setItem('IsRoute', info[0].IsRoute);
        localStorage.setItem('IsPoint', info[0].IsPoint);
        localStorage.setItem('IsUser', info[0].IsUser);
        localStorage.setItem('IsTask', info[0].IsTask);
        localStorage.setItem('Magic', info[0].Magic);
        localStorage.setItem('Lang', '');
        localStorage.setItem('Phone', $$('phonefull').config.label);
        localStorage.setItem('Email', info[0].Email);

        setTimeZone();
        desktopLogonJS(info[0].ID, info[0].CompanyID);

      } else {
        $$('pass').setValue($$('pass2').getValue());
        $$('company').clearAll();
        $$('company').parse(info);

        $$('companies').show();
      }

    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({
        type: "error", text: "Нет подключения к серверу. Повторите попытку", expire: 1000
      });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}

function desktopLogonJS(userID, companyID) {
  if ($$('phone').getValue() == '' || $$('phone').getValue() == null) return;
  if ($$('pass1').getValue() == '' || $$('pass1').getValue() == null) return;
  if (userID == null || userID == '') return;
  if (companyID == null || companyID == '') return;

  var magic = 'gts.online: pc';
  if (isMobileDevice)
    magic = 'gts.online: mobile'

  showProgress("navigation");

  $.ajax({
    url: URLname + '/Services/System.asmx/Authorization',
    data: JSON.stringify({
      'Phone': $$('phonefull').config.label, 'UserID': userID, 'Company': companyID, 'Pass': $$('pass1').getValue(), 'Magic': magic
    }),
    success: function (data) {
      var info = JSON.parse(data.d);
      $$("navigation").hideProgress();

      if (info.length == 0) return;
      else {
        localStorage.setItem('desktopKey', info[0].desktopKey);
        localStorage.setItem('googleKey', info[0].googleKey);

        top.location.href = 'desktop/app2.html';
      }
    }, error: function (xhr, ajaxOptions, thrownError) {
      $$("navigation").hideProgress();
      webix.message({ type: "error", text: "Нет подключения к серверу. Повторите попытку", expire: 1000 });
    }
  });
}

  // ТАЙМЕРЫ
function clearAllTimer() {
  clearTimeout(timerReplication);
  clearTimeout(timerLongReplication);
  clearTimeout(timerSleepReplication);
  timerCount = 0;

  timerReplication = null;
  timerLongReplication = null;
  timerSleepReplication = null;
}

  // запуск и переключение таймеров быстрой синхронизации
function startTimer(magic) {
  clearAllTimer();

  // если нужно переключить таймеры на штатный
  if (magic == '') {
    timerMagic = 'default';
    timerCount = 0;

    timerReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerReplication);
    return;
  }

  // если отработал штатный, переключаем на долгий
  if (magic == 'default') {
    timerMagic = 'long';
    timerCount = 0;

    timerLongReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerLongReplication);
    return;
  }

  // если иное - переключаем на спящий
  magicTimer = 'long';
  timerMagic = 0;

  timerSleepReplication = setInterval(function () { refreshAll('') }, 1000 * secondTimerSleepReplication);
}

function setTimeZone() {
  var now = new Date();
  var currentTimeZoneOffsetInHours = -now.getTimezoneOffset() / 60;

  $.ajax({
    url: URLname + '/Services/System.asmx/SetTimeZone',
    data: JSON.stringify({
      'Phone': localStorage.getItem('Phone'), 'TimeZone': currentTimeZoneOffsetInHours
    })
  });
}

function getDictionary(proc, element) {
  if (element == null) return;

  $.ajax({
    url: '../Services/Desktop.asmx/GetDictionary',
    data: JSON.stringify({
      'Company': localStorage.getItem('CompanyID'), 'ProcName': 'ADMIN2.' + proc, 'Key': localStorage.getItem('Key')
    }),
    success: function (data) {
      var suggest = element.config.suggest;
      var list = $$(suggest).getList();
      list.clearAll();
      list.parse(data.d);

      if (element.config.id == 'NetworkName') {
        var option = $$("combo_network").getPopup().getList();

        option.clearAll();
        option.parse(data.d);

        option = $$("combo_network_format").getPopup().getList();

        option.clearAll();
        option.parse(data.d);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);

      //onError();
    }
  });
}

function checkDictionary(proc, element, value) {
  var suggest = element.config.suggest;
  var list = $$(suggest).getList();

  var isExists = false;

  for (var id in list.data.pull) {
    var elem = list.getItem(id);

    if (elem.value == value)
      isExists = true;
  }

  if (!isExists)
    getDictionary(proc, element);
}

 function showProgress(name) {
   if ($$(name) == null) return;

   $$(name).showProgress({
     type: "icon",
     //icon: "fas fa-sync",
     delay: 300000,
     hide: true
   });
 }

 function hideProgress(name) {
   if ($$(name) == null) return;

   $$(name).hideProgress();
 }

 function getDateFromTimeStamp(timestamp) {
   var dt = new Date(timestamp);

   var days = dt.getDate().toString();
   days = (days.length == 1) ? '0' + days : days;

   var months = (dt.getMonth() + 1).toString();
   months = (months.length == 1) ? '0' + months : months;

   var year = dt.getFullYear().toString()
  
   var hours = dt.getHours().toString();
   hours = (hours.length == 1) ? '0' + hours : hours;

   var minutes = dt.getMinutes().toString()
   minutes = (minutes.length == 1) ? '0' + minutes : minutes

   return days + "." + months + '.' + year + ' ' + hours + ":" + minutes;   
 }

 $.extend({
   getUrlVars: function () {
     var vars = [], hash;
     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
     for (var i = 0; i < hashes.length; i++) {
       hash = hashes[i].split('=');
       vars.push(hash[0]);
       vars[hash[0]] = hash[1];
     }
     return vars;
   },
   getUrlVar: function (name) {
     return $.getUrlVars()[name];
   }
 });