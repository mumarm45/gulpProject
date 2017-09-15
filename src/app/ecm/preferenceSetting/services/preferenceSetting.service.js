/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.ecmPreferenceSetting')
    .factory('EcmPreferenceSettingService',['$resource','$q','Upload',EcmPreferenceSettingService]);

  function EcmPreferenceSettingService($resource,$q,Upload){
      var preferenceSettings = $resource(window.appBaseUrl+'/preferenceSettings/',{id:'@id'} , {
        getList:{
          method:'GET',
          url:window.appBaseUrl+"/preferenceSettings/index/",
          isArray:false
        },

        save:{
          method:'POST',
          url:window.appBaseUrl+'/preferenceSettings/save',params:{
            fileArchivePath:'@fileArchivePath',
            filePath:'@filePath',
            username:'@primaryNumber',
            password:'@password',
            domain:'@domain'
          }
        },
        update:{
          method:'PUT',
          url:window.appBaseUrl+'/preferenceSettings/update',params:{
            id:'@id',
            fileArchivePath:'@fileArchivePath',
            filePath:'@filePath',
            username:'@primaryNumber',
            password:'@password',
            domain:'@domain'
          }
        }
        ,show:{
          method:'GET',
          url:window.appBaseUrl+'/preferenceSettings/show',params:{
            id:'@id'
          }
        }
        ,delete:{
          method:'DELETE',
          url:window.appBaseUrl+'/preferenceSettings/delete',params:{
            id:'@id'
          }
        }
      })

    return {
      'get_api':preferenceSettings,
      'list':function(params){
        var defered = $q.defer();
        preferenceSettings.getList(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },

      'update':function(params){
        var defered = $q.defer();
        preferenceSettings.update(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'show':function(id){
        var defered = $q.defer();
        preferenceSettings.show(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'delete':function(id){
        var defered = $q.defer();
        preferenceSettings.delete(id,function(data){
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
