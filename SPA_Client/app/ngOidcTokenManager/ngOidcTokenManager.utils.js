angular.module("ngOidcTokenManager.utils", ['ngOidcTokenManager'])
    .factory('tmErrorService', _tmErrorService)
    .controller('tmCallbackCtrl', _tmCallbackCtrl)
    .constant('tmAuthIntercept', _basicAuthIntercept)
    .factory('tmAuthorizer', _tmAuthorizer);

_basicAuthIntercept.$inject = ['$q', 'ngTokenManager2', 'tmErrorService'];
function _basicAuthIntercept($q, ngTokenManager, tmErrorService) {
    return {
        'request': function (config) {
            tmErrorService.clear();
            var token = ngTokenManager.access_token;
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        'responseError': function (response) {
            if (response.status === 401) {
                ngTokenManager.removeToken();
            }
            if (response.status === 403) {
                ngTokenManager.removeToken();
            }
            return $q.reject(response);
        }
    };
}

_tmErrorService.$inject = ['$rootScope', '$timeout'];
function _tmErrorService($rootScope, $timeout) {
    var svc = {
        show: function (err) {
            $timeout(function () {
                if (err instanceof Array) {
                    $rootScope.errors = err;
                }
                else {
                    $rootScope.errors = [err];
                }
            }, 100);
        },
        clear: function () {
            $rootScope.errors = null;
        }
    };

    return svc;
}

_tmCallbackCtrl.$inject = ['ngTokenManager2', 'tmErrorService', '$routeParams', '$rootScope', '$location'];
function _tmCallbackCtrl(ngTokenManager, tmErrorService, $routeParams, $rootScope, $location) {
    console.log("callbackCtrl");
    var hash = $routeParams.response;
    if (hash.charAt(0) === "&") {
        hash = hash.substr(1);
    }
    ngTokenManager.processTokenCallbackAsync(hash).then(function () {
        $location.url("/");
    }, function (error) {
        tmErrorService.show(error && error.message || error);
    });
};

_tmAuthorizer.$inject = ['ngTokenManager2'];
function _tmAuthorizer(ngTokenManager) {
    var svc = {
        isAuthenticated: function() {
            return !ngTokenManager.expired;
        },
        isAuthorized: function(role) {

            if (!ngTokenManager || ngTokenManager.expired || !ngTokenManager.profile) {
                return false;
            }

            var profile = ngTokenManager.profile;
            return profile.role && profile.role.indexOf(role) >= 0;
        },
        userName: function() {
            if (ngTokenManager.profile) {
                return ngTokenManager.profile.given_name ? ngTokenManager.profile.given_name : null;
            }
        }
    };
    Object.defineProperty(svc, 'token', {
        get: function () {
            return ngTokenManager.access_token;
        }
    });

    return svc;
}