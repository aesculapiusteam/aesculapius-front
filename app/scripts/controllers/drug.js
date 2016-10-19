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
    .controller('DrugCtrl', ['$scope', '$rootScope', '$mdDialog', 'Restangular', 'aeData', '$mdToast',
      function($scope, $rootScope, $mdDialog, Restangular, aeData, $mdToast) {

        $scope.addDrug = function() {
          var newDrug = {
            "name": $scope.name,
            "description": $scope.description,
            "quantity": $scope.quantity,
          };
          Restangular.all('drugs').post(newDrug).then(
            function() {
              $scope.cancel();
              $mdToast.show(
                $mdToast.simple()
                .textContent(newDrug.name + ' ha sido añadido.')
                .position('bottom right')
                .hideDelay(2000)
              );
              aeData.reloadStockTable();
            },
            function(error) {
              $mdToast.show(
                $mdToast.simple()
                .textContent(error.data)
                .position('bottom right')
                .hideDelay(2000)
              );
            }
          );
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

      }
    ]);
}());
