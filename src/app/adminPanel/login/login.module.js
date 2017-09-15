(function ()
{
    'use strict';

    angular
        .module('app.auth', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/adminPanel/login/login.html',
                    controller : 'LoginController as vm'
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
