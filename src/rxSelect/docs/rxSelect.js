/*jshint unused:false*/
angular.module('demoApp')
.controller('rxSelectCtrl', function ($scope) {
    $scope.radCreateDestroy = 'destroyed';

    $scope.validEnabled = 3;
    $scope.validNgDisabled = 'na';
    $scope.validDisabled = 'na';

    $scope.invalidEnabled = 4;
    $scope.invalidNgDisabled = 'na';
    $scope.invalidDisabled = 'na';
});
