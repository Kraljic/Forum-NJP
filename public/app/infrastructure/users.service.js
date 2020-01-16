class UsersService {

    constructor($http) {
        this.http = $http;
    }

    getUsers() {
        return this.http.get('./api/users/');
    }

    getUser(userId) {
        return this.http.get('./api/users/' + userId);
    }

    changeUserRole(userId, userRole) {
        return this.http.put('./api/users/role/' + userId, userRole);
    }
}

app.service('UsersService', UsersService);

