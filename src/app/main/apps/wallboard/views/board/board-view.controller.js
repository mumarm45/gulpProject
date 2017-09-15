(function() {
    'use strict';

    angular
        .module('app.wallboard')
        .controller('WallboardViewController', WallboardViewController);

    /** @ngInject */
    function WallboardViewController($document, $window, $timeout, $stateParams, $mdDialog, msUtils, BoardList, WallBoardService, CardFilters, DialogService) {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.board = {};
        vm.data = {
                "name": "Dashboard",
                "columns": [{
                        "name": "column1",
                        "background": "#e9ebee",
                        "size": 55,
                        "widgets": [{
                            "name": "report_1",
                            "title": "Report One",
                            "type": "iframe",
                            "content": "/app/main/apps/calendar/calendar.html",
                            "refresh": 10,
                            "resize": true,
                            "minHeight": "auto",
                            "maxHeight": "auto",
                            "sticky": false,
                            "stickyControl": false
                        }, {
                            "name": "report_1",
                            "title": "Report One",
                            "type": "include",
                            "content": "/app/main/apps/file-manager/file-manager.html",
                            "refresh": 10,
                            "resize": true,
                            "minHeight": "auto",
                            "maxHeight": "auto",
                            "sticky": false,
                            "stickyControl": false
                        }]
                    },
                    {
                        "name": "column1",
                        "background": "#e9ebee",
                        "size": 55,
                        "widgets": [{
                            "name": "report_1",
                            "title": "Report One",
                            "type": "include",
                            "content": "/app/main/apps/calendar/calendar.html",
                            "refresh": 10,
                            "resize": true,
                            "minHeight": "auto",
                            "maxHeight": "auto",
                            "sticky": false,
                            "stickyControl": false
                        }, ]
                    }





                ]
            }
            //  vm.boardList = BoardList.data;







        // Methods
        vm.openCardDialog = DialogService.openCardDialog;
        vm.addNewList = addNewList;
        vm.removeList = removeList;
        vm.cardFilter = cardFilter;
        vm.isOverdue = isOverdue;
        vm.addWidget = addWidget;
        vm.moveWidget = moveWidget;
        vm.removeWidget = removeWidget;
        vm.onChange = onChange;
        vm.onDragStart = onDragStart;
        vm.onDragStop = onDragStop;
        vm.onResizeStart = onResizeStart;
        vm.onItemAdded = onItemAdded;
        vm.onItemRemoved = onItemRemoved;
        vm.callback = callback;

        //////////

        function callback(e, configuration) {
            console.log(e, configuration);
        }

        vm.widgets = [{ x: 0, y: 0, width: 1, height: 1 }, { x: 0, y: 0, width: 3, height: 1 }];
        vm.options = {
            cellHeight: 200,
            verticalMargin: 10
        };

        function addWidget() {
            var newWidget = { x: 0, y: 0, width: 1, height: 1 };
            vm.widgets.push(newWidget);
        };

        function moveWidget() {
            vm.widgets[0].x = 1;
            vm.widgets[0].width = 2;
            vm.widgets[0].height = 2;
        };

        function removeWidget(w) {
            var index = vm.widgets.indexOf(w);
            vm.widgets.splice(index, 1);
        };

        function onChange(event, items) {
            $log.log("onChange event: " + event + " items:" + items);
        };

        function onDragStart(event, ui) {
            $log.log("onDragStart event: " + event + " ui:" + ui);
        };

        function onDragStop(event, ui) {
            $log.log("onDragStop event: " + event + " ui:" + ui);
        };

        function onResizeStart(event, ui) {
            $log.log("onResizeStart event: " + event + " ui:" + ui);
        };

        function onResizeStop(event, ui) {
            $log.log("onResizeStop event: " + event + " ui:" + ui);
        };

        function onItemAdded(item) {
            $log.log("onItemAdded item: " + item);
        };

        function onItemRemoved(item) {
            $log.log("onItemRemoved item: " + item);
        };


        init();

        /**
         * Initialize
         */
        function init() {
            WallBoardService.getBoardData($stateParams.id).then(function(data) {
                vm.board = data;
                vm.board.rows.forEach(function(row, index) {
                    row['width'] = Math.round(100 / row.widgets.length);
                })
            })

        }

        /**
         * IE ONLY
         * Calculate the list-content height
         * IE ONLY
         */


        /**
         * Add new list
         */
        function addNewList() {
            if (vm.newListName === '') {
                return;
            }

            vm.board.lists.push({
                id: msUtils.guidGenerator(),
                name: vm.newListName,
                idCards: []
            });

            vm.newListName = '';
        }

        /**
         * Remove list
         *
         * @param ev
         * @param list
         */
        function removeList(ev, list) {
            var confirm = $mdDialog.confirm({
                title: 'Remove List',
                parent: $document.find('#scrumboard'),
                textContent: 'Are you sure want to remove list?',
                ariaLabel: 'remove list',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                ok: 'Remove',
                cancel: 'Cancel'
            });
            $mdDialog.show(confirm).then(function() {
                vm.board.lists.splice(vm.board.lists.indexOf(list), 1);
            }, function() {
                // Canceled
            });

        }

        /**
         * Card filter
         *
         * @param cardId
         * @returns {*}
         */
        function cardFilter(cardId) {
            var card = vm.board.cards.getById(cardId);

            try {
                if (angular.lowercase(card.name).indexOf(angular.lowercase(vm.cardFilters.name)) < 0) {
                    throw false;
                }

                angular.forEach(vm.cardFilters.labels, function(label) {
                    if (!msUtils.exists(label, card.idLabels)) {
                        throw false;
                    }
                });

                angular.forEach(vm.cardFilters.members, function(member) {
                    if (!msUtils.exists(member, card.idMembers)) {
                        throw false;
                    }
                });


            } catch (err) {
                return err;
            }

            return true;
        }

        /**
         * Is the card overdue?
         *
         * @param cardDate
         * @returns {boolean}
         */
        function isOverdue(cardDate) {
            return moment() > moment(cardDate, 'x');
        }
    }
})();