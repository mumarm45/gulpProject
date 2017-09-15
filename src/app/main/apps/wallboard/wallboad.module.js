(function() {
    'use strict';

    angular
        .module('app.wallboard', [
            // 3rd Party Dependencies
            'moment-picker',
            'ui.calendar',
            'ui.sortable',
            'xeditable', 'ngMdWidgetEngine', 'ngMaterial'
        ])
        .config(config)



    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {



        $stateProvider
            .state('app.wallboard', {
                abstract: true,
                url: '/wallboard',
                resolve: {
                    BoardList: function(msApi) {
                        return {
                            "data": [{
                                    "name": "First Wallboard",
                                    "uri": "acme-frontend-application",
                                    "id": "32gfhaf2"
                                },
                                {
                                    "name": "Second Wallboard",
                                    "uri": "acme-backend-application",
                                    "id": "27cfcbe1"
                                }
                            ]
                        };
                    }
                },
                bodyClass: 'scrumboard'
            })

        // Home
        .state('app.wallboard.wallboards', {
            url: '/wallboards',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/wallboard/views/boards/boards-view.html',
                    controller: 'WallboardsController as vm'
                }
            }
        })

        // Board
        .state('app.wallboard.wallboards.wallboard', {
                url: '/:id/:uri',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/apps/wallboard/scrumboard.html',
                        controller: 'WallboardController as vm'
                    },
                    'scrumboardContent@app.wallboard.wallboards.wallboard': {
                        templateUrl: 'app/main/apps/wallboard/views/board/board-view.html',
                        controller: 'WallboardViewController as vm'
                    }
                },
                resolve: {
                    BoardData: function($stateParams, BoardService) {
                        return BoardService.getBoardData($stateParams.id);
                    }
                }
            })
            .state('app.wallboard.wallboards.wallboard.si', {
                url: '/:id/:uri/:single',
                views: {

                    'content@app.wallboard.wallboards.wallboard': {
                        templateUrl: 'app/main/apps/wallboard/views/board/board-view.html',
                        controller: 'WallboardViewController as vm'
                    }
                },
                resolve: {
                    BoardData: function($stateParams, BoardService) {
                        return BoardService.getBoardData($stateParams.id);
                    }
                }
            })

        // Add board
        .state('app.wallboard.wallboards.addBoard', {
            url: '/add',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/wallboard/scrumboard.html',
                    controller: 'ScrumboardController as vm'
                },
                'scrumboardContent@app.wallboard.wallboards.addBoard': {
                    templateUrl: 'app/main/apps/wallboard/views/board/board-view.html',
                    controller: 'WallboardViewController as vm'
                }
            },
            resolve: {
                BoardData: function($stateParams, BoardService) {
                    return BoardService.addNewBoard();
                }
            }
        })


        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/scrumboard');

        // Api
        // msApiProvider.register('wallboard.boardList', ['app/data/wallboard/board-list.json']);


        // Navigation
        msNavigationServiceProvider.saveItem('apps.wallboard', {
            title: 'wallboard',
            icon: 'icon-trello',
            state: 'app.wallboard.wallboards',
            weight: 8
        });
    }

})();