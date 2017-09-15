/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.dnc',['ngFileUpload'])
    .config(config);

  function config($stateProvider, msNavigationServiceProvider,$translatePartialLoaderProvider){
    // State
    $stateProvider.state('app.dnc', {
      url      : '/dnc',
      views    : {
        'content@app': {
          templateUrl: 'app/ecm/dnc/list.html',
          controller : 'DncController as vm'
        }
      },
      resolve  : {

      }/*,
       bodyClass: 'todo'*/
    });
    // Navigation
    // msNavigationServiceProvider.saveItem('ECM.dnc', {
    //   title : 'DNC List',
    //   icon  : 'icon-account-multiple',
    //   state:'app.dnc'
    // });
  }

})();
