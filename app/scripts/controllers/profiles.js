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

    $scope.cHistory = function (scope){
      aeData.historyId = angular.element(scope)[0].$$prevSibling.value;
      console.log(aeData.historyId);
      $location.path('history');
    };

    $rootScope.showDialog = function(ev, scope) {
      aeData.profile = aeData.profiles.get(scope.value).$object;
      console.log(scope);
      $mdDialog.show({
        controller: _.capitalize(ev.currentTarget.id) + 'Ctrl',
        controllerAs: ev.currentTarget.id,
        templateUrl: 'views/' + ev.currentTarget.id + '.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        escapeToClose: true,
      });
    };

  }]);
}());
