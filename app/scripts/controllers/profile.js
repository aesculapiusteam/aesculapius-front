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

      $scope.add = function() {
        Restangular.all(aeData.selected + 's').post($scope.person).then(
          function(response) {
            $scope.cancel();
            $mdToast.show(
              $mdToast.simple()
              .textContent($scope.person.name + ' ha sido añadido.')
              .position('bottom right')
              .hideDelay(2000)
            );
            $rootScope.$broadcast('profileAdded', {person:response});
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
        }
      };

      $scope.delete = function() {
        $scope.profile.remove().then(function() {
          aeData.reloadProfilesTable();
          $mdDialog.cancel();
        });
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

    }
  ]);
