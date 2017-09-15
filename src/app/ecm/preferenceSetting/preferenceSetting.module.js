/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.ecmPreferenceSetting',['ngFileUpload'])
    .config(config);

  function config($stateProvider, msNavigationServiceProvider){
    // State
    $stateProvider.state('app.ecmSystemSetting.ecmPreferenceSetting', {
      url      : '/ecmPreferenceSetting',
      views    : {
        'system': {
          templateUrl: 'app/ecm/preferenceSetting/form.html',
          controller : 'EcmPreferenceSettingController as vm'
        }
      },
      resolve  : {

      }/*,
       bodyClass: 'todo'*/
    });
    // Navigation
    /*msNavigationServiceProvider.saveItem('preferenceSetting', {
      title : 'Preference Setting',
      icon  : 'icon-headset',
      state:'app.systemSetting.preferenceSetting'
    });*/
  }

})();
