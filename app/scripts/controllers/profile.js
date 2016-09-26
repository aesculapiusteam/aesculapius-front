'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:ProfileCtrl
* @description
* # ProfileCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('ProfileCtrl', [
  '$scope', '$mdDialog', '$rootScope', 'Restangular',
  function ($scope, $mdDialog, $rootScope) {

    $rootScope.cancel = function() {
      $mdDialog.cancel();
    };

  }]);
