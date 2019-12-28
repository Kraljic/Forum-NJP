app.component('threadCreate', {
    templateUrl: './components/threadCreate.template.html',
    bindings: {
        categoryId: '<'
    },
    controller: function ($scope, ThreadService, AuthorizationService) {
        this.canCreateThread = function () {
            return AuthorizationService.isUser();
        }

        this.postNewThread = function () {
            this.newThread.category = this.categoryId;

            ThreadService.postThread(this.newThread).then(d => {
                $scope.$emit('newThread', d.data);
            }).catch(err => {
                alert('Whoops something went wrong:\n' + err.data.error);
            })
        }

        this.isFormValid = function () {
            return this.newThreadForm.$valid;
        }
    },
    controllerAs: 'c'
});