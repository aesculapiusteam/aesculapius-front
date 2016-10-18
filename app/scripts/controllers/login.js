'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('LoginCtrl', ['$scope', '$location', 'auth', '$rootScope', '$mdToast',
    function($scope, $location, auth, $rootScope, $mdToast) {
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
            $mdToast.show(
              $mdToast.simple()
              .textContent(response.data.non_field_errors[0])
              .position('bottom right')
              .hideDelay(2000)
            );
          }
        );
      };
    }
  ]);
