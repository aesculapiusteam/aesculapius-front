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

//De no haber un profile al que mostrar la historia Clinica. Ir a profiles
  if(!aeData.historyId){
    $location.path('profiles');
  }

  Restangular.one('profiles', String(aeData.historyId)).get().then(function(response){
    $scope.patientName = response.first_name + " " + response.last_name;
    return $scope.patientName;
  });

//Refresca la pagina. reloadHistoryTable esta en aeData para poder refrescar la tabla desde ConsultCtrl
  $scope.getLoadResultsCallback = function (callback){
    aeData.reloadHistoryTable = callback;
  };

//Peticion para setear la info en la tabla. pacient:aeData.historyId es lo que determina el paciente.
  $scope.getData = function (page, pageSize){
    var offset = (page-1) * pageSize;
    return Restangular.all('visits').getList({pacient:aeData.historyId, limit: pageSize, offset:offset}).then(function(result){
      return {
        results: result,
        totalResultCount: result.count
      };
    });
  };

//Setea el objeto Restangular que se necesita en aeData para mostrarla en el dialog ConsultCtrl
  $scope.goToDialog = function (id, ev, that){
    Restangular.one('visits', id).get()
    .then(function(response){
      aeData.visitObj = response;
      $rootScope.showDialog(ev, that);
      return response;
    });
  };
}]);
