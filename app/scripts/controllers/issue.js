'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('IssueCtrl', ['$scope', '$rootScope', '$mdDialog', 'Restangular', 'aeData',
    function($scope, $rootScope, $mdDialog, Restangular) {
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.save = function() {
        $scope.issueForm.$submitted = true; //for the confirm dialog on close not to open
        Restangular.all('issues').post($scope.issue).then(
          function(response) {
            $rootScope.showActionToast(
              '¡Gracias por la sugerencia!',
              { 'currentTarget': { 'id': 'issue' } },
              { 'value': response.id },
              3000,
              true
            );
            $mdDialog.cancel();
          },
          function(error) {
            $mdDialog.cancel();
            $rootScope.showActionToast('Lamentablemente hubo un error al editar la consulta.', 'error',
              error);
          }
        );
      };
    }
  ]);
