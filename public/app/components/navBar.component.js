app.component('navBar', {
    templateUrl: './app/components/navBar.template.html',
    controller: function ($state, $rootScope, AuthenticationService, AuthorizationService) {
        $rootScope.$on('login', () => {
            this.setUserData();
            $rootScope.$apply()
        });
        $rootScope.$on('logout', () => {
            this.setUserData();
            this.user = null;
            $rootScope.$apply()
        });
        this.$onInit = function () {
            this.setUserData();
        }

        this.setUserData = function () {
            this.user = AuthenticationService.getUser();
            this.isModerator = AuthorizationService.isModerator();
            this.isAdmin = AuthorizationService.isAdmin();
        }

        this.isActiveTab = function (tabName) {
            if ($state.current.name == tabName)
                return 'active';
        }

        this.logout = function () {
            AuthenticationService.logout();
            this.user = null;
        }
    },
    controllerAs: 'c'
});