'use strict';

/**
* @ngdoc directive
* @name aesculapiusFrontApp.directive:capitalizeFirst
* @description
* # capitalizeFirst
*/
angular.module('aesculapiusFrontApp')
.directive('capitalizeFirst', function ($parse) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if (inputValue === undefined) { inputValue = ''; }
        var capitalized = inputValue.charAt(0).toUpperCase() +
        inputValue.substring(1);
        if(capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized);
          modelCtrl.$render();
        }
        return capitalized;
      };
      modelCtrl.$parsers.push(capitalize);
      capitalize($parse (attrs.ngModel)(scope)); // capitalize initial value
    }
  };
});
