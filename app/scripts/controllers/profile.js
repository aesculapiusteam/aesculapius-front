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
  '$scope', '$mdDialog', '$rootScope', 'aeData',
  function ($scope, $mdDialog, $rootScope, aeData) {
    $scope.profile = {};

    // $scope.getProfile = function() {
    //   // Caches the profile in $scope, also checks if profiles is an employee
    //   // And if it is, makes a petition to get username, etc.
    //   if (_.isEmpty($scope.profile)) {
    //     console.log(aeData.profile);
    //     if (aeData.profile.employee) {
    //       console.log("ES EMPLOYEE");
    //       //HACER PETICION A EMPLOYEES
    //       // $scope.profile = aeData.profile;
    //     } else {
    //       console.log("NO LO ES EMPLOYEE");
    //       $scope.profile = aeData.profile;
    //     }
    //   }
    //   return $scope.profile;
    // };

    $rootScope.cancel = function() {
      $mdDialog.cancel();
    };

  }]);
