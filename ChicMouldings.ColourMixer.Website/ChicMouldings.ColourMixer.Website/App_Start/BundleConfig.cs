
namespace ChicMouldings.ColourMixer.Website.App_Start
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            Bundle bundle = new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.min.js",
                        "~/Scripts/ColourMixer.js",
                        "~/Scripts/RGBColor.js");

            if (!HttpContext.Current.IsDebuggingEnabled)
            {
                bundle.Include("~/Scripts/analytics.js");
            }

            bundles.Add(bundle);

            bundles.Add(new StyleBundle("~/bundles/styles").Include(
                        "~/Styles/*.css"));
        }
    }
}