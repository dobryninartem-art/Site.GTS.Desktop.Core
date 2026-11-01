// ----- Разметка окон
var isHide = 1;
var startNow = 0;
var currentPhotoData = null;

// стандартное окно отчетов
var winStandart = {
  view: "window", move: true, resize: true, head: true, escHide: false, minHeight: 300, minWidth: 300, 
  head: {    
    cols: [      
      { view: "template", template: "", type: "header", borderless: true, css: "headerLine" },
      {
        view: "search", value: "", placeholder: (isEng) ? 'Search...' : "Поиск...", type: "clean", clear: true, css: "headerLine",
        on: {
          onTimedKeyPress: function () {
            var value = this.getValue().toUpperCase();

            var list = $$(this.config.id.replace("search_", ""));

            if ((value == '') || (value.length < 2)) {
              if (value == '') list.filter('');

              return;
            }

            var search = value.split(' ');

            list.filter(function (obj) {
              return (obj.FullText.toUpperCase().indexOf(search[0]) != -1)
            });
            if (search[1] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[1]) != -1) }, null, true);
            if (search[2] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[2]) != -1) }, null, true);
            if (search[3] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[3]) != -1) }, null, true);
            if (search[4] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[4]) != -1) }, null, true);
            if (search[5] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[5]) != -1) }, null, true);
            if (search[6] != null)
              list.filter(function (obj) { return (obj.FullText.toUpperCase().indexOf(search[6]) != -1) }, null, true);
          }
        }
      },
      {
        view: "icon", icon: "fas fa-sync", tooltip: "Загрузить данные", css: "headerLine",
        on: {
          onItemClick: function () {
            var config = this.config;
            var report = config.report;
            var menuID = config.menuID;
            var procName = config.procName;            
            var reportName = config.reportName;
            var reportMagic = config.reportMagic;

            getReportData(menuID, report, procName, reportName, reportMagic);
          }
        }        
      },
      {
        view: "icon", icon: "fas fa-ellipsis-v", tooltip: "Доп.меню", css: "headerLine",
        click: function () {
          const report = $$(this.config.id.replace('iconAddMenu_', ''));
          reportAddMenu.call(this, report);
        }
      },
      {
        view: "icon", icon: "fas fa-filter", width: 40, tooltip: "Фильтры отчетов", css: "headerLine",

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
        view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
        click: function () {
          var report = this.config.id.replace('iconExcel_', '');
          var exportFileName = this.config.exportFileName;
          var exportMail = this.config.exportMail;

          toExcelData(report, exportFileName, exportMail);
        }
      },
      {
        view: "icon", icon: "far fa-file-archive", tooltip: "В архив", css: "headerLine",
        click: function () {
          var report = $$(this.config.id.replace('iconArchive_', ''));

          archivePhoto(report);
        }
      },            
      {
        view: "icon", icon: "fas fa-text-height", width: 70, tooltip: "Автоширина строк", css: "headerLine",
        click: function () {
          var report = this.config.id.replace("iconAutoHeight_", "");
          var isAuto = ($$(report).config.rowAutoHeight == null) ? "0" : $$(report).config.rowAutoHeight;

          if (isAuto == "0") {
            $$(report).define('rowAutoHeight', "1");
            this.define('tooltip', 'Выключить автоширину строк');
          }
          else {
            $$(report).define('rowAutoHeight', "0");
            this.define('tooltip', 'Включить автоширину строк');
          }
          
          $$(report).refresh();
        }
      },
      { width: 10, css: "headerLine" },
      {
        view: "icon", icon: "far fa-window-minimize", tooltip: "Свернуть", css: "headerLine",
        click: function () {
          minmizeWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-expand", tooltip: "На весь экран", css: "headerLine",
        click: function () {
          expandWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно", css: "headerLine",
        click:
          function () {
            closeWindow(this);           
          }
      }
    ]
  },
  body: {
    rows: [
      {
        template: "Название отчета", 
      },      
      {
        cols: [
          {
            view: "pager", size: 10000000, group: 10, width: 100, css: "row_pager", height: 30,
            template: function (data, common) {
              return /*common.first() + common.prev() +*/ ((isEng) ? ' Rows:' : ' Всего: ') + data.count; //+ common.next() + common.last();
            }
          },
          {},        
          {
            template: "Интервал дат", width: 170, css: "interval_click",
            onClick: {
              "interval_click": function (e, id) {
                e.stopPropagation();

                $$('winPeriod').show(this.$view);
                startNow = 1;

                e.stopPropagation();
                return false;
              }
            }
          },
        ]
      }      
    ]  
  }, 
  on: {
    onViewMoveEnd: function () { onViewModeEnd(this); },
    onHide: function () { onHideWindow(this); },
    onViewResize: function () {
      setWindowSize(this.config.id);
    }
  }
};

