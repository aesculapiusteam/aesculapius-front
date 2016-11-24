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
        if (aeData.drug){
          $scope.drug = aeData.drug;
          if (aeData.drug.id){
            console.log(aeData.drug.id);
            $scope.nullDrug = false;
          }
        } else {
          aeData.drug = $scope.drug;
          $scope.nullDrug = true;
        }

        $scope.$watch('drugForm', function() {
          aeData.form = $scope.drugForm;
          if(aeData.form && $scope.drug){// dont run isDirty() if undefined because of dialog closed
            aeData.isDirty($scope.drug);
          }
        });

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
          $scope.drugForm.$submitted = true; //for the confirm dialog on close not to open
          if (!aeData.drug.id) {
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
          $rootScope.showConfirm(['drug', $scope.drug.id],
          [$scope.drug], 'delete');
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

      }
    ]);
}());
