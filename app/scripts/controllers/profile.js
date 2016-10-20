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
    '$scope', '$mdDialog', '$rootScope', 'aeData', 'Restangular', '$mdToast',
    function($scope, $mdDialog, $rootScope, aeData, Restangular, $mdToast) {
      $scope.person = aeData.getSelected();
      $scope.isEmployeeForm = aeData.selected === "employee";
      if ($scope.isEmployeeForm) {
        $scope.allEmployees = Restangular.all('employees').getList().$object; //XXX CODIGO RANCIO, estoy cargando todos los employees cada vez que quiero editar uno
        $scope.repeat_password = "";
        $scope.person = $scope.person || {}; //XXX CODIGO RANCIO
        $scope.person.assist_ed = $scope.person.assist_ed || []; //XXX CODIGO RANCIO
        $scope.person.charge = $scope.person.charge || "secretary"; //XXX CODIGO RANCIO
      }

      $scope.add = function() {
        if (!$scope.repeat_password || $scope.repeat_password !== $scope.person.password) {
          $mdToast.show( //XXX CODIGO RANCIO MUCHOS MD TOAST QUE HACNE LO MISMO SIMPLIFICAR
            $mdToast.simple()
            .textContent('Debe escribir dos veces su nueva contraseña y deben coincidir.')
            .position('bottom right')
            .hideDelay(2000)
          );
          return;
        }

        Restangular.all(aeData.selected + 's').post($scope.person).then( //XXX CODIGO RANCIO la +'s' QUE RANCIO!!!!
          function() {
            $scope.cancel();
            $mdToast.show( //XXX CODIGO RANCIO MUCHOS MD TOAST QUE HACNE LO MISMO SIMPLIFICAR
              $mdToast.simple()
              .textContent($scope.profile.name + ' ha sido añadido.')
              .position('bottom right')
              .hideDelay(2000)
            );
            aeData.reloadSelectedTable();
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
        if (!aeData.getSelected()) {
          // Must create a new person
          this.add();
        } else {
          // Must modify an existing person TODO
          if ($scope.repeat_password && $scope.person.password !== $scope.repeat_password) {
            $mdToast.show(
              $mdToast.simple()
              .textContent("Las contraseñas no coinciden")
              .position('bottom right')
              .hideDelay(2000)
            );
            return;
          }
        }
      };

      $scope.delete = function() {
        $scope.person.remove().then(
          function() {
            $mdToast.show(
              $mdToast.simple()
              .textContent("Eliminado correctamente")
              .position('bottom right')
              .hideDelay(2000)
            );
            aeData.reloadProfilesTable();
            $mdDialog.cancel();
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

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.assistEdSelection = function(id) {
        console.log($scope.person);
        var pos = $scope.person.assist_ed.indexOf(id);
        if (pos > -1) {
          $scope.person.assist_ed.splice(pos, 1);
        } else {
          $scope.person.assist_ed.push(id);
        }
      };

      $scope.isChecked = function(id) { ///XXX CODIGO RANCIO SE EJECUTA COMO 98 VECES LARPTMDRE!!!!
        return $scope.person.assist_ed.indexOf(id) > -1;
      };

    }
  ]);
