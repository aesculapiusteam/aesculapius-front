'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:PeopleCtrl
* @description
* # PeopleCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){
  angular.module('aesculapiusFrontApp')
  .controller('PeopleCtrl',['$scope', 'Restangular',
  function ($scope, Restangular){
    $scope.filterText = "";
    var allProfiles = Restangular.all('profiles');
    var loadPageCallbackWithDebounce;

    $scope.$watch('filterText', function(){
      if(loadPageCallbackWithDebounce){
        loadPageCallbackWithDebounce();
      }
    });

    $scope.getLoadResultsCallback = function (loadPageCallback){
      loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
    };

    $scope.refreshTable = function (page, pageSize){
      var offset = (page-1) * pageSize;
      return allProfiles.getList({search: $scope.filterText, limit: pageSize, offset:offset}).then(function(result){
        return {
          results: result,
          totalResultCount: result.count
        };
      });
    };

  }]);
}());
