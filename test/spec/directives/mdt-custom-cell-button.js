'use strict';

describe('Directive: mdtCustomCellButton', function () {

  // load the directive's module
  beforeEach(module('aesculapiusFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mdt-custom-cell-button></mdt-custom-cell-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mdtCustomCellButton directive');
  }));
});
