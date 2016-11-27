angular.module('myModule', ['chips-input'])
    .controller('myCtrl', function ($scope, chipsInput) {
        // chipsInput.enableAutofocus();
        chipsInput.init({chips: ["hey", "billy"], chipStyle : {color: '#91d6f0', 'background': '#f4f4f4', 'height': '40px'}, closeBtnStyle : {color : '#888'}, inputStyle : {background : 'inherit'}, autofocus: true, maxlength: 10, chipType : 'rounded'});

        // chipsInput.roundedChip();

        chipsInput.inputStyle({color: '#fff'});

        // chipsInput.chipStyle('background', 'black');
        // chipsInput.closeBtnStyle('color', 'red');
        // chipsInput.inputStyle('background', 'orange');

    });