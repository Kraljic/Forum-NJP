class CommentService {
    constructor($http) {
        this.http = $http;
    }

    getComment(commentId) {
        return this.http.get('./api/comment/' + commentId)
    }
    getCommentsFromThread(threadId) {
        return this.http.get('./api/comment/thread/' + threadId);
    }
    getCommentsFromComment(commentId) {
        return this.http.get('./api/comment/parentComment/' + commentId);
    }

    postComment(comment) {
        return this.http.post('./api/comment/', comment);
    }

    putComment(commentId, comment) {
        return this.http.put('./api/comment/' + commentId, comment)
    }

    deleteComment(commentId) {
        return this.http.delete('./api/comment/' + commentId);
    }
    deleteCommentAsModerator(commentId) {
        return this.http.delete('./api/comment/asModerator/' + commentId);
    }
}

app.service('CommentService', CommentService);

