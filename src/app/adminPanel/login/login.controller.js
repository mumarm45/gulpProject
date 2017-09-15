(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(AuthService, Session, $state, userService, utilCustom, $filter, msNavigationService, AppMenuService) {
        var vm = this;

        var envirnoment = 'dev';
        // Data
        vm.signIn = signIn;

        // Methods
        function signIn(login) {
            /* if(invalid)
               return;*/
            /* $scope.currentLang = function () {
               return  $translate.use();
             };*/
            utilCustom.toasterLoading();
            if (envirnoment != 'dev') {
                AuthService.signIn({ username: login.username, password: login.username == 'admin' ? login.password : '123456!', remember_me: login.remember_me }).then(
                    function(data) {
                        if (data.status == "error") {
                            vm.loginError = "error";

                            utilCustom.hideToaster();
                        } else if (data.status == "isNotActive") {
                            vm.loginError = "isNotActive";
                            utilCustom.hideToaster();
                        } else {
                            vm.loginError = undefined;
                            Session.create(data, login.remember_me);
                            AuthService.serverAuthenticate().then(function(userData) {
                                if (!userData.appName) {
                                    Session.destroy();
                                    $state.go("app.applicationSetting");
                                    utilCustom.toaster($filter('translate')('backend.applicationSettingNot'));
                                    utilCustom.hideToaster();
                                } else {
                                    if (login.username != 'admin') {
                                        userService.isUserAuthentic({ username: login.username, password: login.password }).then(function(response) {
                                            changeStateAfterLogin(userData);
                                            // createSideMenu(userData.role);
                                            utilCustom.hideToaster();
                                        }, function(error) {
                                            if (error.status == "401") {
                                                vm.loginError = "error";
                                                utilCustom.hideToaster();
                                            }
                                            if (error.status == '403' || error.status == '200')
                                            //createSideMenu(userData.role);
                                                changeStateAfterLogin(userData);
                                            utilCustom.hideToaster();
                                        })
                                    } else {
                                        changeStateAfterLogin(userData);
                                        //createSideMenu(userData.role);
                                        utilCustom.hideToaster();
                                    }
                                }




                            });
                        }
                    },
                    function(error) {
                        if (error === null) {
                            utilCustom.toaster($filter('translate')('backend.serverOff'));
                        } else {
                            utilCustom.toaster($filter('translate')('backend.loggingProblem'));
                        }
                    }

                );
            } else {
                $state.go("app.base")
            }




        }

        // function  createSideMenu(userRole) {
        //   if(userRole=='admin'){
        //     AppMenuService.saveItem(['agent','ECM.campaign']);
        //   }
        //
        // }

        function changeStateAfterLogin(userData) {
            if (userData.ciscoType == 0) {
                userData.appName == 'ecm' ? $state.go("app.campaign") : $state.go("app.agent")
            } else {
                $state.go("app.user")
            }

        }
        //////////

    }
})();