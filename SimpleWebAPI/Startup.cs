using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SimpleWebApi.Startup))]

namespace SimpleWebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://localhost:44300/idsvr",
                RequiredScopes = new[] { "write" }
            });

            // web api configuration
            app.UseWebApi(WebApiConfiguration());
        }

        public HttpConfiguration WebApiConfiguration()
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            config.EnableCors(
                new EnableCorsAttribute(
                    "http://localhost:11067",
                    "accept, authorization",
                    "GET",
                    "WWW-Authenticate"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );

            return config;
        }
    }
}
