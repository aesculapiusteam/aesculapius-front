'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:NewvisitCtrl
 * @description
 * # NewvisitCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('NewvisitCtrl', ['$scope','Restangular', '$mdToast', '$rootScope', 'aeData',
   function ($scope, Restangular, $mdToast, $rootScope, aeData){

    var allProfiles = Restangular.all('profiles');
    var allVisits = Restangular.all('visits');
    $scope.date = new Date();

    $scope.peopleList = function(){
      return allProfiles.getList({search: $scope.filterTextP, limit:5}).then(
        function(response){
          response.push('necesito esto para el boton añadir en el autocomplete');
          return response;
        });
      };

      $scope.itemText = function(item){
        return aeData.nameOf(item);
      };

      $scope.cancel = function(){
        $scope.detail = "";
        $scope.selectedItemPeople = "";
      };

      $scope.goToDialog = function(ev, id){
        var fakeScope = {'value':id};
        $rootScope.showDialog(ev, fakeScope);
      };

      $scope.$on('profileAdded', function(br, person){
        $scope.peopleList();
        $scope.selectedItemPeople = person.person;
      });

      $scope.done = function() {
        var data = {
          'patient': $scope.selectedItemPeople.id,
          'detail': $scope.detail
        };
        allVisits.post(data).then(
          function(response){
            var text = 'Nueva consulta añadida a la Historia Clinica de '+ response.patient_name;
            aeData.visitObj = response;
            $rootScope.showActionToast(text ,
             {'currentTarget':{'id':'consult'}}, {'value':response.id});
            // $mdToast.show(
            //   $mdToast.simple()
            //   .textContent('Nueva consulta añadida a la Historia Clinica de '+
            //   $scope.selectedItemPeople.first_name + " " + $scope.selectedItemPeople.last_name)
            //   .position('bottom right')
            //   .hideDelay(3000)
            // );
            $scope.cancel();
          },
          function(){
            $mdToast.show(
              $mdToast.simple()
              .textContent('Hubo un error al realizar la consulta, ¿esta usted logueado?')
              .position('bottom right')
              .hideDelay(3000)
            );
            $scope.cancel();
          }
        );
      };
  }]);
