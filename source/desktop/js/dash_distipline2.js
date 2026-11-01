// ------- Дашборды Исполнительная дисциплина
var tempTableBA_Distipline2, rightSpaceBA_Distipline2, dashPercentBA_Distipline2, dashPlanBA_Distipline2, dashFilterMenuBA_Distipline2, checkIsCompareBA_Distipline2;

// график для показа количества посещенных ТТ
var chart_main_quant = {
  chart: {
    type: 'column'
  },  
  tooltip: {
    enabled: true
  },
  title: {
    text: 'Посещение по ТТ'
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
      ': <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
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
            getDashDetailVisit(this.start, this.finish);
          }
        }
      }
    }
  },
  series: [
    {
      name: 'Посещено', color: '#4E82BC', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: 'Не посещено', color: 'red', borderWidth: 0, lineWidth: 2,
      dataLabels: {
        enabled: true,
        format: '{y}',
      }
    },
    {
      name: 'Вне маршрута', borderWidth: 0, lineWidth: 2,
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
function getBA_Distipline2(menuID, report, procName, reportName) {
  var win_id = report + '|' + menuID;
  win_id_dash = win_id;

  if (isStart)
    setStartDate(win_id, reportName);

  isStart = false;
  isTrandCalc = true;

  dashWindow = report;

  tempTableBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[2];
  rightSpaceBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[3];
  dashPercentBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[0].getChildViews()[0];
  dashPlanBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[0].getChildViews()[1].getChildViews()[0];
  dashFilterMenuBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[1];
  checkIsCompareBA_Distipline2 = $$('rowLeft' + dashWindow).getChildViews()[1].getChildViews()[0].getChildViews()[2];

  webix.extend($$(dashWindow), webix.ProgressBar);
  webix.extend(dashFilterMenuBA_Distipline2, webix.ProgressBar);

  isDashFix = 0;  

  getDashReport('Компании', true, true);

  $('#dashMain' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();
  
}

var BA_Distipline2 = {
  id: 'BA_Distipline2', type: "wide",
  rows: [
    {
      cols: [
        {
          view: "segmented", multiview: true, value: 'TotalBA_Distipline2',  tooltip: true,
          options: [
            { id: "TotalBA_Distipline2", value: "ИТОГИ" },
            { id: "OfficeBA_Distipline2", value: "Офисы" },
            { id: "CityBA_Distipline2", value: "Города" },
            { id: "NetworkBA_Distipline2", value: "Сети" },
            { id: "PointBA_Distipline2", value: "ТТ" },
            { id: "UserBA_Distipline2", value: "Сотрудники" },
            { id: "MasterBA_Distipline2", value: "Руководители" }
          ],
          on: {
            onChange: function (newv, oldv) {
              $$('areaOfficeBA_Distipline2').hide();
              $$('areaCityBA_Distipline2').hide();
              $$('areaNetworkBA_Distipline2').hide();
              $$('areaPointBA_Distipline2').hide();
              $$('areaUserBA_Distipline2').hide();
              $$('areaMasterBA_Distipline2').hide();
              $$('areaTotalBA_Distipline2').hide();  

              $$('area' + newv).show();              

              getDashReport('Компании', true, true);
            }
          }
        },
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
              type: "wide", id: "rowLeftBA_Distipline2",
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
              type: "wide", 
              cols: [
                {
                  id: 'areaOfficeBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tableOfficeBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "OfficeName", header: ['Наименование', { content: "textFilter" }], width: 200, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        },
                        {
                          id: "Weight", header: ['Вес', { content: "textFilter" }], width: 36, minWidth: 30, sort: "int", css: "chart-table-text", tooltip: true,
                          template: function (obj) {
                            return obj.Weight + '%';
                          }
                        }
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tableOfficeBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaCityBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tableCityBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "OfficeName", header: ['Офис', { content: "excelFilter" }], width: 120, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "CityName", header: ['Наименование', { content: "textFilter" }], width: 150, minWidth: 60, sort: "string", tooltip: true },
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        }                        
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tableCityBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaNetworkBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tableNetworkBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "Name", header: ['Наименование', { content: "textFilter" }], width: 200, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' } ,
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        },
                        {
                          id: "Weight", header: ['Вес', { content: "textFilter" }], width: 36, minWidth: 30, sort: "int", css: "chart-table-text", tooltip: true,
                          template: function (obj) {
                            return obj.Weight + '%';
                          }
                        }                        
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tableNetworkBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaPointBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tablePointBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "OfficeName", header: ['Офис', { content: "excelFilter" }], width: 90, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "CityName", header: ['Город', { content: "excelFilter" }], width: 90, minWidth: 60, sort: "string", tooltip: true },
                        { id: "NetworkName", header: ['Сеть', { content: "excelFilter" }], width: 90, minWidth: 60, sort: "string", tooltip: true },
                        { id: "FormatName", header: ['Формат', { content: "textFilter" }], width: 70, minWidth: 60, sort: "string", tooltip: true },
                        { id: "Name", header: ['Вывеска', { content: "textFilter" }], width: 100, minWidth: 60, sort: "string", tooltip: true },
                        { id: "Address", header: ['Адрес', { content: "textFilter" }], width: 300, minWidth: 60, sort: "string", tooltip: true },
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        },                        
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tablePointBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaUserBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tableUserBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "UserName", header: ['Сотрудник', { content: "textFilter" }], width: 150, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "RoleName", header: ['Должность', { content: "excelFilter" }], width: 120, minWidth: 60, sort: "string", tooltip: true },
                        { id: "MasterName", header: ['Руководитель', { content: "excelFilter" }], width: 150, minWidth: 60, sort: "string", tooltip: true },                        
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        },
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tableUserBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaMasterBA_Distipline2', hidden: true,
                  rows: [
                    {
                      view: "datatable", id: 'tableMasterBA_Distipline2', select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 20, rowHeight: 20, tooltip: true, footer: true,
                      columns: [
                        {
                          id: "UserName", header: ['Сотрудник', { content: "textFilter" }], width: 150, minWidth: 60, sort: "string", tooltip: true,
                          footer: '<div class="webix_view webix_control webix_el_icon" style="display: inline-block; width: 38px; height: 38px;"><button type="button" class="webix_icon_button" style="height: 38px; width: 38px;"><span class="webix_icon fas fa-file-excel"></span></button></div>'
                        },
                        { id: "RoleName", header: ['Должность', { content: "excelFilter" }], width: 120, minWidth: 60, sort: "string", tooltip: true },                        
                        { id: "PlanCount", header: ["План", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        { id: "FactCount", header: ["Факт", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                        {
                          id: "Percents", header: ["% вып.", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.Percents + '%';
                          }
                        },
                        {
                          id: "PercentBefore", header: ["% ПМ", { content: "numberFilter" }], width: 50, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentBefore + '%';
                          }
                        },
                        {
                          id: "PercentDelta", header: ["Прирост", { content: "numberFilter" }], width: 60, minWidth: 30, sort: "int", css: { 'text-align': 'right' },
                          template: function (obj) {
                            return obj.PercentDelta + '%';
                          }
                        },
                        {
                          id: "Result", header: ['Шкала', { content: "textFilter" }], sort: "int", width: 100, tooltip: false,
                          template: function (obj) {
                            var html = "<div class='progress_bar_element'>";

                            if (obj.PercentDelta > 0)
                              html += "<div class='progress_result' style='width:" + (obj.Result + "%") + "'></div>";
                            else
                              html += "<div class='progress_result_minus' style='width:" + (-obj.Result + "%") + "'></div>";
                            html += "</div>";
                            return html;
                          }
                        },
                      ],
                      onClick: {
                        "webix_icon_button": function (id, e, node) {
                          webix.toExcel($$('tableUserBA_Distipline2'), { filterHTML: true, footer: false });
                        }
                      },
                    }
                  ]
                },
                {
                  id: 'areaTotalBA_Distipline2', // вкладка TOTAL
                  rows: [
                    {
                      cols: [
                        { view: "template", id: "dashContainerBA_Distipline2", content: "dashMainBA_Distipline2", gravity: 2 },
                        { view: "resizer" },
                        { view: "template", id: "dashContainerWork", content: "dashTotalVisitWork" },
                      ]
                    },
                    {
                      cols: [
                        {
                          cols: [
                            {
                              id: 'areaDashBA_Distipline2',
                              cols: [
                                { view: "template", id: "dashContainerQuant", content: "dashMainQuantBA_Distipline2", gravity: 2 },
                                { view: "resizer" },
                                { view: "template", id: "dashContainerCoverage", content: "dashTotalVisitCoverage" },
                              ]
                            },
                            {
                              id: 'areaDetailBA_Distipline2', hidden: true,
                              rows: [
                                {
                                  cols: [
                                    { template: "Детализация по маршрутам", type: "header", borderless: true },
                                    {},
                                    {
                                      view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
                                      click: function () {
                                        webix.toExcel($$('tableDetail'), { filterHTML: true, footer: false });
                                      }
                                    },
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
                                  view: "datatable", id: "tableDetail", select: true, resizeColumn: true, dragColumn: true, rowLineHeight: 24, rowHeight: 24, footer: true,
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
                                    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 80, sort: "string" },
                                    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 80, sort: "string" },
                                    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 80, sort: "string" },
                                    { id: "Name", header: ["Вывеска", { content: "textFilter" }], width: 80, minWidth: 80, sort: "string" },
                                    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 150, minWidth: 150, sort: "string" },
                                    { id: "MasterName", header: ["Руководитель", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, sort: "string" },
                                    { id: "UserName", header: ["Сотрудник", { content: "excelFilter", mode: "text" }], width: 120, minWidth: 80, sort: "string" },
                                    { id: "RoleName", header: ["Должность", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 90, sort: "string" },
                                    { id: "CompanyName", header: ["Компания", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 50, sort: "string" },
                                    { id: "IsVisit", header: ["Визит", { content: "numberFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'right', 'text-decoration': 'underline', 'color': 'blue' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                                    { id: "IsRoute", header: ["В маршруте", { content: "numberFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'right' }, footer: { content: "summColumn", css: { 'text-align': 'right' }, height: 40 } },
                                    { id: "Duration", header: ["Длит.", { content: "numberFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'right' } }
                                  ],                                  
                                  on: {
                                    onItemClick: function (id, e) {
                                      var item = this.getItem(id);
                                      if (item == null)
                                        return;

                                      if (id.column == 'Address' && item.IsVisit == 1) {
                                        e.stopPropagation();

                                        sessionStorage.setItem('photoLat', item.Lat);
                                        sessionStorage.setItem('photoLon', item.Lon);

                                        if (sessionStorage.getItem('photoLat') == 'null' || sessionStorage.getItem('photoLat') == 0) {
                                          webix.message({ type: "default", text: "Геокоординаты визита не определены.", expire: 1000 });

                                          return false;
                                        }

                                        sessionStorage.setItem('photoError', item.Error);
                                        sessionStorage.setItem('pointLat', item.PointLat);
                                        sessionStorage.setItem('pointLon', item.PointLon);
                                        sessionStorage.setItem('pointAddress', item.Name + ' ' + item.Address);

                                        sessionStorage.setItem('Borned', item.BornedText);
                                        sessionStorage.setItem('UserTrackID', item.UserID);

                                        // загрузка окна с координатами
                                        var itemWindow = $$('menuUtility').getItem(59);
                                        if (itemWindow != null)
                                          showReport(itemWindow);

                                        $$("toolbarGeoTracking").show();

                                        e.stopPropagation();
                                        return false;
                                      }

                                      if (id.column == 'IsVisit' && item.IsVisit == 1) {
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
      ]
    }
  ]
}

function calcArea(magic, area) {
  if (area == '') return;

  var table = 'table' + area + dashWindow;

  showProgress(dashWindow);

  $.ajax({
    url: '../../Services/BI.asmx/CalcArea',
    timeout: 300000,
    data: JSON.stringify({
      'Area': area, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()), 'Period': dashPeriod,
      'Magic': magic, 'IsCalc': isTrandCalc
    }),
    success: function (data) {
      $$(table).clearAll();
      $$(table).parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //alert(xhr);
    },
    complete: function () {
      isTrandCalc = false;
      $$(dashWindow).hideProgress();
    }
  });
}

// график для показа информации по посещенным ТТ
function showChartMainQuant() {
  var table = tempTableBA_Distipline2;

  $$('dashContainer' + dashWindow).show();
  $('#dashMainQuant' + dashWindow).show();

  /*if (table.count() == 0)
    return;*/

  table.sort([{ by: "Start", dir: "asc" }]);

  table.filter(function (obj) {
    return obj.Magic.indexOf('VISIT') != -1;
  });

  var chart = Highcharts.chart('dashMainQuant' + dashWindow, chart_main_quant);

  chart.render();

  var categories = [];

  var item = table.getItem(table.getFirstId());  

  var visited = [];
  var no_visited = [];
  var free_visited = [];

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (obj.SeriesName == 'Посещено') 
      visited.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == 'Не посещено')
      no_visited.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });

    if (obj.SeriesName == 'Вне маршрута')
      free_visited.push({
        y: obj.Result,
        start: obj.StartText,
        finish: obj.FinishText
      });     
  });

  chart.series[0].update({ data: visited });
  chart.series[1].update({ data: no_visited });
  chart.series[2].update({ data: free_visited });

  //chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerQuant").$height);
}

// график для показа информации по частоте визитов - эксперимент, скрыт
/*function showChartVisitNetwork(table) {
  $$('dashContainerNetwork').show();
  $('#dashVisitNetwork').show();

  var chart = Highcharts.chart('dashVisitNetwork', chart_visit_network);

  // удаляем старые серии
  while (chart.series.length) {
    chart.series[0].remove();
  }

  chart.render();

  if (table.count() == 0)
    return;

  table.sort([{ by: "FactCount", dir: "asc" }, { by: "Result", dir: "asc", as: "int" }]);

  
  
  var categories = [];
  var series = [];
  var values = [];
  var lastName = '';

  var item = table.getItem(table.getFirstId());
  //series.push(item.Result.toString());

  table.data.each(function (obj) {
    if (categories.indexOf(obj.PeriodName) == -1)
      categories.push(obj.PeriodName);

    if (series.indexOf(obj.Result.toString()) == -1) {
      series.push(obj.Result.toString());

      chart.addSeries({
        name: obj.Result,//obj.LegendName,        
        borderWidth: 0,
        lineWidth: 2,
        dataLabels: {
          enabled: true,
          format: '{y}%',
        },
        data: values
      });    
    }
    
    lastName = obj.Result.toString();
  });

  chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerNetwork").$height);

  for (var i = 0; i < chart.series.length; i++) {
    var series = chart.series[i].name;

    values = [];

    table.data.each(function (obj) {      
      if (obj.Result.toString() == series)
        values.push(obj.PlanCount);      
    });

    chart.series[i].update({ data: values });
  }

  chart.legend.update({ enabled: (chart.series[1] != null) });
  chart.xAxis[0].update({ categories: categories });

  chart.setSize(null, $$("dashContainerNetwork").$height);
}*/

// график для показа диаграммы покрытие
function showChartCoverage() {
  var table = tempTableBA_Distipline2;

  $$('dashContainerCoverage').show();
  $('#dashTotalVisitCoverage').show();

  table.filter(function (obj) {
    return obj.Magic.indexOf('COVERAGE') != -1;
  });

  var data_graph = table.getItem(table.getFirstId());

  if (data_graph == null)
    return;

  var count = data_graph.Result + data_graph.PlanCount + data_graph.FactCount;

  var chartCoverage = Highcharts.chart('dashTotalVisitCoverage', {
    chart: {
      type: 'pie',
      custom: {},
      events: {
        render() {
          const chart = this, series = chart.series[0];
          let customLabel = chart.options.chart.custom.label;

          if (!customLabel) {
            customLabel = chart.options.chart.custom.label = chart.renderer.label('<strong>' + count + '</strong><br/>ТТ в АП').css({ color: '#000', textAnchor: 'middle' }).add();
          }

          const x = series.center[0] + chart.plotLeft, y = series.center[1] + chart.plotTop - (customLabel.attr('height') / 2);

          customLabel.attr({ x, y });

          customLabel.css({
            fontSize: `${series.center[2] / 12}px`
          });
        }
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    title: {
      text: 'Покрытие',
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      useHTML: true,
      text: `<span style="white-space: nowrap;"><i class="fas fa-info-circle"style="cursor: help; font-size: 18px; color: #606060;"
              title="• Обслуж. ТТ без визитов - все тт закрепленные за полевыми сотрудниками\n  на текущий день (см. Справочники - Сотрудники)\n• С визитами - есть визиты за выбранный период\n• Необслуж. ТТ - нет визитов и нет в ап сотрудников на текущий день\n• ТТ в АП - все активные тт компании на текущий день (сумма трех показателей)"></i></span>`,
      align: 'left',
      verticalAlign: 'top',
      x: -10,
      y: 10
    },

    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span>{point.name} <b>{point.y}</b'
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        allowPointSelect: true, cursor: 'pointer', borderRadius: 8, showInLegend: true,
        dataLabels: [
          { enabled: (count != 0), distance: 20, format: '{point.name}' },
          { enabled: (count != 0), distance: -15, format: '{point.percentage:.0f}%', style: { fontSize: '0.9em' } }
        ]
      }
    },
    series: [
      {
        name: 'Покрытие', colorByPoint: true,
        innerSize: '75%',
        data: [
          { name: 'С визитами', color: '#4e82bc', y: data_graph.Result, visible: (data_graph.Result != 0) },
          { name: 'Обслуж. ТТ<br/> без визитов', color: '#3dc3e8', y: data_graph.FactCount, visible: (data_graph.FactCount != 0) },
          { name: 'Необслуж.<br/> ТТ', color: 'red', y: data_graph.PlanCount, visible: (data_graph.PlanCount != 0) }
        ]
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
  });

  chartCoverage.setSize(null, $$("dashContainerCoverage").$height + 2);
}

// график для показа диаграммы Рабочая смена
function showChartWork() {
  var table = tempTableBA_Distipline2;

  $$('dashContainerWork').show();
  $('#dashTotalVisitWork').show();

  table.filter(function (obj) {
    return obj.Magic.indexOf('WORK') != -1;
  });

  var More7Hours = 0, Hours67 = 0, Hours56 = 0, Hours45 = 0, Hours34 = 0, Less3Hours = 0;
  var count = 0;

  table.data.each(function (obj) {
    if (obj.SeriesName == 'Сотрудников') count = obj.Result;
    if (obj.SeriesName == 'Более 7 час.') More7Hours = obj.Result;
    if (obj.SeriesName == '6-7 час.') Hours67 = obj.Result;
    if (obj.SeriesName == '5-6 час.') Hours56 = obj.Result;
    if (obj.SeriesName == '4-5 час.') Hours45 = obj.Result;
    if (obj.SeriesName == '3-4 час.') Hours34 = obj.Result;
    if (obj.SeriesName == 'Менее 3-хч час.') Less3Hours = obj.Result;    
  });

  var chartWork = Highcharts.chart('dashTotalVisitWork', {
    chart: {
      type: 'pie',
      custom: {},
      events: {
        render() {
          const chart = this, series = chart.series[0];
          let customLabel = chart.options.chart.custom.label;

          if (!customLabel) {
            customLabel = chart.options.chart.custom.label = chart.renderer.label('<strong>' + count + '</strong><br/>сотрудников').css({ color: '#000', textAnchor: 'middle' }).add();
          }

          const x = series.center[0] + chart.plotLeft, y = series.center[1] + chart.plotTop - (customLabel.attr('height') / 2);

          customLabel.attr({ x, y });

          customLabel.css({
            fontSize: `${series.center[2] / 12}px`
          });
        }
      }
    },
    title: { text: 'Рабочая смена', style: { fontSize: '24px' } },
    subtitle: {
      useHTML: true,
      text: `<i class="fas fa-info-circle" style="cursor: help; font-size: 18px; color: #606060;" title="• Учитываются все визиты длительность которых > 0\n• По каждому сотруднику считается сумма длительности всех визитов за день\n• Проценты – процент по каждой группе длительности:\n  - Свыше 7ми час: длительность смены более 7 часов\n  - 6-7 час: длительность смены от 6 до 7 часов\n  - 5-6 час: длительность смены от 5 до 6 часов\n  - 4-5 час: длительность смены от 4 до 5 часов\n  - 3-4 час: длительность смены от 3 до 4 часов\n  - Менее 2 час: длительность смены менее 2 часов\n• Сотрудников – сумма всех сотрудников у кого есть хотя бы один визит с длительностью > 0"></i>`,
      align: 'left',
      verticalAlign: 'top',
      x: -10,
      y: 10
    },
    plotOptions: {
      pie: { shadow: false, center: ['50%', '50%'] }
    },
    tooltip: { valueSuffix: '%' },
    series: [
      {
        name: 'Длит.',
        data: [
          { name: 'Св. 7ми час', color: '#4e82bc', y: More7Hours, visible: (More7Hours != 0) },
          { name: '6-7 час', y: Hours67, visible: (Hours67 != 0) },
          { name: '5-6 час', y: Hours56, visible: (Hours56 != 0) },
          { name: '4-5 час', y: Hours45, visible: (Hours45 != 0) },
          { name: '3-4 час', y: Hours34, visible: (Hours34 != 0) },
          { name: 'Менее 3 час', color: 'red', y: Less3Hours, visible: (Less3Hours != 0) }
        ],
        size: '90%', innerSize: '70%',
        dataLabels: {
          format: '<b>{point.name}:</b><br/> <span style="opacity: 0.8">{y}%</span>',
          filter: { property: 'y', operator: '>', value: 1 },
          style: { fontWeight: 'normal' }
        },
        id: 'versions'
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
    },
    responsive: {
      rules: [
        {
          condition: { maxWidth: 400 },
          chartOptions: {
            series: [
              {},
              {
                id: 'versions',
                dataLabels: {
                  distance: 10, format: '{point.custom.version}', filter: { property: 'percentage', operator: '>', value: 2 }
                }
              }
            ]
          }
        }
      ]
    }
  });

  chartWork.setSize(null, $$("dashContainerWork").$height + 2);
}

// загрузка детализации по графику Маршруты
function getDashDetailVisit(start, finish) { 
  showProgress(dashWindow);

  $.ajax({
    url: '../../Services/BI.asmx/GetDetail',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish }),
    success: function (data) {
      $$('areaDash' + dashWindow).hide();
      $$('areaDetail' + dashWindow).show();

      $$('tableDetail').clearAll();
      $$('tableDetail').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //onError();
    },
    complete: function () {
      $$(dashWindow).hideProgress();
    }
  });
}

// общий график показа процентных показателей
var chart_main_BA_Distipline2 = {
  chart: {
    type: 'line',
    renderTo: 'dashMainBA_Distipline2',
  },
  tooltip: {
    enabled: true
  },
  legend: { enabled: false },
  title: {
    text: 'Выполнение по маршрутам'
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
            getDashDetailVisit(this.start, this.finish);
          }
        }
      }
    }
  },
  tooltip: {
    formatter: function () {
      return 'Выполнение плана по <br>маршрутам за ' + this.x + ' - <b>' + this.y + '%</b>';
    }
  },
  series: [
    {
      name: '% выполнения', color: '#4E82BC', borderWidth: 0, lineWidth: 2,
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

