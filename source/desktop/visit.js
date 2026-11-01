var VisitPointID, VisitUserID, VisitBorned, VisitGUID;

var visitInfo = {
  id: "tableInfos", autoheight: true, hidden: true,
  rows: [
    { view: "template", id: "tableInfoCaption", autoheight: true, autowidth: true, template: "Информация по визиту", css: "visit-caption" }, 
    {
      view: "datatable", id: 'tableInfo', select: true, resizeColumn: true, autoheight: true, scroll: false, rowHeight: 24,
      columns: [
        { id: "Name", header: ["Наименование"], width: 200, minWidth: 40, sort: "string" },
        { id: "Value", header: ["Значение"], width: 500, minWidth: 40, sort: "string" }
      ]
    }
  ]  
}

var visitPhotoAll = {
  id: "visitPhotoAlls", autoheight: true, hidden: true,
  rows: [
    { view: "template", id: "visitPhotoAllCaption", autoheight: true, template: "Все фото", css: "visit-caption" },
    {
      view: "dataview", select: true, id: "visitPhotoAll", autoheight: true,
      type: {
        height: 400, width: 300
      },
      template: "<div><img src='#Link#' style='height: 260px'></div> <span class='photo-visit-description'>#CompanyName#<br>#CategoryName#<br>#BrandName#<br>#ArtName#<br> #Description# </span>",
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          visitList = this;

          showImage(item);
        }
      }
    }
  ]
}

var visitPhoto = {  
  id: "visitPhotos", autoheight: true, hidden: true,
  rows: [
    { view: "template", id: "visitPhotoCaption", autoheight: true, template: "Фототчеты", css: "visit-caption" },
    {
      view: "dataview", select: true, id: "visitPhoto",  autoheight: true,
      type: {
        height: 400, width: 300
      },
      template: "<div><img src='#Link#' style='height: 260px'></div> <span class='photo-visit-description'>#CompanyName#<br>#CategoryName#<br>#BrandName#<br>#GeoTime#<br> #Description# </span>",
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          visitList = this;

          showImage(item);
        }
      }
    }
  ]  
}

