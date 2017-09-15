/**
 * Created by mumar on 3/14/2016.
 */
(function(){
  'use strict';

  angular
    .module('app.core')
    .controller('ToastCtrl',ToastCtrl);

  function ToastCtrl($mdToast){
    var vm=this;

    vm.close=close;
    vm.ok=ok;

    function ok(){
      $mdToast.hide('ok');
    }
    function close(){
      $mdToast.hide('close');
    }




  }

})();
