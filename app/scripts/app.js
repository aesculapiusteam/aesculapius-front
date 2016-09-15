'use strict';

/**
 * @ngdoc overview
 * @name aesculapiusFrontApp
 * @description
 * # aesculapiusFrontApp
 *
 * Main module of the application.
 */
angular
  .module('aesculapiusFrontApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'mdDataTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl',
        controllerAs: 'employees'
      })
      .when('/personas', {
        templateUrl: 'views/personas.html',
        controller: 'PersonasCtrl',
        controllerAs: 'personas'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
