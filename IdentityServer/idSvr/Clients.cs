using System.Collections.Generic;
using IdentityServer3.Core;
using IdentityServer3.Core.Models;

namespace IdentityServer.idSvr
{
    public static class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "Implicit Client",
                    ClientId = "implicitclient",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "https://localhost:44300/", // self

                        "http://localhost:21654/index.html",
                        "http://localhost:11067/index.html",
                        "http://localhost:11067/#/callback/",


                        "http://localhost:23453/callback.html",
                        "http://localhost:23453/popup.html",
                        "http://localhost:23453/frame.html"
                    },

                    AllowedScopes = new List<string>
                    {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.Email,
                        "read",
                        "write"
                    },
                }
                
                //new Client
                //{
                //    Enabled = true,
                //    ClientName = "Authorization Client"
                //}
            };
        }
    }
}
