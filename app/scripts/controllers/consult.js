'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:ConsultCtrl
 * @description
 * # ConsultCtrl
 * Controller of the aesculapiusFrontApp
 */

angular.module('aesculapiusFrontApp')
  .controller('ConsultCtrl', ['$scope', '$mdDialog', 'Restangular',
  function ($scope, $mdDialog, Restangular) {
    $scope.visitList = [];
    Restangular.all('visits').getList().then(
      function(response){
        $scope.visitList = response;
      }
    );

    function consultDialog ($scope, $mdDialog, $mdToast, buttons, visit,
      date, doctor, patient) {
      angular.element(document).ready(function () {
        $scope.htmlVar = {
          'doctor':doctor,
          'patient':patient,
          'date':date,
          'detail':visit.detail,
          'buttons':buttons,
          'enable':true,
        };
      });
      $scope.change = function(){
        $scope.htmlVar.buttons[0] = false;
      };

      $scope.save = function(){
        var errorDetail = visit.detail;
        var errorDate = visit.datetime;
        visit.detail = $scope.htmlVar.detail;
        visit.datetime = Date();
        visit.put().then(
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
            visit.detail = errorDetail;
            visit.datetime = errorDate;
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

      $scope.edit = function() {
        if ($scope.htmlVar.enable === true){
          $scope.htmlVar.enable = false;
        }else{
          $scope.htmlVar.enable = true;
        }
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }
    $scope.showTabDialog = function(ev, visitList, pos) {
      var visit = visitList[pos];
      $scope.doctor = "";
      $scope.patient = "";
      Restangular.one('employees', visit.doctor).get().then(
        function(response){
          $scope.doctor = response.profile.first_name + " " +
          response.profile.last_name;
          Restangular.one('profiles', visit.pacient).get().then(
            function(response){
              $scope.patient = response.first_name + " " + response.last_name;
              $mdDialog.show({
                controller: consultDialog,
                templateUrl: 'views/consult.tmpl.html',
                locals: {buttons:[true,false,false,false], visit:visit,
                  doctor:$scope.doctor, patient:$scope.patient,
                  date:visit.datetime},
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  escapeToClose: true,
                });
            }
          );
        }
      );
    };
  }]);
