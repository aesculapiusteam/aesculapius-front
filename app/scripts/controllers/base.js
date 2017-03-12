'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:BaseCtrl
 * @description
 * # MainCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('BaseCtrl', ['$scope', '$location', 'auth', 'aeData', '$rootScope', '$mdMenu',
    function($scope, $location, auth, aeData, $rootScope, $mdMenu) {

      $scope.me = aeData.me;

      $scope.goToDialog = function(ev){
        $rootScope.showDialog(ev, {'value':$scope.me.id});
      };

      $scope.$on('setMe', function() {
        $scope.me = aeData.me;
      });

      $scope.logout = function() {
        auth.logout();
        $location.path("/login");
      };

      $scope.mdCloseMenu = function(isOpen) {
        if (isOpen) {
          $mdMenu.hide();
        }
      };

    }
  ]);
