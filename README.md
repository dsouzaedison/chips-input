# Chips Generater
Add chips input field to your Angular App!

![capture](https://cloud.githubusercontent.com/assets/14832322/20634354/01f8a3dc-b376-11e6-90b3-2de59dd10b72.JPG)

#Customized Suggestions
Provide typing suggestions with custom values!

![image](https://cloud.githubusercontent.com/assets/14832322/21467267/0b757d88-ca0d-11e6-9003-53ec62b81b17.png)

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

```
chipsInput.init({
  chips: ["hey", "billy"], 
  chipStyle : {
     color: '#91d6f0', 
     background: '#f4f4f4', 
     height: '40px'
    }, 
    closeBtnStyle : {
      color : '#888'
    }, 
    inputStyle : {
      background : 'inherit'
    }, 
    autofocus: true, 
    maxlength: 10, 
    chipType : 'rounded',
    allowCustomText: true, 
    dropdownEnabled : true, 
    customList : ['NodeJS', 'EmberJS', 'KnockoutJS', 'AngularJS']
});
```

###Rounded Chips

![capture](https://cloud.githubusercontent.com/assets/14832322/20646998/e5f59d32-b4ad-11e6-89fa-ef51f8fd3719.JPG)

Call this function to get rounded chips, or just use custom styles.

`chipsInput.roundedChip();`

###Custom Chip Styles

You can either pass your style object or single pair.

```
$scope.myChipStyle = { color : 'white', background: 'black', height : '50px', fontSize : '25px'};

chipsInput.chipStyle($scope.myChipStyle);
```

or

`chipsInput.chipStyle('color', 'grey');`


Available Options : 

* chipsInput.chips (); &nbsp;&nbsp;//Initial chips to be added.

* chipsInput.chipType ();  &nbsp;&nbsp;// Options : 'rounded' ( Default will be Sharp Edges )

* chipsInput.autofocus ();  &nbsp;&nbsp;// Focus chips input on load.

* chipsInput.maxlength ();  &nbsp;&nbsp;// Maxlength for input field.

* chipsInput.chipStyle ();  &nbsp;&nbsp;// Accepts Object with CSS property : value pairs, or a pair a strings.

* chipsInput.inputStyle ();   &nbsp;&nbsp;// Accepts Object with CSS property : value pairs, or a pair a strings.

* chipsInput.closeBtnStyle ();   &nbsp;&nbsp;// Accepts Object with CSS property : value pairs, or a pair a strings.



##INFO

You can access your chips array here : 

`$scope.chips = chipsInput.chips;`
