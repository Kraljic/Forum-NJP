app.component('login', {
    templateUrl: './app/pages/login.template.html',
    controller: function($state, AuthenticationService) {  
        if (AuthenticationService.isAuthenticated() == true) {
            $state.go('main');
            return;
        }

        this.login = function() {
            if (this.loginForm.$valid) {                
                AuthenticationService.login(this.credentials);
            }
        } 

        this.register = function() {
            $state.go('register')
        }
    },
    controllerAs: 'c'
});