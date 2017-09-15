// /**
//  * Created by mumarm45 on 17/02/2017.
//  */
// (function(){
//   'use strict';
//   angular
//     .module('fuse')
//     .factory('applicationSettingService',['$resource','$q','AppMenuService',applicationSettingService]);

//   function applicationSettingService($resource,$q,AppMenuService){
//     var applicationSetting = $resource('../applicationSetting',{id:'@id'},
//       {
//         getSetting:{
//           method:'GET',
//           url:window.appBaseUrl+"/applicationSetting/index/"
//         }
//       })
//     return{
//       getSetting : function(){
//         var defered = $q.defer();
//         applicationSetting.getSetting(function(data){
//           defered.resolve(data);
//         },function(error){
//           defered.reject(error);
//         });
//         return defered.promise;
//       },
//       menuforAdminpanel:function (userRole) {
//         switch(angular.lowercase(userRole)){
//           case 'admin':
//             AppMenuService.saveItems(['agent', 'user','team','application','easyAnnouncement',
//               'queue','prompts','scripts','systemSetting','Todo']);
//             break;
//           case 'supervisor':
//             AppMenuService.saveItems(['agent','application','easyAnnouncement','queue','prompts','scripts','Todo']);
//             break;
//           case 'junior supervisor':
//             AppMenuService.saveItems(['agent','queue']);
//             break;
//           default:
//             AppMenuService.saveItems([]);

//         }
//       },
//       menuforECM:function(ecmApp){
//         switch (Number(ecmApp)){
//           case 1:
//             AppMenuService.saveItems(['ECM.campaign','ECM.dnc','ECM.strategy']);
//             break;
//           case 0:
//             AppMenuService.saveItems(['ECM.campaign','ECM.dnc','ECM.strategy','prompts']);
//         }

//       }

//     }


//   }

// })();
