/**
 * Created by mumar on 5/26/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.strategy',[])
    .config(config);

  function config($stateProvider,msNavigationServiceProvider){
    // State
    $stateProvider.state('app.strategy', {
      url      : '/strategy',
      views    : {
        'content@app': {
          templateUrl: 'app/ecm/strategy/list.html',
          controller : 'StrategyController as vm'
        }
      },
      resolve  : {

      }/*,
       bodyClass: 'todo'*/
    });
    // Navigation
    // msNavigationServiceProvider.saveItem('ECM.strategy', {
    //   title : 'Strategies',
    //   icon  : 'icon-school',
    //   state:'app.strategy'
    // });
  }
})();
