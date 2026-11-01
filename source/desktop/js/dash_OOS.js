// ------- Дашборды OOS
var sortField = 'CCount';
var sortOrder = 'desc';
var tempTableBA_OOS, rightSpaceBA_OOS, dashPercentBA_OOS, dashPlanBA_OOS, dashFilterMenuBA_OOS, checkIsCompareBA_OOS;

function getBA_OOS(menuID, report, procName, reportName) {
  var win_id = report + '|' + menuID;
  win_id_dash = win_id;

  if (isStart)
    setStartDate(win_id, reportName);

  isStart = false;
  isTrandCalc = true;

  dashWindow = report;

  tempTableBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[2];
  rightSpaceBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[3];
  dashPercentBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[0].getChildViews()[0];
  dashPlanBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[1].getChildViews()[0];
  dashFilterMenuBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[1];
  checkIsCompareBA_OOS = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[0].getChildViews()[2];

  webix.extend($$(dashWindow), webix.ProgressBar);
  webix.extend(dashFilterMenuBA_OOS, webix.ProgressBar);

  isDashFix = 0;
  $$('searchDashSKUOOS').define('value', '');
  $$('searchDashSKUOOS').refresh();
  $$('searchDashSKUOOS').enable();  

  getDashReport('Компании', true, true);

  $('#dashMain' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();   
}

var BA_OOS = {
  id: 'BA_OOS', type: "wide",
  rows: [
    {
      cols: [       
        {},
        dashPeriod2
      ]
    },
    {
      rows: [
        {
          type: "wide",
          cols: [
            {
              type: "wide", id: "rowLeftBA_OOS",
              // левая сторона
              minWidth: 40, width: 300,
              rows: [
                dashTotal,
                dashFilter,
                dashTemp,
                rightSpace
              ]
            },
            { view: "resizer" },
            // правая сторона
            {
              type: "wide", id: 'areaTotalBA_OOS', // вкладка TOTAL
              cols: [
                {
                  gravity: 2.6,
                  cols: [
                    {
                      id: 'areaDashBA_OOS',
                      rows: [
                        { view: "template", id: "dashContainerBA_OOS", content: "dashMainBA_OOS", },
                        { view: "resizer" },
                        {
                          gravity: 2.6,
                          cols: [
                            { view: "template", id: "dashContainerQuantBA_OOS", content: "dashMainQuantBA_OOS" },
                            { view: "template", id: "dashContainerOOS_BA_OOS", content: "dashOOS_BA_OOS", hidden: true },
                          ]
                        }                        
                      ]
                    },
                    {
                      id: 'areaDetailBA_OOS',
                      rows: [
                        {
                          cols: [
                            { template: "Детализация OOS в ТТ", type: "header", borderless: true },
                            {},
                            {
                              view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
                              click: function () {
                                webix.toExcel($$('tableDetailBA_OOS'), { filterHTML: true, footer: false });
                              }
                            },
                            { width: 10, css: "headerLine" },
                            {
                              view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно детализации", width: 50,
                              click:
                                function () {
                                  $$('areaDetail' + dashWindow).hide();
                                  $$('areaDash' + dashWindow).show();
                                }
                            }
                          ]
                        },
                        {
                          view: "datatable", id: "tableDetailBA_OOS", select: true, resizeColumn: true, dragColumn: true, rowLineHeight: 24, rowHeight: 24,  
                          headermenu: { autowidth: true, scroll: true, autoheight: false, height: 360 },
                          scheme: {
                            $change: function (item) {
                              if (item.IsVisit == 0 && item.IsRoute == 1)
                                item.$css = "dash-no-visit";
                            }
                          },
                          columns: [
                            { id: "BornedText", header: ["Дата", { content: "textFilter" }], width: 72, minWidth: 72, sort: "string", css: { 'text-align': 'center' } },
                            { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 50, minWidth: 40, sort: "string" },
                            { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 70, minWidth: 60, sort: "string" },                            
                            { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },                            
                            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 140, sort: "string" },
                            { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 180, minWidth: 80, sort: "string" },
                            { id: "CauseName", header: ["Причина", { content: "excelFilter", mode: "text" }], fillspace: true, minWidth: 90, sort: "string" },
                            { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 70, minWidth: 80, sort: "string" },
                            { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 70, sort: "string" },
                            { id: "CategoryName", header: ["Категория", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
                            { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
                            { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
                            { id: "EAN", header: ["Штрих-код", { content: "textFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },
                            { id: "MasterName", header: ["Руководитель", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 80, sort: "string" },                            
                            { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 90, sort: "string" }
                          ],
                          on: {
                            onItemClick: function (id, e) {
                              var item = this.getItem(id);
                              if (item == null)
                                return;

                              e.stopPropagation();

                              VisitPointID = item.PointID;
                              VisitUserID = item.UserID;
                              VisitBorned = item.BornedText;
                              VisitGUID = item.GUID;

                              var itemWindow = $$('menuUtility').getItem(60);
                              if (itemWindow != null)
                                showReport(itemWindow);

                              e.stopPropagation();
                              return false;

                            }
                          }
                        }
                      ]
                    }                   
                  ]
                },
                { view: "resizer" },
                {
                  id: 'dashAreasSKU',
                  rows: [
                    { view: "template", id: "dashContainerCategoryBA_OOS", content: "dashCategoryBA_OOS" },
                    { view: "resizer" },
                    {
                      gravity: 2.6,
                      rows: [
                        {

                          cols: [
                            {
                              view: "icon", id: "dashFix", icon: "fa fa-thumbtack", tooltip: "Зафиксировать выбранные SKU", css: "fontawesome_check",
                              on: {
                                onItemClick: function () {
                                  isDashFix = (isDashFix == 1) ? 0 : 1;

                                  var table = $$('tableFilterArtOOS');

                                  if (isDashFix == 1) {
                                    table.filter(function (obj) {
                                      return obj.status == 1;
                                    });

                                    $$('searchDashSKUOOS').define('value', 'Зафиксировано ' + table.count() + ' SKU');
                                    $$('searchDashSKUOOS').refresh();
                                    $$('searchDashSKUOOS').disable();

                                    this.define('tooltip', 'Снять фиксацию SKU');
                                    this.refresh();

                                    filterSaveCheck(table, '', true);
                                  }
                                  else {
                                    table.filter(function (obj) {
                                      return obj.status == obj.status;
                                    });

                                    $$('searchDashSKUOOS').define('value', '');
                                    $$('searchDashSKUOOS').refresh();
                                    $$('searchDashSKUOOS').enable();

                                    this.define('tooltip', 'Зафиксировать выбранные SKU');
                                    this.refresh();

                                    filterSaveCheck(table, 'all');
                                  }                                  
                                }
                              }
                            },
                            {
                              view: "search", id: "searchDashSKUOOS", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", type: "clean", clear: true,
                              on: {
                                onTimedKeyPress: function () {
                                  var value = this.getValue().toUpperCase();

                                  filterFind(value, $$('tableFilterArtOOS'));
                                }
                              }
                            },
                            {
                              view: "icon", id: "filterSortIcon", icon: "fas fa-arrow-down", tooltip: "Отсортировать по возрастанию по кол-ву визитов",
                              on: {
                                onItemClick: function () {
                                  if (sortField == 'CCount' && sortOrder == 'desc') {
                                    sortField = 'CCount'; sortOrder = 'asc';
                                    filterSort(this, 'tableFilterArtOOS', sortField, sortOrder, 'Result');
                                    return;
                                  }

                                  if (sortField == 'CCount' && sortOrder == 'asc') {
                                    sortField = 'Result'; sortOrder = 'desc'
                                    filterSort(this, 'tableFilterArtOOS', sortField, sortOrder, 'Result');
                                    return;
                                  }

                                  
                                  if (sortField == 'Result' && sortOrder == 'desc') {
                                    sortField = 'Result'; sortOrder = 'asc';
                                    filterSort(this, 'tableFilterArtOOS', sortField, sortOrder, 'CCount');
                                    return;
                                  }

                                  if (sortField == 'Result' && sortOrder == 'asc') {
                                    sortField = 'CCount'; sortOrder = 'desc';
                                    filterSort(this, 'tableFilterArtOOS', sortField, sortOrder, 'CCount');
                                    return;
                                  }
                                }
                              }
                            },
                          ]
                        },
                        {
                          view: "datatable", id: 'tableFilterArtOOS', select: true, multiselect: true, resizeColumn: false, fixedRowHeight: false, rowLineHeight: 42, rowHeight: 42, tooltip: true, header: false,
                          columns: [
                            {
                              id: "Result", header: [], sort: "int", fillspace: true, tooltip: "#Name# - #Result#% в #CCount#% визитах",
                              template: function (obj) {
                                return getFilterHTML(obj);
                              }
                            }
                          ],
                          on: {
                            onSelectChange: function (ids) {
                              if (isAnimate)
                                return;

                              this.eachRow(
                                function (row) {
                                  var itemShow = this.getItem(row);

                                  itemShow.status = $$('tableFilterArtOOS').isSelected(itemShow.id) ? 1 : 0;
                                  this.updateItem(itemShow.id, itemShow);
                                });

                              filterSaveCheck(this);
                            }
                          }
                        }
                      ]
                    }                    
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

// график для показа фрагментации уровня сервиса
var chart_serviceOOS = {
  chart: {
    type: 'column',
    renderTo: 'dashMainQuantBA_OOS', marginLeft: 0, marginRight: 0,    
  },
  tooltip: {
    enabled: true
  },
  title: {
    text: '<span>Уровни OOS</span><span style="width: 20px;display: inline-block;"></span><span style="color: blue; text-decoration: underline; cursor: pointer;">Причины OOS</span>',
    useHTML: true
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
      ': <b>{point.y} виз.</b> ({point.percentage:.0f}%)<br/>',
    shared: true
  },
  plotOptions: {
    column: {
      stacking: 'percent',
      dataLabels: {
        enabled: true,
        format: '{point.percentage:.0f}'
      }
    },
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            getDashDetailOOS(this.start, this.finish);           
          }
        }
      }
    }
  },
  series: [
    {
      name: '<5%', color: '#b1c8fb'/*'#68b662'*/, borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '5-10%', color: '#97adde', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '10-20%', color: '#6379a7', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '20-30%', color: '#1d3158', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '>30%', color: 'red'/*'#324873'*/, borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    }
  ],
  exporting: {
    buttons: {
      contextButton: {
        text: 'Экспорт'
      }
    },
    pdfFont: {
      normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
      bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
      bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
      italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
    }
  }  
}
function showOOSService() {
  var table = tempTableBA_OOS;

  $$('dashContainerQuant' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();

  $$('dashContainerOOS_' + dashWindow).hide();
  $('#dashOOS_' + dashWindow).hide();


  table.sort([{ by: "Start", dir: "asc" }]);

  table.filter(function (obj) {
    return obj.Magic.indexOf('SERVICE') != -1;
  });

  var chart = new Highcharts.Chart(chart_serviceOOS,
    function (chart) {
      chart.title.on('click', function () {
        showOOS();
      })
    });

  chart.render();

  var categories = [];

  var item = table.getItem(table.getFirstId());

  var oos_30 = [];
  var oos_20_30 = [];
  var oos_10_20 = [];
  var oos_5_10 = [];
  var oos_5 = [];

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (obj.SeriesName == '>30%')
      oos_30.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '20-30%')
      oos_20_30.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '10-20%')
      oos_10_20.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '5-10%')
      oos_5_10.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '<5%')
      oos_5.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });
  });

  chart.series[0].update({ data: oos_5 });
  chart.series[1].update({ data: oos_5_10 });
  chart.series[2].update({ data: oos_10_20 });
  chart.series[3].update({ data: oos_20_30});
  chart.series[4].update({ data: oos_30 });
    
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerQuantBA_OOS").$height + 10);  
}

// график для показа фрагментации причин OOS
var chart_OOS = {
  chart: {
    type: 'column',
    renderTo: 'dashOOS_BA_OOS', marginLeft: 0, marginRight: 0,
  },
  tooltip: {
    enabled: true
  },
  title: {
    text: '<span style="color: blue; text-decoration: underline; cursor: pointer;">Уровни OOS</span><span style="width: 20px;display: inline-block;"></span><span>Причины OOS</span>',
    useHTML: true
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
      ': <b>{point.y} виз.</b> ({point.percentage:.0f}%)<br/>',
    shared: true
  },
  plotOptions: {
    column: {
      stacking: 'percent',
      dataLabels: {
        enabled: true,
        format: '{point.percentage:.0f}'
      }
    },
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            getDashDetailOOS(this.start, this.finish);
          }
        }
      }
    }
  },
  series: [],
  exporting: {
    buttons: {
      contextButton: {
        text: 'Экспорт'
      }
    },
    pdfFont: {
      normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
      bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
      bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
      italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
    }
  }
}
function showOOS() {
  var table = tempTableBA_OOS;

  $$('dashContainerQuant' + dashWindow).hide();
  $('#dashMainQuant' + dashWindow).hide();

  $$('dashContainerOOS_' + dashWindow).show();
  $('#dashOOS_' + dashWindow).show();

  //var chart = Highcharts.chart('dashOOS_' + dashWindow, chart_OOS);

  var chart = new Highcharts.Chart(chart_OOS,
    function (chart) {
      chart.title.on('click', function () {
        showOOSService();
      })
    });

  // удаляем старые серии
  while (chart.series.length) {
    chart.series[0].remove();
  }

  chart.render();

  table.filter(function (obj) {
    return obj.Magic.indexOf('CAUSE') != -1;
  });

  if (table.count() == 0)
    return;

  table.sort([{ by: "SeriesName", dir: "asc", as: "string" }, { by: "Start", dir: "asc" }]);

  var categories = [];
  var series = [];
  var values = [];

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (series.indexOf(obj.SeriesName.toString()) == -1) {
      series.push(obj.SeriesName.toString());

      chart.addSeries({
        name: obj.SeriesName,//obj.LegendName,        
        borderWidth: 0,
        lineWidth: 2,
        dataLabels: {
          enabled: true,
          format: '{y}',
        },
        data: values
      });
    }

    //lastName = obj.SeriesName.toString();
  });

  chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerOOS_BA_OOS").$height + 10);

  for (var i = 0; i < chart.series.length; i++) {
    var series = chart.series[i].name;

    values = [];

    table.data.each(function (obj) {
      if (obj.SeriesName.toString() == series)
        values.push({
          y: obj.Result,
          start: obj.StartText,
          finish: obj.FinishText
        });
    });

    chart.series[i].update({ data: values });
  }

  chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });  
}

