const ruLocale = {
  //general
  Done: "Готово",
  Table: "Таблица",
  Tree: "Дерево",
  Chart: "График",
  "Click to configure": "Нажмите, чтобы настроить",
  "Configure Pivot": "Настроить",
  Total: "Итого",
  //settings
  Columns: "Столбцы",
  "Add column": "Добавить столбец",
  Rows: "Ряды",
  "Add row": "Добавить ряд",
  Filters: "Фильтры",
  "Add filter": "Добавить фильтр",
  "Group By": "Сгруппировать по",
  "Chart type": "Тип графика",
  "Logarithmic scale": "Логарифмическая шкала",
  Line: "Линейный",
  Radar: "Лепестковый",
  Bar: "Гистограмма",
  Area: "Область",
  Spline: "Сплайн",
  "Spline Area": "Область сплайна",
  "X axis title": "Заголовок оси X",
  "Y axis title": "Заголовок оси Y",
  "Scale color": "Цвет шкалы",
  "Circled lines": "Обведенные линии",
  Lines: "Линии",
  "Clean rows": "Очистить строки",
  Highlight: "Выделить",
  "Min X": "Min X",
  "Max X": "Max X",
  "Min Y": "Min Y",
  "Max Y": "Max Y",
  Footer: "Итоги по столбцам",
  Off: "Выкл",
  On: "Вкл",
  "Sum Only": "Только сумма",
  "Sum Only": "Только сумма",
  Values: "Значения",
  "Add value": "Добавить значение",
  //operations
  count: "кол-во",
  max: "макс",
  min: "мин",
  round: "округл.",
  avg: "средн.",
  wavg: "средневзв.",
  any: "любое",
  sum: "сумма",
};

webix.protoUI({
  name: "pivot-load",
  load: function (url, structure, fields) {
    if (url)
      delete this.$app.$data;

    this.$app.config.url = url;
    this.$app.config.fields = fields || null;
    this.setStructure({});
    this.getService("local").getData(true).then(() => {
      this.setStructure(this.$app.prepareStructure(structure || {}, true));
    });    
  },
  parse: function (data, structure, fields) {
    this.$app.$data = data;
    this.load(null, structure, fields);
  }
}, webix.ui.pivot);
class MyBackend extends pivot.services.Backend {
  data() {
    if (this.app.$data)
      return webix.promise.resolve(this.app.$data);
    else
      return super.data();      
  }
  url(path) {
    return this.app.config.url + (path || "");
  }
}
class Local extends pivot.services["LocalData"] { 
   // Sets dimensions based on rows/columns from structure
  setDimensions() {
    this._reng.resetDimensions();
    const columns = this.getColumns();
    const fields = columns.concat(this.getRows() || []);

    for (let i = 0; i < fields.length; i++) {
      const field = this.getField(fields[i]);

      this._reng.addDimension({
        id: fields[i],
        table: this._table.id,
        label: fields[i],
        rule: {
          by: field.predicate ? `${field.predicate}(${fields[i]})` : fields[i],
        },
        // set default sorting for columns 
        sort: columns.find(c => c === field.id) ? "asc" : null
      });
    }
  }

  getLimits() {
    return { rows: Infinity, columns: Infinity, raws: Infinity };
  }
}
class Table extends pivot.views.table {
  config() {
    const table = super.config();

    webix.extend(table, {
      fixedRowHeight: false,      
      rowHeight: 14,  
      rowLineHeight: 14
    }, true);

    return table;
  }

  CellFormat(value) {    
    return value;    
  }

  UpdateTable(data) {
    super.UpdateTable(data);
    const table = this.$$("data");  

    table.adjustRowHeight();
  }

  HeaderTemplate = function (line, _) {
    return this.Local.fixMath(line.text);    
  };

  /* first column(s) represent Rows set in the structure */
  SetFirstColumn(column, footer, _) {
    column.width = this.Local.getField(column.header[0].text).width;
    column.header = this.Local.getField(column.header[0].text).value;
  
    if (footer)
      column.footer = _("Total");
  }
  
  SetColumns(columns, footer, marks) {
    const tableColumns = super.SetColumns(columns, footer, marks);
    const { structure, mode } = this.State;

    tableColumns.forEach((column, i) => {
      column.css = "multiline-pivot";

      if (webix.isArray(column.header)) {
        column.header.forEach(h => {          
          h.css = "multiline-pivot";
            h.autoheight = true;         
        })
      }
      else {
        if (typeof column.header === "string")
          column.header = { text: column.header };

        column.header.css = "multiline-pivot";
        column.header.autoheight = true;
      }

    });

    return tableColumns;
  }
}
webix.ready(function () {
  if (webix.env.mobile) webix.ui.fullScreen();
  webix.CustomScroll.init();

  webix.i18n.setLocale("ru-RU");
  pivot.locales.ru = ruLocale;  
});