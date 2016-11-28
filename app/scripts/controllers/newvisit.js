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
          response.push(' ');
          return response;
        });
      };

      $scope.itemText = function(item){
        return aeData.nameOf(item);
      };

      $scope.cancel = function(){
        $scope.detail = "";
        $scope.selectedItemPeople = "";
        $scope.filterTextP = "";
        $scope.newVisitForm.detail.$touched=false;
        $scope.newVisitForm.person.$touched=false;
      };

      $scope.$on('profileAdded', function(br, person){
        $scope.peopleList();
        $scope.selectedItemPeople = person.person;
      });

      $scope.goToDialog = function(ev, id){
        var fakeScope = {'value':id};
        $rootScope.showDialog(ev, fakeScope);
      };

      $scope.done = function() {
        var data = {
          'patient': $scope.selectedItemPeople.id,
          'detail': $scope.detail
        };
        allVisits.post(data).then(
          function(response){
            var text = 'Nueva consulta añadida a la Historia Clinica de '+ response.patient_name;
            aeData.visit = response;
            $rootScope.showActionToast(text ,
             {'currentTarget':{'id':'visit'}}, {'value':response.id}, 5000);
            $scope.cancel();
          },
          function(error){
            if(error.data.patient){
              $rootScope.showActionToast('Hubo un error al realizar la consulta','error',
              'El paciente es inexistente.');
            }else{
              $rootScope.showActionToast('Hubo un error al realizar la consulta','error',
              error);
            }
            $scope.cancel();
          }
        );
      };
  }]);
