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
  '$scope', '$mdDialog', '$rootScope', 'aeData', 'Restangular',
  function ($scope, $mdDialog, $rootScope, aeData, Restangular) {
    $scope.profile = aeData.profile;
    $scope.saveProfile = function(){

      if (!_.isEmpty($scope.profile)) {
        Restangular.copy($scope.profile).save().then(function() {
          aeData.refreshProfilesTable();
          $mdDialog.cancel();
        });
      }
    };

    $scope.deleteProfile = function(){
      $scope.profile.remove().then(function(){
        aeData.refreshProfilesTable();
        $mdDialog.cancel();
      });
      console.log('El perfil de ' + $scope.profile.first_name + ' se borro');
    };

    $scope.addProfile = function(){

    };

    console.log('AAAAAAAAAAAAA');

    $scope.a = $scope.profile.birth_date;

    $scope.b = new Date($scope.a);
    console.log($scope.b);

    console.log('BBBBBBBBBBB');


    $rootScope.cancel = function() {
      $mdDialog.cancel();
    };

  }]);
