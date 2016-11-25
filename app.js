angular.module('chips-input', [])
    .controller('ctrl', function ($scope, $window) {
        $scope.event = '';
        // $scope.inputSize = 2;
        $scope.chipName = '';
        $scope.maxlength = 15;
        $scope.chips = [];

        $scope.process = function (event) {
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($scope.chipName != "") {
                    $scope.chips.push($scope.chipName);
                    $scope.chipName = '';
                    // $scope.inputSize = 2;
                    // $window.document.getElementById('input-chip').style.width = 5 + 'px';
                }
            }

            if (event.keyCode == 8) {
                if ($scope.chipName == '' && $scope.chips.length > 0)
                    $scope.chips.pop();
            }

            // if ($scope.inputSize < 45)
            //     $scope.inputSize++;
            // $window.document.getElementById('input-chip').style.width = $scope.inputSize * 5 + 'px';
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
                'color': '#87ccf3',
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
                'display': 'inline-block',
                'font-size': '18px',
                'line-height': '50px',
                'overflow': 'hidden',
                'margin': '0px 5px',
                'padding': '0px 25px',
                'position': 'absolute',
                'border': 'none',
                'color': '#cacaca'
            };
        };

        // var style = "<style>.abc {color:#fff;}";
        // document.getElementsByTagName('head').append(style);

    });