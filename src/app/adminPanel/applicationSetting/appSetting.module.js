(function() {
    'use strict';

    angular
        .module('app.appSetting', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider.state('app.applicationSetting', {
            url: '/applicationSetting',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.applicationSetting': {
                    templateUrl: 'app/adminPanel/applicationSetting/appSetting.html',
                    controller: 'ApplicationSettingController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        // $translatePartialLoaderProvider.addPart('app/main/pages/auth/login');

        // Navigation

        /* msNavigationServiceProvider.saveItem('login', {
             title : 'Login',
             state : 'app.pages_auth_login',
             weight: 1
         });*/
    }

})();