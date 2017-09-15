/**
 * Created by mumar on 5/3/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.campaign')
        .factory('CampaignService', ['$resource', '$q', 'Upload', CampaignService]);

    function CampaignService($resource, $q, Upload) {
        var campaigns = $resource(window.appBaseUrl + '/campaign/', { id: '@id' }, {
            getList: {
                method: 'GET',
                url: window.appBaseUrl + "/campaign/index/",
                isArray: true
            },
            fetchCampaigns: {
                method: 'GET',
                url: window.appBaseUrl + "/campaign/fetchCampaigns/",
                isArray: true
            },
            getCsqList: {
                method: 'GET',
                url: window.appBaseUrl + "/queue/getAssignedQueues/",
                isArray: false
            },
            triggerList: {
                method: 'GET',
                url: window.appBaseUrl + "/trigger/getOutBoundTriggers/",
                isArray: false
            },
            save: {
                method: 'POST',
                url: window.appBaseUrl + '/campaign/save',
                params: {
                    name: '@name',
                    csqId: '@csqId',
                    status: '@status',
                    enabled: '@enabled',
                    dialerType: '@dialerType',
                    startTime: '@startTime',
                    endTime: '@endTime',
                    type: '@type',
                    strategyId: '@strategyId',
                    weekDays: '@weekDays',
                    ucceCampaign: '@ucceCampaign',
                    prompts: '@prompts'
                }
            },
            createCampaign: {
                method: 'POST',
                url: window.appBaseUrl + '/campaign/createCampaign',
                params: {
                    name: '@name',
                    csqId: '@csqId',
                    status: '@status',
                    enabled: '@enabled',
                    dialerType: '@dialerType',
                    startTime: '@startTime',
                    endTime: '@endTime',
                    type: '@type',
                    weekDays: '@weekDays',
                    strategyId: '@strategyId',
                    campaignData: '@campaignData',
                    prompts: '@prompts'
                }
            },
            update: {
                method: 'PUT',
                url: window.appBaseUrl + '/campaign/update',
                params: {
                    campaign: '@campaign',
                    id: '@id',
                    enabled: '@enabled'
                }
            },
            campaignUpdateStatus: {
                method: 'PUT',
                url: window.appBaseUrl + '/campaign/campaignUpdateStatus',
                params: {
                    campaignId: '@campaignId',
                    status: '@status'
                }
            },
            editCampaign: {
                method: 'PUT',
                url: window.appBaseUrl + '/campaign/editCampaign',
                params: {
                    id: '@id',
                    name: '@name',
                    csqId: '@csqId',
                    status: '@status',
                    enabled: '@enabled',
                    dialerType: '@dialerType',
                    startTime: '@startTime',
                    endTime: '@endTime',
                    type: '@type',
                    weekDays: '@weekDays',
                    strategyId: '@strategyId',
                    campaignData: '@campaignData',
                    prompts: '@prompts'
                }
            }

            ,
            show: {
                method: 'GET',
                url: window.appBaseUrl + '/campaign/show',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                url: window.appBaseUrl + '/campaign/delete',
                params: {
                    id: '@id'
                }
            }
        })

        return {
            'get_api': campaigns,
            'list': function(params) {
                var defered = $q.defer();
                campaigns.getList(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'fetchCampaigns': function(params) {
                var defered = $q.defer();
                campaigns.fetchCampaigns(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'csqList': function(params) {
                var defered = $q.defer();
                campaigns.getCsqList(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'triggerList': function(params) {
                var defered = $q.defer();
                campaigns.triggerList(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'update': function(params) {
                var defered = $q.defer();
                campaigns.update(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'editCampaign': function(params) {
                var defered = $q.defer();
                campaigns.editCampaign(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'show': function(id) {
                var defered = $q.defer();
                campaigns.show(id, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'createCampaign': function(params) {
                var defered = $q.defer();
                campaigns.createCampaign(params, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'delete': function(id) {
                var defered = $q.defer();
                campaigns.delete(id, function(data) {
                    defered.resolve(data);
                }, function(er) {
                    defered.reject(er);
                });
                return defered.promise;
            },
            'campaignUpdateStatus': function(params) {
                var defered = $q.defer();
                campaigns.campaignUpdateStatus(params, function(data) {
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
            }
        }
    }
})();