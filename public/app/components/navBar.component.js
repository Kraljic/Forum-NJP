app.component('navBar', {
    templateUrl: './app/components/navBar.template.html',
    controller: function ($state, $rootScope, AuthenticationService, AuthorizationService) {
        $rootScope.$on('login', () => {
            this.setUserDate();
            $rootScope.$apply()
        });
        $rootScope.$on('logout', () => {
            this.setUserDate();
            this.user = null;
            $rootScope.$apply()
        });
        this.$onInit = function () {
            this.setUserDate();
        }

        this.setUserDate = function () {
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