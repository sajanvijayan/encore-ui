(function () {
    angular.module('demoApp')
    .directive('appLayout', AppLayoutDirective);

    function AppLayoutDirective ($rootScope, $location, Modules, urlUtils) {
        var linksForModuleCategory = function (kategory) {
            var filteredModules = _.filter(Modules, {
                category: kategory,
                isCategory: false
            });

            var sortedModules = _.sortBy(filteredModules, function (mod) {
                return mod.displayName.toLowerCase();
            });

            return sortedModules.map(function (mod) {
                return {
                    href: ['#', kategory, mod.name].join('/'),
                    linkText: mod.displayName
                };
            });
        };//linksForModuleCategory()

        var _appRoutes = [
            {
                linkText: 'Overview',
                href: '#/overview'
            },
            {
                linkText: 'Styleguide',
                children: [
                    {
                        linkText: 'Color',
                        href: '#/styles/color'
                    },
                    {
                        linkText: 'Date/Time Formatting',
                        href: '#/styles/formatting'
                    },
                    {
                        linkText: 'Layouts',
                        children: [
                            {
                                linkText: 'Layout 1: Detail Page',
                                href: '#/styles/layout/detail'
                            },
                            {
                                linkText: 'Layout 2: Data Table',
                                href: '#/styles/layout/data-table'
                            },
                            {
                                linkText: 'Layout 3: Form Page',
                                href: '#/styles/layout/form'
                            }
                        ]
                    },
                    {
                        linkText: 'Typography',
                        href: '#/styles/typography'
                    }
                ]
            },
            { /* temporary solution until site-wide search is implemented */
                linkText: 'All Modules',
                href: '#/modules'
            },
            {
                linkText: 'Elements',
                children: linksForModuleCategory('elements')
            },
            {
                linkText: 'Utilities',
                children: linksForModuleCategory('utilities')
            },
            { /* Deprecated in favor of Elements */
                linkText: 'Components',
                children: linksForModuleCategory('components')
            }
        ];

        function setDynamicRoutes (routes) {
            var currentUrl = $location.url();

            routes.forEach(function (route) {
                // build out url for current route
                route.url = urlUtils.buildUrl(route.href);

                if (route.children) {
                    /*
                     * Recurse through children to see if any of them
                     * should be active
                     */
                    route.children = setDynamicRoutes(route.children);
                    /*
                     * Route is active if ANY child is active.
                     */
                    route.active = _.some(route.children, 'active');
                } else if (!_.isEmpty(route.url)) {
                    // Prepend a "#" to match easier
                    var normalizedUrl = '#' + currentUrl;

                    /*
                     * Does the normalizedUrl contain the route.url?
                     *
                     * normalizedUrl      | route.url | result
                     * ------------------ | --------- | ------
                     * #/foo/bar          | #/foo     | TRUE
                     * #/foo/bar?bang=biz | #/foo     | TRUE
                     * #/foo/bar?bang=biz | #/bar     | FALSE
                     */
                    route.active = (normalizedUrl.indexOf(route.url) > -1);
                } else {
                    /*
                     * Route should not be active
                     * - Not part of current url
                     * - No active children
                     */
                    route.active = false;
                }
            });

            return routes;
        }//setDynamicRoutes()

        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'templates/app-layout.html',
            controller: function ($scope) {
                var setRoutes = function () {
                    var routesToBe = _.cloneDeep(_appRoutes);
                    $scope.routes = setDynamicRoutes(routesToBe);
                };//setRoutes()

                $scope.$evalAsync(setRoutes);
                $rootScope.$on('$routeChangeSuccess', setRoutes);
            }
        };
    }
})();
