'use strict';

describe('Controller: PersonasCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var PersonasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonasCtrl = $controller('PersonasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonasCtrl.awesomeThings.length).toBe(3);
  });
});
