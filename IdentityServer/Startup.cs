using System;
using System.Threading.Tasks;
using IdentityManager.Configuration;
using IdentityServer.idMgr;
using IdentityServer.idSvr;
using IdentityServer3.Core.Configuration;
using Microsoft.Owin;
using Microsoft.Owin.Security.Google;
using Owin;

[assembly: OwinStartup(typeof(IdentityServer.Startup))]

namespace IdentityServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/idmgr", adminApp =>
            {
                var factory = new IdentityManagerServiceFactory();
                factory.ConfigureSimpleIdentityManagerService("DefaultConnection");

                adminApp.UseIdentityManager(new IdentityManagerOptions()
                {
                    Factory = factory
                });
            });

            app.Map("/idsvr", core =>
            {
                var idSvrFactory = Factory.Configure();
                idSvrFactory.ConfigureUserService("DefaultConnection");

                var options = new IdentityServerOptions
                {
                    SiteName = "IdentityServer3 - UserService-AspNetIdentity",
                    SigningCertificate = Certificate.Get(),
                    Factory = idSvrFactory,
                    AuthenticationOptions = new AuthenticationOptions
                    {
                        IdentityProviders = ConfigureAdditionalIdentityProviders,
                    }
                };

                core.UseIdentityServer(options);
            });
        }

        public static void ConfigureAdditionalIdentityProviders(IAppBuilder app, string signInAsType)
        {
            var google = new GoogleOAuth2AuthenticationOptions
            {
                AuthenticationType = "Google",
                SignInAsAuthenticationType = signInAsType,
                ClientId = "767400843187-8boio83mb57ruogr9af9ut09fkg56b27.apps.googleusercontent.com",
                ClientSecret = "5fWcBT0udKY7_b6E3gEiJlze"
            };
            app.UseGoogleAuthentication(google);

        }
    }
}
