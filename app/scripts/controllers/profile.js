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

    $scope.profile = function() {
      return aeData.profile;
    };

    $rootScope.cancel = function() {
      $mdDialog.cancel();
    };

  }]);
