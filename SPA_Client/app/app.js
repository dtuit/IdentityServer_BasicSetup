
    'use strict';

    var app = angular.module('app', ['ngRoute', "common.services", "ngOidcTokenManager", "ngOidcTokenManager.utils"]);

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
                });
            //.otherwise({
            //    redirectTo: '/'
            //});

        var config = {
            client_id: "implicitclient",
            authority: "https://localhost:44300/idsvr",
            redirect_uri: window.location.protocol + "//" + window.location.host + "/#/callback/",
            post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
            response_type: "token",
            scope: "read write",
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + $browser.baseHref() + "app/Views/frame.html",
            //silent_renew: true
        };
        //var config = {};
        ngTokenManagerProvider.setAuthConfig(config);

        //$httpProvider.interceptors.push(tokenIntercept);

    }]);

    //app.controller('appController', ['$scope', function ($scope) {
    //    $scope.title = 'angularJS IdentityServer app';
    //}]);