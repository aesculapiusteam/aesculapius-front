'use strict';

/**
* @ngdoc directive
* @name aesculapiusFrontApp.directive:mdtCustomCellButton
* @description
* # mdtCustomCellButton
*/
angular.module('aesculapiusFrontApp')
.directive('mdtCustomCellButton', function () {
  return {
    template: '<md-button class="md-primary"><md-icon>edit</md-icon></md-button>',
  };
});
