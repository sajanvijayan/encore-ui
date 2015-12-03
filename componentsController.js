angular
    .module('demoApp')

    /**
     * @ngdoc filter
     * @name demoApp:componentsFilter
     * @description
     * Used to filter components list. Given a string, filter checks for the following case insensitive conditions:
     *  - input string matches any part of component name value
     *  - input string matches begining of stability value
     *  - input string matched any part of long format date value
     *
     * @param {Array} components The list of components to be filtered.
     * @param {String} search The input string to filter list by.
     */
    .filter('componentsFilter', function () {
        var prevSearch = '';

        return function (components, search) {
            if (!search) {
                return components;
            }

            search = search.toLowerCase();

            return _.filter(components, function (item) {
                return item.name.toLowerCase().indexOf(search) !== -1 ||
                    (item.stability && item.stability.substring(0, search.length) === search)
            });
        };
    })
    .controller('componentsController', function (components, rxBreadcrumbsSvc) {
        var vm = this;

        vm.components = components;
        vm.sortKey = 'name';
        vm.sortReverse = false;

        vm.getCaretType = getCaretType;
        vm.showCaret = showCaret;
        vm.sortColumn = sortColumn;

        activate();

        function activate () {
            rxBreadcrumbsSvc.set([{
                path: '/components',
                name: 'Components'
            }]);
        }

        function getCaretType () {
            return vm.sortReverse ? "fa fa-caret-down" : "fa fa-caret-up";
        }

        function showCaret (key) {
            return vm.sortKey === key;
        }

        function sortColumn (key) {
            // Click new column defaults to ascending; click same column toggles between asc and desc
            vm.sortReverse = (key === vm.sortKey ? !vm.sortReverse : false);
            vm.sortKey = key;
        }
    });
