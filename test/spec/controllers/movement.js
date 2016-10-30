'use strict';

describe('Controller: MovementCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var MovementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovementCtrl = $controller('MovementCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MovementCtrl.awesomeThings.length).toBe(3);
  });
});
