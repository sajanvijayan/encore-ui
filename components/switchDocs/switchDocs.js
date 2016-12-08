(function () {
    angular
        .module('demoApp')
        .directive('switchDocs', SwitchDocsDirective);

    function SwitchDocsDirective ($location, DOC_VERSIONS) {
        return {
            restrict: 'E',
            templateUrl: '../components/switchDocs/switch-docs.html',
            controller: function ($scope) {
                $scope.versions = DOC_VERSIONS;

                // Determine which version is currently being viewed
                $scope.version = $scope.versions.filter(function (version) {
                    return $location.absUrl().search('/' + version.path) >= 0;
                })[0];

                /* Navigate to different version on change */
                $scope.$watch('version', function (newVal, oldVal) {
                    if (oldVal && (oldVal.path !== newVal.path)) {
                        window.location.href = '../' + newVal.path;
                    }
                });
            }
        };
    };//SwitchDocsDirective

    angular
        .module('demoApp')
        .constant('DOC_VERSIONS', [
            {
                "path": "4.x",
                "isReleased": false,
                "isLegacy": false
            },
            {
                "path": "3.x",
                "isReleased": true,
                "isLegacy": false
            },
            {
                "path": "2.x",
                "isReleased": true,
                "isLegacy": true
            },
            {
                "path": "1.x",
                "isReleased": true,
                "isLegacy": true
            }
        ]);//DOC_VERSIONS
})();
