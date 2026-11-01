var pointID = -1, pointName;
var taskID, acceptorID, acceptorName, groupID;
var categoryID, categoryName;
var companyID, companyName;
var actionID, actionName, actionRequired, artID, questionID, optionID, questionTypeID;
var standartName;

var GUID;
var imagePhoto;

var mainid, filterid;
var list;

var reportID, reportName;

var IsPromo = 0;

var Dimension = 1080;

if (window.EventSource) {
  sourceServer = new EventSource(URLname + 'Refresh.aspx?id=' + localStorage.getItem('Author'));

  sourceServer.onopen = function (e) {
    clearAllTimer();    
  };
  sourceServer.onerror = function (e) {
    startTimer('');   
  };
  sourceServer.onmessage = function (event) {
    return;  
    
}

function refreshAll(flag) {
  if (localStorage.getItem('Author') == null)
    return;  
  
  if (flag == '')
    if (sourceServer != null)
      if (sourceServer.readyState == 1) return;

  getMessage(flag, null);
  getChat(flag);

  if (flag != 'all') {
    timerCount = timerCount + 1;

    if (timerCount + 1 > timerCountMax)
      startTimer(timerMagic);
  }
  else {
    var visitBorned = localStorage.getItem('VisitBorned');

    if (visitBorned == null || visitBorned != getDate()) {
      var item = $$('point-menu').getItem(2);
      item.Status = 0;
      $$('point-menu').updateItem(2, item);

      item = $$('point-menu').getItem(1);
      item.Status = 1;
      $$('point-menu').updateItem(1, item);
      
      localStorage.removeItem('VisitPointID');
      localStorage.removeItem('VisitPointName');
      localStorage.removeItem('VisitBorned');
      isVisit = 0;
    }
    else {
      var item = $$('point-menu').getItem(1);
      item.Status = 0;
      $$('point-menu').updateItem(1, item);

      item = $$('point-menu').getItem(2);
      item.Status = 1;
      item.Description = localStorage.getItem('VisitPointName');
      $$('point-menu').updateItem(2, item);            

      isVisit = 1;      
    }
    $$('point-menu').filter(function (obj) { return obj.Status == 1 });

    $.ajax({
      url: URLname + '/Services/System.asmx/GetUserInfo',
      data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
      success: function (data) {
        var info = JSON.parse(data.d);

        $$("navigation").hideProgress();

        if (info.length == 1) {
          localStorage.setItem('IsRoute', info[0].IsRoute);
          localStorage.setItem('IsPoint', info[0].IsPoint);
          localStorage.setItem('IsUser', info[0].IsUser);
          localStorage.setItem('IsTask', info[0].IsTask);
        }
      }
    });

    getUserSetting();

    timerMagic = '';
    //startTimer(timerMagic);
  }
}

// список сообщений чата
function getChat(flag) {
  if (flag == 'all') showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/UI.asmx/GetChat',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Flag': (flag == null) ? '' : flag }),
    success: function (data) {
      listUpdate('chat', flag, data.d);

      if (flag != 'all') {
        if (JSON.parse(data.d).length != 0) {
          getChatAcceptor(flag);

          // если есть новые данные и не работает штатный таймер, включаем штатный (самый быстрый) таймер
          if (timerReplication != null)
            startTimer('');
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      if (flag == 'all') {
        webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные по сообщениям чата не получены.", expire: 2000 });

        getCash('chat');
      }
    },
    complete: function () {
      if (flag == 'all') {
        getChatAcceptor(flag);
      }
    }
  });
}



// список ТТ
function getPoint(flag) {
  $.ajax({
    timeout: 60000,
    url: URLname + 'Services/UI.asmx/GetPoint',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Flag': (flag == null) ? '' : flag }),
    success: function (data) {
      var result = JSON.parse(data.d);

      listUpdate('point', flag, data.d);      

      setPointBadge();     

      findPoint('', 0);

      // сортировка
      $$('point').sort('#MessageID#', 'desc', 'int');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $$("navigation").hideProgress();

      if (flag == 'all') {
        webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные по ТТ не получены.", expire: 2000 });

        getCash('point');        
      }
    },
    complete: function () {
      if (flag == 'all') {               
        GetAcceptor(null, flag);        

        GetUser();

        getArt(null, flag);
        getArtNetworkMatrix(flag);
        getArtPointMatrix();

        getArtAnswer(null, flag);            

        getTicket();
        getTicketAdmin();

        getSetting();
        getSettingSystem();
        getCompanySettingMobile();

        getPhotoCategory();

        getPhotoReport();
        getPhotoAction();

        GetBrandAll();

        GetQuestion();

        GetStandart();

        GetAction();
        GetActionPointMap();
        GetActionMatrix();

        GetVisitDay();

        // данные для справочников
        getDictionary('GetRole', $$('rolename'));
        getDictionary('GetRole', $$('rolenameNew'));
        
        getDictionary('GetOffice', $$('officename'));
        getDictionary('GetNetwork', $$('networkname'));
        getDictionary('GetFormat', $$('formatname'));

        getAdditional();

        //trashCollector();
      }

      $$("navigation").hideProgress();
    }
  });
}

// список ТТ для задания
function GetTaskPoint() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetTaskPoint',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('taskPoint').clearAll();
      $$('taskPoint').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('taskPoint');
    },
    complete: function () {
      $$('taskPoints').show();
    }
  });
}

// список получателей задания
function GetAcceptor(point, flag) {
  if (flag != 'all') showProgress("navigation");
  
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetAcceptor',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('acceptor', flag, data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {      
      getCash('acceptor');
    },
    complete: function () {
      getCompany(point, flag);
      GetAcceptorMap(point, flag);

      if (flag != 'all') $$("navigation").hideProgress();
    }
  });
}

function GetAcceptorDesktop(point) {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/Desktop.asmx/GetAcceptor',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point, 'Client': null }),
    success: function (data) {
      $$('acceptorTask').clearAll();
      $$('acceptorTask').parse(data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //getCash('acceptor');
    },
    complete: function () {
      //getCompany(point, flag);
      //GetAcceptorMap(point, flag);

      $$('newTask').show();

      $$("navigation").hideProgress();
    }
  });
}

