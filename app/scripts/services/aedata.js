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
    this.me = null;
    this.profile = null;
    this.profiles = null;
    this.employees = null;
    this.visitObj = null;
    this.reloadHistoryTable = null;
    this.historyId = null;
  });
