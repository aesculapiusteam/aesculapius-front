'use strict';

/**
* @ngdoc directive
* @name aesculapiusFrontApp.directive:mdtButton
* @description
* # mdtButton
*/
angular.module('aesculapiusFrontApp')
.directive('mdtButton', function () {
  return {
    restrict: 'EA',
    template: '<md-button class="md-primary"><md-icon>{{icon}}</md-icon>{{text}}</md-button>',
    link: function(scope, element, attributes) {
      scope.icon = attributes.icon;
      scope.text = attributes.text;
    }
  };
});
