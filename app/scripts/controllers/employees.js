'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:EmployeesCtrl
* @description
* # EmployeesCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){
  'use strict';

  angular.module('aesculapiusFrontApp')
  .controller('EmployeesCtrl', function($scope, $mdToast){



    $scope.employeesList = [
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },{
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },
      {
        type: 'Profecional',
        name: 'Alfachoca Tracalanduda',
        specialty: 'Pediatría',
      },


    ];
  });
}());
