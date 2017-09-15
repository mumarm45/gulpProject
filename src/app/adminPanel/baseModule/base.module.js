(function() {
    'use strict';
    angular
        .module('app.base', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {

        // State
        $stateProvider.state('app.base', {
            url: '/base',
            views: {
                'content@app': {
                    templateUrl: 'app/adminPanel/baseModule/base.html',
                    controller: 'BaseController as vm'
                }
            }
        });

    }



})();