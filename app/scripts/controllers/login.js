'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('LoginCtrl', ['$scope', '$location', 'auth', '$rootScope', '$mdToast', 'Restangular', '$routeParams', '$timeout',
    function($scope, $location, auth, $rootScope, $mdToast, Restangular, $routeParams, $timeout) {
      if (window.localStorage.token) {
        $location.path("/profiles"); //TODO DRY make this a succesfulLogin method or similar
      }

      $scope.credentials = {
        username: '',
        password: ''
      };

      var test_doctor = {
        username: 'test_doctor',
        password: 'test_doctor',
      };

      var test_secretary = {
        username: 'test_secretary',
        password: 'test_secretary',
      };

      $scope.logIn = function() {
        $rootScope.loading = true;

        // Change api if testing
        if (_.isEqual($scope.credentials, test_doctor) || _.isEqual($scope.credentials, test_secretary)) {
          Restangular.setBaseUrl("https://aesculapiusdev.pythonanywhere.com/api/");
        }

        auth.token($scope.credentials).then(
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

      // Testing environment
      if ($routeParams.test) {
          $scope.isTesting = true;
      }
      if ($routeParams.test_doctor) {
        $scope.isTesting = true;
        $timeout(function(){$scope.credentials = test_doctor;}, 1000);
        $timeout($scope.logIn, 2000);
      } else if ($routeParams.test_secretary) {
        $scope.isTesting = true;
        $timeout(function(){$scope.credentials = test_secretary;}, 1000);
        $timeout($scope.logIn, 2000);
      }

      $scope.testAs = function(role) {
        if (role === 'doctor') {
          $scope.credentials = test_doctor;
          $timeout($scope.logIn, 250);
        } else if (role === 'secretary') {
          $scope.credentials = test_secretary;
          $timeout($scope.logIn, 250);
        }
      };

    }
  ]);