// список получателей для фокусного задания
function GetAcceptorFocus() {
  showProgress("navigation");

  $.ajax({
    url: URLname + 'Services/UI.asmx/GetAcceptor',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': null }),
    success: function (data) {
      listUpdate('taskAcceptor', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('taskAcceptor');
    },
    complete: function () {
      $$("navigation").hideProgress();

      $$('taskAcceptors').show();
    }
  });
}

// выбор компаний к ТТ
function getCompany(point, flag) {
  if (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') return;


  $.ajax({
    url: URLname + 'Services/System.asmx/GetCompany',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('company', flag, data.d);
      listUpdate('companyPhoto', flag, data.d);
      listUpdate('companyStandart', flag, data.d);

      for (var id in $$('company').data.pull) {
        var company = $$('company').getItem(id);

        var name = $$('acceptor').find(function (obj) { return ((obj.ID.toString() == company.ID) && (obj.IsCompany == 1)) }, true);

        if (name.Name != null)
          company.Name = name.Name;

        /*if (company.Name.indexOf('SKU ') == -1) 
          company.Name = 'SKU ' + company.Name;*/
      }
      $$('company').refresh();

      for (var id in $$('companyPhoto').data.pull) {
        var company = $$('companyPhoto').getItem(id);

        var name = $$('acceptor').find(function (obj) { return ((obj.ID.toString() == company.ID) && (obj.IsCompany == 1)) }, true);

        if (name.Name != null)
          company.Name = name.Name;

        if (company.Name.indexOf('Фото ') == -1) 
          company.Name = 'Фото ' + company.Name;        
      }
      $$('companyPhoto').refresh();

      for (var id in $$('companyStandart').data.pull) {
        var company = $$('companyStandart').getItem(id);

        var name = $$('acceptor').find(function (obj) { return ((obj.ID.toString() == company.ID) && (obj.IsCompany == 1)) }, true);

        if (name.Name != null)
          company.Name = name.Name;

        if (company.Name.indexOf('Фото ') == -1)
          company.Name = 'Стандарт ' + company.Name;
      }
      $$('companyStandart').refresh();

      if (point != null) {
        $$('company').filter(function (obj) {
          return obj.PointID.toString() == point;
        });

        $$('companyPhoto').filter(function (obj) {
          return obj.PointID.toString() == point;
        });

        $$('companyStandart').filter(function (obj) {
          return obj.PointID.toString() == point;
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('company');
      getCash('companyPhoto');
      getCash('companyStandart');
    }
  });
}

// список получателей задания в привязке к ТТ
function GetAcceptorMap(point, flag) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetAcceptorMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('acceptorMap', flag, data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('acceptorMap');
    },
    complete: function () {
      if (point != null)
        getAcceptorList(point);
    }
  });
}

// генерация списка получателей
function getAcceptorList(point) {
  for (var id in $$('acceptor').data.pull) {
    var acceptor = $$('acceptor').getItem(id);

    acceptor.PointID = -1;
    acceptor.IsActive = 0;

    row = $$('acceptorMap').find(function (obj) { return (obj.PointID.toString() == point && obj.ID.toString() == acceptor.ID && obj.IsCompany.toString() == acceptor.IsCompany) }, true);

    if ((row.ID != null) && (row.ID != localStorage.getItem('CompanyID')))
      acceptor.PointID = point;
  }
  $$('acceptor').refresh();

  $$('acceptor').filter(function (obj) {
    return obj.PointID.toString() == point;
  });
}

// список закрепленных сотрудников за ТТ
function getPointUserMap(point) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetPointUserMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      $$('pointUser').clearAll();
      $$('pointUser').parse(data.d);     
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 3000 });
    },
    complete: function () {
      $$('user').filter(function (obj) {
        return obj.ID.toString() != localStorage.getItem('Author');
      });

      $$('newPointUserMap').show();
    }
  });
}

// список сотрудников компании
function GetUser() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetUser',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('user', 'all', data.d);
      listUpdate('chatContact', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('user');
      getCash('chatContact');
    },
    complete: function(){
      $$('chatContact').filter(function (obj) {
        return (obj.ID.toString() != localStorage.getItem('Author'));
      });
    }
  });
}

// список всех брендов
function GetBrandAll() {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetBrandAll',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('brand', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('brand');
    }
  });
}

// список заметок
function getNote(flag, point) {
  showProgress("point-menu");
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetNote',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      $$('note').clearAll();
      $$('note').parse(data.d);             
    },
    error: function (xhr, ajaxOptions, thrownError) {      
      webix.message({ type: "error", text: "Потеряно соединение с сервером. Данные не получены.", expire: 3000 });
    },
    complete: function () {
      hideProgress("point-menu");
      
      $$('noteList').show();
    }
  });
}

// список тикетов для администратора системы
function getTicketAdmin() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetTicketAdmin',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {      
      listUpdate('ticketAdmin', 'all', data.d);      
      
      // установка курсора на последний тикет
      var list = $$('ticketAdmin');
      list.showItem(list.getLastId());

      var count = list.find(function (obj) { return (obj.Readed == 0) }).length;
      if (count != 0) {
        var item = $$('menulist').getItem(60);
        item.badge = count;
        $$('menulist').updateItem(item.id, item);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('ticketAdmin');
    }
  });
}

// список тикетов для техподдержки
function getTicket() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetTicket',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Company': null }),
    success: function (data) {
      listUpdate('ticket', 'all', data.d);

      // установка курсора на последний тикет
      var list = $$('ticket');
      list.showItem(list.getLastId());

      var count = list.find(function (obj) { return (obj.Readed == 0) }).length;
      if (count != 0) {
        var item = $$('menulist').getItem(61);
        item.badge = count;
        $$('menulist').updateItem(item.id, item);
      }

    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('ticket');
    }
  });
}

// выбор sku
function getArt(point, flag) {  
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetArt',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('art', flag, data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('art');
    }
  });
}

// выбор матриц sku по сети
function getArtNetworkMatrix(flag) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetArtNetworkMatrix',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('artNetworkMatrix', flag, data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('artNetworkMatrix');
    }
  });
}

// выбор матриц sku по ТТ 
function getArtPointMatrix() {  
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetArtPointMatrix',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': null }),
    success: function (data) {
      listUpdate('artPointMatrix', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('artPointMatrix');
    }
  });
}

// выбор ответов по sku
function getArtAnswer(point, flag) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetArtAnswer',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
    success: function (data) {
      listUpdate('artAnswer', flag, data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //getCash('artAnswer');
    }
  });
}

function GetQuestion() {
  $.ajax({
    url: URLname + 'Services/Action.asmx/GetQuestion',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('question', 'all', data.d);      
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('question');
    },
    complete: function () {
      $.ajax({
        url: URLname + 'Services/Action.asmx/GetQuestionOption',
        data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
        success: function (data) {
          listUpdate('option', 'all', data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          getCash('option');
        }
      });
    }
  });
}

function getQuestionList(company, action, point, art) {
  var list = $$('question');

  isArt = (art == -1) ? 0 : 1;

  for (var id in list.data.pull) {
    var question = list.getItem(id);

    question.PointID = '';
    question.Answer = '';

    if (question.ActionID == action && question.IsArt == isArt && question.CompanyID == company && question.MasterID == null) {
      question.PointID = point;

      setQuestionAnswer(question, point, action, art, question.ID);
    }
  } 
  list.refresh();

  list.filter(function (obj) { return obj.PointID.toString() == point });

  $$('questions').show();
}

//список вопрос после ответа на вопрос ветвление
function getSlaveQuestionList(company, action, point, art, answer, masterID) {
  var list = $$('question');

  isArt = (art == -1) ? 0 : 1;

  slaveAnswer = (answer == 'Да') ? 1 : 0;
  for (var id in list.data.pull) {
    var question = list.getItem(id);

    question.PointID = '';
    question.Answer = '';

    if (question.ActionID == action && question.IsArt == isArt && question.CompanyID == company && question.MasterID == masterID && question.IsTrue == slaveAnswer) {
      question.PointID = point;

      setQuestionAnswer(question, point, action, art, question.ID);
    }
  }
  list.refresh();

  list.filter(function (obj) { return obj.PointID.toString() == point });

  $$('questions').show();
}

