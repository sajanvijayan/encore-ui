function genericRouteController (breadcrumbs) {
    return function (rxBreadcrumbsSvc, Environment, $interpolate) {
        if (breadcrumbs === undefined) {
            breadcrumbs = [{
                name: '',
                path: ''
            }]
        }

        breadcrumbs.forEach(function (breadcrumb) {
            if (breadcrumb.path) {
                breadcrumb.path = $interpolate(Environment.get().url)({ path: breadcrumb.path });
            }
        });

        rxBreadcrumbsSvc.set(breadcrumbs);
    }
}

angular.module('demoApp', ['encore.ui', 'ngRoute'])
.config(function ($routeProvider, rxStatusTagsProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/overview', {
            templateUrl: 'templates/overview.html',
            controller: genericRouteController()
        })

        /* Layout */

        /* Style Pages */
        .when('/styles/color', {
            templateUrl: 'templates/styles/color.html',
            controller: genericRouteController([
                { name: 'Color' }
            ])
        })
        .when('/styles/formatting', {
            templateUrl: 'templates/styles/formatting.html',
            controller: genericRouteController([{
                name: 'Formatting'
            }])
        })
        .when('/styles/layout/detail', {
            templateUrl: 'templates/styles/layouts/detail-page.html',
            controller: genericRouteController([
                { name: 'Detail Page' }
            ])
        })
        .when('/styles/layout/data-table', {
            templateUrl: 'templates/styles/layouts/data-table-page.html',
            controller: genericRouteController([
                { name: 'Data Table' }
            ])
        })
        .when('/styles/layout/form', {
            templateUrl: 'templates/styles/layouts/form-page.html',
            controller: genericRouteController([
                { name: 'Form Page' }
            ])
        })
        .when('/styles/typography', {
            templateUrl: 'templates/styles/typography.html',
            controller: genericRouteController([
                {
                    name: 'Typography'
                }
            ])
        })

        /* Module Pages */
        .when('/modules', {
            templateUrl: 'templates/modules/listModules.html',
            controller: 'listModulesController',
            controllerAs: 'vm'
        })
        .when('/modules/:module', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.module
                    });
                }
            }
        })

        /* Utilities Pages */
        .when('/utilities', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listUtilitiesController',
            controllerAs: 'vm'
        })
        .when('/utilities/:utility', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.utility,
                        category: 'utilities'
                    });
                }
            }
        })

        /* Elements Pages */
        .when('/elements', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listElementsController',
            controllerAs: 'vm'
        })
        .when('/elements/:element', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.element,
                        category: 'elements'
                    });
                }
            }
        })

        /* Component Pages */ /* Deprecated in favor of Elements */
        .when('/components', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listComponentsController',
            controllerAs: 'vm'
        })
        .when('/components/:component', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.component,
                        category: 'components'
                    });
                }
            }
        })
        .otherwise({
            templateUrl: 'templates/404.html',
            controller: genericRouteController([
                { name: '404' }
            ])
        });

    // Define a custom status tag for use in the rxBreadcrumbs demo
    rxStatusTagsProvider.addStatus({
        key: 'demo',
        class: 'alpha-status',
        text: 'Demo Tag'
    });
})
.run(function ($rootScope, $window, $location, $anchorScroll, $interpolate,
               Environment, rxBreadcrumbsSvc, rxPageTitle, Modules, $timeout) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    Environment.add({
        name: 'ghPages',
        pattern: /\/\/rackerlabs.github.io/,
        url: baseGithubUrl + '{{path}}'
    });

    rxBreadcrumbsSvc.setHome($interpolate(Environment.get().url)({ path: '#/overview' }), 'Overview');

    rxPageTitle.setSuffix(' - EncoreUI');

    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout($anchorScroll, 250);
    });
});
