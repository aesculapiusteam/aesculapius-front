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
        $scope.drug = aeData.drug;

        $scope.add = function() {
          Restangular.all('drugs').post($scope.drug).then(
            function() {
              $scope.cancel();
              $mdToast.show(
                $mdToast.simple()
                .textContent($scope.drug.name + ' ha sido añadido.')
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
                .hideDelay(5000)
              );
            }
          );
        };

        $scope.save = function() {
          if (!aeData.drug) {
            // Must create a new drug
            this.add();
          } else {
            // Must modify an existing drug
            Restangular.copy($scope.drug).save().then(
              function() {
                $scope.cancel();
                $mdToast.show(
                  $mdToast.simple()
                  .textContent($scope.drug.name + ' ha sido modificado.')
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
                  .hideDelay(5000)
                );
              }
            );
          }
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

      }
    ]);
}());
