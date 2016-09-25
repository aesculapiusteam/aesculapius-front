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
    // $scope.keysearch = "";
    var allEmployees = Restangular.all('employees');
    // allEmployees.getList().then(function(response){
    //   $scope.employees = response;
    // });

    // $scope.search = function(){
    //   if ($scope.keysearch.length >= 3) {
    //     allEmployees.getList({search: $scope.keysearch}).then(function(response){
    //       $scope.employees = response;
    //     });
    //   }
    // };

    var loadPageCallbackWithDebounce;

    $scope.$watch('filterText', function(){
      if(loadPageCallbackWithDebounce){
        console.log("BANANARFRITA2");
        loadPageCallbackWithDebounce();
      }
    });

    $scope.getLoadResultsCallback = function (loadPageCallback){
      console.log("BANANARFRITA3");
      loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 2000);
    };

    $scope.paginatorCallback = function (page, pageSize){
      console.log("BANANARFRITA4");
      // var offset = (page-1) * pageSize;
      // var query = $scope.filterText ? $scope.filterText : '';
      return allEmployees.getList({search: $scope.filterText}).then(function(result){
        return {
          results: result,
          totalResultCount: result.total
        };
      });
    };

  }]);
}());
