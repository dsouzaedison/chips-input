angular.module('myModule', ['chips-input'])
    .controller('myCtrl', function ($scope, chipsInput) {
        // chipsInput.enableAutofocus();
        chipsInput.init(["hi", "billy"]);
    });