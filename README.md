# Chips Generater
Add chips input field to your Angular App!

![capture](https://cloud.githubusercontent.com/assets/14832322/20634354/01f8a3dc-b376-11e6-90b3-2de59dd10b72.JPG)

##Bower :

Install using Bower

`bower install chips-input`

##Import Script

`<script src="bower_components/chips-input/chips-input.js"></script>`

##Dependencies

- Angular

##Usage

###Pass **chips-input** as a dependency to your module.

`var app = angular.module('myApp', ['chips-input']);`

###Inject **chipsInput** service to your controller.

`app.controller('myCtrl', function ($scope, chipsInput)`

##Use **chips-input** tags in your HTML

`<chips-input></chips-input>`

That's it! You are good to go.

##Options

###Initialize Chips with your controller.

`chipsInput.init(["Hey", "Billy"]);`

###Rounded Chips

![capture](https://cloud.githubusercontent.com/assets/14832322/20646998/e5f59d32-b4ad-11e6-89fa-ef51f8fd3719.JPG)

Call this function to get rounded chips, or just use custom styles.

`chipsInput.roundedChip();`

###Custom Chip Styles

You can either pass your style object or single pair.

`$scope.myChipStyle = { color : 'white', background: 'black', height : '50px', fontSize : '25px'};`

`chipsInput.chipStyle($scope.myChipStyle);`

or

`chipsInput.chipStyle('color', 'grey');`


Available Options : 

* chipsInput.chipStyle()

* chipsInput.inputStyle()

* chipsInput.closeBtnStyle()


##INFO

You can access your chips array here : 

`$scope.chips = chipsInput.chips;`
