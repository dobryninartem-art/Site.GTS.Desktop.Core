using System.Web.Services;

namespace Action
{
  [WebService(Namespace = "gts.online")]
  [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
  [System.Web.Script.Services.ScriptService]

  public class Framework : System.Web.Services.WebService
  {
    // список вопросов по SKU
    [WebMethod(EnableSession = true)]
    public string GetQuestion(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetQuestion(User));
    }

    // список перечислимых ответов по SKU
    [WebMethod(EnableSession = true)]
    public string GetQuestionOption(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetQuestionOption(User));
    }

    // список промо
    [WebMethod(EnableSession = true)]
    public string GetAction(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetAction(User));
    }

    // привязка промо к ТТ
    [WebMethod(EnableSession = true)]
    public string GetActionPointMap(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetActionPointMap(User));
    }

    // список SKU 
    [WebMethod(EnableSession = true)]
    public string GetArtMatrix(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetArtMatrix(User));
    }

    // список SKU для промо
    [WebMethod(EnableSession = true)]
    public string GetActionMatrix(object User)
    {
      if (User == null) return "";
      if (int.Parse(User.ToString()) == -1) return "";

      return ShareMethods.SerializeDataJSON(ActionBusiness.GetActionMatrix(User));
    }

    // сохранение проекта по мониторингу
    [WebMethod(EnableSession = true)]
    public string SetProject(object Project, object Company, object Name, object Description, object Start, object Finish)
    {
      return ShareMethods.SerializeDataJSON(ActionBusiness.SetProject(Project, Company, Name, Description, Start, Finish));
    }

    // удаление проекта по мониторингу
    [WebMethod(EnableSession = true)]
    public void DeleteProject(object Project)
    {
      ActionBusiness.DeleteProject(Project);
    }

    // восстановление проекта по мониторингу
    [WebMethod(EnableSession = true)]
    public void RestoreProject(object Project)
    {
      ActionBusiness.RestoreProject(Project);
    }
  }
}
