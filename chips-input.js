angular.module('chips-input', [])

    .directive("chipsInput", function () {
        return {
            controller: 'chipsCtrl',
            template: '<div class="chip" ng-repeat="chip in chips track by $index" ng-style="loadChipStyles()"><span style="pointer-events: none">{{chip}}</span><span class="removeChip" ng-click="deleteChip($index)" ng-style="loadCloseBtnStyles()">&times;</span></div><span><span class="input-container" ng-style="loadInputContainerStyles()"><input type="text" id="input-chip" class="chips-input" ng-model="chipName" ng-keydown="addChip($event)" ng-keyup="refreshFiltered()" ng-blur="addChipOnBlur()" ng-style="loadInputStyles()" maxlength="{{maxlength}}"><div class="drop-data-wrapper" ng-style="filtered.length && dropdownWrapperStyles()" ng-show="dropdownEnabled && chipName"><div class="drop-option" ng-mouseover="setFocus($index)" ng-style="focusedElement == $index ? focusedElementStyles() : dropOptionStyles()" ng-repeat="option in filtered | filter: chipName" ng-click="addChipOnClick(option)" ng-show="chipNotExists(option)">{{option}}</div></div></span></span>'
        };
    })

    .service('chipsInput', function ($rootScope, $window, $http) {
        var service = this;
        service.event = '';
        service.maxlength = 30;
        service.autofocus = false;
        service.API_KEY = 'AIzaSyDR52Iv_cxQZHBSEYikSOx0gu271zFcXH4';

        service.chips = [];

        service.allowCustomText = true;

        service.customList = [];

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
            border: 'none',
            color: '#cacaca',
            background: 'inherit',
            maxWidth: '160px'
        };

        service.inputContainer = {
            margin: '0px 5px',
            maxWidth: '160px',
            position: 'absolute',
            display: 'inline-block'
        };

        service.dropdownWrapper = {
            background: '#fff',
            border: '1px solid #eee',
            boxShadow: '1px 1px 2px #555',
            zIndex: '5',
            position: 'relative'
        };

        service.dropOption = {
            padding: '4px 10px',
            cursor: 'pointer'
        };

        service.focusedElement = {
            background: '#eee'
        };

        //SETTERS

        service.init = function (options) {
            if (options instanceof Object) {
                if (options.chips) {
                    if ((options.chips) instanceof Array) {
                        options.chips.forEach(function (value) {
                            service.chips.push(value);
                        });
                    } else {
                        service.chips.push(options.chips);
                    }
                }

                if (options.autofocus)
                    service.focus();

                if (options.maxlength)
                    service.maxlength = options.maxlength;

                if (options.chipStyle)
                    service.chipStyle(options.chipStyle);

                if (options.closeBtnStyle)
                    service.closeBtnStyle(options.closeBtnStyle);

                if (options.inputStyle)
                    service.inputStyle(options.inputStyle);

                if (options.chipType)
                    if (options.chipType == 'rounded')
                        service.roundedChip();
                    else service.throwError('Unknown ChipType in chipsInput.init() Function');

                if (options.allowCustomText == false)
                    service.allowCustomText = false;
                else service.allowCustomText = true;

                if (options.customList)
                    service.customList = options.customList;

                if (options.dropdownEnabled == false)
                    service.dropdownEnabled = options.dropdownEnabled;
                else service.dropdownEnabled = true;
            }
            else service.throwError('Function init() expects an Object');

            $rootScope.$broadcast('chips:updated');
        };

        service.clear = function () {
            service.chips = [];
            $rootScope.$broadcast('chips:updated');
        };

        service.addChip = function (chip) {
            service.chips.push(chip);
            $rootScope.$broadcast('chips:updated');
        };

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
            } else if (var2) {
                service.chip[var1] = var2;
            } else service.throwError('chipStyle parameters unrecognized');

            $rootScope.$broadcast('chipStyle:updated');
        };

        service.closeBtnStyle = function (var1, var2) {
            if (var1 instanceof Object) {
                for (var key in var1) {
                    service.close[key] = var1[key];
                }
            } else if (var2) {
                service.close[var1] = var2;
            } else service.throwError('chipStyle parameters unrecognized');

            $rootScope.$broadcast('closeBtnStyle:updated');
        };

        service.inputStyle = function (var1, var2) {
            if (var1 instanceof Object) {
                for (var key in var1) {
                    service.input[key] = var1[key];
                }
            } else if (var2) {
                service.input[var1] = var2;
            } else service.throwError('chipStyle parameters unrecognized');

            $rootScope.$broadcast('inputStyle:updated');
        };

        service.roundedChip = function () {
            service.chip.borderRadius = service.chip.height;
            $rootScope.$broadcast('chipStyle:updated');
        };

        //Feature Under Progress
        service.getPlaceNames = function (keyword) {
            $http({
                method: 'GET',
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + keyword + '&types=(cities)&language=pt_BR&key=' + service.API_KEY
            })
                .then(function (response) {
                    console.log(response.data);
                }, function (err) {
                    console.log(err);
                });
        };

        service.focus = function () {
            $window.document.getElementById('input-chip').focus();
            // service.refresh();
        };

        //Error

        service.throwError = function (msg) {
            throw 'Error: ' + msg;
        };

        //Refresh

        // service.refresh = function () {
        //     $rootScope.$broadcast('style:updated');
        // };

        //PSEUDO CLASS

        var css = '.chips-input:focus {outline: none;} .removeChip:hover {color : #5f5f5f !important;} .drop-option:hover {background: #eee;}',
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

    .controller('chipsCtrl', function ($scope, $window, $filter, chipsInput) {
        $scope.chipName = '';

        $scope.allowCustomText = chipsInput.allowCustomText;

        $scope.dropdownEnabled = chipsInput.dropdownEnabled;

        $scope.customList = chipsInput.customList;

        $scope.maxlength = chipsInput.maxlength;

        $scope.chips = chipsInput.chips;

        $scope.disabled = chipsInput.disabled;

        $scope.focusedElement = 0;

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
                'border': chipsInput.input.border,
                'color': chipsInput.input.color,
                'background': chipsInput.input.background,
                'max-width': chipsInput.input.maxWidth
            };
        };

        $scope.loadInputContainerStyles = function () {
            return {
                'margin': chipsInput.inputContainer.margin,
                'max-width': chipsInput.inputContainer.maxWidth,
                'position': chipsInput.inputContainer.position,
                'display': chipsInput.inputContainer.display
            };
        };

        $scope.dropdownWrapperStyles = function () {
            return {
                'background': chipsInput.dropdownWrapper.background,
                'border': chipsInput.dropdownWrapper.border,
                'boxShadow': chipsInput.dropdownWrapper.boxShadow,
                'z-index': chipsInput.dropdownWrapper.zIndex,
                'position': chipsInput.dropdownWrapper.position
            };
        };

        $scope.dropOptionStyles = function () {
            return {
                'padding': chipsInput.dropOption.padding,
                'cursor': chipsInput.dropOption.cursor
            };
        };

        $scope.focusedElementStyles = function () {
            return {
                'padding': chipsInput.dropOption.padding,
                'cursor': chipsInput.dropOption.cursor,
                'background': chipsInput.focusedElement.background
            };
        };


        //Refresh
        $scope.refresh = function () {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.refreshFiltered = function () {
            $scope.filtered = $filter('filter')(chipsInput.customList, $scope.chipName);
            // $scope.filtered = chipsInput.customList;

            $scope.filtered.forEach(function (item) {
                if (chipsInput.chips.indexOf(item.toLowerCase()) > -1) {
                    $scope.filtered.splice($scope.filtered.indexOf(item), 1);
                    // console.log(item);
                }
            });

            $scope.refresh();
            // console.log($scope.filtered);
        };

        $scope.refreshFiltered();

        $scope.chipNotExists = function (chipName) {
            if (chipsInput.chips.indexOf(chipName.toLowerCase()) <= -1)
                return true;
            else return false;
        };

        $scope.addChipOnClick = function (chipName) {
            chipsInput.addChip(chipName.toLowerCase());
            $scope.refreshFiltered();
            $scope.chipName = '';
        };

        $scope.addChip = function (event) {
            $scope.refreshFiltered();

            if ($scope.chipName == '')
                $scope.focusedElement = 0;

            if (event.keyCode == 8) {
                if ($scope.chipName == '' && $scope.chips.length > 0)
                    chipsInput.popChip();

                $scope.refreshFiltered();
            }

            chipsInput.focus();

            //Save on enter


            if ((event.keyCode == 13 || event.keyCode == 39) && chipsInput.dropdownEnabled && !chipsInput.allowCustomText && $scope.chipName != '') {
                for (var i = $scope.focusedElement; i < $scope.filtered.length; i++) {
                    if (chipsInput.chips.indexOf($scope.filtered[i].toLowerCase()) <= -1) {
                        $scope.addChipOnClick($scope.filtered[i]);
                        $scope.focusedElement = 0;
                        break;
                    }
                }

                $scope.refreshFiltered();
            }

            //Down Arrow
            if (event.keyCode == 40 && $scope.focusedElement < $scope.filtered.length - 1) {
                $scope.focusedElement++;
            }


            //Up Arrow
            if (event.keyCode == 38 && $scope.focusedElement > 0) {
                $scope.focusedElement--;
            }


            if (!$scope.allowCustomText) return;

            if (event.keyCode == 13) {
                if ($scope.chipName != "") {
                    if (chipsInput.chips.indexOf($scope.chipName.toLowerCase()) <= -1)
                        chipsInput.addChip($scope.chipName.toLowerCase());
                    $scope.chipName = '';
                }
                $scope.refreshFiltered();
            } else {
                // chipsInput.getPlaceNames($scope.chipName);
            }

            $scope.refreshFiltered();
            chipsInput.focus();
        };

        $scope.addChipOnBlur = function () {
            // if ($scope.chipName != "" && $scope.allowCustomText) {
            //     chipsInput.addChip($scope.chipName.toLowerCase());
            //     $scope.chipName = '';
            // } else $scope.chipName = '';
        };

        $scope.setFocus = function (index) {
            $scope.focusedElement = index;
            $scope.refreshFiltered();
        };
        // $scope.trimSpace = function (event) {
        //     //Issue : space conflict and input field clear delay
        //     if (event.keyCode == 32)
        //         document.getElementById('input-chip').value = '';
        // };

        $scope.deleteChip = function (index) {
            chipsInput.spliceChip(index);
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


    });

