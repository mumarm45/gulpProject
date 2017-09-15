/**
 * Created by Umar on 12/26/14.
 */
(function() {
    'use strict';
    angular.module('app.auth')
        .factory('AuthInterceptor', AuthInterceptor)
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized',
            notFound: 'auth-not-found',
            internalError: 'auth-internal-error',
            permissionDenied: 'permission-denied',
            tokenExpired: 'token-expired',
            serverOff: 'server-off',
            ccxNotResponding: 'ccx-not-responding'


        });

    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
                if (response.status === 401) {
                    if (response.data == "Permission Denied") {
                        $rootScope.$broadcast(AUTH_EVENTS.permissionDenied,
                            response);
                    } else if (response.data.status == "token_error") {
                        $rootScope.$broadcast(AUTH_EVENTS.tokenExpired,
                            response);
                    } else {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized,
                            response);
                    }

                }
                if (response.status === 401) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
                        response);
                }
                if (response.status === 408) {
                    $rootScope.$broadcast(AUTH_EVENTS.ccxNotResponding,
                        response);
                }
                if (response.status === -1 && response.data === null) {
                    $rootScope.$broadcast(AUTH_EVENTS.serverOff,
                        response);
                }
                if (response.status === 503) {
                    $rootScope.$broadcast(AUTH_EVENTS.ccxNotResponding,
                        response);
                }
                /* if (response.status === 404) {
                   $rootScope.$broadcast(AUTH_EVENTS.notFound,
                     response);
                 }
                 if (response.status === 419 || response.status === 440) {
                   $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,
                     response);
                 }
                 if (response.status === 306) {
                   $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,
                     response);
                 }
                 if (response.status === 500) {
                   $rootScope.$broadcast(AUTH_EVENTS.internalError,
                     response);
                 }*/
                return $q.reject(response);
            }
        }
    };
})();
