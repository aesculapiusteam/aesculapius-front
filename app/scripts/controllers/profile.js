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
    $scope.profile = aeData.profile;

    console.log($scope.profile);

    $scope.$watch('profile.first_name', function(){
      window.alert($scope.profile.first_name);
      $scope.profile.save();
      $scope.profile.post("Buildings", myBuilding).then(function() {
    console.log("Object saved OK");
    });

    // $scope.saveProfile = function(profilePos){
    //   $scope.x = Restangular.copy($scope.profile);
    //   window.alert($scope.x);
    //   };

    // $scope.$watch('aeData.profile', function(){
    //   window.alert(5 + 6);
    // });

    // $scope.showProfile = function(){
    // };
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
