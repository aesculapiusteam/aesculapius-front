'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:MovementsCtrl
 * @description
 * # MovementsCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('MovementsCtrl',['$scope', 'Restangular', '$rootScope', 'aeData', '$location',
   function ($scope, Restangular, $rootScope, aeData, $location) {
    var allMovements = Restangular.all('movements');
    var loadPageCallbackWithDebounce;
    $scope.filterText = '';
    $scope.yearFilter = '';
    $scope.monthFilter = '';
    $scope.dateFilter = '';
    $scope.fixedFormat = '';
    $scope.fullFilter = $scope.filterText + " " +
                        $scope.yearFilter + " " +
                        $scope.monthFilter + " " +
                        $scope.fixedFormat;


    $scope.getTableData = function(result){
      $scope.tableData = result;
      aeData.movements = result;
      for(var r=0;r<result.length;r++){
        $scope.tableData[r].totalCashIn = null;
        $scope.tableData[r].totalCashOut = null;
        $scope.tableData[r].totalDrugsIn = null;
        $scope.tableData[r].totalDrugsOut = null;
        for (var i=0;i<result[r].items.length;i++){
          if(!!result[r].items[i].movement_type){
            if(result[r].items[i].is_donation){
              $scope.tableData[r].totalCashIn += result[r].items[i].cash;
            }else{
              $scope.tableData[r].totalCashOut += result[r].items[i].cash;
            }
          }else{
            if(result[r].items[i].is_donation){
              $scope.tableData[r].totalDrugsIn += result[r].items[i].drug_quantity;
            }else{
              $scope.tableData[r].totalDrugsOut += result[r].items[i].drug_quantity;
            }
          }
        }
      }
      return $scope.tableData;
    };

    $scope.$watch('dateFilterSelect', function(){
      $scope.yearFilter = '';
      $scope.monthFilter = '';
      $scope.dateFilter = '';
      $scope.fixedFormat = '';
    });

    $scope.goToRegister = function(){
      $location.path('register');
    };

    $scope.$watch('filterText', function() {
      if (loadPageCallbackWithDebounce) {
        loadPageCallbackWithDebounce();
      }
    });

    $scope.$watch('yearFilter', function() {
      if (loadPageCallbackWithDebounce) {
        loadPageCallbackWithDebounce();
      }
    });

    $scope.$watch('monthFilter', function() {
      if (loadPageCallbackWithDebounce) {
        loadPageCallbackWithDebounce();
      }
    });

    $scope.$watch('dateFilter', function() {
      if($scope.dateFilter!==''){
        $scope.fixedFormat = $scope.dateFilter.getFullYear() + " " +
        parseInt($scope.dateFilter.getMonth()+1) + " " +
        $scope.dateFilter.getDate();
      }
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
        search: $scope.filterText + " " +
                $scope.yearFilter + " " +
                $scope.monthFilter + " " +
                $scope.fixedFormat,
        limit: pageSize,
        offset: offset
      }).then(function(result) {
        return {
          results: $scope.getTableData(result),
          totalResultCount: result.count
        };
      });
    };
  }]);
