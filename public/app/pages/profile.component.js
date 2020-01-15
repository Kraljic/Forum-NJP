app.component('profile', {
    templateUrl: './app/pages/profile.template.html',
    controller: function ($state, $scope, $stateParams, AuthenticationService, ProfileService) {
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');
            return;
        }
        this.user = AuthenticationService.getUser();
        this.profile = null;

        this.isMyProfile = function () {
            return this.profile.user._id == this.user._id;
        }

        if ($stateParams.userId && $stateParams.userId != this.user._id) {
            this.userId = $stateParams.userId;

            ProfileService.getProfile(this.userId).then(d => {
                this.profile = d.data;
                if (!this.profile) {
                    alert("Whoops.. Looks like profile does not exist.");
                    $state.go('main');
                }
            }).catch(err => {
                alert("Whoops, something went wrong:\n" + err.data.error);
                $state.go('main');
            })
        } else {
            ProfileService.getMyProfile().then(d => {
                this.profile = d.data;
                if (!this.profile) {
                    alert("Whoops, something went wrong:\n" + err.data.error);
                    $state.go('main');
                }
            })
        }

        $scope.$on('editProfile', (e, data) => {
            this.profile = data;
            this.editFlag = false;
        });
    },
    controllerAs: 'c'
});