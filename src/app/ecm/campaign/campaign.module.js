/**
 * Created by mumar on 5/3/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.campaign', ['ui.timepicker'])
        .config(config);

    function config($stateProvider, msNavigationServiceProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider.state('app.campaign', {
            url: '/campaign',
            views: {
                'content@app': {
                    templateUrl: 'app/ecm/campaign/list.html',
                    controller: 'CampaignController as vm'
                }
            },
            resolve: {

            }
            /*,
                   bodyClass: 'todo'*/
        });
        // Navigation
        // msNavigationServiceProvider.saveItem('ECM.campaign', {
        //   title : 'Campaigns',
        //   icon  : 'icon-bullhorn',
        //   state:'app.campaign'
        // });
    }

})();