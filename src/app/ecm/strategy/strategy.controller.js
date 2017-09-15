/**
 * Created by mumar on 5/26/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.strategy')
    .controller('StrategyController',strategyController);
  function strategyController(strategyService,utilCustom,$filter){
    var vm = this;

    //Variables
    vm.init = init;
    vm.strategies=[];
    vm.saveStrategy=saveStrategy;
    vm.deleteStrategy=deleteStrategy;
    vm.create=create;
    vm.selectStrategy=selectStrategy;
    vm.modes=[{id:1,translationV:'strategy.mode.consecutive'},{id:2,translationV:'strategy.mode.alternate'}];
    vm.translationData={
      strategy:$filter('translate')('strategy.strategy'),
      mode:$filter('translate')('strategy.mode.mode'),
      threshold:$filter('translate')('strategy.threshold'),
      ivrPorts:$filter('translate')('strategy.ivrPorts')
    };
    //function
    function init(){
      strategyService.list().then(function(response){
        vm.strategies=response;
        vm.selected = {
          retryContact:false,
          retryMap:[
        {id:1,mode:1,retryDelay:1,name:'strategy.busy',enable:true},
        {id:2,mode:1,retryDelay:1,name:'strategy.noAnswer',enable:true},
        {id:3,mode:1,retryDelay:1,name:'strategy.cAbandoned',enable:true},
        {id:4,mode:1,retryDelay:1,name:'strategy.dAbandoned',enable:true},
        {id:5,mode:1,retryDelay:1,name:'strategy.callback',enable:true},
        {id:6,mode:1,retryDelay:1,name:'strategy.others',enable:true}
        ]
        }
        ;
      },function(error){
        console.log(error);
      });
    }
    init();
    function deleteStrategy(id){
      utilCustom.toasterConfirm().then(function(response) {
        if ( response == 'ok' ||  response) {
          strategyService.delete({id:id}).then(function(response){
            _.remove(vm.strategies,function(strategy){
              return strategy.id==id;
            });
            vm.selected=undefined;
            utilCustom.toaster($filter('translate')('strategy.strategy')+' '+$filter('translate')('data.deleted'));
          },function(error){
            if(error.status=='406'){
              utilCustom.toaster($filter('translate')('strategy.usingInCampaign'));
            }else{
              utilCustom.toaster($filter('translate')('data.deleteError')+' '+$filter('translate')('strategy.strategy'));
            }

          })
        }else{
          utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
        }
      });
    }
    function saveStrategy(strategydData){
      var strategy = angular.copy(strategydData);
      var retryDelayLimit = false;
      if(strategy.retryMap){
        strategy.retryMap.map(function(key_value){
             if(!key_value.retryDelay)
             retryDelayLimit=true;
        });
      }
      if(retryDelayLimit){
        utilCustom.toaster($filter('translate')('strategy.retryDelayLimit'));
        return
      }
      strategy.retryMap= JSON.stringify(strategy.retryMap);
      if(!strategy.name||strategy.primaryPhoneAttempts<0||strategy.secondaryPhoneAttempts<0){
        utilCustom.toaster($filter('translate')('data.fillAllField'));
        return
      }
      if(!strategy.secondaryPhoneAttempts)strategy.secondaryPhoneAttempts=0;
      if( vm.createFormOr=='edit'){
       strategyService.update(strategy).then(
         function(response){
           var indx = findStrategy(response.id);
           if( indx!=-1){
             vm.strategies[indx]=response;
           }
           utilCustom.toaster($filter('translate')('strategy.strategy')+' '+$filter('translate')('data.updated'));
         },
         function(error){
           utilCustom.toaster($filter('translate')('data.updateError')+' '+$filter('translate')('strategy.strategy'));
         });

      }
      else{
        strategyService.get_api.save(strategy,
          function(response){
            vm.strategies.push(response);
            utilCustom.toaster($filter('translate')('strategy.strategy')+' '+$filter('translate')('data.created'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.createError')+' '+$filter('translate')('strategy.strategy'));
          });


      }

    }
    function create(){
      vm.createFormOr=undefined;
      vm.selected = {
        retryContact:false,
        retryMap:[
          {id:1,mode:1,retryDelay:1,name:'strategy.busy',enable:true},
          {id:2,mode:1,retryDelay:1,name:'strategy.noAnswer',enable:true},
          {id:3,mode:1,retryDelay:1,name:'strategy.cAbandoned',enable:true},
          {id:4,mode:1,retryDelay:1,name:'strategy.dAbandoned',enable:true},
          {id:5,mode:1,retryDelay:1,name:'strategy.callback',enable:true},
          {id:6,mode:1,retryDelay:1,name:'strategy.others',enable:true}
        ]
      }


    }
    function selectStrategy(strategyData){
        vm.createForm.$setUntouched();
      vm.createFormOr='edit';
      var strategy =angular.copy(strategyData);
      strategy.retryMap= JSON.parse(strategy.retryMap);
      vm.selected = strategy;
    }
    function findStrategy(id){
      var indx = _.findIndex(vm.strategies,{id:id});
      return indx;
    }
  }
})();
