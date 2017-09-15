(function() {
    'use strict';

    angular
        .module('app.wallboard')
        .controller('WallboardController', WallboardController);

    /** @ngInject */
    function WallboardController($mdSidenav, WallBoardService, $stateParams) {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.board = $stateParams;

        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;

        WallBoardService.getWallboards().then(function(data) {
            vm.boardList = data;
        })

        ////////

        /**
         * Update Board Uri
         *
         * Once you connect your app to your server,
         * you would do this on your API server.
         */
        function updateBoardUri() {
            if (vm.boardList.getById(vm.board.id)) {
                vm.boardList.getById(vm.board.id).name = vm.board.name;
                vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
            }
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function(value) {
            return this.filter(function(x) {
                return x.id === value;
            })[0];
        };

    }
})();