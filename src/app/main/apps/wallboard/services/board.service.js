(function() {
    'use strict';

    angular
        .module('app.wallboard')
        .factory('WallBoardService', WallBoardService);

    /** @ngInject */
    function WallBoardService($q, msApi) {


        var wallboardList = [{
                "rows": [{
                        "widgets": [{ "title": "First", "content": "app/main/apps/calendar/calendar.html" }, { "title": "Second", "content": "app/main/apps/calendar/calendar.html" }, { "title": "Third", "content": "app/main/apps/chat/chat.html" }]
                    },
                    {
                        "widgets": [{ "title": "First", "content": "" }, { "title": "Second", "content": "" }]
                    },
                    {
                        "widgets": [{ "title": "First", "content": "" }]
                    }
                ],
                "name": "Wallboard 1",
                "id": "32gfhaf2"

            },
            {
                "rows": [{
                        "widgets": [{ "title": "First", "content": "app/main/apps/calendar/calendar.html" }, { "title": "Second", "content": "app/main/apps/calendar/calendar.html" }, { "title": "Third", "content": "app/main/apps/dashboards/project/dashboard-project.html" }]
                    },
                    {
                        "widgets": [{ "title": "First", "content": "" }, { "title": "Second", "content": "" }]
                    },
                    {
                        "widgets": [{ "title": "First", "content": "" }]
                    }
                ],
                "id": "27cfcbe1",
                "name": "Wallboard 2"

            }
        ];





        var boardList = [{
                "id": "27cfcbe1",
                "name": "Wallboard 1",
                "uri": "acme-backend-application",
                "widgets": [{
                        "name": "Widget 1",
                        "width": "30",
                        "directoryName": "agentState"

                    },
                    {

                        "name": "Widget 2",
                        "width": "30",
                        "directoryName": "agentDetail"

                    }

                ]

            },
            {
                "id": "32gfhaf2",
                "name": "Wallboard 2",
                "uri": "acme-backend-application",
                "widgets": [{
                        "name": "Widget 1",
                        "width": "30",
                        "directoryName": "agentState"

                    },
                    {

                        "name": "Widget 2",
                        "width": "30",
                        "directoryName": "agentDetail"

                    }

                ]

            }
        ];

        var boardData = [{
                "name": "First Wallboard",
                "uri": "acme-frontend-application",
                "id": "32gfhaf2"
            },
            {
                "name": "Second Wallboard",
                "uri": "acme-backend-application",
                "id": "27cfcbe1"
            }
        ];

        var service = {
            data: {},
            addNewBoard: addNewBoard,
            getBoardData: getBoardData,
            getALLboards: getALLboards,
            getWallboards: getWallboards,
        };

        /**
         * Get board data from the server
         *
         * @param boardId
         * @returns {*}
         */

        function getALLboards() {
            var deferred = $q.defer();


            deferred.resolve(boardData);
            return deferred.promise;
        }

        function getWallboards() {
            var deferred = $q.defer();


            deferred.resolve(wallboardList);
            return deferred.promise;
        }

        function getBoardData(boardId) {
            // Create a new deferred object
            var deferred = $q.defer();

            var data = _.find(wallboardList, { id: boardId });
            deferred.resolve(data);
            return deferred.promise;
        }



        /**
         * Create an empty board object and set it.
         *
         * For the demonstration purposes, we are creating the
         * empty object in the javascript which you wouldn't do
         * it in real life. Rather, you would make an API call
         * to your server to generate an empty object that fills
         * some of the areas for you like an ID, labels, members
         * or the default board settings.
         *
         * Then you would grab the response that comes from
         * the API call and attach it to the service.data object.
         */
        function addNewBoard() {
            // Create a new deferred object
            var deferred = $q.defer();

            // Here you would make an API call to your server...
            _generateEmptyScrumboardObject().then(
                // SUCCESS
                function(response) {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the response
                    deferred.resolve(response);
                },
                // ERROR
                function(response) {
                    // Reject the response
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        /**
         * Dummy function for generating an empty
         * scrumboard object for demonstration
         * purposes
         *
         * @private
         * returns {$promise}
         */
        function _generateEmptyScrumboardObject() {
            // Create a new deferred object
            var deferred = $q.defer();

            // Fake id generator
            var id = parseInt(new Date().valueOf(), 16);

            // Prepare an empty scrumboard object
            var emptyObject = {
                data: {
                    name: 'Untitled Board',
                    uri: 'untitled-board',
                    id: id,
                    settings: {
                        color: '',
                        subscribed: false,
                        cardCoverImages: true
                    },
                    lists: [],
                    cards: [],
                    members: [{
                            id: '56027c1930450d8bf7b10758',
                            name: 'Alice Freeman',
                            avatar: 'assets/images/avatars/alice.jpg'
                        },
                        {
                            id: '26027s1930450d8bf7b10828',
                            name: 'Danielle Obrien',
                            avatar: 'assets/images/avatars/danielle.jpg'
                        },
                        {
                            id: '76027g1930450d8bf7b10958',
                            name: 'James Lewis',
                            avatar: 'assets/images/avatars/james.jpg'
                        },
                        {
                            id: '36027j1930450d8bf7b10158',
                            name: 'Vincent Munoz',
                            avatar: 'assets/images/avatars/vincent.jpg'
                        }
                    ],
                    labels: [{
                            id: '26022e4129ad3a5sc28b36cd',
                            name: 'High Priority',
                            color: 'red'
                        },
                        {
                            id: '56027e4119ad3a5dc28b36cd',
                            name: 'Design',
                            color: 'orange'
                        },
                        {
                            id: '5640635e19ad3a5dc21416b2',
                            name: 'App',
                            color: 'blue'
                        },
                        {
                            id: '6540635g19ad3s5dc31412b2',
                            name: 'Feature',
                            color: 'green'
                        }
                    ]
                }
            };

            // Resolve the promise
            deferred.resolve(emptyObject);

            return deferred.promise;
        }

        return service;
    }
})();