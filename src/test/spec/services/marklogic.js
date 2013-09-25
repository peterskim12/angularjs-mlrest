'use strict';

describe('Service: marklogic', function () {

  // load the service's module
  beforeEach(module('newAppbuilder2App'));

  // instantiate service
  var marklogic;
  beforeEach(inject(function (_marklogic_) {
    marklogic = _marklogic_;
  }));

  it('should do something', function () {
    expect(!!marklogic).toBe(true);
  });

});

describe ('Service: map', function() {
  beforeEach(module('newAppbuilder2App.services.marklogic'));

  var map;
  beforeEach(inject(function (_map_) {
    map = _map_;
  }));

  it ('should create map', function () {
    map.put(5, 'crap');
    expect(map.get(5)).toBe('crap');
  })
});