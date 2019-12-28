class AuthorizationService {
    constructor($http, $state, AuthenticationService) {
        this.http = $http;
        this.state = $state;
        this.authenticationService = AuthenticationService;
    }

    isAdmin() {
        if (this.authenticationService.isAuthenticated()) {
            let user = this.authenticationService.getUser();
            return user.role == 'admin';
        }
        return false;
    }

    isModerator() {
        if (this.authenticationService.isAuthenticated()) {
            let user = this.authenticationService.getUser();
            return user.role == 'moderator' || this.isAdmin();
        }
        return false;
    }
    
    isUser() {
        return this.authenticationService.isAuthenticated();
    }
        
    isGuest() {
        return this.authenticationService.isAuthenticated() == false;
    }
}

app.service('AuthorizationService', AuthorizationService);

