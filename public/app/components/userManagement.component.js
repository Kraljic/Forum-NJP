app.component('userManagement', {
    templateUrl: './app/components/userManagement.template.html',
    controller: function ($scope, UsersService) {
        this.$onInit = function () {
            UsersService.getUsers().then(d => {
                this.users = d.data;
            });
        }
        this.roles = ['admin', 'moderator', 'user', 'banned'];

        this.selectedRoleChanged = function (userRole) {
            UsersService.changeUserRole(userRole.user._id, { role: userRole.role })
                .catch(err => {
                    alert("Whoops.. Something went wrong:\n" + err.data.error)
                });
        }

    },
    controllerAs: 'c'
});