function getOptionList(question) {
  var list = 'option';

  for (var id in $$(list).data.pull) {
    var option = $$(list).getItem(id);

    option.IsActive = 0;

    var row = $$('artAnswer').find(function (obj) { return (obj.PointID.toString() == pointID && obj.ActionID.toString() == actionID && obj.ArtID.toString() == artID && obj.QuestionID.toString() == option.QuestionID && obj.OptionID.toString() == option.ID) }, true);

    if (row.ArtID != null) 
      option.IsActive = 1;
  }
  $$(list).refresh();

  
  $$(list).filter(function (obj) {
    return (obj.QuestionID.toString() == question);
  });

  $$('options').show();
}

function getArtListRefresh(action, point, company, rowMatrix, fullMatrix) {
  if (rowMatrix == null && IsPromo == 0)
    rowMatrix = $$('artMatrix').find(function (obj) { return (obj.PointID.toString() == point && obj.CompanyID.toString() == company) });
  
  var count = 0;

  if (rowMatrix != null)
    count = rowMatrix.length;

  for (var id in $$('art').data.pull) {
      var art = $$('art').getItem(id);

      art.PointID = '';

    if (art.CompanyID == company) {
      art.ActionID = action;
      
      art.Description = '';
      art.Name = art.NameFull;

      if (count == 0) {
        art.PointID = point;

        if (art.EANCode != '')
          art.Name = art.NameFull + ', ш\\код: ' + art.EANCode;
      }
      else
        for (var i = 0; i < count; i++) {
          if (art.ID == rowMatrix[i].ArtID) {
            art.PointID = point;

            if (rowMatrix[i].PLUCode != null) {
              if (rowMatrix[i].PLUCode != '')
                art.Name = art.NameFull + ', plu: ' + rowMatrix[i].PLUCode;
              else art.Name = art.NameFull + ', ш\\код: ' + art.EANCode;
            }

            if (fullMatrix != null)
              art.PointID = point;

            break;
          }
        }

      if ($$('artAnswer').find(function (obj) { return (obj.ActionID.toString() == actionID && obj.PointID.toString() == point && obj.ArtID.toString() == art.ID) }, true).ArtID != null)
        art.Description = 'есть ответы';
    }

  }
  $$('art').refresh();

  $$('art').ungroup();

  $$('art').filter(function (obj) {
    return (obj.PointID.toString() == point);
  });

  artGroup($$('artSegmented').getValue());

  if (action == -1)
    $$('art-all').show();
  else $$('art-all').hide();

  var menu = $$('point-menu').getItem('102');
  menu.Description = '';
  $$('point-menu').updateItem(102, menu);

  $$('skuList').show();
}

// генерация списка art при выборе ТТ и компании
function getArtList(action, point, company) {
  var pointItem = $$('point').getItem(point);

  if (pointItem == null) return;
  var networkID = pointItem.NetworkID;
  var formatID = pointItem.FormatID;

  var rowMatrix;
  
  if (IsPromo == 1) {
    rowMatrix = $$('actionMatrix').find(function (obj) { return (obj.ActionID.toString() == action) });

    if (rowMatrix.length == 0) return;

    getArtListRefresh(action, point, company, rowMatrix, null);
  }
  else {

    // если это нестандартная анкета, сначала ищем матрицу по промо
    if (action != -1)
      rowMatrix = $$('actionMatrix').find(function (obj) { return (obj.ActionID.toString() == action) });

    // если не нашли или это не промо, ищем в матрице по ТТ
    if (rowMatrix == null)
      rowMatrix = $$('artPointMatrix').find(function (obj) { return (obj.PointID.toString() == point && obj.CompanyID.toString() == company) });
    else
      if (rowMatrix.length == 0)
        rowMatrix = $$('artPointMatrix').find(function (obj) { return (obj.PointID.toString() == point && obj.CompanyID.toString() == company) });

    // если нет в матрице по ТТ, опрашиваем матрицу по сети по формату
    if (rowMatrix.length == 0)
      rowMatrix = $$('artNetworkMatrix').find(function (obj) { return (obj.NetworkID.toString() == networkID && obj.FormatID.toString() == formatID && obj.CompanyID.toString() == company) });

    // если нет в матрице по ТТ, опрашиваем матрицу по сети без формата
    if (rowMatrix.length == 0)
      rowMatrix = $$('artNetworkMatrix').find(function (obj) { return (obj.NetworkID.toString() == networkID /*&& obj.FormatID.toString() == formatID*/ && obj.CompanyID.toString() == company) });

    // если нигде не нашли И ТТ не моя, запрашиваем матрицу в ТТ из общего хранилища
    if (rowMatrix.length == 0 && $$('point').getItem(point).IsMy == 0) {
      $.ajax({
        url: URLname + 'Services/UI.asmx/GetArtMatrix',
        data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': point }),
        success: function (data) {
          listUpdate('artMatrix', '', data.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          getCash('artMatrix');
        },
        complete: function () {
          getArtListRefresh(action, point, company, null, null);
        }
      });
    }
    else getArtListRefresh(action, point, company, rowMatrix, null);
  }
}

  // список настроек отчетов
function getSetting() {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetSetting',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      result = JSON.parse(data.d);

      for (var i = 0; i < result.length; i++)
        badgeReportRefresh(result[i].ID, result[i].CCount);
    }
  });
}

function getCompanySettingMobile() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetCompanySettingMobile',
    data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      $$('companySetting').clearAll();
      $$('companySetting').parse(data.d);

      // скрыть правку даты визита
      var itemSetting = $$('companySetting').getItem(4);
      if (itemSetting != null) {
        var item = $$('point-menu').getItem(200);

         if (itemSetting.status != 1) 
           item.Status = 0;
         else item.Status = 1;

         $$('point-menu').filter(function (obj) { return obj.Status == 1 });         
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //webix.message({ type: "error", text: "GetSetting: " + xhr.responseText, expire: 1000 });
    }
  });
}

// фотоотчеты по ТТ и компании
function getPhotoList(point, company) {
  var menu = $$('point-menu').getItem('101');
  menu.Description = 'загрузка...';
  $$('point-menu').updateItem(101, menu);

  var list = $$('photo');

  list.filter(function (obj) {
    return ((obj.PointID.toString() == point) && (obj.CompanyID.toString() == company));
  });

  list.sort("#ID#", "asc", "int");

  var count = list.count();

  if (count > 10) {
    for (var i = 0; i < count ; i++) {
      var row = list.getItem(list.data.order[i]);

      if ((count - i) > 10)
        row.Num = -1;
      else row.Num = 1;
    }

    list.refresh();
  }
    
  $$('photoCategory').filter(function (obj) {
    return (obj.CompanyID.toString() == company);
  });

  var menu = $$('point-menu').getItem('101');
  menu.Description = '';
  $$('point-menu').updateItem(101, menu);

  $$('photoLists').show();
}

