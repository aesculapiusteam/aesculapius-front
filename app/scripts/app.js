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
    'ngMessages',
    'ngRoute',
    'ngMaterial',
    'mdDataTable',
    'restangular'
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

      // TODO: decide what to do with this: Unused since we are using age
      // instead of birth_date, let here for possible future reutilization
      $mdDateLocaleProvider.formatDate = function(date) {
        if (date) {
          return moment(date).format('DD/MM/YYYY');
        }
        return '';
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
        if (scope && (scope.value || scope.value === 0)) {
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
            if(!aeData.isConfirmThere){ // If confirm dialog is not there, then open it
              if (scope && (scope.value || scope.value === 0)){
                aeData.onDialogClose(aeData[ev.currentTarget.id], ev.currentTarget.id, scope.value);
              } else {
                aeData.onDialogClose(aeData[ev.currentTarget.id], ev.currentTarget.id);
              }
            }
          }
        });
      };

      $rootScope.showConfirm = function(dialogInfo, products, action) {
        var text = ''; // Title of the confirm dialog
        var buttonText = ''; // Text of the OK button
        var cancelText = ''; // Text for the cancel button
        var toastConfirmText = ''; // Text that the toast will have if saved/deleted
        var nexus = ''; // Text for joining sentences, with plural or singular nexus
        aeData.dialogInfo = dialogInfo; // Dialog info contains an array with the type of dialog to open and an ID
        // Example for dialogInfo -> ['drug', 7]
        switch (action) {
          case 'close':
            buttonText = 'Salir de todos modos';
            cancelText = 'Seguir editando';
            text = 'Hay modificaciones sin guardar. Si sale ahora perderá todos los cambios.';
            break;
          case 'delete':
            buttonText = 'Eliminar';
            cancelText = 'Cancelar';
            if(products[0].name){ // Drug
              nexus = products.length === 1 ? ' este será removido' : ', estos serán removidos';
              text = 'Al eliminar ' + aeData.itemsInText(products) +
                nexus + ' permanentemente del sistema.';
              toastConfirmText = aeData.itemsInText(products) + ' eliminados con exito!';
            }else if(products[0].first_name || products[0].profile){ // Employees and Profiles
              text = 'Al eliminar a ' + aeData.nameOf(products[0]) +
              ', este no aparecerá más en el sistema, sin embargo podrá ser restaurado luego.';
              toastConfirmText = aeData.nameOf(products[0]) + ' eliminado con exito!';
            }else{ // Visit
              text = 'Al eliminar la visita de ' + products[0].patient_name +
              ', esta no aparecerá más en el sistema, sin embargo podrá ser restaurado luego.';
              toastConfirmText = 'Visita de ' + products[0].patient_name + ' eliminada con exito!';
            }
            break;
        }
        aeData.isConfirmThere = true; // the confirm dialog is open

        var confirm = $mdDialog.confirm()//show the dialog!
          .title(text)
          .textContent('')
          .ariaLabel('confirm-dialog')
          .ok(buttonText)
          .cancel(cancelText);

        $mdDialog.show(confirm).then(function() {// If OK
          aeData.isConfirmThere = false;
          if(action==='delete'){
            var removeFn = function(x){// One function to delete them all, one function to rule them all
              products[x].remove().then(
                function(){
                  aeData.reloadSelectedTable();//If the action has succeded reload selected table
                  $mdToast.show( // and show the toast
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
              removeFn(x);//run function the times needed to delete all products
            }
          }
        }, function() {//If CANCEL
          aeData.isConfirmThere = false;
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

      $rootScope.showActionToast = function(text, ev, scope, delay, notModal){
        var toast = $mdToast.simple()
      .textContent(text)
      .action(notModal || 'VER')
      .highlightAction(true)
      .highlightClass('md-primary')
      .position('bottom right')
      .hideDelay(delay || 3000);

      $mdToast.show(toast).then(function(response) {
        if ( response === 'ok' ) {
          if(ev === 'error'){
            $rootScope.showAlert((scope.data && scope.data.detail) || scope);
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
