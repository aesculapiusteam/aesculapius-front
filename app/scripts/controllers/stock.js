'use strict';

/**
 * @ngdoc function
 * @name aesculapiusFrontApp.controller:StockCtrl
 * @description
 * # StockCtrl
 * Controller of the aesculapiusFrontApp
 */
angular.module('aesculapiusFrontApp')
  .controller('StockCtrl', function($scope, $mdToast){

        $scope.saveRowCallback = function(row){
            $mdToast.show(
                $mdToast.simple()
                    .content('Row changed to: '+row)
                    .hideDelay(3000)
            );
        };

        $scope.nutritionList = [
            {
                name: "ibutuvieja",
                quantity: 6,
                detail: "es un medicamento así como re loco",
            },
            {
                name: "ibutuvieja",
                quantity: 6,
                detail: "es un medicamento así como re loco",
            },
            {
                name: "ibutuvieja",
                quantity: 6,
                detail: "es un medicamento así como re loco",
            }
        ];
    });
