'use strict';

/**
 * @ngdoc service
 * @name aesculapiusFrontApp.aeData
 * @description
 * # aeData
 * Service in the aesculapiusFrontApp.
 */
angular.module('aesculapiusFrontApp')
  .service('aeData', function () {
    this.me = null; // Current logged in restangular employee
    this.profile = null; // Current selected restangular profile
    this.profiles = null; // Current displayed restangular profiles in /profiles
    this.employees = null; // Current displayed restangular employees in /employees
    this.visitObj = null; // TODO Document this object
    this.reloadHistoryTable = null; // Execute this function to reload the history table
    this.historyId = null; // TODO Document this object
  });
