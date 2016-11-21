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
      .when('/visit', {
        templateUrl: 'views/visit.html',
        controller: 'VisitCtrl',
        controllerAs: 'visit'
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

      $rootScope.showDialog = function(ev, scope, dontFetch) {
        if (scope && scope.value) {
          if (!dontFetch){
            if(aeData[ev.currentTarget.id + 's']){
              aeData[ev.currentTarget.id] = aeData[ev.currentTarget.id + 's'].get(scope.value).$object;
            } else {
              aeData[ev.currentTarget.id] = Restangular.one(ev.currentTarget.id + 's', scope.value).get().$object;
            }
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
          onRemoving: function (){
            aeData.onDialogClose(aeData[ev.currentTarget.id], ev.currentTarget.id, scope.value);
          }
        });
      };

      $rootScope.showConfirm = function(dialogInfo, products, action) {
        var text = '';
        var buttonText = '';
        var toastConfirmText = '';
        aeData.dialogInfo = dialogInfo;
        switch (action) {
          case 'close':
            buttonText = 'Salir';
            text = '¿Esta seguro que desea salir? Los cambios no seran guardados.';
            break;
          case 'delete':
            buttonText = 'Eliminar';
            if(products[0].name){
              text = '¿Esta seguro que desea eliminar ' + aeData.itemsInText(products) + '?';
              toastConfirmText = aeData.itemsInText(products) + ' eliminados con exito!';
            }else if(products[0].first_name || products[0].profile){
              text = '¿Esta seguro que desea eliminar a ' + aeData.nameOf(products[0]) + '?';
              toastConfirmText = aeData.nameOf(products[0]) + ' eliminado con exito!';
            }else{
              text = '¿Esta seguro que desea eliminar la visita de ' + products[0].patient_name + '?';
              toastConfirmText = 'Visita de ' + products[0].patient_name + ' eliminada con exito!';
            }
            break;
        }
        var confirm = $mdDialog.confirm()
          .title(text)
          .textContent('')
          .ariaLabel('confirm-dialog')
          .ok(buttonText)
          .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
          if(action==='delete'){

            var removeFn = function(x){
              if(aeData.dialogInfo){
                aeData.reloadSelectedTable();
              }
              products[x].remove().then(
                function(){
                  if (aeData.selected !== 'drug'){
                    aeData.reloadSelectedTable();
                  }
                  $mdToast.show(
                    $mdToast.simple()
                    .textContent(toastConfirmText)
                    .position('bottom right')
                    .hideDelay(3000)
                  );
                }, function(error){
                  $rootScope.showActionToast('Lamentablemente hubo un error al eliminar '+ aeData.itemsInText(products),'error',
                   error);
                }
              );
            };

            for (var x = 0; x < products.length; x++) {
              removeFn(x);
            }
          }
        }, function() {
          if(aeData.dialogInfo){
            $rootScope.showDialog({'currentTarget':{'id':aeData.dialogInfo[0]}}, {'value':aeData.dialogInfo[1]}, true);
          }
          aeData.reloadSelectedTable();
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
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink')
      .warnPalette('red');
  });
