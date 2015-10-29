angular.module('app')
    .controller('TokensCtrl', _tokensCtrl);

_tokensCtrl.$inject = ['$scope', "ngTokenManager2", "$http"];
function _tokensCtrl($scope, ngTokenManager, $http) {
    window.mys = $scope;

    $scope.access_token_display = function() {
        var res = {
            expires_in: ngTokenManager.expires_in,
            access_token: ngTokenManager.access_token
        }
        return JSON.stringify(res, null, 2);
    }

    $scope.id_token_display = function() {
        var res = {
            expires_in: ngTokenManager.expires_in,
            id_token: ngTokenManager.profile
        }
        return JSON.stringify(res, null, 2);
    }
    
    ngTokenManager.subscribeTo.tokenRemoved($scope, function () {
        console.log("tokenCtrlr tokenRemoved sub called");
        $scope.access_token_display();
    });

    $scope.removeToken = function() {
        ngTokenManager.removeToken();
    }

    $scope.apiResult = "";

    $scope.callIdentityApi = callIdentityApi;

    function callIdentityApi() {
        $http.get("https://localhost:44301/api/Identity").then(function (res) {
            console.log(res);
            $scope.apiResult = JSON.stringify(res.data,null, 2);
        });
    }
}