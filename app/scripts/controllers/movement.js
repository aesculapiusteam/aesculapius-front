'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:MovementCtrl
 * @description
 * # MovementCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('MovementCtrl', ['$scope', 'aeData', '$mdDialog',
  function ($scope, aeData, $mdDialog) {
    $scope.movement = aeData.movement;

    $scope.cancel = function(){
      $mdDialog.cancel();
    };
  }]);
