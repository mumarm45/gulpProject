/**
 * Created by mumar on 3/5/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.utilsCustom', [])
        .factory('utilCustom', ['$mdToast', '$filter', '$mdDialog', utilCustom])
        .directive('nameValidate', ['$rootScope', '$http', nameValidate])
        .directive('nameLocalValidate', ['$rootScope', '$http', nameLocalValidate])
        .provider('ngColorPickerConfig', ngColorPickerConfig)
        .directive('ngColorPicker', ['ngColorPickerConfig', ngColorPicker])
        .directive('accessDeniedPage', accessDeniedPage)
        .directive('timePicker', timePicker)
        .directive('whenScrolledDirective', whenScrolledDirective);


    function nameValidate($rootScope, $http) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var pro = attrs.property;
                    var len = 5;
                    if (pro == 'prefixExist') {
                        len = Number(attrs.maxLength);
                        if (!$.isNumeric(viewValue)) {
                            ctrl.$setValidity(attrs.className, true);
                            scope.mustNumber = undefined;
                            return undefined;
                        }

                    }
                    // scope.nameValidLength = '(viewValue && viewValue.length >= len ? 'valid' : undefined);'
                    scope.nameValidLength = 'valid';
                    if (viewValue) {
                        if (scope.nameValidLength) {
                            $http({ method: 'get', url: window.appBaseUrl + attrs.urlName, params: { name: viewValue } })
                                .success(function(data, status, headers, config) {
                                    if (status == '202') {
                                        ctrl.$setValidity(attrs.className, false);

                                        scope[pro] = viewValue;
                                        return viewValue;
                                    } else {
                                        ctrl.$setValidity(attrs.className, true);
                                        scope[pro] = undefined;
                                        return undefined;
                                    }

                                }).error(function(data, status, headers, config) {
                                    ctrl.$setValidity(attrs.className, false);
                                    scope[pro] = viewValue;
                                });

                            ctrl.$setValidity(attrs.className, true);
                            return viewValue;
                        } else {
                            ctrl.$setValidity(attrs.className, false);
                            scope[pro] = viewValue;
                            return undefined;
                        }
                    } else {
                        if (pro == 'emailExist') {
                            ctrl.$setValidity(attrs.className, true);
                            scope[pro] = undefined;
                            return viewValue;
                        } else {
                            ctrl.$setValidity(attrs.className, false);
                            scope[pro] = viewValue;
                            return undefined;
                        }
                    }


                });
            }
        };
    }

    function nameLocalValidate($rootScope, $http) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var pro = attrs.property;
                    var len = 5;
                    var currentList = JSON.parse(attrs.listElement);
                    currentList = currentList.map(function(inx) {
                        inx['_lowerName'] = angular.lowercase(inx[attrs.objectKey]);
                        return inx;
                    });
                    var objectKey = JSON.parse('{"_lowerName":"' + angular.lowercase(viewValue) + '"}');
                    len = Number(attrs.maxLength);
                    if (pro == 'prefixExist') {

                        len = Number(attrs.maxLength);
                        if (!$.isNumeric(viewValue)) {
                            ctrl.$setValidity(attrs.className, true);
                            scope.mustNumber = undefined;
                            return undefined;
                        }


                    }
                    if (pro == 'dialNumberExist' || pro == 'prefixExist') { objectKey._lowerName = Number(objectKey._lowerName) }
                    scope.nameValidLength = 'valid';
                    // scope.nameValidLength = (viewValue && viewValue.length >= len ? 'valid' : undefined);
                    if (viewValue) {
                        if (scope.nameValidLength) {
                            var found = _.find(currentList, objectKey);
                            if (found) {
                                if (found.id != Number(attrs.currentId)) {
                                    ctrl.$setValidity(attrs.className, false);
                                    ctrl.$valid = false;
                                    scope[pro] = viewValue;
                                    return viewValue;
                                } else {
                                    ctrl.$setValidity(attrs.className, true);
                                    ctrl.$valid = true;
                                    scope[pro] = undefined;
                                    return viewValue;
                                }

                            } else {
                                ctrl.$setValidity(attrs.className, true);
                                ctrl.$valid = true;
                                scope[pro] = undefined;
                                return viewValue;

                            }
                        } else {
                            ctrl.$setValidity(attrs.className, false);

                            scope[pro] = viewValue;
                            return undefined;
                        }
                    } else {
                        if (pro == 'emailExist') {
                            ctrl.$setValidity(attrs.className, true);
                            scope[pro] = undefined;
                            return viewValue;
                        } else {
                            ctrl.$setValidity(attrs.className, true);
                            ctrl.$valid = true;
                            scope[pro] = undefined;
                            return viewValue;
                        }
                    }


                });
            }
        };
    }

    function utilCustom($mdToast, $filter, $mdDialog) {
        return {
            'toaster': function(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .hideDelay(5000)
                );

            },
            'toasterConfirm': function() {
                var text = $filter('translate')('generic.areYouSure');
                var yes = $filter('translate')('generic.yes');
                var no = $filter('translate')('generic.no');
                // var toaster = $mdToast.simple()
                //   .textContent(text)
                //   .action(yes)
                //
                //   .position('bottom right')
                //   //  .highlightAction(true)
                //   .hideDelay(5000);

                var dialog = $mdDialog.confirm()
                    .clickOutsideToClose(true)
                    .title(text)
                    .ariaLabel('Lucky day')
                    .ok(yes)
                    .cancel(no)
                    .multiple(true)

                // .highlightClass('md-accent')
                $mdToast.hide();

                return $mdDialog.show(dialog);
            },
            'toasterLoading': function(delayTime) {
                var timeDelay = 10000;
                if (delayTime)
                    timeDelay = delayTime;
                $mdToast.show({
                    hideDelay: timeDelay,
                    position: 'bottom right',
                    controller: 'ToastCtrl as vm',
                    templateUrl: 'app/adminPanel/custome/toaster/toaster.html'
                });
            },
            'checkReqularExpression': function(regex, str) {
                var result = true;
                var m = regex.exec(str);
                if (m == null) {
                    result = true;
                } else {
                    if (m[0] == str)
                        result = false;
                }
                return result;
            },
            'hideToaster': function() {
                $mdToast.hide();
            }
        }
    }

    function ngColorPickerConfig() {

        var templateUrl = 'app/adminPanel/custome/colorPicker/color-picker.html';
        var defaultColors = [
            '#7bd148',
            '#5484ed',
            '#a4bdfc',
            '#46d6db',
            '#7ae7bf',
            '#51b749',
            '#fbd75b',
            '#ffb878',
            '#ff887c',
            '#dc2127',
            '#dbadff',
            '#e1e1e1',
            '#039BE5'
        ];
        this.setTemplateUrl = function(url) {
            templateUrl = url;
            return this;
        };
        this.setDefaultColors = function(colors) {
            defaultColors = colors;
            return this;
        };
        this.$get = function() {
            return {
                templateUrl: templateUrl,
                defaultColors: defaultColors
            }
        }
    }

    function ngColorPicker(ngColorPickerConfig) {

        return {
            scope: {
                selected: '=',
                customizedColors: '=colors'
            },
            restrict: 'AE',
            templateUrl: ngColorPickerConfig.templateUrl,
            link: function(scope, element, attr) {
                scope.colors = scope.customizedColors || ngColorPickerConfig.defaultColors;
                scope.selected = scope.selected || scope.colors[0];

                scope.pick = function(color) {
                    scope.selected = color;
                };

            }
        };
    }

    function accessDeniedPage() {

        return {
            restrict: 'E',
            templateUrl: '/app/adminPanel/custome/accessDenied.html'
        }
    }

    function whenScrolledDirective() {
        return function(scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= 400) {
                    scope.$apply(attr.whenScrolled);
                }
            });
        };
    }

    function timePicker($timeout) {
        return {
            restrict: 'AC',
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attrs) {
                var step = attrs.step ? attrs.step : 1;
                var enableText = attrs.enableText ? false : true;
                element.timepicker({
                    'showDuration': false,
                    'show2400': false,
                    'timeFormat': 'H:i',
                    'maxTime': '23:59',
                    'disableTextInput': enableText,
                    'step': step,
                    'forceRoundTime': true,
                    'minTime': '00:00',
                    'wrapHours': false,

                });
            }
        };
    }



})();