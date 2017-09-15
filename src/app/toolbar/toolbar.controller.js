(function() {
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /** @ngInject */


    function ToolbarController($rootScope, $mdSidenav, $state, $scope, $translate, $mdToast, AuthService, $timeout, toolBarService, applicationSettingService) {
        var vm = this;
        vm.signOut = signOut;
        vm.state = $state;
        vm.hideWorkSpace = false;
        $scope.$on('$stateChangeSuccess', function() {
            vm.currentState = $state.current.name.split('.');
            vm.currentState = vm.currentState[vm.currentState.length - 1];
            vm.searchOff = vm.currentState == 'group' || vm.currentState == 'skill' || vm.currentState == 'region' || vm.currentState == 'service' || vm.currentState == 'adminPreferenceSetting' || vm.currentState == 'ecmPreferenceSetting' || vm.currentState == 'agency' || vm.currentState == 'bCService' || vm.currentState == 'directoryNumber';
        });
        // Data
        $rootScope.global = {
            search: ''
        };
        var userID = window.localStorage.getItem('username') ? window.localStorage.getItem('username') : window.sessionStorage.getItem('username');
        vm.userId = userID;
        vm.bodyEl = angular.element('body');
        vm.workSpace = window.teams;

        if (window.applicationEnvironment == 'ecm' || window.userRole == 'admin') {
            vm.workSpace = [];

            window.localStorage.removeItem('currentTeam');
        };
        if (!vm.workSpace) {
            if (userID) {
                vm.avatar = window.appBaseUrl + '/images/agents/' + angular.lowercase(userID) + '.jpg?timestamp=' + new Date().getTime();
                vm.workSpace = [];
                if (window.applicationEnvironment == 'ecm') {
                    vm.workSpace = [];
                } else {

                    toolBarService.getAgentTeam({ id: userID }).then(function(response) {
                        vm.workSpace = response;
                    }, function(error) {
                        //console.log(error)
                    });
                }

            }

        }
        vm.languages = {
            en: {
                'title': 'English',
                'translation': 'TOOLBAR.English',
                'code': 'en',
                'flag': 'uk'
            }/*,
            fr: {
                'title': 'French',
                'translation': 'TOOLBAR.French',
                'code': 'fr',
                'flag': 'fr'
            },
            gr: {
                'title': 'German',
                'translation': 'TOOLBAR.German',
                'code': 'gr',
                'flag': 'gr'
            },
            it: {
                'title': 'Italian',
                'translation': 'TOOLBAR.Italian',
                'code': 'it',
                'flag': 'it'
            }*/
        };

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;
        vm.changeLanguage = changeLanguage;
        vm.changeWorkSpace = changeWorkSpace;
        vm.setUserStatus = setUserStatus;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;
        vm.signOut = signOut;
        //////////

        init();

        /**
         * Initialize
         */
        function init() {

            // Get the selected language directly from angular-translate module setting
            var lan = $translate.storage().get();
            vm.selectedLanguage = vm.languages[lan];
            var team = window.localStorage.getItem('currentTeam');
            if (team == "undefined" || team == undefined) {
                if (vm.workSpace)
                    vm.selectedWorkSpace = vm.workSpace[0];
                if (vm.selectedWorkSpace)
                    window.localStorage.setItem('currentTeam', JSON.stringify(vm.selectedWorkSpace));
            } else {
                vm.selectedWorkSpace = JSON.parse(window.localStorage.getItem('currentTeam'));
            }
            applicationSettingService.getSetting().then(function(res) {
                if (angular.lowercase(res.applicationName) == "ecm") {
                    vm.hideWorkSpace = true;
                }

            })

        }

        function signOut() {
            AuthService.signOut();
        }
        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Sets User Status
         * @param status
         */
        function setUserStatus(status) {
            vm.userStatus = status;
        }

        /**
         * Logout Function
         */
        function logout() {
            // Do logout here..
        }

        /**
         * Change Language
         */
        function changeLanguage(lang) {
            vm.selectedLanguage = lang;
            // Change the language


            $translate.use(lang.code);
            $timeout(function() {

                $rootScope.$broadcast('change_language', { code: lang.code });
            }, 1);

        }

        function changeWorkSpace(workSpace) {

            vm.selectedWorkSpace = workSpace;
            window.localStorage.removeItem('currentTeam');
            window.localStorage.setItem('currentTeam', JSON.stringify(workSpace));
            $rootScope.$broadcast('CHANGE_TEAM', workSpace);

        }
        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu() {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }
    }
})();
