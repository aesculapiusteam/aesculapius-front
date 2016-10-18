'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('LoginCtrl', ['$scope', '$location', 'auth', '$rootScope',
    function($scope, $location, auth, $rootScope) {
      if (window.localStorage.token) {
        $location.path("/profiles"); //TODO DRY make this a succesfulLogin method or similar
      }

      $scope.credentials = {
        username: '',
        password: ''
      };

      $scope.logIn = function() {
        $rootScope.loading = true;
        auth.token(this.credentials).then(
          function() {
            $rootScope.loading = false;
            $location.path("/profiles");
          },
          function(response) {
            $rootScope.loading = false;
            console.log(response);
          }
        );
      };
    }
  ]);
