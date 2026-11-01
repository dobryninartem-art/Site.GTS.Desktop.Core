// Перенесено из source/App_Code/ShareMethods.cs (исходная кодировка: cp1251).
// Код сохранён максимально близко к оригиналу; совместимость с .NET 8 обеспечивает папка Compat/.
#nullable disable
using System;
using System.Collections.Generic;
using System.Data;

public class ShareMethods
{
  // серилизация в JSON из базы обычный формата JSON
  public static string SerializeDataJSON(DataTable data)
  {
    System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

    serializer.MaxJsonLength = Int32.MaxValue;

    Dictionary<string, object> row;
    foreach (DataRow dr in data.Rows)
    {
      row = new Dictionary<string, object>();
      foreach (DataColumn col in data.Columns)
      {
        row.Add(col.ColumnName, dr[col]);
      }
      rows.Add(row);
    }
    return serializer.Serialize(rows);    
  }

  // серилизация в JSON из базы обычный формата JSON для нескольких выборок
  public static string SerializeDataJSONMany(List<DataTable> tables)
  {
    var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
    serializer.MaxJsonLength = Int32.MaxValue;

    // Создаем общий контейнер для всех таблиц
    var resultDict = new Dictionary<string, object>();

    for (int i = 0; i < tables.Count; i++)
    {
      DataTable dt = tables[i];
      List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

      foreach (DataRow dr in dt.Rows)
      {
        var row = new Dictionary<string, object>();
        foreach (DataColumn col in dt.Columns)
        {
          row.Add(col.ColumnName, dr[col]);
        }
        rows.Add(row);
      }

      // Ключи будут Table1, Table2 и т.д.
      resultDict.Add("Table" + (i + 1), rows);
    }

    return serializer.Serialize(resultDict);
  }

  public class ImageItem
  {
    public string GUID { get; set; }
    public string Data { get; set; }
  }
}