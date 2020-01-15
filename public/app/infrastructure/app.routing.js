app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('main',{
        url:'/',
        component:'main'
    }).state('login',{
        url:'/login',
        component:'login'
    }).state('register',{
        url:'/register',
        component:'register'
    }).state('category',{
        url:'/category/:categoryId',
        component:'category'
    }).state('thread',{
        url:'/thread/:threadId',
        component:'thread'
    }).state('profile',{
        url:'/profile/:userId?',
        component:'profile'
    }).state('administration',{
        url:'/administration',
        component:'administration'
    }).state('paperGame',{
        url:'/paperGame',
        component:'paperGame'
    });

    $urlRouterProvider.otherwise('/');
});