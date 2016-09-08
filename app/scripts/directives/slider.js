'use strict';

/**
 * @ngdoc directive
 * @name aesculapiusFrontApp.directive:slider
 * @description
 * # slider
 */
angular.module('aesculapiusFrontApp')
  .directive('slider', function () {
    return {
      templateUrl: '/views/directives/slider.html',
      restrict: 'E'
    };
  });
