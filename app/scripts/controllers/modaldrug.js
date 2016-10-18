'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:ModaldrugCtrl
* @description
* # ModaldrugCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){
  angular.module('aesculapiusFrontApp')
  .controller('ModaldrugCtrl', ['$scope', '$mdDialog', '$rootScope', 'Restangular', 'aeData',
  function ($scope, $rootScope, $mdDialog, Restangular, aeData) {
    var allDrugs = Restangular.all('drugs');

    $scope.addDrug = function() {
      console.log("tuvieja");
      var newDrug = {
        "name": $scope.name,
        "description": $scope.description,
        "quantity": $scope.quantity,
      };
      Restangular.all('drugs').post(newDrug);

    };

    $rootScope.cancelAddDrug = function() {
      $mdDialog.cancelAddDrug();
    };

  }]);
}());
