/**
 * Created by mumar on 2/6/2017.
 */
(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('AppMenuService', AppMenuService);

    function AppMenuService(msNavigationService, $filter) {
        var menuList = {
            "agent": {
                "title": $filter('translate')('agent.agents'),
                "icon": 'icon-headset',
                "state": 'app.agent',
                "weight": 1
            },
            'application': {
                "title": $filter('translate')('application.applications'),
                "icon": 'icon-apps',
                "state": 'app.application',
                "weight": 3
            },
            'team': {
                "title": $filter('translate')('team.teams'),
                "icon": 'icon-account-multiple',
                "state": 'app.team',
                "weight": 5
            },
            'queue': {
                title: $filter('translate')('csq.csqs'),
                icon: 'icon-trello',
                state: 'app.queue',
                "weight": 2
            },
            'user': {
                title: $filter('translate')('user.users'),
                icon: 'icon-account',
                state: 'app.user',
                "weight": 4
            },
            'easyAnnouncement': {
                title: $filter('translate')('easyAnnouncement.easyAnnouncements'),
                icon: 'icon-calendar-today',
                state: 'app.easyAnnouncement',
                weight: 5
            },
            'prompts': {
                title: $filter('translate')('file.prompts'),
                icon: 'icon-music-box',
                state: 'app.prompts({id:""})',
                weight: 5
            },
            'scripts': {
                title: $filter('translate')('file.scripts'),
                icon: 'icon-folder',
                state: 'app.scripts({id:""})',
                weight: 5
            },
            'businessCalendar.holidayProfile': {
                title: $filter('translate')('holidayProfile.holidayProfile'),
                icon: 'icon-receipt',
                state: 'app.holidayProfile',
                weight: 5
            },
            'systemSetting': {
                title: $filter('translate')('systemSetting.systemSettings'),
                icon: 'icon-cog',
                state: 'app.systemSetting',
                weight: 5
            },
            'Todo': {
                title: $filter('translate')('TODO.callerLists'),
                icon: 'icon-checkbox-marked',
                state: 'app.todo',
                weight: 10
            },
            'businessCalendar.businessCalendar': {
                title: $filter('translate')('businessCalendar.businessCalendar'),
                icon: 'icon-calendar-check-multiple',
                state: 'app.businessCalendar',
                weight: 5
            },
            'ECM.campaign': {
                title: $filter('translate')('campaign.campaigns'),
                icon: 'icon-bullhorn',
                state: 'app.campaign',
                weight: 9
            },
            'ECM': {
                title: 'ECM',
                weight: 9
            },
            'ECM.dnc': {
                title: $filter('translate')('dnc.dnclist'),
                icon: 'icon-account-multiple',
                state: 'app.dnc',
                weight: 9
            },
            'ECM.strategy': {
                title: $filter('translate')('strategy.strategies'),
                icon: 'icon-school',
                state: 'app.strategy',
                weight: 9
            },
            'ECM.systemSetting': {
                title: $filter('translate')('systemSetting.systemSettings'),
                icon: 'icon-cog',
                state: 'app.ecmSystemSetting',
                weight: 9
            },
            'apps.scrumboard': {
                title: 'Scrumboard',
                icon: 'icon-trello',
                state: 'app.scrumboard.boards',
                weight: 5
            }

        };

        return {
            saveItems: function(modules) {
                modules.forEach(function(module) {
                    msNavigationService.saveItem(module, menuList[module]);
                })

            },
            deleteItems: function(modules) {
                modules.forEach(function(module) {
                    msNavigationService.deleteItem(module);
                });
            },
            deleteAll: function() {
                msNavigationService.deleteAll();
            }
        }
    }
})();