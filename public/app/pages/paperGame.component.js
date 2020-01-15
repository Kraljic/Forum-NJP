app.component('paperGame', {
    templateUrl: './app/pages/paperGame.template.html',
    controller: function (AuthenticationService) {
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login'); 
            return;           
        }
    },
    controllerAs: 'c'
});