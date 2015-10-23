(function () {
    'use strict';

    var app = angular.module('app', []);

    app.controller('appController', ['$scope', function ($scope) {
        $scope.title = 'angularJS IdentityServer app';
    }]);
})();