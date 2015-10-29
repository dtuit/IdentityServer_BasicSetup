
    'use strict';

    var app = angular.module('app', ['ngRoute', "ngOidcTokenManager", "ngOidcTokenManager.utils"]);

    app.config(
        ['$routeProvider', 'ngTokenManagerProvider', '$httpProvider', 
        function ($routeProvider, ngTokenManagerProvider, $httpProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: '/app/Views/home.html',
                    controller: 'HomeCtrl'
                })
                .when("/logout", {
                    templateUrl: '/app/Views/home.html'
                })
                .when("/callback/:response", {
                    templateUrl: '/app/Views/message.html',
                    controller: 'tmCallbackCtrl'
                })
                .when("/error", {
                    templateUrl: '/app/Views/message.html'
                })
                .when('/tokens', {
                    templateUrl: '/app/Views/tokens.html',
                    controller: 'TokensCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

        var config = {
            client_id: "implicitclient",
            authority: "https://localhost:44300/idsvr",
            redirect_uri: window.location.protocol + "//" + window.location.host + "/#/callback/",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
            response_type: "id_token token",
            scope: "openid profile read write"
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + $browser.baseHref() + "app/Views/frame.html",
            //silent_renew: true
        };
        //var config = {};
        ngTokenManagerProvider.setAuthConfig(config);

        //$httpProvider.interceptors.push(tokenIntercept);

    }]);
