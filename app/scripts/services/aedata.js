'use strict';

/**
 * @ngdoc service
 * @name aesculapiusFrontApp.aeData
 * @description
 * # aeData
 * Service in the aesculapiusFrontApp.
 */
angular.module('aesculapiusFrontApp')
  .service('aeData', function() {
    this.me = null; // Current logged in restangular employee
    this.selected = null; // String, can be profile/employee/drug
    this.profile = null; // Current selected restangular profile
    this.profiles = null; // Current displayed restangular profiles in /profiles
    this.employee = null; // Current selected restangular employee
    this.employees = null; // Current displayed restangular employees in /employees
    this.drug = null; // Current selected restangular drug
    this.drugs = null; // Current displayed restangular drugs in /stock
    this.pos = null; //Current position on an ng-repeat of the actions of register

    this.visitObj = null; // TODO Document this object
    this.reloadHistoryTable = null; // Execute this function to reload the history table
    this.reloadEmployeesTable = null; // Execute this function to reload the employees table
    this.reloadProfilesTable = null; // Execute this function to reload the profiles table
    this.reloadStockTable = null; // Execute this function to reload the stock table
    this.historyId = null; // TODO Document this object

    this.reloadSelectedTable = function() {
      switch (this.selected) {
        case "profile":
          return this.reloadProfilesTable();
        case "employee":
          return this.reloadEmployeesTable();
        case "drug":
          return this.reloadStockTable();
        default:
          return false;
      }
    };

    //A profile can have a last name or not so this will give the full name of the person
    this.nameOf = function(obj){
      if(obj.last_name){
        return obj.first_name + " " + obj.last_name;
      }else if(obj.profile.last_name){
        return obj.profile.first_name + " " + obj.profile.last_name;
      }else if(obj.profile.first_name){
        return obj.profile.first_name;
      }else{
        return obj.first_name;
      }
    };

    this.getSelected = function () {
      return this[this.selected];
    };

  });
