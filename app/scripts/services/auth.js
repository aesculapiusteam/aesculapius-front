'use strict';

/**
* @ngdoc service
* @name aesculapiusFrontApp.auth
* @description
* # auth
* This service allows you to auth into the api using token auth.
*/
angular.module('aesculapiusFrontApp')
.service('auth', ['Restangular', '$rootScope', 'aeData', function (Restangular, $rootScope, aeData) {
  this.tokenAuthUrl = 'token-auth/';

  this.setMe = function(){
    Restangular.all('employees').get('me').then(
      function(success){
        aeData.me = success;
        $rootScope.$broadcast('setMe');
      },
      function(error){
        console.error("Hubo un error al carger el perfil del usuario logueado");
        console.error(error);
      }
    );
  };

  this.token = function(credentials){
    var self = this;
    if (credentials.username && credentials.password) {
      return Restangular.all(this.tokenAuthUrl).post(credentials)
      .then(
        function(response) {
          $rootScope.authenticated = true;
          Restangular.setDefaultHeaders(
            { Authorization: 'Token ' + response.token }
          );
          window.localStorage.token = response.token;
          self.setMe();
          return response;
        }
      );
    } else {
      throw new Error(
        'You must provide a credentials object with ' +
        'username and password fields to auth.token()'
      );
    }
  };

  this.autoLogin = function(){
    if (window.localStorage.token) {
      $rootScope.authenticated = true;
      Restangular.setDefaultHeaders({
        Authorization: 'Token ' + window.localStorage.token
      });
      this.setMe();
      return true;
    } else {
      return false;
    }
  };

  this.logout = function(){
    delete window.localStorage.token;
    $rootScope.authenticated = false;
  };

}]);
