app.component('userManagement', {
    templateUrl: './app/components/userManagement.template.html',
    controller: function ($scope, UsersService) {
        this.$onInit = function () {
            UsersService.getUsers().then(d => {
                this.users = d.data;
                $scope.$apply();
            });
        }
        this.roles = ['admin', 'moderator', 'user', 'banned'];

        this.selectedRoleChanged = function (userRole) {
            console.log(userRole);

            UsersService.changeUserRole(userRole.user._id, { role: userRole.role });
        }

    },
    controllerAs: 'c'
});