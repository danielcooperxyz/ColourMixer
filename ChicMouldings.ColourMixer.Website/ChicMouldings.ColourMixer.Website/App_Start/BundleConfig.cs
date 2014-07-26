
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
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/ColourMixer.js",
                        "~/Scripts/RGBColor.js"));

            bundles.Add(new StyleBundle("~/bundles/styles").Include(
                        "~/Styles/*.css"));
        }
    }
}