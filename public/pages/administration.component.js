app.component('administration', {
    templateUrl: './pages/administration.template.html',
    controller: function ($state, AuthenticationService, AuthorizationService) {
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