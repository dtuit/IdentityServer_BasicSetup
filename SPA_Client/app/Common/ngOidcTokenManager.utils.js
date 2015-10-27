angular.module("ngOidcTokenManager.utils", ['ngOidcTokenManager'])
    .factory('tmErrorService',['$rootScope', '$timeout', _errorService])
    .controller('tmCallbackCtrl', ['ngTokenManager', 'tmErrorService', '$routeParams', '$rootScope', '$location', _callbackCtrl])
    .constant('tmAuthIntercept',['$q', 'ngTokenManager', 'tmErrorService', _basicAuthIntercept]);

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

function _errorService($rootScope, $timeout) {
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

function _callbackCtrl(ngTokenManager, tmErrorService, $routeParams, $rootScope, $location) {
    console.log("callbackCtrl");
    var hash = $routeParams.response;
    if (hash.charAt(0) === "&") {
        hash = hash.substr(1);
    }
    ngTokenManager.processTokenCallbackAsync(hash).then(function () {
        $location.url("/");
    }, function (error) {
        tmErrorService.error(error && error.message || error);
    });
};