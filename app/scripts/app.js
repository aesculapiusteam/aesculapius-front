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
    'mdDataTable',
    'restangular'
  ])
  .config(function ($routeProvider, $httpProvider, RestangularProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    var apiUrl = "http://" + window.location.hostname + ":8000/api/";
    RestangularProvider.setBaseUrl(apiUrl);
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      if (operation === "getList" && data.results) {
        data = data.results;
      }
      return data;
    });
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
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
