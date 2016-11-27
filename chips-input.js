angular.module('chips-input', [])

    .directive("chipsInput", function () {
        return {
            controller: 'chipsCtrl',
            template: '<div class="chip" ng-attr-autofocus="{{autofocus()}}" ng-repeat="chip in chips track by $index" ng-style="loadChipStyles()"><span style="pointer-events: none">{{chip}}</span><span class="removeChip" ng-click="deleteChip($index)" ng-style="loadCloseBtnStyles()">&times;</span></div><input type="text" id="input-chip" class="chips-input" ng-model="chipName" ng-keydown="addChip($event)" ng-blur="addChipOnBlur()" ng-style="loadInputStyles()" maxlength="{{maxlength}}" ng-focus="autofocus">'
        };
    })

    .service('chipsInput', function ($rootScope, $window) {
        var service = this;
        service.event = '';
        service.maxlength = 30;
        service.autofocus = false;

        service.chips = [];

        service.chip = {
            color: 'rgb(122, 127, 130)',
            background: '#f1f1f1',
            height: '50px',
            boxShadow: '0 1px 1px rgba(0,0,0,0.15),-1px 0 0 rgba(0,0,0,0.03),1px 0 0 rgba(0,0,0,0.03),0 1px 0 rgba(0,0,0,0.12)',
            margin: '0 5px',
            padding: '0px 25px',
            borderRadius: '0px',
            display: 'inline-block',
            fontSize: '18px',
            lineHeight: '50px',
            overflow: 'hidden',
            textTransform: 'Capitalize'
        };

        service.close = {
            paddingLeft: '10px',
            color: '#888',
            fontWeight: 'bold',
            float: 'right',
            fontSize: '25px',
            cursor: 'pointer'
        };

        service.input = {
            height: '48px',
            minWidth: '15px',
            display: 'inline-block',
            fontSize: '18px',
            lineHeight: '50px',
            overflow: 'hidden',
            margin: '0px 5px',
            padding: '0px 25px',
            position: 'absolute',
            border: 'none',
            color: '#cacaca',
            background: 'inherit'
        };

        //SETTERS

        service.init = function (values) {
            if (values.isArray) {
                values.forEach(function (value) {
                    service.chips.push(value);
                });
            } else {
                service.chips = values;
            }

            $rootScope.$broadcast('chips:updated');
        };

        service.clear = function () {
            service.chips = [];
            $rootScope.$broadcast('chips:updated');
        }

        service.enableAutofocus = function () {
            service.autofocus = true;
            $rootScope.$broadcast('autofocus:updated');
        }

        service.disableAutofocus = function () {
            service.autofocus = false;
            $rootScope.$broadcast('autofocus:updated');
        }

        service.addChip = function (chip) {
            service.chips.push(chip);
            $rootScope.$broadcast('chips:updated');
        }

        service.popChip = function () {
            service.chips.pop();
            $rootScope.$broadcast('chips:updated');
        };

        service.spliceChip = function (index) {
            service.chips.splice(index, 1);
            $rootScope.$broadcast('chips:updated');
        };

        service.chipStyle = function (var1, var2) {
            if (var1 instanceof Object) {
                for (var key in var1) {
                    service.chip[key] = var1[key];
                }
            } else {
                service.chip[var1] = var2;
            }

            $rootScope.$broadcast('chipStyle:updated');
        }

        service.closeBtnStyle = function (var1, var2) {
            if (var1 instanceof Object) {
                for (var key in var1) {
                    service.close[key] = var1[key];
                }
            } else {
                service.close[var1] = var2;
            }

            $rootScope.$broadcast('closeBtnStyle:updated');
        };

        service.inputStyle = function (var1, var2) {
            if (var1 instanceof Object) {
                for (var key in var1) {
                    service.input[key] = var1[key];
                }
            } else {
                service.input[var1] = var2;
            }

            $rootScope.$broadcast('inputStyle:updated');
        };

        service.roundedChip = function () {
            service.chip.borderRadius = service.chip.height;
            $rootScope.$broadcast('chipStyle:updated');
        };
        
        service.focus = function () {
            $window.document.getElementById('input-chip').focus();
            // service.refresh();
        };

        //Refresh

        // service.refresh = function () {
        //     $rootScope.$broadcast('style:updated');
        // };

        //PSEUDO CLASS

        var css = '.chips-input:focus {outline: none;} .removeChip:hover {color : #5f5f5f !important;}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    })

    .controller('chipsCtrl', function ($scope, $window, chipsInput) {
        $scope.chipName = '';

        $scope.maxlength = chipsInput.maxlength;

        $scope.chips = chipsInput.chips;

        $scope.loadChipStyles = function () {
            return {
                'color': chipsInput.chip.color,
                'background': chipsInput.chip.background,
                'height': chipsInput.chip.height,
                'box-shadow': chipsInput.chip.boxShadow,
                'margin': chipsInput.chip.margin,
                'padding': chipsInput.chip.padding,
                'border-radius': chipsInput.chip.borderRadius,
                'display': chipsInput.chip.display,
                'font-size': chipsInput.chip.fontSize,
                'line-height': chipsInput.chip.height,
                'overflow': chipsInput.chip.overflow,
                'text-transform': chipsInput.chip.textTransform
            };
        };

        $scope.loadCloseBtnStyles = function () {
            return {
                'padding-left': chipsInput.close.paddingLeft,
                'color': chipsInput.close.color,
                'font-weight': chipsInput.close.fontWeight,
                'float': chipsInput.close.float,
                'font-size': chipsInput.close.fontSize,
                'cursor': chipsInput.close.cursor
            };
        };

        $scope.loadInputStyles = function () {
            return {
                'height': chipsInput.chip.height,
                'min-width': chipsInput.input.minWidth,
                'display': chipsInput.input.display,
                'font-size': chipsInput.input.fontSize,
                'line-height': chipsInput.chip.height,
                'overflow': chipsInput.input.overflow,
                'margin': chipsInput.input.margin,
                'padding': chipsInput.input.padding,
                'position': chipsInput.input.position,
                'border': chipsInput.input.border,
                'color': chipsInput.input.color,
                'background': chipsInput.input.background
            };
        };

        $scope.addChip = function (event) {
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($scope.chipName != "") {
                    chipsInput.addChip($scope.chipName);
                    $scope.chipName = '';
                }
            }

            if (event.keyCode == 8) {
                if ($scope.chipName == '' && $scope.chips.length > 0)
                    chipsInput.popChip();
            }

            $window.document.getElementById('input-chip').focus();
        };

        $scope.addChipOnBlur = function () {
            if ($scope.chipName != "") {
                chipsInput.addChip($scope.chipName);
                $scope.chipName = '';
            }
        };

        $scope.deleteChip = function (index) {
            chipsInput.spliceChip(index);
        };

        $scope.autofocus = function () {
            return chipsInput.autofocus;
        };
        //Listener

        $scope.$on('chips:updated', function () {
            $scope.chips = chipsInput.chips;
        });

        $scope.$on('chipStyle:updated', function () {
            $scope.refresh();
        });

        $scope.$on('closeBtnStyle:updated', function () {
            $scope.refresh();
        });

        $scope.$on('inputStyle:updated', function () {
            $scope.refresh();
        });

        $scope.$on('autofocus:updated', function () {
            $scope.refresh();
        });

        $scope.$on('autofocus:updated', function () {
            $scope.autofocus = chipsInput.autofocus;
            $scope.refresh();
        });

        //Refresh

        $scope.refresh = function () {
            $scope.$apply();
        }
    });