// фотоотчеты по ТТ и компании
function getPhotoPromoList(point, action) {
  var list = $$('photoPromo');

  $$('photo-promo-header').define('template', pointName + '<br/>' + actionName + ' фото' ); $$('photo-promo-header').refresh();

  list.filter(function (obj) {
    return ((obj.PointID.toString() == point) && (obj.ActionID.toString() == action));
  });

  list.sort("#ID#", "asc", "int");

  var count = list.count();

  if (count > 10) {
    for (var i = 0; i < count ; i++) {
      var row = list.getItem(list.data.order[i]);

      if ((count - i) > 10)
        row.Num = -1;
      else row.Num = 1;
    }

    list.refresh();
  }

  $$('photoPromoLists').show();
}

// список фото
function getPhotoReport() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetPhotoReport',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Point': pointID }),
    success: function (data) {
      listUpdate('photo', 'all', data.d);
      
      // сортировка
      $$('photo').sort('#GUID#', 'asc', 'int');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //getCash('photo');

      $$("point").hideProgress();
    }
  });
}

// список фото по промо
function getPhotoAction() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetPhotoAction',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('photoPromo', 'all', data.d);
      
      // сортировка
      $$('photoPromo').sort('#GUID#', 'asc', 'int');
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //getCash('photoPromo');

      $$("point").hideProgress();
    }
  });
}

// список фотокатегорий
function getPhotoCategory() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetPhotoCategories',
    data: JSON.stringify({ 'Company': localStorage.getItem('CompanyID') }),
    success: function (data) {
      listUpdate('photoCategory', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('photoCategory');
    }
  });
}

