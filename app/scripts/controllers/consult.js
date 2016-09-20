'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:ConsultCtrl
 * @description
 * # ConsultCtrl
 * Controller of the aesculapiusFrontApp
 */

var DialogController = function ($scope, $mdDialog, buttons) {
  $scope.myDate = new Date();
  $scope.myDate.setMonth('09');
  $scope.myDate.setFullYear('16');
  $scope.myDate.setDate('09');

  $scope.doctor = "Ricardao Moraleas ";
  $scope.patient = "Braian de Mayo";
  $scope.details = "Aca va lo que tiene el paciente. tipo. no se. enfermadad... quizas tambien la receta no? por ahi... no se";

  $scope.enable = true;
  $scope.buttons = buttons;

  $scope.change = function(){
    $scope.buttons[0] = false;
  };

  $scope.edit = function() {
    if ($scope.enable === true){
      $scope.enable = false;
    }else{
      $scope.enable = true;
    }
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
};


angular.module('aesculapiusFrontApp')
  .controller('ConsultCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    $scope.showTabDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/consult.tmpl.html',
        locals: {buttons:[true,false,false,false]},
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        escapeToClose: true,
      });
    };
  }]);
