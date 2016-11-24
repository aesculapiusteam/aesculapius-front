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
    'restangular',
    'datetime'
  ])
  .config(['$httpProvider', 'RestangularProvider', '$mdDateLocaleProvider',
    function($httpProvider, RestangularProvider, $mdDateLocaleProvider) {
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
    }
  ])
  .config(['$routeProvider', function($routeProvider) {
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
      .when('/drug', {
        templateUrl: 'views/drug.html',
        controller: 'DrugCtrl',
        controllerAs: 'drug'
      })
      .when('/consult', {
        templateUrl: 'views/consult.html',
        controller: 'ConsultCtrl',
        controllerAs: 'consult'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/newvisit', {
        templateUrl: 'views/newvisit.html',
        controller: 'NewvisitCtrl',
        controllerAs: 'newvisit'
      })
      .when('/movements', {
        templateUrl: 'views/movements.html',
        controller: 'MovementsCtrl',
        controllerAs: 'movements'
      })
      .when('/movement', {
        templateUrl: 'views/movement.html',
        controller: 'MovementCtrl',
        controllerAs: 'movement'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }])
  .run(['$rootScope', 'auth', 'aeData', '$mdDialog', '$mdToast', 'Restangular',
    function($rootScope, auth, aeData, $mdDialog, $mdToast, Restangular) {
      $rootScope.loading = true;
      $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
      });
      $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.loading = false;
      });
      auth.autoLogin();

      $rootScope.showDialog = function(ev, scope) {
        if (scope && scope.value && ev.currentTarget.id !== "consult") { //XXX CODIGO RANCIO !==consult, hay que hacer que todos sean iguales no diferenciar para algunos
          if(aeData[ev.currentTarget.id + 's']){
            aeData[ev.currentTarget.id] = aeData[ev.currentTarget.id + 's'].get(scope.value).$object;
          } else {
            aeData[ev.currentTarget.id] = Restangular.one(ev.currentTarget.id + 's', scope.value).get().$object;
          }

        } else {
          aeData[ev.currentTarget.id] = null;
        }

        //XXX CODIGO RANCIO
        var employeeProfile; //Uses profile.html/ProfileCtrl if is employee because there is not employee.html
        if (ev.currentTarget.id === "employee") {
          employeeProfile = "profile";
        }

        aeData.selected = ev.currentTarget.id;
        $mdDialog.show({
          controller: _.capitalize(employeeProfile || ev.currentTarget.id) + 'Ctrl',
          controllerAs: employeeProfile || ev.currentTarget.id,
          templateUrl: 'views/' + (employeeProfile || ev.currentTarget.id) + '.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          escapeToClose: true,
        });
      };

      $rootScope.showAlert = function(errorText){
        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Error')
          .textContent(errorText)
          .ariaLabel('Alert Dialog')
          .ok('OK')
        );
      };

      $rootScope.showActionToast = function(text, ev, scope, delay){
        var toast = $mdToast.simple()
      .textContent(text)
      .action('VER')
      .highlightAction(true)
      .highlightClass('md-primary')
      .position('bottom right')
      .hideDelay(delay || 3000);

      $mdToast.show(toast).then(function(response) {
        if ( response === 'ok' ) {
          if(ev === 'error'){
            $rootScope.showAlert(scope);
          }else{
            $rootScope.showDialog(ev,scope);
          }
        }
      });
      };
    }
  ])
  .config(function($mdThemingProvider) {

    $mdThemingProvider.definePalette('orangeModifiedA200', {
      '50': 'fff3e0',
      '100': 'ffe0b2',
      '200': 'ffcc80',
      '300': 'ffb74d',
      '400': 'ffa726',
      '500': 'ff9800',
      '600': 'fb8c00',
      '700': 'f57c00',
      '800': 'ef6c00',
      '900': 'e65100',
      'A100': 'ffd180',
      'A200': 'ff9800', // Button is using this one
      'A400': 'ff9100',
      'A700': 'ff6d00',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orangeModifiedA200')
      .warnPalette('red');
  });
