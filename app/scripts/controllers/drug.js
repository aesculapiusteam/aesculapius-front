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
    .controller('DrugCtrl', ['$scope', '$rootScope', '$mdDialog', 'Restangular', 'aeData',
      function($scope, $rootScope, $mdDialog, Restangular, aeData) {
        $scope.drug = aeData.drug;
        $scope.nullDrug = $scope.drug != null;

        $scope.add = function() {
          Restangular.all('drugs').post($scope.drug).then(
            function(response) {
              $scope.cancel();
              $rootScope.showActionToast($scope.drug.name + ' ha sido añadido.',
               {'currentTarget':{'id':'drug'}}, {'value':response.id});
              $rootScope.$broadcast('drugAdded', {drug:response});
              aeData.reloadStockTable();
            },
            function(error) {
              $rootScope.showActionToast('Lamentablemente hubo un error al añadir el Medicamento.','error',
               error);
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
              function(response) {
                $scope.cancel();
                $rootScope.showActionToast($scope.drug.name + ' ha sido modificado.',
                 {'currentTarget':{'id':'drug'}}, {'value':response.id});
                aeData.reloadStockTable();
              },
              function(error) {
                $rootScope.showActionToast('Lamentablemente hubo un error al editar el Medicamento.','error',
                 error);
              }
            );
          }
        };

        $scope.delete = function() {
          $scope.drug.remove();
          $scope.cancel();
          aeData.reloadStockTable();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

      }
    ]);
}());
