/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.campaign')
    .factory('PromptKeyService',['$resource','$q',PromptKeyService]);

  function PromptKeyService($resource,$q){
      var campaigns = $resource(window.appBaseUrl+'/promptKey/',{id:'@id'} , {
        getList:{
          method:'GET',
          url:window.appBaseUrl+"/promptKey/index/",
          isArray:true
        },
        save:{
          method:'POST',
          url:window.appBaseUrl+'/promptKey/save',params:{
            name:'@name'
          }
        },
        update:{
          method:'PUT',
          url:window.appBaseUrl+'/promptKey/update',params:{
            campaign:'@name',
            id:'@id',
          }
        },
        show:{
          method:'GET',
          url:window.appBaseUrl+'/promptKey/show',params:{
            id:'@id'
          }
        }
        ,delete:{
          method:'DELETE',
          url:window.appBaseUrl+'/promptKey/delete',params:{
            id:'@id'
          }
        }
      })

    return {
      'get_api':campaigns,
      'list':function(params){
        var defered = $q.defer();
        campaigns.getList(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'update':function(params){
        var defered = $q.defer();
        campaigns.update(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'save':function(params){
        var defered = $q.defer();
        campaigns.save(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'delete':function(id){
        var defered = $q.defer();
        campaigns.delete(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      }
    }
  }
})();
