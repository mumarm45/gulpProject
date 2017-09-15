/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.generalSetting',['ngFileUpload'])
    .config(config);

  function config($stateProvider, msNavigationServiceProvider){
    // State
    $stateProvider.state('app.systemSetting.generalSetting', {
      url      : '/generalSetting',
      views    : {
        'system': {
          templateUrl: 'app/ecm/generalSetting/form.html',
          controller : 'GeneralSettingController as vm'
        }
      },
      resolve  : {

      }/*,
       bodyClass: 'todo'*/
    });
    // Navigation
    /*msNavigationServiceProvider.saveItem('generalSetting', {
      title : 'Preference Setting',
      icon  : 'icon-headset',
      state:'app.systemSetting.generalSetting'
    });*/
  }

})();
