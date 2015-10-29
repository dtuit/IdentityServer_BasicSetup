//app.controller('loginCtrl',
//			['$scope', 'ngTokenManager', 'tmAuthorizer',
//                loginController]);

//function loginController($scope, ngTokenManager, tmAuthorizer) {
//        var vm = this;

//        vm.login = function () {
//            ngTokenManager.redirectForToken();
//        };

//        vm.logout = function () {
//            ngTokenManager.redirectForLogout();
//        };

//        vm.isAuthenticated = tmAuthorizer.isAuthenticated;

//        vm.userName = tmAuthorizer.userName();

//        window.MYSCOPE = $scope;
//        window.tokenManager = ngTokenManager;
//        //notifier.subscribe($scope, 'user-profile-available', function () {
//        //    vm.userName = authorizer.userName();
//        //})
//    }
