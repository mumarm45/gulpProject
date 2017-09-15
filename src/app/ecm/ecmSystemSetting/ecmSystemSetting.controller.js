/**
 * Created by mumar on 4/26/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.ecmSystemSetting')
    .controller('ecmSystemSettingController',ecmSystemSettingController);

  function ecmSystemSettingController($state,$scope){
    var vm = this;

    function iniIt(){

        $state.go("app.ecmSystemSetting.ecmPreferenceSetting");



    }

    $scope.$on('$stateChangeSuccess', function ()
    {
     vm.currentState = $state.current.name.split('.');
      vm.currentState = vm.currentState[ vm.currentState.length-1];
    });
    if(window.userRole=='admin'){
      vm.authorizationRequires=false;
      iniIt();

    }else{
      vm.authorizationRequires=true;
    }

  }


})();
