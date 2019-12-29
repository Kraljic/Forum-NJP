app.component('register', {
    templateUrl: './pages/register.template.html',
    controller: function ($scope, RegisterService, AuthenticationService) {
        if (AuthenticationService.isAuthenticated() == true) {
            $state.go('main');
            return;
        }

        this.submitForm = function () {
            if (this.isFormValid()) {
                let newUser = {
                    username: this.username,
                    password: this.password,
                    email: this.email
                };

                RegisterService.register(newUser).then(d => {
                    AuthenticationService.loginWithToken(d.headers().authorization);
                }).catch(err => {
                    alert("Something went wrong: \n" + err.data.error);
                }) ;
            }
        };
        this.isFormValid = function () {
            return this.userForm.$valid &&
                this.userForm.password.$value == this.userForm.password2.$value &&
                this.usernameAvailable &&
                this.emailAvailable;
        }
        this.checkUsername = function (username) {
            if (this.userForm.username.$valid) {
                RegisterService.checkUsername(username).then(d => {
                    this.usernameAvailable = d.data.available;
                })
            } else {
                this.usernameAvailable = true;
            }
            $scope.$apply();
        };
        this.checkEmail = function (email) {
            if (this.userForm.email.$valid) {
                RegisterService.checkEmail(email).then(d => {
                    this.emailAvailable = d.data.available;
                })
            } else {
                this.emailAvailable = true;
            }
            $scope.$apply();
        };
    },
    controllerAs: 'c'
});