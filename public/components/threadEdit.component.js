app.component('threadEdit', {
    templateUrl: './components/threadEdit.template.html',
    bindings: {
        thread: '<'
    },
    controller: function ($scope, ThreadService) {
        this.$onInit = function () {
            this.newThread = {
                threadText: this.thread.threadText
            };
        }

        this.editThread = function () {
            ThreadService.putThread(this.thread._id, this.newThread).then(d => {
                $scope.$emit('editThread', d.data);
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            });
        }

        this.isFormValid = function () {
            return this.threadEditForm.$valid;
        }
    },
    controllerAs: 'c'
});