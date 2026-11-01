// ------- Разметка главного экрана 
var isSetting = 0;
var isResizeIcon = false;
var ordinaryX, ordinaryY, ordinaryWidth, ordinaryHeight;

// верхняя строка главного экрана
var toolbarHeader = {
  view: "toolbar", css: "toolbarHeader", //height: 40,
  cols: [    
    {      
      view: "button", type: "image", image: "../../i/gts_193.png", tooltip: "Карта отчетов", width: 40, height: 42, borderless: true, css: 'logo',
      on: {
        onItemClick: function (id) {
          $$('searchLeftMenu').setValue('');

          var menu = $$('popupLeftMenu');
          if (menu.isVisible())
            menu.hide();
          else {
            menu.define("height", parseInt($(window).height()) - 120);
            menu.resize();

            menu.show(this.$view);
          }
        }
      }
    },
    {
      view: "button", type: 'icon', id: 'btnPeriod', icon: 'far fa-calendar-alt', label: "", width: 190, tooltip: "Интервал дат отчетов", css: "toolbarHeader",
      on: {
        onItemClick: function (id) {
          $$('winPeriod').show(this.$view);
        }
      }
    },
    {
      view: "scrollview", scroll: "x", gravity: 1, css: "toolbarHeader",
      body: {
      view: "toolbar", css: "toolbarHeader", height: 40, type: "clean",
        cols: [
          {
            id: "taskBar",
            cols: []
          },
          {},
        ]
      },
    },
    { view: "icon", id: "btnHideAll", icon: "fas fa-window-minimize", tooltip: "Свернуть все окна", click: "hideAllWindows()", hidden: true },
    { view: "icon", id: "btnCloseAll", icon: "far fa-window-close", tooltip: "Закрыть все окна", click: "closeAllWindows()", hidden: true },
    {
      view: "button", value: "Инструкция к сайту", width: 150, hidden: (localStorage.getItem('SystemLang') === 'UA'), click: function () {
        if (localStorage.getItem('SystemLang') == 'WB' && localStorage.getItem('CompanyID') == '1071')
          window.open("https://rm-info.online/about/Project100/SiteInstructions.pdf", "_blank");
        else if (localStorage.getItem('SystemLang') == 'WB' && localStorage.getItem('CompanyID') == '1073')
          window.open("https://a-57.online/about/Project101/SiteInstructions.pdf", "_blank");
        else
          window.open("/about/SiteInstructions.pdf", "_blank");
      }
    },
    {
      view: "richselect", id: "comboCompany", width: 140, tooltip: "Компания", 
      options: {
        view: "datasuggest", id: 'dataCompany', 
        body: {      
          type: {
            height: 24,
            width: 200
          },
          css: "hover-list", template: "<span style='padding-left: 12px'>#value#</span>",
          xCount: 1, autoheight: false, data:[]
        }
      },
      on: {
        onChange: function (newValue, oldValue, config) {
          var list = this.getList();
          var item = list.getItem(newValue);

          closeAllWindows();

          localStorage.setItem('Author', item.UserID);
          localStorage.setItem('UserName', item.UserName);
          localStorage.setItem('RoleName', item.RoleName);
          localStorage.setItem('Photo', item.Photo);
          localStorage.setItem('CompanyID', item.CompanyID);
          localStorage.setItem('CompanyName', item.CompanyName);
          localStorage.setItem('IsRoute', item.IsRoute);
          localStorage.setItem('IsPoint', item.IsPoint);
          localStorage.setItem('IsUser', item.IsUser);
          localStorage.setItem('IsTask', item.IsTask);
          localStorage.setItem('Magic', item.Magic);
          localStorage.setItem('Lang', '');
          localStorage.setItem('Phone', item.Phone);
          localStorage.setItem('BaseName', item.BaseName);
          localStorage.setItem('Email', item.Email);
          localStorage.setItem('IsRecognize', item.IsRecognize);
          
          if (newValue != oldValue && oldValue != '')
            window.location.reload();
          else
            onStart();
        }
      }
    },
    {
      view: "icon", id: "buttonFilter", icon: "fas fa-filter", width: 70, tooltip: "Фильтры отчетов", badge: 0, 

      on: {
        onItemClick: function (id) {    
          var menu = $$('popupRightMenu');

          if (menu.isVisible())
            menu.hide();
          else {
            createFilterMenu();

            menu.define("height", parseInt($(window).height()) - 80);
            menu.resize();

            menu.show(this.$view);
          }
        }
      }
    },    
    {
      view: "icon", icon: "fas fa-user-circle", tooltip: localStorage.getItem('UserName') + ', ' + localStorage.getItem('RoleName'), popup: "popupUser"
    }
  ]
}

