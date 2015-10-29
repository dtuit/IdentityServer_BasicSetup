A project experimenting with setting up a Secure Token Service using IdentityServer3

Project uses the following.

ServerSide:
[IdentityServer3](https://github.com/IdentityServer/IdentityServer3), [IdentityManager](https://github.com/IdentityManager/IdentityManager), Asp.Net Identity, WebApi 2

Client:
AngularJS, [oidc-token-manager](https://github.com/IdentityModel/oidc-token-manager)

#### How To Set Up

Enable SSL on all projects and set as the Project Url.


#### ASP Identity.

```
Install-Package Microsoft.AspNet.Identity.EntityFramework
install-package IdentityServer3
```

#### IdentityServer and IdentityManager

```
install-package Microsoft.Owin.Host.Systemweb

install-package IdentityServer3
install-package IdentityServer3.AspNetIdentity

install-package IdentityManager -Pre
install-package IdentityManager.AspNetIdentity -Pre

install-package Microsoft.Owin.Security.Google
```

add project reference to `ASPIdentity


add to web.config
```xml
<system.webServer>
  <modules runAllManagedModulesForAllRequests="true" />
</system.webServer>
```

#### Web API

```
Install-Package Microsoft.AspNet.WebApi.Owin
Install-Package Microsoft.AspNet.WebApi.Cors
Install-Package Microsoft.Owin.Host.Systemweb
Install-Package IdentityServer3.AccessTokenValidation
```
