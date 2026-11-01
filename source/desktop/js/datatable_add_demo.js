// ----- Разметка специальных отчетов для DEMO клиента
//Demo "Табель"
var addDemoTimesheet = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, rowLineHeight: 20, editable: true, leftSplit: 4,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "City", header: ["Город", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string" },
    { id: "RegionCode", header: [{ text: "COST centers", css: "multiline" }, { content: "textFilter" }], width: 60, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "RegionMaster", header: ["Ответственный", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "UserName", header: ["ФИО", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "RoleName", header: ["Должность", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "MasterName", header: ["Руководитель", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "ContractType", header: [{ text: "Тип договора", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "DateHire", header: [{ text: "Дата приема", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "date" },
    { id: "DateDismissal", header: [{ text: "Дата увольнения", css: "multiline" }, { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' }, editor: "date" },
    { id: "Type",  header: ["План/факт", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Day1",  header: ["1", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day2",  header: ["2", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day3",  header: ["3", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day4",  header: ["4", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day5",  header: ["5", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day6",  header: ["6", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day7",  header: ["7", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day8",  header: ["8", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day9",  header: ["9", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day10", header: ["10", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day11", header: ["11", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day12", header: ["12", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day13", header: ["13", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day14", header: ["14", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day15", header: ["15", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day16", header: ["16", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day17", header: ["17", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day18", header: ["18", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day19", header: ["19", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day20", header: ["20", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day21", header: ["21", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day22", header: ["22", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day23", header: ["23", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day24", header: ["24", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day25", header: ["25", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day26", header: ["26", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day27", header: ["27", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day28", header: ["28", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day29", header: ["29", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day30", header: ["30", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "Day31", header: ["31", { content: "textFilter" }], width: 50, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, editor: "select", options: ['1', 'Б', 'О', 'ОСЧ', 'К', 'Н', ' '] },
    { id: "SumDay", header: [{ text: "Кол-во раб.дней", css: "multiline" }, { content: "textFilter" }], width: 85, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "HolidayPaid", header: [{ text: "Отпуск оплачиваемый (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "HolidayNoPaid", header: [{ text: "Отпуск за свой счет (даты)", css: "multiline" }, { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "Mission", header: [{ text: "Командировки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "SickLeave", header: [{ text: "Больничный (даты)", css: "multiline" }, { content: "textFilter" }], width: 120, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
    { id: "Absense", header: [{ text: "Прочие неявки (даты)", css: "multiline" }, { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", exportType: 'string', css: { 'text-align': 'center' } },
  ],
}

//Demo "Отчет ДМП"
var addDemoReportDMP = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 120, minWidth: 40, sort: "int", css: { 'text-align': 'center' }, exportType: 'number', exportFormat: "#" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ArtName", header: ["Наименование SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "PointOutCode", header: ["Код АСУ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Comments", header: ["Комментарий", { content: "textFilter" }], width: 200, minWidth: 100, sort: "string", editor: "text" }
  ],
}

//Demo "Отчет ДМП по неделям"
var addDemoReportDMPweek = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID тт БИГЛ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "ActionID", header: ["ID промо", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "DSM", header: ["Код ТТ клиента", { content: "textFilter" }], width: 65, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ Pra_data", { content: "textFilter" }], width: 125, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "", header: ["Агентство", { content: "textFilter" }], template: "Анкор", width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra2", header: ["№ Опросника", { content: "textFilter" }], width: 40, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "FormatName", header: ["Формат ТТ", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "EquipType", header: ["Вид ДМП", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionType", header: ["ТИП ДМП (КУ/ПРОМО)", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionExtra1", header: ["Кол-во ДМП", { content: "textFilter" }], width: 100, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ActionDescription", header: ["SKU на ДМП", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Период размещения", { content: "textFilter" }], width: 180, minWidth: 40, sort: "string" },

    { id: "IsVisit1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact1", header: [{ text: "Cтатус 1 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact2", header: [{ text: "Cтатус 2 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact3", header: [{ text: "Cтатус 3 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact4", header: [{ text: "Cтатус 4 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "IsVisit5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ТТ посещена (1-да, 0-нет)", { content: "textFilter" }], width: 105, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "InstallDMP5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "ДМП размещено (1-да, 0-нет)", { content: "textFilter" }], width: 130, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Photo5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Ссылка на фото", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
    { id: "Comment5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Комментарии ОМ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "VisitPlan5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов план", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFact5", header: [{ text: "Cтатус 5 неделя", colspan: 6 }, "Визитов факт", { content: "textFilter" }], width: 115, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },

    { id: "Fact1", header: [{ text: "Итого", colspan: 7 }, "Факт 1 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact2", header: [{ text: "Итого", colspan: 7 }, "Факт 2 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact3", header: [{ text: "Итого", colspan: 7 }, "Факт 3 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact4", header: [{ text: "Итого", colspan: 7 }, "Факт 4 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Fact5", header: [{ text: "Итого", colspan: 7 }, "Факт 5 неделя", { content: "textFilter" }], width: 70, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitPlanAll", header: [{ text: "Итого", colspan: 7 }, "Итого план визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "VisitFactAll", header: [{ text: "Итого", colspan: 7 }, "Итого факт визитов", { content: "textFilter" }], width: 95, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "", header: ["Total", { content: "textFilter" }], width: 70, minWidth: 40, sort: "string" },
  ],
}

//Demo "Отчет по браку"
var addDemoReportForDefect = {
  view: "datatable", editable: true, select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "Extra4", header: ["Локация", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Borned", header: ["Дата визита", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Period", header: ["Период размещения", { content: "textFilter" }], width: 130, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "EAN", header: ["Номенклатурный номер (SKU)", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9016", header: ["Наименование оборудования", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Photo9586", header: ["Фото бракованной детали", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10052", header: ["Фото бракованной детали №2", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10163", header: ["Фото бракованной детали №3", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo10190", header: ["Фото маркировки короба", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Photo9587", header: ["Фото инструкции по сборке", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer10046", header: ["Количество", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9585", header: ["Описание проблемы", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "Answer9584", header: ["Факт установки", { content: "textFilter" }], width: 40, minWidth: 20, sort: "string", css: { 'text-align': 'center' } },
    { id: "Answer9588", header: ["Комментарий", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Extra2", header: ["Ответственный", { content: "textFilter" }], width: 150, minWidth: 40, sort: "string" },
    { id: "VerificationDate", header: ["Дата проверки", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    {
      id: "VerificationStatus", header: ["Отметка о проверке", { content: "textFilter" }], width: 200, minWidth: 40, editor: "select", css: { 'text-align': 'center' },
      options: ['Да', 'Нет', 'Некорректное фото', 'Некорректное количество стоек', 'Некорректная дата установки', 'Некорректная дата окончания установки', 'Некорректное название стойки']
    },
  ],
}

//Demo "Отчет по наличию"
var addDemoReportOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserNameSV", header: ["СВ", { content: "excelFilter", mode: "text" }], width: 150, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 80, minWidth: 40, sort: "date", adjust: "header" },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Answer1462", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
    { id: "Answer1460", header: ["Количество фейсов ", { content: "textFilter" }], width: 90, minWidth: 40, sort: "int", css: { 'text-align': 'center' } },
    { id: "Answer1461", header: ["Причина ООС", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Demo "Отчет XO"
var addDemoReportXO = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true,
    autoheight: false,
    height: 360
  },
  columns: [
    { id: "PointID", header: ["ID ТТ", { content: "textFilter" }], width: 80, minWidth: 40, sort: "int", adjust: "header", css: { 'text-align': 'center' } },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, minWidth: 40, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 40, sort: "string" },
    { id: "Name", header: ["Вывеска", { content: "excelFilter", mode: "text" }], width: 80, minWidth: 60, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, minWidth: 40, sort: "string" },
    { id: "OutCode", header: ["Код клиента", { content: "textFilter" }], width: 100, minWidth: 40, sort: "string", adjust: "header", css: { 'text-align': 'center' } },
    { id: "UserName", header: ["ФИО СВ", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Borned", header: ["Дата", { content: "textFilter" }], width: 100, minWidth: 40, sort: "date" },
    { id: "EquipType", header: ["Наименование оборудования", { content: "excelFilter", mode: "text" }], width: 200, minWidth: 60, sort: "string" },
    { id: "Availabil", header: ["Наличие", { content: "selectFilter" }], width: 80, minWidth: 40, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonAbsence", header: ["Причина отсутствия", { content: "textFilter" }], width: 200, minWidth: 40, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото", { content: "textFilter" }], width: 80, minWidth: 40, sort: "string", adjust: "header" },
  ],
}

//Demo "Длительные OOS"
var addDemoDurationOOS = {
  view: "datatable", select: true, resizeColumn: true, fixedRowHeight: false, dragColumn: true, rowLineHeight: 24, rowHeight: 24,
  headermenu: {
    autowidth: true,
    scroll: true
  },
  columns: [
    { id: "AgencyPointID", header: [{ text: "ID Агентства", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "int", css: { 'text-align': 'center' } },
    { id: "OutCode", header: ["Код ТТ", { content: "textFilter" }], width: 100, sort: "string" },
    { id: "OfficeName", header: ["Офис", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "NetworkName", header: ["Сеть", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "CityName", header: ["Город", { content: "excelFilter", mode: "text" }], width: 100, sort: "string" },
    { id: "Address", header: ["Адрес", { content: "textFilter" }], width: 250, sort: "string" },
    { id: "Borned", header: [{ text: "Дата последнего отчета", css: "multiline" }, { content: "textFilter" }], width: 110, sort: "date", css: { 'text-align': 'center' } },
    { id: "BrandName", header: ["Бренд", { content: "excelFilter", mode: "text" }], width: 80, sort: "string" },
    { id: "ArtName", header: ["SKU", { content: "excelFilter", mode: "text" }], width: 200, sort: "string" },
    { id: "PeriodWk", header: [{ text: "Период (недели)", css: "multiline" }, { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "Availabil", header: ["Наличие", { content: "textFilter" }], width: 70, sort: "string", css: { 'text-align': 'center' } },
    { id: "ReasonOOS", header: ["Причина ООС", { content: "textFilter" }], width: 200, sort: "string" },
    { id: "Photo", header: ["Cсылка на фото ТСД", { content: "textFilter" }], width: 150, sort: "string", },
  ],
}