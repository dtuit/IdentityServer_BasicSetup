app.controller("HomeCtrl", ['$scope', 'ngTokenManager2', '$http', homeCtrl]);
    
function homeCtrl($scope, ngTokenManager2, $http) {
    $scope.title = "Home";
    window.tokenManagerProvider = ngTokenManager2;

    $scope.login = function() {
        ngTokenManager2.redirectForToken();
    }
}