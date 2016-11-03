'use strict';

/**
 * @ngdoc directive
 * @name aesculapiusFrontApp.directive:aeProfileIcon
 * @description
 * # aeProfileIcon
 */
angular.module('aesculapiusFrontApp')
  .directive('aeProfileIcon', function () {
    return {
      template: '<div  md-ink-ripple="true" md-whiteframe="2" class="unselectable" style="cursor:pointer;margin:8px;width:{{size}}px;height:{{size}}px;background-color:#49F;float:left;border-radius:{{size/2}}px;color:white;font-size:{{size/2}}px;text-align:center;line-height:{{size}}px;">{{letter}}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.size = attrs.size || 32;
        scope.letter = (attrs.name + "A").charAt(0);

        element.bind('click', function(){
          console.log(scope.value);
          console.log("ME Estoy ejecutando");
          //if es un employee o profile
          var ev = {currentTarget: {id: 'profile'}};
          var fakeScope = {'value': attrs.id};
          scope.$root.showDialog(ev, fakeScope);
        });
      }
    };
  });
