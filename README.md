# Chips Generater
Add chips input field to your Angular App!

![capture](https://cloud.githubusercontent.com/assets/14832322/20634354/01f8a3dc-b376-11e6-90b3-2de59dd10b72.JPG)

##Bower :

Install using Bower

`bower install chips-input`

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
