// this loads all the module controllers used in the demos







/*jshint unused:false*/
angular.module('demoApp')
.controller('rxCheckboxCtrl', function ($scope) {
    $scope.chkValidEnabledOne = true;
    $scope.chkValidEnabledTwo = false;
    $scope.chkValidDisabledOne = true;
    $scope.chkValidDisabledTwo = false;
    $scope.chkValidNgDisabledOne = true;
    $scope.chkValidNgDisabledTwo = false;

    $scope.chkInvalidEnabledOne = true;
    $scope.chkInvalidEnabledTwo = false;
    $scope.chkInvalidDisabledOne = true;
    $scope.chkInvalidDisabledTwo = false;
    $scope.chkInvalidNgDisabledOne = true;
    $scope.chkInvalidNgDisabledTwo = false;
});

angular.module('demoApp')
.controller('rxCheckboxShowHideCtrl', function ($scope) {
    $scope.amSure = false;
    $scope.amReallySure = false;

    $scope.$watch('amSure', function (newVal) {
        if (newVal === false) {
            $scope.amReallySure = false;
        }
    });
});






angular.module('demoApp')
.controller('layoutController', function ($scope) {
    $scope.layout = 'row';
    $scope.align = { first: 'center', second: 'middle' };
    $scope.options1 = ['left', 'center', 'right', 'spread', 'justify'];
    $scope.options2 = ['top', 'middle', 'bottom', 'stretch'];

    // Swap the first 3 items in each array and set new value
    $scope.swap = function (option) {

        if ($scope.layout === option) {
            return;
        }

        var swap = $scope.options2.slice(0, 3).concat($scope.options1.slice(3));
        $scope.options2 = $scope.options1.slice(0, 3).concat($scope.options2.slice(3));
        $scope.options1 = swap;
        swap = $scope.options1[$scope.options1.indexOf($scope.align.second)] || 'spread';
        $scope.align.second = $scope.options2[$scope.options2.indexOf($scope.align.first)] || 'stretch';
        $scope.align.first = swap;
    };
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('progressbarCtrl', function ($scope) {
    // This file is used to help build the 'demo' documentation page and should be updated with example code
});


// Note that these factories are only present for the purposes of this demo. In a real application,
// SupportAccount, Teams, AccountStatusGroup, and Encore will have to be provided from elsewhere,
// outside of encore-ui. Specifically, we implement them in encore-ui-svcs

angular.module('encore.ui.rxAccountInfo')
.value('Badges',
    [
        {
            url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',
            description: 'Enables the free distribution of an otherwise copyrighted work.',
            name: 'Creative Commons'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',
            description: ['You must give appropriate credit, provide a link to the',
                          'license, and indicate if changes were made.'].join(' '),
            name: 'Attribution'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',
            description: 'You may not use the material for commercial purposes.',
            name: 'Non-Commercial'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',
            description: 'Waives as many rights as legally possible, worldwide.',
            name: 'Public Domain'
        }
    ]
)
.value('TeamBadges',
    [
        {
            url: 'http://mirrors.creativecommons.org/presskit/icons/share.large.png',
            description: ['Licensees may distribute derivative works only under a license',
                          'identical to the license that governs the original work.'].join(' '),
            name: 'ShareAlike'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/nd.large.png',
            description: ['Licensees may copy, distribute, display and perform only verbatim',
                          'copies of the work, not derivative works based on it.'].join(' '),
            name: 'No-Derivs'
        }
    ]
)
.factory('SupportAccount', function ($q, Badges) {
    return {
        getBadges: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.accountNumber === '6789') {
                deferred.reject();
            } else {
                deferred.resolve(Badges);
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('Teams', function ($q, TeamBadges) {
    return {
        badges: function (config) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else {
                deferred.resolve(TeamBadges);
            }

            deferred.$promise = deferred.promise;

            return deferred;
        }
    };
})
.factory('Encore', function ($q) {
    return {
        getAccount: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else if (config.id === '5623') {
                deferred.resolve({ name: 'DelinquentAccount', status: 'Delinquent', accessPolicy: 'Full' });
            } else if (config.id === '3265') {
                deferred.resolve({ name: 'UnverifiedAccount', status: 'Unverified', accessPolicy: 'Full' });
            } else {
                deferred.resolve({ name: 'Mosso', status: 'Active', accessPolicy: 'Full' });
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('AccountStatusGroup', function () {
    var warning = ['suspended', 'delinquent'];
    var info = ['unverified', 'pending approval', 'approval denied', 'teststatus', 'terminated'];

    return function (statusText) {
        var lower = statusText.toLowerCase();
        if (_.contains(warning, lower)) {
            return 'warning';
        } else if (_.contains(info, lower)) {
            return 'info';
        }
        return '';
    };
})
.controller('rxAccountInfoDemo', function ($scope) {
        $scope.customMenu = [{
            title: 'Example Menu',
            children: [
                {
                    href: 'Lvl1-1',
                    linkText: '1st Order Item'
                },
                {
                    linkText: '1st Order Item (w/o href) w/ Children',
                    childVisibility: [ 'isUserDefined' ],
                    childHeader: '<strong class="current-search">Current User:</strong>' +
                                 '<span class="current-result">{{$root.user}}</span>',
                    children: [
                        {
                            href: 'Lvl1-2-Lvl2-1',
                            linkText: '2nd Order Item w/ Children',
                            children: [{
                                href: 'Lvl1-2-Lvl2-1-Lvl3-1',
                                linkText: '3rd Order Item'
                            }]
                        },
                        {
                            href: 'Lvl1-2-Lvl2-2',
                            linkText: '2nd Order Item w/ Children',
                            children: [
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-1',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-2',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-3',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-4',
                                    linkText: '3rd Order Item'
                                }
                            ]
                        },
                        {
                            href: 'Lvl1-2-Lvl2-3',
                            linkText: '2nd Order Item'
                        }
                    ]
                },
                {
                    href: 'Lvl1-3',
                    linkText: '1st Order Item w/ Children',
                    children: [
                        {
                            href: 'Lvl1-3-Lvl2-1',
                            linkText: '2nd Order Item'
                        }
                    ]
                }
            ]
        }];
    });


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxActionMenuCtrl', function ($scope, rxNotify) {
    $scope.add = function () {
        rxNotify.add('Added!', {
            type: 'success',
            repeat: false,
            timeout: 3
        });
    };

    $scope.remove = function () {
        rxNotify.add('Deleted!', {
            type: 'error',
            repeat: false,
            timeout: 3
        });
    };
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('rxAgeCtrl', function ($scope) {
    var day = 1000 * 60 * 60 * 24;
    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();
    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();
    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();
    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxAppCtrl', function ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility) {
    $scope.subtitle = 'With a subtitle';

    $scope.changeSubtitle = function () {
        $scope.subtitle = 'With a new subtitle at ' + Date.now();
    };

    rxVisibility.addMethod(
        'isUserDefined',
        function (scope, locals) {
            return !_.isEmpty($rootScope.user);
        }
    );

    $scope.changeRoutes = function () {
        var newRoute = {
            linkText: 'Updated Route',
            childVisibility: 'true',
            children: [
                {
                    linkText: 'New child route'
                }
            ]
        };

        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);
    };

    // Fake navigation
    var customApp = document.getElementById('custom-rxApp');
    customApp.addEventListener('click', function (ev) {
        var target = ev.target;

        if (target.className.indexOf('item-link') > -1) {
            // prevent the default jump to top
            ev.preventDefault();

            var href = target.getAttribute('href');

            // update angular location (if href has a value)
            if (!_.isEmpty(href)) {
                // we need to prevent the window from scrolling (the demo does this)
                // so we get the current scrollTop position
                // and set it after the demo page has run '$routeChangeSuccess'
                var currentScollTop = document.body.scrollTop;

                $location.hash(href);

                $rootScope.$apply();

                $window.scrollTo(0, currentScollTop);
            }
        }
    });

    var searchDirective = [
        'rx-app-search placeholder="Enter User"',
        'model="$root.user"',
        'pattern="/^([0-9a-zA-Z._ -]{2,})$/"'
    ].join(' ');

    $scope.customMenu = [{
        title: 'Example Menu',
        children: [
            {
                href: 'Lvl1-1',
                linkText: '1st Order Item'
            },
            {
                linkText: '1st Order Item (w/o href) w/ Children',
                childVisibility: [ 'isUserDefined' ],
                childHeader: '<strong class="current-search">Current User:</strong>' +
                             '<span class="current-result">{{$root.user}}</span>',
                directive: searchDirective,
                children: [
                    {
                        href: 'Lvl1-2-Lvl2-1',
                        linkText: '2nd Order Item w/ Children',
                        children: [{
                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',
                            linkText: '3rd Order Item'
                        }]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-2',
                        linkText: '2nd Order Item w/ Children',
                        children: [
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',
                                linkText: '3rd Order Item'
                            }
                        ]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-3',
                        linkText: '2nd Order Item'
                    }
                ]
            },
            {
                href: 'Lvl1-3',
                linkText: '1st Order Item w/ Children',
                children: [
                    {
                        href: 'Lvl1-3-Lvl2-1',
                        linkText: '2nd Order Item'
                    }
                ]
            }
        ]
    }];
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('rxAttributesCtrl', function ($scope) {
    $scope.customStyles = 'color: red; font-weight: bold;';
    $scope.customContent = '"Custom Content"';
});


angular.module('demoApp')
.controller('rxAuthCtrl', function ($scope, $window, Auth) {
    $scope.hasRole = function () {
        $window.alert('Has "superhero" Role? : ' + Auth.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        $window.alert('Is Authenticated? : ' + Auth.isAuthenticated());
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxBreadcrumbsCtrl', function ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/#/components',
        name: 'Components',
    }, {
        name: '<strong>All Components</strong>',
        status: 'demo'
    }]);
});


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
angular.module('demoApp')
.controller('rxBulkSelectCtrl', function ($scope) {

    $scope.datacenters = [
        { name: 'ORD1', city: 'Chicago' },
        { name: 'DFW1', city: 'Grapevine' },
        { name: 'DFW2', city: 'Richardson' },
        { name: 'IAD2', city: 'Ashburn' },
        { name: 'IAD3', city: 'Ashburn' },
        { name: 'LON1', city: 'West Drayton' },
        { name: 'LON3', city: 'Berkshire' },
        { name: 'LON5', city: 'Crawley' },
        { name: 'HKG1', city: 'Honk Kong' },
        { name: 'SYD2', city: 'Sydney' }
    ];

    // cloned to avoid interference with first demo table
    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);

    $scope.filter = { keyword: '' };

    $scope.getSelectedDatacenters = function () {
        return _.cloneDeep(_.where($scope.datacenters, { rowIsSelected: true }));
    };

})
.controller('ShutdownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, PageTracking) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    var itemsPerPage = 8;
    $scope.pager = PageTracking.createInstance({ itemsPerPage: itemsPerPage });
    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;

    $scope.removeDatacenter = function (dc) {
        _.remove($scope.selectedDatacenters, dc);
    };

    $scope.submit = function () {
        $scope.setState('working');

        $scope.numCompleted = 0;

        var delay = 1000;
        $scope.selectedDatacenters.forEach(function (dc, i) {
            $timeout(function () {
                dc.status = 'pending';
            }, i * delay);
            $timeout(function () {
                dc.status = i % 4 === 0 ? 'failure' : 'success';
                $scope.numCompleted++;
            }, ++i * delay);
        });
        $timeout(function () {
            $scope.setState('complete');
            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });
        }, $scope.selectedDatacenters.length * delay);
    };

    $scope.cancel = $modalInstance.dismiss;
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxButtonCtrl', function ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: true
    };

    $scope.login = function () {
        $scope.status.loading = true;

        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxCharacterCountCtrl', function ($scope) {
    $scope.data = {
        comment1: '',
        comment2: '',
        comment3: '',
        comment4: '',
        comment5: 'I have an initial value',
        comment6: ''
    };
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('rxCompileCtrl', function ($scope) {
    $scope.world = 'wrrrld';
    $scope.myExpression = 'Hello {{world}}';
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxDiskSizeCtrl', function ($scope) {
    $scope.sizeGB = 420;
    $scope.sizeTB = 125000;
    $scope.sizePB = 171337000;
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxEnvironmentCtrl', function ($scope, Environment) {
    $scope.Environment = Environment;
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxFaviconCtrl', function ($scope, Environment) {
    $scope.setEnvironment = function (environment) {
        // TODO allow overriding the current environment to show how the favicon changes
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxFeedbackCtrl', function ($scope, rxNotify) {
    $scope.alwaysSucceed = function () {
        rxNotify.add('Thanks for your feedback!', {
            type: 'success',
            timeout: 3
        });
    };

    $scope.alwaysFail = function () {
        rxNotify.add('Feedback not received!', {
            type: 'error',
            timeout: 3
        });
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxFloatingHeaderCtrl', function ($scope) {
    $scope.searchText = '';
    $scope.data = [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
        { name: 'C', value: 3 },
        { name: 'D', value: 4 },
        { name: 'E', value: 5 },
        { name: 'First', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'G', value: 2 },
        { name: 'H', value: 3 },
        { name: 'I', value: 4 },
        { name: 'J', value: 5 },
        { name: 'K', value: 1 },
        { name: 'L', value: 2 },
    ];

    $scope.clearFilter = function () {
        $scope.searchText = '';
    };
});


angular.module('demoApp')
.controller('rxFormDemoCtrl', function ($scope) {
    /* ========== DATA ========== */
    $scope.volumeTypes = [
        {
            'value': 'SATA',
            'label': 'SATA'
        },
        {
            'value': 'SSD',
            'label': 'SSD'
        },
        {
            'value': 'CD',
            'label': 'CD'
        },
        {
            'value': 'DVD',
            'label': 'DVD'
        },
        {
            'value': 'BLURAY',
            'label': 'BLURAY'
        },
        {
            'value': 'TAPE',
            'label': 'TAPE'
        },
        {
            'value': 'FLOPPY',
            'label': 'FLOPPY'
        },
        {
            'value': 'LASERDISC',
            'label': 'LASERDISC'
        },
        {
            'value': 'JAZDRIVE',
            'label': 'JAZDRIVE'
        },
        {
            'value': 'PUNCHCARDS',
            'label': 'PUNCHCARDS'
        },
        {
            'value': 'RNA',
            'label': 'RNA'
        }
    ];

    $scope.services = [
        {
            'value': 'good',
            'label': 'Good Service'
        },
        {
            'value': 'cheap',
            'label': 'Cheap Service'
        },
        {
            'value': 'fast',
            'label': 'Fast Service'
        },
        {
            'value': 'custom',
            'label': 'Custom Service'
        }
    ];

    $scope.beatles = [
        'Paul McCartney',
        'John Lennon',
        'Ringo Starr',
        'George Harrison'
    ];

    $scope.nevers = [
        'Give you up',
        'Let you down',
        'Run around',
        'Desert you',
        'Make you cry',
        'Say goodbye',
        'Tell a lie',
        'Hurt you'
    ];

    $scope.optionTableData = [
        {
            'id': 'option1_id',
            'name': 'Option #1',
            'value': 0,
            'obj': {
                'name': 'Nested Name 1'
            }
        }, {
            'id': 'option2_id',
            'name': 'Option #2',
            'value': 1,
            'obj': {
                'name': 'Nested Name 2'
            }
        }, {
            'id': 'option3_id',
            'name': 'Option #3',
            'value': 2,
            'obj': {
                'name': 'Nested Name 3'
            }
        }, {
            'id': 'option4_id',
            'name': 'Option #4',
            'value': 3,
            'obj': {
                'name': 'Nested Name 4'
            }
        }
    ];

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableCheckboxData = [
        {
            'name': 'Item 1'
        }, {
            'name': 'Item 2',
            'value': 'checked',
            'falseValue': 'unchecked'
        }
    ];

    $scope.optionTableEmptyData = [];

    /* ========== FUNCTIONS ========== */
    $scope.disableOption = function (tableId, fieldId, rowId) {
        return rowId === 'option4_id';
    };

    /* ========== FORM MODELS ========== */
    $scope.simple = {
        userEmail: '',
        // TODO: use isNameRequired for rxFieldName "required" midway tests
        // TODO: remove this comment after completed
        isNameRequired: true,
        volumeName: ''
    };

    $scope.intermediate = {
        volumeType: _.first($scope.volumeTypes).value, // select the first type by default
        services: [],
        favoriteBeatle: 'all',
        settings: {
            first: true,
            second: false,
            third: true,
            fourth: false
        },
        table: {
            radio: 0,
            checkbox: [true, 'unchecked'], // example with first checkbox automatically checked
            empty: [true, 'unchecked']
        }
    };

    $scope.advanced = {
        radChoice: 'default',
        inputEnabled: false
    };
});

// A dummy directive only used within the rxForm demo page.
// It's used to check that some string contains 'foo', and works
// with ngForm to set the appropriate `.$error` value
// Note: This code is easier to write in Angular 1.3, because
// you can use `.$validators` instead of `.$parsers`
angular.module('encore.ui.rxForm')
.directive('foocheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            // Put a new validator on the beginning
            ctrl.$parsers.unshift(function (viewValue) {
                if (_.contains(viewValue, 'foo')) {
                    ctrl.$setValidity('foocheck', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('foocheck', false);
                    return undefined;
                }
            });
        }
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxIdentityCtrl', function ($scope, $window, Identity) {
    $scope.user = {};
    $scope.login = function () {
        $scope.toggle = true;
        Identity.login($scope.user,
            function (authToken) {
                $scope.toggle = false;
                $window.alert('Congrats! Logged In');
            },
            function (error) {
                $scope.toggle = false;
                $window.alert('Login attempt failed.');
            });
    };
});




angular.module('demoApp')
.controller('rxLocalStorageCtrl', function ($scope, $window, LocalStorage) {
    $scope.setSideKick = function () {
        LocalStorage.setObject('joker', { name: 'Harley Quinn' });
    };

    $scope.getSideKick = function () {
        var sidekick = LocalStorage.getObject('joker');
        $window.alert(sidekick.name);
    };
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('rxMetadataCtrl', function ($scope) {
    $scope.someDate = new Date('January 6 1989');
    $scope.someAmount = 192.68;
});


angular.module('demoApp')
.controller('rxMiscCtrl', function ($scope, $timeout, $q, rxNotify, rxAutoSave) {
    $scope.formData = {
        checkbox: false,
        name: '',
        description: '',
        sensitive: ''
    };

    var autosave = rxAutoSave($scope, 'formData', {
        exclude: ['sensitive'],
        ttl: 86400000
    });

    $scope.status = {
        loading: false,
        disable: false,
        deferredLoading: false,
        deferredDisable: false
    };

    var clearMsg = [
        'rxAutoSave data has been cleared!',
        'Navigate away and return, and the form will not be auto-populated'
    ].join(' ');

    // Clear with an explicit autosave.clear() call
    $scope.clearStorage = function () {
        $scope.status.loading = true;
        $timeout(function () {
            $scope.status.loading = false;
            autosave.clear();
            rxNotify.add(clearMsg, { type: 'success' });
        }, 1000);
    };

    // Clear by resolving the associated promise
    $scope.deferredClear = function () {
        var deferred = $q.defer();

        autosave.clearOnSuccess(deferred.promise);
        $scope.status.deferredLoading = true;

        $timeout(function () {
            $scope.status.deferredLoading = false;
            deferred.resolve();
            rxNotify.add(clearMsg, { type: 'success' });
        }, 1000);
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxModalActionCtrl', function ($scope, rxNotify) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
        rxNotify.add('Password Updated!', {
            type: 'success'
        });
    };

    $scope.notifyDismissal = function () {
        rxNotify.add('Password Unchanged', {
            type: 'info'
        });
    };
})
.controller('rxModalStateCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {
    var complete = function () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    };

    $scope.submit = function () {
        $scope.setState('confirm');
    };

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    };

    $scope.cancel = function () {
        rxNotify.clear('modal');

        /*
         * You may place custom dismiss logic here,
         * if you do not wish to use a `dismiss-hook` function.
         **/

        // This must be called to dismiss the modal.
        $modalInstance.dismiss();
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxMultiSelectCtrl', function ($scope) {
    $scope.data = {
        classification: []
    };
 });

/*jshint unused:false*/
angular.module('demoApp')
.controller('rxNotifyCtrl', function ($rootScope, $scope, $window, rxNotify, rxPromiseNotifications, $q) {
    $scope.message = 'My message';

    $scope.types = [ 'info', 'success', 'warning', 'error' ];

    $scope.options = {
        type: 'info',
        timeout: -1,
        show: 'immediate',
        repeat: true
    };

    $scope.ondismiss = {
        should: false,
        method: function (msg) {
            $window.alert('We are dismissing the message: ' + msg.text);
        }
    };

    $scope.routeChange = function (stack) {
        $rootScope.$broadcast('$routeChangeStart', {});
        $rootScope.$broadcast('$routeChangeSuccess', {});
    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);

        if ($scope.ondismiss.should) {
            messageOptions.ondismiss = _.clone($scope.ondismiss.method);
        }

        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    // add a default messages (to custom stack so they don't show on the main page)
    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Loading', {
        loading: true,
        stack: 'demo'
    });
    rxNotify.add('You did it!', {
        type: 'success',
        stack: 'demo'
    });
    rxNotify.add('Careful now...', {
        type: 'warning',
        stack: 'demo'
    });
    rxNotify.add('Under Attack by Aliens', {
        type: 'error',
        stack: 'custom'
    });

    // stuff for rxPromiseNotifications
    $scope.addPromise = function () {
        $scope.deferred = $q.defer();

        var promiseScope = rxPromiseNotifications.add($scope.deferred.promise, {
            loading: 'Loading Message',
            success: 'Success Message',
            error: 'Error Message'
        }, 'demo');
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxOptionTableCtrl', function ($scope) {
    $scope.radioValue = 0;
    $scope.checkboxValues = [true, 'unchecked'];

    $scope.optionTableData = [
        {
            'id': 'option1',
            'name': 'Option #1',
            'value': 0,
            'obj': {
                'name': 'Nested Name 1'
            }
        }, {
            'id': 'option2',
            'name': 'Option #2',
            'value': 1,
            'obj': {
                'name': 'Nested Name 2'
            }
        }, {
            'id': 'option3',
            'name': 'Option #3',
            'value': 2,
            'obj': {
                'name': 'Nested Name 3'
            }
        }, {
            'id': 'option4',
            'name': 'Option #4',
            'value': 3,
            'obj': {
                'name': 'Nested Name 4'
            }
        }
    ];

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableCheckboxData = [
        {
            'name': 'Item 1'
        }, {
            'name': 'Item 2',
            'value': 'checked',
            'falseValue': 'unchecked'
        }
    ];

    $scope.optionTableEmptyData = [];

    $scope.disableOption = function (tableId, fieldId, rowId) {
        return rowId === 'option4';
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxPageTitleCtrl', function ($scope, rxPageTitle) {
    $scope.changeTitle = function () {
        rxPageTitle.setTitle($scope.newTitle);
    };

    $scope.refreshTitle = function () {
        $scope.pageTitle = rxPageTitle.getTitle();
    };

    $scope.refreshTitle();
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxPaginateCtrl', function ($scope, $q, $timeout, $filter, rxPaginateUtils,
                                        PageTracking, rxSortUtil, SelectFilter) {
    $scope.pager = PageTracking.createInstance({ itemsPerPage: 3 });

    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];
    var makeServers = function (serverCount) {
        var servers = [];
        for (var i = 1; i < serverCount + 1; i++) {
            var server = {
                id: i,
                name: 'Server ' + i,
                os: os[i % os.length]
            };
            servers.push(server);
        }
        return servers;
    };

    $scope.servers = makeServers(21);

    $scope.removeServers = function () {
        if ($scope.servers.length > 2) {
            $scope.servers = $scope.servers.splice(2);
        }
    };

    $scope.addServers = function () {
        $scope.servers = $scope.servers.concat(makeServers(2));
    };

    var allLazyServers = makeServers(701);

    var serverInterface = {
        getItems: function (pageNumber, itemsPerPage, params) {
            var deferred = $q.defer();
            var filterText = params.filterText;
            var sortColumn = params.sortColumn;
            var sortDirection = params.sortDirection;

            if (sortColumn === 'name') {
                sortColumn = 'id';
            }

            if (sortDirection === 'DESCENDING') {
                sortColumn = '-' + sortColumn;
            }

            $timeout(function () {
                var first = pageNumber * itemsPerPage;
                var added = first + itemsPerPage;
                var last = (added > allLazyServers.length) ? allLazyServers.length : added;

                var filteredServers = $filter('filter')(allLazyServers, filterText);
                filteredServers = $scope.osFilter.applyTo(filteredServers);
                filteredServers = $filter('orderBy')(filteredServers, sortColumn);

                // Return 100 items more than the user's `itemsPerPage`. i.e. if the
                // user is asking for 25 items per page, return 125 in total
                var lazyServers = filteredServers.slice(first, last + 100);

                var response = {
                    items: lazyServers,
                    pageNumber: pageNumber,
                    totalNumberOfItems: filteredServers.length
                };

                if (filterText === 'error') {
                    deferred.reject();
                } else {
                    deferred.resolve(response);
                }
            }, 300);
            return deferred.promise;
        }
    };

    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.data = { searchText: '' };
    $scope.clearFilter = function () {
        $scope.data.searchText = '';
    };
    $scope.osFilter = SelectFilter.create({
        properties: ['os'],
        available: {
            os: os
        }
    });
    $scope.serverInterface = serverInterface;
    $scope.pagedServers = PageTracking.createInstance({ itemsPerPage: 25 });
});


angular.module('demoApp')
.controller('rxPermissionCtrl', function ($scope, Session, rxNotify) {
    rxNotify.add('Respect My Authority!!', {
        stack: 'permission',
        type: 'warning'
    });

    $scope.storeToken = function () {
        Session.storeToken({ access: { user: { roles: [{ name: 'test' } ] }}});
    };

    $scope.clearToken = function () {
        Session.logout();
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxRadioCtrl', function ($scope) {
    $scope.validEnabled = 1;
    $scope.validDisabled = 1;
    $scope.validNgDisabled = 1;

    $scope.invalidEnabled = 1;
    $scope.invalidDisabled = 1;
    $scope.invalidNgDisabled = 1;

    $scope.radCreateDestroy = 'destroyed';
    $scope.plainHtmlRadio = 'isChecked';
});


angular.module('demoApp')
.controller('rxSearchBoxCtrl', function ($scope) {
    $scope.searchModel = '';
    $scope.filterPlaceholder = 'Filter by any...';
});


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

    $scope.htmlSelectAlternativeValue = 'second';
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxSelectFilterCtrl', function ($scope, SelectFilter) {
    $scope.filter = SelectFilter.create({
        properties: ['account', 'status'],
        selected: {
            account: ['A']
        }
    });

    $scope.tickets = [
        { account: 'A', status: 'NEW', description: 'A new ticket' },
        { account: 'A', status: 'IN_PROGRESS', description: 'Fix all the bugs' },
        { account: 'B', status: 'TRANSFERRED', description: 'Don\'t stop believing' },
        { account: 'B', status: 'VENDOR', description: 'Hold on to that feeling' },
        { account: 'A', status: 'TRANSFERRED', description: 'qwertyuiop' }
    ];
});


angular.module('demoApp')
.controller('rxSessionCtrl', function ($scope, $window, Session) {
    $scope.isAuthenticated = function () {
        $window.alert(Session.isAuthenticated());
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxSortableColumnCtrl', function ($scope, PageTracking, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.pager = PageTracking.createInstance();

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.talentPool = [
        {
            name: 'Andrew Yurisich',
            jobTitle: 'Mailroom Associate IV'
        },
        {
            name: 'Patrick Deuley',
            jobTitle: 'Design Chaplain'
        },
        {
            name: null,
            jobTitle: 'Chief Mastermind'
        },
        {
            jobTitle: 'Assistant Chief Mastermind'
        },
        {
            name: 'Hussam Dawood',
            jobTitle: 'Evangelist of Roger Enriquez'
        },
        {
            name: 'Kerry Bowley',
            jobTitle: 'Dev Mom'
        },
    ];
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxSpinnerCtrl', function ($scope) {
    $scope.loading = true;
});


angular.module('demoApp')
.controller('rxStatusCtrl', function ($scope, $rootScope, Status) {
    Status.setScope($scope);

    $scope.triggerRouteChangeSuccess = function () {
        $rootScope.$broadcast('$routeChangeSuccess');
    };

    $scope.clear = function () {
        Status.clear();
        $scope.notify = undefined;
    };

    $scope.setLoading = function (msg) {
        Status.clear();
        $scope.notify = Status.setLoading(msg);
    };

    $scope.setSuccess = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccess(msg);
    };

    $scope.setSuccessNext = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccessNext(msg);
    };

    $scope.setSuccessImmediate = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccessImmediate(msg);
    };

    $scope.setWarning = function (msg) {
        Status.clear();
        $scope.notify = Status.setWarning(msg);
    };

    $scope.setInfo = function (msg) {
        Status.clear();
        $scope.notify = Status.setInfo(msg);
    };

    $scope.setError = function (msg) {
        Status.clear();
        $scope.notify = Status.setError(msg);
    };

    $scope.dismiss = function () {
        $scope.notify && Status.dismiss($scope.notify);
        $scope.notify = undefined;
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxStatusColumnCtrl', function ($scope, rxStatusMappings, rxSortUtil) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'DISABLED', title: 'DISABLED status' },
        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },
        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },
        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },
        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },
        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api:'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo('RESCUE');
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);
    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);
    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.sort = rxSortUtil.getDefault('status');
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('rxTagsCtrl', function ($scope) {
    $scope.tagOptions = [
        { text: 'apple', category: 'fruit' },
        { text: 'orange', category: 'fruit' },
        { text: 'banana', category: 'fruit' },
        { text: 'squash', category: 'vegetable' }
    ];
    $scope.tags = ['apple'];
});




