// общие функции для дашбордов
var dashPeriod = 'Days', isStart = true, isTrandCalc = true, isCompare = 0; dashMagic = 'Компании'; isDashFix = 0;
var dashWindow = '';
var isAnimate = true;

//Highcharts.seriesTypes.line.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline; // -- плавные линии графика

function clearElem(name) {
  var el = document.getElementById(name);
  el.removeAttribute('onclick');
  el.replaceWith(el.cloneNode(true));
}

webix.ui.datafilter.mCheckbox2 = webix.extend({
  refresh: function (master, node, config) {
    node.onclick = function () {
      this.getElementsByTagName("input")[0].checked = config.checked = !config.checked;
      var column = master.getColumnConfig(config.columnId);
      var checked = config.checked ? column.checkValue : column.uncheckValue;

      master.blockEvent();

      var isChanged = false;
      var i = 0;

      master.data.each(function (obj) {
        if (obj[config.columnId] != checked)
          isChanged = true;

        if (checked)
          i = i + 1;

        obj[config.columnId] = checked;

        master.callEvent("onCheck", [obj.id, config.columnId, checked]);
        this.callEvent("onStoreUpdated", [obj.id, obj, "save"]);

        setLegengStatus2(obj, false);
      });
      master.refresh();

      master.unblockEvent();

      var checkCompare = getCheckCompare();

      checkCompare.setValue(0);
      isCompare = 0;

      getDashReport(master.getParentView().getParentView().config.dataName, false, false);
      dashMagic = master.getParentView().getParentView().config.dataName;

      setDashFilter(master);
    };
  },
}, webix.ui.datafilter.masterCheckbox);

function mark_incorrect(value) {
  if (value == 0)
    return "dash-no-visit";
}

function setStartDate(win_id, reportName) {
  $$('Start').setValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  $$('Finish').setValue(new Date());

  var start = webix.i18n.parseFormatStr($$('Start').getValue());
  var finish = webix.i18n.parseFormatStr($$('Finish').getValue())

  $$("task_" + win_id).define("tooltip", reportName + " (" + start + '-' + finish + ")");
  $$("task_" + win_id).refresh();

  $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
  $$('btnPeriod').refresh();

  var my_range = $("#range-days").data("ionRangeSlider");

  if (my_range != null) {
    my_range.update({
      from: dateToTS(new Date($$('Start').getValue())),
      to: dateToTS(new Date($$('Finish').getValue()))
    });
  }
}

var dashPeriod2 = {
  view: "segmented", multiview: true, value: 'Days', width: 200, tooltip: true,
  options: [
    { id: "Days", value: "День" },
    { id: "Weeks", value: "Неделя" },
    { id: "Months", value: "Месяц" }
  ],
  on: {
    onChange: function (newv, oldv) {
      dashPeriod = newv;

      isCompare = 0;
      var checkCompare = getCheckCompare();

      checkCompare.setValue(0);

      getDashReport('', false, false, true);
      dashMagic = '';
    }
  }
}

var dashFilter = {  
  rows: [
    {
      cols: [
        { template: "Фильтры", type: "header", borderless: true },
        {},
        {
          view: "checkbox", labelRight: "Сравнить", tooltip: "Показать графики выполнения отдельно для выбранных элементов", labelWidth: 0, customCheckbox: true, value: 0, width: 80, //hidden: true,
          click: function (id, e) {
            isCompare = this.getValue();

            var magic, table;

            var dashFilter = getDashFilterMenu();
            var cells = dashFilter.getChildViews();

            for (var i = 0; i < cells.length; i++)
              if (!cells[i].config.collapsed) {
                magic = cells[i].config.dataName;
                table = cells[i].getChildViews()[0].getChildViews()[0];

                break;
              }

            if (isCompare == 1) {
              var row = table.find(function (obj) { return (obj.status == 1) });
              if (row.length > 9) {
                webix.confirm({
                  title: "Отмена", ok: "Да", cancel: "Нет", type: "confirm", text: 'Выбранных элементов слишком много.<br/>Построение графика может занять продолжительное время.<br/>Продолжить?',
                  callback: function (result) {
                    if (result) {
                      getDashReport(magic, false, false);
                      
                    }
                    else
                      isCompare = 0;
                  }
                });
              }
              else getDashReport(magic, false, false);
            }
            else
              getDashReport(magic, false, false);
          }
        },
        {

          view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в эксель",
          click: function () {
            var table;

            var dashFilterView = getDashFilterMenu();
            var cells = dashFilterView.getChildViews();

            for (var i = 0; i < cells.length; i++)
              if (!cells[i].config.collapsed) {
                table = cells[i].getChildViews()[0].getChildViews()[0];

                break;
              }

            if (table != null)
              webix.toExcel(table, { filterHTML: true, footer: false });
          }
        },
        {
          view: "icon", icon: "fas fa-trash", tooltip: "Очистить все фильтры",
          click:
            function () {
              clearLegengStatus();
            }
        }

      ]
    },
    {
      view: "accordion", css: "webix_dark", multi: "mixed", collapsed: true, minHeight: 300, //autoheight: true,
      rows: [],
      on: {
        onAfterExpand: function (id) {
          this.getChildViews().forEach(function (view) {
            if (view != $$(id))
              view.collapse();
          });

          getDashFilterData(id);
        }
      },

    },
  ]
}

