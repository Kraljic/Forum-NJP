app.filter('unifiedDate', function ($filter) {
    return function (input) {
        return $filter('date')(new Date(input), 'dd. MMMM yyyy. - HH:mm:ss');
    }
});