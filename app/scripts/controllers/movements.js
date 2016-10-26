'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:MovementsCtrl
 * @description
 * # MovementsCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('MovementsCtrl',['$scope', 'Restangular',
   function ($scope, Restangular) {
    $scope.filterText = "";
    var allMovements = Restangular.all('movements');
    var loadPageCallbackWithDebounce;

    $scope.$watch('filterText', function() {
      if (loadPageCallbackWithDebounce) {
        loadPageCallbackWithDebounce();
      }
    });

    $scope.getLoadResultsCallback = function(loadPageCallback) {
      loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
    };

    $scope.refreshTable = function(page, pageSize) {
      var offset = (page - 1) * pageSize;
      return allMovements.getList({
        search: $scope.filterText,
        limit: pageSize,
        offset: offset
      }).then(function(result) {
        return {
          results: result,
          totalResultCount: result.count
        };
      });
    };
  }]);
