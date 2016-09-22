'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:HistoryCtrl
* @description
* # HistoryCtrl
* Controller of the aesculapiusFrontApp
*/
var DialogController = function ($scope, $mdDialog) {

  $scope.consultList = [
    {
      Fecha: '2016-01-06T00:43:43.931Z',
      Medico: 'Alfachoca Tracalanduda',
      Descripcion: 'esto describe',
    },
    {
      Fecha: '2016-09-06T00:43:43.931Z',
      Medico: 'pamparama',
      Descripcion: 'gripe y fiebre',
    },


  ];
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
};


angular.module('aesculapiusFrontApp')
.controller('HistoryCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/history.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      escapeToClose: true,
    });
  };
}]);
