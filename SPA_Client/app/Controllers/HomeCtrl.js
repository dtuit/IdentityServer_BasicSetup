app.controller("HomeCtrl", ['$scope', 'ngTokenManager', '$http', homeCtrl]);
    
function homeCtrl($scope, ngTokenManager, $http) {
    $scope.title = "Home";
    window.tokenManagerProvider = ngTokenManager;

    $scope.login = function() {
        ngTokenManager.redirectForToken();
    }
}