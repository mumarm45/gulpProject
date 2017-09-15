/**
 * Created by Umar on 12/26/14.
 */
(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('AuthService', AuthService);

    function AuthService(AUTH_EVENTS, $rootScope, $timeout, $http, Session, $q, $state, AppMenuService, applicationSettingService) {
        var hideSideMenu = function() {
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $('.left-side').toggleClass("collapse-left");
            $(".right-side").toggleClass("strech");
            $(".loginHideShow").addClass("hidden");
            $(".signInHideShow").removeClass("hidden");

        };
        var serverAuthentication = function(drawEnable) {
            var defer = $q.defer();
            var username = window.localStorage.username || window.sessionStorage.username;
            if (username) {
                $http({
                        method: 'GET',
                        url: window.appBaseUrl + '/user/isAuthenticate',
                        params: { username: username }
                    }).success(
                        function(data, status, header, config) {

                            if (data.status == "error") {
                                $rootScope.$broadcast(AUTH_EVENTS.tokenExpired);
                                Session.destroy();
                                // $state.go('app.pages_auth_login');
                            } else {
                                Session.update(data);
                                if (drawEnable == 'noDraw') {
                                    defer.resolve(data);
                                } else {
                                    var appSetting = applicationSettingService.createSideMenu(data.role).then(function(appSetting) {
                                        if (appSetting)
                                            data['appName'] = appSetting.applicationName;
                                        data['enableEasyAnnouncement'] = appSetting.enableEasyAnnouncement;
                                        data['ciscoType'] = appSetting.ciscoType;
                                        defer.resolve(data);
                                    });
                                }


                                //defer.resolve(data);
                            }

                        })
                    .error(function(data, status, header, config) {
                        $rootScope.$broadcast(AUTH_EVENTS.tokenExpired);
                        defer.reject(data);

                    });
            } else {
                Session.destroy();
                $timeout(function() {

                    $state.go('app.pages_auth_login');
                }, 0);

                defer.resolve();
            }

            return defer.promise;
        };
        var showSideMenu = function() {
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $(".loginHideShow").removeClass("hidden");
            $(".signInHideShow").addClass("hidden");
        };
        var createSideMenu = function(userRole) {
            var deffer = $q.defer();
            AppMenuService.deleteAll();
            applicationSettingService.getSetting().then(function(response) {
                switch (angular.lowercase(response.applicationName)) {
                    case 'adminpanel':
                        applicationSettingService.menuforAdminpanel(userRole, response.enableEasyAnnouncement);
                        window.applicationEnvironment = 'adminpanel';
                        break;
                    case 'ecm':
                        applicationSettingService.menuforECM(response.ciscoType);
                        window.applicationEnvironment = 'ecm';
                        break;
                    case 'both':
                        applicationSettingService.menuforAdminpanel(userRole, response.enableEasyAnnouncement);
                        if (userRole.toLowerCase() != 'junior supervisor'.toLowerCase())
                            applicationSettingService.menuforECM(response.ciscoType);
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

        };
        return {
            signIn: function(credentials) {
                var deffer = $q.defer();
                $http({
                    method: 'POST',
                    url: window.appBaseUrl + '/auth/signIn',
                    params: { username: credentials.username, password: credentials.password }
                }).success(function(data, status, header, config) {

                    deffer.resolve(data);
                }).error(function(data, status, header, config) {
                    deffer.reject(data);
                });
                return deffer.promise;
            },
            signOut: function() {
                var username = window.localStorage.getItem("username") || window.sessionStorage.getItem("username");
                return $http({
                    method: "POST",
                    url: window.appBaseUrl + '/auth/signOut',
                    params: { username: username }
                }).success(function(data, status, header, config) {
                    hideSideMenu();
                    Session.destroy();
                    $state.go('app.pages_auth_login');
                    AppMenuService.deleteAll();
                    window.localStorage.removeItem('currentTeam');
                }).error(function(data, status, header, config) {
                    $state.go('app.pages_auth_login');
                })
            },
            isAuthenticate: function() {
                var username = window.localStorage.username || window.sessionStorage.username;
                return !!username;
            },
            serverAuthenticate: serverAuthentication,
            createSideMenu: createSideMenu,
            showSideMenu: showSideMenu,
            hideSideMenu: hideSideMenu



        }
    }
})();