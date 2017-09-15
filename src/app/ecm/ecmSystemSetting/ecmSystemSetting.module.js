/**
 * Created by mumar on 3/31/2016.
 */
(function ()
{
  'use strict';

  angular
    .module('app.ecmSystemSetting', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider,msNavigationServiceProvider){
    // State
    $stateProvider.state('app.ecmSystemSetting', {
      url      : '/ecmSystemSetting',
      views    : {
        'content@app': {
          templateUrl: 'app/ecm/ecmSystemSetting/ecmSystemSetting.html',
          controller:'ecmSystemSettingController as vm'
        }
      },
      resolve: {

      }

    });


    // Navigation
    // msNavigationServiceProvider.saveItem('ECM.systemSetting', {
    //   title : 'System Settings',
    //   icon  : 'icon-cog',
    //   state : 'app.ecmSystemSetting',
    //   weight: 1
    // });

  }
})();
