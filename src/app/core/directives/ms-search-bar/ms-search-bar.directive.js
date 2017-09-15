(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('msSearchBar', msSearchBarDirective);

    /** @ngInject */
    function msSearchBarDirective($document) {

        var vm = this;
        // var global = { search: '' };
        //vm['gloableSearch'] = global.search;

        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'app/core/directives/ms-search-bar/ms-search-bar.html',

            compile: function(tElement) {
                // Add class
                tElement.addClass('ms-search-bar');

                return function postLink(scope, iElement) {
                    var expanderEl,
                        collapserEl;

                    // Initialize
                    init();

                    function init() {
                        expanderEl = iElement.find('#ms-search-bar-expander');
                        collapserEl = iElement.find('#ms-search-bar-collapser');

                        expanderEl.on('click', expand);
                        collapserEl.on('click', collapse);
                        //   vm['gloableSearch'] = global.search;
                    }

                    /**
                     * Expand
                     */
                    function expand() {

                        iElement.addClass('expanded');
                        // vm['gloableSearch'] = global.search;
                        // Esc key event
                        $document.on('keyup', escKeyEvent);
                    }

                    /**
                     * Collapse
                     */
                    function collapse() {

                        iElement.removeClass('expanded');
                        //  vm['gloableSearch'] = global.search;
                    }

                    /**
                     * Escape key event
                     *
                     * @param e
                     */
                    function escKeyEvent(e) {
                        if (e.keyCode === 27) {
                            collapse();
                            $document.off('keyup', escKeyEvent);
                        }
                    }
                };
            }
        };
    }
})();