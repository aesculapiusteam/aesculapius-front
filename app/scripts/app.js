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
    'ngMaterial',
    'mdDataTable',
    'restangular'
  ])
  .config(['$httpProvider', 'RestangularProvider', '$mdDateLocaleProvider',
  function ($httpProvider, RestangularProvider, $mdDateLocaleProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    var apiUrl = "http://" + window.location.hostname + ":8000/api/";
    RestangularProvider.setBaseUrl(apiUrl);
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      if (operation === "getList" && data.results) {
        var extractedData = data.results;
        extractedData.count = data.count;
        data = extractedData;
      }
      return data;
    });
    $mdDateLocaleProvider.formatDate = function(date) {
      if (date) {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return ("0" + day).slice(-2) + '/' + ("0" + (monthIndex + 1)).slice(-2) + '/' + year;
      }
      return "";
    };
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
      .when('/profiles', {
        templateUrl: 'views/profiles.html',
        controller: 'ProfilesCtrl',
        controllerAs: 'profiles'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/stock', {
        templateUrl: 'views/stock.html',
        controller: 'StockCtrl',
        controllerAs: 'stock'
      })
      .when('/modaldrug', {
        templateUrl: 'views/modaldrug.html',
        controller: 'ModaldrugCtrl',
        controllerAs: 'modaldrug'
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
