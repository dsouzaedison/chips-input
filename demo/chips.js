angular.module('myModule', ['chips-input'])
    .controller('myCtrl', function ($scope, chipsInput) {
        // chipsInput.enableAutofocus();
        chipsInput.init(["hey", "billy"]);
        // chipsInput.chipStyle('background', 'teal');
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