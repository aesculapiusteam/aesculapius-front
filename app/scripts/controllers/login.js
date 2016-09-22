'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('LoginCtrl', ['$scope', '$location', 'login',
  function ($scope, $location, login) {
    if (window.localStorage.token) {
      $location.path("/people"); //TODO DRY make this a login method
    }
    $scope.credentials = {
      username: '',
      password: ''
    };
    $scope.logIn = function() {
      login.token(this.credentials).then(
        function(response) {
          console.log(response);
          $location.path("/people");
        },
        function(response) {
          console.log(response);
        }
      );
    };
  }
]);
