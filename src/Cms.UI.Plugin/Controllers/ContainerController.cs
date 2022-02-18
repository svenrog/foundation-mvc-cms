using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cms.UI.Plugin.Controllers
{
    public class ContainerController : Controller
    {
        [Authorize(Roles = "CmsAdmins")]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
