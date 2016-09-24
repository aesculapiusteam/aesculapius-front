'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:BaseCtrl
* @description
* # MainCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('BaseCtrl', ['$scope', '$location', 'login',
function ($scope, $location, login) {
  $scope.logout = function(){
    login.logout();
    $location.path("/login");
  };

}]);
