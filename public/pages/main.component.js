app.component('main', {
    templateUrl: './pages/main.template.html',
    controller: function($state, AuthenticationService, SectionService) {  
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');            
        }
        this.user = AuthenticationService.getUser();

        this.sections = [];
        SectionService.getSections().then(d => {
            this.sections = d.data;
        });
        
    },
    controllerAs: 'c'
});