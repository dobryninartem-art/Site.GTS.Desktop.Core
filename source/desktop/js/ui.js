// ----- Процедуры обработки функционала окон
webix.extend(webix.ui.datatable, {
  showProgress: function () {
    return webix.ProgressBar.showProgress.call(this, webix.copy(this.config.progressConfig || {}));
  },
  hideProgress: function () {
    return webix.ProgressBar.hideProgress.call(this, true);
  }
});
webix.extend(webix.ui.datatable, webix.ProgressBar);

$('.webix_cell').on('hover', function (e) {
  $('.webix_cell').removeClass('cell_hover');
  var rowid = $(this).index();
  var cols = $(this).parent().siblings();
  $(cols).each(function () {
    var cell = $(this).children('div').eq(rowid);
    $(cell).addClass('cell_hover');
  });
  $(this).addClass('cell_hover');
})


var isEng = (localStorage.getItem('Lang') == 'ENG');
var currentMenuID = -1;
var currentReport = '';
var startX = 5, startY = 40;

var lang = "ru-RU";
var year = new Date().getFullYear();

function dateToTS(date) {
  return date.valueOf();
}

function tsToDate(ts) {
  var d = new Date(ts);

  return d.toLocaleDateString(lang, {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric'
  });
}

// стандартное окно отчета
function showWindow(menuID, reportName, report, getProcName, description, icon, exportFileName, isStartWithOpen, offsetX, offsetY, width, height, isAdjust, isStartNow, isArchive, onBeforeShow, reportMagic, exportMail) {
  var win_id = report + '|' + menuID;

  // если окно уже открывали
  if (webix.$$("win_" + win_id) != null) {
    $$(win_id).clearAll();

    $$("win_" + win_id).show();
  }
  else {
    // если окно еще ни разу не открывалось, создаем его
    // копируем окно со стандартного
    var newWindow = webix.ui(winStandart);
    newWindow.define("id", "win_" + win_id);
    newWindow.define("menuID", menuID);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var windowElement = $$("win_" + win_id).$view;
    windowElement.addEventListener("click", function (ev) {
      if (ev.target.className.indexOf('filter') != -1)
        return;

      reopenWindow(ev, report, menuID);
    });

    if (width == 0 || width >= window.innerWidth)
      width = parseInt($(window).width() * 0.8);

    if (height == 0 || height >= window.innerHeight)
      height = parseInt($(window).height() * 0.8);

    newWindow.define("width", width);
    newWindow.define("height", height);

    var head = newWindow.getHead();

    // устанавливаем название окна
    var template = head.getChildViews()[0];
    template.define('template', '<span class="webix_list_icon webix_icon ' + icon + '" style="color: #002D6F"></span> ' + reportName);
    template.define('tooltip', description);

    // устанавливаем поле фильтра НЕ для табличного содержимого
    var search = head.getChildViews()[1];
    search.define("id", "search_" + win_id);

    // устанавливаем кнопку "Обновить"
    var refreshIcon = head.getChildViews()[2];
    refreshIcon.define("id", "iconRefresh_" + win_id);
    refreshIcon.define("report", report);
    refreshIcon.define("menuID", menuID);
    refreshIcon.define("procName", getProcName);
    refreshIcon.define("reportName", reportName);
    refreshIcon.define("reportMagic", reportMagic);

    // устанавливаем кнопку "Доп.меню"
    var addMenuIcon = head.getChildViews()[3];
    addMenuIcon.define("id", "iconAddMenu_" + win_id);
    if (!['photo', 'photoPro'].includes(report))
      addMenuIcon.hide();

    // устанавливаем кнопку "Фильтры"
    var filterIcon = head.getChildViews()[4];
    filterIcon.define("id", "iconFilter_" + win_id);
    setFilterCount();

    // устанавливаем кнопку "В Эксель"
    var excelIcon = head.getChildViews()[5];
    excelIcon.define("id", "iconExcel_" + win_id);
    excelIcon.define("exportFileName", exportFileName);
    excelIcon.define("exportMail", exportMail);

    if (exportFileName == '' || exportFileName == null)
      excelIcon.hide();

    // устанавливаем кнопку "В архив"
    var archiveIcon = head.getChildViews()[6];
    archiveIcon.define("id", "iconArchive_" + win_id);
    if (isArchive != 1)
      archiveIcon.hide();

    // устанавливаем кнопку "автоширина колонок"
    var authoHeightIcon = head.getChildViews()[7];
    authoHeightIcon.define("id", "iconAutoHeight_" + win_id);
    if (isAdjust == 1) {
      authoHeightIcon.define('rowAutoHeight', "1");
      authoHeightIcon.define('tooltip', 'Выключить автоширину строк');
    }

    // устанавливаем кнопку "Свернуть"
    var minimizeIcon = head.getChildViews()[9];
    minimizeIcon.define("id", "iconMinimize_" + win_id);

    // устанавливаем кнопку "Полноэкранный режим"
    var fullscreenIcon = head.getChildViews()[10];
    fullscreenIcon.define("id", "iconFullscreen_" + win_id);

    // устанавливаем кнопку "Окно"
    var normalscreenIcon = head.getChildViews()[11];
    normalscreenIcon.define("id", "iconNormalscreen_" + win_id);

    // устанавливаем таблицу данных, добавляем обработчик по клику и прогресс бар
    var body = newWindow.getBody();

    webix.ui(webix.ui(eval(report)), body, body.getChildViews()[0]);

    var table = body.getChildViews()[0];
    table.define("id", win_id);
    table.define("menuID", menuID);
    table.clearAll();

    //отступ таблицы от краев окна
    table.$view.style.marginLeft = "3px";
    table.$view.style.marginRight = "3px";

    //отступ справа для таблиц без закрепленных столбцов
    if (!(table.config.leftSplit || table.leftSplit)) {
      table.$view.style.width = "calc(100% - 9px)";
      table.resize();
    }

    if (table.config.view == 'datatable') {
      search.hide();
      table.attachEvent("onAfterColumnDrop", function (sourceId, targetId, event) {
        setTableState(this, menuID);
      });
      table.attachEvent("onColumnResize", function (id, newWidth, oldWidth, user_action) {
        if (user_action)
          setColumnState(id, this, menuID);
      });
      table.attachEvent("onAfterColumnHide", function (id) {
        setColumnState(id, this, menuID);
      });
      table.attachEvent("onAfterColumnShow", function (id) {
        setColumnState(id, this, menuID);
      });
      table.attachEvent("onAfterLoad", function (id) {
        if (this.config.rowAutoHeight == "1")
          this.adjustRowHeight();
      });

      // устанавливаем пользовательские настройки колонок
      getFieldReport(menuID, win_id);
    }
    else {
      excelIcon.hide();
      authoHeightIcon.hide();
    }

    webix.extend(table, webix.ProgressBar);


    // устанавливаем pager
    var pager = body.getChildViews()[1].getChildViews()[0];
    pager.define("id", "pager_" + win_id);
    table.define("pager", "pager_" + win_id);

    // устанавливаем slider
    //  var slider = body.getChildViews()[1].getChildViews()[1];
    //  slider.define("id", "slider_" + win_id);

    // устанавливаем даты загрузки отчета
    var templatePeriod = body.getChildViews()[1].getChildViews()[2];
    templatePeriod.define("id", "templatePeriod_" + win_id);
    templatePeriod.define('template', '');

    if (offsetX != 0) {
      newWindow.show({ x: offsetX, y: offsetY });
    }
    else {
      newWindow.show({ x: startX, y: startY });
      startX = startX + 15;
      startY = startY + 45;
    }
  } 

  $$("templatePeriod_" + win_id).define("template", webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
  $$("templatePeriod_" + win_id).refresh();

  setFilterCount();
  
  // устанавливаем запись на нижнем таскбаре
  clearUnderline();

  if (webix.$$("task_" + win_id) == null)  {
    var task = webix.copy(iconTask);
    task.label = "<span style='text-decoration: underline'>" + reportName + "</span>";
    task.tooltip = reportName;
    task.icon = icon;
    task.id = "task_" + win_id;
    task.menuID = menuID;

    $$("taskBar").addView(task);

    $$('btnHideAll').show();
    $$('btnCloseAll').show();
  }

  // если требуется запуск сразу после открытия окна
  if (isStartWithOpen == 1 || isStartNow == 1) {
    $$("iconRefresh_" + win_id).callEvent("OnItemClick");
  }
};

// стандартное окно для загрузки сводной таблицы
function showWindowPivot(menuID, reportName, report, getProcName, description, icon, exportFileName, isStartWithOpen, offsetX, offsetY, width, height, onBeforeShow, reportMagic) {
  var win_id = report + '|' + menuID;

  // если окно уже открывали
  if (webix.$$("win_" + win_id) != null) {
    $$(win_id).clearAll();

    $$("win_" + win_id).show();
  }
  else {
    // если окно еще ни разу не открывалось, создаем его
    // копируем окно со стандартного
    var newWindow = webix.ui(winPivot);
    newWindow.define("id", "win_" + win_id);
    newWindow.define("menuID", menuID);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var windowElement = $$("win_" + win_id).$view;
    windowElement.addEventListener("click", function (ev) {
      if (ev.target.className.indexOf('filter') != -1)
        return;

      reopenWindow(ev, report, menuID);
    });

    if (width == 0 || width >= window.innerWidth)
      width = parseInt($(window).width() * 0.8);

    if (height == 0 || height >= window.innerHeight)
      height = parseInt($(window).height() * 0.8);

    newWindow.define("width", width);
    newWindow.define("height", height);

    var head = newWindow.getHead();

    // устанавливаем название окна
    var template = head.getChildViews()[0];
    template.define('template', '<span class="webix_list_icon webix_icon ' + icon + '" style="color: #0d47a1"></span> ' + reportName);
    //template.define('template', reportName);
    template.define('tooltip', description);

    // устанавливаем кнопку "Обновить"
    var refreshIcon = head.getChildViews()[1];
    refreshIcon.define("id", "iconRefresh_" + win_id);
    refreshIcon.define("report", report);
    refreshIcon.define("menuID", menuID);
    refreshIcon.define("procName", getProcName);
    refreshIcon.define("reportName", reportName);
    refreshIcon.define("reportMagic", reportMagic);

    // устанавливаем кнопку "Фильтры"
    var filterIcon = head.getChildViews()[2];
    filterIcon.define("id", "iconFilter_" + win_id);

    // устанавливаем кнопку "В Эксель"
    var excelIcon = head.getChildViews()[3];
    excelIcon.define("id", "iconExcel_" + win_id);
    excelIcon.define("exportFileName", exportFileName);

    // устанавливаем кнопку "Свернуть"
    var minimizeIcon = head.getChildViews()[4];
    minimizeIcon.define("id", "iconMinimize_" + win_id);

    // устанавливаем кнопку "Полноэкранный режим"
    var fullscreenIcon = head.getChildViews()[5];
    fullscreenIcon.define("id", "iconFullscreen_" + win_id);

    // устанавливаем кнопку "Окно"
    var normalscreenIcon = head.getChildViews()[6];
    normalscreenIcon.define("id", "iconNormalscreen_" + win_id);

    // устанавливаем таблицу данных, добавляем обработчик по клику и прогресс бар
    var body = newWindow.getBody();

    webix.ui(webix.ui(eval(report)), body, body.getChildViews()[0]);

    var table = body.getChildViews()[0];
    table.define("id", win_id);
    table.define("menuID", menuID);
    table.clearAll();

    webix.extend(table, webix.ProgressBar);

    // устанавливаем slider
    //  var slider = body.getChildViews()[1].getChildViews()[0];
    //  slider.define("id", "slider_" + win_id);

    // устанавливаем даты загрузки отчета
    var templatePeriod = body.getChildViews()[1].getChildViews()[1];
    templatePeriod.define("id", "templatePeriod_" + win_id);
    templatePeriod.define('template', '');

    if (offsetX != 0) {
      newWindow.show({ x: offsetX, y: offsetY });
    }
    else {
      newWindow.show({ x: startX, y: startY });
      startX = startX + 15;
      startY = startY + 45;
    }
  } 

  $$("templatePeriod_" + win_id).define("template", webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
  $$("templatePeriod_" + win_id).refresh();

  setFilterCount();

  // устанавливаем запись на нижнем таскбаре
  clearUnderline();

  if (webix.$$("task_" + win_id) == null) {
    var task = webix.copy(iconTask);
    task.label = "<span style='text-decoration: underline'>" + reportName + "</span>";
    task.tooltip = reportName;
    task.icon = icon;
    task.id = "task_" + win_id;
    task.menuID = menuID;

    $$("taskBar").addView(task);

    $$('btnHideAll').show();
    $$('btnCloseAll').show();
  }

  if (isStartWithOpen == 1) {
    $$("iconRefresh_" + win_id).callEvent("OnItemClick");
  }
};

// стандартное окно для загрузки произвольного содержимого
function showWindowSpecial(menuID, reportName, report, getProcName, description, icon, isStartWithOpen, offsetX, offsetY, width, height, exportFileName, onBeforeShow) {
  editMode = false;

  var win_id = report + '|' + menuID;

  // если окно уже открывали
  if (webix.$$("win_" + win_id) != null) {
    //$$(win_id).clearAll();

    $$("win_" + win_id).show();
  }
  else {
    // если окно еще ни разу не открывалось, создаем его
    // копируем окно со стандартного
    var newWindow = webix.ui(winSpecial);
    newWindow.define("id", "win_" + win_id);
    newWindow.define("menuID", menuID);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var windowElement = $$("win_" + win_id).$view;
    windowElement.addEventListener("click", function (ev) {
      // для дашбордов клик на графике
      if (ev.target.className.baseVal != null) {
        if (ev.target.className.baseVal.indexOf('highcharts') != -1)
          return;
      }

      var className = ev.target.className;

      try {
        if (className.indexOf('filter') != -1 || className.indexOf('webix_button') != -1 || className.indexOf('webix_segment') != -1)
          return;
      } catch (err) { return;  }         

      reopenWindow(ev, report, menuID);
    });

    if (width == 0 || width >= window.innerWidth)
      width = parseInt($(window).width() * 0.8);

    if (height == 0 || height >= window.innerHeight)
      height = parseInt($(window).height() * 0.8);

    newWindow.define("width", width);
    newWindow.define("height", height);

    var head = newWindow.getHead();

    // устанавливаем кнопку "Обновить"
    var refreshIcon = head.getChildViews()[1];
    refreshIcon.define("id", "iconRefresh_" + win_id);
    refreshIcon.define("report", report);
    refreshIcon.define("menuID", menuID);
    refreshIcon.define("procName", getProcName);
    refreshIcon.define("reportName", reportName);

    // устанавливаем кнопку "Удалить"
    var deleteIcon = head.getChildViews()[2];
    deleteIcon.define("id", "iconDelete_" + win_id);
    if (report != 'reportCustom')
      deleteIcon.hide();

    // устанавливаем кнопку "Фильтры"
    var filterIcon = head.getChildViews()[3];
    filterIcon.define("id", "iconFilter_" + win_id);
    setFilterCount();
    if (report != 'reportCustom')
      filterIcon.hide();

    // устанавливаем кнопку "В Эксель"
    var excelIcon = head.getChildViews()[4];
    excelIcon.define("id", "iconExcel_" + win_id);
    excelIcon.define("exportFileName", exportFileName);

    if (exportFileName == '' || exportFileName == null)
      excelIcon.hide();

    // устанавливаем название окна
    var template = head.getChildViews()[0];
    template.define('template', reportName);
    template.define('tooltip', description);

    // устанавливаем кнопку "Свернуть"
    var minimizeIcon = head.getChildViews()[5];
    minimizeIcon.define("id", "iconMinimize_" + win_id);

    // устанавливаем кнопку "Полноэкранный режим"
    var fullscreenIcon = head.getChildViews()[6];
    fullscreenIcon.define("id", "iconFullscreen_" + win_id);

    // устанавливаем кнопку "Окно"
    var normalscreenIcon = head.getChildViews()[7];
    normalscreenIcon.define("id", "iconNormalscreen_" + win_id);

    // устанавливаем таблицу данных, добавляем обработчик по клику и прогресс бар
    var body = newWindow.getBody();

    webix.ui(webix.ui(eval(report)), body, body.getChildViews()[0]);

    //для "мои отчеты" устанавливаем таблицу
    if (report == 'reportCustom') {
      var table = body.getChildViews()[0];
      table.define("id", win_id);
      table.define("menuID", menuID);
      table.clearAll();

      webix.extend(table, webix.ProgressBar);
    }
    else {
      var content = body.getChildViews()[0];
      content.define("id", report);
      content.attachEvent("onItemClick", function () {
        eval("showWindowOpened('" + win_id + "')");

        if (menuID > 1000000)
          menuID = -1;

        currentMenuID = menuID;
        currentReport = win_id;
      });

      webix.extend(content, webix.ProgressBar);
    }

    // устанавливаем slider
    //var slider = body.getChildViews()[1].getChildViews()[0];
    //slider.define("id", "slider_" + win_id);

    //  $('#range-days').show();
    //  $('#range-days').ionRangeSlider({
    //    skin: "round",
    //    type: "double",
    //    grid: false,
    //    min: dateToTS(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1)),
    //    //min: dateToTS(new Date(Date.now() - (100 * 24 * 60 * 60 * 1000))),
    //    max: dateToTS(new Date()),
    //    from: dateToTS(new Date(Date.now() - 86400000)),
    //    to: dateToTS(new Date()),
    //    prettify: tsToDate,      
    //    onFinish: function (data) {
    //      $$('Start').setValue(new Date(data.from));
    //      $$('Finish').setValue(new Date(data.to));
    //      $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
    //      $$('btnPeriod').define('tooltip', '');
    //      $$('btnPeriod').refresh();
    //  
    //      $$("iconRefresh_" + currentReport).callEvent("OnItemClick");        
    //    },
    //  });

    // устанавливаем даты загрузки отчета
    /*var templatePeriod = body.getChildViews()[1].getChildViews()[1];
    templatePeriod.define("id", "templatePeriod_" + win_id);
    templatePeriod.define('template', '');*/

    if (offsetX != 0) {
      newWindow.show({ x: offsetX, y: offsetY });
    }
    else {
      newWindow.show({ x: startX, y: startY });
      startX = startX + 15;
      startY = startY + 45;
    }
  }

  setFilterCount();

  // устанавливаем запись на нижнем таскбаре
  clearUnderline();

  if (webix.$$("task_" + win_id) == null) {
    var task = webix.copy(iconTask);
    task.label = "<span style='text-decoration: underline'>" + reportName + "</span>";
    task.tooltip = reportName;
    task.icon = icon;
    task.id = "task_" + win_id;
    task.menuID = menuID;

    $$("taskBar").addView(task);

    $$('btnHideAll').show();
    $$('btnCloseAll').show();
  }

  if (isStartWithOpen == 1) {
    $$("iconRefresh_" + win_id).callEvent("OnItemClick");
  }
};

// окно для просмотра визита
function showWindowVisit(menuID, reportName, report, getProcName, description, icon, isStartWithOpen, offsetX, offsetY, width, height, exportFileName, onBeforeShow) {
  editMode = false;

  var win_id = report + '|' + menuID;

  // если окно уже открывали
  if (webix.$$("win_" + win_id) != null) {  

    $$("win_" + win_id).show();
  }
  else {
    // если окно еще ни разу не открывалось, создаем его
    // копируем окно со стандартного
    var newWindow = webix.ui(winVisit);
    newWindow.define("id", "win_" + win_id);
    newWindow.define("menuID", menuID);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var windowElement = $$("win_" + win_id).$view;
    windowElement.addEventListener("click", function (ev) {
      // для дашбордов клик на графике
      if (ev.target.className.baseVal != null) {
        if (ev.target.className.baseVal.indexOf('highcharts') != -1)
          return;
      }

      var className = ev.target.className;

      try {
        if (className.indexOf('filter') != -1 || className.indexOf('webix_button') != -1 || className.indexOf('webix_segment') != -1)
          return;
      } catch (err) { return; }

      reopenWindow(ev, report, menuID);
    });

    if (width == 0 || width >= window.innerWidth)
      width = parseInt($(window).width() * 0.8);

    if (height == 0 || height >= window.innerHeight)
      height = parseInt($(window).height() * 0.8);

    newWindow.define("width", width);
    newWindow.define("height", height);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var head = newWindow.getHead();

    // устанавливаем кнопку "Обновить"
    var refreshIcon = head.getChildViews()[1];
    refreshIcon.define("id", "iconRefresh_" + win_id);
    refreshIcon.define("report", report);
    refreshIcon.define("menuID", menuID);
    refreshIcon.define("procName", getProcName);
    refreshIcon.define("reportName", reportName);

    // устанавливаем кнопку "Свернуть"
    var minimizeIcon = head.getChildViews()[2];
    minimizeIcon.define("id", "iconMinimize_" + win_id);

    // устанавливаем кнопку "Полноэкранный режим"
    var fullscreenIcon = head.getChildViews()[3];
    fullscreenIcon.define("id", "iconFullscreen_" + win_id);

    // устанавливаем кнопку "Окно"
    var normalscreenIcon = head.getChildViews()[4];
    normalscreenIcon.define("id", "iconNormalscreen_" + win_id);

    if (offsetX != 0) {
      newWindow.show({ x: offsetX, y: offsetY });
    }
    else {
      newWindow.show({ x: startX, y: startY });
      startX = startX + 15;
      startY = startY + 45;
    }
  }

  //setFilterCount();

  // устанавливаем запись на нижнем таскбаре
  clearUnderline();

  if (webix.$$("task_" + win_id) == null) {
    var task = webix.copy(iconTask);
    task.label = "<span style='text-decoration: underline'>" + reportName + "</span>";
    task.tooltip = reportName;
    task.icon = icon;
    task.id = "task_" + win_id;
    task.menuID = menuID;

    $$("taskBar").addView(task);

    $$('btnHideAll').show();
    $$('btnCloseAll').show();
  }

  if (isStartWithOpen == 1) {
    $$("iconRefresh_" + win_id).callEvent("OnItemClick");
  }
};


// Окно для просмотра фото
function showWindowPhoto(menuID, reportName, report, getProcName, description, icon, isStartWithOpen, offsetX, offsetY, width, height, exportFileName, onBeforeShow) {
  var win_id = report + '|' + menuID;

  // если окно уже открывали
  if (webix.$$("win_" + win_id) != null) {
    var oldWindow = $$("win_" + win_id);

    expandWindowPhoto(oldWindow);    
  }
  else {
    // если окно еще ни разу не открывалось, создаем его
    // копируем окно со стандартного
    var newWindow = webix.ui(winPhoto);
    newWindow.define("id", "win_" + win_id);
    newWindow.define("menuID", menuID);

    if (onBeforeShow != '') {
      newWindow.attachEvent("onBeforeShow", function () {
        eval(onBeforeShow);
      });
    }

    var windowElement = $$("win_" + win_id).$view;
    windowElement.addEventListener("click", function (ev) {
      // для дашбордов клик на графике
      if (ev.target.className.baseVal != null) {
        if (ev.target.className.baseVal.indexOf('highcharts') != -1)
          return;
      }

      var className = ev.target.className;

      try {
        if (className.indexOf('filter') != -1 || className.indexOf('webix_button') != -1 || className.indexOf('webix_segment') != -1)
          return;
      } catch (err) { return; }

      reopenWindow(ev, report, menuID);
    });

    expandWindowPhoto(newWindow);
  } 

  if (isStartWithOpen == 1) {
    var exec_string = "get" + report + "(menuID, report, getProcName, reportName)"

    eval(exec_string);    
  }
};

function fullScreen(currentWindow) {
  currentWindow.show();

  // Запрашиваем полноэкранный режим для всего документа (имитация F11)
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

  // Теперь задаем размеры окна Webix
  currentWindow.define("width", window.screen.width);
  currentWindow.define("height", window.screen.height);
  currentWindow.define("top", 0);
  currentWindow.define("left", 0);
  currentWindow.resize();
}

// открытие окна при нажатии на его область, когда оно под другим окном
function reopenWindow(ev, report, menuID) {
  if (ev != null) {
    var elem = ev.srcElement.localName;

   if (elem == 'select' || elem == 'textarea' || elem == 'input')
      return;
  }

  $$("win_" + report + '|' + menuID).show();

  if (menuID > 1000000)
    menuID = -1;

  currentMenuID = menuID;
  currentReport = report + '|' + menuID;

  dashWindow = report;

  clearUnderline();
  setUnderline('task_' + report + '|' + menuID);
}

// сохранение состояние таблицы
function setTableState(table, menuID) {
  var columns = table.getColumns(true);
  var sortOrder = 0;

  columns.forEach(function (column) {
    var fieldName = column.id;
    var width = column.width;
    var isHidden = table.isColumnVisible(fieldName) ? 0 : 1;
    var name = column.header.length == 3 ? column.header[1].text : column.header[0].text; //column.header[0].text;
    sortOrder = sortOrder + 1;
    
    $.ajax({
      url: '../Services/Framework.asmx/SetFieldUserMap',
      data: JSON.stringify({
        'Menu': menuID, 'User': localStorage.getItem('Author'), 'FieldName': fieldName, 'Name': name, 'Width': width, 'IsHidden': isHidden, 'SortOrder': sortOrder
      }),
      success: function (data) {
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
      }
    });
  });
}

// сохранение состояние столбца
function setColumnState(columnName, table, menuID) {
  const columns = table.getColumns(true);
  let sortOrder = 0;

  columns.some(function (column) {
    sortOrder = sortOrder + 1;
    if (column.id == columnName) {
      const fieldName = column.id;
      const width = column.width;
      const isHidden = table.isColumnVisible(fieldName) ? 0 : 1;
      const name = column.header.length == 3 ? column.header[1].text : column.header[0].text;

      $.ajax({
        url: '../Services/Framework.asmx/SetFieldUserMap',
        data: JSON.stringify({ 'Menu': menuID, 'User': localStorage.getItem('Author'), 'FieldName': fieldName, 'Name': name, 'Width': width, 'IsHidden': isHidden, 'SortOrder': sortOrder }),
        error: function (xhr, ajaxOptions, thrownError) { alert(xhr.responseText); }
      });

      return true;
    }
    return false;
  });
}

// обработчик клика на нижнюю строку на плашку окна
function showWindowOpened(report) {
  var task = $$("task_" + report);

  var x = task.config.x;
  var y = task.config.y;

  $$("win_" + report).show({ x, y });

  clearUnderline();
  setUnderline('task_' + report);
}

// обновить колонки из сохраненного состояния
function getFieldReport(menuID, table) {
  $.ajax({
    url: '../../Services/Framework.asmx/GetFieldUserMap',
    timeout: 300000,
    data: JSON.stringify({ 'Menu': menuID, 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var items = JSON.parse(data.d);

      if (items.length == 0)
        return;

      for (var j = 0; j < items.length; j++) {
        var column = $$(table).getColumnConfig(items[j].FieldName);
        if (column !== undefined) {
          column.header.length == 3 ? column.header[1].text : column.header[0].text = items[j].Name;
          column.width = items[j].Width;
          if (items[j].IsHidden)
            $$(table).hideColumn(column.id);

          var columnIndexToMove = $$(table).getColumnIndex(column.id);
          $$(table).moveColumn(columnIndexToMove, items[j].SortOrder);
        }
      }
      $$(table).refreshColumns();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    }
  });
}

// установка интервала
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
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

      $$('Start').setValue(firstDay);
      $$('Finish').setValue(lastDay);

      break;
  }

  $$('winPeriod').hide();
}

// общий функционал экспорта в Эксель
function toExcelData(report, exportFileName, exportMail) {
  var list = $$(report);

  if (exportMail == 1) {
    webix.modalbox({
      title: "Как скачать отчет?", buttons: ["В браузере", "Отправить на почту", "Отмена"], width: 280,
    }).then(function (result) {
      if (result == 0) { toExcelData(report, exportFileName) } //в excel в браузере
      else if (result == 1) { toExcelMail(list.config.menuID) }//отправка отчета на почту
    });
  }
  //в excel в браузере
  else {
    // установка колонок
    var column = [];
    if (list.config.view == 'datatable') {
      list.eachColumn(
        function (columnId) {
          var config = list.getColumnConfig(columnId);
          column.push({
            id: config.id,
            header: config.header.length == 3 ? [{ text: config.header[0] == null ? '' : config.header[0].text }, { text: config.header[1].text }] : config.header[0].text,
            //exportType: ((config.sort == 'int') || (config.sort == 'raw') || (config.id.indexOf('ID') != -1)) ? 'number' : 'string'
          });
        }
      );
      webix.toExcel(report, { filename: exportFileName, name: 'Data', filterHTML: true, rawValues: true, columns: column });
    }
    else
      webix.toExcel(report, { filename: exportFileName, name: 'Data' });
  }
}

//отправка отчета на почту
function toExcelMail(menuID) {
  const authorEmail = localStorage.Email
  //проверка наличия почты
  if (authorEmail == '' || authorEmail === undefined) {
    webix.message({
      text: "Для отправки отчета на почту - обратитесь к администратору для регистрации вашего email адреса в системе.",
      type: "error",
      expire: 5000,
    });
  }
  else {
    webix.confirm({
      title: "Отправить отчет на почту " + authorEmail + "?",
      ok: "Да",
      cancel: "Нет",
      callback: function (result) {
        if (result === true) {
          $.ajax({
            url: '../../Services/ExcelPS.asmx/ToExcel',
            data: JSON.stringify({ 'MenuID': menuID, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Company': localStorage.getItem('CompanyID') }),
          });
          webix.message({
            text: "Отчет будет сформирован и отправлен на ваш email",
            type: "info",
            expire: 3000,
          });
        } else {
        }
      }
    });
  }
}

// стандартная процедура вызова процедуры загрузки отчета
function getReportData(menuID, report, procName, reportName, reportMagic = null) {
  var win_id = report + '|' + menuID;

  var start = webix.i18n.parseFormatStr($$('Start').getValue());
  var finish = webix.i18n.parseFormatStr($$('Finish').getValue())

  showProgress(win_id);

  if (report == 'reportCustom') {
    $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
    $$('btnPeriod').define('tooltip', '');
    $$('btnPeriod').refresh();
  }
  else {
    $$("templatePeriod_" + win_id).define("template", start + '-' + finish);
    $$("templatePeriod_" + win_id).refresh();
  }

  $$("task_" + win_id).define("tooltip", reportName + " (" + start + '-' + finish + ")");
  $$("task_" + win_id).refresh();

  $.ajax({
    url: '../../Services/Framework.asmx/SetUserCompany',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $.ajax({
        url: '../../Services/Framework.asmx/Run',
        timeout: 300000,
        data: JSON.stringify({ 'Menu': menuID, 'BaseName': localStorage.getItem("BaseName"), 'ProcName': procName, 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish, 'Last': null, 'ReportMagic': reportMagic }),
        success: function (data) {
          $$(win_id).clearAll();
          $$(win_id).parse(data.d);

          if (procName == 'REPORT.Photo')
            currentPhotoData = data.d;
          else
            currentPhotoData = null;
          
        },
        complete: function () {
          //if (toExcel != null) excelDownload(report, dateReport);
          $$(win_id).hideProgress();
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

// стандартная процедура вызова процедуры загрузки сводной таблицы
function getPivotData(menuID, report, procName, reportName, reportMagic) {
  var win_id = report + '|' + menuID;

  var start = webix.i18n.parseFormatStr($$('Start').getValue());
  var finish = webix.i18n.parseFormatStr($$('Finish').getValue());

  $$("templatePeriod_" + win_id).define("template", start + '-' + finish);
  $$("templatePeriod_" + win_id).refresh();

  $$("task_" + win_id).define("tooltip", reportName + " (" + start + '-' + finish + ")");
  $$("task_" + win_id).refresh();

  showProgress(win_id);

  $.ajax({
    url: '../../Services/Framework.asmx/SetUserCompany',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $.ajax({
        url: '../../Services/Framework.asmx/Run',
        timeout: 300000,
        data: JSON.stringify({ 'Menu': menuID, 'BaseName': localStorage.getItem("BaseName"), 'ProcName': procName, 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish, 'Last': 1, 'ReportMagic': reportMagic }),
        success: function (data) {
          var pivotData = JSON.parse(data.d);
          var structure = eval(report + "_structure");
          var field = eval(report + "_field");

          $$(win_id).parse(pivotData, structure, field);
        },
        complete: function () {
          $$(win_id).hideProgress();
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

// загрузка карты отчетов при загрузке
function getLeftMenu() {
  $.ajax({
    url: '../../Services/Framework.asmx/GetMenu',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      var list = $$('leftMenu');

      list.clearAll();
      list.parse(data.d);

      // установка иконок снизу
      setIcon();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

// загрузка служебных окон, которых нет в карте отчетов
function getMenuUtility() {
  $.ajax({
    url: '../../Services/Framework.asmx/GetMenuIcon',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $$('menuUtility').clearAll();
      $$('menuUtility').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

// список компаний
function getCompany() {
  $.ajax({
    url: '../../Services/Framework.asmx/GetCompany',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var option = $$("dataCompany").getList();

      option.clearAll();
      option.parse(data.d);

      //подгоняем высоту под количество компаний
      option.define("height", Math.min(option.count(), 15) * option.type.height);
      option.resize();

      $$("comboCompany").setValue(localStorage.getItem('CompanyID'));
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

// клик на меню отчетов слева
function showReport(item, isStartNow) {
  $$('popupLeftMenu').hide();

  currentMenuID = item.id;
  if (item.id > 1000000)
    currentMenuID = -1;

  currentReport = item.WindowName + '|' + item.id;

  ordinaryX = item.OffsetX,
    ordinaryY = item.OffsetY;
  ordinaryWidth = item.Width;
  ordinaryHeight = item.Height;

  if (item.WindowName == 'photoInfo') {
    showWindowPhoto(item.id, item.value, item.WindowName, item.GetProcName, item.Description, item.icon, item.IsStartWithOpen,
      item.OffsetX, item.OffsetY, item.Width, item.Height, item.ExportFileName, item.OnBeforeShow);

    return;
  }

  if (item.WindowName == 'visitInfo') {
    showWindowVisit(item.id, item.value, item.WindowName, item.GetProcName, item.Description, item.icon, item.IsStartWithOpen,
      item.OffsetX, item.OffsetY, item.Width, item.Height, item.ExportFileName, item.OnBeforeShow);

    return;
  }

  if (item.IsSpecial == 1) {
    showWindowSpecial(item.id, item.value, item.WindowName, item.GetProcName, item.Description, item.icon, item.IsStartWithOpen,
      item.OffsetX, item.OffsetY, item.Width, item.Height, item.ExportFileName, item.OnBeforeShow);

    return;
  }

  if (item.IsPivot == 0)
    showWindow(item.id, item.value, item.WindowName, item.GetProcName, item.Description, item.icon, item.ExportFileName, item.IsStartWithOpen,
      item.OffsetX, item.OffsetY, item.Width, item.Height, item.IsAdjust, isStartNow, item.IsArchive, item.OnBeforeShow, item.ReportMagic, item.ExportMail);
  else
    showWindowPivot(item.id, item.value, item.WindowName, item.GetProcName, item.Description, item.icon, item.ExportFileName, item.IsStartWithOpen,
      item.OffsetX, item.OffsetY, item.Width, item.Height, item.OnBeforeShow, item.ReportMagic);
}

// свернуть все окна, кнопка справа вверху
function hideAllWindows() {
  for (i = 0; i < $$('taskBar').getChildViews().length; i++) {
    var winName = $$('taskBar').getChildViews()[i].config.id.replace("task", "win");

    isHide = 0;
    $$(winName).hide();
  }
  
  currentMenuID = -1;
  currentReport = '';
}

// закрыть все окна, кнопка справа вверху
function closeAllWindows() {
  /*for (var id in webix.views) {
    var view = webix.views[id];
    if (view && view.config.view === "window") {
      view.close();
    }
  }

  currentMenuID = -1;
  currentReport = '';
  $$('btnHideAll').hide();
  $$('btnCloseAll').hide();*/

  //20.07.26 вернул прежний вариант, так как новый не работает
  var i = 0;

  while ($$('taskBar').getChildViews().length != 0 || i > 100) {
    var winName = $$('taskBar').getChildViews()[0].config.id.replace("task", "win");

    isHide = 1;
    $$(winName).show();
    $$(winName).hide();

    i = i + 1
  }

  currentMenuID = -1;
  currentReport = '';

  $$('btnHideAll').hide();
  $$('btnCloseAll').hide();
}

// все действия, которые нужно сделать при загрузке app2.html
function onStart() {
  $$('Start').setValue(new Date());
  $$('Finish').setValue(new Date());
  $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
  $$("btnPeriod").define('tooltip', 'сегодня');
  $$('btnPeriod').refresh();

  getLeftMenu();
  getMenuUtility();

  var date = new Date();
  var time = date.getTime();

  $$("areaDesktop").define("css", { "background-image": "url(1.jpg?time=" + time + ")", "background-size": "contain", "background-position": "center", "background-repeat": "no-repeat", "height": "100vh", "width": "100vw" });
  $$("areaDesktop").define("css", "portlet-header");
  $$("areaDesktop").refresh();

  //$$('bodyMain').show();
  //$$("areaDesktop").hide();

  $.ajax({
    url: '../../Services/Framework.asmx/GetUserSetting',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var items = JSON.parse(data.d);

      for (var j = 0; j < items.length; j++) {
        var magic = items[j].Magic;
        var value = items[j].Value;

        if (magic == 'ICON_HEIGHT') {
          $$('iconFooter').define('height', Number(value));
          $$('iconFooter').resize();
        }
        /*else if (magic == 'HIDE_DASHBOARD') {
          if (value == "1") {
            $$('bodyMain').hide();
            $$("areaDesktop").show();
          }
        }*/
        else if (magic == 'BACKGROUND') {
          if (value != '') {
            var date = new Date();
            var time = date.getTime();

            $$("areaDesktop").define("css", { "background-image": "url(../../Photos/User/" + value + "?time=" + time + ")", "background-size": "contain", "background-position": "center", "background-repeat": "no-repeat", "height": "100vh", "width": "100vw" });
            $$("areaDesktop").refresh();
          }          
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });

  //getReportDash(true);

  setFilterCount();
}

function setUserSetting(magic, value) {
  $.ajax({
    url: '../../Services/Framework.asmx/SetUserSetting',
    timeout: 120000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Magic': magic, 'Value': value }),
    success: function (data) { },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr.responseText);
    }
  });
}

function onPhotoUploadUser(item) {
  var date = new Date();
  var time = date.getTime();

  $$("areaDesktop").define("css", { "background-image": "url(../../Photos/User/" + localStorage.getItem('Author') + "/" + item.name + "?time=" + time + ")", "background-size": "contain", "background-position": "center", "background-repeat": "no-repeat", "height": "100vh", "width": "100vw" });
  $$("areaDesktop").refresh();  

  setUserSetting('BACKGROUND', (localStorage.getItem('Author') + "/" + item.name));
}

function clearUnderline() {
  var taskBar = $$("taskBar");

  taskBar.getChildViews().forEach(function (view) {
    view.define("label", view.config.tooltip.template);   
    view.refresh();
  });
}

function setUnderline(name) {
  var view = $$(name);

  if (view != null) {
    view.define("label", "<span style='text-decoration: underline'>" + view.config.tooltip.template + "</span>");
    view.refresh();
  }
}

//скрывает всплывающее окно excel фильтра
function closeAllFilters(table) {
  for (const column of table.getColumns()) {
    if (column.header[1]?.content === "excelFilter") {
      const filterPopup = table.getFilter(column.id);
      filterPopup?.hide();
    }
  }
}

///доп.меню отчета
//создаем доп.меню и его функционал
function reportAddMenu(report) {
  const button = $$(this.config.id);
  const menuID = report.config.menuID;
  const reportType = report.config.id.split('|')[0]; // Берем часть до |
  const menuData = menuConfigs[reportType];

  // Закрываем меню если уже открыто
  if (button._menu && button._menu.isVisible()) {
    button._menu.hide();
    return;
  }

  // Создаем меню
  button._menu = webix.ui({
    view: "popup", width: 200,
    body: {
      view: "list", data: menuData, autoheight: true,
      template: function (obj) {
        return `<div class="reportAddMenu-item"><span class='webix_icon ${obj.icon}'></span> ${obj.value}</div>`;
      },
      on: {
        onItemClick: function (id) {
          button._menu.hide();
          addMenuAction(id, reportType, report, menuID);
        }
      }
    },
    on: {
      onHide: function () {
        button._menu = null;
      }
    }
  });

  button._menu.show(button.getNode()); // Показываем меню

  // Обработчик клика вне меню
  webix.attachEvent("onClick", function (e) {
    if (!button._menu) return;

    const menuElement = button._menu.getNode();
    const buttonElement = button.getNode();

    if (menuElement && !menuElement.contains(e.target) && !buttonElement.contains(e.target)) {
      button._menu.hide();
    }
  });
}

//варианты меню для разных отчетов
const menuConfigs = {
  photoPro: [
    { id: "checkAllPhoto", value: "Подтвердить все фото", icon: "fas fa-tasks" },
    { id: "checkPhotoYes", value: "Фильтр подтв. фото", icon: "fas fa-filter" },
    { id: "checkPhotoNo", value: "Фильтр Не подтв. фото", icon: "fas fa-filter" },
  ],
  photo: [
    { id: "checkAllPhoto", value: "Подтвердить все фото", icon: "fas fa-tasks" },
    { id: "checkPhotoYes", value: "Фильтр подтв. фото", icon: "fas fa-filter" },
    { id: "checkPhotoNo", value: "Фильтр Не подтв. фото", icon: "fas fa-filter" },
  ]
};

//обработка действий меню
function addMenuAction(actionId, reportType, report, menuID) {
  switch (actionId) {
    case "checkAllPhoto":
      checkAllPhoto(report);
      break;
    case "checkPhotoYes":
      report.filter(item => item.IsPhotoCheck === 1);
      break;
    case "checkPhotoNo":
      report.filter(item => item.IsPhotoCheck === 0);
      break;
  }
}
/// -- конец доп.меню отчета