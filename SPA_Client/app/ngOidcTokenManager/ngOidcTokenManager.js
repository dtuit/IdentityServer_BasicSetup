angular.module("ngOidcTokenManager", [])
    .provider("ngTokenManager", _tokenManagerProvider()); //rename to tokenManager

function _tokenManagerProvider() {
    return function () {

        var _authConfig = {};
        var isSetManually = false;

        this.setAuthConfig = function(authConfig) {
            _authConfig = authConfig;
            isSetManually = true;
        };

        this.getAuthConfig = function() {
            return _authConfig;
        };

        this.$get = [ '$injector', 'OidcTokenManager', '$rootScope', '$log',
            function ($injector, OidcTokenManager, $rootScope, $log) {

                if (!isSetManually) {
                    try {
                        _authConfig = $injector.get("authConfig");
                    } catch (err) {
                        $log.warn("OidcTokenManager authConfig not set");
                    }
                }

                var mgr = new OidcTokenManager(_authConfig);

                var applyFuncs = [
                        "_callTokenRemoved", "_callTokenExpiring",
                        "_callTokenExpired", "_callTokenObtained",
                        "_callSilentTokenRenewFailed"
                ];
                
                applyFuncs.forEach(function (name) {
                    var tmp = mgr[name].bind(mgr);

                    //cause a $digest to occur on when calling these functions.
                    mgr[name] = function () {
                        $rootScope.$applyAsync(function () {
                            tmp();
                        });
                    }
                });

                return mgr;
            }
        ];
    }
}



//function _testAuthController($scope, ngTokenManager, $http) {
//    ngTokenManger.redirectForToken();
//    //

    
//}

(function (angular) {
    var model = document.getElementById("OidcModel");

    if (model !== null) {
        model = JSON.parse(model.textContent.trim());
        for (var key in model) {
            if (model.hasOwnProperty(key)) {
                angular.module("ngOidcTokenManager").constant(key, model[key]);
            }
        }
    }
    angular.module("ngOidcTokenManager").constant("OidcTokenManager", OidcTokenManager);
})(angular);