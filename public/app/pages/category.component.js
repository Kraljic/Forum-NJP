app.component('category', {
    templateUrl: './app/pages/category.template.html',
    controller: function ($stateParams, $scope, CategoryService, ThreadService, AuthenticationService, AuthorizationService) {
        if (AuthenticationService.isAuthenticated() == false) {
            $state.go('login'); 
            return;           
        }
        this.user = AuthenticationService.getUser();
        
        this.categoryId = $stateParams.categoryId;

        CategoryService.getCategory(this.categoryId).then(d => {
            this.category = d.data;
        });
        
        ThreadService.getThreads(this.categoryId).then(d => {
            this.threads = d.data;
        });

        $scope.$on('newThread', (e, data) => {
            this.threads.push(data);
            this.newThreadFlag=false;
        });

        this.canCreateThread = function () {
            return AuthorizationService.isUser();
        }
    },
    controllerAs: 'c'
});