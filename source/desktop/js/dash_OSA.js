// ------- Дашборды OSA
var sortField = 'CCount';
var sortOrder = 'desc';
var tempTableBA_OSA, rightSpaceBA_OSA, dashPercentBA_OSA, dashPlanBA_OSA, dashFilterMenuBA_OSA, checkIsCompareBA_OSA;

function getBA_OSA(menuID, report, procName, reportName) {
  var win_id = report + '|' + menuID;
  win_id_dash = win_id;

  if (isStart)
    setStartDate(win_id, reportName);

  isStart = false;
  isTrandCalc = true;

  dashWindow = report;

  tempTableBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[2];
  rightSpaceBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[3];
  dashPercentBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[0].getChildViews()[0];
  dashPlanBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[1].getChildViews()[0];
  dashFilterMenuBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[1];
  checkIsCompareBA_OSA = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[0].getChildViews()[2];

  webix.extend($$(dashWindow), webix.ProgressBar);
  webix.extend(dashFilterMenuBA_OSA, webix.ProgressBar);

  isDashFix = 0;
  $$('searchDashSKU').define('value', '');
  $$('searchDashSKU').refresh();
  $$('searchDashSKU').enable();  

  getDashReport('Компании', true, true);

  $('#dashMain' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();   
}

var BA_OSA = {
  id: 'BA_OSA', type: "wide",
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
              type: "wide", id: "rowLeftBA_OSA",
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
              type: "wide", id: 'areaTotalBA_OSA', // вкладка TOTAL
              cols: [
                {
                  gravity: 2.6,
                  cols: [
                    {
                      id: 'areaDashBA_OSA',
                      rows: [
                        { view: "template", id: "dashContainerBA_OSA", content: "dashMainBA_OSA", },
                        { view: "resizer" },
                        {
                          gravity: 2.6,
                          cols: [
                            { view: "template", id: "dashContainerQuantBA_OSA", content: "dashMainQuantBA_OSA" },
                            { view: "template", id: "dashContainerOSA_BA_OSA", content: "dashOSA_BA_OSA", hidden: true },
                          ]
                        }                        
                      ]
                    },
                    {
                      id: 'areaDetailBA_OSA',
                      rows: [
                        {
                          cols: [
                            { template: "Детализация OSA в ТТ", type: "header", borderless: true },
                            {},
                            {
                              view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
                              click: function () {
                                webix.toExcel($$('tableDetailBA_OSA'), { filterHTML: true, footer: false });
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
                          view: "datatable", id: "tableDetailBA_OSA", select: true, resizeColumn: true, dragColumn: true, rowLineHeight: 24, rowHeight: 24,  
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
                            { id: "FormatName", header: ["Формат", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 60, sort: "string" },                            
                            { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 140, sort: "string" },
                            { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 180, minWidth: 80, sort: "string" },
                            { id: "IsStock", header: ["В наличии", { content: "excelFilter", mode: "text" }], width: 75, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
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
                    { view: "template", id: "dashContainerCategoryBA_OSA", content: "dashCategoryBA_OSA" },
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

                                  var table = $$('tableFilterArt');

                                  if (isDashFix == 1) {
                                    table.filter(function (obj) {
                                      return obj.status == 1;
                                    });

                                    $$('searchDashSKU').define('value', 'Зафиксировано ' + table.count() + ' SKU');
                                    $$('searchDashSKU').refresh();
                                    $$('searchDashSKU').disable();

                                    this.define('tooltip', 'Снять фиксацию SKU');
                                    this.refresh();

                                    filterSaveCheck(table, '', true);
                                  }
                                  else {
                                    table.filter(function (obj) {
                                      return obj.status == obj.status;
                                    });

                                    $$('searchDashSKU').define('value', '');
                                    $$('searchDashSKU').refresh();
                                    $$('searchDashSKU').enable();

                                    this.define('tooltip', 'Зафиксировать выбранные SKU');
                                    this.refresh();

                                    filterSaveCheck(table, 'all');
                                  }                                  
                                }
                              }
                            },
                            {
                              view: "search", id: "searchDashSKU", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", type: "clean", clear: true,
                              on: {
                                onTimedKeyPress: function () {
                                  var value = this.getValue().toUpperCase();

                                  filterFind(value, $$('tableFilterArt'));
                                }
                              }
                            },
                            {
                              view: "icon", id: "filterSortIcon", icon: "fas fa-arrow-down", tooltip: "Отсортировать по возрастанию по кол-ву визитов",
                              on: {
                                onItemClick: function () {
                                  if (sortField == 'CCount' && sortOrder == 'desc') {
                                    sortField = 'CCount'; sortOrder = 'asc';
                                    filterSort(this, 'tableFilterArt', sortField, sortOrder, 'Result');
                                    return;
                                  }

                                  if (sortField == 'CCount' && sortOrder == 'asc') {
                                    sortField = 'Result'; sortOrder = 'desc'
                                    filterSort(this, 'tableFilterArt', sortField, sortOrder, 'Result');
                                    return;
                                  }

                                  
                                  if (sortField == 'Result' && sortOrder == 'desc') {
                                    sortField = 'Result'; sortOrder = 'asc';
                                    filterSort(this, 'tableFilterArt', sortField, sortOrder, 'CCount');
                                    return;
                                  }

                                  if (sortField == 'Result' && sortOrder == 'asc') {
                                    sortField = 'CCount'; sortOrder = 'desc';
                                    filterSort(this, 'tableFilterArt', sortField, sortOrder, 'CCount');
                                    return;
                                  }
                                }
                              }
                            },
                          ]
                        },
                        {
                          view: "datatable", id: 'tableFilterArt', select: true, multiselect: true, resizeColumn: false, fixedRowHeight: false, rowLineHeight: 42, rowHeight: 42, tooltip: true, header: false,
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

                                  itemShow.status = $$('tableFilterArt').isSelected(itemShow.id) ? 1 : 0;
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
var chart_serviceOSA = {
  chart: {
    type: 'column',
    renderTo: 'dashMainQuantBA_OSA', marginLeft: 0, marginRight: 0,    
  },
  tooltip: {
    enabled: true
  },
  title: {
    text: '<span>Уровни OSA</span><span style="width: 20px;display: inline-block;"></span><span style="color: blue; text-decoration: underline; cursor: pointer;">Причины OOS</span>',
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
            getDashDetailOSA(this.start, this.finish);           
          }
        }
      }
    }
  },
  series: [
    {
      name: '>95%', color: '#b1c8fb'/*'#68b662'*/, borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '90-95%', color: '#97adde', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '80-90%', color: '#6379a7', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '70-80%', color: '#1d3158', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: '<70%', color: 'red'/*'#324873'*/, borderWidth: 0, lineWidth: 2,
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
function showOSAService() {
  var table = tempTableBA_OSA;

  $$('dashContainerQuant' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();

  $$('dashContainerOSA_' + dashWindow).hide();
  $('#dashOSA_' + dashWindow).hide();


  table.sort([{ by: "Start", dir: "asc" }]);

  table.filter(function (obj) {
    return obj.Magic.indexOf('SERVICE') != -1;
  });

  var chart = new Highcharts.Chart(chart_serviceOSA,
    function (chart) {
      chart.title.on('click', function () {
        showOSA();
      })
    });

  chart.render();

  var categories = [];

  var item = table.getItem(table.getFirstId());

  var osa_70 = [];
  var osa_70_80 = [];
  var osa_80_90 = [];
  var osa_90_95 = [];
  var osa_95 = [];

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (obj.SeriesName == '<70%')
      osa_70.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '70-80%')
      osa_70_80.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '80-90%')
      osa_80_90.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '90-95%')
      osa_90_95.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == '>95%')
      osa_95.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });
  });

  chart.series[0].update({ data: osa_95 });
  chart.series[1].update({ data: osa_90_95 });
  chart.series[2].update({ data: osa_80_90 });
  chart.series[3].update({ data: osa_70_80 });
  chart.series[4].update({ data: osa_70 });
    
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerQuantBA_OSA").$height + 10);  
}

// график для показа фрагментации причин OSA
var chart_OSA = {
  chart: {
    type: 'column',
    renderTo: 'dashOSA_BA_OSA', marginLeft: 0, marginRight: 0,
  },
  tooltip: {
    enabled: true
  },
  title: {
    text: '<span style="color: blue; text-decoration: underline; cursor: pointer;">Уровни OSA</span><span style="width: 20px;display: inline-block;"></span><span>Причины OOS</span>',
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
            getDashDetailOSA(this.start, this.finish);
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
function showOSA() {
  var table = tempTableBA_OSA;

  $$('dashContainerQuant' + dashWindow).hide();
  $('#dashMainQuant' + dashWindow).hide();

  $$('dashContainerOSA_' + dashWindow).show();
  $('#dashOSA_' + dashWindow).show(); 

  var chart = new Highcharts.Chart(chart_OSA,
    function (chart) {
      chart.title.on('click', function () {
        showOSAService();
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

  chart.setSize(null, $$("dashContainerOSA_BA_OSA").$height + 10);

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
var chart_main_BA_OSA = {
  chart: {
    type: 'line', renderTo: 'dashMainBA_OSA', marginLeft: 0, marginRight: 0,
  },
  tooltip: {
    enabled: true
  },
  legend: { enabled: false },
  title: {
    visible: false, text: ''//text: 'OSA'
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
            getDashDetailOSA(this.start, this.finish); 
          }
        }
      }
    }
  },
  tooltip: {
    formatter: function () {
      return 'OSA за ' + this.x + ' - <b>' + this.y + '%</b>';
    }
  },
  series: [
    {
      name: '% OSA', color: '#4E82BC', borderWidth: 0, lineWidth: 2,
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

var chartCategoryOSA = {
  chart: {
    renderTo: 'dashCategoryBA_OSA', type: 'bar', /*marginLeft: 0, */marginRight: 0, marginBottom: 0
  },
  title: {
    enabled: false, text: ''
  },
  xAxis: {
    categories: [],   
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
                    $$('searchDashSKU').define('value', '');
                    $$('searchDashSKU').refresh();
                    $$('searchDashSKU').enable();

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
            var table = $$('tableFilterArt');

            

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
    name: 'OSA', color: '#4E82BC', data: [],
   // stacking: 'normal'
  }],
  exporting: { enabled: false }
}
function showOSACategory() {
  var table = tempTableBA_OSA;

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

  var chart = Highcharts.chart('dashCategory' + dashWindow, chartCategoryOSA);
  chart.setSize(null, $$("dashContainerCategoryBA_OSA").$height + 10);

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
function showOSAArt() {
  var table = tempTableBA_OSA;

  sortField = 'CCount';
  sortOrder = 'desc';

  $$('filterSortIcon').define('tooltip', 'Отсортировать по возрастанию по кол-ву визитов');
  $$('filterSortIcon').refresh();

  table.filter(function (obj) {
    return obj.Magic.indexOf('SKU') != -1;
  });

  table.sort([{ by: "CCount", dir: "desc", as: "int" }, { by: "Result", dir: "desc", as: "int" }]);

  $$('tableFilterArt').clearAll();

  if (table.count() == 0)
    return;  

  table.data.each(function (obj) {
    $$('tableFilterArt').add({ status: 1, Name: obj.PeriodName, Result: obj.Result, ResultValue: obj.ResultValue, ArtID: obj.ID, CategoryID: obj.MasterID, CCount: obj.CCount });
  });

  $$('tableFilterArt').sort([{ by: "CCount", dir: "desc", as: "int" }, { by: "Result", dir: "desc", as: "int" }]);

  isAnimate = false;
  
}

// загрузка детализации по графику Маршруты
function getDashDetailOSA(start, finish) {
  showProgress(dashWindow);

  $.ajax({
    url: '../../Services/BI.asmx/BA_OSADetail',
    data: JSON.stringify({
      'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish, 'Period': dashPeriod, 'Magic': dashMagic, 'IsCalc': isTrandCalc }),
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
    elem.define('tooltip', 'Отсортировать по убыванию' + ((nextField == 'Result') ? ' по OSA' : ' по кол-ву визитов'));
    elem.refresh();
  }
  else {

    elem.define('icon', 'fas fa-arrow-down');
    elem.define('tooltip', 'Отсортировать по возрастанию' + ((nextField == 'Result') ? ' по OSA' : ' по кол-ву визитов'));
    elem.refresh();
  }

  var table = $$('tableFilterArt');
  table.sort([{ by: field, dir: sort, as: "int" }]);

  table.refresh();
}


