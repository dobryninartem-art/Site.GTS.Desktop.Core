using System;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;

namespace ExcelPS
{
  [System.Web.Script.Services.ScriptService]
  public class Framework
  {
    [System.Web.Services.WebMethod]
    public void ToExcel(object MenuID, object User, object Start, object Finish, object Company)
    {
      //шаблоны проверки для переменных
      //только цифры
      string patternInt = @"^[0-9]+$";
      Regex regexInt = new Regex(patternInt);
      //только цифры и точка в дате
      string patternDate = @"^[0-9.]+$";
      Regex regexDate = new Regex(patternDate);

      //проверка что переменный содержат только нужные символы
      if (regexInt.IsMatch(MenuID.ToString()) && regexDate.IsMatch(Start.ToString()) && regexInt.IsMatch(User.ToString()) && regexDate.IsMatch(Finish.ToString()) && regexInt.IsMatch(Company.ToString()))
      {
        string scriptPath = @"D:\transfer_clients\SQLtoXLS.ps1";
        
        //проверка наличие файла скрипта
        if (!File.Exists(scriptPath))
          return;

        //запуск скрипта с входными данными
        Process process = new Process();
        process.StartInfo.FileName = "powershell.exe";
        process.StartInfo.Arguments = "-WindowStyle Hidden -File \"" + scriptPath + "\" " + Convert.ToInt32(MenuID) + " " + Convert.ToInt32(User) + " " + Start.ToString() + " " + Finish.ToString() + " " + Convert.ToInt32(Company); ;
        process.StartInfo.CreateNoWindow = true;
        process.Start();
      }
      else
      {
        return;
      }
    }
  }
}