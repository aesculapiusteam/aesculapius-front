'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:HistoryCtrl
* @description
* # HistoryCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('HistoryCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
  var allVisits = Restangular.all('visits');

  $scope.getData = function (page, pageSize){
    var offset = (page-1) * pageSize;
    return allVisits.getList({pacient:6, limit: pageSize, offset:offset}).then(function(result){
      return {
        results: result,
        totalResultCount: result.count
      };
    });
  };

}]);
