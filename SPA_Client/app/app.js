
    'use strict';

    var app = angular.module('app', ['ngRoute', "ngOidcTokenManager", "ngOidcTokenManager.utils"]);
    
    var api = {
        urls : {
            idsvr : "https://localhost:44300/idsvr",
            api : "https://localhost:44301/api"
        },
        resources : {
            identity: "/Identity"
        }
    }

    app.constant('api', api);

    app.config(
        ['$routeProvider', 'ngTokenManager2Provider', '$httpProvider', "api", "tmAuthIntercept",
        function ($routeProvider, ngTokenManager2Provider, $httpProvider, api, tmAuthIntercept) {
            console.log(api);

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
            authority: api.urls.idsvr,
            redirect_uri: window.location.protocol + "//" + window.location.host + "/#/callback/",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
            response_type: "id_token token",
            scope: "openid profile read write"
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + $browser.baseHref() + "app/Views/frame.html",
            //silent_renew: true
        };
        //var config = {};
        ngTokenManager2Provider.setAuthConfig(config);

        $httpProvider.interceptors.push(tmAuthIntercept);

    }]);
