(function() {
    'use strict';

    angular
        .module('app.wallboard')
        .controller('WallboardsController', WallboardsController);

    /** @ngInject */
    function WallboardsController(WallBoardService) {
        var vm = this;

        // Data
        WallBoardService.getWallboards().then(function(data) {
            vm.boardList = data;
        })



        // Methods

        //////////
    }
})();