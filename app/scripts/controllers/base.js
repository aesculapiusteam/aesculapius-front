'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:BaseCtrl
 * @description
 * # MainCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('BaseCtrl', ['$scope', '$location', 'auth', 'aeData',
    function($scope, $location, auth, aeData) {

      $scope.me = aeData.me;

      $scope.$on('setMe', function() {
        $scope.me = aeData.me;
      });

      $scope.logout = function() {
        auth.logout();
        $location.path("/login");
      };

    }
  ]);
