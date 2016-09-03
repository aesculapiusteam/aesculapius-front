'use strict';

describe('Directive: ngConsult', function () {

  // load the directive's module
  beforeEach(module('aesculapiusFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-consult></ng-consult>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngConsult directive');
  }));
});
