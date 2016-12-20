using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ThoiKhoaBieu.Startup))]
namespace ThoiKhoaBieu
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
