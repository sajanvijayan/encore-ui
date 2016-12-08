angular.module('demoApp')
.controller('showModuleController', function ($scope, $filter, rxBreadcrumbsSvc, $routeParams, module) {
    rxBreadcrumbsSvc.set([
        {
            path: '#/modules',
            name: 'Modules'
        },
        {
            path: '#/' + module.category,
            name: $filter('rxCapitalize')(module.category)
        }, {
            name: module.displayName
        }
    ]);

    $scope.module = module;
})
