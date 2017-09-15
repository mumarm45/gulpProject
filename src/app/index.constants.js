(function ()
{
    'use strict';

    angular
        .module('fuse')
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
  tokenExpired:'token-expired'


})
})();
