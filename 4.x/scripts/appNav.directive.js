(function () {
    angular
        .module('demoApp')
        .directive('appNav', AppNavDirective);

    function AppNavDirective () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/app-nav.html',
            scope: {
                items: '=',
                level: '='
            }
        };
    }//AppNavDirective
})();
