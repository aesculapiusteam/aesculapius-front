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
  .config(['$httpProvider', 'RestangularProvider',
  function ($httpProvider, RestangularProvider) {
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
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
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
      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'PeopleCtrl',
        controllerAs: 'people'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .otherwise({
        redirectTo: '/login'
      });
    }])
    .run(['Restangular', function(Restangular) {
      if (window.localStorage.token) {
        Restangular.setDefaultHeaders(
          { Authorization: 'Token ' + window.localStorage.token }
        );
      }
    }])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink')
      .warnPalette('red');
    });
