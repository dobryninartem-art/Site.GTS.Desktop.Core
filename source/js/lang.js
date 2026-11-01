
if (['RU', 'RH', 'LT', 'DM', 'WB'].includes(localStorage.getItem('SystemLang')))  {
  if (['RU', 'DM'].includes(localStorage.getItem('SystemLang'))) {
    mask = '+7(ddd)ddd-dd-dd';
    placeholderPhone = '+7(___)___-__-__';
  }
  else if (localStorage.getItem('SystemLang') === 'RH') {
    mask = '+1(ddd)ddd-dd-dd';
    placeholderPhone = '+1(___)___-__-__';
  }
  else if (localStorage.getItem('SystemLang') === 'LT') {
    mask = '+2(ddd)ddd-dd-dd';
    placeholderPhone = '+2(___)___-__-__';
  }
  else if (localStorage.getItem('SystemLang') === 'WB') {
    mask = '+5(ddd)ddd-dd-dd';
    placeholderPhone = '+5(___)___-__-__';
  }
  typePhone = 'tel';
  appLinkAndroid = 'https://play.google.com/store/apps/details?id=gts.visit';
  appLinkIOS = 'https://apps.apple.com/us/app/gts-visit/id6503892120';
  indexNoInternetConnect = "Нет подключения к серверу. Повторите попытку";
  indexCountry = 'Выберите страну';
  indexCompanies = 'Выберите компанию';
  indexInfo = 'Информация';
  indexEntry = 'Вход в систему';
  indexLogin = 'Логин: ';
  indexNext = 'Далее';
  indexBack = 'Назад';
  indexForgotPass = 'Забыли пароль?';
  indexCreatePass = 'Создайте пароль для входа в систему';
  indexPlaceholderPass1 = 'Введите пароль';
  indexPlaceholderPass2 = 'Повторите пароль';
  indexTextError = 'Укажите логин'
  indexTextError2 = 'Указанный логин не зарегистрирован';
  indexHello = 'Здравствуйте, ';
  indexEnterPass = 'Введите пароль!';
  indexIncorrectPass = 'Некорректный пароль';
  indexPassRecovery = "Восстановление пароля";
  indexPassRecovery2 = "Вам необходимо обратиться к руководителю или администратору системы для сброса пароля";
}
else if (localStorage.getItem('SystemLang') === 'UA') {
  indexNoInternetConnect = "Немає підключення до сервера. Повторіть спробу";
  mask = '+38(ddd)ddd-dd-dd';
  placeholderPhone = '+38(___)___-__-__';
  typePhone = 'tel';
  appLinkAndroid = 'https://play.google.com/store/apps/details?id=gts.visit';
  appLinkIOS = 'https://apps.apple.com/us/app/gts-visit/id6503892120';
  indexCountry = 'Виберіть країну';
  indexCompanies = 'Оберіть компанію';
  indexInfo = 'Інформація';
  indexEntry = 'Вхід в систему';
  indexLogin = 'Логін: ';
  indexNext = 'Далі';
  indexBack = 'Повернутися';
  indexForgotPass = 'Забули пароль?';
  indexCreatePass = 'Створіть пароль для входу в систему';
  indexPlaceholderPass1 = 'Введіть пароль';
  indexPlaceholderPass2 = 'Повторіть пароль';
  indexTextError = 'Вкажіть логін'
  indexTextError2 = 'Зазначений логін не зареєстрований';
  indexHello = 'Доброго дня, ';
  indexEnterPass = 'Введіть пароль!';
  indexIncorrectPass = 'Неправильний пароль';
  indexPassRecovery = "Відновлення паролю";
  indexPassRecovery2 = "Вам необхідно звернутися до керівника або адміністратора системи для скидання пароля";
}
else {
  indexNoInternetConnect = "No internet connection. Try again later";
  mask = '+0(ddd)ddd-dd-dd';
  placeholderPhone = "+0(___)___-__-__";
  typePhone = 'tel';
  appLinkAndroid = 'https://play.google.com/store/apps/details?id=gts.visit';
  appLinkIOS = 'https://apps.apple.com/us/app/gts-visit/id6503892120';
  indexCountry = "Choose the country";
  indexCompanies = "Select a company";
  indexInfo = "Information";
  indexEntry = "Login to the system";
  indexLogin = "Login: ";
  indexNext = "Next";
  indexBack = "Back";
  indexForgotPass = "Forgot your password?";
  indexCreatePass = "Create a password to log in";
  indexPlaceholderPass1 = "Enter password";
  indexPlaceholderPass2 = "Confirm password";
  indexTextError = "Enter login";
  indexTextError2 = "Login not registered";
  indexHello = 'Hello, ';
  indexEnterPass = "Enter password!";
  indexIncorrectPass = "Incorrect password";
  indexPassRecovery = "Password recovery";
  indexPassRecovery2 = "Please contact your supervisor or system administrator to reset your password";
}
