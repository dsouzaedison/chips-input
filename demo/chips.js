angular.module('myModule', ['chips-input'])
    .controller('myCtrl', function ($scope, chipsInput) {
        // chipsInput.enableAutofocus();
        chipsInput.init(["hey", "billy"]);
        chipsInput.chipStyle({ color : '#91d6f0', 'background': '#f4f4f4', 'height' : '50px'});
        chipsInput.roundedChip();
        chipsInput.inputStyle({color : '#fff'});
        // chipsInput.disableInput();
        // chipsInput.closeBtnStyle('color', 'red');
        // chipsInput.inputStyle('background', 'orange');
        //
        // setTimeout(function () {
        //     chipsInput.chipStyle('background', 'black');
        // },2000);
        //
        // setTimeout(function () {
        //     chipsInput.chipStyle({'color' : 'white'});
        // },4000);
    });