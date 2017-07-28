'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('IssueCtrl', ['$scope', '$mdDialog', 'Restangular', function ($scope, $mdDialog, Restangular) {
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.save = function(){
      $scope.issueForm.$submitted = true; //for the confirm dialog on close not to open
      Restangular.all('issues').post($scope.issue);
      $mdDialog.cancel();
    };
  }]);
