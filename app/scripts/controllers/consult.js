'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:ConsultCtrl
 * @description
 * # ConsultCtrl
 * Controller of the aesculapiusFrontApp
 */

angular.module('aesculapiusFrontApp')
  .controller('ConsultCtrl', ['$scope', '$mdDialog', 'Restangular', 'aeData', '$mdToast', '$rootScope',
  function ($scope, $mdDialog, Restangular, aeData, $mdToast, $rootScope) {

    $scope.enable = true;
    $scope.visit = aeData.visitObj;
    $scope.detail = $scope.visit.detail;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.edit = function() {
      if ($scope.enable === true){
        $scope.enable = false;
      }else{
        $scope.enable = true;
      }
    };

    $scope.delete = function(){
      $rootScope.showConfirm(['consult', $scope.visit.id],
      [$scope.visit], 'delete');
    };

    $scope.save = function(){
      var errorDetail = aeData.visitObj.detail;
      var errorDate = aeData.visitObj.datetime;
      aeData.visitObj.detail = $scope.detail;
      aeData.visitObj.datetime = Date();
      aeData.visitObj.put().then(
        function(response){
          $rootScope.showActionToast('Consulta guardada con exito!',
           {'currentTarget':{'id':'consult'}}, {'value':response.id});
          $mdDialog.cancel();
          aeData.reloadHistoryTable();
        },
        function(error){
          aeData.visitObj.detail = errorDetail;
          aeData.visitObj.datetime = errorDate;
          $mdDialog.cancel();
          $rootScope.showActionToast('Lamentablemente hubo un error al editar la consulta.','error',
           error);
        }
      );
    };
  }]);
