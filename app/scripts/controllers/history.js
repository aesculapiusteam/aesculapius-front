'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:HistoryCtrl
* @description
* # HistoryCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('HistoryCtrl', ['$scope', 'Restangular','aeData', function ($scope, Restangular, aeData) {

  $scope.getData = function (page, pageSize){
    var offset = (page-1) * pageSize;
    return Restangular.all('visits').getList({pacient:aeData.historyId, limit: pageSize, offset:offset}).then(function(result){
      return {
        results: result,
        totalResultCount: result.count
      };
    });
  };

}]);
