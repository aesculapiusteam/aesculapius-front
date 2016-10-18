'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:ConsultCtrl
 * @description
 * # ConsultCtrl
 * Controller of the aesculapiusFrontApp
 */

angular.module('aesculapiusFrontApp')
  .controller('ConsultCtrl', ['$scope', '$mdDialog', 'Restangular', 'aeData', '$mdToast',
  function ($scope, $mdDialog, Restangular, aeData, $mdToast) {

    $scope.enable = true;
    $scope.visit = aeData.visitObj;
    $scope.detail = $scope.visit.detail;
    $scope.saveButton = true;

    $scope.cancel = function() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('No se han hecho modificaciones')
        .position('bottom right')
        .hideDelay(2000)
      );
      $mdDialog.cancel();
    };

    $scope.edit = function() {
      if ($scope.enable === true){
        $scope.enable = false;
      }else{
        $scope.enable = true;
      }
    };

    $scope.change = function(){
      $scope.saveButton = false;
    };

    $scope.delete = function(){
      aeData.visitObj.remove().then(
        function(){
          $mdDialog.cancel();
          $mdToast.show(
            $mdToast.simple()
            .textContent('Consulta eliminada con exito!')
            .position('top', 'left')
            .hideDelay(3000)
          );
          aeData.reloadHistoryTable();
        },
        function(){
          $mdDialog.cancel();
          $mdToast.show(
            $mdToast.simple()
            .textContent('Lamentablemente hubo un error al eliminar la consulta.')
            .position('top', 'left')
            .hideDelay(3000)
          );
        }
      );
    };

    $scope.save = function(){
      var errorDetail = aeData.visitObj.detail;
      var errorDate = aeData.visitObj.datetime;
      aeData.visitObj.detail = $scope.detail;
      aeData.visitObj.datetime = Date();
      aeData.visitObj.put().then(
        function(){
          $mdDialog.cancel();
          $mdToast.show(
            $mdToast.simple()
            .textContent('Consulta guardada con exito!')
            .position('top', 'left')
            .hideDelay(3000)
          );
          aeData.reloadHistoryTable();
        },
        function(){
          aeData.visitObj.detail = errorDetail;
          aeData.visitObj.datetime = errorDate;
          $mdDialog.cancel();
          $mdToast.show(
            $mdToast.simple()
            .textContent('Lamentablemente hubo un error al editar la consulta.')
            .position('top', 'left')
            .hideDelay(3000)
          );
        }
      );
    };
  }]);
