function setAdditionalColumn(report) {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetField',
    data: JSON.stringify({ 'Report': report }),
    success: function (data) {
      var result = JSON.parse(data.d);

      $$('reportAdditional').clearAll();
      $$('reportAdditional').config.columns = null;

      for (var i = 0; i < result.length; i++) 
        result[i].header = [ result[i].header.toString(), { content: "textFilter" }];      

      $$('reportAdditional').config.columns = result;
      $$('reportAdditional').refreshColumns();

      $$('reportAdditionals').show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });  
}

var reportAdditional = {
  id: 'reportAdditionals',
  rows: [
    {
      view: "toolbar",
      cols: [
        { view: "button", type: "iconTop", icon: "bars", width: 50, click: "$$('contextMenu').show()" },
        { view: "button", type: 'iconTop', icon: "filter", width: 50, click: "$$('menuSettings').show()" },
        { view: "button", type: 'iconButton', icon: "play", label: 'Применить', width: 150, click: "getAdditionReport()" },
        {},
        { view: "button", type: 'iconTop', icon: "file-excel-o", width: 50, click: "webix.toExcel($$('reportAdditional'))", hidden: (URLname != '') }
      ]
    },
    {
      view: "toolbar", height: 40,
      cols: [
        { view: "button", type: 'iconTop', icon: "clock-o", width: 50, click: "$$('periodList').show()" },
        { view: "template", css: 'text-user', id: 'reportAddHeader', borderless: true, height: 40, template: 'Отчет по визитам' }
      ]
    },
    {
      view: "datatable", id: "reportAdditional", select: true, resizeColumn: true,
      /*scheme: {
        $init: function (obj) {
          if ($.isNumeric(obj.Answer.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Answer = obj.Answer.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.OutCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.OutCode = obj.OutCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.Code.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.Code = obj.Code.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
          if ($.isNumeric(obj.PLUCode.toString().replace(new RegExp(",", 'g'), "."))) {
            obj.PLUCode = obj.PLUCode.toString().replace(new RegExp(",", 'g'), ".") * 1;
          }
        }
      }*/
    }
  ]
}

function getAdditionReport() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Report.asmx/Run',
    timeout: 300000,
    data: JSON.stringify({ 'Report': reportID, 'User': localStorage.getItem('Author'), 'Start': webix.i18n.parseFormatStr($$('Start').getValue()), 'Finish': webix.i18n.parseFormatStr($$('Finish').getValue()) }),
    success: function (data) {
      $$('reportAdditional').clearAll();
      $$('reportAdditional').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 1000 });
    },
    complete: function () {
      $$("navigation").hideProgress();
    }
  });
}