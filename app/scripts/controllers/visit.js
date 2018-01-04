'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:VisitCtrl
 * @description
 * # VisitCtrl
 * Controller of the aesculapiusFrontApp
 */

angular.module('aesculapiusFrontApp')
  .controller('VisitCtrl', ['$scope', '$mdDialog', 'Restangular', 'aeData', '$mdToast', '$rootScope',
  function ($scope, $mdDialog, Restangular, aeData, $mdToast, $rootScope) {

    $scope.saving = false; // Will be true after pressing the save button
    $scope.enable = true;
    $scope.visit = aeData.visit;

    $scope.$watch('visitForm', function() {
      aeData.form = $scope.visitForm;
      if(aeData.form){//dont do is dirty if undefined because of dialog closed
        aeData.isDirty($scope.visit);
      }
    });

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.edit = function() {
      $scope.enable = !$scope.enable;
    };

    $scope.delete = function(){
      $rootScope.showConfirm(['consult', $scope.visit.id],
      [$scope.visit], 'delete');
    };

    $scope.save = function(){
      $scope.saving = true;
      $scope.visitForm.$submitted = true; //for the confirm dialog on close not to open
      var errorDetail = $scope.visit.detail;
      var errorDate = $scope.visit.datetime;
      $scope.visit.datetime = new Date();
      Restangular.copy($scope.visit).save().then(
        function(response){
          $rootScope.showActionToast('Consulta guardada con éxito!',
           {'currentTarget':{'id':'visit'}}, {'value':response.id});
          $mdDialog.cancel();
          aeData.reloadHistoryTable();
          $scope.saving = false;
        },
        function(error){
          $scope.visit.detail = errorDetail;
          $scope.visit.datetime = errorDate;
          $mdDialog.cancel();
          $rootScope.showActionToast('Lamentablemente hubo un error al editar la consulta.','error', error);
          $scope.saving = false;
        }
      ).then(function() { $scope.saving = false; });
    };
  }]);
