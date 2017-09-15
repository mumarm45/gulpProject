/**
 * Created by mumar on 5/3/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.campaign')
        .factory('CallbackService', ['$resource', '$q', 'Upload', CallbackService]);

    function CallbackService($resource, $q, Upload) {
        var campaignId;

        var callback = $resource(window.appBaseUrl + '/callback/', { id: '@id' }, {
            getList: {
                method: 'GET',
                url: window.appBaseUrl + "/callback/getList/",
                isArray: false
            }
        })

        return {
            'get_api': callback,
            'list': function(params) {
                var defered = $q.defer();
                callback.getList(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'uploadBulkCaller': function(params) {
                return Upload.upload({
                    url: window.appBaseUrl + "/callback/uploadBulkCaller",
                    data: params
                });
            },
            'setCampaignId': function(id) {
                campaignId = id;
            },
            'getCampaignId': function() {
                return campaignId;
            }
        }
    }
})();