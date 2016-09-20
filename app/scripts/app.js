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

    //set the base url for api calls on our RESTful services
    var newBaseUrl = "";
    if (window.location.hostname === "localhost") {
      newBaseUrl = "http://localhost:8000/api/";
    } else {
      var deployedAt = window.location.href.substring(0, window.location.href);
      newBaseUrl = deployedAt + "/api/";
    }
    RestangularProvider.setBaseUrl(newBaseUrl);
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      var extractedData;
      if (operation === "getList" && data.results) {
        extractedData = data.results;
      } else {
        extractedData = data;
      }
      return extractedData;
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
