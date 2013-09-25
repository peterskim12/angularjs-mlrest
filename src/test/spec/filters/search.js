'use strict';

describe('Filter: group', function () {

  // load the filter's module
  beforeEach(module('newAppbuilder2App'));

  // initialize a new instance of the filter before each test
  var group;
  beforeEach(inject(function ($filter) {
    group = $filter('group');
  }));

  it('should return the input prefixed with "search filter:"', function () {
    var input = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'];
    var groupSize = 2;
    var expectedResult = [['test1', 'test2'], ['test3', 'test4'], ['test5', 'test6'], ['test7']];
    expect(group(input, groupSize)).toEqual(expectedResult);
  });

});
