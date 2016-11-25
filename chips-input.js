angular.module('chips-input', [])

    .directive("chipsInput", function () {
        return {
            controller: 'chipsCtrl',
            template: '<div class="chip" ng-repeat="chip in chips track by $index" ng-style="loadChipStyles()"><span style="pointer-events: none">{{chip}}</span><span class="removeChip" ng-click="deleteChip($index)" ng-style="loadCloseBtnStyles()">&times;</span></div><input type="text" id="input-chip" class="chips-input" ng-model="chipName" ng-keydown="addChip($event)" ng-blur="addChipOnBlur()" ng-style="loadInputStyles()" maxlength="{{maxlength}}" ng-focus="autofocus">'
        };
    })

    .service('chipsInput', function ($rootScope) {
        this.event = '';
        this.maxlength = 30;
        this.autofocus = '';

        this.chips = [];

        this.chip = {
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

        this.close = {
            paddingLeft: '10px',
            color: '#888',
            fontWeight: 'bold',
            float: 'right',
            fontSize: '25px',
            cursor: 'pointer'
        };

        this.input = {
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

        this.init = function (values) {
            if (values.isArray) {
                values.forEach(function (value) {
                    this.chips.push(value);
                });
            } else {
                this.chips = values;
            }

            $rootScope.$broadcast('chips:updated');
        }

        this.clear = function (value) {
            this.chips = [];
            $rootScope.$broadcast('chips:updated');
        }

        this.disableAutofocus = function () {
            this.autofocus = '';
            $rootScope.$broadcast('autofocus:updated');
        }

        this.enableAutofocus = function () {
            this.autofocus = 'autofocus';
            $rootScope.$broadcast('autofocus:updated');
        }

        this.addChip = function (chip) {
            this.chips.push(chip);
            $rootScope.$broadcast('chips:updated');
        }

        this.popChip = function () {
            this.chips.pop();
            $rootScope.$broadcast('chips:updated');
        }

        this.spliceChip = function (index) {
            this.chips.splice(index, 1);
            $rootScope.$broadcast('chips:updated');
        }

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
        // console.log('Chips Ctrl');
        $scope.chipName = '';

        $scope.autofocus = chipsInput.autofocus;

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
                'line-height': chipsInput.chip.lineHeight,
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
                'height': chipsInput.input.height,
                'min-width': chipsInput.input.minWidth,
                'display': chipsInput.input.display,
                'font-size': chipsInput.input.fontSize,
                'line-height': chipsInput.input.lineHeight,
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
        }

        //Listener

        $scope.$on('chips:updated', function () {
            $scope.chips = chipsInput.chips;
        });

        $scope.$on('autofocus:updated', function () {
            $scope.autofocus = chipsInput.autofocus;
        });
    });

