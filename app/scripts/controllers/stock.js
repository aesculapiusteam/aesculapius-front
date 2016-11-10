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

        var deleteInConfirm = function(products){
          for (var x = 0; x < products.length; x++) {
            Restangular.one('drugs', products[x].id).remove().then(
            );
          }
        };

        aeData.reloadStockTable = function(){
          $scope.refreshTable();
        };

        $scope.deleteRowCallback = function(rows) {
          var products = [];
          for (var i=0;i<aeData.drugs.length;i++){
            if (aeData.drugs[i].id === rows[i]){
              products.push(aeData.drugs[i]);
            }
          }
          $rootScope.showConfirm(null, products, 'delete', deleteInConfirm, aeData.reloadStockTable);
        };


      }
    ]);
}());
