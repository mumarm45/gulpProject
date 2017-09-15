/**
 * Created by mumar on 3/9/2016.
 */
(function() {
    'use strict';
    angular
        .module('app.auth')
        .factory('userService', ['$resource', '$rootScope', '$q', userService]);

    function userService($resource, $rootScope, $q) {
        var users = $resource('../user/', { id: '@id' }, {
            update: {
                method: 'PUT',
                url: window.appBaseUrl + '/user/update/',
                params: {
                    id: '@id',
                    fullName: '@fullName',
                    email: '@email',
                    isActive: '@isActive',
                    updatedBy: '@updatedBy',
                    roles: '@roles',
                    password: '@password'
                }

            },

            list: {
                method: 'GET',
                url: window.appBaseUrl + '/user/list/',
                isArray: true
            },
            show: {
                method: 'GET',
                url: window.appBaseUrl + '/user/show/',
                params: {
                    id: '@id'
                }
            },

            delete: {
                method: 'DELETE',
                url: window.appBaseUrl + '/user/delete/'

            },
            save: {
                method: 'POST',
                url: window.appBaseUrl + '/user/save',
                params: {
                    fullName: '@fullName',
                    email: '@email',
                    isActive: '@isActive',
                    roles: '@roles',
                    password: '@password'
                }
            },

            activeAndBlockUser: {
                method: 'POST',
                url: window.appBaseUrl + '/user/activateOrBlockUser/',
                params: {
                    id: '@id',
                    checked: '@checked'
                }
            },

            changePassword: {
                method: 'POST',
                url: window.appBaseUrl + '/user/changePassword/',
                params: {
                    id: '@id',
                    currentPassword: '@oldPassword',
                    newPassword: '@newPassword',
                    confirmPassword: '@confirmPassword'
                }
            },
            resetPassword: {
                method: 'POST',
                url: window.appBaseUrl + '/user/resetPassword/',
                params: {
                    username: '@username',
                    currentpassword: '@currentpassword'
                }
            },
            getRoles: {
                method: 'GET',
                url: window.appBaseUrl + '/role/list/',
                isArray: true
            },
            isUserAuthentic: {
                method: 'GET',
                url: window.appBaseUrl + '/user/isUserAuthentic/',
                params: {
                    username: '@username',
                    password: '@password'
                }
            }



        });
        return {
            'update': function(user) {
                var defered = $q.defer();
                users.update(user, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'list': function(params) {
                var defered = $q.defer();
                users.list(params, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            get_api: users,
            'activeAndBlockUser': function(id) {
                var defered = $q.defer();
                users.activeAndBlockUser(id, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'show': function(id) {
                var defered = $q.defer();
                users.show(id, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'changePassword': function(userData) {
                var defered = $q.defer();
                users.changePassword(userData, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'resetPassword': function(username) {
                var defered = $q.defer();
                users.resetPassword(username, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'delete': function(id) {
                var defered = $q.defer();
                users.delete(id, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'getRoles': function() {
                var defered = $q.defer();
                users.getRoles('', function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            },
            'isUserAuthentic': function(params) {
                var defered = $q.defer();
                users.isUserAuthentic(params, function(response) { defered.resolve(response); },
                    function(error) { defered.reject(error); });
                return defered.promise;
            }
        }
    }

})();