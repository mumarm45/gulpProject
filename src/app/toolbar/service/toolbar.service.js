/**
 * Created by mumar on 3/3/2016.
 */
(function(){

  'use strict';

  angular
    .module('app.toolbar')
    .factory('toolBarService',['$resource','$q',toolBarService]);
  function toolBarService($resource,$q){
    var agents = $resource('../agent/',{id:'@id'},
      {
       getAgentTeam:{
          method:'GET',
          url:window.appBaseUrl+'/agent/getAgentTeam',params:{
            id:'@id'
          }
          ,isArray:true
        }
      });
    return{
      'getAgentTeam':function(id){
        var defered = $q.defer();
        agents.getAgentTeam(id,function(data){
          defered.resolve(data);
        },function(er){
          defered.reject(er);
        });
        return defered.promise;
      }
    }

  }




})();