// общий график показа процентных показателей
var chart_main_BA_OOS = {
  chart: {
    type: 'line', renderTo: 'dashMainBA_OOS', marginLeft: 0, marginRight: 0,
  },
  tooltip: {
    enabled: true
  },
  legend: { enabled: false },
  title: {
    visible: false, text: ''
  },
  xAxis: {
    lineColor: '#8F969A', lineWidth: 1, gridLineWidth: 1,
    labels: {
      style: {
        "color": "#8F969A",
        "font-size": "12px",
        "font-family": "Roboto"
      }
    }
  },
  yAxis: {
    lineColor: '#8F969A', lineWidth: 1, gridLineWidth: 1,
    title: {
      text: null
    },
    crosshair: true
  },
  credits: true,
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {  
            getDashDetailOOS(this.start, this.finish); 
          }
        }
      }
    }
  },
  tooltip: {
    formatter: function () {
      return 'OOS за ' + this.x + ' - <b>' + this.y + '%</b>';
    }
  },
  series: [
    {
      name: '% OOS', color: '#4E82BC', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}%',
      }
    }
  ],
  exporting: {
    buttons: {
      contextButton: {
        text: 'Экспорт'
      }
    },
    pdfFont: {
      normal: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Regular.ttf',
      bold: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Bold.ttf',
      bolditalic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-BoldItalic.ttf',
      italic: 'https://www.highcharts.com/samples/data/fonts/NotoSans-Italic.ttf'
    }
  }
}

