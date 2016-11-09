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
        '<div md-ink-ripple="{{color}}">' +
        '<div class="hoverable-shadow hoverable unselectable"' +
        ' style="cursor:pointer; margin:8px; width:{{size}}px; height:{{size}}px;' +
        ' background-color:{{color}}; float:left; border-radius:50%; color:white;' +
        ' font-size:{{size/2}}px; text-align:center; line-height:{{size}}px;">' +
          '{{letter}}' +
        '</div>' +
        '</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.size = attrs.size || 32;
        scope.letter = (attrs.name + "?").charAt(0).toUpperCase();
        scope.color = palette[Math.floor(Math.random() * palette.length)];
      }
    };
  });
