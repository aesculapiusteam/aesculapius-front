'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:NewvisitCtrl
 * @description
 * # NewvisitCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('NewvisitCtrl', ['$scope','Restangular', function ($scope, Restangular){

    var allProfiles = Restangular.all('profiles');
    $scope.date = new Date();

    $scope.peopleList = function(){
      return allProfiles.getList({search: $scope.filterTextP, limit:5}).then(
        function(response){
          response.push('necesito esto para el boton añadir en el autocomplete');
          return response;
        });
      };
  }]);
