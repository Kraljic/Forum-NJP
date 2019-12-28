app.component('thread', {
    templateUrl: './pages/thread.template.html',
    controller: function ($state, $stateParams, $scope, ThreadService, CommentService, AuthenticationService, AuthorizationService) {
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login');
        }
        this.user = AuthenticationService.getUser();

        this.threadId = $stateParams.threadId;

        ThreadService.getThread(this.threadId).then(d => {
            this.thread = d.data;
            if (!this.thread)
                $state.go('main');
        }).catch(err => {
            alert('Whoops, something went wrong:\n' + err.data.error);
            $state.go('main');
        });
        CommentService.getCommentsFromThread(this.threadId).then(d => {
            this.comments = d.data;
        });

        $scope.$on('editThread', (e, data) => {
            this.thread = data;
            this.editFlag = false;
        });
        $scope.$on('newComment', (e, data) => {
            if (data.commentParent == null)
                this.comments.push(data);
            this.replyFlag = false;
        });

        this.canReply = function () {
            return true;
        }
        this.canEdit = function () {
            return this.isOwner();
        }
        this.canDelete = function () {
            return this.isOwner();
        }
        this.isOwner = function () {
            if (this.thread)
                return this.thread.createdBy._id == AuthenticationService.getUser()._id;
        }
        this.isModerator = function () {
            return AuthorizationService.isModerator();
        }

        this.deleteThread = function () {
            ThreadService.deleteThread(this.threadId).then(d => {
                alert('Done!');
                $state.go('category', { categoryId: this.thread.category });
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            })
        }
        this.deleteThreadAsModerator = function () {
            ThreadService.deleteThreadAsModerator(this.threadId).then(d => {
                alert('Done!');
                $state.go('category', { categoryId: this.thread.category });
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            })
        }

    },
    controllerAs: 'c'
});