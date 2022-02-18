using EPiServer.Authorization;
using EPiServer.Shell;
using EPiServer.Shell.Navigation;
using System.Collections.Generic;

namespace Cms.UI.Plugin
{
    [MenuProvider]
    sealed public class MenuProvider : IMenuProvider
    {
        public IEnumerable<MenuItem> GetMenuItems()
        {
            var name = "Cms Plugin";
            var path = MenuPaths.Global + "/cms/adminplugin";
            var url = Paths.ToResource(GetType(), "Container");

            var link = new UrlMenuItem(name, path, url)
            {
                SortIndex = 200,
                AuthorizationPolicy = CmsPolicyNames.CmsAdmin
            };

            return new List<MenuItem>
            {
                link
            };
        }
    }
}