function getPhoto() {
  var text = $$('taskText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

  if (text == '') {
    webix.message({ type: "error", text: "Введите текст задания", expire: 1000 });
    return;
  }

  isTaskEdit = 1;
  isTaskEditReport = 0;

  GUID = +new Date;
  imagePhoto = null;

  webix.confirm({
    title: "Фото",
    ok: "Да",
    cancel: "Нет",
    type: "confirm",
    text: "Добавить фото к заданию<br/>'" + getLastText($$('taskText').getValue().trim()) + "'?",
    callback: function (result) { 
      if (result) {
        if (URLname == "") {
          list = $$('task');

          photoUpload(GUID, 'task');
        }
        else {
          app.takePicture(GUID, 'task');
        }

        return false;
      }

      else {
        //if (pointID == -1)
         // GetTaskPoint();
      //else 
        $$('taskCategory').show();
      }
    }
  });
}


function getPhotoChat() {
  if ($$('textChat').getValue().trim() == '') {
    webix.message({ type: "error", text: "Введите текст сообщения", expire: 1000 });
    return;
  }

  GUID = +new Date;
  imagePhoto = null;

  webix.confirm({
    title: "Фото",
    ok: "Да",
    cancel: "Нет",
    type: "confirm",
    text: "Добавить фото к сообщению<br/>'" + getLastText($$('textChat').getValue().trim()) + "'?",
    callback: function (result) { //setting callback
      if (result) {
        if (URLname == "") {
          list = $$('chat');

          photoUpload(GUID, 'chat');
        }
        else {
          app.takePicture(GUID, 'chat');
        }

        return false;
      }

      else saveChat();
    }
  });
}

function getNewPhotoReport() {
  GUID = +new Date;
  imagePhoto = null;

  isTaskEdit = 0;
  IsNoteEdit = 0;

  if (URLname == "") {
    list = $$('photo');

    photoUpload(GUID, 'photo');
  }
  else app.takePicture(GUID, 'photo');
}

function getNewPhotoPromo() {
  GUID = +new Date;
  imagePhoto = null;

  isTaskEdit = 0;
  IsNoteEdit = 0;

  if (URLname == "") {
    list = $$('photoPromo');

    photoUpload(GUID, 'photoPromo');
  }
  else app.takePicture(GUID, 'photoPromo');
}

function getPhotoNote() {
  isNoteEdit = 1;

  if ($$('noteText').getValue().trim() == '') {
    webix.message({ type: "error", text: "Введите текст сообщения", expire: 1000 });
    return;
  }

  GUID = +new Date;
  imagePhoto = null;

  webix.confirm({
    title: "Фото",
    ok: "Да",
    cancel: "Нет",
    type: "confirm",
    text: "Добавить фото к заметке <br/>'" + getLastText($$('noteText').getValue().trim()) + "'?",
    callback: function (result) { //setting callback
      if (result) {
        if (URLname == "") {
          list = $$('note');

          photoUpload(GUID, 'note');
        }
        else {
          app.takePicture(GUID, 'note');
        }

        return false;
      }

      else $$('taskCategory').show();
    }
  });
}

function startPhotoArt() {
  GUID = +new Date;
  imagePhoto = null;

  if (URLname == "") {
    list = $$('question');

    photoUpload(GUID, 'art');
  }
  else {
    app.takePicture(GUID, 'art');
  }
}

function getPhotoArt(photo, lat, lon, error) {
  if (photo == '' || photo == null) {
    startPhotoArt();
  }
  else
    webix.confirm({
      title: "Фото", ok: "Да", cancel: "Нет", type: "confirm", text: "Изменить фото ?",
      callback: function (result) {
        if (!result) {
          sessionStorage.setItem('photoLat', lat);
          sessionStorage.setItem('photoLon', lon);
          sessionStorage.setItem('photoError', error);          

          showPhotoReport(photo, 'Фото по sku', '', -1, -1);
        }
        else startPhotoArt();
      }
    });

}


function getSoundFile() {
  $$("soundUploader").fileDialog();
}

function getPhotoUser() {
  if (URLname == "")
    photoUploadUser();
  else app.takeUserPhoto();
}

function savePhotoReport() {
  try {
    var text = $$('photoText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"');

    if (text == null) text = '';

    $$("photoText").setValue('');

    if (imagePhoto.indexOf('data:image/png;base64,') == -1)
      imagePhoto = 'data:image/png;base64,' + imagePhoto;

    //if (isMobile) {
    try {
      var count = $$("photo").count();

      if (count > 9) {
        for (var i = 0; i < count ; i++) {
          var row = $$("photo").getItem($$("photo").data.order[i]);

          if (row.Num == 1) {
            row.Num = -1;
            $$('photo').updateItem(row.id, row);

            break;
          }
        }
      }
    }
    catch (e) { }
    //}

    var record = {
      ID: GUID, PointID: pointID, CompanyID: companyID, CompanyName: companyName, CategoryName: categoryName, BrandName: brandName, Description: text, GUID: GUID,
      Photo: imagePhoto, UserID: localStorage.getItem('Author'), Lat: sessionStorage.getItem('photoLat'), Lon: sessionStorage.getItem('photoLon'), Error: sessionStorage.getItem('photoError'), Num: 1
    };

    var id = $$("photo").add(record);

    $$('photo').showItem(id);

    if (brandID == null)
      brandID = -1;

    // отправка сообщения  
    send('SetPhotoReport', { 'User': localStorage.getItem('Author'), 'Point': pointID, 'Description': text, 'Category': categoryID, 'Brand': brandID, 'Company': companyID, 'GUID': GUID }, 'photo', id);

    onResizePoint(pointID);
  }
  catch (e) {
    //alert(e);     
  }

  $$('photoLists').show();
}

function savePhotoPromo() {
  try {
    var text = $$('photoPromoText').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"');

    if (text == null) text = '';

    $$("photoText").setValue('');

    if (imagePhoto.indexOf('data:image/png;base64,') == -1)
      imagePhoto = 'data:image/png;base64,' + imagePhoto;

    //if (isMobile) {
    try {
      var count = $$("photoPromo").count();

      if (count > 9) {
        for (var i = 0; i < count ; i++) {
          var row = $$("photoPromo").getItem($$("photoPromo").data.order[i]);

          if (row.Num == 1) {
            row.Num = -1;
            $$('photoPromo').updateItem(row.id, row);

            break;
          }
        }
      }
    }
    catch (e) { }
    //}

    var record = {
      ID: GUID, PointID: pointID, ActionID: actionID, Description: text, GUID: GUID, Photo: imagePhoto, UserID: localStorage.getItem('Author'),
      Lat: sessionStorage.getItem('photoLat'), Lon: sessionStorage.getItem('photoLon'), Error: sessionStorage.getItem('photoError'), Num: 1
    };

    var id = $$("photoPromo").add(record);

    $$('photoPromo').showItem(id);

    if (brandID == null)
      brandID = -1;

    // отправка фото  
    send('SetPhotoAction', { 'User': localStorage.getItem('Author'), 'Point': pointID, 'Description': text, 'Action': actionID, 'GUID': GUID }, 'photo', id);

    onResizePoint(pointID);
  }
  catch (e) {
    //alert(e);     
  }

  $$('photoPromoLists').show();
}

function saveTicket() {
  var text = $$('textTicket').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"');

  if (text == '') {
    webix.message({ type: "error", text: "Введите текст сообщения", expire: 1000 });
    return;
  }

  GUID = +new Date;
  imagePhoto = null;

  $$("textTicket").setValue('');

  var record = { ID: GUID, Text: text, UserName: '', IsMe: 1, GUID: GUID, Borned: getDateTime() };
  setCash('ticket', record);
  var id = $$("ticket").add(record);

  $$('ticket').showItem(id);

  // отправка сообщения  
  send('SetTicket', { 'User': localStorage.getItem('Author'), 'Company': null, 'Text': text, 'GUID': GUID }, 'ticket', id);
}

function saveTicketAdmin() {
  var text = $$('textTicketAdmin').getValue().replace(new RegExp("\n", 'g'), "<br\>").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"');

  if (text == '') {
    webix.message({ type: "error", text: "Введите текст сообщения", expire: 1000 });
    return;
  }

  GUID = +new Date;
  imagePhoto = null;

  $$("textTicketAdmin").setValue('');

  var record = { ID: GUID, Text: text, UserName: '', IsMe: 1, GUID: GUID, Borned: getDateTime() };
  setCash('ticketAdmin', record);
  var id = $$("ticketAdmin").add(record);

  $$('ticketAdmin').showItem(id);

  // отправка сообщения  
  send('SetTicketAdmin', { 'User': localStorage.getItem('Author'), 'Text': text, 'GUID': GUID }, 'ticket', id);
}

  // добавление новой ТТ
function savePoint() {
  GUID = +new Date;
  imagePhoto = null;

  var officeName = $$('officename').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var cityName = $$('cityname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var networkName = $$('networkname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var name = $$('name').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var address = $$('address').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var formatname = $$('formatname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

  if (officeName == '') {
    webix.message({ type: "error", text: "Укажите региональный офис", expire: 1000 });
    return;
  }

  if (cityName == '') {
    webix.message({ type: "error", text: "Укажите город", expire: 1000 });
    return;
  }

  if (networkName == '') {
    webix.message({ type: "error", text: "Укажите сеть", expire: 1000 });
    return;
  }

  if (name == '') {
    webix.message({ type: "error", text: "Укажите вывеску", expire: 1000 });
    return;
  }

  if (address == '') {
    webix.message({ type: "error", text: "Укажите адрес", expire: 1000 });
    return;
  }

  $$('input-point-search').setValue(name + ' ' + address + ' ' + cityName);

  var record = { id: GUID, Address: networkName + ', ' + address + ', ' + cityName, Borned: '', LastText: '', MessageID: -1, IsMy: 1, Flag: '', Badge: '', NetworkID: -1, SortOrder: 0, IsRoute: '', Lat: 0, Lon: 0,  };
  setCash('point', record);
  var id = $$("point").add(record);

  $$('point').showItem(id);

  var jstext = "checkDictionary('GetOffice', $$('officename'), '" + officeName + "');" +
                "checkDictionary('GetNetwork', $$('networkname'), '" + networkName + "');" +
                "checkDictionary('GetFormat', $$('formatname'), '" + formatname + "');";

  // сохранение ТТ 
  send('SetPoint', { 'Point': null, 'Company': localStorage.getItem('CompanyID'), 'OfficeName': officeName, 'CityName': cityName, 'NetworkName': networkName, 'Name': name, 'Address': address, 'FormatName': formatname, 'IsMe': 1, 'Author': localStorage.getItem('Author'), 'GUID': GUID },
    'point', id, jstext);

  $$('input-point-search').refresh();

  $$('point').hideOverlay();

  $$('pointLine').show();
}

function refreshSavedArt(answer, id, guid) {
  // обновление ответа в списке вопросов
  var rowQuestion = $$('question').find(function (obj) { return (obj.ActionID.toString() == actionID && obj.IsArt.toString() == isArt && obj.ID.toString() == questionID) }, true);
  setQuestionAnswer(rowQuestion, pointID, actionID, artID, questionID);

  // установка флага Есть ответы
  row = $$('artAnswer').find(function (obj) { return (obj.PointID.toString() == pointID && obj.ArtID.toString() == artID && obj.QuestionID.toString() == questionID) }, true);

  if (artID != -1) {
    var rowArt = $$('art').find(function (obj) { return (obj.ActionID.toString() == actionID && obj.ID.toString() == artID) }, true);

    if (rowArt != null) {
      rowArt.Description = (row.PointID != null) ? 'есть ответы' : '';
      $$('art').updateItem(rowArt.id, rowArt);
    }
  }

  send('SetArt', { 'Point': pointID, 'User': localStorage.getItem('Author'), 'Action': actionID, 'Art': artID, 'Question': questionID, 'Option': optionID, 'Answer': answer, 'GUID': guid }, $$('artAnswer'), id);
}

function saveArt(answer) {
  // сохранение в ответах
  row = $$('artAnswer').find(function (obj) { return (obj.PointID.toString() == pointID && obj.ActionID.toString() == actionID && obj.ArtID.toString() == artID && obj.QuestionID.toString() == questionID && obj.OptionID.toString() == optionID) }, true);

  var id = row.id;

  if (row.ArtID != null) {
    if (answer == '')
      $$('artAnswer').remove(row.id);
    else {
      row.Answer = answer;

      $$('artAnswer').updateItem(row.id, row);
    }
  }
  else {
    if (answer != '') {
      var company = -1;

      if (actionID != -1)
        company = $$('art').find(function (obj) { return (obj.ID.toString() == artID) }, true).CompanyID;

      id = $$('artAnswer').add({ PointID: pointID, ActionID: actionID, ArtID: artID, CompanyID: company, QuestionID: questionID, OptionID: optionID, Answer: answer, GUID: null, Photo: '', Lat: 0, Lon: 0, Error: 0 });
    }
  }

  onResizePoint(pointID);

  refreshSavedArt(answer, id, null);
}

function saveArtPhoto() {
  var fileName = '';

  if (imagePhoto != null) {
    if (imagePhoto.indexOf('data:image/png;base64,') == -1)
      fileName = 'data:image/png;base64,' + imagePhoto;
    else fileName = imagePhoto;
  }

  row = $$('artAnswer').find(function (obj) { return (obj.PointID.toString() == pointID && obj.ActionID.toString() == actionID && obj.ArtID.toString() == artID && obj.QuestionID.toString() == questionID && obj.OptionID.toString() == optionID) }, true);

  if (row.ArtID != null)
    $$('artAnswer').remove(row.id);

  var company = -1;

  if (actionID != -1)
    company = $$('art').find(function (obj) { return (obj.ID.toString() == artID) }, true).CompanyID;

  var id = $$('artAnswer').add({ PointID: pointID, ActionID: actionID, ArtID: artID, CompanyID: company, QuestionID: questionID, OptionID: -1, Answer: 'Фото', GUID: GUID, Photo: fileName, Lat: 0, Lon: 0, Error: 0 });

  refreshSavedArt('Фото', id, GUID);
}

// сохранение данных по пользователю
function saveUser() {
  var lname = $$('lname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var fname = $$('fname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var mname = $$('mname').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var rolename = $$('rolename').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

  if (lname == '') {
    webix.message({ type: "error", text: "Укажите фамилию", expire: 1000 });
    return;
  }

  if (rolename == '') {
    webix.message({ type: "error", text: "Укажите должность", expire: 1000 });
    return;
  }

  var jstext = "checkDictionary('GetRole', $$('rolename'), '" + rolename + "');"

  send('SetUsers', {
    'User': localStorage.getItem('Author'), 'Phone': localStorage.getItem('Phone'), 'Company': localStorage.getItem('CompanyID'), 'LName': lname, 'FName': fname, 'MName': mname, 'RoleName': rolename,
    'Author': localStorage.getItem('Author')
  }, null, null, jstext);

  localStorage.setItem('UserName', lname + ' ' + fname);
  localStorage.setItem('RoleName', rolename);

  $$('menu-user-name').define('template', localStorage.getItem('UserName') + '<br/>' + localStorage.getItem('RoleName')); $$('menu-user-name').refresh();

  $$('userInfo').hide();
  $$('userInfo-header').hide();
}

// сохранение данных по пользователю
function saveUserNew() {
  var phone = $$('phone').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var lname = $$('lnameNew').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var fname = $$('fnameNew').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var mname = $$('mnameNew').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var rolename = $$('rolenameNew').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();

  if (lname == '') {
    webix.message({ type: "error", text: "Укажите фамилию", expire: 1000 });
    return;
  }

  if (phone == '') {
    webix.message({ type: "error", text: "Укажите телефон", expire: 1000 });
    return;
  }

  if (rolename == '') {
    webix.message({ type: "error", text: "Укажите должность", expire: 1000 });
    return;
  }

  var jstext = "checkDictionary('GetRole', $$('rolenameNew'), '" + rolename + "');"

  send('SetUsers', {
    'User': null, 'Phone': phone, 'Company': localStorage.getItem('CompanyID'), 'LName': lname, 'FName': fname, 'MName': mname, 'RoleName': rolename, 'Author': localStorage.getItem('Author')
  }, null, null, jstext);

  $$('navigation').back();
}

// Закрепление\открепление ТТ за пользователем
function savePointMap(user, point, status) {
  send('SetPointMap', { 'User': user, 'Point': point, 'Status': status, 'Author': localStorage.getItem('Author') }, null, null);

  GetAcceptor(point, '');

  if (user != localStorage.getItem('Author')) return;

  var item = $$('point').getSelectedItem();
  item.IsMy = status;

  $$('point').updateItem(item.id, item);
  //$$('point').refresh();
  //pointFilter(mainid, filterid);
}

function showPhoto(photo, user, guid, text) {
  if (photo.indexOf('data:image/png;base64,') != -1) {
    template = '<div><img class="photofull" src="' + photo + '" id="photofull" onclick="zoom()"/></div>';
  }
  else {
    var img;

    if (guid != null)
      img = sessionStorage.getItem(user.toString() + '_' + guid.toString());

    var template;

    if (img == null)
      template = '<div><img class="photofull" src="' + URLname + photo + '" id="photofull" onclick="zoom()"/></div>';
    else
      template = '<div><img class="photofull" src="' + img + '" id="photofull" onclick="zoom()"/></div>';
  }

  $$('btn-hide-photo').hide();
  $$('photoDiv').define('template', template);
  $$("photoDiv").scrollTo(0, 0);
  $$('photoDiv').refresh();

  if (text != null)
    $$('btnPhotoLayer').define('template', text);
  else $$('btnPhotoLayer').define('template', 'ФОТО');
  $$('btnPhotoLayer').refresh();

  $$('btnCreateTask').hide();
  angle = 0;

  $$('createTask').hide();

  $$('layoutPhoto').show();
}

function photoUpload(GUID, magic) {
  $$("photoUploader").define("formData", { Magic: magic, Author: localStorage.getItem('Author'), GUID: GUID, Company: localStorage.getItem('CompanyID'), Flag: (isMobileDevice) ? 1 : 2 });

  $$("photoUploader").fileDialog();
}

function onPhotoUpload() {
  app.photoGeo(pointID, GUID);

  var magic = $$("photoUploader").config.formData.Magic;

  sessionStorage.setItem('photoLat', 0);
  sessionStorage.setItem('photoLon', 0);
  sessionStorage.setItem('photoError', 0);

  $.ajax({
    url: URLname + 'Services/System.asmx/GetUploadFileName',
    data: JSON.stringify({ 'Key': localStorage.getItem('Author').toString() + '_' + GUID.toString(), 'Company': localStorage.getItem('CompanyID') }),
    success: function (filename) {
      $.ajax({
        url: URLname + 'Services/System.asmx/GetPhotoBase64',
        data: JSON.stringify({ 'FileName': URLname + filename.d }),
        success: function (data) {
          if (data.d == null) return;

          var result = JSON.parse(data.d);

          if (result.length == 0) return;

          imagePhoto = result[0].FileName;

          //if (result[0].FileName != "data:,")
          // sessionStorage.setItem(localStorage.getItem('Author').toString() + '_' + GUID.toString(), result[0].FileName);

          onAfterPhotoUpload(magic, localStorage.getItem('Author').toString() + '_' + GUID.toString());
        },
        complete: function () {
          list.hideProgress();
        }
      });
    },
    complete: function () {
      list.hideProgress();
    }
  });
}

function onAfterPhotoUpload(page, key) {
  if (page == 'task') {
    $$('taskCategory').show();
    return;
  }

  if (page == 'message') {
    saveMessage();
    return;
  }

  if (page == 'note') {
    $$('taskCategory').show();
    return;
  }

  if (page == 'photo') {
    if ($$('brand').count() < 2) {
      brandID = -1;
      brandName = '';

      // если брендов в компании нет
      if ($$('photoCategory').count() != 0) {
        $$('photoCategories').show();
      }
      else {
        // если фотокатегории не определены
        categoryID = -1;
        categoryName = '';

        savePhotoReport();
      }
    }
    else $$('brandLists').show();

   return;
  }

  if (page == 'photoPromo') {
    savePhotoPromo();
    return;
  }

  if (page == 'art') {
    saveArtPhoto();
    return;
  }

  if (page == 'chat') {
    saveChat();
    return;
  }
}

function photoUploadUser() {
  $$("photoUploaderUser").fileDialog();
}

function onSoundUpload(item) {

  var rowQuestion = $$('question').find(function (obj) { return (obj.ActionID.toString() == actionID && obj.IsArt.toString() == isArt && obj.ID.toString() == questionID) }, true);
  rowQuestion.Answer = "Аудиозапись";
  $$('question').updateItem(rowQuestion.id, rowQuestion);

  webix.message({
    type: "default", text: "Файл успешно сохранен!"
  });
}

function onPhotoUploadUser(item) {
  $$("userInfo").hideProgress();

  var date = new Date();
  var time = date.getTime();
  $("div.facebig").removeAttr('style').attr('style', "background: url(" + URLname + "Photos/User/" + localStorage.getItem('Author') + "." + item.type + "?time=" + time + ") no-repeat center center; background-size: 150px 150px;");
}

function updateTabBar(magic) {
  // определяем кол-во фотоотчетов
  setMenuBadge(3, $$('photo').find(function (objPhoto) { return (objPhoto.PointID.toString() == pointID) }).length);

  // определяем кол-во отчетов
  setMenuBadge(4, $$('artAnswer').find(function (objArt) { return (objArt.PointID.toString() == pointID) }).length);

  if (magic == 'first') {
    // $$('tabMenu').select($$('tabMenu').getFirstId());
    $$('taskLine').show();
  }
}

function setMenuBadge(id, badge) {
  var item = $$('tabMenu').find(function (obj) { return (obj.id.toString() == id) }, true);
  item.badge = badge;
  $$('tabMenu').updateItem(item.id, badge);
}


function updatePoint(messageRow) {
  var row = $$("point").getItem(messageRow.PointID);

  if (row != null) {
    row.MessageID = messageRow.id;
    row.Borned = messageRow.Borned;

    row.SortOrder = -1;

    var text = getLastText(messageRow.Text);
    row.LastText = (text == '') ? messageRow.Text : text;

    $$('point').updateItem(row.id, row);
    updateCash('point', row);

    _setPointBadge(row);
    afterResizePoint();

    $$('point').sort("#MessageID#", "desc", "int");
    $$('point').refresh();
  }
}

function trashCollector() {
  for (var i = 0; i < sessionStorage.length; i++) {
    var name = sessionStorage.key(i);

    var pos = name.indexOf('_');

    if (pos != -1) {
      var GUID = name.substring(pos + 1);

      var isExists = false;

     

      // поиск по фотоотчетам
      if (!isExists) {
        var list = $$('photo');
        for (var id in list.data.pull)
          if (list.getItem(id).GUID == GUID)
            isExists = true;
      }

      // поиск по ответам по SKU
      if (!isExists) {
        var list = $$('artAnswer');
        for (var id in list.data.pull)
          if (list.getItem(id).GUID == GUID)
            isExists = true;
      }

      if (!isExists)
        sessionStorage.removeItem(name);
    }
  }
}

function addNewPoint() {
  $$('officename').setValue(''); $$('officename').refresh();
  $$('cityname').setValue(''); $$('cityname').refresh();
  $$('networkname').setValue(''); $$('networkname').refresh();
  $$('name').setValue(''); $$('name').refresh();
  $$('address').setValue(''); $$('address').refresh();
  $$('formatname').setValue(''); $$('formatname').refresh();

  $$('newPoint').show();
}

function setPointGeo() {
  webix.confirm({
    title: "Геокоординаты ТТ",
    ok: "Да",
    cancel: "Отмена",
    type: "confirm",
    text: "Сервис 'Я ЗДЕСЬ' предназначен для уточнения местоположения ТТ по геокоординатам.<br/>'Установить Ваше текущее местоположение в качестве координат ТТ?<br/>",
    callback: function (result) {
      if (result)
        app.getGeo();
    }
  });
}
 

function Visit(point) {
  if (point == null) {
    point = localStorage.getItem('VisitPointID');
    if (point == null) return;
  }

  if (point == -1) return;

  if (point == null) {
    localStorage.removeItem('VisitPointID');
    localStorage.removeItem('VisitPointName');
    localStorage.removeItem('VisitBorned');

    return;
  }

  if (isVisit != 1) {

    var itemSetting = $$('companySetting').getItem(31);
    var roleName = localStorage.getItem('RoleName');
    var IDcompany = localStorage.getItem('CompanyID');

    if (itemSetting != null) {
      if (itemSetting.status == 1) {
        if (!isIOS) { 
          if (IDcompany != 15) {
            webix.alert({
              title: "Запрет визита из браузера", type: "alert-error", text: "Пожалуйста, используйте мобильное приложение для визита в ТТ"
            });
            return;
          } else if (roleName != 'ТЕСТ') {
            webix.alert({
              title: "Запрет визита из браузера", type: "alert-error", text: "Пожалуйста, используйте мобильное приложение для визита в ТТ"
            });
            return;
          }
        }
      }
    }

    webix.confirm({
      title: "Визит", ok: "Да", cancel: "Нет", type: "confirm", text: "Начать визит в ТТ по адресу<br/><b>" + pointName + "</b>?",
      callback: function (result) {
        if (!result)
          return;
        else {
          isVisit = 1;

          localStorage.setItem('VisitPointID', point);
          localStorage.setItem('VisitPointName', pointName);
          localStorage.setItem('VisitBorned', getDate());

          var item = $$('point-menu').getItem(1);
          item.Status = 0;
          $$('point-menu').updateItem(1, item);

          item = $$('point-menu').getItem(2);
          item.Description = pointName;
          item.Status = 1;
          $$('point-menu').updateItem(2, item);

          $$('point-menu').filter(function (obj) { return obj.Status == 1 });
                    
          var item = $$('point').getItem(point);
          if (item != null)
            $$('point').updateItem(item.id, item);

          app.visitGeo(point);          
        }
      }
    });
  }
  else {
    webix.confirm({
      title: "Визит", ok: "Да", cancel: "Нет", type: "confirm", text: "Завершить визит в ТТ по адресу<br/><b>" + localStorage.getItem('VisitPointName') + "</b>?",
      callback: function (result) {
        if (!result) {
          $$('pointLine').show();
          return;
        }
        else {
          isVisit = 0;

          localStorage.removeItem('VisitPointID');
          localStorage.removeItem('VisitPointName');
          localStorage.removeItem('VisitBorned');

          var item = $$('point-menu').getItem(2)
          item.Status = 0;
          $$('point-menu').updateItem(2, item);

          item = $$('point-menu').getItem(1);
          item.Status = 1;
          $$('point-menu').updateItem(1, item);

          $$('point-menu').filter(function (obj) { return obj.Status == 1 });

          isVisit = 0;

          var item = $$('point').getItem(point);
          if (item != null)
            $$('point').updateItem(item.id, item);

          app.visitGeo(point);

          $$('pointLine').show();
        }
      }
    });
  }
}

function GetAction() {
  $.ajax({
    url: URLname + 'Services/Action.asmx/GetAction',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('action', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('action');
    }
  });
}

function GetActionPointMap() {
  $.ajax({
    url: URLname + 'Services/Action.asmx/GetActionPointMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('actionPoint', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('actionPoint');
    }
  });
}

function GetActionMatrix() {
  $.ajax({
    url: URLname + 'Services/Action.asmx/GetActionMatrix',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('actionMatrix', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('actionMatrix');
    }
  });
}

function ActionFilter() {
  $$('actionSegmented').hide();
  $$('promoSegmented').hide();

  if (localStorage.getItem('VisitPointID') != null)
    if (isVisit == 0 || localStorage.getItem('VisitPointID') != pointID) {
      webix.message({ type: "error", text: "Завершите визит в ТТ " + localStorage.getItem('VisitPointName'), expire: 1000 });
      return;
    }

  actionID = -1;

  if (localStorage.getItem('Magic') == 'CLIENT' || localStorage.getItem('Magic') == 'TEAM') {
    companyID = localStorage.getItem('CompanyID');
    companyName = localStorage.getItem('CompanyName');

    getActionFilter(pointID, companyID);
  }
  else {
    if ($$('company').count() == 1) {
      var item = $$('company').getItem($$('company').data.order[0]);
      companyID = item.ID;
      companyName = item.Name;

      getActionFilter(pointID, companyID);
    }
    else $$('company').show();
  }
}

function getActionFilter(point, company) {
  var menu = $$('point-menu').getItem('102');
  menu.Description = 'загрузка...';
  $$('point-menu').updateItem(102, menu);

  var list = $$('action');

  for (var id in list.data.pull) {
    var action = list.getItem(id);

    action.PointID = '';

    if (action.IsPromo == IsPromo) {
      if (action.CompanyID == company) {
        if (action.ID == -1)
          action.PointID = point;
        else {

          var row = $$('actionPoint').find(function (obj) { return (obj.PointID.toString() == point && obj.ActionID == action.ID) }, true);

          if (row.PointID != null)
            action.PointID = row.PointID;
        }
      }
    }
  }
  list.refresh();

  list.filter(function (obj) {
    return (obj.PointID.toString() == point);
  });

  if (list.count() == 1) {
    var item = list.getItem(list.data.order[0]);

    list.select(item.id);
    actionID = item.ID;

    if (item.ID == -1) {
      $$('art-company-header').define('template', list.getItem(list.data.order[0]).Name + '</br>' + pointName); $$('art-company-header').refresh();

      getArtList(-1, point, company);
      return;
    }
  }

  menu.Description = '';
  $$('point-menu').updateItem(102, menu);

  $$('action-company-header').define('template', companyName); $$('action-company-header').refresh();
  $$('actionList').show();
}

function GetVisitDay() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetVisitDate',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('visitDay', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('visitDay');
    }
  });
}

