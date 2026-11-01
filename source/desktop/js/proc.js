// --- все функции, которые используются в отчетах, в том числе межоконный функционал

//глобальные переменные
const tasks2 = { Borned: null, Point: null, User: null, PhotoInput: null, PhotoBase64: null, GUID: null }; //задания к тт

// при нажатии на строку в форме посещенные ТТ добавляется в фильтр 
function updateStatusPointVisit(table, id) {
  var item = table.getItem(id);

  if (item == null)
    return;

  item.status = (item.status == 1) ? 0 : 1;
  table.updateItem(item.id, item);

  setPointVisit(item);
}

// добавление в фильтр ТТ
function setPointVisit(item) {
  $.ajax({
    url: '../../Services/Report.asmx/SetPointVisit',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': item.PointID, 'Status': item.status }),
    success: function (data) {
      setFilterCount();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}

// при нажатии на строку в Активные сотрудники сотрудник добавляется в фильтр
function updateStatusUserVisit(table, id) {
  var item = table.getItem(id);

  if (item == null)
    return;

  item.status = (item.status == 1) ? 0 : 1;
  table.updateItem(id, item);

  setUserVisit(item);
}

// добавление в фильтр сотрудника
function setUserVisit(item) {  

  $.ajax({
    url: '../../Services/Report.asmx/SetUserVisit',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Acceptor': item.UserID, 'Status': item.status }),
    success: function (data) {
      setFilterCount();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}

function AvailableImg(path, name) {
  this._path = path;
  this._name = name;
}

function archivePhoto(list) {
  if (list.count() == 0) return;

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
    else if (localStorage.getItem('SystemLang') === 'RU' && localStorage.getItem('CompanyID') == 439) {
      name =
        item.NetworkName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        item.CityName.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
        item.Address.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_') + ', ' +
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

  showProgress(list.config.id);

  //если фото больше 40000, то не формируем архив
  if (list.count() > 40000) {
    alert("Размер архива превышает допустимый размер (40000 фото), пожалуйста выберите период меньше или примените фильтры.");

    list.hideProgress();
  }

  //если фото больше 4000, то ссылка на архив будет отправлена на почту
  else if (list.count() > 4000) {
    var authorEmail = localStorage.Email

    if (authorEmail == '' || authorEmail === undefined) { //проверка наличия почты
      alert("Размер архива слишком большой. Для отправки ссылки на архив - обратитесь к администратору для регистрации вашего email адреса в системе.");
      list.hideProgress();
    }
    else {
      var path = producer + ' ' + date + '.zip';
      path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');

      $.ajax({
        url: '../../Services/Archive.asmx/ArchivePhotoListSendEmail',
        data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images, 'archiveName': path, 'userID': localStorage.Author, 'photoCount': list.count() }),
      });

      alert("Размер архива слишком большой, на Вашу почту " + authorEmail + " будет отправлена ссылка для скачивания.");
      list.hideProgress();
    }
  }
  //если фото меньше 4000, скачиваем архив сразу в браузере
  else {
    $.ajax({
      url: '../../Services/Archive.asmx/ArchivePhotoList',
      timeout: 120000,
      data: JSON.stringify({ 'Producer': producer, 'Date': date, 'images': available_images }),
      success: function (data) {
        var path = producer + ' ' + date + '.zip';
        path = path.replace(new RegExp('[,/\:*?""<>|+]', 'g'), '_');
        window.open('../../Archives/' + path, '_self', false);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
      },
      complete: function () {
        list.hideProgress();
      }
    });
  }
}

// общая процедура с работой UI.asmx
function send2(procName, record) {
  $.ajax({
    url: '../../Services/UI.asmx/' + procName,
    data: JSON.stringify(record),
    success: function (data) { },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    }
  });
}

function download(tab) {
  $$(tab + 'Table').hide();

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

function onExcelUpload(item) {
  webix.extend($$(tab + 'Download'), webix.ProgressBar);

  showProgress(tab + 'Download');

  $$(tab + 'Download').hideOverlay();

  var list = $$(tab + 'Download');
  

  list.clearAll();

  list.load("../../Temp/" + tab + "_" + localStorage.getItem('CompanyID') + ".txt", "mycsv", {
    error: function (text, data, http_request) {
      webix.alert("Ошибка загрузки данных!");
      $$(tab + 'Download').hideProgress();
    },
    success: function (text, data, http_request) {
      $$(tab + 'Download').hideProgress();

      if (tab == 'route') {
        onExcelUploadRoute();
      }
      if (tab == 'route2') {
        onExcelUploadRoute2();
      }
    }
  });
}

// отправка (при экспорте)
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

function clearAllFilter() {
  $.ajax({
    url: '../../Services/Report.asmx/ClearAllFilter',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      createFilterMenu();

      setFilterCount();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

//выбор рекламаций по визиту (ВинАгро)
function getTaskVisit(guid, id, taskName) {
  visitGUID = guid;
  visitID = id;

  $.ajax({
    url: '../../Services/Desktop.asmx/GetTaskVisit',
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

//список скю для рекламации
function getTaskVisitArt() {
  $.ajax({
    url: '../../Services/Desktop.asmx/GetVisitArt',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': VisitPointID, 'Borned': VisitBorned }),
    success: function (data) {
      var list = $$('taskVisitArt');

      list.clearAll();
      list.parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

//сохранение рекламации
function saveTaskVisit(taskID, taskName) {
  if (taskVisitID == -1)
    return;

  if (visitGUID == '')
    return;

  $.ajax({
    url: '../../Services/Desktop.asmx/SetTaskVisit',
    data: JSON.stringify({ 'GUID': visitGUID, 'Task': taskID, 'User': localStorage.getItem('Author'), 'Description': $$('textTask').getValue() }),
    success: function (data) {
      var item = $$('reportVisit').getItem(visitID);
      var pointID = item.PointID;
      var userID = item.UserID;

      if (item != null) {
        item.TaskName = taskVisitName;
        $$('reportVisit').updateItem(item.id, item);
      }

      setWindowSize("win_taskVisitVinagro|112");
      $$("win_taskVisitVinagro|112").hide();

      sendTaskVisit(pointID, userID, $$('textTask').getValue(), taskName);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

//сохранение задачи по рекламации
function sendTaskVisit(pointID, userID, text, taskName) {
  $.ajax({
    url: '../../Services/UI.asmx/SetTask',
    data: JSON.stringify({ 'Author': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': userID, 'Text': 'РЕКЛАМАЦИЯ К ВИЗИТУ: ' + taskName + text, 'GUID': visitGUID, 'PhotoID': null }),
    error: function (xhr, ajaxOptions, thrownError) { alert(xhr);}
  });
}

//планограммы (ВинАгро)
function getPlanograms() {

  var pointID = VisitPointID;
  var borned = VisitBorned;

  $.ajax({
    url: '../Services/Report.asmx/GetAdditionalPhotos',
    data: JSON.stringify({ 'Point': pointID, 'Borned': borned }),
    success: function (data) {
      if (JSON.parse(data.d).length == 0)
        return;

      var itemWindow = $$('menuUtility').getItem(113);
      if (itemWindow != null)
        showReport(itemWindow);

      var list = $$('photoAdditional');

      list.clearAll();
      list.parse(data.d, "json");

      var firstid = list.getFirstId();

      var item = list.getItem(firstid);

      if (item == null)
        return;

      list.select(item.id);

      showAdditionalPhoto(item.Link, item.Borned, item.PointID, item.PhotoID, item.Description, item.CategoryName);

    },
    error: function (xhr, ajaxOptions, thrownError) {
    }
  });
}

function showAdditionalPhoto(photofile, borned, point, photo, description, categoryname) {
  photo = 'photofulladd';
  elem = $$('photoDivFull');

  template2 = '<div><img src="' + photofile + '" id="photofulladd" onclick="zoomAdd() "/></div>';

  $$('photoDivFull').define('template', template2);
  $$('photoDivFull').define('scroll', 'false');
  $$('photoDivFull').refresh();

  var address = sessionStorage.getItem('pointAddress');
  if (address == null) address = '';

  $$('btnPhotoLayerFull').define('template', borned + ' ' + address + ' ' + ' <b> ' + categoryname + ' </b>' + description);
  $$('btnPhotoLayerFull').refresh();

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
    fix_sizeAdd(document.getElementById(photo), elem, true);

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

function get_dim(img, elem) {
  if (elem == null)
    elem = $$('photoDivFull');

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

//меняем подтверждение всем фото
function checkAllPhoto(report) {
  const allData = report.serialize();
  const uniquePhotoIDs = new Set();

  //на всякий убираем дубли
  allData.forEach(item => {
    if (item && item.PhotoID) {
      uniquePhotoIDs.add(item.PhotoID);
    }
  });

  if (uniquePhotoIDs.size > 200) {
    webix.alert("Фото должно быть не больше 200, используйте фильтры");
  }
  else if (uniquePhotoIDs.size > 0) {
    webix.modalbox({
      title: "Какой статус проставить всем фото?",
      buttons: ["Не подтверждено", "Подтверждено", 'Отмена'],
      width: 300,
    }).then(function (result) {
      if (result == "0" || result == "1") {
        const newPhotoCheck = parseInt(result);
        const messagePhotoCheck = (result == "1") ? "Статус Подтверждено проставлен для " : "Статус НЕ Подтверждено проставлен для ";

        //меняем статус каждой фото
        Promise.all([...uniquePhotoIDs].map(photoID => {
          return $.ajax({
            url: '../../Services/UI.asmx/SetPhotoCheck2',
            data: JSON.stringify({ 'ID': photoID, 'Status': newPhotoCheck, 'User': localStorage.getItem('Author') }),
            error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
          });
        })).then(() => {
          //меняем визуальный статус
          report.data.each(item => {
            item.IsPhotoCheck = newPhotoCheck;
          });
          report.refresh();

          webix.message({ type: "success", text: messagePhotoCheck + uniquePhotoIDs.size + ' фото' });
        });
      }
    });
  }
}

//сохранение фильтра по данным из отчета(промис функция для ожидания выполнения)
function setFilterDictionaryPromise(proc, value) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '../../Services/Report.asmx/SetReportDictionary',
      data: JSON.stringify({ 'ProcName': proc, 'User': localStorage.getItem('Author'), 'Text': '' }),
      success: function () {
        $.ajax({
          url: '../../Services/Report.asmx/SetReportDictionary',
          data: JSON.stringify({ 'ProcName': proc, 'User': localStorage.getItem('Author'), 'Text': value }),
          success: function () {
            setFilterCount();
            resolve();
          },
        });
      }
    });
  });
}


// -- постановка задачи к тт
function getcreateTaskPoint(menuID, report, procName, reportName) {
  //очистка текста задания
  $$('newTaskPointText').setValue('');
  
  //очистка формы фото и скрытие кнопки "удалить фото"
  tasks2.PhotoBase64 = null;
  $$("previewTaskPointPhoto").define("template", "");
  $$("previewTaskPointPhoto").refresh();
  $$("removeTaskPointPhotoBtn").hide();

  tasks2.GUID = tasks2.Point + '_' + localStorage.getItem('Author') + '_' + new Date().toLocaleString('sv-SE', { hour12: false }).replace(/[-:]/g, '').replace(' ', '_');

  $.ajax({
    url: '../../Services/UI.asmx/GetTaskPointInfo',
    data: JSON.stringify({ 'Point': tasks2.Point, 'Author': localStorage.getItem('Author') }),
    success: function (response) {
      const data = JSON.parse(response.d);
      fillSelect('selectTaskPointCategory', data.Table1 || [], 'ID', 'Name'); //категории
      fillSelect('selectTaskPointRole', data.Table2 || [], 'ID', 'Name'); //роли
      fillSelect('selectTaskPointUser', data.Table3 || [], 'ID', 'Name'); //сотрудники
      fillSelect('selectTaskPointCompany', data.Table4 || [], 'ID', 'Name'); //компании

      window.hasMultipleCompanies = (data.Table4 || []).length > 1;
      $$('selectTaskPointType').setValue((['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang'))) ? 3 : 2);

      if (['RH', 'LT', 'WB'].includes(localStorage.getItem('SystemLang')))
        $$('selectTaskPointType').disable();

      $$('selectTaskPointRole').disable();
      $$('selectTaskPointUser').disable();
      //адрес
      $$("pointAddress").define("template", data.Table5?.[0]?.PointAddress || "");
      $$("pointAddress").refresh();
    }
  });
}

//функция для заполнения селекта
function fillSelect(selectId, items, idField, nameField) {
  const select = $$(selectId);
  if (!select) return;

  const options = items.map(item => ({ id: item[idField], value: item[nameField] }));

  select.define("options", options);
  select.refresh();

  if (options.length) select.setValue(options[0].id);
}

//выбор фото
function selectPhoto() {
  if (!tasks2.PhotoInput) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        tasks2.PhotoBase64 = ev.target.result;
        const preview = $$("previewTaskPointPhoto");
        preview.define("template",
          `<div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
            <img src="${ev.target.result}" style="max-width:100%; max-height:100%; object-fit:contain;"/>
          </div>`
        );
        preview.refresh();
        $$("removeTaskPointPhotoBtn").show();
      };
      reader.readAsDataURL(file);
      input.value = '';
    });
    tasks2.PhotoInput = input;
  }
  tasks2.PhotoInput.click();
}

//блокировка окна селект
function syncSelects() {
  var roleSelect = $$("selectTaskPointRole");
  var userSelect = $$("selectTaskPointUser");
  if (!roleSelect || !userSelect) return;

  var roleVal = roleSelect.getValue();
  var userVal = userSelect.getValue();

  if (roleVal != -1) {
    if (userVal != -1) userSelect.setValue(-1);
    userSelect.disable();
  } else {
    userSelect.enable();
  }

  if (userVal != -1) {
    if (roleVal != -1) roleSelect.setValue(-1);
    roleSelect.disable();
  } else {
    roleSelect.enable();
  }
}

function onTaskTypeChange() {
  const role = $$('selectTaskPointRole');
  const user = $$('selectTaskPointUser');
  const company = $$('selectTaskPointCompany');

  role.setValue(-1);
  user.setValue(-1);
  company.setValue(company.config.options[0].id);

  if ($$('selectTaskPointType').getValue() == 2) {
    role.disable();
    user.disable();
    company.hide();
  } else {
    role.enable();
    user.enable();

    if (localStorage.getItem('Magic') == 'EXECUTOR_EX')
      company.show();
  }
}
// --конец постановка задачи к тт