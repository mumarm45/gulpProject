/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.generalSetting')
    .controller('GeneralSettingController',generalSettingController);

  function generalSettingController(utilCustom,GeneralSettingService,$filter,$rootScope,$mdDialog,$document){
    var vm = this;
    //Declare Variables
    vm.init = init;
    vm.saveGeneralSetting=saveGeneralSetting;

    vm.deleteGeneralSetting = deleteGeneralSetting;

    vm.generalSettings=[];
    vm.hidden = false;
    vm.isOpen = false;
    vm.hover = true;
    vm.createFormOr='undefined';
    $rootScope._user?vm.updateById = $rootScope._user.id: vm.updateById = 1;


    //Methods
     function init(){
      GeneralSettingService.list({}).then(function(response){
        vm.generalSetting=response;
        vm.selected=vm.generalSetting;
        if(response.filePath)
        vm.createFormOr='edit';

      },function(error){
        console.log(error);
      })
    }


    init();



    function saveGeneralSetting(generalSettingData){
      var generalSetting = angular.copy(generalSettingData);

      if( vm.createFormOr=='edit'){
        GeneralSettingService.update(generalSetting).then(
          function(response){
            var indx = findGeneralSetting(response.id);
            if( indx!=-1){
              vm.generalSettings[indx]=response;
            }
            utilCustom.toaster($filter('translate')('generalSetting.generalSetting')+' '+$filter('translate')('data.updated'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.updateError')+' '+$filter('translate')('generalSetting.generalSetting'));
          });

      }
     else{
        GeneralSettingService.get_api.save(generalSetting,
          function(response){
            vm.generalSettings.push(response);
            utilCustom.toaster($filter('translate')('generalSetting.generalSetting')+' '+$filter('translate')('data.created'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.createError')+' '+$filter('translate')('generalSetting.generalSetting'));
          });

      }

    }
    function deleteGeneralSetting(generalSettingId){
      utilCustom.toasterConfirm().then(function(response) {
        if ( response == 'ok' ||  response) {
          GeneralSettingService.delete({id:generalSettingId}).then(function(response){
            _.remove(vm.generalSettings,function(generalSetting){
              return generalSetting.id==generalSettingId;
            });
            vm.selected=undefined;
            utilCustom.toaster($filter('translate')('generalSetting.generalSetting')+' '+$filter('translate')('data.deleted'));
          },function(error){
            utilCustom.toaster($filter('translate')('data.deleteError')+' '+$filter('translate')('generalSetting.generalSetting'));
          })
        }else{
          utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
        }
      });

    }
    function findGeneralSetting(generalSettingId){
      var indx = _.findIndex(vm.generalSettings,{id:generalSettingId});
      return indx;
    }


  }

})();
