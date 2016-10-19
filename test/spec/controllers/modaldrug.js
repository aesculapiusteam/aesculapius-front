'use strict';

describe('Controller: DrugCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var DrugCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrugCtrl = $controller('DrugCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DrugCtrl.awesomeThings.length).toBe(3);
  });
});
