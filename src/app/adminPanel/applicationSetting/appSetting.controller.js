(function() {
    'use strict';

    angular
        .module('app.appSetting')
        .controller('ApplicationSettingController', applicationSettingController);

    /** @ngInject */
    function applicationSettingController(applicationSettingService, $q, Session, $state, userService, utilCustom, $filter, msNavigationService, AppMenuService) {
        var vm = this;
        // Data
        vm.saveApplicationSetting = saveApplicationSetting;
        vm.verifyTheNetworkSetting = verifyTheNetworkSetting;
        vm.verifyDatabaseSetting = verifyDatabaseSetting;
        vm.verifyTheUCCXSetting = verifyTheUCCXSetting;


        function init() {
            vm.verifiedNetWorkSetting = false;
            applicationSettingService.getSetting().then(function(applicationSetting) {
                vm.form = applicationSetting;
            }, function(error) {

            })
        }
        init();

        // Methods
        function saveApplicationSetting(applicationSetting) {
            if (applicationSetting.ciscoType == 1) {
                if (!applicationSetting.domain || !applicationSetting.username || !applicationSetting.password || !applicationSetting.machineIp || !applicationSetting.sharedFolder || !applicationSetting.databaseMachineIp || !applicationSetting.databaseName || !applicationSetting.databaseUsername ||
                    !applicationSetting.databasePassword) {
                    utilCustom.toaster($filter('translate')('data.fillMandatoryField'));
                    return;
                }
            }
            if (applicationSetting.ciscoType == 0) {
                if (!applicationSetting.primaryIp || !applicationSetting.primaryUsername || !applicationSetting.primaryPassword) {
                    utilCustom.toaster($filter('translate')('data.fillMandatoryField'));
                    return;
                }
                if (applicationSetting.secondary) {
                    if (!applicationSetting.secondaryIp || !applicationSetting.secondaryUsername || !applicationSetting.secondaryPassword) {
                        utilCustom.toaster($filter('translate')('data.fillMandatoryField'));
                        return;
                    }
                }
            }
            // todo: working on the verifyTheNetworkSetting
            utilCustom.toasterLoading();
            if (vm.form.id) {
                applicationSettingService.get_api.update(applicationSetting,
                    function(data) {
                        $state.go('app.pages_auth_login');
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
                applicationSettingService.get_api.save(applicationSetting,
                    function(data) {
                        $state.go('app.pages_auth_login');
                    },
                    function(error) {
                        if (error === null) {
                            utilCustom.toaster($filter('translate')('backend.serverOff'));
                        } else {
                            utilCustom.toaster($filter('translate')('backend.loggingProblem'));
                        }
                    }

                );
            }





        }

        function verifyTheNetworkSetting(applicationSetting) {
            vm.verifiedNetWorkSetting = false;
            utilCustom.toasterLoading()
            var params = { domain: applicationSetting.domain, username: applicationSetting.username, password: applicationSetting.password, machineIp: applicationSetting.machineIp, sharedFolder: applicationSetting.sharedFolder }
            applicationSettingService.get_api.verifySetting(params, function(data) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = true;
                utilCustom.toaster($filter('translate')('login.correctSettting'));
            }, function(error) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = false;
                utilCustom.toaster(error.data.errorMessage);
            })

        }

        function verifyDatabaseSetting(applicationSetting) {
            utilCustom.toasterLoading();
            var params = { databaseMachineIp: applicationSetting.databaseMachineIp, databaseName: applicationSetting.databaseName, databaseUsername: applicationSetting.databaseUsername, databasePassword: applicationSetting.databasePassword }
            applicationSettingService.get_api.verifyDbSetting(params, function(data) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = true;
                utilCustom.toaster($filter('translate')('login.correctSettting'));
            }, function(error) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = false;
                utilCustom.toaster(error.data.errorMessage);
            })

        }

        function verifyTheUCCXSetting(applicationSetting, type) {
            utilCustom.toasterLoading();
            if (type == 'primary')
                var params = { ip: applicationSetting.primaryIp, username: applicationSetting.primaryUsername, password: applicationSetting.primaryPassword, webBase: applicationSetting.webRequest }
            else
                var params = { ip: applicationSetting.secondaryIp, username: applicationSetting.secondaryUsername, password: applicationSetting.secondaryPassword, webBase: applicationSetting.webRequest }
            applicationSettingService.get_api.verifyTheUCCXSetting(params, function(data) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = true;
                utilCustom.toaster($filter('translate')('login.correctSettting'));
            }, function(error) {
                utilCustom.hideToaster();
                vm.verifiedNetWorkSetting = false;
                utilCustom.toaster(error.data.errorMessage);
            })

        }



        function changeStateAfterLogin() {
            window.applicationEnvironment == 'ecm' ? $state.go("app.campaign") : $state.go("app.agent");
        }
        //////////

    }
})();