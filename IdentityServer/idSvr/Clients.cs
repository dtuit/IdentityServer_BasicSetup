using System.Collections.Generic;
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
                    ClientName = "Basic Client Implicit",
                    ClientId = "implicitclient",
                    Flow = Flows.Implicit,

                    RedirectUris = new List<string>
                    {
                        "https://localhost:44300/", // self
                        "http://localhost:21654/index.html"
                    },

                    AllowAccessToAllScopes = true
                }
            };
        }
    }
}
