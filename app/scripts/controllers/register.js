'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('RegisterCtrl',['$scope', 'Restangular','$mdToast', function ($scope, Restangular, $mdToast) {
    $scope.filterText = "";
    $scope.detail = '';
    $scope.selectedItemPeople = '';
    $scope.nActions = [{
      'capital':'',
      'drug':'',
      'quantity':'',
      'detail':'',
      'type':''
    }];
    var allProfiles = Restangular.all('profiles');
    var allDrugs = Restangular.all('drugs');

    $scope.re = function(){
      return false;
    };

    $scope.done = function(){
      var finalItems = [];
      for (var i=0;i<$scope.nActions.length;i++){
        if($scope.nActions[i].capital !== '' &&
        $scope.nActions[i].quantity !== ''&&
        $scope.nActions[i].type !== ''&&
        $scope.selectedItemPeople !== ''
        ){
          var dic = {};
          dic.detail = $scope.nActions[i].detail;
          dic.movement_type = parseInt($scope.nActions[i].capital);
          if (dic.movement_type === 0){
            dic.drug = $scope.nActions[i].drug.id;
            dic.drug_quantity = parseInt($scope.nActions[i].quantity);
          }else{
            dic.cash = parseFloat($scope.nActions[i].quantity);
          }
          dic.is_donation = !!parseInt($scope.nActions[i].type);
          finalItems.push(dic);
        }else{
          $mdToast.show(
            $mdToast.simple()
            .textContent('Debes completar todos los campos!')
            .position('top right')
            .hideDelay(2000)
          );
        }
      }
      var finalDic = {
        'profile':$scope.selectedItemPeople.id,
        'items':finalItems
      };
      Restangular.all('movements').post(finalDic).then(
        function(){
          $scope.cancel();
        },
        function(){
          $mdToast.show(
            $mdToast.simple()
            .textContent('Hubo un error al intentar completar el proceso. Ha completado todos los campos correctamente?')
            .position('top right')
            .hideDelay(3000)
          );
        }
      );
    };

    $scope.showOrHide = function(select){
      if (select === '0'){
        return false;
      }else{
        return true;
      }
    };

    $scope.peopleList = function(){
      return allProfiles.getList({search: $scope.filterTextP, limit:5}).then(
        function(response){
          return response;
        });
    };

    $scope.drugList = function(){
      return allDrugs.getList({search: $scope.filterTextM, limit:5}).then(
        function(response){
          return response;
        });
    };

    $scope.addAction = function(){
      $scope.nActions.push({
        'capital':'',
        'drug':'',
        'quantity':'',
        'detail':'',
        'type':''
      });
    };

    $scope.deleteAction = function(pos){
      $scope.nActions.splice($scope.nActions.indexOf(pos),1);
    };

    $scope.cancel = function(){
      $scope.selectedItemPeople = '';
      $scope.nActions = [{
        'capital':'',
        'drug':'',
        'quantity':'',
        'detail':'',
        'type':''
      }];
    };
  }]);
