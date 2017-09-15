(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('msSearchBarCustome', msSearchBarCustome);

    /** @ngInject */
    function msSearchBarCustome($document) {

        // var vm = this;
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'app/ms-search-bar/ms-search-bar.html',

            compile: function(tElement) {
                // Add class
                tElement.addClass('ms-search-bar');

                return function postLink(scope, iElement) {
                    var expanderEl,
                        collapserEl, inputEl;

                    // Initialize
                    init();

                    function init() {
                        expanderEl = iElement.find('#ms-search-bar-expander');
                        collapserEl = iElement.find('#ms-search-bar-collapser');
                        inputEl = iElement.find('#ms-search-bar-input')
                        expanderEl.on('click', expand);
                        collapserEl.on('click', collapse);
                    }

                    /**
                     * Expand
                     */
                    function expand() {

                        iElement.addClass('expanded');
                        inputEl[0].focus();

                        // Esc key event
                        $document.on('keyup', escKeyEvent);
                    }

                    /**
                     * Collapse
                     */
                    function collapse() {

                        iElement.removeClass('expanded');
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