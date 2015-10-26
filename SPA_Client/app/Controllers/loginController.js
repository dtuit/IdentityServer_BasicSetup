app.controller('loginController',
			['$scope', 'tokenManager', 'authorizer',
                loginController]);

    function loginController($scope, tokenManager, authorizer) {
        var vm = this;

        vm.login = function () {
            tokenManager.redirectForToken();
        };

        vm.logout = function () {
            tokenManager.redirectForLogout();
        };

        vm.isAuthenticated = authorizer.isAuthenticated;

        vm.userName = authorizer.userName();

        window.MYSCOPE = $scope;
        window.tokenManager = tokenManager;
        //notifier.subscribe($scope, 'user-profile-available', function () {
        //    vm.userName = authorizer.userName();
        //})
    }
