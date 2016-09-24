'use strict';

/**
* @ngdoc service
* @name aesculapiusFrontApp.auth
* @description
* # auth
* This service allows you to auth into the api using token auth.
*/
angular.module('aesculapiusFrontApp')
.service('auth', ['Restangular', function (Restangular) {
  this.tokenAuthUrl = 'token-auth/';

  this.token = function(credentials){
    if (credentials.username && credentials.password) {
      return Restangular.all(this.tokenAuthUrl).post(credentials)
      .then(
        function(response) {
          Restangular.setDefaultHeaders(
            { Authorization: 'Token ' + response.token }
          );
          window.localStorage.token = response.token;
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

  this.logout = function(){
    window.localStorage.token = "";
  };

}]);
