'use strict';

describe('Controller: ProfilesCtrl', function () {

  // load the controller's module
  beforeEach(module('aesculapiusFrontApp'));

  var ProfilesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilesCtrl = $controller('ProfilesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfilesCtrl.awesomeThings.length).toBe(3);
  });
});
