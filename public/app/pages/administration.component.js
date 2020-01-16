app.component('administration', {
    templateUrl: './app/pages/administration.template.html',
    controller: function ($state, AuthenticationService, AuthorizationService) {
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');
            return;     
        }
        
        if (AuthorizationService.isModerator() == false) {
            $state.go('main');
            return;
        }

        this.user = AuthenticationService.getUser();
        
        this.isModerator = AuthorizationService.isModerator();
        this.isAdmin = AuthorizationService.isAdmin();
    },
    controllerAs: 'c'
});