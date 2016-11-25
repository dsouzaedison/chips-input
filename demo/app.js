angular.module('chips-input', [])
    .controller('ctrl', function ($scope, $window) {
        $scope.event = '';
        $scope.chipName = '';
        $scope.maxlength = 115;
        $scope.chips = ['Hey Buddy!'];

        $scope.process = function (event) {
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($scope.chipName != "") {
                    $scope.chips.push($scope.chipName);
                    $scope.chipName = '';
                }
            }

            if (event.keyCode == 8) {
                if ($scope.chipName == '' && $scope.chips.length > 0)
                    $scope.chips.pop();
            }

            $window.document.getElementById('input-chip').focus();
        };

        $scope.addChip = function () {
            if ($scope.chipName != "") {
                $scope.chips.push($scope.chipName);
                $scope.chipName = '';
                // $scope.inputSize = 2;
            }
        };

        $scope.deleteChip = function (index) {
            $scope.chips.splice(index, 1);
            // console.log($scope.chips);
        }

        $scope.loadChipStyles = function () {
            return {
                'color': 'rgb(122, 127, 130)',
                'background-color': '#f1f1f1',
                'height': '50px',
                'box-shadow': '0 1px 1px rgba(0,0,0,0.15),-1px 0 0 rgba(0,0,0,0.03),1px 0 0 rgba(0,0,0,0.03),0 1px 0 rgba(0,0,0,0.12)',
                'margin': '0 5px',
                'padding': '0px 25px',
                'border-radius': '0px',
                'display': 'inline-block',
                'font-size': '18px',
                'line-height': '50px',
                'overflow': 'hidden',
                'text-transform': 'Capitalize'
            };
        };

        $scope.loadCloseBtnStyles = function () {
            return {
                'padding-left': '10px',
                'color': '#888',
                'font-weight': 'bold',
                'float': 'right',
                'font-size': '25px',
                'cursor': 'pointer'
            };
        };

        $scope.loadInputStyles = function () {
            return {
                'height': '48px',
                'min-width': '15px',
                'display': 'inline-block',
                'font-size': '18px',
                'line-height': '50px',
                'overflow': 'hidden',
                'margin': '0px 5px',
                'padding': '0px 25px',
                'position': 'absolute',
                'border': 'none',
                'color': '#cacaca',
                'background' : 'inherit'
            };
        };

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

    .directive("chipsInput", function () {
        return {
            template: '<div class="chip" ng-repeat="chip in chips track by $index" ng-style="loadChipStyles()">{{chip}}<span class="removeChip" ng-click="deleteChip($index)" ng-style="loadCloseBtnStyles()">&times;</span></div><input type="text" id="input-chip" class="chips-input" ng-model="chipName" ng-keydown="process($event)" ng-blur="addChip()" ng-style="loadInputStyles()" maxlength="{{maxlength}}" autofocus>'
        };
    });