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

      $scope.saving = false; // Will be true after pressing the save button
      $scope.person = {};

      if (aeData[aeData.selected]){
        $scope.person = aeData[aeData.selected];
        if(aeData[aeData.selected].id) {
          $scope.nullProfile = false;
        }
      } else {
        aeData[aeData.selected] = $scope.person;
        $scope.nullProfile = true;
      }

      $scope.isEmployeeForm = aeData.selected === "employee";
      if ($scope.isEmployeeForm) {
        $scope.toastId = 'employee';
        $scope.allEmployees = Restangular.all('employees').getList().$object; //XXX CODIGO RANCIO, estoy cargando todos los employees cada vez que quiero editar uno
        $scope.person.repeatPassword = "";
        $scope.person.assist_ed = $scope.person.assist_ed || []; //XXX CODIGO RANCIO
        $scope.person.charge = $scope.person.charge || "secretary"; //XXX CODIGO RANCIO
      } else {
        $scope.toastId = 'profile';
      }

      $scope.$watch('profileForm', function() {
        aeData.form = $scope.profileForm;
        if (aeData.form && $scope.person) { //dont do is dirty if undefined because of dialog closed
          aeData.isDirty($scope.person);
        }
      });

      var stopPersonWatcher = $scope.$watch('person', function(person) {
        // This watcher is executed until the the person is loaded from the api.
        // It ends with the call to stopPersonWatcher function.

        // XXX Questionable: We are setting a watcher here because there is no signal
        // when a profile is completely loaded from the api. This shuld be executed
        // after a proper signal.

        // Transforms the api birth_date property into the ui age property.
        if (_.isEmpty(person)) {
          return;
        } else {
          if ($scope.person.profile && $scope.person.profile.birth_date) {
            $scope.person.profile.age = moment().diff($scope.person.profile.birth_date, 'years');
          } else if ($scope.person.birth_date) {
            $scope.person.age = moment().diff($scope.person.birth_date, 'years');
          }
          stopPersonWatcher();
        }
      }, true);

      $scope.add = function() {
        $scope.saving = true;
        if ($scope.isEmployeeForm && !$scope.passwordsMatch()) {
          $mdToast.show( //XXX CODIGO RANCIO MUCHOS MD TOAST QUE HACNE LO MISMO SIMPLIFICAR
            $mdToast.simple()
            .textContent('Debe escribir dos veces su nueva contraseña y deben coincidir.')
            .position('bottom right')
            .hideDelay(2000)
          );
          $scope.saving = false;
          return;
        }

        Restangular.all(aeData.selected + 's').post($scope.person).then( //XXX CODIGO RANCIO la +'s' QUE RANCIO!!!!
          function(response) {
            $scope.cancel();
            $scope.personName = aeData.nameOf(response);
            $rootScope.showActionToast($scope.personName + ' ha sido añadido.', {
              'currentTarget': {
                'id': $scope.toastId
              }
            }, {
              'value': response.id
            });
            $rootScope.$broadcast('profileAdded', {
              person: response
            });
            aeData.reloadSelectedTable();
            $scope.saving = false;
          },
          function(error) {
            $rootScope.showActionToast('Lamentablemente hubo un error al añadir la pesona.', 'error', error);
            $scope.saving = false;
          }
        ).then(function() { $scope.saving = false; });
      };

      $scope.save = function() {
        $scope.saving = true;
        if ($scope.person.profile) {
            $scope.person.profile.birth_date = moment().subtract($scope.person.profile.age, "years").format("YYYY-MM-DD");
        } else {
            $scope.person.birth_date = moment().subtract($scope.person.age, "years").format("YYYY-MM-DD");
        }
        $scope.profileForm.$submitted = true; //for the confirm dialog on close not to open
        if (!aeData[aeData.selected].id) {
          // Must create a new person
          this.add();
        } else {
          // Must modify an existing person TODO
          if ($scope.isEmployeeForm && !$scope.passwordsMatch(true)) { //XXX CODIGO RANCIO ESTA ARRIBA IGUAL
            $mdToast.show( //XXX CODIGO RANCIO MUCHOS MD TOAST QUE HACNE LO MISMO SIMPLIFICAR
              $mdToast.simple()
              .textContent('Debe escribir dos veces su nueva contraseña y deben coincidir.')
              .position('bottom right')
              .hideDelay(2000)
            );
            $scope.saving = false;
            return;
          }
          if (!$scope.person.password) { //XXX CODIGO RANCIO
            delete $scope.person.password;
          }
          Restangular.copy($scope.person).save().then(
            function(response) {
              $scope.cancel();
              $scope.personName = aeData.nameOf(response);
              $rootScope.showActionToast($scope.personName + ' ha sido modificado.', {
                'currentTarget': {
                  'id': $scope.toastId
                }
              }, {
                'value': response.id
              });
              aeData.reloadSelectedTable();
              $scope.saving = false;
            },
            function(error) {
              $rootScope.showActionToast('Lamentablemente hubo un error al modificar la informacion.', 'error', error);
              $scope.saving = false;
            }
          ).then(function() { $scope.saving = false; });
        }
      };

      $scope.delete = function() {
        if ($scope.isEmployeeForm) {
          $scope.id = $scope.person.profile.id;
          $scope.proOrEm = 'employee';
        } else {
          $scope.id = $scope.person.id;
          $scope.proOrEm = 'profile';
        }
        $rootScope.showConfirm([$scope.proOrEm, $scope.id], [$scope.person], 'delete');
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.assistEdSelection = function(id) {
        $scope.profileForm.$pristine = false;
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

      $scope.shouldBeAssistedBy = function(type) {
        return type === 'doctor' ? 'secretary' : 'doctor';
      };

      $scope.isNew = function() {
        return $scope.nullProfile || !$scope.person.id;
      };

      $scope.passwordsMatch = function(forEdit) {
        var repeatPassword = $scope.person.repeatPassword;
        var passwordsExistsAndMatch = $scope.person.password &&
          $scope.person.repeatPassword && $scope.person.repeatPassword === $scope.person.password;
        if (forEdit) {
          if (!repeatPassword) { // If there is no repeat password, the password will not change, but the other properties will
            $scope.person.password = "";
          }
          return !repeatPassword || passwordsExistsAndMatch;
        }
        return passwordsExistsAndMatch;
      };
    }
  ]);
