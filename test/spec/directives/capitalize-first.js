'use strict';

describe('Directive: capitalizeFirst', function () {

  // load the directive's module
  beforeEach(module('aesculapiusFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<capitalize-first></capitalize-first>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the capitalizeFirst directive');
  }));
});
