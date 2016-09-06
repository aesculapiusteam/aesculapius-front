'use strict';

/**
* @ngdoc function
* @name aesculapiusFrontApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the aesculapiusFrontApp
*/
angular.module('aesculapiusFrontApp')
.controller('LoginCtrl', ["$scope",
  function ($scope) {
    $scope.slides = [{
      title:'1',
      image:'images/foto1.jpg',
      description:'El primer slider.'
    },
    {
      title:'2',
      image:'images/church.jpg',
      description:'El segundo slider.'
    },
    {
      title:'3',
      image:'images/remedios.jpg',
      description:'El tercer slider.'
    }];
  }
]);
