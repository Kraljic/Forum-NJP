app.component('navBar', {
    templateUrl: './components/navBar.template.html',
    controller: function ($state, AuthenticationService, AuthorizationService) {
        this.$doCheck = function () {            
            if (!this.user && AuthenticationService.isAuthenticated())
                this.user = AuthenticationService.getUser();
        }
        if (AuthenticationService.isAuthenticated())
            this.user = AuthenticationService.getUser();

        this.isModerator = AuthorizationService.isModerator();
        this.isAdmin = AuthorizationService.isAdmin();

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