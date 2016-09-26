'use strict';

describe('Service: aeData', function () {

  // load the service's module
  beforeEach(module('aesculapiusFrontApp'));

  // instantiate service
  var aeData;
  beforeEach(inject(function (_aeData_) {
    aeData = _aeData_;
  }));

  it('should do something', function () {
    expect(!!aeData).toBe(true);
  });

});
