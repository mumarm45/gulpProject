(function() {
    'use strict';

    /**
     * Main module of the Fuse
     */
    window.applicationEnvironment = 'both'; //ecm or adminpanel


    angular.module('fuse', [
        // Core
        'app.core',
        // Navigation
        'app.navigation',
        // Quick panel
        'app.quick-panel',
        // Apps
        //'app.dashboards',
        //'app.calendar',
        //'app.mail',
        //'app.file-manager',
        //'app.scrumboard',
        'app.utilsCustom',
        'app.appSetting',
        'app.auth',
        //'app.agent',
        'app.base',



        // Toolbar
        // Toolbar
        'app.toolbar',



        // Pages
        //'app.pages',

        // User Interface
        //'app.ui',

        // Components
        //'app.components'
    ]);


})();