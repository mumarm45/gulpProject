/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.ecmPreferenceSetting')
    .controller('EcmPreferenceSettingController',EcmPreferenceSettingController);

  function EcmPreferenceSettingController(utilCustom,EcmPreferenceSettingService,$filter,$rootScope,$mdDialog,$document){
    var vm = this;
    //Declare Variables
    vm.init = init;
    vm.savePreferenceSetting=savePreferenceSetting;

    vm.deletePreferenceSetting = deletePreferenceSetting;

    vm.preferenceSettings=[];
    vm.hidden = false;
    vm.isOpen = false;
    vm.hover = true;
    vm.createFormOr='undefined';
   // vm.myCallback=myCallback;
    $rootScope._user?vm.updateById = $rootScope._user.id: vm.updateById = 1;
     vm.selected={services:[],numberOfOccurrences:0,numberOfDays:0};

    //Methods
     function init(){
       vm.selected={services:[],numberOfOccurrences:0,numberOfDays:0};
       checkApplicationEnvirnoment();
      EcmPreferenceSettingService.list({}).then(function(response){
        vm.preferenceSetting=response;
        vm.selected=vm.preferenceSetting;
        //conditional statement
        vm.selected.services?vm.selected.services = vm.selected.services.split(","):vm.selected.services = [];
        if(response.filePath)
        vm.createFormOr='edit';

      },function(error){
        console.log(error);
      })
    }


    init();

    function checkApplicationEnvirnoment(){
      switch (window.applicationEnvironment){
        case 'ecm':{vm.onlyEcm=true; vm.onlyAdminPanel=false;break;}
        case 'adminpanel':{vm.onlyAdminPanel=true; vm.onlyEcm=false;break;}
        default: {vm.onlyAdminPanel=true; vm.onlyEcm=true;}
      }


     /* if(window.applicationEnvironment=='ecm'){
        vm.onlyEcm=true; vm.onlyAdminPanel=false;
      }else if(window.applicationEnvironment=='adminpanel'){
       vm.onlyAdminPanel=true; vm.onlyEcm=false;
      }else{
        vm.onlyAdminPanel=true; vm.onlyEcm=true;
      }*/
    }


    function savePreferenceSetting(preferenceSettingData){
      var preferenceSetting = angular.copy(preferenceSettingData);

      if( vm.createFormOr=='edit'){
        EcmPreferenceSettingService.update(preferenceSetting).then(
          function(response){
            var indx = findPreferenceSetting(response.id);
            if( indx!=-1){
              vm.preferenceSettings[indx]=response;
            }
            utilCustom.toaster($filter('translate')('preferenceSetting.preferenceSetting')+' '+$filter('translate')('data.updated'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.updateError')+' '+$filter('translate')('preferenceSetting.preferenceSetting'));
          });

      }
     else{
        EcmPreferenceSettingService.get_api.save(preferenceSetting,
          function(response){
            vm.preferenceSettings.push(response);
            utilCustom.toaster($filter('translate')('preferenceSetting.preferenceSetting')+' '+$filter('translate')('data.created'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.createError')+' '+$filter('translate')('preferenceSetting.preferenceSetting'));
          });

      }

    }
    function deletePreferenceSetting(preferenceSettingId){
      utilCustom.toasterConfirm().then(function(response) {
        if ( response == 'ok' ||  response) {
          EcmPreferenceSettingService.delete({id:preferenceSettingId}).then(function(response){
            _.remove(vm.preferenceSettings,function(preferenceSetting){
              return preferenceSetting.id==preferenceSettingId;
            });
            vm.selected=undefined;
            utilCustom.toaster($filter('translate')('preferenceSetting.preferenceSetting')+' '+$filter('translate')('data.deleted'));
          },function(error){
            utilCustom.toaster($filter('translate')('data.deleteError')+' '+$filter('translate')('preferenceSetting.preferenceSetting'));
          })
        }else{
          utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
        }
      });

    }
    function findPreferenceSetting(preferenceSettingId){
      var indx = _.findIndex(vm.preferenceSettings,{id:preferenceSettingId});
      return indx;
    }


  }

})();
