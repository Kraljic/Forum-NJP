app.component('commentReply', {
    templateUrl: './app/components/commentReply.template.html',
    bindings: {
        threadId: '<',
        commentParentId: '<'
    },
    controller: function ($scope, CommentService) {
        this.replyToComment = function () {
            this.newComment.thread = this.threadId;
            if (this.commentParentId)
                this.newComment.commentParent = this.commentParentId;

            CommentService.postComment(this.newComment).then(d => {
                $scope.$emit('newComment', d.data);
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            });
        }

        this.isFormValid = function () {
            return this.commentReplyForm.$valid;
        }
    },
    controllerAs: 'c'
});