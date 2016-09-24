'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:BaseCtrl
* @description
* # MainCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('BaseCtrl', ['$scope', '$location', 'auth',
function ($scope, $location, auth) {
  $scope.logout = function(){
    auth.logout();
    $location.path("/login");
  };

}]);
