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
      $scope.visitForm.$submitted = true; //for the confirm dialog on close not to open
      var errorDetail = aeData.visit.detail;
      var errorDate = aeData.visit.datetime;
      aeData.visit.detail = $scope.detail;
      aeData.visit.datetime = Date();
      aeData.visit.put().then(
        function(response){
          $rootScope.showActionToast('Consulta guardada con exito!',
           {'currentTarget':{'id':'visit'}}, {'value':response.id});
          $mdDialog.cancel();
          aeData.reloadHistoryTable();
        },
        function(error){
          aeData.visit.detail = errorDetail;
          aeData.visit.datetime = errorDate;
          $mdDialog.cancel();
          $rootScope.showActionToast('Lamentablemente hubo un error al editar la consulta.','error',
           error.data.detail);
        }
      );
    };
  }]);