// список стандартов выкладки
function GetStandart() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetStandart',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('standart', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('standart');
    },
    complete: function () {
      GetStandartMap();
    }
  });
}

// список стандартов выкладки в привязке к ТТ
function GetStandartMap() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetStandartMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      listUpdate('standartMap', 'all', data.d);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('standartMap');
    }
  });
}

// список файлов стандарта выкладки
function GetStandartFile(standart, type) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetStandartFile',
    data: JSON.stringify({ 'Standart': standart }),
    success: function (data) {
      var list = $$('standartFile');

      list.clearAll();
      list.parse(data.d);

      var item = list.getItem(list.getFirstId());
      if (item == null) return

      if (type == 1) 
        top.location.href = URLname + 'admin' + item.FilePath;
      else showStandartFile(item.FilePath, standartName);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });
}

// стандарты выкладки по ТТ и компании
function getStandartList(point, company) {
  var list = $$('standartMap');

  list.filter(function (obj) {
    return ((obj.PointID.toString() == point) && (obj.CompanyID.toString() == company));
  });


  for (var id in list.data.pull) {
    var item = list.getItem(id);

    var row = $$('standart').find(function (obj) { return (obj.StandartID.toString() == item.StandartID) }, true);

    if (row.StandartID != null) {
      item.Name = row.Name;
      item.Description = row.Description;
      item.TypeID = row.TypeID;
    }
  }
  list.refresh();

  $$('standartLists').show();
}

