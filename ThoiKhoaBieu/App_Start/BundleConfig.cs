using System.Web;
using System.Web.Optimization;

namespace ThoiKhoaBieu
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/bootstrap/vendor/bootstrap/css/bootstrap.min.css",
                "~/bootstrap/vendor/metisMenu/metisMenu.min.css",
                "~/bootstrap/dist/css/sb-admin-2.css",
                "~/bootstrap/vendor/font-awesome/css/font-awesome.min.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                "~/Content/themes/base/datepicker.css",
                "~/Content/themes/base/core.css",
                "~/Content/themes/base/theme.css",
                "~/Content/kendo/2015.1.318/kendo.material.min.css",
                "~/Content/kendo/2015.1.318/kendo.common-material.core.min.css",
                "~/Content/kendo/2015.1.318/kendo.common-material.min.css",
                "~/Content/font-awesome.min.css",
                "~/Content/ionicons.min.css",
                "~/Content/SilverFoxOverall.css",
                "~/Content/sweetalert.css"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/bootstrap/vendor/jquery/jquery.min.js",
                "~/bootstrap/vendor/metisMenu/metisMenu.min.js",
                "~/bootstrap/vendor/bootstrap/js/bootstrap.min.js",
                "~/bootstrap/dist/js/sb-admin-2.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                "~/Scripts/kendo/2015.1.318/kendo.all.min.js",
                "~/Scripts/kendo/2015.1.318/jszip.min.js",
                "~/Scripts/kendo/2015.1.318/kendo.aspnetmvc.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/sweetalert-dev.js",
                "~/Scripts/sweetalert.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                "~/Scripts/jquery-ui-{version}.js",
                "~/Scripts/jquery-ui.unobtrusive-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-3.1.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));
        }
    }
}