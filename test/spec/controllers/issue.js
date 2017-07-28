'use strict';

describe('Controller: IssueCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var IssueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IssueCtrl = $controller('IssueCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IssueCtrl.awesomeThings.length).toBe(3);
  });
});
