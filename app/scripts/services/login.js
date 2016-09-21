'use strict';

/**
* @ngdoc service
* @name aesculapiusFrontApp.login
* @description
* # login
* This service allows you to login into the api using token auth.
*/
angular.module('aesculapiusFrontApp')
.service('login', ['Restangular', function (Restangular) {
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
        'username and password fields to login.token()'
    );
    }
  };
}]);
