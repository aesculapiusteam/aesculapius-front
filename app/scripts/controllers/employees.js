'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:EmployeesCtrl
* @description
* # EmployeesCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){


  angular.module('aesculapiusFrontApp')
  .controller('EmployeesCtrl', ['$scope', '$mdToast', 'Restangular',
  function($scope, $mdToast, Restangular){
    $scope.filterText = "";
    var allEmployees = Restangular.all('employees');
    var loadPageCallbackWithDebounce;

    $scope.$watch('filterText', function(){
      if(loadPageCallbackWithDebounce){
        loadPageCallbackWithDebounce();
      }
    });

    $scope.getLoadResultsCallback = function (loadPageCallback){
      loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
    };

    $scope.refreshTable = function (page, pageSize){
      var offset = (page-1) * pageSize;
      return allEmployees.getList({search: $scope.filterText, limit: pageSize, offset:offset}).then(function(result){
        return {
          results: result,
          totalResultCount: result.count
        };
      });
    };

  }]);
}());
