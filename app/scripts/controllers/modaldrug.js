'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:ModaldrugCtrl
* @description
* # ModaldrugCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('ModaldrugCtrl', [
  '$scope', '$mdDialog', '$rootScope', 'aeData',
  function ($scope, $mdDialog, $rootScope, aeData) {
    $scope.drug = {};

    $rootScope.cancel = function() {
      $mdDialog.cancel();
    };

  }]);