var dashTotal = {
  cols: [
    {
      rows: [
        { view: "label", label: "<span class='dashboard-small'>0%</span>", align: "center" },
        { view: "label", label: "Итого", css: { 'text-align': 'center', 'font-weight': 'bold' } }
      ]
    },
    {
      rows: [
        { view: "label", label: "<span class='dashboard-small'>0</span>", align: "center" },
        { view: "label", label: "Визитов\\ТТ", css: { 'text-align': 'center', 'font-weight': 'bold' } }
      ]
    }

  ]
}

var dashTemp = {
  view: "datatable", autoConfig: true, hidden: true, height: 0
};

var rightSpace = { view: "template", template: "" };

// общий график показа процентных показателей - загрузка
function showChartMain(magic, table) {
  //var table = $$('dashTemp2');

  $$('dashContainer' + dashWindow).show();
  $('#dashMain' + dashWindow).show();

  var chart = Highcharts.chart('dashMain' + dashWindow, eval('chart_main_' + dashWindow));

  // удаляем старые серии
  while (chart.series.length) {
    chart.series[0].remove();
  }

  chart.render();

  table.sort([{ by: "SeriesName", dir: "asc" }, { by: "Start", dir: "asc" }]);

  table.filter(function (obj) {
    return obj.Magic.indexOf(magic) != -1;
  });

  if (table.count() == 0)
    return;

  var categories = [];
  var series = [];
  var values = [];
  var lastName = '';

  var item = table.getItem(table.getFirstId());

  series.push(item.SeriesName);

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (series.indexOf(obj.SeriesName) == -1) {
      series.push(obj.SeriesName);

      chart.addSeries({
        name: lastName,//obj.LegendName,        
        borderWidth: 0,
        lineWidth: 2,
        dataLabels: {
          enabled: true,
          format: '{y}%',
        },
        data: values
      });

      values = [];
    }

    values.push({
      y: obj.Result,
      start: obj.StartText,
      finish: obj.FinishText
    });

    lastName = obj.SeriesName;
  });

  chart.addSeries({
    name: lastName,
    color: '#4E82BC',
    borderWidth: 0,
    lineWidth: 2,
    dataLabels: {
      enabled: true,
      format: '{y}%',
    },
    data: values
  });

  chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });
  

  chart.setSize(null, $$("dashContainer" + dashWindow).$height);
}

// установка итоговых значений в шапке
function showTotal(table) {
  table.filter(function (obj) {
    return obj.Magic.indexOf('TOTAL') != -1;
  });

  var data_graph = table.getItem(table.getFirstId());

  if (data_graph == null)
    return;

  var percents = (data_graph.Result == null) ? 0 : data_graph.Result;
  var visitCount = (data_graph.FactCount == null) ? 0 : data_graph.FactCount;
  var pointCount = (data_graph.PlanCount == null) ? 0 : data_graph.PlanCount;

  var dashPercent = getDashPercent();
  var dashPlan = getDashPlan();

  dashPercent.setValue("<span class='dashboard-small'>" + percents + "%</span>");
  dashPlan.setValue("<span class='dashboard-small'>" + visitCount + "\\" + pointCount + "</span>");
}

function setDashFilter(table) {
  var row = table.find(function (obj) { return (obj.status == 1) });
  var row_nocheck = table.find(function (obj) { return (obj.status == 0) });

  var text = '';

  if (row_nocheck.length != 0) {
    text = row.length;
  }
  else {
    if (row.length == 0)
      text = '(пусто)';
    else
      text = 'Все';
  }

  var parent = table.getParentView().getParentView()
  var config = parent.config;

  parent.define("header", '<span class="webix_list_icon webix_icon ' + config.dataIcon + '"></span>' + config.dataName + ' (' + text + ')');
  parent.refresh();
}

