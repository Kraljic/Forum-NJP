app.component('main', {
    templateUrl: './app/pages/main.template.html',
    controller: function($state, AuthenticationService, AuthorizationService, SectionService) {  
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');
            return;     
        }

        if (AuthorizationService.isBanned()) {            
            AuthenticationService.logout();
            alert('Your account has been banned!');
            return;
        }
        
        this.user = AuthenticationService.getUser();

        this.sections = [];
        SectionService.getSections().then(d => {
            this.sections = d.data;
        });
        
    },
    controllerAs: 'c'
});