// меню справа - фильтры
var rightMenu = {
  rows: [
    {
      cols: [
        { template: "Фильтры отчетов", type: "header", width: 200, borderless: true },         
        {},
        {
          //view: "button", width: 100, value: "Применить",
          view: "icon", icon: "fas fa-sync", tooltip: "Применить", 
          click: function () {
            if ($$("iconRefresh_" + currentReport) != null) {
              $$("iconRefresh_" + currentReport).callEvent("OnItemClick");

              return;
            }
          }
        },
        {
          view: "icon", icon: "fas fa-trash", tooltip: "Очистить все фильтры",
          click:
            function () {
              clearAllFilter();
            }
        },       
        {
          view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно фильтров", width: 50, 
          click:
            function () {
              $$('popupRightMenu').hide();
            }
        }
      ]
    },
    {
      view: "accordion", id: "filterMenu", css: "webix_dark", multi: true, collapsed: true, minHeight: 50,
      rows: [ ],
      on: {
        onAfterExpand: function (id) {
          this.getChildViews().forEach(function (view) {
            if (view != $$(id))
              view.collapse();
          });          

          getFilterData(id);
        }
      }
    }
  ]
}
function createFilterMenu() {
  $.ajax({
    url: '../../Services/Framework.asmx/GetFilter',
    timeout: 300000,
    data: JSON.stringify({ 'Menu': currentMenuID, 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      var data = JSON.parse(data.d);
      if (data.length == 0)
        return;

      var menu = $$("filterMenu");
      menu.getChildViews().forEach(function (view) {
        menu.removeView(view.config.id);
      });
      menu.reconstruct();

      for (var i = 0; i < data.length; i++)
        menu.addView({
          view: "accordionitem", getProcName: data[i].GetProcName, setProcName: data[i].SetProcName, tooltip: data[i].Description, isInterval: data[i].IsInterval,
          header: '<span class="webix_list_icon webix_icon ' + data[i].icon + '"></span>' + data[i].Name + data[i].Text, dataIcon: data[i].icon, dataName: data[i].Name, minHeight: 200,
          body: {}
        });

      menu.getChildViews().forEach(function (view) {
        view.collapse();
      });
    
    },   
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

function getFilterData(id) {
  var item = $$(id);
  var getProcName = item.config.getProcName;
  var setProcName = item.config.setProcName;
  var isInterval = item.config.isInterval;

  var start = null, finish = null;

  if (isInterval == 1) {
    start = webix.i18n.parseFormatStr($$('Start').getValue());
    finish = webix.i18n.parseFormatStr($$('Finish').getValue());
  }

  $.ajax({
    url: '../../Services/Framework.asmx/SetUserCompany',
    timeout: 300000,
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      showProgress('filterMenu');
      $.ajax({
        url: '../../Services/Framework.asmx/RunFilter',
        timeout: 300000,
        data: JSON.stringify({ 'ProcName': getProcName, 'User': localStorage.getItem('Author'), 'Start': start, 'Finish': finish }),
        success: function (data) {
          var rows = JSON.parse(data.d);

          webix.ui(
            {
              rows: [
                {
                  cols: [
                    {
                      view: "search", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", type: "clean", clear: true,
                      on: {
                        onTimedKeyPress: function () {
                          var value = this.getValue().toUpperCase();
                          var list = $$('filter_' + dashWindow + id);

                          if ((value == '') || (value.length < 2)) {
                            if (value == '') list.filter('');

                            return;
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
                        }
                      }
                    },
                    {
                      view: "icon", icon: "far fa-check-square", tooltip: "Выбрать все",

                      on: {
                        onItemClick: function () {
                          var check = 0;

                          if (this.config.icon == 'far fa-check-square') {
                            check = 1;
                            this.define('icon', 'far fa-square');
                            this.define('tooltip', 'Отключить все');
                            this.refresh();
                          }
                          else {
                            check = 0;
                            this.define('icon', 'far fa-check-square');
                            this.define('tooltip', 'Выбрать все');
                            this.refresh();
                          }

                          var list = $$('filter_' + dashWindow + id);
                          list.data.each(function (obj) {
                            obj.IsActive = check;
                            list.updateItem(obj.id, obj);
                          });

                          list.refresh();

                          setFilter(list, setProcName, false);
                        }
                      }
                    },    
                  ]
                },            
                {
                  view: "list", id: 'filter_' + dashWindow + id, select: true, data: rows, scroll: true, type: { height: "auto" }, adjust: true, procName: setProcName, //autoheight: true,
                  template: function (obj) {
                    return `<input type='checkbox'${(obj.IsActive == 1) ? ' checked="checked"' : ""} /> ` + obj.Name
                  },
                  on: {
                    onItemClick: function (id, e, node) {
                      var item = this.getItem(id);
                      item.IsActive = (item.IsActive == 1) ? 0 : 1;  
                      this.updateItem(item.id, item);

                      setFilter(this, setProcName, false);
                      
                    }
                  }
                }
              ]
            }, item, 0).define("autoheight", true);
        },
        complete: function () {
          $$('filterMenu').hideProgress();
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

// сохранение справочников
function setFilter(list, procName, closed) {
  var row = $$(list).find(function (obj) { return (obj.IsActive == 1) });

  var text = '';

  // сначала полностью очищаем список
  $.ajax({
    url: '../../Services/Framework.asmx/SetReportDictionary',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': '', 'ProcName': procName }),
    complete: function () {
      setFilterCount();

      if (row.length == 0) 
        return;
     
      for (var i = 0; i < row.length; i++) {
        if (text.length < 4000) {
          text = text + row[i].ID + '|';
        }
        else {
          $.ajax({
            url: '../../Services/Framework.asmx/SetReportDictionary',
            data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': text, 'ProcName': procName }),
            complete: function () {
              setFilterCount();
            }
          });

          text = row[i].ID + '|';
        }
      }

      if (text != '')
        $.ajax({
          url: '../../Services/Framework.asmx/SetReportDictionary',
          data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Text': text, 'ProcName': procName }),
          complete: function () {
            setFilterCount();
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

  badgeReportRefresh(row.length, list);

  if (closed)
    $$('popupRightMenu').hide();
}

function badgeReportRefresh(count, list) {
  var parent = list.getParentView().getParentView()
  var config = parent.config;

  var text = (count == 0) ? "" : " (" + count + ")";

  parent.define("header", '<span class="webix_list_icon webix_icon ' + config.dataIcon + '"></span>' + config.dataName + text);
  parent.refresh();  
}

function setFilterCount() {
  $.ajax({
    url: '../../Services/Framework.asmx/GetFilter',
    timeout: 300000,
    data: JSON.stringify({ 'Menu': currentMenuID, 'User': localStorage.getItem('Author'), 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      var data = JSON.parse(data.d);

      if (data.length == 0)
        return;

      updateFilter(data[0].TotalCount);
      //  var count = data[0].TotalCount;
      //
      //  var button;
      //  
      //  if (currentReport != '')
      //    button = 'iconFilter_' + currentReport;
      //  
      //  if (count != 0) {
      //    $$('buttonFilter').define({ badge: count });
      //    $$('buttonFilter').define({ width: 70 });
      //  
      //    if ($$(button) != null) {
      //      $$(button).define({ badge: count });
      //      $$(button).define({ width: 70 });
      //    }
      //  }
      //  else {
      //    $$('buttonFilter').define({ badge: false });
      //    $$('buttonFilter').define({ width: 40 });
      //  
      //    if ($$(button) != null) {
      //      $$(button).define({ badge: false });
      //      $$(button).define({ width: 40 });
      //    }
      //  }
      //  
      //  $$('buttonFilter').refresh();
      //  $$('buttonFilter').resize();
      //  
      //  if ($$(button) != null) {
      //    $$(button).refresh();
      //    $$(button).resize();
      //  }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

//обновление счетчика фильтра на всех окнах
function updateFilter(count) {
  //иконка фильтра в правом углу
  if (count != 0) {
    $$('buttonFilter').define({ badge: count });
    $$('buttonFilter').define({ width: 70 });
  }
  else {
    $$('buttonFilter').define({ badge: false });
    $$('buttonFilter').define({ width: 40 });
  }
  $$('buttonFilter').refresh();
  $$('buttonFilter').resize();

  //обновление на всех открытых окнах
  for (i = 0; i < $$('taskBar').getChildViews().length; i++) {
    let winName = $$('taskBar').getChildViews()[i].config.id.replace("task_", "");
    let buttonFilter = 'iconFilter_' + winName;
    if ($$(buttonFilter) != null) {
      if (count != 0) {
        $$(buttonFilter).define({ badge: count });
        $$(buttonFilter).define({ width: 70 });
      }
      else {
        $$(buttonFilter).define({ badge: false });
        $$(buttonFilter).define({ width: 40 });
      }
      $$(buttonFilter).refresh();
      $$(buttonFilter).resize();
    }
  }
}