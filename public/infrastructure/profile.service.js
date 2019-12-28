class ProfileService {

    constructor($http) {
        this.http = $http;
    }

    getMyProfile() {
        return this.http.get('./api/profile/');
    }

    getProfile(userId) {
        return this.http.get('./api/profile/' + userId);
    }

    editMyProfile(profile) {
        return this.http.put('./api/profile/', profile);
    }
}

app.service('ProfileService', ProfileService);

