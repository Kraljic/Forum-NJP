app.component('main', {
    templateUrl: './pages/main.template.html',
    controller: function($state, AuthenticationService, AuthorizationService, SectionService) {  
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');
            return;     
        }
        if (AuthorizationService.isBanned()) {
            alert('Your account has been banned!');
            
            AuthenticationService.logout();
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