    angular
		.module("common.services")
		.factory("tokenManager",
				["$browser", tokenManager]);

    function tokenManager($browser) {

        var config = {
            client_id: "implicitclient",
            authority: "https://localhost:44300/idsvr",
            redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + $browser.baseHref(),
            response_type: "token",
            scope: "read write",
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + $browser.baseHref() + "app/Views/frame.html",
            //silent_renew: true
        };

        var manager = new OidcTokenManager(config);

        var tokenExpired = function () {
            //notifier.notify("token-expired");
            alert("Token Expired")
            manager.removeToken();
        };

        manager.addOnTokenExpired(tokenExpired);
        manager.addOnSilentTokenRenewFailed(tokenExpired);

        window.man = manager;

        return manager;
    }