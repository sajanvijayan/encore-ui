var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxCheckbox = require('./rxCheckbox.page').rxCheckbox;
/**
 * @private
 * @description Shared function in both one row's `isSelected`, and `selections` getter.
 */
var isOptionSelected = function (eleOptionRow) {
    return eleOptionRow.getAttribute('class').then(function (classNames) {
        return classNames.indexOf('selected') > -1;
    });
};

var optionRowFromElement = function (eleOptionRow) {
    /**
     * @namespace rxOptionTable.row
     * @see rxOptionTable
     * @description Functions for interacting with a row from an {@link rxOptionTable}.
     */
    return Page.create({
        rootElement: {
            get: function () { return eleOptionRow; }
        },

        /**
         * @function
         * @instance
         * @memberof rxOptionTable.row
         * @description Whether or not the row is currently selected.
         * @returns {Boolean}
         */
        isSelected: {
            value: function () {
                return isOptionSelected(this.rootElement);
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxOptionTable.row
         * @description Whether or not the row is visually marked as "current".
         * @returns {Boolean}
         */
        isCurrent: {
            value: function () {
                return this.rootElement.getAttribute('class').then(function (classNames) {
                    return classNames.indexOf('current') > -1;
                });
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxOptionTable.row
         * @description
         * Return the value of the cell by `columnName`, using `getText` by default.
         * For more control, pass in a `customFn`.
         * The reason `columnName` is used, as opposed to by binding, is due to some
         * complexity contained within the `getContent` function in the rxOptionTable directive.
         * [Link to the `getContent` function]{@link https://goo.gl/jWMt2V}.
         * There are columns that may contain static data (or expressions to be evaluated against `$scope`)
         * for every row, and those data items are never bound to `$scope`. Although the column.keys that are
         * passed into `$scope.getContent` that contain angular expressions can be located by binding, there are
         * cases when plain text or HTML gets passed in. These never get bound to `$scope`. They can, however,
         * be located by querying the column name via CSS selector, so that's used instead.
         * @param {string} columnName - Column name to grab the current row's cell under.
         * @param {function} [customFn=getText()] -
         * Special work to be done to the resulting cellElements found under `columnName`.
         * @example
         * it('should have the right name in the first row', function () {
         *     expect(encore.rxOptionTable.row(0).cell('Name')).to.eventually.equal('Andrew Yurisich');
         * });
         */
        cell: {
            value: function (columnName, customFn) {
                if (customFn === undefined) {
                    customFn = function (cellElement) {
                        return cellElement.getText();
                    };
                }

                var css = 'td[data-column^="' + columnName + '"]';
                return customFn(this.rootElement.$(css));
            }
        },

        /**
         * @memberof rxOptionTable.row
         * @instance
         * @description
         * Since checkboxes are a superset of radio input elements, a checkbox is used, regardless
         * if the option table is a checkbox type or a radio button type table.
         * @type {rxCheckbox}
         */
        selectInput: {
            get: function () {
                var inputElement = this.rootElement.$('input');
                return rxCheckbox.initialize(inputElement);
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxOptionTable.row
         * @description Selects the current row.
         */
        select: {
            value: function () {
                this.selectInput.select();
            }
        },

        /**
         * @function
         * @instance
         * @memberof rxOptionTable.row
         * @description Deselects the current row.
         */
        deselect: {
            value: function () {
                this.selectInput.deselect();
            }
        }
    });
};//optionRowFromElement

var cellSelectorForColumn = function (columnName) {
    return 'tr td[data-column^="' + columnName + '"]';
};

/**
 * @private
 * @description
 * Extract the row number that a certain cell was found in.
 * This is tightly coupled to the implementation of the directive's data population scheme!
 * See the rxOptionTable's html template, in the column repeater's `label[for]` html.
 * If that ever changes, the functionality in this page object may become tedious to support later.
 */
var rowNumberFromCell = function (cellElement) {
    return cellElement.getAttribute('data-row-number').then(function (number) {
        return parseInt(number, 10);
    });
};

/**
 * @namespace
 * @deprecated rxOptionTable will be removed in EncoreUI 4.0.0
 */
var rxOptionTable = {
    tblRows: {
        get: function () {
            return this.rootElement.$$('.datum-row');
        }
    },

    tblColumns: {
        get: function () {
            return this.rootElement.$$('thead th.column');
        }
    },

    lblEmptyWarningMessage: {
        get: function () {
            return this.rootElement.$('.empty-message-row .empty-message');
        }
    },

    /**
     * @function
     * @instance
     * @description The number of rows in the table.
     * @example
     * it('should have more than two rows', function () {
     *     expect(encore.rxOptionTable.initialize().count()).to.eventually.be.above(2);
     * });
     */
    count: {
        value: function () {
            return this.tblRows.count();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the root element is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the table's empty message label is currently present.
     * @returns {Boolean}
     * @example
     * it('should not have any rows in the table', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     expect(table.count()).to.eventually.equal(0);
     *     expect(table.isEmpty()).to.eventually.be.true;
     * });
     */
    isEmpty: {
        value: function () {
            return this.lblEmptyWarningMessage.isPresent();
        }
    },

    /**
     * @instance
     * @description The currently displayed empty message label text, or `null` if not present.
     * @type {String|null}
     * @example
     * it('should not have any rows in the table', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     expect(table.count()).to.eventually.equal(0);
     *     expect(table.isEmpty()).to.eventually.be.true;
     *     expect(table.emptyMessage).to.eventually.not.be.null;
     * });
     */
    emptyMessage: {
        get: function () {
            var page = this;
            return this.isEmpty().then(function (empty) {
                return empty ? page.lblEmptyWarningMessage.getText() : null;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Exposes a namespace of functions to interact with a row in an option table.
     * @param {number} rowIndex - Index of the row in the table.
     * @returns {rxOptionTable.row} Page object representing a row.
     */
    row: {
        value: function (rowIndex) {
            return optionRowFromElement(this.tblRows.get(rowIndex));
        }
    },

    /**
     * @instance
     * @description
     * Will default to the first selected row if many are selected.
     * Be certain you have a selected row before calling this, or a
     * `NoSuchElementError` will be thrown.
     * @type {rxOptionTable.row}
     * @example
     * it('should already have the row for "Texas" selected', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     expect(table.selectedRow.cell('State')).to.eventually.equal('Texas');
     * });
     */
    selectedRow: {
        get: function () {
            return optionRowFromElement(this.rootElement.$('.selected'));
        }
    },

    /**
     * @instance
     * @description Every column heading's text, as an array.
     * @type {String[]}
     * @example
     * it('should have every column present in the option table', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     expect(table.columnNames).to.eventually.equal(['Name', 'Role', 'Hire Date']);
     * });
     */
    columnNames: {
        get: function () {
            return this.tblColumns.map(function (columnElement) {
                return columnElement.getText();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description
     * Return the value of the cells found under `columnName`, using `getText` by default.
     * For more control, pass in a `customFn`.
     * @param {String} columnName - Column name containing the cell elements to be retrieved.
     * @param {Function} [customFn=getText()] - Special work to be done on the column's cell elements.
     * @returns {*|String[]} Array of return values specified in `customFn`, or an array of strings from `getText()`
     * @example
     * // three rows, with ['$0.00', '$1.00', '$2.00'] in their cells, respectively.
     * var penniesData = [0, 100, 200];
     * var penniesFn = function (cellElements) {
     *     return cellElements.getText().then(rxMisc.currencyToPennies);
     * };
     *
     * // without the second argument, each cell will have `.getText()` called on it
     * expect(optionTable.columnData('Surcharge', penniesFn)).to.eventually.eql(penniesData);
     */
    columnData: {
        value: function (columnName, customFn) {
            if (customFn === undefined) {
                customFn = function (cellElements) {
                    return cellElements.map(function (cellElement) {
                        return cellElement.getText();
                    });
                };
            }

            var css = cellSelectorForColumn(columnName);
            return customFn(this.rootElement.$$(css));
        }
    },

    /**
     * @function
     * @instance
     * @description Deselects every row in the rxOptionTable.
     */
    deselectAll: {
        value: function () {
            this.tblRows.map(function (rowElement) {
                optionRowFromElement(rowElement).deselect();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description
     * Unselect a row by the `columnName` that contains `columnText`.
     * This function uses cssContainingText, be certain your column name and text is unique.
     * @param {string} columnName - Name of the column that contains the cell to select.
     * @param {string} columnText - Cell text that uniquely identifies the selection.
     * @example
     * it('should deselect the row that matches my dog\'s name', function () {
     *     var dogList = encore.rxOptionTable.initialize($('#dog-list'));
     *     dogList.deselectByColumnText('Name', 'Sebastian');
     *     expect(dogList.selections).to.eventually.eql([]);
     * });
     */
    deselectByColumnText: {
        value: function (columnName, columnText) {
            var page = this;
            var css = cellSelectorForColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionRowFromElement(page.tblRows.get(rowNumber)).deselect();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description
     * Deselect options where each `{ columnName: columnText }` in `selections` is passed to
     * {@link rxOptionTable#deselectByColumnText}.
     * @param {Object[]} selections - Array of single key-value pairs to unselect.
     * @returns {undefined}
     * @example
     * it('should deselect the second item', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     expect(table.selections).to.eventually.eql([0, 1]);
     *     table.deselectMany(
     *         [
     *             { 'Name': 'Item 2' }
     *         ]
     *     );
     *     expect(table.selections).to.eventually.eql([0]);
     * });
     */
    deselectMany: {
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.deselectByColumnText(_.head(_.keys(selection)), _.head(_.values(selection)));
            });
        }
    },

    /**
     * @function
     * @instance
     * @description
     * Select a row by the `columnName` that contains `columnText`.
     * This function uses cssContainingText, be certain your column name and text is unique.
     * @param {string} columnName - Name of the column that contains the cell to select.
     * @param {string} columnText - Cell text that uniquely identifies the selection.
     * @example
     * it('should select the row that matches my dog\'s name', function () {
     *     var dogList = encore.rxOptionTable.initialize($('#dog-list'));
     *     dogList.selectByColumnText('Name', 'Sebastian');
     *     expect(dogList.selections).to.eventually.eql([0]);
     * });
     */
    selectByColumnText: {
        value: function (columnName, columnText) {
            var page = this;
            var css = cellSelectorForColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionRowFromElement(page.tblRows.get(rowNumber)).select();
            });
        }
    },

    /**
     * @function
     * @instance
     * @description
     * Select options where each `{ columnName: columnText }` in `selections` is passed to
     * {@link rxOptionTable#selectByColumnText}.
     * @see rxOptionTable#selectByColumnText
     * @param {Object[]} selections - Array of single key-value pairs to select.
     * @example
     * it('should select the first and second item', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     table.selectMany(
     *         [
     *             { 'Name': 'Item 1' },
     *             { 'Name': 'Item 2' }
     *         ]
     *     );
     *     expect(table.selections).to.eventually.eql([0, 1]);
     * });
     */
    selectMany: {
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.selectByColumnText(_.head(_.keys(selection)), _.head(_.values(selection)));
            });
        }
    },

    /**
     * @instance
     * @description
     * Return a list of row indexes that are currently selected.
     * Get the row yourself if you need more information about the row's contents.
     * @type {Number[]}
     * @example
     * it('should have every state the user has lived in already selected', function () {
     *     var states = ['Florida', 'Indiana', 'Texas'];
     *     var table = encore.rxOptionTable.initialize();
     *     table.selections.then(function (selectedRows) {
     *         expect(selectedRows.length).to.equal(3);
     *         selectedRows.forEach(function (selectedRow) {
     *             expect(table.row(selectedRow).cell('State')).to.eventually.be.oneOf(states);
     *         });
     *     });
     * });
     */
    selections: {
        get: function () {
            return this.tblRows.map(function (rowElement, index) {
                return isOptionSelected(rowElement).then(function (selected) {
                    if (selected) {
                        return index;
                    }
                });
            }).then(function (indexes) {
                // `.map` will return `undefined` for non-selected rows. Drop those results.
                return _.reject(indexes, _.isUndefined);
            });
        }
    },

    /**
     * @instance
     * @description A list of row indexes that are currently disabled.
     * @returns {Number[]}
     * @example
     * it('should have the first and last row disabled', function () {
     *     var table = encore.rxOptionTable.initialize();
     *     table.count().then(function (rowCount) {
     *         expect(table.disabledOptions).to.eventually.eql([0, rowCount - 1]);
     *     });
     * });
     */
    disabledOptions: {
        get: function () {
            return this.tblRows.map(function (rowElement, index) {
                return rowElement.$('.option-input')
                    .getAttribute('disabled')
                    .then(function (disabled) {
                        if (disabled) { return index; }
                    });
            }).then(function (indexes) {
                // `.map` will return `undefined` for enabled rows. Drop those results.
                return _.reject(indexes, _.isUndefined);
            });
        }
    }
};

exports.rxOptionTable = {
    /**
     * @function
     * @memberof rxOptionTable
     * @deprecated rxOptionTable will be removed in EncoreUI 4.0.0
     * @param {ElementFinder} [rxOptionTableElement=$('rx-option-table')] -
     * ElementFinder to be transformed into an rxOptionTableElement object.
     * @returns {rxOptionTable} Page object representing the rxOptionTable object.
     */
    initialize: function (rxOptionTableElement) {
        console.warn (
            'DEPRECATED: rxOptionTable will be removed in EncoreUI 4.0.0'
        );
        if (rxOptionTableElement === undefined) {
            rxOptionTableElement = $('rx-option-table');
        }

        rxOptionTable.rootElement = {
            get: function () { return rxOptionTableElement; }
        };
        return Page.create(rxOptionTable);
    },

    /**
     * @memberof rxOptionTable
     * @function
     * @description
     * Generates a getter and a setter for an option table on your page, no matter if that
     * rxOptionTable contains radio buttons or checkboxes. They will both function identically.
     * This function is very much tied to the {@link rxOptionTable} page object. When using this,
     * consider exposing a raw rxOptionTable component on your page object as well. This
     * provides users the ability to not only quickly get and set options in the rxOptionTable,
     * but also get columns, query cells, and other useful functions exposed in the component.
     * @deprecated rxOptionTable will be removed in EncoreUI 4.0.0
     * @param {ElementFinder} elem - The root element of the rxOptionTable.
     * @returns {rxOptionTable} A getter and a setter to be applied to an option form table in a page object.
     * @example
     * var yourPage = Page.create({
     *     paymentMethod: encore.rxOptionTable.generateAccessor(element(by.model('paymentMethod.primary')));
     *
     *     // you should still expose the optionTable as well, for greater usability in integration tests
     *     paymentMethodTable: {
     *         get: function () {
     *             encore.rxOptionTable.initialize(element(by.model('paymentMethod.primary')));
     *         }
     *     }
     * });
     *
     * it('should select the country', function () {
     *     // select the card in the third row by `cardNumber`
     *     yourPage.paymentMethod = [{cardNumber: '4111 1111 1111 1111'}]; // setter
     *     expect(yourPage.paymentMethod).to.eventually.equal([2]); // getter
     *     // include a raw option table object as well -- it will simplify more expressive tests
     *     expect(yourPage.paymentMethodTable.row(2).cell('Card Type')).to.eventually.equal('Visa');
     * });
     */
    generateAccessor: function (elem) {
        console.warn (
            'DEPRECATED: rxOptionTable will be removed in EncoreUI 4.0.0'
        );
        return {
            get: function () {
                return exports.rxOptionTable.initialize(elem).selections;
            },
            set: function (selections) {
                var optionTable = exports.rxOptionTable.initialize(elem);
                optionTable.deselectAll();
                optionTable.selectMany(selections);
            }
        };
    }
};
