/**
 * Created by mumar on 4/6/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.campaign')
    .controller('CsvUploadPicController',CsvUploadPicController);

  function CsvUploadPicController(utilCustom,DncService,$mdDialog,$filter, $http){

    var vm =this;
    vm.closeDialog =closeDialog;
    vm.saveDncPic = saveDncPic;
    vm.sampleCsv = window.appBaseUrl+'/Sample.csv';





    function  closeDialog(){
      $mdDialog.hide();
    }

    function  saveDncPic(Uploaddnc){
      if(!isWaveFile(Uploaddnc.file.name)){
        utilCustom.toaster($filter('translate')('dnc.csvFormat'));
        vm.fileFormate = true;
      }else{
        vm.fileFormate = false;
        var params = {file:Uploaddnc.file};
        utilCustom.toasterLoading();
        DncService.updateCsvFile(params).then(function(response){
          utilCustom.toaster($filter('translate')('dnc.csvUploaded'));
          $mdDialog.hide(response.data.contacts);
        },function(error){
          utilCustom.toaster($filter('translate')('dnc.csvUploadError'));
        // console.log(error);
        });
      }
    }

    function getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    }
    function isWaveFile(filename) {
      var ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'csv':
          return true;
      }
      return false;
    }
  }
})();
