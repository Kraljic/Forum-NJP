class ThreadService {

    constructor($http) {
        this.http = $http;
    }

    getThread(threadId) {
        return this.http.get('./api/thread/' + threadId);
    }
    getThreads(categoryId) {
        return this.http.get('./api/thread/category/' + categoryId)
    }

    postThread(thread) {
        return this.http.post('./api/thread/', thread);
    }

    putThread(threadId, thread) {
        return this.http.put('./api/thread/' + threadId, thread);
    }

    deleteThread(threadId) {
        return this.http.delete('./api/thread/' + threadId);
    }
    deleteThreadAsModerator(threadId) {
        return this.http.delete('./api/thread/asModerator/' + threadId);
    }

    likeThread(threadId) {
        return this.http.put('./api/thread/like/' + threadId);
    }
    deleteLike(threadId) {
        return this.http.delete('./api/thread/like/' + threadId);
    }
}

app.service('ThreadService', ThreadService);

