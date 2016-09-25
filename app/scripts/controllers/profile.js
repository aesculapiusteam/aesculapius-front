'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:ProfileCtrl
* @description
* # ProfileCtrl
* Controller of the aesculapiusFrontApp
*/
var DialogController = function ($scope, $mdDialog) {
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
};

angular.module('aesculapiusFrontApp')
.controller('ProfileCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/profile.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      escapeToClose: true,
    });
  };
}]);
