angular.module('app')
    .controller('LayoutCtrl', _layoutCtrl);

_layoutCtrl.$inject = ['$rootScope', '$location', '$window', 'ngTokenManager2', 'tmErrorService', 'tmAuthorizer'];
function _layoutCtrl($rootScope, $location, $window, ngTokenManager, tmErrorService, tmAuthorizer) {
    $rootScope.layout = {};

    $rootScope.isAuthenticated = tmAuthorizer.isAuthenticated;
    $rootScope.isAuthorized = tmAuthorizer.isAuthorized;

    function removed() {
        tmErrorService.clear();
        $rootScope.layout.username = null;
        $rootScope.layout.links = null;
        $rootScope.layout.showLogout = !ngTokenManager.expired;
        $rootScope.layout.showLogin = ngTokenManager.expired;
    }

    function load() {
        removed();

        if (!ngTokenManager.expired) {
            if (ngTokenManager.profile && ngTokenManager.profile.preferred_username)
                $rootScope.layout.username = ngTokenManager.profile.preferred_username;
            //idmApi.get().then(function (api) {
            //    $rootScope.layout.username = api.data.currentUser.username;
            //    $rootScope.layout.links = api.links;
            //}, function (err) {
            //    tmErrorService.show(err);
            //});
        }
    }

    ngTokenManager.addOnTokenObtained(load);
    ngTokenManager.addOnTokenRemoved(removed);
    load();

    if (ngTokenManager.expired &&
        $location.path() !== "/" &&
        $location.path().indexOf("/callback/") !== 0 &&
        $location.path() !== "/error" &&
        $location.path() !== "/logout") {

        $location.path("/");
    }

    ngTokenManager.addOnTokenExpired(function() {
        $location.path("/");
        tmErrorService.show("Your session has expired.");
    });

    $rootScope.login = function() {
        tmErrorService.clear();
        ngTokenManager.redirectForToken();
    }
    $rootScope.logout = function() {
        tmErrorService.clear();
        ngTokenManager.redirectForLogout();
    }

}