/*jshint unused:false*/
angular.module('demoApp')
.controller('rxToggleSwitchCtrl', function ($scope, $timeout, rxNotify) {
    $scope.toggle3 = true;
    $scope.toggle5 = true;

    $scope.attemptChange = function (value) {
        $scope.loading = true;
        rxNotify.clear('page');
        rxNotify.add('Saving...', {
            loading: true
        });

        // Simulate an API request
        $timeout(function () {
            $scope.loading = false;
            rxNotify.clear('page');
            rxNotify.add('Change saved', {
                type: 'success'
            });
        }, 1000);
    };

    $scope.attemptFailedChange = function (value) {
        $scope.loading5 = true;
        rxNotify.clear('page');
        rxNotify.add('Attempting to activate...', {
            loading: true
        });

        // Simulate a failed API request
        $timeout(function () {
            $scope.loading5 = false;
            rxNotify.clear('page');
            rxNotify.add('Asynchronous operation failed', {
                type: 'error',
            });
            
            // Reset toggle switch to original value to simulate failed async operation
            $scope.toggle5 = !value;
        }, 1000);
    };
});








/* jshint unused:false */
angular.module('demoApp')
.controller('tooltipsCtrl', function ($scope) {
    $scope.dynamicTooltip = 'I was defined in the controller!';
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('typeaheadCtrl', function ($scope) {
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
});


angular.module('demoApp')
.controller('SessionStorageSimpleCtrl', function ($scope, $window, SessionStorage) {
    $scope.setSideKick = function () {
        SessionStorage.setItem('Batman', 'Robin');
    };

    $scope.getSideKick = function () {
        $window.alert(SessionStorage.getItem('Batman'));
    };
});


/*jshint unused:false*/
angular.module('demoApp')
.controller('hotkeysVolumeCtrl', function ($scope, hotkeys) {
    $scope.volume = 5;

    // Remove combos so we don't add them multiple times
    hotkeys.del('ctrl+up');
    hotkeys.del('ctrl+down');

    // Add desired combos
    hotkeys.add({
        combo: 'ctrl+up',
        description: 'Turn up the volume!',
        callback: function () {
            $scope.volume += 1;
        }
    });

    hotkeys.add({
        combo: 'ctrl+down',
        description: 'Turn it down!',
        callback: function () {
            $scope.volume -= 1;
        }
    });
});




angular.module('demoApp')
.controller('rxCapitalizeCtrl', function ($scope) {
    $scope.hello = 'hello world this is my text.';
});




