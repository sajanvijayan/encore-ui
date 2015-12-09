angular.module('demoApp')
.directive('rxExample', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rx-example.html',
        scope: {
            name: '@'
        },
        link: function (scope) {
            var baseName = 'examples/' + scope.name;

            scope.markup_url = baseName + '.html';
            scope.javascript_url = baseName + '.js';
            scope.less_url = baseName + '.less';

            /* check for source files before trying to ng-include them */
            $http.get(scope.javascript_url).then(
                function () { scope.has_javascript = true; },
                function () { scope.has_javascript = false; }
            );

            $http.get(scope.less_url).then(
                function () { scope.has_less = true; },
                function () { scope.has_less = false; }
            );
        }
    };
});
