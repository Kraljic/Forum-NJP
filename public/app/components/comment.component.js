app.component('comment', {
    templateUrl: './app/components/comment.template.html',
    bindings: {
        comment: '<'
    },
    controller: function ($scope, CommentService, AuthenticationService, AuthorizationService) {
        this.user = AuthenticationService.getUser();

        this.subComments = [];

        this.$onInit = function () {
            if (this.comment.comments.length > 0) {
                CommentService.getCommentsFromComment(this.comment._id)
                    .then(d => {
                        this.subComments = d.data;
                    });
            }
        }

        $scope.$on('editComment', (e, data) => {
            if (this.comment._id == data._id)
                this.comment = data;
            this.editFlag = false;
        });
        $scope.$on('newComment', (e, data) => {
            if (this.comment._id == data.commentParent)
                this.subComments.push(data);
            this.replyFlag = false;
        });
        this.canReply = function () {
            return !this.comment.deleted;
        }
        this.canEdit = function () {
            return !this.comment.deleted && this.isOwner();
        }
        this.canDelete = function () {
            return !this.comment.deleted && this.isOwner();
        }
        this.isOwner = function () {
            return this.comment.createdBy._id == AuthenticationService.getUser()._id;
        }
        this.isModerator = function () {
            return AuthorizationService.isModerator();
        }

        this.isLiked = function() {
            if (this.comment.likes.find(l => l == this.user._id)) 
                return 'text-primary';

        }

        this.deleteComment = function () {
            CommentService.deleteComment(this.comment._id).then(d => {
                this.comment = d.data;
            })
        }
        this.deleteCommentAsModerator = function () {
            CommentService.deleteCommentAsModerator(this.comment._id).then(d => {
                this.comment = d.data;
            })
        }
        
        this.likeComment = function () {
            if (this.comment.likes.find(l => l == this.user._id)) {
                // Dislike
                CommentService.deleteLike(this.comment._id).then(d => {
                    this.comment = d.data;
                });
            } else {
                // Like
                CommentService.likeComment(this.comment._id).then(d => {
                    this.comment = d.data;
                });
            }
        }
    },
    controllerAs: 'c'
});