'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:EmployeesCtrl
* @description
* # EmployeesCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){


  angular.module('aesculapiusFrontApp')
  .controller('EmployeesCtrl', function($scope, $mdToast){



    $scope.employeesList = [
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },{
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profesional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },


    ];
  });
}());
