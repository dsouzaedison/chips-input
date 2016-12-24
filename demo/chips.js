angular.module('myModule', ['chips-input'])
    .controller('myCtrl', function ($scope, $filter,chipsInput) {
        // chipsInput.enableAutofocus();
        chipsInput.init({allowCustomText: false, dropdownEnabled : true, customList : ['NodeJS', 'EmberJS', 'KnockoutJS', 'AngularJS'], chips: ["hey", "billy"], chipStyle : {color: '#91d6f0', 'background': '#f4f4f4', 'height': '40px'}, closeBtnStyle : {color : '#888'}, inputStyle : {background : 'inherit'}, autofocus: true, maxlength: 20, chipType : 'rounded'});

        // chipsInput.roundedChip();

        // chipsInput.inputStyle({color: '#fff'});

        // chipsInput.clear();
        // chipsInput.chipStyle('background', 'black');
        // chipsInput.closeBtnStyle('color', 'red');
        // chipsInput.inputStyle('background', 'orange');

        // $scope.name = ['one', 'two', 'three', 'edison', 'jason'];
        // var fil = $filter('filter')($scope.name, "e");
        // console.log(fil);
    });