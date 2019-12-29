class AuthorizationService {
    constructor($http, $state, AuthenticationService) {
        this.http = $http;
        this.state = $state;
        this.authenticationService = AuthenticationService;
    }

    isAdmin(user) {
        if (!user)
            user = this.authenticationService.getUser(user);
        return user.role == 'admin';
    }

    isModerator(user) {
        if (!user)
            user = this.authenticationService.getUser();
        return user.role == 'moderator' || this.isAdmin(user);
    }

    isUser(user) {
        if (!user)
            user = this.authenticationService.getUser();
        return user.role == 'user' || this.isModerator(user);
    }

    isBanned(user) {
        if (!user)
            user = this.authenticationService.getUser();
        return user.role == 'banned';
    }
}

app.service('AuthorizationService', AuthorizationService);

