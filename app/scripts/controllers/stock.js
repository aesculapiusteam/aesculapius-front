'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:StockCtrl
 * @description
 * # StockCtrl
 * Controller of the aesculapiusFrontApp
 */
(function() {
  angular.module('aesculapiusFrontApp')
    .controller('StockCtrl', [
      '$scope', '$rootScope', '$mdDialog', 'Restangular', 'aeData',
      function($scope, $rootScope, $mdDialog, Restangular, aeData) {
        $scope.filterText = "";
        var allDrugs = Restangular.all('drugs');
        var loadPageCallbackWithDebounce;

        $scope.$watch('filterText', function() {
          if (loadPageCallbackWithDebounce) {
            loadPageCallbackWithDebounce();
          }
        });

        $scope.getLoadResultsCallback = function(loadPageCallback) {
          loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
          aeData.reloadStockTable = loadPageCallback;
        };

        $scope.refreshTable = function(page, pageSize) {
          var offset = (page - 1) * pageSize;
          return allDrugs.getList({
            search: $scope.filterText,
            limit: pageSize,
            offset: offset
          }).then(function(result) {
            aeData.drugs = result;
            return {
              results: result,
              totalResultCount: result.count
            };
          });
        };

        $scope.deleteRowCallback = function(rows) {
          for (var row = 0; row < rows.length; row++) {
            Restangular.one('drugs', rows[row]).remove();
          }
          aeData.reloadStockTable();
        };


      }
    ]);
}());
