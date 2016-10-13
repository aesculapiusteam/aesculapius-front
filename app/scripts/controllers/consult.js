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
        .textContent('Nada ha cambiado')
        .position('top', 'left')
        .hideDelay(3000)
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


  // $scope.showTabDialog = function(ev, visitList, pos) {
  //   var visit = visitList[pos];
  //   $scope.doctor = "";
  //   $scope.patient = "";
  //   Restangular.one('employees', visit.doctor).get().then(
  //     function(response){
  //       $scope.doctor = response.profile.first_name + " " +
  //       response.profile.last_name;
  //       Restangular.one('profiles', visit.pacient).get().then(
  //         function(response){
  //           $scope.patient = response.first_name + " " + response.last_name;
  //           $mdDialog.show({
  //             controller: consultDialog,
  //             templateUrl: 'views/consult.tmpl.html',
  //             locals: {buttons:[true,false,false,false], visit:visit,
  //               doctor:$scope.doctor, patient:$scope.patient,
  //               date:visit.datetime},
  //               parent: angular.element(document.body),
  //               targetEvent: ev,
  //               clickOutsideToClose:true,
  //               escapeToClose: true,
  //             });
  //         }
  //       );
  //     }
  //   );
  // };
  }]);
