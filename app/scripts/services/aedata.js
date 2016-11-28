'use strict';

/**
 * @ngdoc service
 * @name aesculapiusFrontApp.aeData
 * @description
 * # aeData
 * Service in the aesculapiusFrontApp.
 */
angular.module('aesculapiusFrontApp')
  .service('aeData', ['$rootScope', function($rootScope) {
    this.me = null; // Current logged in restangular employee
    this.selected = null; // String, can be profile/employee/drug
    this.profile = null; // Current selected restangular profile
    this.profiles = null; // Current displayed restangular profiles in /profiles
    this.employee = null; // Current selected restangular employee
    this.employees = null; // Current displayed restangular employees in /employees
    this.drug = null; // Current selected restangular drug
    this.drugs = null; // Current displayed restangular drugs in /stock
    this.visits = null; // Current displayed restangular visits in the clinic history
    this.pos = null; // Current position on an ng-repeat of the actions of register
    this.dialogInfo = null; // Current dialog information for the confirm dialogInfo
    this.form = null; // Current form on use
    this.isConfirmThere = null; // Checks if confirm dialog is on

    this.visit = null; // TODO Document this object
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
          case "visit":
            return this.reloadHistoryTable();
        default:
          return false;
      }
    };

    //This will make a cool text with items separated with
    //commas and the last item separated with an 'y'
    this.itemsInText = function(items){
      var lastItem = '';
      var itemNames = [];
      if(items.length>1){
        lastItem = ' y ' + items[items.length-1].name;
        items = items.slice(0, -1);
      }
      for (var i=0;i<items.length;i++){
        itemNames.push(items[i].name);
      }
      return itemNames.join(", ") + lastItem;
    };

    // On closed dialog this will be excecuted
    this.onDialogClose = function(obj, dialogType, id){
      id = id || 0;
      if (this.form.$dirty && !this.form.$submitted){
        $rootScope.showConfirm([dialogType, id],
          obj, 'close');
        obj.isDirty = true;
      }
    };

    this.isDirty = function(obj){
      if(obj.isDirty){
        this.form.$pristine=false;
      }
    };

    //A profile can have a last name or not so this will give the full name of the person
    this.nameOf = function(obj){
      if(obj.last_name){
        return obj.first_name + " " + obj.last_name;
      }else if(obj.profile){
        if(obj.profile.last_name){
          return obj.profile.first_name + " " + obj.profile.last_name;
        }else{
          return obj.profile.first_name;
        }
      }else{
        return obj.first_name;
      }
    };

    this.getSelected = function () {
      return this[this.selected];
    };

  }]);
