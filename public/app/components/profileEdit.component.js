app.component('profileEdit', {
    templateUrl: './app/components/profileEdit.template.html',
    bindings: {
        profile: '<'
    },
    controller: function ($scope, ProfileService) {
        this.$onInit = function () {
            this.newProfile = {
                firstName: this.profile.firstName || "",
                lastName: this.profile.lastName || "",
                bio: this.profile.bio || ""
            }
        }

        this.submitForm = function () {
            ProfileService.editMyProfile(this.newProfile).then(d => {
                $scope.$emit('editProfile', d.data);
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            });
        }
        this.isFormValid = function () {
            return this.profileForm.$valid;
        }
    },
    controllerAs: 'c'
});