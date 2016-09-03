'use strict';

/**
 * @ngdoc directive
 * @name aesculapiusFrontApp.directive:ngConsult
 * @description
 * # ngConsult
 */
angular.module('aesculapiusFrontApp')
  .directive('ngConsult', function () {
    return {
      templateUrl: '/views/ngConsult.html',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the ngConsult directive');
      // }
    };
  });
