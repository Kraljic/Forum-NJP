class AuthenticationService {
    constructor($http, $state) {
        this.http = $http;
        this.state = $state;
    }

    isAuthenticated() {
        let auth = false;

        if (sessionStorage.getItem('authenticated') == "true") auth = true;
        if (auth)
            this.http.defaults.headers.common.Authorization = this.getToken();

        return auth;
    }

    getToken() {
        return sessionStorage.getItem('authToken');
    }

    getUser() {
        return this.parseJwt(this.getToken());;
    }

    login(credentials) {
        this.http.post('/api/user/login', credentials)
            .then(d => {
                let authToken = d.headers().authorization;
                this.loginWithToken(authToken);
            })
            .catch(d => {
                alert('Wrong credentials: ' + d.data);
            });
    }

    loginWithToken(authToken) {
        sessionStorage.setItem('authenticated', true);
        sessionStorage.setItem('authToken', authToken);
        this.http.defaults.headers.common.Authorization = authToken;

        this.state.go('main');
    }

    logout() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('authToken');
        delete this.http.defaults.headers.common.Authorization;

        this.state.go('login');
    }

    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        return JSON.parse(atob(base64));
    };
}

app.service('AuthenticationService', AuthenticationService);