// список чатов
function getChatAcceptor(flag) {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetChatAcceptor',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Flag': flag }),
    success: function (data) {
      listUpdate('chatAcceptor', flag, data.d);

      setChatBadge();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      getCash('chatAcceptor');
    }
  });
}

function saveGroup() {
  var name = $$('GroupName').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  var description = $$('GroupDescription').getValue().replace(new RegExp("\n", 'g'), "").replace(new RegExp("'", 'g'), "\'").replace(new RegExp('"', 'g'), '\"').trim();
  
  if (name == '') {
    webix.message({ type: "error", text: "Укажите название группы", expire: 1000 });
    return;
  }

  GUID = +new Date;

  $.ajax({
    url: URLname + 'Services/UI.asmx/SetGroup',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Name': name, 'Description': description, 'GUID': GUID }),
    success: function (data) {
      var result = JSON.parse(data.d);

      if (result.length != 0) {
        var item = $$('chatAcceptor').getItem(result[0].id);

        if (item == null) {
          var record = { id: result[0].id, Name: result[0].Name, RoleName: result[0].RoleName, Photo: '', Borned: '', LastText: '', Badge: '', ChatID: -1 }
          var id = $$('chatAcceptor').add(record);
          $$('chatAcceptor').showItem(id);


          groupID = id;
        }
        else groupID = item.id;

        getGroupUser();        
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });  
}

function getGroupUser() {
  $.ajax({
    url: URLname + 'Services/UI.asmx/GetGroupUserMap',
    data: JSON.stringify({ 'User': localStorage.getItem('Author'), 'Group': groupID }),
    success: function (data) {
      $$('groupUser').clearAll();
      $$('groupUser').parse(data.d)

      $$('groupUserMap').show();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });
}

// список дополнительных отчетов
function getAdditional() {
  $.ajax({
    url: URLname + 'Services/Report.asmx/GetAdditional',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      $$('reportAdd').clearAll();
      $$('reportAdd').parse(data.d);

      if (JSON.parse(data.d).length == 0)
        $$('menulist').filter(function (obj) { return obj.id != 49 });
    }
  });
}

function getUserSetting() {
  $.ajax({
    url: URLname + '/Services/UI.asmx/GetSetting',
    data: JSON.stringify({ 'User': localStorage.getItem('Author') }),
    success: function (data) {
      var info = JSON.parse(data.d);

      $$("navigation").hideProgress();

      for (var i = 0; i < info.length; i++) {
        switch (info[i].Magic) {
          case 'PHOTO_DIMENSION':
            for (var id in $$('photoSetting').data.pull) {
              var row = $$('photoSetting').getItem(id);
              row.IsActive = 0;

              if (row.Value == info[i].Value) {
                row.IsActive = 1;
                Dimension = info[i].Value;
              }
            }
            $$('photoSetting').refresh();

            break;
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //webix.message({ type: "error", text: "Потеряно соединение с сервером.", expire: 2000 });
    }
  });
}