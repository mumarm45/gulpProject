/**
 * Created by mumar on 5/26/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.strategy')
    .factory('strategyService',['$resource','$q',strategyService]);
  function strategyService($resource,$q){
    var strategies = $resource(window.appBaseUrl+'/callStrategy/',{id:'@id'} , {
      getList:{
        method:'GET',
        url:window.appBaseUrl+"/callStrategy/index/",
        isArray:true
      },
      save:{
        method:'POST',
        url:window.appBaseUrl+'/callStrategy/save',params:{
          name:'@name',
          retryMap:'@retryMap',
          retryContact:'@retryContact',
          primaryPhoneAttempts:'@primaryPhoneAttempts',
          secondaryPhoneAttempts:'@secondaryPhoneAttempts'
        }
      },
      update:{
        method:'PUT',
        url:window.appBaseUrl+'/callStrategy/update',params:{
          name:'@name',
          retryMap:'@retryMap',
          retryContact:'@retryContact',
          primaryPhoneAttempts:'@primaryPhoneAttempts',
          secondaryPhoneAttempts:'@secondaryPhoneAttempts',
          id:'@id'
        }
      }
      ,show:{
        method:'GET',
        url:window.appBaseUrl+'/callStrategy/show',params:{
          id:'@id'
        }
      }
      ,delete:{
        method:'DELETE',
        url:window.appBaseUrl+'/callStrategy/delete',params:{
          id:'@id'
        }
      }
    })

    return {
      'get_api':strategies,
      'list':function(params){
        var defered = $q.defer();
        strategies.getList(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'update':function(params){
        var defered = $q.defer();
        strategies.update(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'show':function(id){
        var defered = $q.defer();
        strategies.show(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'delete':function(id){
        var defered = $q.defer();
        strategies.delete(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      }
    }
  }
})();
