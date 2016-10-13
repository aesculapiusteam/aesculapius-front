'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:HistoryCtrl
* @description
* # HistoryCtrl
* Controller of the aesculapiusFrontApp
*/

angular.module('aesculapiusFrontApp')
.controller('HistoryCtrl', ['$scope',
 'Restangular','aeData', '$location', '$rootScope',
function ($scope, Restangular, aeData, $location, $rootScope) {

  if(!aeData.historyId){
    $location.path('profiles');
  }

  Restangular.one('profiles', String(aeData.historyId)).get().then(function(response){
    $scope.patientName = response.first_name + " " + response.last_name;
    return $scope.patientName;
  });

  $scope.getData = function (page, pageSize){
    var offset = (page-1) * pageSize;
    return Restangular.all('visits').getList({pacient:aeData.historyId, limit: pageSize, offset:offset}).then(function(result){
      return {
        results: result,
        totalResultCount: result.count
      };
    });
  };

  $scope.goToDialog = function (id, ev, that){
    Restangular.one('visits', id).get()
    .then(function(response){
      aeData.visitObj = response;
      $rootScope.showDialog(ev, that);
      return response;
    });
  };
}]);
