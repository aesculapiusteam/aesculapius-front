'use strict';

describe('Controller: StockCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var StockCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockCtrl = $controller('StockCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StockCtrl.awesomeThings.length).toBe(3);
  });
});