var chartCategoryOOS = {
  chart: {
    renderTo: 'dashCategoryBA_OOS', type: 'bar', /*marginLeft: 0, */marginRight: 0, marginBottom: 0
  },
  title: {
    enabled: false, text: ''
  },
  xAxis: {
    categories: [],
    /*labels: {
      enabled: false
    },*/

    title: {
     text: null
    },
    gridLineWidth: 1,
    lineWidth: 0
    
  },
  yAxis: {
    min: 0,   
    labels: {
      overflow: 'justify'
    },
    gridLineWidth: 0


  },

  legend: {
    enabled: false
  },  
  plotOptions: {    
    series: {
      type: 'bar',
      dataLabels: {
        enabled: true,        
        format: '{y}%',
      },
      cursor: 'pointer',
      point: {
        events: {
          click: function () {
            if (isDashFix == 1) {
              webix.confirm({
                title: "Отмена", ok: "Да", cancel: "Нет", type: "confirm", text: 'Включена фиксация по SKU, полный список SKU недоступен. <br/><br/>Выключить фиксацию по SKU?',
                callback: function (result) {
                  if (result) {
                    isDashFix = 0;
                    $$('searchDashSKUOOS').define('value', '');
                    $$('searchDashSKUOOS').refresh();
                    $$('searchDashSKUOOS').enable();

                    $$('dashFix').define('tooltip', 'Зафиксировать выбранные SKU');
                    $$('dashFix').refresh();

                    filterSaveCheck(table, 'all');
                  }
                  else
                    return;
                }
              });

              return;
            }

            var categoryID = this.CategoryID;
            var table = $$('tableFilterArtOOS');
            
            table.filter(function (obj) {
              return (categoryID == -1) ? obj.CategoryID == obj.CategoryID : obj.CategoryID == categoryID;
            });

            // устанавливаем выбор
            for (var _id in table.data.pull) {
              var item = table.getItem(_id);

              item.status = (item.CategoryID == categoryID || categoryID == -1) ? 1 : 0;
              table.updateItem(item.id, item);                              
            }                
            
            filterSaveCheck(table);
          }
        }
      }
    }
  }, 
  
  tooltip: {
    //enabled: false
    formatter: function () {
      return this.x + ': <b>' + this.y + '%</b>';
    }
  },
  credits: {
    enabled: false
  },
  series: [{
    /*type: 'bar',*/ name: 'OOS', color: '#4E82BC', data: [],
   // stacking: 'normal'
  }],
  exporting: { enabled: false }
}
function showOOSCategory() {
  var table = tempTableBA_OOS;

  table.filter(function (obj) {
    return (obj.Magic.indexOf('CATEGORY') != -1 || obj.Magic.indexOf('TOTAL') != -1);
  });

  table.sort([{ by: "Magic", dir: "desc" }, { by: "Result", dir: "desc", as: "int" }]);

  if (table.count() == 0)
    return;

  var categories = [];
  var values = []; 

  $$('dashContainerCategory' + dashWindow).show();
  $('#dashCategory' + dashWindow).show();

  var chart = Highcharts.chart('dashCategory' + dashWindow, chartCategoryOOS);
  chart.setSize(null, $$("dashContainerCategoryBA_OOS").$height + 10);

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    values.push({ y: obj.Result, Name: obj.PeriodName, CategoryID: obj.ID });

  });

  chart.series[0].update({ data: values });

  chart.xAxis[0].update({ categories: categories });
  chart.yAxis[0].update({
    stackLabels: {
      style: {
        color: 'white'
      },
      enabled: true,
      verticalAlign: 'middle',
      align: 'left',
      formatter: function () {
        return categories[this.x];
      }
    },
    labels: {
      enabled: false
    },
  });  
}
function showOOSArt() {
  var table = tempTableBA_OOS;

  sortField = 'CCount';
  sortOrder = 'desc';

  $$('filterSortIcon').define('tooltip', 'Отсортировать по возрастанию по кол-ву визитов');
  $$('filterSortIcon').refresh();

  table.filter(function (obj) {
    return obj.Magic.indexOf('SKU') != -1;
  });

  table.sort([{ by: "CCount", dir: "desc", as: "int" }, { by: "Result", dir: "desc", as: "int" }]);

  $$('tableFilterArtOOS').clearAll();

  if (table.count() == 0)
    return;  

  table.data.each(function (obj) {
    $$('tableFilterArtOOS').add({ status: 1, Name: obj.PeriodName, Result: obj.Result, ResultValue: obj.ResultValue, ArtID: obj.ID, CategoryID: obj.MasterID, CCount: obj.CCount });
  });

  $$('tableFilterArtOOS').sort([{ by: "CCount", dir: "desc", as: "int" }, { by: "Result", dir: "desc", as: "int" }]);

  isAnimate = false;
  
}

