
    'use strict';

    var app = angular.module('app', ['ngRoute', "common.services"]);

    app.config(function ($routeProvider) {
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
                controller: 'CallbackCtrl'
            })
            .when("/error", {
                templateUrl: '/app/Views/message.html'
            })
            .otherwise({
                redirectTo: '/'
            });


        //$routeProvider.when("/AuthArea", {
        //    controller: "AuthAreaController",
        //    templateUrl:"views/authArea.html"
        //});
    });

    //app.controller('appController', ['$scope', function ($scope) {
    //    $scope.title = 'angularJS IdentityServer app';
    //}]);