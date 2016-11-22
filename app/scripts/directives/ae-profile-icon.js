'use strict';

/**
 * @ngdoc directive
 * @name aesculapiusFrontApp.directive:aeProfileIcon
 * @description
 * # aeProfileIcon
 */
angular.module('aesculapiusFrontApp')
  .directive('aeProfileIcon', function () {
    var palette = [
      '#f44336', // Red
      '#e91e63', // Pink
      '#9c27b0', // Purple
      '#673ab7', // Deep Purple
      '#3f51b5', // Indigo
      '#2196f3', // Blue
      '#03a9f4', // Light Blue
      '#00bcd4', // Cyan
      '#009688', // Teal
      '#4caf50', // Green
      '#8bc34a', // Light Green
      '#cddc39', // Lime
      '#ffeb3b', // Yellow
      '#ffc107', // Amber
      '#ff9800', // Orange
      '#ff5722', // Deep Orange
      '#795548', // Brown
      '#9e9e9e', // Grey
      '#607d8b', // Blue Grey
    ];
    return {
      template:
        '<div md-ink-ripple="{{ripple}}">' +
        '<div class="{{classes}}"' +
        ' style="cursor:pointer; margin:8px; width:{{size}}px; height:{{size}}px;' +
        ' background-color:{{color}}; float:left; border-radius:50%; color:white;' +
        ' font-size:{{size/2}}px; text-align:center; line-height:{{size}}px;">' +
          '{{letter}}' +
        '</div>' +
        '<md-tooltip>{{name}}</md-tooltip>' +
        '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.size = attrs.size || 32;
        scope.letter = (attrs.name + "?").charAt(0).toUpperCase();
        scope.color = attrs.color || palette[Math.floor(Math.random() * palette.length)];
        scope.name = attrs.name;
        scope.classes = "";
        scope.ripple = false;

        if (attrs.type !== "charge") {
          scope.classes = "hoverable-shadow hoverable unselectable";
          scope.ripple = scope.color;
          element.bind('click', function(){
            var ev = {currentTarget: {id: attrs.type || 'profile'}};
            var fakeScope = {'value': attrs.id};
            scope.$root.showDialog(ev, fakeScope);
          });
        } else {
          if (attrs.name === 'doctor') {
            scope.name = "Doctor/a";
            scope.color = '#2196f3';
          }
          else if (attrs.name === 'secretary') {
            scope.name = "Secretario/a";
            scope.color = '#ff9800';
          }
        }
      }
    };
  });
