'use strict';

describe('Filter: metadata', function () {

  // load the filter's module
  beforeEach(module('newAppbuilder2App'));

  // initialize a new instance of the filter before each test
  var metadata;
  beforeEach(inject(function ($filter) {
    metadata = $filter('metadata');
  }));

  it('should return the input prefixed with "metadata filter:"', function () {
    var text = 'angularjs';
    expect(metadata(text)).toBe('metadata filter: ' + text);
  });

});