// иконки отчетов
var iconFooter = {
  view: "dataview", id: "iconFooter", select: true, scroll: true, borderless: true, height: 64, minHeight: 64,
  type: { width: 110, height: 64, css: "report-item" }, 
  template: '<div class="report-text"><span class="webix_icon #icon#"></span><div class="report-name">#value#</div></div>',
  on: {
    onItemClick: function (id) {
      var item = this.getItem(id);
            
      showReport(item);      
    },
    onViewResize: function () {
      setUserSetting('ICON_HEIGHT', this.$height);
    }
  }
};

// меню слева - карта сайта
var leftMenu = {
  rows: [
    {
      cols: [
        {
          view: "search", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", id: 'searchLeftMenu', type: "clean", clear: true,
          on: {
            onTimedKeyPress: function () {
              var value = this.getValue().toUpperCase();
              var list = $$('leftMenu');

              if ((value == '') || (value.length < 2)) {
                if (value == '') list.filter('');

                return;
              }

              var search = value.split(' ');

              list.filter(function (obj) {
                if (obj.id < 0) {
                  return false; //исключаем заголовки разделов
                }
                return ((obj.value.toString().toUpperCase().indexOf(search[0]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[0]) != -1))
              });
              if (search[1] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[1]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[1]) != -1)) }, null, true);
              if (search[2] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[2]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[2]) != -1)) }, null, true);
              if (search[3] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[3]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[3]) != -1)) }, null, true);
              if (search[4] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[4]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[4]) != -1)) }, null, true);
              if (search[5] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[5]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[5]) != -1)) }, null, true);
              if (search[6] != null)
                list.filter(function (obj) { return ((obj.value.toString().toUpperCase().indexOf(search[6]) != -1 || obj.Description.toString().toUpperCase().indexOf(search[6]) != -1)) }, null, true);
            }
          }
        },
        {
          view: "icon", icon: "fas fa-paperclip", tooltip: "Настройка списка отчетов в нижней строке экрана",
          click: function () {
            isSetting = (isSetting == 1) ? 0 : 1;

            $$('leftMenu').refresh();
          }
        }
      ]
    },    
    {
      view: "list", id: "leftMenu", select: true, type: "line", autowidth: true, layout: "y", type: { height: "auto" }, tooltip: "#Description#", css: "webix_dark",
      scheme: {
        $init: function (obj) {
          if (obj.id < 0) obj.$css = "leftMenu-directory";
        }
      }, 
      template: function (obj) {
        return (isSetting == 1 && obj.Magic != 'DASHBOARD' && obj.id > 0 && obj.id < 1000000) ? `<input type='checkbox'${(obj.IsIcon == 1) ? ' checked="checked"' : ""} /> ` + obj.value : '<span class="webix_list_icon webix_icon ' + obj.icon + '" style="color: #002D6F"></span> ' + obj.value;
      },
      on: {
        onItemClick: function (id, e, node) {
          var item = this.getItem(id);

          // если режим настройки
          if (isSetting == 1) {
            item.IsIcon = (item.IsIcon == 1) ? 0 : 1;
            this.updateItem(item.id, item);

            $.ajax({
              url: '../../Services/Custom.asmx/SetIcon',
              data: JSON.stringify({ 'Menu': item.id, 'User': localStorage.getItem('Author'), 'Status': item.IsIcon }),
              complete: function () { },
              error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr);
              }
            });

            setIcon();

            return;
          }         

          showReport(item);          
        }
      }
    }
  ]  
}

// установка иконок снизу
function setIcon() {
  var list = $$('iconFooter');
  list.clearAll();
  var row = $$('leftMenu').find(function (obj) { return (obj.IsIcon == 1) });

  if (row.length == 0) 
    return;
  
  for (var i = row.length - 1; i >= 0; i--) { 
    list.add(row[i], 0);
  }
}