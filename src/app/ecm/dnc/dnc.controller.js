/**
 * Created by mumar on 5/3/2016.
 */
(function(){
  'use strict';
  angular
    .module('app.dnc')
    .controller('DncController',DncController);

  function DncController(utilCustom,DncService,$filter,$rootScope,$mdDialog,$document){
    var vm = this;
    //Declare Variables
    vm.init = init;
    vm.saveDnc=saveDnc;
    vm.updateDnc=updateDnc;
    vm.selectDnc=selectDnc;
    vm.create=create;
    vm.deleteDnc = deleteDnc;
    vm.dialogShowDetail=dialogShowDetail;
    vm.dncs=[];
    vm.hidden = false;
    vm.isOpen = false;
    vm.hover = true;
    $rootScope._user?vm.updateById = $rootScope._user.id: vm.updateById = 1;


    //Methods
     function init(){
      DncService.list({}).then(function(response){
        vm.dncs=response;
        vm.selected = {updateById:vm.updateById};

      },function(error){
        console.log(error);
      })
    }
    function create(){
      vm.createFormOr=undefined;
      vm.selected = {updateById:vm.updateById};

    }
    init();

    function selectDnc(dnc){
      vm.selected = angular.copy(dnc);
      vm.createFormOr='edit';
    }
    function updateDnc(){}
    function saveDnc(dncData){
      if(!dncData.primaryNumber){
        utilCustom.toaster($filter('translate')('dnc.numberNotNull'));
        return;
      }
      var dnc = angular.copy(dncData);
      if( vm.createFormOr=='edit'){
        DncService.update(dnc).then(
          function(response){
            var indx = findDnc(response.id);
            if( indx!=-1){
              vm.dncs[indx]=response;
            }
            utilCustom.toaster($filter('translate')('dnc.dnc')+' '+$filter('translate')('data.updated'));
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.updateError')+' '+$filter('translate')('dnc.dnc'));
          });

      }
     else{
        DncService.get_api.save(dnc,
          function(response){
            vm.dncs.push(response);
            utilCustom.toaster($filter('translate')('dnc.dnc')+' '+$filter('translate')('data.created'));
            selectDnc(response)
          },
          function(error){
            utilCustom.toaster($filter('translate')('data.createError')+' '+$filter('translate')('dnc.dnc'));
          });

      }

    }
    function deleteDnc(dncId){
      utilCustom.toasterConfirm().then(function(response) {
        if ( response == 'ok' ||  response) {
          DncService.delete({id:dncId}).then(function(response){
            _.remove(vm.dncs,function(dnc){
              return dnc.id==dncId;
            });
            vm.selected=undefined;
            utilCustom.toaster($filter('translate')('dnc.dnc')+' '+$filter('translate')('data.deleted'));
          },function(error){
            utilCustom.toaster($filter('translate')('data.deleteError')+' '+$filter('translate')('dnc.dnc'));
          })
        }else{
          utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
        }
      });

    }
    function findDnc(dncId){
      var indx = _.findIndex(vm.dncs,{id:dncId});
      return indx;
    }

    function dialogShowDetail(e){
      $mdDialog.show({
        controller         : 'CsvUploadPicController',
        controllerAs       : 'vm',
        templateUrl        : 'app/ecm/dnc/dialog/upload.html',
        parent             : angular.element($document.body),
        targetEvent        : e,
        clickOutsideToClose: true
      }).then(function(data){
        if(data){
          data.map(function(contact){
            vm.dncs.push(contact);
          })

        }


      })
    }
  }

})();
