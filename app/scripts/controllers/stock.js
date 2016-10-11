'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:StockCtrl
* @description
* # StockCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('StockCtrl', ['$scope', '$rootScope', '$mdDialog', 'Restangular', 'aeData', function ($scope, $rootScope, $mdDialog, Restangular, aeData) {

  $rootScope.showDrugDialog = function(ev, scope) {
    //aeData.drug = aeData.drugs.get(scope.value).$object;
    $mdDialog.show({
      controller: 'ModaldrugCtrl',
      controllerAs: 'modaldrug',
      templateUrl: 'views/modaldrug.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      escapeToClose: true,
    });
  };


  $scope.nutritionList = [
    {
      namedrug: "ibutuvieja",
      quantity: 6,
      detail: "es un medicamento así como re loco",
    },
    {
      namedrug: "ibutuvieja",
      quantity: 6,
      detail: "es un medicamento así como re loco",
    },
    {
      namedrug: "ibutuvieja",
      quantity: 6,
      detail: "es un medicamento así como re loco",
    }
  ];
}]);