// загрузка детализации по графику Маршруты
function getDashDetailOOS(start, finish) {

  showProgress(dashWindow);

  $.ajax({
    url: '../../Services/BI.asmx/BA_OOSDetail',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish, 'Period': dashPeriod, 'Magic': dashMagic, 'IsCalc': isTrandCalc }),
    success: function (data) {
      $$('areaDash' + dashWindow).hide();
      $$('areaDetail' + dashWindow).show();

      $$('tableDetail' + dashWindow).clearAll();
      $$('tableDetail' + dashWindow).parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    },
    complete: function () {
      $$(dashWindow).hideProgress();
    }
  });
}

// ---------------- фильтры по SKU
function filterSelectAll(elem, table) {
  var check = 0;

  if (elem.config.icon == 'far fa-check-square') {
    check = 1;
    elem.define('icon', 'far fa-square');
    elem.define('tooltip', 'Отключить все');
    elem.refresh();
  }
  else {
    check = 0;
    elem.define('icon', 'far fa-check-square');
    elem.define('tooltip', 'Выбрать все');
    elem.refresh();
  }

  table.data.each(function (obj) {
    obj.status = check;
    table.updateItem(obj.id, obj);
  });

  table.refresh();

  //setFilter(list, setProcName, false);
}

function filterSort(elem, table, field, sort, nextField) {
  if (sort == 'asc') {
    elem.define('icon', 'fas fa-arrow-up');
    elem.define('tooltip', 'Отсортировать по убыванию' + ((nextField == 'Result') ? ' по OOS' : ' по кол-ву визитов'));
    elem.refresh();
  }
  else {

    elem.define('icon', 'fas fa-arrow-down');
    elem.define('tooltip', 'Отсортировать по возрастанию' + ((nextField == 'Result') ? ' по OOS' : ' по кол-ву визитов'));
    elem.refresh();
  }

  var table = $$('tableFilterArtOOS');
  table.sort([{ by: field, dir: sort, as: "int" }]);

  table.refresh();
}





