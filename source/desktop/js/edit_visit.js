// ----- Создание и правка отчетов
var questionOptions;
var editMode = false;

// Отчет План-факт2 из админки
var addReportPlanFact2 = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'right' } },
    { id: "NetworkCode2", header: ["Код тт 1С", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'right' } },
    { id: "OutCode", header: ["Код ТТ клиента", { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", css: { 'text-align': 'right' } },
    { id: "CompanyName", header: ["Клиент", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "OfficeName", header: ["Рег. офис", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 90, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 80, sort: "string" },
    { id: "MerchName", header: ["Мерчандайзер", { content: "excelFilter", mode: "text" }], width: 130, minWidth: 40, sort: "string" },
    { id: "MerchID", header: ["ID МЕ", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "PlanVisit", header: ["Визитов (п)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "FactVisit", header: ["Визитов (ф)", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Delta", header: ["Разница", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "Day1", header: ["1", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day2", header: ["2", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day3", header: ["3", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day4", header: ["4", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day5", header: ["5", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day6", header: ["6", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day7", header: ["7", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day8", header: ["8", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day9", header: ["9", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day10", header: ["10", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day11", header: ["11", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day12", header: ["12", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day13", header: ["13", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day14", header: ["14", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day15", header: ["15", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day16", header: ["16", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day17", header: ["17", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day18", header: ["18", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day19", header: ["19", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day20", header: ["20", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day21", header: ["21", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day22", header: ["22", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day23", header: ["23", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day24", header: ["24", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day25", header: ["25", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day26", header: ["26", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day27", header: ["27", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day28", header: ["28", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day29", header: ["29", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day30", header: ["30", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } },
    { id: "Day31", header: ["31", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", cssFormat: 'zero_red', css: { 'text-align': 'center' } }
  ],
  on: {
    onItemClick: function (id, e) {
      var item = this.getItem(id);
      if (item == null)
        return;

      closeAllFilters(this);

      if (id.column.indexOf("Day") === 0) { 
        e.stopPropagation();

        // --- ПРОВЕРКА НА ПУСТОЕ ЗНАЧЕНИЕ ---
        var cellValue = item[id.column];
        if (cellValue === "" || cellValue === null || typeof cellValue === "undefined") {
          return false; // Прекращаем выполнение, если в ячейке пусто
        }

        var start = webix.i18n.parseFormatStr($$('Start').getValue());
        var selectedDate = $$('Start').getValue();
        if (!selectedDate) return;

        // 2. Извлекаем номер дня из "Day21" -> 21
        var dayNumber = id.column.replace("Day", "");
        // Добавляем ведущий ноль: 5 -> 05
        var formattedDay = ("0" + dayNumber).slice(-2);

        // 3. Получаем Месяц и Год (JS методы:getMonth() возвращает 0-11, поэтому +1)
        var mm = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        var yyyy = selectedDate.getFullYear();

        // 4. Собираем строку ДД.ММ.ГГГГ
        var newDateStr = formattedDay + "." + mm + "." + yyyy;

        VisitPointID = item.PointID;
        VisitUserID = item.MerchID;
        VisitBorned = newDateStr;
        VisitGUID = "";  // item.GUID;

        var itemWindow = $$('menuUtility').getItem(60);
        if (itemWindow != null)
          showReport(itemWindow);

        e.stopPropagation();
        return false;
      }
    }
  }
}

function zero_red(value, config) {
  if (value == '' && value != 0)
    return { "text-align": "center" };
  else {

    if (value == '0' || value == '0,00')
      return { "background-color": "#ff4d4d", "text-align": "center" };
    else
      return { "text-align": "center" };
  }
};

// -------------------- Функционал Информация по визиту
var VisitPointID, VisitUserID, VisitBorned, VisitGUID;

var visitPhotoAll = {
  id: "visitPhotoAlls", width: 400, minWidth: 200,//autoheight: false, scroll: "y",
  rows: [
    { view: "template", id: "visitPhotoAllCaption", autoheight: true, template: "Все фото", css: "visit-caption" },
    {
      view: "dataview", select: true, id: "visitPhotoAll", 
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

          /*const editButtons = editMode ? `<div class="photo-delete-icon" title="Удалить фото"><i class="fas fa-times"></i></div> 
            <div class="photo-replace-icon" title="Заменить фото"><i class="fas fa-exchange-alt"></i></div>`: ``;*/

          const editButtons = editMode ? `<div class="photo-delete-icon" title="Удалить фото"><i class="fas fa-times"></i></div>`: ``;


          return `<div class="photo-item-wrapper">${editButtons}<img src="${obj.Link}" class="responsive-photo" /><div class="photo-info-layer">${infoText}</div> 
            <input type="checkbox" title="Подтверждение фото" class="photo-checkbox webix_table_checkbox" ${obj.IsPhotoCheck ? "checked" : ""} /></div>`;
        }
      },
      on: {
        onMouseMove: function (id, e) {
          const item = this.getItem(id);
          const node = window.photoPreviewNode;

          if (window.previewForceHideTimerLeft) clearTimeout(window.previewForceHideTimerLeft);

          if (item && node) {
            // Чтобы не перерисовывать одно и то же фото при движении мыши внутри одной карточки
            if (node._lastId === id) return;
            node._lastId = id;

            // 1. Получаем DOM-элемент текущей карточки в Dataview
            const itemNode = this.getItemNode(id);
            const rect = itemNode.getBoundingClientRect();

            // 2. Сначала наполняем контент, чтобы браузер рассчитал размер попапа
            node.innerHTML = `<img src="${item.Link}" style="max-width:500px; max-height:500px; display:block;" />`;
            node.style.display = "block";

            // Принудительное скрытие через 3 секунды (на случай зависшей загрузки)
            if (window.previewForceHideTimerLeft) clearTimeout(window.previewForceHideTimerLeft);
            window.previewForceHideTimerLeft = setTimeout(() => {
              if (node && node.style.display === 'block') {
                node.style.display = 'none';
                node._lastId = null;
              }
            }, 3000);

            // 3. Вычисляем размеры превью после отрисовки
            const pWidth = node.offsetWidth;
            const pHeight = node.offsetHeight;

            // 4. Расчет позиции X (по умолчанию справа от карточки)
            let left = rect.right + 10;
            // Если справа не влезает — выводим слева от карточки
            if (left + pWidth > window.innerWidth) {
              left = rect.left - pWidth - 10;
            }

            // 5. Расчет позиции Y (по умолчанию по нижней линии карточки, чуть выше)
            let top = rect.bottom - 100;
            // Если уходит под нижний край экрана — поднимаем вверх
            if (top + pHeight > window.innerHeight) {
              top = window.innerHeight - pHeight - 20;
            }
            // Защита от ухода за верхний край
            if (top < 10) top = 10;

            // 6. Применяем итоговые координаты
            node.style.left = left + "px";
            node.style.top = top + "px";
          }
        },
        onMouseOut: function () {
          const node = window.photoPreviewNode;
          if (node) {
            if (window.previewForceHideTimerLeft) clearTimeout(window.previewForceHideTimerLeft);
            node.style.display = "none";
            node._lastId = null;
          }
        },
        onItemClick: function (id, e) {
          const item = this.getItem(id);

          if (e.target?.classList.contains('photo-checkbox')) {            
            const newStatus = item.IsPhotoCheck ? 0 : 1;
            item.IsPhotoCheck = newStatus;
            e.target.checked = !!newStatus;

            $.ajax({
              url: '../../Services/UI.asmx/SetPhotoCheck2',
              data: JSON.stringify({ 'ID': item.PhotoID, 'Status': newStatus, 'User': localStorage.getItem('Author') }),
              error: function (xhr, ajaxOptions, thrownError) { alert(xhr); }
            });

            return false;
          }

          // Удаление из Dataview
          if (e.target?.closest('.photo-delete-icon')) {
            processPhotoDelete(item.PhotoID);
            return false;
          }          

          // Замена из Dataview
          /*if (e.target?.closest('.photo-replace-icon')) {
            processPhotoReplace(item.PhotoID);
            return false;
          }*/
          
          showPhotoVisit(this, id, e);
        }
      }
    }
  ]
}

function processPhotoDelete(photoID) {
  webix.confirm({
    title: "Удаление фото",
    text: "<div class='alert-wrapper'><div class='alert-text'>Это действие нельзя отменить.<br><br>Подтверждаете удаление фото?</div></div>",
    ok: "Удалить",
    cancel: "Отмена",
    width: 500,
    type: "confirm-warning",
    css: "delete_alert_style",
    callback: function (result) {
      if (result) {
        if (window.photoPreviewNode) window.photoPreviewNode.style.display = "none";

        $.ajax({
          url: '../../Services/APP.asmx/DeletePhotoVisit',
          data: JSON.stringify({ 'User': VisitUserID, 'Photo': photoID }),
          success: function (data) {

            // 1. Обновляем основной список (unitlist)
            const list = $$("companyActionList");
            if (list) {
              const item = list.find(obj => obj.photos && obj.photos.some(p => p.photoID == photoID), true);
              if (item) {
                item.photos = item.photos.filter(p => p.photoID != photoID);
                list.updateItem(item.id);
              }
            }

            // 2. Обновляем галерею (dataview)
            const dv = $$("visitPhotoAll");
            if (dv) {
              // Ищем ID элемента в dataview по значению PhotoID
              const dvId = dv.find(obj => obj.PhotoID == photoID , true);
              if (dvId) {
                dv.remove(dvId.id); 
              }
            }

            // 3. Очищаем глобальный кэш данных
            if (window.lastRawData) {
              window.lastRawData = window.lastRawData.filter(r => r.PhotoID != photoID);
            }

          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr);
          }
        });  
      }
    }
  });
}

/*function processPhotoReplace(photoID) {
  webix.confirm({
    title: "Замена фото",
    width: 500,
    text: "<div class='alert-wrapper'><i class='fas fa-info-circle' style='font-size:32px; color:#1890ff;'></i><div class='alert-text'>Это действие нельзя отменить.<br><br>Подтверждаете замену текущего фото на новое?</div></div>",
    ok: "Выбрать новое",
    cancel: "Отмена",
    css: "delete_alert_style",
    callback: function (result) {
      if (result) {
        //const id = this.locate(e);
        //window.currentUploadItem = this.getItem(id); // Запоминаем текущий вопрос
        //$$("photo_uploader").fileDialog();


        const uploader = $$("photo_uploader");
        if (uploader) {
          if (window.photoPreviewNode) window.photoPreviewNode.style.display = "none";

          uploader.config.formData = { PhotoID: photoID, Author: localStorage.getItem('Author') };
          uploader.fileDialog();
        }
      }
    }
  });
}*/

var visitHeader = {
  id: "tableInfos", autoheight: true, 
  cols: [
    {
      rows: [
        { view: "template", id: "tableInfoCaption", autoheight: true, width: 600, template: "Информация по визиту", css: "visit-caption" },
        {
          view: "datatable", id: 'tableInfo', select: true, header: false, autoheight: true, scroll: false, fixedRowHeight: false, rowHeight: -1,
          columns: [
            { id: "Name", width: 190, minWidth: 40, sort: "string" },
            { id: "Value", fillspace: true, minWidth: 40, sort: "string", css: { 'line-height': '1 !important' } },
          ],
          on: {            
            onResize: function () { this.adjustRowHeight("Value"); },
            onAfterLoad: function () { this.adjustRowHeight("Value"); }
          }
        }
      ]
    },
    {
      rows: [
        { view: "template", id: "tablePointInfoCaption", autoheight: true, width: 250, template: "Информация по тт", css: "visit-caption" },
        {
          view: "combo", id: "visitCompany", label: "Компания:", labelWidth: 80, placeholder: "Выберите компанию", tooltip: "Компания",
          options: {
            body: { data: [] }
          },
          on: {
            onChange: function (newValue) {
              // фильтрация клиентов в анкетах
              var list = $$('companyActionList');
              if (!list) return;

              if (newValue == -1 || !newValue) {
                // Если выбрано "Все клиенты" или значение сброшено — показываем всё
                list.filter();
              } else {
                // Фильтруем список по полю companyId, которое мы сохранили при парсинге
                list.filter(function (obj) {
                  return obj.companyID == newValue;
                });
              }

              // фильтрация фото слева
              var list = $$('visitPhotoAll');
              if (!list) return;

              if (newValue == -1 || !newValue) {
                // Если выбрано "Все клиенты" или значение сброшено — показываем всё
                list.filter();
              } else {
                // Фильтруем список по полю companyId, которое мы сохранили при парсинге
                list.filter(function (obj) {
                  return obj.CompanyID == newValue;
                });
              }
            }
          }
        },
        {
          view: "datatable", id: 'tablePointInfo', select: true, scroll: false, rowHeight: 24, header: false,
          columns: [
            { id: "Name", header: ["Матрицы по точке"], width: 150, minWidth: 40, sort: "string" },
            { id: "Value", header: ["Кол-во sku"], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center', 'text-decoration': 'underline', 'color': 'blue' } }
          ],
          on: {
            onItemClick: function (id) {
              var item = this.getItem(id);
              if (id.column == 'Value' && item.Value != '0') {
                $.ajax({
                  url: '../../Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Point", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                $.ajax({
                  url: '../../Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Format", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                $.ajax({
                  url: '../../Services/Report.asmx/SetReportDictionary',
                  data: JSON.stringify({ 'ProcName': "Network", 'User': localStorage.getItem('Author'), 'Text': '' }),
                });
                let ProcName, ProcName2, MenuID
                if (item.Name == 'Матрица по тт') { ProcName = "Point", MenuID = 63 }
                else if (item.Name == 'Матрица по формату') { ProcName = "Format", ProcName2 = "Network", MenuID = 64 }
                else if (item.Name == 'Матрица по сети') { ProcName = "Network", MenuID = 65 }

                const itemWindow = $$('menuUtility').getItem(MenuID);
                if (itemWindow != null) {
                  $.ajax({
                    url: '../../Services/Report.asmx/SetReportDictionary',
                    data: JSON.stringify({ 'ProcName': ProcName, 'User': localStorage.getItem('Author'), 'Text': item.ID }),
                    success: function () {
                      if (ProcName2 != null)
                        $.ajax({
                          url: '../../Services/Report.asmx/SetReportDictionary',
                          data: JSON.stringify({ 'ProcName': ProcName2, 'User': localStorage.getItem('Author'), 'Text': item.ID2 }),
                          success: function () {
                            showReport(itemWindow);
                          },
                        });
                      else {
                        showReport(itemWindow);
                      }
                    },
                  });
                }
              }
            }
          }
        },
        {
          view: "button", value: "Задание к ТТ", css: "webix_primary",
          click: function (id) {
            tasks2.Point = VisitPointID;
            tasks2.User = VisitUserID;
            tasks2.Borned = VisitBorned;

            var itemWindow = $$('menuUtility').getItem(118);
            if (itemWindow != null)
              showReport(itemWindow);
          }
        },
        {
          view: "button", value: "Править", id: "edit_btn", css: "webix_primary", hidden: (localStorage.getItem('IsTask') === '0'), hidden: true, 
          click: function () {
            this.hide(); $$("save_btn").show();

            editMode = true;

            $.ajax({
              url: '../Services/Visit.asmx/SetVisit',
              data: JSON.stringify({ 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned }),
              success: function (data) {                
              },
              error: function (xhr, ajaxOptions, thrownError) {
                onError();
              }
            });

            getFullMatrixByVisit();
          }
        },
        {
          view: "button", value: "Сохранить", id: "save_btn", css: "webix_primary", hidden: true, 
          click: function () {            
            this.hide(); $$("edit_btn").show();

            editMode = false;

            getFullMatrixByVisit();
          }
        }
      ]
    },
    {}
  ]
}

function showPhotoVisit(table, id, e) {
  var item = table.getItem(id);
  if (item == null)
    return;

  e.stopPropagation();

  currentPhotoList = table.config.id;
  currentPhotoID = item.PhotoID;

  if (currentPhotoID == null)
    return

  var itemWindow = $$('menuUtility').getItem(61);
  if (itemWindow != null)
    showReport(itemWindow);

  e.stopPropagation();
}

var visitArt = {
  id: "tableArts", 
  rows: [
    {
      view: "unitlist",
      id: "companyActionList",
      uniteBy: function (obj) {
        return obj.companyName || "Без названия";
      },
      type: {
        height: "auto",

        template: function (obj) {
          var readOnlyAttr = !editMode ? "readonly" : "";
          var disabledAttr = !editMode ? "data-readonly='1'" : "";

          // Общий стиль обязательности
          var required = obj.isRequired ? "<span style='color:#e74c3c; font-size:18px; font-weight:900; margin-right:5px; vertical-align:middle;'>*</span>" : "";

          // Стили для инпутов
          var inputStyle = "margin-left:8px; border:1px solid #ccc; border-radius:3px; padding:2px 5px; font-weight:bold; color:#000; font-family:inherit; vertical-align:middle;";

          // Стиль для ответов на вопросы перечислимых типов: 1, 3, 4, 5, 8, 10
          var answerText = getAnswerHtml(obj, inputStyle, readOnlyAttr, disabledAttr);

          // Стиль для анкеты
          if (obj.type === "action_header") {
            var arrow = obj.collapsed ? "wxi-angle-right" : "wxi-angle-down";
            var actionPhoto = "";

            if (obj.url) {
              actionPhoto = "<img src='" + obj.url + "' class='art-photo-trigger' " +
                "style='width:28px; height:28px; object-fit:cover; border-radius:3px; " +
                "margin-right:10px; vertical-align:middle; cursor:pointer; border:1px solid #bdc3c7;'>";
            }

            var rightContent = getRightContentHtml(obj.specialInfo)

            return "<div style='font-weight:bold; background:#edf2f7; padding:5px 10px; color:#2d3748; " +
              "border-left:4px solid #4a5568; display:flex; align-items:center; min-height:35px; cursor:pointer; box-sizing:border-box;'>" +
              "<span class='webix_icon " + arrow + "' style='margin-right:8px; color:#7f8c8d; flex-shrink:0;'></span>" + actionPhoto +
              "<span style='flex-grow:1; flex-shrink:1; white-space:normal; word-wrap:break-word; margin-right:10px; line-height:1.2;'>" + obj.displayName + "</span>" +
              "<div style='flex-shrink:0; display:flex; align-items:center;'>" + rightContent + "</div></div>";
          }

          // Стиль для вопроса 
          if (obj.type === "question_item" || obj.type === "art_question_item") {
            // 1. Основное фото или иконка (слева)          
            var questionPhoto = obj.url
              ? "<img src='" + obj.url + "' class='art-photo-trigger' style='width:24px; height:24px; object-fit:cover; border-radius:3px; margin-right:8px; cursor:pointer; border:1px solid #ccc;'>"
              : "<span class='fa fa-question-circle' style='font-size:18px; margin-right:8px; color:#3498db;'></span>";
                         
            // 2. Логика для типов 7 и 13 (Ряд миниатюр справа)
            var extraPhotos = "";
            if ((obj.questionTypeID == 7 || obj.questionTypeID == 13) && obj.photos && obj.photos.length > 0) {
              extraPhotos = "<div style='margin-left:10px; display:flex; gap:4px; flex-shrink:0;'>";
              obj.photos.forEach(function (photo) {
                var pUrl = (typeof photo === "string") ? photo : photo.url;
                extraPhotos += "<img src='" + pUrl + "' class='art-photo-trigger' " +
                  "data-custom-url='" + pUrl + "' " +
                  "data-photo-id='" + photo.photoID + "' " +
                  "style='width:24px; height:24px; object-fit:cover; border-radius:2px; border:1px solid #eee; cursor:pointer;'>";
              });
              extraPhotos += "</div>";
            }

            // Определяем отступ: 5px для обычного вопроса, 40px для вопроса по SKU, +15/20px для ветвлений
            var leftPadding = "5px";
            if (obj.type === "art_question_item") {
              leftPadding = obj.dependent ? "55px" : "40px";
            } else if (obj.type === "question_item" && obj.dependent) {
              leftPadding = "20px";
            }

            // Финальная сборка
            return "<div style='padding-left:" + leftPadding + "; padding-right:15px; display:flex; align-items:center; width:100%; box-sizing:border-box;'>" +
              questionPhoto + required + "<span style='white-space:nowrap; flex-shrink:0;'>" + obj.displayName + "</span>" +
              "<div style='flex-grow:1; display:flex; align-items:center;'>" + answerText + "</div>" + extraPhotos + "</div>";
          }


          // Стиль для SKU
          if (obj.type === "art_item") {
            var photoContent = "";
            if (obj.url) {
              photoContent = "<img src='" + obj.url + "' class='art-photo-trigger' " +
                "style='width:24px; height:24px; object-fit:cover; border-radius:3px; " +
                "margin-right:8px; vertical-align:middle; cursor:pointer; border:1px solid #ccc;'>";
            } else {
              photoContent = "<span class='fa fa-cube' style='font-size:18px; margin-right:8px; color:#95a5a6; vertical-align:middle;'></span>";
            }

            var rightContent = getRightContentHtml(obj.specialInfo)

            return "<div style='padding-left:5px; color:#2b6cb0; font-weight:500; display:flex; align-items:center; width:100%; box-sizing:border-box;'>" +
              "<div style='display:flex; align-items:center; flex-shrink:0;'>" +
              photoContent + "<span>" + obj.displayName + "</span>" +
              "</div>" +
              rightContent +
              "</div>";
          }

          return obj.displayName;
        },
        templateHeader: function (value) {
          return "<div style='font-weight:900; color:#1a202c; border-bottom:2px solid #cbd5e0;'>" + value + "</div>";
        }
      },      
      on: {
        // Вешаем нативный обработчик на весь контейнер списка
        onAfterRender: function () {          
          this.$view.onchange = (e) => {
            const target = e.target;

            // если простые типы: 1, 10, 3, 4, 8
            if (target.classList.contains("answer-editor") || target.classList.contains("master-question-trigger")) {
              const id = this.locate(e);
              const item = this.getItem(id);
              let val = target.value;

              //преобразование даты
              if (item.questionTypeID == 8 && val) {
                const parts = val.split('-');
                if (parts.length === 3) {
                  val = parts[2] + '.' + parts[1] + '.' + parts[0];
                }
              }

              // 1. Обновляем данные локально
              var answerText = val; // по умолчанию
              var finalOptionID = item.optionID; // по умолчанию -1

              // Для Да/Нет (тип 1 или 10) корректируем
              if ((item.questionTypeID == 1 || item.questionTypeID == 10) && val !== "") {
                answerText = (val == "1") ? "Да" : "Нет";
                finalOptionID = (val == "1") ? 1 : 0; // отправляем 1 или 0 как OptionID
              }

              if (item.specialInfo)
                item.specialInfo.answer = answerText;
              else
                item.answer = answerText;

              // 2. Обновляем глобальный rawData (для сохранения)
              if (window.lastRawData) {
                window.lastRawData.forEach(r => {
                  if (r.ActionID === item.actionID && r.ArtID === item.artID && r.QuestionID === item.questionID) {
                    r.Answer = answerText;
                  }
                });
              }

              saveAnswerToServer(item.actionID, item.artID, item.masterID, item.questionID, finalOptionID, answerText, item.GUID);

              // Остальная логика (master-question-trigger и т.д.)
              if (e.target.classList.contains("master-question-trigger")) {
                window.lastRawData.forEach(r => {
                  if (r.ActionID === item.actionID && r.ArtID === item.artID && r.QuestionID === item.questionID && r.TypeID === 10) {
                    r.Answer = answerText;
                  }
                });
                setActionWithQuestions(window.lastRawData);
              } else {
                this.updateItem(id);
              }

              return false;
            }            
          };           
        },
        
        
        onItemClick: function (id, e) {
          // 1. Клик по миниатюре фото
          const photoEl = e.target.closest(".art-photo-trigger");
          if (photoEl) {
            e.stopPropagation();

            const item = this.getItem(id);
            if (!item) return false;

            // если есть PhotoID у самой миниатюры — берем его
            const photoID = photoEl.getAttribute("data-photo-id");

            if (photoID) {
              // временно подменяем PhotoID (как будто это item из dataview)
              const originalPhotoID = item.PhotoID;
              item.PhotoID = photoID;

              showPhotoVisit(this, id, e);

              // возвращаем обратно (чтобы ничего не сломать)
              item.PhotoID = originalPhotoID;
            } else {
              // fallback — если PhotoID нет, работаем как раньше
              showPhotoVisit(this, id, e);
            }

            return false;
          }

          const item = this.getItem(id);
          if (!editMode) {
            // Не реагируем на клик по самому нижнему уровню
            if (item.type === "art_question_item") return;

            const newState = !item.collapsed;
            this.updateItem(id, { collapsed: newState });

            const checkIsChild = (pType, cType) => {
              if (pType === "action_header") return cType !== "action_header";
              if (pType === "art_item") return cType === "art_question_item";
              return false;
            };

            let startProcessing = false;
            let stopProcessing = false;

            // data.each проходит по ВСЕМ данным, даже скрытым

            this.data.each(function (subItem) {
              if (stopProcessing) return;

              // Нашли элемент, на который нажали — начинаем обработку со следующего
              if (subItem.id === id) {
                startProcessing = true;
                return;
              }

              if (startProcessing) {
                // Если встретили элемент того же уровня (другую Акцию или другой Артикул) — стоп
                if (!checkIsChild(item.type, subItem.type)) {
                  stopProcessing = true;
                  return;
                }

                // Устанавливаем флаг hidden (если родитель свернут — скрываем, если развернут — показываем)
                subItem.hidden = newState;
                // Важно: если мы сворачиваем родителя, то принудительно сворачиваем и вложенные элементы
                if (newState) subItem.collapsed = true;
              }
            }, this, true); // true в конце заставляет перебирать ВСЕ данные

            // Принудительно вызываем фильтр, чтобы Webix перерисовал только те, у кого hidden != true
            this.filter(function (obj) {
              return !obj.hidden;
            });

            if (!editMode) {
              // но разрешаем клик по фото
              if (e.target.closest('.art-photo-trigger')) {
                return;
              }
              return false;
            }
          }

          // Обработка клика по иконке "Добавить фото" (фотоаппарат с плюсом)
          if (e.target?.closest('.photo-upload-trigger')) {

            // В режиме редактирования (editMode должен быть доступен в области видимости)
            if (typeof editMode !== "undefined" && editMode) {
              const item = this.getItem(id);

              const magic = (item.actionID == -1) ? 'PHOTO' : 'ART'

              const now = new Date();
              const dateStr = [
                now.getFullYear(),
                String(now.getDate()).padStart(2, '0'),
                String(now.getMonth() + 1).padStart(2, '0')
              ].join('') + '_' + [
                String(now.getHours()).padStart(2, '0'),
                String(now.getMinutes()).padStart(2, '0'),
                String(now.getSeconds()).padStart(2, '0')
              ].join('');

              // Оптимизированный GUID
              const GUID = `${VisitUserID}_${VisitPointID}_${item.companyID}_-1_-1_${item.artID}_${item.actionID}_${item.questionID}_${dateStr}`;
              
              const uploader = $$("photo_uploader");
              if (uploader) {
                // Вычисляем OptionID для мультифото
                let optionValue = item.optionID;
                if (item.questionTypeID == 13) {
                  const photoCount = (item.photos && item.photos.length) || 0;
                  optionValue = -(photoCount + 1);
                }
                // Передаем ID вопроса, к которому привязываем новое фото
                uploader.config.formData = { 
                  Magic: magic, 
                  User: VisitUserID,
                  Company: item.companyID,
                  Action: item.actionID, 
                  Category: item.categoryID,
                  Brand: -1, 
                  Art: item.artID,
                  Master: item.masterID,
                  Question: item.questionID,
                  Option: optionValue,
                  Answer: item.answer,
                  Description: item.answer,
                  Borned: VisitBorned, 
                  IsBorned: 1,
                  GUID: GUID,
                  Lat: 0,
                  Lon: 0, 
                  Error: 0,
                  GeoTime: null,
                  Point: VisitPointID
                };
                uploader.fileDialog();
              }
              

              return false; // Блокируем стандартное поведение
            }
          }

          if (e && (e.target.tagName === "SELECT" ||
            e.target.tagName === "INPUT" ||
            e.target.tagName === "OPTION" ||
            e.target.classList.contains("answer-editor") ||
            e.target.classList.contains("photo-upload-trigger"))) {
            return false;
          }

          // редактирование мультиселекта
          if (e.target.closest('.multi-select-trigger')) {
            const id = this.locate(e);
            const itemMulti = this.getItem(id);

            // Получаем актуальный ответ из объекта (учитываем возможную вложенность)
            const currentAnswer = (itemMulti.specialInfo ? itemMulti.specialInfo.answer : itemMulti.answer) || "";
            const options = window.questionOptions.filter(o => o.QuestionID == itemMulti.questionID);

            if ($$("multi_popup")) $$("multi_popup").destructor();

            webix.ui({
              view: "popup",
              id: "multi_popup",
              width: 300,
              body: {
                view: "list",
                id: "multi_list_inside",
                data: options,
                autoheight: true,
                template: "<div class='list-item-content'>{common.checkbox()} #Name#</div>",
                type: {
                  checkbox: function (obj) {
                    // Используем актуальную строку из замыкания
                    const vals = currentAnswer.toString().split("|");
                    const isChecked = vals.includes(obj.Name.toString()) ? "checked" : "";
                    return `<input type='checkbox' ${isChecked} class='multi-check' data-opt-id='${obj.ID}' onclick='event.stopPropagation()'>`;
                  }
                },
                onClick: {
                  "list-item-content": function (ev, optId) {
                    const cb = this.getItemNode(optId).querySelector(".multi-check");
                    cb.checked = !cb.checked;
                    // Вызываем обработчик чекбокса вручную
                    this.config.onClick["multi-check"].call(this, ev, optId);
                  },
                  "multi-check": function (ev, optId) {
                    const checkboxes = this.getNode().querySelectorAll(".multi-check:checked");
                    const selectedIds = Array.from(checkboxes).map(cb => cb.getAttribute("data-opt-id"));
                    const newVal = selectedIds.join("|");

                    // Обновляем локально сразу, чтобы при следующем открытии данные были свежие
                    if (itemMulti.specialInfo) itemMulti.specialInfo.answer = newVal;
                    else itemMulti.answer = newVal;

                    handleAnswerUpdateGlobal("companyActionList", itemMulti, newVal, false);
                  }
                }
              }
            }).show(e.target);
            return false;
          }
        },
        onMouseMove: function (id, ev) {
          const e = ev.Event || ev;
          const node = window.photoPreviewNode;
          const target = e.target;

          if (node._hideTimer) clearTimeout(node._hideTimer);

          // Если мышь уже внутри окна превью — ничего не делаем
          if (node && (node._isHovered || node.matches(":hover"))) {
            if (node._hideTimer) clearTimeout(node._hideTimer);
            return; // Если мышь в зоне окна или кнопок — НИЧЕГО не делаем
          }
          
          // Сброс таймера закрытия
          if (node && node._hideTimer) clearTimeout(node._hideTimer);

          // Если мышь НЕ на миниатюре
          if (!target.classList.contains("art-photo-trigger")) {
            if (node && node.style.display === "block" && !node._isHovered) {
              node.style.display = "none";
              node._lastKey = null;
            }
            return;
          }

          const item = this.getItem(id);
          if (!item || !node) return;

          const currentUrl = target.getAttribute("data-custom-url") || item.url;
          if (!currentUrl) return;

          const currentKey = id + "_" + currentUrl;
          if (node._lastKey === currentKey) return;
          node._lastKey = currentKey;

          const itemNode = this.getItemNode(id);
          const rect = itemNode.getBoundingClientRect();

          // Контент
          let content = `<img src="${currentUrl}" style="max-width:500px; max-height:500px; display:block; border-radius:5px 5px 0 0;" />`;

          if (typeof editMode !== "undefined" && editMode) {
            const photoID = target.getAttribute("data-photo-id");

            content += `<div class="photo-preview-menu" style="background:#fff; border:1px solid #ccc; border-top:none; display:flex; justify-content:space-around; padding:10px; border-radius:0 0 5px 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
              <div class="preview-btn-delete" data-row-id="${id}" data-photo-id="${photoID}" style="color:#d9534f; cursor:pointer; font-weight:bold; font-size:13px;">
              <i class="fas fa-trash"></i> Удалить</div>
              </div>`;

            /*content += `<div class="photo-preview-menu" style="background:#fff; border:1px solid #ccc; border-top:none; display:flex; justify-content:space-around; padding:10px; border-radius:0 0 5px 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
              <div class="preview-btn-delete" data-row-id="${id}" data-photo-id="${photoID}" style="color:#d9534f; cursor:pointer; font-weight:bold; font-size:13px;">
              <i class="fas fa-trash"></i> Удалить</div>
              <div class="preview-btn-replace" data-row-id="${id}" data-photo-id="${photoID}" style="color:#0275d8; cursor:pointer; font-weight:bold; font-size:13px;"><i class="fas fa-exchange-alt"></i> Заменить</div></div>`;*/
          }

          node.innerHTML = content;
          node.style.display = "block";

          if (window.previewForceHideTimer) clearTimeout(window.previewForceHideTimer);

          // Принудительное скрытие через 3 секунды (на случай зависшей загрузки)
          if (window.previewForceHideTimer) clearTimeout(window.previewForceHideTimer);
          window.previewForceHideTimer = setTimeout(() => {
            if (node && node.style.display === 'block') {
              node.style.display = 'none';
              node._lastKey = null;
            }
          }, 3000);

          // ПРИВЯЗКА СОБЫТИЙ К ОКНУ (Самое важное)
          node.onmouseenter = () => {
            node._isHovered = true;
            if (node._hideTimer) clearTimeout(node._hideTimer);
          };

          node.onmouseleave = () => {
            node._isHovered = false;
            // Даем маленькую задержку при выходе из окна, 
            // чтобы оно не мигало, если мышь случайно соскочила
            node._hideTimer = setTimeout(() => {
              if (!node._isHovered) {
                node.style.display = "none";
                node._lastKey = null;
              }
            }, 200);
          };         

          // Позиционирование (встык к миниатюре)
          const pWidth = node.offsetWidth;
          const pHeight = node.offsetHeight;
          let left = rect.right; // Без зазора!
          if (left + pWidth > window.innerWidth) left = rect.left - pWidth;

          let top = rect.bottom - 100;
          if (top + pHeight > window.innerHeight) top = window.innerHeight - pHeight - 20;
          if (top < 10) top = 10;

          node.style.left = left + "px";
          node.style.top = top + "px";
        },
        onMouseOut: function (id, ev) {
          const node = window.photoPreviewNode;
          if (!node) return;
          // Мгновенно скрываем окно и отменяем принудительный таймер
          node.style.display = 'none';
          node._lastKey = null;
          if (window.previewForceHideTimer) clearTimeout(window.previewForceHideTimer);
        },
      }
    }        
  ]
}

function handleAnswerUpdateGlobal(listId, item, val, isMaster) {
  const list = $$(listId); // Получаем доступ к списку по ID

  // 1. Локальное обновление
  if (item.specialInfo) item.specialInfo.answer = val;
  else item.answer = val;

  // 2. Глобальное обновление rawData
  if (window.lastRawData) {
    window.lastRawData.forEach(r => {
      if (r.ActionID === item.actionID && r.ArtID === item.artID && r.QuestionID === item.questionID) {
        r.Answer = val;
      }
    });
  }

  if (val && val.toString().includes("|")) {
    const selectedOptions = val.split("|");

    // сначала удаляем ответы в базе 
    $.ajax({
      url: '../../Services/APP.asmx/DeleteMultiAnswer',
      data: JSON.stringify({
        'Point': VisitPointID, 'User': VisitUserID, 'Action': item.actionID, 'Art': item.artID, 'Master': item.masterID, 'Question': item.questionID, 'Borned': VisitBorned  }),
      success: function (data) {
        var displayText = ''
        selectedOptions.forEach(optId => {
          if (optId.trim() !== "") {

            // Находим объект опции в массиве questionOptions
            const currentOption = window.questionOptions.find(o =>
              o.QuestionID == item.questionID && o.ID == optId
            );

            // Получаем имя (если опция не найдена, используем сам ID как запасной вариант)
            const optName = currentOption ? currentOption.Name : optId;

            saveAnswerToServer(item.actionID, item.artID, item.masterID, item.questionID, optId, optName, item.GUID);

            displayText = displayText + ' ' + optName;
          }

          item.answer = displayText;
          list.updateItem(item.id);
        });   
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr);
      }
    });       
  }
}

function saveAnswerToServer(actionID, artID, masterID, questionID, optionID, answer, GUID) {
  var answerText = answer.toString().trim()

  $.ajax({
    url: '../../Services/APP.asmx/SetArt2',
    data: JSON.stringify({
      'Point': VisitPointID, 'User': VisitUserID, 'Action': actionID, 'Art': artID, 'Master': masterID, 'Question': questionID, 'Option': optionID,
      'Answer': answerText, 'GUID': GUID,  'Borned': VisitBorned, 'IsBorned': 1
    }),
    success: function (data) {
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr);
    }
  });  
}

function getFullMatrixByVisit() {
  $.ajax({
    url: '../Services/Visit.asmx/GetFullMatrixByVisit',
    data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'IsEdit': editMode, 'Author': localStorage.getItem('Author'), 'GUID': null }),
    success: function (response) {
      var data = typeof response.d === "string" ? JSON.parse(response.d) : response.d;

      // общий массив данных
      var rawData = data.Table1; 
      window.lastRawData = JSON.parse(JSON.stringify(data.Table1));

      // список ответов перечислимых вопросов
      questionOptions = data.Table2;

      // список компаний вверху
      setCompanies(data.Table3)

      // список анкет
      setActionWithQuestions(rawData)  

      // разрешена или запрещана правка 
      const canEdit = data.Table4 && data.Table4.length > 0 && data.Table4[0].EditMagic === "";

      if (!canEdit)
        $$("edit_btn").hide();
      else
        if (!editMode)
          $$("edit_btn").show();      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });

  // загрузка фото слева
  $.ajax({
    url: '../Services/Visit.asmx/GetPhotoByVisit',
    data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'GUID': null }),
    success: function (data) {
      var list = $$('visitPhotoAll');

      list.clearAll();
      list.parse(data.d);
      list.refresh();

      currentPhotoData = data.d;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });
}

// список компаний сверху
function setCompanies(options) {
  var combo = $$('visitCompany');

  // Проверяем, есть ли данные в options
  if (options && options.length > 0) {
    var list = combo.getPopup().getList();

    list.clearAll();
    list.parse(options);

    combo.setValue(options[0].id);
    combo.show(); // Показываем элемент, если данные есть
  } else {
    combo.hide(); // Скрываем элемент, если список пуст
  }
}

function setActionWithQuestions(rawData) {
  var flatData = [];
  var seenActions = new Set();
  var seenArts = new Set();
  var seenArtQuestions = {};
  var questionsMap = {}

  //Сначала собираем все мастер-ответы для SKU
  var masterAnswersForSku = {}; // ключ: actionKey_ArtID_MasterID, значение: answer

  rawData.forEach(function (item) {
    if (item.TypeID == 10 && item.ArtID != -1 && item.QuestionID != -1) {
      var actionKey = item.CompanyID + "_" + item.ActionID;
      var masterKey = actionKey + "_" + item.ArtID + "_" + item.QuestionID;
      var answerNorm = (item.Answer == "1" || item.Answer == "Да") ? "1" : (item.Answer == "0" || item.Answer == "Нет") ? "0" : "";
      masterAnswersForSku[masterKey] = answerNorm;
    }
  });
    
  rawData.forEach(function (item) {
    if (!item.CompanyID || item.CompanyID == -1 || !item.ActionID) return;

    // Группирующий ключ для UnitList (по Компании)
    var companyName = item.CompanyName || "Без названия";
    
    var actionKey = item.CompanyID + "_" + item.ActionID;

    // Добавляем акцию
    if (!seenActions.has(actionKey)) {
      var promoPrefix = (item.IsPromo == 1) ? "<span style='color:#e53e3e; font-weight:bold; margin-right:5px;'>ПРОМО:</span> " : "";
      var actionName = promoPrefix + (item.ActionName || "Без названия");

      // Ищем вопрос с типом 10 именно для этой акции (без привязки к товару)
      /*var specialQuestionAction = rawData.find(r =>
        r.ActionID === item.ActionID &&
        r.ArtID == -1 &&
        r.TypeID === 10
      );*/

      flatData.push({
        id: "act_" + actionKey,
        companyID: item.CompanyID,
        actionID: item.ActionID,
        categoryID: item.CategoryID,
        artID: item.ArtID,
        masterID: item.MasterID,
        questionID: item.QuestionID,
        optionID: item.OptionID, 
        GUID: item.GUID,
        questionTypeID: item.TypeID,
        magic: item.Magic,
        companyName: companyName,
        displayName: actionName,
        isPromo: item.IsPromo,
        type: "action_header",
        //sortOrder: item.ActionSortOrder || 0,
        url: item.ActionFile,
        specialInfo: null 
        // Добавляем инфо для отрисовки в строке анкеты
        /*specialInfo: specialQuestionAction ? {
          name: specialQuestionAction.QuestionName,
          answer: specialQuestionAction.Answer,
          questionTypeID: 10
        } : null*/
      });
      seenActions.add(actionKey);
    }

    // Добавляем общий вопрос к анкете
    if (item.ArtID == -1) {
      var qKey = actionKey + "_" + item.QuestionID;

      // Для фотоотчетов добавляем BrandID в ключ, чтобы разделить по брендам
      if (item.Magic === 'PHOTO_REPORT' && item.BrandID) {
        qKey += "_" + item.BrandID;
      }

      // 1. Находим "Мастер-ответ" из объекта Акции

      var isVisibleByIsTrue = true;

      // Если это не мастер-вопрос и есть реальная зависимость (MasterID != QuestionID)
      if (item.TypeID != 10 && item.MasterID != -1 && item.MasterID != item.QuestionID) {
        // Ищем ответ на мастер-вопрос среди уже добавленных элементов flatData
        var masterKey = actionKey + "_" + item.MasterID;
        var masterQuestion = flatData.find(f => f.id === "q_" + masterKey);

        if (masterQuestion && masterQuestion.answer) {
          var masterValue = masterQuestion.answer;
          if (masterValue == "1" || masterValue == "Да") {
            isVisibleByIsTrue = (item.IsTrue == 1);
          } else if (masterValue == "0" || masterValue == "Нет") {
            isVisibleByIsTrue = (item.IsTrue == 0);
          } else {
            isVisibleByIsTrue = false;
          }
        } else {
          // Если мастер-вопрос еще не добавлен или нет ответа - не показываем
          isVisibleByIsTrue = false;
        }
      }

      if (isVisibleByIsTrue) {
        if (!questionsMap[qKey]) {
          questionsMap[qKey] = {
            id: "q_" + qKey,
            companyID: item.CompanyID,
            actionID: item.ActionID,
            categoryID: item.CategoryID,
            artID: item.ArtID,
            masterID: item.MasterID,
            questionID: item.QuestionID,
            optionID: item.OptionID, 
            GUID: item.GUID,
            questionTypeID: item.TypeID,
            magic: item.Magic,
            companyName: companyName,
            displayName: item.QuestionName || "Без вопроса",
            type: "question_item",
            //sortOrder: item.SortOrder || 0,
            questionTypeName: item.QuestionTypeName,
            url: item.QuestionFile,
            isRequired: item.IsRequired,
            answer: item.Answer || "",
            isTrue: item.IsTrue,
            dependent: (item.MasterID != -1 && item.MasterID != item.QuestionID && item.TypeID != 10),
            photos: []
          };
          flatData.push(questionsMap[qKey]);
        }
      }

      // Логика добавления фото (всегда к уже созданному объекту)
      var qObj = questionsMap[qKey];
      if (qObj && (item.TypeID == 7 || item.TypeID == 13) && item.Link) {
        var isDuplicate = qObj.photos.some(p => p.photoID === item.PhotoID);
        if (!isDuplicate) {
          qObj.photos.push({
            url: item.Link,
            GUID: item.GUID,
            photoID: item.PhotoID,
            status: item.IsPhotoCheck || 0
          });
        }
      }
    }
    else if (item.ArtID != -1) {
      // Добавляем SKU
      var artKey = actionKey + "_" + item.ArtID;
      if (!seenArts.has(artKey)) {

        /*var specialQuestion = rawData.find(r =>
          r.ActionID === item.ActionID &&
          r.ArtID === item.ArtID &&
          r.TypeID === 10
        );*/

        flatData.push({
          id: "art_" + artKey,
          companyID: item.CompanyID,
          actionID: item.ActionID,
          categoryID: item.CategoryID,
          artID: item.ArtID,
          masterID: item.MasterID,
          questionID: item.QuestionID,
          optionID: item.OptionID,
          GUID: item.GUID,
          questionTypeID: item.TypeID,
          magic: item.Magic,
          companyName: companyName,
          displayName: item.ArtName || "Без названия товара",
          type: "art_item",
          questionTypeName: item.QuestionTypeName,
          url: item.ArtFile,
          specialInfo: null
            /*specialInfo: specialQuestion ? {
            name: specialQuestion.QuestionName,
            answer: specialQuestion.Answer,
            questionTypeID: 10 // Добавили для корректной отрисовки
          } : null*/
        });
        seenArts.add(artKey);
      }

      //Добавляем мастер-вопросы (тип 10) для SKU
      if (item.TypeID == 10 && item.ArtID != -1 && item.QuestionID != -1) {
        var masterKeyForSku = artKey + "_" + item.QuestionID;

        if (!seenArtQuestions[masterKeyForSku]) {
          var masterQuestion = {
            id: "aq_" + masterKeyForSku,
            companyID: item.CompanyID,
            actionID: item.ActionID,
            categoryID: item.CategoryID,
            artID: item.ArtID,
            masterID: item.MasterID,
            questionID: item.QuestionID,
            optionID: item.OptionID,
            GUID: item.GUID,
            questionTypeID: item.TypeID,
            magic: item.Magic,
            companyName: companyName,
            displayName: item.QuestionName || "Мастер-вопрос",
            type: "art_question_item",
            isRequired: item.IsRequired,
            answer: item.Answer || "",
            isTrue: item.IsTrue,
            photos: []
          };
          flatData.push(masterQuestion);
          seenArtQuestions[masterKeyForSku] = masterQuestion;
        }

        // Добавляем фото к мастер-вопросу если есть
        var masterObj = seenArtQuestions[masterKeyForSku];
        if (masterObj && (item.TypeID == 7 || item.TypeID == 13) && item.Link) {
          var isDuplicate = masterObj.photos.some(p => p.photoID === item.PhotoID);
          if (!isDuplicate) {
            masterObj.photos.push({
              url: item.Link,
              GUID: item.GUID,
              photoID: item.PhotoID,
              status: item.IsPhotoCheck || 0
            });
          }
        }
      }
      // Добавляем обычные вопросы к этому SKU (исключая мастер-вопросы)
      if (item.QuestionID != -1 && item.ArtID != -1 && item.TypeID != 10) {
        var shouldShow = editMode || (item.Answer.toString().trim() !== "" || item.Link.toString().trim() !== "")

        var isVisibleByIsTrue = true;

        // Фильтрация по мастер-вопросу (только если есть реальная зависимость)
        if (item.MasterID != -1 && item.MasterID != item.QuestionID) {
          // Ищем мастер-вопрос для этого SKU в предварительно собранном объекте
          var masterKeyForSku = actionKey + "_" + item.ArtID + "_" + item.MasterID;
          var masterValue = masterAnswersForSku[masterKeyForSku] || "";

          if (masterValue !== "") {
            if (masterValue == "1" || masterValue == "Да") {
              isVisibleByIsTrue = (item.IsTrue == 1);
            } else if (masterValue == "0" || masterValue == "Нет") {
              isVisibleByIsTrue = (item.IsTrue == 0);
            } else {
              isVisibleByIsTrue = false;
            }
          } else {
            isVisibleByIsTrue = false;
          }
        }

        if (isVisibleByIsTrue) {
          var isMaster = (item.MasterID == item.QuestionID);
          var hasAnswer = (item.Answer.toString().trim() !== "" || item.Link.toString().trim() !== "");

          var shouldShow = editMode || (isMaster || hasAnswer);

          if (shouldShow) {
            var aqKey = artKey + "_" + item.QuestionID;

            if (!seenArtQuestions[aqKey]) {
              var newQuestion = {
                id: "aq_" + aqKey,
                companyID: item.CompanyID,
                actionID: item.ActionID,
                categoryID: item.CategoryID,
                artID: item.ArtID,
                masterID: item.MasterID,
                questionID: item.QuestionID,
                optionID: item.OptionID,
                GUID: item.GUID,
                questionTypeID: item.TypeID,
                magic: item.Magic,
                companyName: companyName,
                displayName: item.QuestionName || "Без вопроса к товару",
                type: "art_question_item",
                //sortOrder: item.SortOrder || 0,
                isRequired: item.IsRequired,
                answer: item.Answer || "",
                isTrue: item.IsTrue,
                dependent: (item.MasterID != -1 && item.MasterID != item.QuestionID && item.TypeID != 10),
                photos: []
              };

              flatData.push(newQuestion);
              seenArtQuestions[aqKey] = newQuestion;
            }
          }

          // Привязка фото к вопросу (если вопрос был добавлен)
          var aqObj = seenArtQuestions[artKey + "_" + item.QuestionID];
          if (aqObj && (item.TypeID == 7 || item.TypeID == 13) && item.Link) {
            var isDuplicate = aqObj.photos.some(p => p.photoID === item.PhotoID);
            if (!isDuplicate) {
              aqObj.photos.push({
                url: item.Link,
                GUID: item.GUID,
                photoID: item.PhotoID,
                status: item.IsPhotoCheck || 0
              });
            }
          }
        }
      }
    }      
  });

  var list = $$('companyActionList');
  if (list) {
    list.clearAll();
    list.parse(flatData);
  }
}

// внешний вид инпутов для разных типов вопросов
function getAnswerHtml(obj, inputStyle, readOnlyAttr, disabledAttr) {
  var answerText = "";
  var val = (obj.answer !== undefined && obj.answer !== null) ? obj.answer : "";

  // 1. Да/Нет (Тип 1 или 10)
  if (obj.questionTypeID == 1 || obj.questionTypeID == 10) {
    var displayText = "";
    if (val == "1" || val == "Да") displayText = "Да";
    else if (val == "0" || val == "Нет") displayText = "Нет";

    if (editMode === false) {
      // Единый вид для Типа 1 и Типа 10 в режиме просмотра
      answerText = `<span class="answer-readonly" style="${inputStyle}">${displayText}</span>`;
    }
    else {
      var optEmpty = (val === "") ? "selected" : "";
      var optYes = (displayText === "Да") ? "selected" : "";
      var optNo = (displayText === "Нет") ? "selected" : "";

      // Определяем доп. классы и атрибуты специально для Типа 10
      var extraClass = (obj.questionTypeID == 10) ? "master-question-trigger" : "";
      var extraAttrs = (obj.questionTypeID == 10) ? `data-id="${obj.id}" name="master_${obj.id}"` : "";

      answerText = `<select class="answer-editor ${extraClass}" ${disabledAttr} ${extraAttrs} 
                    style="${inputStyle} width:70px;">
                    <option value="" ${optEmpty}></option>
                    <option value="1" ${optYes}>Да</option>
                    <option value="0" ${optNo}>Нет</option>
                  </select>`;
    }
  }

  //  Числовое поле (Тип 3)
  else if (obj.questionTypeID == 3) {
    answerText = "<input type='number' step='any' class='answer-editor' " +
      readOnlyAttr + " " +
      "style='" + inputStyle + " width:80px;' value='" + val + "'>";
  }

  // Текстовое поле (Тип 4 и 14)
  else if (obj.questionTypeID == 4 || obj.questionTypeID == 14) {
    answerText = "<input type='text' class='answer-editor' " +
      readOnlyAttr + " " +
      "style='" + inputStyle + " flex:1; width:100%; min-width:100px;' value='" + val + "'>";
  }

  // Выбор даты (Тип 8)
  else if (obj.questionTypeID == 8) {
    var raw = val.toString().split('T')[0];
    var parts = raw.split('.');
    var dateVal = parts.length === 3 ? parts[2] + '-' + parts[1] + '-' + parts[0] : '';
    answerText = "<input type='date' class='answer-editor' " +
      readOnlyAttr + " " +
      "style='" + inputStyle + " width:135px;' value='" + dateVal + "'>";
  }

  // Выпадающий список (Тип 5)
  else if (obj.questionTypeID == 5) {
    var optionsHtml = "<option value=''></option>";

    if (questionOptions) {
      var currentOptions = questionOptions
        .filter(opt => opt.QuestionID == obj.questionID)
        .sort((a, b) => (a.SortOrder || 0) - (b.SortOrder || 0));

      currentOptions.forEach(function (opt) {
        var isSelected = (obj.answer == opt.ID || obj.answer == opt.Name) ? "selected" : "";
        optionsHtml += "<option value='" + opt.ID + "' " + isSelected + ">" + opt.Name + "</option>";
      });
    }

    answerText = "<select class='answer-editor' " + disabledAttr + " " +
      "onmousedown='event.stopPropagation()' " +
      "style='" + inputStyle + " width:220px; max-width:100%; text-overflow:ellipsis;'>" +
      optionsHtml +
      "</select>";
  }

  // Мультиселект (Тип 6)
  else if (obj.questionTypeID == 6) {    
    var answerStr = (obj.answer || "").toString();
    var currentVals = answerStr ? answerStr.split("|") : [];

    if (questionOptions && currentVals.length > 0) {
      selectedNames = questionOptions
        .filter(opt => {
          return opt.QuestionID == obj.questionID &&
            currentVals.includes(opt.ID.toString()); // Приведение ID к строке обязательно
        })
        .map(opt => opt.Name);
    }

    // Если имена найдены — выводим через запятую, если нет (или массив пуст) — выводим заглушку
    var displayValue = currentVals.length > 0 ? currentVals.join(", ") : "<span style='color:#a0aec0; font-weight:normal;'>Выберите варианты...</span>";

    answerText = "<div class='answer-editor multi-select-trigger' " +
      disabledAttr + " " +
      "data-id='" + obj.id + "' " +      
      "style='" + inputStyle + " display: flex !important; width: 100% !important; flex: 1; " +
      "min-height: 24px; background: #fff; cursor: pointer; border: 1px solid #ccc; " +
      "align-items: center; justify-content: space-between; overflow: hidden;'>" +
      "<div style='white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; padding: 0 5px;'>" +
      displayValue +
      "</div>" +
      "<span class='fa fa-chevron-down' style='font-size: 10px; color: #718096; margin: 0 8px;'></span>" +
      "</div>";    
  }
  

  // Фото (Типы 7 и 13)
  else if (obj.questionTypeID == 7 || obj.questionTypeID == 13) {
    var isEdit = (typeof editMode !== "undefined" && editMode);

    if (isEdit) {
      // РЕЖИМ РЕДАКТИРОВАНИЯ: Показываем иконку из "режима просмотра"
      var cameraIcon = "fa fa-camera";
      var extraAttr = !readOnlyAttr ? "" : "data-readonly='1'";

      answerText = "<span class='" + cameraIcon + " photo-upload-trigger' " +
        extraAttr + " " +
        "style='margin-left:8px; color:#4a5568; cursor:pointer; font-size:18px; vertical-align:middle; " +
        "padding:4px; border:1px solid #cbd5e0; border-radius:4px; background:#f7fafc;' " +
        "title='Добавить фото'></span>";
    } else {
      // РЕЖИМ ПРОСМОТРА: Иконка не показывается
      answerText = "";
    }
  } 

  return answerText;
}

function getRightContentHtml(specialInfo) {
  if (!specialInfo) return "";

  var isEdit = (typeof editMode !== "undefined" && editMode);
  var disabledAttr = !isEdit ? "disabled" : ""; // Используем нативный disabled для селекта

  var val = specialInfo.answer;
  var optYes = (val == "1" || val == "Да") ? "selected" : "";
  var optNo = (val == "0" || val == "Нет") ? "selected" : "";

  // Если тип 10 — добавляем класс для отслеживания изменений
  var extraClass = (specialInfo.questionTypeID == 10) ? "master-question-trigger" : "";

  var selectHtml = "";
  if (isEdit) {
    selectHtml = "<select class='answer-editor " + extraClass + "' " + disabledAttr +
      " onmousedown='event.stopPropagation()' " +
      "style='margin-left:8px; border:1px solid #ccc; border-radius:3px; padding:2px 5px; " +
      "font-weight:normal; color:#000; width:70px;'>" +
      "<option value=''></option>" +
      "<option value='1' " + optYes + ">Да</option>" +
      "<option value='0' " + optNo + ">Нет</option>" +
      "</select>";
  } else {
    // В режиме просмотра просто текст
    var displayText = (optYes ? "Да" : (optNo ? "Нет" : ""));
    selectHtml = "<span style='margin-left:8px; font-weight:bold;'>" + displayText + "</span>";
  }

  return "<div style='margin-left:auto; padding-right:25px; display:flex; align-items:center; color:#000;'>" +
    "<span style='font-weight:normal; white-space:nowrap; flex-shrink:0;'>" + specialInfo.name + "</span>" +
    selectHtml +
    "</div>";
}

// список анкет
function setAction(rawData) {
  var actionMap = {};
  rawData.forEach(function (item) {
    // Игнорируем -1 и пустые ID
    if (item.CompanyID && item.CompanyID != -1 && item.ActionID) {
      var key = item.CompanyID + "_" + item.ActionID;
      if (!actionMap[key]) {
        actionMap[key] = {
          id: key,
          companyId: item.CompanyID,
          actionId: item.ActionID,
          actionName: item.ActionName || "Без названия",
          sortOrder: item.ActionSortOrder || 0,
          companyName: item.CompanyName || "Без названия"
        };
      }
    }
  });

  var actionListItems = Object.values(actionMap);

  var list = $$('companyActionList');
  if (list) {
    list.clearAll();
    list.parse(actionListItems);
  }
}

function getvisitInfo(menuID, report, procName, reportName) {
  getReport('[GTS].VISIT.GetInfo', '', 'Информация по визиту');
  getReport('[GTS].VISIT.GetPointInfo', '', 'Информация по тт');

  getFullMatrixByVisit();
}

function getReport(procName, paramName, itemName) {
  $.ajax({
    url: '../../Services/Visit.asmx/Run',
    data: JSON.stringify({ 'ProcName': procName, 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'GUID': VisitGUID, 'ParamName': paramName, 'Author': localStorage.getItem('Author') }),
    success: function (data) {
      var elemName = 'tableInfo';
      if (procName == '[GTS].VISIT.GetPointInfo')
        elemName = 'tablePointInfo';      

      var list = $$(elemName);

      list.clearAll();
      list.parse(data.d);
      list.refresh();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });
}

function savePhoto(params, base64Data) {
  // сохраняем фото в CHAT.Photos
  $.ajax({
    url: '../../Services/App.asmx/UploadPhoto',
    data: JSON.stringify({
      Magic: params.Magic, User: params.User, Company: params.Company, GUID: params.GUID, ImageData: base64Data, Lat: params.Lat, Lon: params.Lon, Error: params.Error,
      GeoTime: params.GeoTime, Point: params.Point
    }),
    success: function (data) {
      $.ajax({
        url: '../Services/Visit.asmx/GetFullMatrixByVisit',
        data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'IsEdit': editMode, 'Author': localStorage.getItem('Author') , 'GUID': params.GUID }),
        success: function (response) {
          var data = typeof response.d === "string" ? JSON.parse(response.d) : response.d;

          // общий массив данных
          var info = data.Table1[0];

          if (window.lastRawData) {
            // 3. Создаем "виртуальную" строку данных, максимально похожую на ответ от БД
            const newRawRow = {
              CompanyID: info.CompanyID,
              ActionID: info.ActionID,
              ActionSortOrder: info.ActionSortOrder, 
              IsPromo: info.IsPromo, 
              ArtID: info.ArtID,
              MasterID: info.MasterID,
              QuestionID: info.QuestionID,
              IsTrue: info.IsTrue,
              IsRequired: info.IsRequired,
              SortOrder: info.SortOrder,
              PLUCode: info.PLUCode,
              MasterQuestionName: info.MasterQuestionName,
              QuestionName: info.QuestionName, 
              TypeID: info.TypeID,
              QuestionTypeName: info.QuestionTypeName,
              Magic: info.Magic,
              PhotoID: info.PhotoID,
              OptionID: info.OptionID,
              Answer: info.Answer,
              Link: info.Link,
              IsHidden: info.IsHidden,
              CompanyName: info.CompanyName,
              ActionName: info.ActionName,
              ArtName: info.ArtName, 
              ActionFile: info.ActionFile,
              ArtFile: info.ArtFile,
              QuestionFile: info.QuestionFile,
              CategoryID: info.CategoryID,
              CategoryName: info.CategoryName,
              GUID: info.GUID
            };

            // 4. Добавляем в глобальный массив
            window.lastRawData.push(newRawRow);

            // 5. Перерисовываем дерево анкеты
            // Передаем ID вопроса, чтобы после перерисовки фокус остался на нем
            setActionWithQuestions(window.lastRawData);
          }

        },
        error: function (xhr, ajaxOptions, thrownError) {
          onError();
        }
      });

      $.ajax({
        url: '../Services/Visit.asmx/GetPhotoByVisit',
        data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID'), 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned }),
        success: function (data) {
          var list = $$('visitPhotoAll');

          list.clearAll();
          list.parse(data.d);
          list.refresh();

          currentPhotoData = data.d;
        },
        error: function (xhr, ajaxOptions, thrownError) {
          onError();
        }
      });


      
    },
    error: function (xhr) {
      webix.alert("Ошибка загрузки: " + xhr.statusText);
    }
  });
}