var visitArt = {
  id: "tableArts", autoheight: true, hidden: true,
  rows: [
    { view: "template", id: "tableArtCaption", autoheight: true, autowidth: true, template: "Анкеты", css: "visit-caption" },
    {
      view: "datatable", id: 'tableArt', select: true, resizeColumn: true, autoheight: true, fillspace: true, fixedRowHeight: false, navigation: "true", rowHeight: 24,
      columns: [
        { id: "ActionName", header: ["Анкета", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
        { id: "CategoryName", header: ["Категория", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string" },
        { id: "BrandName", header: ["Бренд", { content: "textFilter" }], width: 140, minWidth: 40, sort: "string" },
        { id: "ArtName", header: ["SKU", { content: "textFilter" }], width: 300, minWidth: 40, sort: "string" },
        { id: "QuestionName", header: ["Вопрос", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
        {
          id: "Answer", header: ["Ответ", { content: "textFilter" }], width: 500, minWidth: 40, sort: "string", css: { 'text-align': 'left' },
          template: function (obj) {
            if (obj.Link == '')
              return "<span>" + obj.Answer + "</span>";
            else
              return '<div style="display: flex;">' +
                     '<div class="reportphoto" style="background: url(' + obj.Link + ') no-repeat center center; background-size: 240px 240px;"></div>' +
                     '<div style="margin-left: 10px;">' + obj.Answer + '</div>' +
                     '</div>';
          }
        }
      ],
      on: {
        /*"onresize": webix.once(function () {
          this.adjustRowHeight("Answer", true);
        }),*/
        onAfterLoad: function () {
          webix.delay(function () {
            this.adjustRowHeight();            
            this.render();
          }, this);
        }       
      }
    }
  ]
}

var visitPhotoPromo = {
  id: "visitPhotoPromos", autoheight: true, hidden: true,
  rows: [
    { view: "template", id: "visitPhotoPromoCaption", autoheight: true, template: "Фототчеты по промо", css: "visit-caption" },
    {
      view: "dataview", select: true, id: "visitPhotoPromo",  autoheight: true,
      type: {
        height: 400, width: 300
      },
      template: "<div><img src='#Link#' style='height: 260px'></div> <span class='photo-visit-description'>#CompanyName#<br>#CategoryName#<br>#BrandName#<br>#GeoTime#<br> #Description# </span>",
      on: {
        onItemClick: function (id) {
          var item = this.getItem(id);

          visitList = this;

          showImage(item);
        }
      }
    }
  ]
}

webix.ui({
  type: "space",
  id: "winVisit", view: "window", move: false, resize: false, fullscreen: true, head: false, width: 300, height: 300, 
  body: {
    cols: [
      {
        rows: [
          { view: "button", label: 'Закрыть', width: 400, click: "$$('winVisit').hide()" },
          {
            view: "datatable", id: 'tableCaption', select: true, resizeColumn: true, rowLineHeight: 20, width: 400, rowHeight: 24,
            scheme: {
              $change: function (item) {
                onCaptionInit(item);
              }
            },
            columns: [
              { id: "Name", header: ["Группа", { content: "textFilter" }], width: 380, minWidth: 40, sort: "string", fillspace: true }
            ],
            on: {
              onItemClick: function (id) {
                var item = $$(this).getItem(id);
                if (item == null) return;

                if (item.Name.indexOf(' [0]') != -1 && item.IsArtOnly == 1) {
                  return;
                }

                localStorage.setItem('IsArtOnly', item.IsArtOnly);

                getReport(item.ProcName, item.ParamName, item.Name, item.IsArtOnly, 0);
              }
            }
          },
        ]
      },
      { view: "resizer" },
      {
        view: "scrollview", id: "scrollVisit", scroll: "xy",
        body: {
          rows: [
            visitInfo, visitPhotoAll, visitPhoto, visitArt, visitPhotoPromo, { height: 300 }
          ]
        }
      }
    ]  
  },
  on: {
    onHide: function () { $$('winVisit').hide(); },    
    onShow: function () {
          
    },         
    onKeyPress: function (code, e) {
      if (code == 27)
        $$('winVisit').hide();
    }
  }
});

function onCaptionInit(item) {
  if (item.IsMain == 1)
    item.$css = "visit-caption";
  else item.$css = "visit-no-caption";  
}

function getReport(procName, paramName, itemName, isArtOnly, firstStart) {
  $.ajax({
    url: '../Services/Visit.asmx/Run',
    data: JSON.stringify({ 'ProcName': procName, 'Point': VisitPointID, 'User': VisitUserID, 'Borned': VisitBorned, 'GUID': VisitGUID, 'ParamName': paramName }),
    success: function (data) {
      var elemName = 'visitPhoto';
      if (procName == '[GTS].VISIT.GetInfo')
        elemName = 'tableInfo';
      else if (procName == '[GTS].VISIT.GetPhotoPromo')
        elemName = 'visitPhotoPromo';
      else if (procName == '[GTS].VISIT.GetArt')
        elemName = 'tableArt';
      else if (procName == '[GTS].VISIT.GetPhotoAll')
        elemName = 'visitPhotoAll';

      var list = $$(elemName);
      
      list.clearAll();
      list.parse(data.d);
      list.refresh();

      if (elemName == 'tableArt') {
        if (isArtOnly == 1) {
          if (list.isColumnVisible("CategoryName"))
            list.hideColumn("CategoryName");
          if (list.isColumnVisible("BrandName"))
            list.hideColumn("BrandName");
          if (list.isColumnVisible("ArtName"))
            list.hideColumn("ArtName");
        }
        else {
          if (!list.isColumnVisible("CategoryName"))
            list.showColumn("CategoryName");
          if (!list.isColumnVisible("BrandName"))
            list.showColumn("BrandName");
          if (!list.isColumnVisible("ArtName"))
            list.showColumn("ArtName");
        }
      }

      if (JSON.parse(data.d).length != 0) 
        $$(elemName + 's').show();

      var caption = $$(elemName + 'Caption');
      caption.define("template", itemName);
      caption.refresh();

      if (firstStart == 1)
        $$("scrollVisit").showView('tableInfos');
      else
        $$("scrollVisit").showView(elemName + 's');      
      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      onError();
    }
  });
}

webix.ready(function () {
  $$("tableArt").on_click.reportphoto = function (e, id, trg) {
    var item = $$("tableArt").getItem(id);

    if (item != null)
      showImage(item);    

    return false;
  };
});