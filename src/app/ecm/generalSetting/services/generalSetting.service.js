/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.generalSetting')
    .factory('GeneralSettingService',['$resource','$q','Upload',GeneralSettingService]);

  function GeneralSettingService($resource,$q,Upload){
      var generalSettings = $resource(window.appBaseUrl+'/generalSettings/',{id:'@id'} , {
        getList:{
          method:'GET',
          url:window.appBaseUrl+"/generalSettings/index/",
          isArray:false
        },

        save:{
          method:'POST',
          url:window.appBaseUrl+'/generalSettings/save',params:{
            fileArchivePath:'@fileArchivePath',
            filePath:'@filePath',
            username:'@primaryNumber',
            password:'@password',
            domain:'@domain'
          }
        },
        update:{
          method:'PUT',
          url:window.appBaseUrl+'/generalSettings/update',params:{
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
          url:window.appBaseUrl+'/generalSettings/show',params:{
            id:'@id'
          }
        }
        ,delete:{
          method:'DELETE',
          url:window.appBaseUrl+'/generalSettings/delete',params:{
            id:'@id'
          }
        }
      })

    return {
      'get_api':generalSettings,
      'list':function(params){
        var defered = $q.defer();
        generalSettings.getList(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },

      'update':function(params){
        var defered = $q.defer();
        generalSettings.update(params,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'show':function(id){
        var defered = $q.defer();
        generalSettings.show(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      },
      'delete':function(id){
        var defered = $q.defer();
        generalSettings.delete(id,function(data){
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
