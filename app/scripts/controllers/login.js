'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('LoginCtrl', ['$scope', '$location', 'auth',
function ($scope, $location, auth) {
  if (window.localStorage.token) {
    $location.path("/profiles"); //TODO DRY make this a succesfulLogin method or similar
  }
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.logIn = function() {
    auth.token(this.credentials).then(
      function(response) {
        $location.path("/profiles");
      },
      function(response) {
        console.log(response);
      }
    );
  };
}
]);
