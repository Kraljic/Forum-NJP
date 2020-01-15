app.component('commentEdit', {
    templateUrl: './app/components/commentEdit.template.html',
    bindings: {
        comment: '<'
    },
    controller: function ($scope, CommentService) {
        this.$onInit = function () {
            this.newComment = {
                commentText: this.comment.commentText
            };
        }

        this.editComment = function () {
            CommentService.putComment(this.comment._id, this.newComment).then(d => {
                this.comment = d.data;
                $scope.$emit('editComment', d.data);
                this.newComment = null;
            }).catch(err => {
                alert('Whoops, something went wrong:\n' + err.data.error);
            });
        }

        this.isFormValid = function () {
            return this.commentEditForm.$valid;
        }
    },
    controllerAs: 'c'
});