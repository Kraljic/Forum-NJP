class RegisterService {

    constructor($http) {
        this.http = $http;
    }

    register(newUser) {
        return this.http.post('./api/user/register/', newUser);
    }

    checkUsername(username) {
        return this.http.get('./api/user/register/username/' + username);
    }

    checkEmail(email) {
        return this.http.get('./api/user/register/email/' + email);
    }

}

app.service('RegisterService', RegisterService);

