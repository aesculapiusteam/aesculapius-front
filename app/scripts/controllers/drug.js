'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:DrugCtrl
 * @description
 * # DrugCtrl
 * Controller of the aesculapiusFrontApp
 */
(function() {
  angular.module('aesculapiusFrontApp')
    .controller('DrugCtrl', ['$scope', '$mdDialog', '$rootScope', 'Restangular', 'aeData',
      function($scope, $rootScope, $mdDialog, Restangular, aeData) {

        $scope.addDrug = function() {
          console.log("tuvieja");
          var newDrug = {
            "name": $scope.name,
            "description": $scope.description,
            "quantity": $scope.quantity,
          };
          Restangular.all('drugs').post(newDrug);
          aeData.reloadStockTable();
        };

        $rootScope.cancelAddDrug = function() {
          $mdDialog.cancelAddDrug();
        };

      }
    ]);
}());
