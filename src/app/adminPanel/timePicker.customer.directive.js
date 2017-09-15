/**
 * Created by IT inventory on 5/30/2017.
 */
(function () {
    'use strict';
    angular
      .module('app.utilsCustom')
      .directive('timePickerCustom', timePickerCustom)
      .controller('timePickerrController', timePickerrController);
    function timePickerrController($scope) {
      var vm = this;
      vm.selected = {startTime: $scope.startTime,endTime: $scope.endTime};
      vm.verifyDate = verifyDate;
      vm.createForm = $scope.form;
      function verifyDate(startTime, endTime) {
        var stt = new Date("August 14, 1947 " + startTime);
        stt = stt.getTime();
        $scope.startTime =  startTime;
        $scope.endTime = endTime;
        var endt = new Date("August 14, 1947 " + endTime);
        endt = endt.getTime();
        (vm.falseStartTime) = stt >= endt;

      }
    }

    function timePickerCustom() {
      return {
        restrict: 'EA',
        scope: {
          startTime: '=startTime',
          endTime: '=endTime',
          form: '=form'
        },
        templateUrl: 'app/adminPanel/timePickerCustom.html',
        controller: 'timePickerrController as vm'

      }
    }
  })();
