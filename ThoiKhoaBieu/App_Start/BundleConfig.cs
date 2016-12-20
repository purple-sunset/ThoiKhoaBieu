using System.Web;
using System.Web.Optimization;

namespace ThoiKhoaBieu
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/bootstrap/vendor/bootstrap/css/bootstrap.min.css",
                      "~/bootstrap/vendor/metisMenu/metisMenu.min.css",
                      "~/bootstrap/dist/css/sb-admin-2.css",
                      "~/bootstrap/vendor/font-awesome/css/font-awesome.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/bootstrap/vendor/jquery/jquery.min.js",
                        "~/bootstrap/vendor/bootstrap/js/bootstrap.min.js",
                        "~/bootstrap/vendor/metisMenu/metisMenu.min.js",
                        "~/bootstrap/dist/js/sb-admin-2.js"));

        }
    }
}