function createDashFilterMenu(isFirst) {
  $.ajax({
    url: '../../Services/BI.asmx/GetFilter',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Window': dashWindow }),
    success: function (data) {
      var data = JSON.parse(data.d);
      if (data.length == 0)
        return;

      var menu = getDashFilterMenu();
      menu.getChildViews().forEach(function (view) {
        menu.removeView(view.config.id);
      });
      menu.reconstruct();

      for (var i = 0; i < data.length; i++)
        menu.addView({
          view: "accordionitem", header: '<span class="webix_list_icon webix_icon ' + data[i].icon + '"></span>' + data[i].Name + ' (' + data[i].Text + ')', dataIcon: data[i].icon, dataName: data[i].Name,
          body: {}
        });

      menu.getChildViews().forEach(function (view) {
        view.collapse();
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    },
    complete: function () {
      var checkCompare = getCheckCompare();
      checkCompare.setValue(0);
      isCompare = 0;

      var space = getRightSpace();
      space.hide();
    },
  });
}

function getDashFilterData(id) {
  var item = $$(id);
  var magic = item.config.dataName;
  
  var dashFilterView = getDashFilterMenu().config.id;
  showProgress(dashFilterView);

  $.ajax({
    url: '../../Services/BI.asmx/RunFilter',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Magic': magic, 'Window': dashWindow }),
    success: function (data) {
      $$(dashFilterView).hideProgress();

      webix.ui(
        {
          rows: [
            {
              view: "datatable", id: 'filter_' + dashWindow + id, select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, rowHeight: 20, tooltip: true,
              columns: [
                { id: "status", header: [{ content: "mCheckbox2" }], template: "{common.checkbox()}", width: 20 },
                { id: "Name", header: ['Наименование', { content: "textFilter" }], fillspace: true, minWidth: 60, sort: "string", css: "chart-table-text", tooltip: true },
                {
                  id: "Result", header: ['%', { content: "textFilter" }], width: 36, minWidth: 30, sort: "int", css: "chart-table-text", tooltip: true,
                  template: function (obj) {
                    return obj.Result + '%';
                  }
                },
                {
                  id: "ResultValue", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                  template: function (obj) {
                    var html = "<div class='progress_bar_element'>";
                    html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                    html += "</div>";
                    return html;
                  }
                }
              ],
              on: {
                onItemClick: function (id, e) {
                  var item = this.getItem(id);

                  if (item == null)
                    return;

                  if (id.column == 'status') {
                    item.status = !item.status;
                    this.updateItem(item.id, item);

                    setLegengStatus2(item, 1);
                  }
                  else {
                    this.eachRow(
                      function (row) {
                        var itemHide = this.getItem(row);

                        itemHide.status = (itemHide.id == item.id) ? 1 : 0;
                        this.updateItem(itemHide.id, itemHide);
                      });

                    setLegengStatus2(item, 1, 1);
                  }

                  setDashFilter(this);
                },
                onCheck: function (id, col, val) {
                  var item = this.getItem(id);

                  if (item == null)
                    return;

                  setLegengStatus2(item, 1);

                  setDashFilter(this);
                }
              }
            }

          ]
        }, item, 0);//.define("autoheight", true);

      $$('filter_' + dashWindow + id).clearAll();
      $$('filter_' + dashWindow + id).parse(data.d);
    },
    complete: function () {
      var checkCompare = getCheckCompare();
      checkCompare.setValue(0);
      isCompare = 0;

      $$(dashFilterView).hideProgress();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    }
  });
}

function setLegengStatus2(item, isRefresh, isOne = null) {
  $.ajax({
    url: '../../Services/BI.asmx/SetLegendStatus2',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Window': dashWindow, 'Magic': item.Magic, 'ID': item.ID, 'Status': item.status, 'IsOne': isOne }),
    success: function (data) {
      if (isRefresh) {
        dashMagic = item.Magic;
        getDashReport(item.Magic, false, false);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    }
  });
}

function clearLegengStatus() {
  var table = getTempTable();

  $.ajax({
    url: '../../Services/BI.asmx/ClearLegendStatus',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Window': dashWindow }),
    success: function (data) {
      getDashData(table, 'Компании', false, true);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    }
  });
}

function setDashFilter(table) {
  var row = table.find(function (obj) { return (obj.status == 1) });
  var row_nocheck = table.find(function (obj) { return (obj.status == 0) });

  var text = '';

  if (row_nocheck.length != 0) {
    text = row.length;
  }
  else {
    if (row.length == 0)
      text = '(пусто)';
    else
      text = 'Все';
  }

  var parent = table.getParentView().getParentView()
  var config = parent.config;

  parent.define("header", '<span class="webix_list_icon webix_icon ' + config.dataIcon + '"></span>' + config.dataName + ' (' + text + ')');
  parent.refresh();
}

/// ----------------------------------------- общие процедуры обновления
function getDashReport(magic, isCalc, isFirst, noDraw = null) {
  var table = getTempTable();

  var area = ''
  dashMagic = magic;

  if (dashWindow == 'BA_Distipline2') {
    if ($$('areaTotal' + dashWindow).isVisible()) {
      getDashData(table, magic, isCalc, isFirst, noDraw);
      return;
    }
    else if ($$('areaOffice' + dashWindow).isVisible())
      area = 'Office';
    else if ($$('areaCity' + dashWindow).isVisible())
      area = 'City';
    else if ($$('areaNetwork' + dashWindow).isVisible())
      area = 'Network';
    else if ($$('areaPoint' + dashWindow).isVisible())
      area = 'Point';
    else if ($$('areaUser' + dashWindow).isVisible())
      area = 'User';
    else if ($$('areaMaster' + dashWindow).isVisible())
      area = 'Master';

    isTrandCalc = true;
    calcArea(magic, area);
    return;
  }

  if (dashWindow == 'BA_OSA' || dashWindow == 'BA_OOS') {
    if ($$('areaTotal' + dashWindow).isVisible())
      getDashData(table, magic, isCalc, isFirst, noDraw);
  }
}

function getDashData(table, magic, isCalc, isFirst, noDraw = null) {
  $$('areaDash' + dashWindow).show();
  $$('areaDetail' + dashWindow).hide();

  if (dashWindow != 'BA_OSA' && dashWindow != 'BA_OOS')
    isDashFix = 0;

  showProgress(dashWindow);

  $.ajax({
    url: '../../Services/BI.asmx/' + dashWindow,
    timeout: 300000,
    data: JSON.stringify({
      'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Period': dashPeriod,
      'Magic': magic, 'IsCalc': (isCalc) ? 1 : 0, 'IsFirst': (isFirst) ? 1 : 0, 'IsFix': isDashFix, 'IsCompare': isCompare
    }),
    success: function (data) {
      table.clearAll();
      table.parse(data.d);      

      if (isFirst || isCalc)
        createDashFilterMenu(true); 

      if (!noDraw && isCompare == 0 && magic != '')
        showTotal(table);

      if (dashWindow == 'BA_Distipline2') {
        showChartMain('ROUTE', tempTableBA_Distipline2);

        if (isCompare == 0)
          showChartMainQuant();

        if (!noDraw && isCompare == 0 && magic != '') {
          showChartCoverage();
          showChartWork();
        }
      }


      else if (dashWindow == 'BA_OSA') {
        showChartMain('OSA', tempTableBA_OSA);

        if (isCompare == 0)
          ($$('dashContainerQuant' + dashWindow).isVisible()) ? showOSAService() : showOSA();

        //(25.03.26) обновляем информацию по открытому фильтру
        //  var menu = getDashFilterMenu();
        //  var cells = menu.getChildViews();
        //  
        //  for (var i = 0; i < cells.length; i++)
        //    if (!cells[i].config.collapsed) {
        //      getDashFilterData(cells[i]);
        //  
        //      break;
        //    }

        if (magic == '')
          return;

        if (magic != 'SKU') {
          isAnimate = true;

          if (isCompare == 0) {
            showOSACategory();
            showOSAArt();
          }
        }
      }

      else if (dashWindow == 'BA_OOS') {
        showChartMain('OOS', tempTableBA_OOS);

        if (isCompare == 0)
          ($$('dashContainerQuant' + dashWindow).isVisible()) ? showOOSService() : showOOS();

        //(25.03.26) обновляем информацию по открытому фильтру
        //  var menu = getDashFilterMenu();
        //  var cells = menu.getChildViews();
        //  
        //  for (var i = 0; i < cells.length; i++)
        //    if (!cells[i].config.collapsed) {
        //      getDashFilterData(cells[i]);
        //  
        //      break;
        //    }

        if (magic == '')
          return;

        if (magic != 'SKU') {
          isAnimate = true;

          if (isCompare == 0) {
            showOOSCategory();
            showOOSArt();
          }
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    },
    complete: function () {
      isTrandCalc = true;

      $$(dashWindow).hideProgress();
    }
  });
}

function getTempTable() {
  if (dashWindow == 'BA_Distipline2') return tempTableBA_Distipline2;
  if (dashWindow == 'BA_OSA') return tempTableBA_OSA;
  if (dashWindow == 'BA_OOS') return tempTableBA_OOS;
}

function getRightSpace() {
  if (dashWindow == 'BA_Distipline2') return rightSpaceBA_Distipline2;
  if (dashWindow == 'BA_OSA') return rightSpaceBA_OSA;
  if (dashWindow == 'BA_OOS') return rightSpaceBA_OOS;
}

function getDashPercent() {
  if (dashWindow == 'BA_Distipline2') return dashPercentBA_Distipline2;
  if (dashWindow == 'BA_OSA') return dashPercentBA_OSA;
  if (dashWindow == 'BA_OOS') return dashPercentBA_OOS;
}

function getDashPlan() {
  if (dashWindow == 'BA_Distipline2') return dashPlanBA_Distipline2;
  if (dashWindow == 'BA_OSA') return dashPlanBA_OSA;
  if (dashWindow == 'BA_OOS') return dashPlanBA_OOS;
}

function getCheckCompare() {
  if (dashWindow == 'BA_Distipline2') return checkIsCompareBA_Distipline2;
  if (dashWindow == 'BA_OSA') return checkIsCompareBA_OSA;
  if (dashWindow == 'BA_OOS') return checkIsCompareBA_OOS;
}

function getDashFilterMenu() {
  if (dashWindow == 'BA_Distipline2') return dashFilterMenuBA_Distipline2;
  if (dashWindow == 'BA_OSA') return dashFilterMenuBA_OSA;
  if (dashWindow == 'BA_OOS') return dashFilterMenuBA_OOS;
}

function filterSaveCheck(table, text, isCalc = null) {
  if (isCalc == null)
    isCalc = true;

  if (text == '' || text == null) {
    text = '';

    for (var _id in table.data.pull) {
      var item = table.getItem(_id);

      if (item.status == 1)
        text = text + item.ArtID + '|';
    }
  }

  if (text == '') return;

  $.ajax({
    url: '../../Services/BI.asmx/SetTempArt',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Window': dashWindow, 'Text': text }),
    success: function (data) {
      if (isCalc) {
        var table = getTempTable();

        getDashData(table, (text == 'all') ? 'Компании' : 'SKU', 0, 0, 0);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    }
  });
}

function getFilterHTML(obj) {
  var classDiv = (isAnimate) ? 'progress-container' : 'progress-container-no-animate';

  classDiv = (obj.status == 1) ? classDiv + '-check' : classDiv;

  var html = "<div class='progress-main-container'>";
  html += "<div class='" + classDiv + "' style='width:" + ((obj.Result == 0) ? 0 : (obj.Result - 1)) + "%'>";
  html += " <div class='progress-text'>" + obj.Name + "</div>";
  html += " <div class='progress-text'><b>" + obj.Result + "%</b></div>";
  html += "</div>";
  html += "<div class='progress-popular-container' style='width: " + ((obj.CCount == 0) ? 0 : (obj.CCount - 1)) + "%'>" + obj.CCount + "%</div>";
  html += "</div>";

  return html;
}

function filterFind(value, list) {
  if ((value == '') || (value.length < 1)) {
    if (value == '') list.filter('');

    for (var _id in list.data.pull) {
      var item = list.getItem(_id);

      item.status = 1;
      list.updateItem(item.id, item);
    }

    return;
  }

  // сначала отключаем выбор
  for (var _id in list.data.pull) {
    var item = list.getItem(_id);

    item.status = 0;
    list.updateItem(item.id, item);
  }

  var search = value.split(' ');

  list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[0]) != -1)) });
  if (search[1] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[1]) != -1)) }, null, true);
  if (search[2] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[2]) != -1)) }, null, true);
  if (search[3] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[3]) != -1)) }, null, true);
  if (search[4] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[4]) != -1)) }, null, true);
  if (search[5] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[5]) != -1)) }, null, true);
  if (search[6] != null)
    list.filter(function (obj) { return ((obj.Name.toString().toUpperCase().indexOf(search[6]) != -1)) }, null, true);

  list.data.each(function (obj) {
    obj.status = 1;
    this.updateItem(obj.id, obj);
  });
}