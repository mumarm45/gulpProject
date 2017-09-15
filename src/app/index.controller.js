(function() {
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController)
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);

        }]);
    // var agGrid = require('ag-grid');
    // agGrid.initialiseAgGridWithAngular1(angular);

    window.appBaseUrl = 'http://localhost:8080/efadminpanel';

    /** @ngInject */
    function IndexController($rootScope, fuseTheming, $timeout, Session, utilCustom, $filter, AUTH_EVENTS, AuthService, $location, $scope, $state) {
        var vm = this;
        //  window.appBaseUrl = 'http://192.168.200.47:9092/AdminPanel';

        // Data
        vm.themes = fuseTheming.themes;
        checkApplicationEnvirnoment();
        vm.isAuthorized = AuthService.isAuthenticate();
        isAuthorizedIndex();

        if (vm.isAuthorized == false) {
            // AuthService.hideSideMenu();
            AuthService.serverAuthenticate().then(function() {

                $state.go("app.pages_auth_login");

            }, function(error) {
                $state.go("app.pages_auth_login");
            });
        } else {

            //   var currentPath = $location.path();
            Session.setAuthToken();
            AuthService.serverAuthenticate('noDraw').then(function(loginData) {
                vm.username = Session.username();


                AuthService.createSideMenu(loginData.role).then(function(loginData) {
                    if (!loginData.applicationName) {

                        utilCustom.toaster($filter('translate')('backend.applicationSettingNot'));
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
                            'response');

                    }
                }, function(error) {

                })






            });


        }

        function checkApplicationEnvirnoment() {
            switch (window.applicationEnvironment) {
                case 'ecm':
                    { vm.title = "Campaign Manager"; break; }
                case 'adminpanel':
                    { vm.title = "Admin Panel"; break; }
                default:
                    { vm.title = "Admin Panel/ECM"; }
            }
        }

        function isAuthorizedIndex() {
            if (AuthService.isAuthenticate() == false)
                $state.go("app.pages_auth_login");
        };
        vm.hasPermission = function(permission, id) {
            if (id != undefined)
                permission = permission.concat(":" + id);

            return PermissionService.hasPermission(permission);
        };
        vm.getUsername = function() {
            return Session.username();
        };
        vm.getUserId = function() {
            return Session.userId();
        };
        vm.logout = function() {
            AuthService.signOut();
        };
        vm.profilePage = function() {
            $location.path("/user/detail/" + vm.getUserId());
        };
        //appBaseUrl = "/grails-scaffolding";
        vm.alerts = [];
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            // utilCustom.toaster($filter('translate')('login.blockedUser'));
            Session.destroy();
            $state.go("app.pages_auth_login");

        });
        $scope.$on(AUTH_EVENTS.notAuthorized, function() {
            $location.path('/404');
        });
        $scope.$on(AUTH_EVENTS.serverOff, function() {
            utilCustom.toaster($filter('translate')('backend.serverOff'));
        });
        $scope.$on(AUTH_EVENTS.permissionDenied, function() {
            Session.destroy();
            $state.go("app.pages_auth_login");
        });
        $scope.$on('tokenExpired', function() {
            //toaster.pop('error', $filter("translate")("com.ef.evr.label.user"), $filter("translate")("com.ef.evr.label.TokenExpired"));
            $state.go("app.pages_auth_login");
            Session.destroy();
            AuthService.hideSideMenu();

        });
        $scope.$on(AUTH_EVENTS.ccxNotResponding, function() {
            utilCustom.toaster($filter('translate')('backend.ccxNotResponding'));
        });
        $scope.$on(AUTH_EVENTS.notFound, function() {
            $location.path('/404');
        });
        $scope.$on(AUTH_EVENTS.sessionTimeout, function() {
            $location.path('Auth/419');
        });
        $scope.$on(AUTH_EVENTS.internalError, function() {
            $location.path('Auth/500');
        });
        // var newLength = vm.alerts.length;
        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };
        vm.translateKey = function(value) {

            return $filter("translate")(value);
        };
        vm.changeLanguage = function(langKey) {
            $translate.use(langKey);
        };
        vm.currentLang = function() {
            return $translate.use();
        };



    }
})();