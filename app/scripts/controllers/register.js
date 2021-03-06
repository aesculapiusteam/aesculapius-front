'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('RegisterCtrl', ['$scope', 'Restangular', '$mdToast', 'aeData',
    '$rootScope', '$location', '$timeout', '$anchorScroll',
    function($scope, Restangular, $mdToast, aeData, $rootScope, $location, $timeout, $anchorScroll) {
      $scope.saving = false; // Will be true after pressing the save button
      $scope.detail = '';
      $scope.selectedItemPeople = '';
      $scope.nActions = [{
        'capital': '',
        'drug': '',
        'quantity': '',
        'detail': '',
        'type': ''
      }];
      var allProfiles = Restangular.all('profiles');
      var allDrugs = Restangular.all('drugs');

      $scope.itemText = function(item) {
        return aeData.nameOf(item);
      };

      $scope.done = function() {
        $scope.saving = true;
        var finalItems = [];
        for (var i = 0; i < $scope.nActions.length; i++) {
          var dic = {};
          dic.detail = $scope.nActions[i].detail;
          dic.movement_type = parseInt($scope.nActions[i].capital);
          if (dic.movement_type === 0) {
            dic.drug = $scope.nActions[i].drug.id;
            dic.drug_quantity = parseInt($scope.nActions[i].quantity);
          } else {
            dic.cash = parseFloat($scope.nActions[i].quantity).toFixed(2);
          }
          dic.is_donation = !!parseInt($scope.nActions[i].type);
          finalItems.push(dic);
          if (($scope.nActions[i].drug.quantity - parseInt($scope.nActions[i].quantity)) < 0 &&
            !dic.is_donation) {
            $rootScope.showActionToast('No tienes esta cantidad de ' + $scope.nActions[i].drug.name + '. Revisa el Stock', {
              'currentTarget': {
                'id': 'drug'
              }
            }, {
              'value': $scope.nActions[i].drug.id
            });
          }
        }
        var finalDic = {
          'profile': $scope.selectedItemPeople.id,
          'items': finalItems
        };
        Restangular.all('movements').post(finalDic).then(
          function(postData) {
            aeData.movement = postData;
            Restangular.all('movements').getList().then(function(movements) {
              aeData.movements = movements;
              $rootScope.showActionToast('Todas las acciones se han completado',
               {'currentTarget':{'id':'movement'}}, {'value':aeData.movement.id});
            });
            $scope.cancel();
          },
          function(error) {
            $rootScope.showActionToast('Hubo un error al intentar completar el proceso.', 'error',
              error);
          }
        ).then(function() { $scope.saving = false; });
      };

      $scope.showOrHide = function(select) {
        if (select === '0') {
          return false;
        } else {
          return true;
        }
      };

      $scope.peopleList = function() {
        return allProfiles.getList({
          search: $scope.filterTextP,
          limit: 3
        }).then(
          function(response) {
            response.push(' '); //necesito esto para el boton añadir en el autocomplete
            return response;
          });
      };

      $scope.drugList = function() {
        return allDrugs.getList({
          search: this.filterTextM,
          limit: 3
        }).then(
          function(response) {
            response.push(' '); //necesito esto para el boton añadir en el autocomplete
            return response;
          });
      };

      $scope.addAction = function() {
        $scope.nActions.push({
          'capital': '',
          'drug': '',
          'quantity': '',
          'detail': '',
          'type': ''
        });
        $timeout(function() {
          $anchorScroll('bottom');
        });
      };

      $scope.deleteAction = function(pos) {
        if ($scope.nActions.length > 1) {
          $scope.nActions.splice($scope.nActions.indexOf(pos), 1);
        }
      };

      $scope.cancel = function() {
        $scope.registerForm.capital.$touched = false;
        if ($scope.registerForm.drug) {
          $scope.registerForm.drug.$touched = false;
        }
        $scope.registerForm.person.$touched = false;
        $scope.registerForm.type.$touched = false;
        $scope.registerForm.quantity.$touched = false;
        $scope.selectedItemPeople = null;
        $scope.nActions = [{
          'capital': '',
          'drug': '',
          'quantity': '',
          'detail': '',
          'type': ''
        }];
      };

      $scope.goToDialog = function(ev, pos) {
        aeData.pos = pos;
        $rootScope.showDialog(ev);
      };

      $scope.goToMovements = function() {
        $location.path('movements');
      };

      $scope.$on('drugAdded', function(br, drug) {
        $scope.drugList();
        $scope.nActions[aeData.pos].drug = drug.drug;
      });

      $scope.$on('profileAdded', function(br, person) {
        $scope.peopleList();
        $scope.selectedItemPeople = person.person;
      });

    }
  ]);
