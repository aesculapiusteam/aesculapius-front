'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:ProfilesCtrl
* @description
* # ProfilesCtrl
* Controller of the aesculapiusFrontApp
*/
(function(){
  angular.module('aesculapiusFrontApp')
  .controller('ProfilesCtrl',[
  '$scope', '$location', '$rootScope', '$mdDialog', 'Restangular', 'aeData',
  function ($scope, $location, $rootScope, $mdDialog, Restangular, aeData){
    $scope.filterText = "";
    $scope.curId = null;
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
        aeData.profiles = result;
        return {
          results: result,
          totalResultCount: result.count
        };
      });
    };
    $scope.cHistory = function (ev){
      aeData.historyId = ev.currentTarget.parentElement.parentElement.parentElement.children[5].children[0].children[0].attributes[1].nodeValue;
      $location.path('history');
    };

  }]);
}());