// стандартное окно для сводных таблиц
var winPivot = {
  view: "window", move: true, resize: true, head: true, escHide: false, minHeight: 300, minWidth: 300,
  head: {
    cols: [
      { template: "Название отчета", type: "header", borderless: true, css: "headerLine" },  
      {
        view: "icon", icon: "fas fa-sync", tooltip: "Загрузить данные", css: "headerLine",
        on: {
          onItemClick: function() {
            var config = this.config;
            var report = config.report;
            var menuID = config.menuID;
            var procName = config.procName;            
            var reportName = config.reportName;
            var reportMagic = config.reportMagic;

            getPivotData(menuID, report, procName, reportName, reportMagic);
          }
        }        
      },
      {
        view: "icon", icon: "fas fa-filter", tooltip: "Фильтры отчетов", css: "headerLine",

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
        view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
        click: function () {
          var report = this.config.id.replace('iconExcel_', '');
          var exportFileName = this.config.exportFileName;

          toExcelData(report, exportFileName);
        }
      },      
      {
        view: "icon", icon: "far fa-window-minimize", tooltip: "Свернуть", css: "headerLine",
        click: function () {
          minmizeWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-expand", tooltip: "На весь экран", css: "headerLine",
        click: function () {
          expandWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно", css: "headerLine",
        click:
          function () {
            closeWindow(this);          
          }
      }
    ]
  },
  body: {
    rows: [
      {
        template: "Название отчета",
      },
      {
        cols: [
          {},
          //  {
          //    view: "rangeslider", value: [98, 100],
          //    on: {
          //      onSliderDrag: function () {
          //        var dayStart = 100 - this.getValue()[0];
          //        var dayFinish = 100 - this.getValue()[1];
          //  
          //        $$('Start').setValue(webix.Date.add(new Date(), -(dayStart + dayFinish), "day"));
          //        $$('Finish').setValue(webix.Date.add(new Date(), -dayFinish, "day"));
          //        $$('btnPeriod').define('label', webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
          //        $$('btnPeriod').define('tooltip', '');
          //        $$('btnPeriod').refresh();
          //  
          //        var report = this.config.id.replace('slider_', '');
          //  
          //        $$("templatePeriod_" + report).define("template", webix.i18n.parseFormatStr($$('Start').getValue()) + ' - ' + webix.i18n.parseFormatStr($$('Finish').getValue()));
          //        $$("templatePeriod_" + report).refresh();
          //      },
          //      onChange: function (newValue, oldValue, config) {
          //        $$("iconRefresh_" + currentReport).callEvent("OnItemClick");
          //      }
          //    }
          //  },
          {
            template: "Интервал дат", width: 170, height: 30, css: "interval_click",
            onClick: {
              "interval_click": function (e, id) {
                e.stopPropagation();

                $$('winPeriod').show(this.$view);
                startNow = 1;

                e.stopPropagation();
                return false;
              }
            }
          },
        ]
      }
    ]
  },
  on: {
    onViewMoveEnd: function () {
      onViewModeEnd(this);
    },
    onHide: function () {
      onHideWindow(this);
    },
    onViewResize: function () {
      setWindowSize(this.config.id);
    }
  }
};

// стандартное окно для специального функционала
var winSpecial = {
  view: "window", move: true, resize: true, head: true, escHide: false, minHeight: 300, minWidth: 300,
  head: {
    cols: [
      { template: "Название отчета", type: "header", borderless: true, css: "headerLine" },
      {
        view: "icon", icon: "fas fa-sync", tooltip: "Загрузить данные", css: "headerLine",
        on: {
          onItemClick: function () {
            var config = this.config;
            var report = config.report;
            var menuID = config.menuID;
            var procName = config.procName;           
            var reportName = config.reportName;

            var exec_string = "get" + report + "(menuID, report, procName, reportName)"

            eval(exec_string);
          }
        }        
      },
      { view: "icon", icon: "far fa-trash-alt", tooltip: "Удалить отчет", css: "headerLine", click: "deleteReport()" },
      {
        view: "icon", icon: "fas fa-filter", width: 40, tooltip: "Фильтры отчетов", css: "headerLine",
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
        view: "icon", icon: "fas fa-file-excel", tooltip: "Экспорт в Эксель", css: "headerLine",
        click: function () {
          var report = this.config.id.replace('iconExcel_', '');
          var exportFileName = this.config.exportFileName;

          if (report.includes("reportCustom"))
            toExcelData(report, exportFileName, exportFileName);
          else
            toExcelData(exportFileName, exportFileName);
        }
      },      
      {
        view: "icon", icon: "far fa-window-minimize", tooltip: "Свернуть", css: "headerLine",
        click: function () {
          minmizeWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-expand", tooltip: "На весь экран", css: "headerLine",
        click: function () {
          expandWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно", css: "headerLine",
        click:
          function () {
            closeWindow(this);
          }
      }
    ]
  },
  body: {
    rows: [
      {
        template: "Название отчета",
      },
      //{ view: "template", id: "rangeContainer", content: "range-days", height: 44 }      
    ]
  },
  on: {
    onViewMoveEnd: function () {
      onViewModeEnd(this);
    },
    onHide: function () {
      onHideWindow(this);
    },
    onViewResize: function () {
      setWindowSize(this.config.id);
    }
    
  }
};

// окно для информации по визиту
var winVisit = {
  view: "window", move: true, resize: true, head: true, escHide: false, minHeight: 500, minWidth: 1270,
  head: {
    cols: [
      { template: "Информация по визиту", type: "header", borderless: true, css: "headerLine" },
      {
        view: "icon", icon: "fas fa-sync", tooltip: "Загрузить данные", css: "headerLine",
        on: {
          onItemClick: function () {
            var config = this.config;
            var report = config.report;
            var menuID = config.menuID;
            var procName = config.procName;
            var reportName = config.reportName;

            var exec_string = "get" + report + "(menuID, report, procName, reportName)"

            eval(exec_string);
          }
        }
      },
      {
        view: "icon", icon: "far fa-window-minimize", tooltip: "Свернуть", css: "headerLine",
        click: function () {
          minmizeWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-expand", tooltip: "На весь экран", css: "headerLine",
        click: function () {
          expandWindow(this);
        }
      },
      {
        view: "icon", icon: "fas fa-times", tooltip: "Закрыть окно", css: "headerLine",
        click:
          function () {
            closeWindow(this);
          }
      }
    ]
  },
  body: {
    cols: [
      visitPhotoAll, 
      { view: "resizer" },
      {
        id: "visit_right_panel", view: "scrollview", scroll: "y", minWidth: 500,  
        body: {
          rows: [
            visitHeader,
            visitArt
          ]
        }                
      }
    ]
  },
  on: {
    onBeforeShow: function () {
      if (this.isVisible()) {
        return; // Прерываем выполнение, чтобы не сбрасывать состояние кнопок
      }

      $$("save_btn").hide();
    },
    onHide: function () {
      if (this._win_resize) webix.eventRemove(this._win_resize);
    },
    onViewMoveEnd: function () {
      onViewModeEnd(this);
    },
    onHide: function () {
      onHideWindow(this);
    },
    onViewResize: function () {
      setWindowSize(this.config.id);
    }

  }
};

// окно для фото
var winPhoto = {
  view: "window", id: "winPhoto", move: false, resize: false, head: false, escHide: true, modal: true, minHeight: 300, minWidth: 300, css: "transparent-window",
  body: {    
    cols: [
      {
        width: 400,
        rows: [
          {
            cols: [
              {
                cols: [
                  { view: "icon", icon: "fas fa-save", tooltip: "Сохранить фото", click: "savePhotoPro()" },
                  { view: "icon", icon: "fas fa-search-plus", tooltip: "Увеличить фото", click: "zoomPro()" },
                  { view: "icon", icon: "fas fa-redo", tooltip: "Повернуть фото", click: "RotatePhotoPro()" },
                  { view: "icon", icon: "fas fa-map-marked-alt", tooltip: "На карте", click: "getGeo()" },
                  { view: "icon", icon: "fas fa-eye", id: "icnHidePhoto", tooltip: "Скрыть фото от клиента", click: "onHidePhoto()", hidden: (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') },
                  { view: "icon", icon: "fas fa-search", id: "icnToggleMagnifier", tooltip: "Включить лупу", click: "toggleMagnifier()", css: "icon-magnifier-off" },
                  {},
                  { view: "icon", icon: "fas fa-angle-double-left", tooltip: "Следующее фото", click: "showPrevImage()" },
                  { view: "icon", icon: "fas fa-angle-double-right", tooltip: "Предыдущее фото", click: "showNextImage()" },
                  {},
                  { view: "icon", id: "icnCheckPhoto", click: "setCheckPhoto()" }
                ]
              },
            ]
          },
          {
            cols: [
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblBorned', template: "Дата:", width: 130 },
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblGeoTime', template: "Время ФО:", width: 150 },
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblStart', template: "Начало визита:" },
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblFinish', template: "Окончание визита:" },
            ]
          },
          { height: 5, },
          {
            cols: [
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblOfficeName', template: "Офис:" },
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCityName', template: "Город:" },
            ]
          },
          {
            cols: [
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblNetworkName', template: "Сеть:" },
              { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblName', template: "Вывеска:" },
            ]
          },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblAdress', template: "Адрес:" },

          { height: 10, },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblUserName', template: "Сотрудник:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblMasterName', template: "Руководитель:" },
          { height: 10, },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCategory', template: "Категория фотоотчета:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblActionName', template: "Анкета:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblQuestionName', template: "Вопрос:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblBrand', template: "Бренд:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblArtName', template: "SKU:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblArtCategoryName', template: "Категория SKU:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblCompany', template: "Компания:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblDescription', template: "Комментарий:" },
          { view: "template", css: "photo_window_labels", autoheight: true, id: 'lblTask', template: "Комментарий к фото:" },
          { view: "button", id: 'btnPlanograms', label: 'Планограммы', click: function () { getPlanograms() }, hidden: (localStorage.getItem('CompanyID') != 111) },
          {
            id: "areaRecognize",
            rows: [
              {
                view: "button", label: "Показать распознанные SKU",
                on: {
                  onItemClick: function () {
                    resultArtPhoto(null);
                  }
                }
              },
              {
                view: "datatable", id: "recSKU", select: true, resizeColumn: true, fixedRowHeight: false, rowHeight: 24,
                columns: [
                  //{ id: "BrandName", header: [(isEng) ? 'Brand' : "Бренд", { content: "excelFilter", mode: "text" }], minWidth: 90, sort: "string" },
                  { id: "ArtName", header: [(isEng) ? 'Name' : "Название", { content: "textFilter" }], width: 150, minWidth: 40, fillspace: true, sort: "string" },
                  { id: "CCount", header: [(isEng) ? 'Faces' : "Фейсы", { content: "textFilter" }], width: 50, minWidth: 10, sort: "int", css: { 'text-align': 'center' } }
                ],
                on: {
                  onItemClick: function (id) {
                    var item = this.getItem(id);
                    resultArtPhoto(item.ArtID);
                  }
                }
              }
            ]
          },
          { id: "freeArea", gravity: 10 },
          { view: "template", css: "photo_window_labels", autoheight: true, template: "<big>Комментарий к фото</big>", css: { 'text-align': 'center' } },
          {
            cols: [
              { view: "textarea", id: 'newTaskTextPro', maxHeight: 100, minHeight: 40, height: 70, placeholder: (isEng) ? "Enter text" : "Введите текст комментария", type: "clean", css: { 'background': '#dadee0' } },
              {
                view: "icon", icon: 'fas fa-paper-plane', tooltip: "Отправить комментарий к фото",
                on: {
                  onItemClick: function () {
                    var text = $$('newTaskTextPro').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
                    $$('newTaskTextPro').setValue('');

                    if (text == '') {
                      webix.message({ type: "error", text: (isEng) ? "Enter text" : "Введите текст комментария", expire: 1000 });
                      return;
                    }
                    $.ajax({
                      url: '../../Services/UI.asmx/SetTask',
                      timeout: 120000,
                      data: JSON.stringify({ 'Author': localStorage.getItem('Author'), 'Point': pointID, 'Acceptor': acceptor, 'Text': ('Комментарий к фото от ' + borned + ': ' + text), 'GUID': GUID, 'PhotoID': currentPhotoID }),
                      success: function (data) { webix.message({ type: "success", text: "Комментарий к фото отправлен", expire: 2000 }); },
                      error: function (xhr, ajaxOptions, thrownError) { alert(xhr.responseText); }
                    });
                  }
                }
              }
            ]
          },
          { height: 60, }
        ]
      },
      {
        rows: [
          { view: "template", scroll: false, id: "photoDivFull2", template: "<img src='' id='photofull2' onclick='zoomPro()'/>", type: "line", css: "centered-photo-container" },     
          { view: "template", id: "templateCanvasTestArt",  content: "canvasTestArtPic", scroll: false, hidden: true,  css: "centered-photo-container"  }
          //{ view: "template", id: "templateCanvasTestArt", content: "canvasTestArtPic", scroll: "xy", hidden: true }
        ]
      },
      {
        view: "dataview", select: true, id: "rightPhotoList", width: 200, css: "active-photo-list", select: true, //autoheight: true,
        type: {
          width: 198, height: 268,
          template: function (obj) {
            function getPhotoLabels(obj) {
              // Список полей, которые мы хотим проверить
              const fields = [
                obj.CompanyName,
                obj.ActionName,
                obj.CategoryName,
                obj.BrandName,
                obj.ArtName,
                obj.QuestionName,
                obj.Answer
              ];

              // Фильтруем: убираем null, undefined и пустые строки Затем соединяем оставшееся через тег <br>
              return fields.filter(val => val !== undefined && val !== null && String(val).trim() !== "").join("<br>");
            }

            const infoText = getPhotoLabels(obj);

            return `<div class="photo-item-wrapper"><img src="${obj.Link}" class="responsive-photo" /><div class="photo-info-layer">${infoText}</div> 
              <input type="checkbox" title="подтверждение фото" class="photo-checkbox webix_table_checkbox" ${obj.IsPhotoCheck ? "checked" : ""} /></div>`;
          }
        },
        on: {
          onItemClick: function (id, e) {
            var item = this.getItem(id);
            if (item == null)
              return;

            e.stopPropagation();

            currentPhotoList = this.config.id;
            currentPhotoID = item.PhotoID;

            if (currentPhotoID == null)
              return

            var itemWindow = $$('menuUtility').getItem(61);
            if (itemWindow != null)
              showReport(itemWindow);

            e.stopPropagation();
            
          },
          onAfterLoad: function () {
            if (currentPhotoID) this.select(currentPhotoID);
          }
        }
      }
    ]    
  },
  on: {
    onBeforeShow: function () {   
      let body = this.getBody();

      if (!this.queryView({ icon: "fa-2x fas fa-times" })) {
        // Добавляем в самый верх первого столбца rows
        body.getChildViews()[0].addView({
          view: "icon", icon: "fa-2x fas fa-times", width: 50, height: 50, css: "floating-close-btn",  click: () => this.hide() }, 0); 
      }      
    },
    onShow: function () {
      // 3. Следим за изменением размера вкладки браузера
      this._win_resize = webix.event(window, "resize", () => {
        if (this.isVisible()) {
          this.define({
            width: window.innerWidth,// - 3,
            height: window.innerHeight// - 48
          });
          this.resize();
        }
      });
      // Для работы Esc
      webix.UIManager.addHotKey("esc", () => {
        if (this.isVisible()) this.hide();
      }, this);

      // Устанавливаем фокус
      webix.UIManager.setFocus(this);      
    },
    onHide: function () {
      if (this._win_resize) webix.eventRemove(this._win_resize);
    }
  }  
};

// в нижней строке показывает метку открытого окна
var iconTask = {
  view: "button", type: "icon", icon: "", autowidth: true, label: "", x: 5, y: 40, css: "toolbarHeader",
  on: {
    onItemClick: function (id) {
      clearUnderline();

      var win = $$(id.replace("task", "win"))

      win.show();
      currentMenuID = this.config.menuID;
      currentReport = win.config.id.replace('win_', '');

      $$('popupRightMenu').hide();

      setUnderline(id);
    }
  }
}

function onHideWindow(window) {
  if (isHide == 1) {
    var taskName = window.config.id.replace("win", "task");

    try {
      $$("taskBar").removeView(taskName);

      if ($$("taskBar").getChildViews().length == 0) {
        $$('btnHideAll').hide();
        $$('btnCloseAll').hide();
        currentMenuID = -1;
        currentReport = '';
      }
    } catch (err) { }        
  }
  else isHide = 0;  
  
}

function onViewModeEnd(window) {
  var task = $$("task_" + window.config.id.replace("win_", ""));
  if (task != null) {
    task.define("x", window.getNode().offsetLeft);
    task.define("y", window.getNode().offsetTop);
    task.refresh();
  }

  setWindowSize(window.config.id);
}

function closeWindow(window) {
  var winName = window.config.id.replace("iconNormalscreen", "win");

  setWindowSize(winName);
  $$(winName).hide();
}

function setWindowSize(winName) {
  var win = $$(winName); 

  var offsetX = win.config.left;
  var offsetY = win.config.top;
  var width = win.config.width;
  var height = win.config.height;
  var menuID = win.config.menuID;

  if (menuID > 1000000)
    return;

  var isAdjust = 0;

  $.ajax({
    url: '../../Services/Framework.asmx/SetWindowUserMap',
    timeout: 120000,
    data: JSON.stringify({ 'Menu': menuID, 'User': localStorage.getItem('Author'), 'OffsetX': offsetX, 'OffsetY': offsetY, 'Width': width, 'Height': height, 'IsAdjust': isAdjust }),
    success: function (data) {
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });
}

function expandWindow(currentIcon) {
  var winName = currentIcon.config.id.replace("iconFullscreen", "win");

  icon = currentIcon.config.icon;

  var win = $$(winName);

  if (icon == 'fas fa-expand') {
    var width = window.innerWidth - 3;
    var height = window.innerHeight - 48;

    win.define("width", width);
    win.define("height", height);
    win.resize();

    win.setPosition(1, 48);
    win.config.move = false;
    win.config.resize = false;

    currentIcon.define({ icon: "fas fa-compress", tooltip: "Стандартный размер" });
  }
  else {
    win.define("width", ordinaryWidth);
    win.define("height", ordinaryHeight);
    win.resize();

    win.setPosition(ordinaryX, ordinaryY);
    win.config.move = true;
    win.config.resize = true;

    currentIcon.define({ icon: "fas fa-expand", tooltip: "На весь экран" });
  }

  currentIcon.refresh(); 
}

function expandWindowPhoto(win) {
  var width = window.innerWidth;// - 3;
  var height = window.innerHeight;// - 48;

  win.define("width", width);
  win.define("height", height);
  win.resize();

  win.setPosition(1, 1 /*48*/);
  win.config.move = false;
  win.config.resize = false;

  win.show();
}

function minmizeWindow(window) {
  var win = $$(window.config.id.replace("iconMinimize", "win"));

  isHide = 0;
  
  win.hide();
}