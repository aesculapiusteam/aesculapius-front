'use strict';

describe('Controller: ConsultCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var ConsultCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultCtrl = $controller('ConsultCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultCtrl.awesomeThings.length).toBe(3);
  });
});
