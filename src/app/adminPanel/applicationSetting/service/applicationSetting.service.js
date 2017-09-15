/**
 * Created by mumarm45 on 17/02/2017.
 */
(function() {
    'use strict';
    angular
        .module('app.appSetting')
        .factory('applicationSettingService', ['$resource', '$q', 'AppMenuService', '$rootScope', applicationSettingService]);

    function applicationSettingService($resource, $q, AppMenuService, $rootScope) {
        var applicationSetting = $resource('../applicationSetting', { id: '@id' }, {
            getSetting: {
                method: 'GET',
                url: window.appBaseUrl + "/applicationSetting/index/"
            },
            save: {
                method: 'POST',
                params: {
                    applicationName: '@applicationName',
                    ciscoType: '@ciscoType',
                    enableEasyAnnouncement: '@enableEasyAnnouncement',
                    domain: '@domain',
                    primaryIp: '@primaryIp',
                    primaryUsername: '@primaryUsername',
                    primaryPassword: '@primaryPassword',
                    secondaryIp: '@secondaryIp',
                    secondaryUsername: '@secondaryUsername',
                    secondaryPassword: '@secondaryPassword',
                    username: '@username',
                    password: '@password',
                    machineIp: '@machineIp',
                    sharedFolder: '@sharedFolder',
                    webRequest: '@webRequest'
                },
                url: window.appBaseUrl + "/applicationSetting/save/"
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id',
                    applicationName: '@applicationName',
                    ciscoType: '@ciscoType',
                    enableEasyAnnouncement: '@enableEasyAnnouncement',
                    domain: '@domain',
                    primaryIp: '@primaryIp',
                    primaryUsername: '@primaryUsername',
                    primaryPassword: '@primaryPassword',
                    secondaryIp: '@secondaryIp',
                    secondaryUsername: '@secondaryUsername',
                    secondaryPassword: '@secondaryPassword',
                    username: '@username',
                    password: '@password',
                    machineIp: '@machineIp',
                    sharedFolder: '@sharedFolder',
                    webRequest: '@webRequest'
                },
                url: window.appBaseUrl + "/applicationSetting/update/"
            },
            verifySetting: {
                method: 'GET',
                params: {
                    domain: '@domain',
                    username: '@username',
                    password: '@password',
                    machineIp: '@machineIp',
                    sharedFolder: '@sharedFolder'
                },
                url: window.appBaseUrl + "/applicationSetting/verifyTheNetworkSetting/"
            },
            verifyDbSetting: {
                method: 'GET',
                params: {
                    databaseMachineIp: '@databaseMachineIp',
                    databaseName: '@databaseName',
                    databaseUsername: '@databaseUsername',
                    databasePassword: '@databasePassword'
                },
                url: window.appBaseUrl + "/applicationSetting/verifyTheDatabaseSetting/"
            },
            verifyTheUCCXSetting: {
                method: 'GET',
                params: {
                    username: '@username',
                    ip: '@ip',
                    password: '@password',
                    webBase: '@webBase'
                },
                url: window.appBaseUrl + "/applicationSetting/verifyTheUCCXSetting/"
            }
        })
        var menuforAdminpanel = function(userRole, data) {
            var arrayData = []
                // console.log(userRole);
            switch (angular.lowercase(userRole)) {
                case 'admin':
                    arrayData = [
                        'prompts', 'Todo', 'systemSetting'
                    ];
                    arrayData = checkEnableEasyAnnouncement(data.enableEasyAnnouncement, arrayData);
                    arrayData = checkCiscoType(data.ciscoType, userRole, arrayData);
                    AppMenuService.saveItems(arrayData);
                    break;
                case 'supervisor':
                    arrayData = ['prompts', 'Todo'];
                    arrayData = checkEnableEasyAnnouncement(data.enableEasyAnnouncement, arrayData);
                    arrayData = checkCiscoType(data.ciscoType, userRole, arrayData);
                    AppMenuService.saveItems(arrayData);
                    break;
                case 'junior supervisor':
                    arrayData = ['agent', 'queue'];
                    if (data.ciscoType == 0)
                        AppMenuService.saveItems(arrayData);
                    break;
                default:
                    AppMenuService.saveItems([]);

            }
            return arrayData;
        }

        var menuforECM = function(ecmApp) {
            var arrayData = [];
            switch (Number(ecmApp)) {
                case 1:
                    arrayData = ['ECM.campaign', 'ECM.dnc', 'ECM.strategy', 'ECM.systemSetting'];
                    AppMenuService.saveItems(arrayData);
                    break;
                case 0:
                    arrayData = ['ECM.campaign', 'ECM.dnc', 'ECM.strategy', 'ECM.systemSetting', 'prompts'];
                    AppMenuService.saveItems(arrayData);
            }

            return arrayData;

        }
        var createSideMenu = function(userRole) {
            var deffer = $q.defer();
            // AppMenuService.deleteAll();
            var sideMenuList = [];
            getSetting().then(function(response) {
                $rootScope['applicationSetting'] = response;
                switch (angular.lowercase(response.applicationName)) {
                    case 'adminpanel':
                        sideMenuList = menuforAdminpanel(userRole, response);
                        window.applicationEnvironment = 'adminpanel';
                        break;
                    case 'ecm':
                        sideMenuList = menuforECM(response.ciscoType);
                        window.applicationEnvironment = 'ecm';
                        break;
                    case 'both':
                        sideMenuList = menuforAdminpanel(userRole, response);
                        if (userRole.toLowerCase() != 'junior supervisor'.toLowerCase()) {
                            menuforECM(response.ciscoType);
                        }
                        window.applicationEnvironment = 'both';
                        break;
                    default:
                        AppMenuService.deleteAll();

                }

                deffer.resolve(response)


            }, function(error) {
                applicationSettingService.menuforAdminpanel(userRole, 1);
                deffer.reject(error)
            })

            return deffer.promise;

        }
        var checkCiscoType = function(ciscoType, userRole, arrayData) {
            var ar = ['agent', 'application', 'queue'];
            if (ciscoType == 0) {
                arrayData.push("agent");
                arrayData.push("application");
                arrayData.push("queue");
                arrayData.push("scripts");
                if (userRole == "admin") {
                    arrayData.push("user");
                    arrayData.push("team");
                    arrayData.push("systemSetting");
                }
            } else {
                arrayData.push("user");
            }

            return arrayData;

        }
        var checkEnableEasyAnnouncement = function(enableEasyAnnouncement, arrayData) {

            if (enableEasyAnnouncement == 1) {
                arrayData.push('easyAnnouncement')
            } else if (enableEasyAnnouncement == 0) {
                arrayData.push('businessCalendar.businessCalendar')
                arrayData.push('businessCalendar.holidayProfile')
            } else {
                arrayData.push('businessCalendar.businessCalendar')
                arrayData.push('businessCalendar.holidayProfile')
                arrayData.push('easyAnnouncement')

            }
            $rootScope['sideMenuList'] = arrayData;
            return arrayData

        }
        var getSetting = function() {
            var defered = $q.defer();
            applicationSetting.getSetting(function(data) {
                defered.resolve(data);
                $rootScope.applicationSetting = data;
            }, function(error) {
                defered.reject(error);
            });
            return defered.promise;
        }


        return {
            getSetting: getSetting,
            get_api: applicationSetting,
            createSideMenu: createSideMenu,
            menuforAdminpanel: menuforAdminpanel,
            menuforECM: menuforECM,
            checkEnableEasyAnnouncement: checkEnableEasyAnnouncement



        }


    }

})();