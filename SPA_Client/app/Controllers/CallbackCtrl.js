app.controller("CallbackCtrl",
    ['$scope', 
        function ($scope) {
            $scope.title = "callback"
        }]
    //["idmTokenManager", "$location", "$rootScope", "$routeParams", "idmErrorService",
    //function CallbackCtrl(idmTokenManager, $location, $rootScope, $routeParams, idmErrorService) {
    //    var hash = $routeParams.response;
    //    if (hash.charAt(0) === "&") {
    //        hash = hash.substr(1);
    //    }
    //    idmTokenManager.processTokenCallbackAsync(hash).then(function() {
    //        $location.url("/");
    //    }, function(error) {
    //        idmErrorService.error(error && error.message || error);
    //    });
    //}]
);