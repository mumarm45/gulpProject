/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.dnc')
    .factory('DncService',['$resource','$q','Upload',DncService]);

  function DncService($resource,$q,Upload){
      var dncs = $resource(window.appBaseUrl+'/contact/',{id:'@id'} , {
        getList:{
          method:'GET',
          url:window.appBaseUrl+"/contact/index/",
          isArray:true
        },

        save:{
          method:'POST',
          url:window.appBaseUrl+'/contact/save',params:{
            updateById:'@updateById',
            name:'@name',
            primaryNumber:'@primaryNumber',
            secondaryNumber:'@secondaryNumber'
          }
        },
        update:{
          method:'PUT',
          url:window.appBaseUrl+'/contact/update',params:{
            id:'@id'
          }
        }
        ,show:{
          method:'GET',
          url:window.appBaseUrl+'/contact/show',params:{
            id:'@id'
          }
        }
        ,delete:{
          method:'DELETE',
          url:window.appBaseUrl+'/contact/delete',params:{
            id:'@id'
          }
        }
      })

    return {
      'get_api':dncs,
      'list':function(params){
        var defered = $q.defer();
        dncs.getList(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },

      'update':function(params){
        var defered = $q.defer();
        dncs.update(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'show':function(id){
        var defered = $q.defer();
        dncs.show(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'delete':function(id){
        var defered = $q.defer();
        dncs.delete(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'updateCsvFile':function(params){
        var up =  Upload.upload({
          url:window.appBaseUrl+"/contact/uploadCsv",
          data: params
        });

        return up;
      }
    }
  }
})();
