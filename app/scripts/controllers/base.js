'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:BaseCtrl
 * @description
 * # MainCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('BaseCtrl', ['$scope', '$location', 'auth', 'aeData', '$rootScope', '$mdMenu', '$window',
    function($scope, $location, auth, aeData, $rootScope, $mdMenu, $window) {

      $scope.me = aeData.me;

      $scope.goToDialog = function(ev, dontFetch){
        $rootScope.showDialog(ev, {'value':$scope.me.id}, dontFetch);
      };

      $scope.$on('setMe', function() {
        $scope.me = aeData.me;
      });

      $scope.logout = function() {
        auth.logout();
        $location.path("/login");
      };

      $scope.openManual = function() {
        $window.open('https://docs.google.com/document/d/1Zhz7KRrrfJcfBtfEPrP8LC0ECz6LPUeHdw6JpBrfIQI/preview', '_blank');
      };

      $scope.mdCloseMenu = function(isOpen) {
        if (isOpen) {
          $mdMenu.hide();
        }
      };

      $scope.getCurrentView = function() {
        return aeData.currentView;
      };

    }
  ]);
