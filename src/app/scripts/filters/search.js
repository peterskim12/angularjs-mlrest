'use strict';

angular.module('newAppbuilder2App.filters.search', [])
  .filter('group', function () {
    return function (input, groupSize) {
      if (input) {
        var finalItems = [];
        var numGroups = Math.ceil(input.length / groupSize);

        for (var i = 0; i < numGroups; i++) {
          finalItems.push(input.slice(i*groupSize, i*groupSize + groupSize));
        }
        return finalItems;
      }

    };
  })
  .filter('facetGroupLabel', ['facetConfig', function(facetConfig) {
    return function (input) {
      if (input) {
        if (facetConfig.facets[input] && facetConfig.facets[input].label && facetConfig.facets[input].label.hasOwnProperty('_value')) {
          return facetConfig.facets[input].label._value;
        } else {
          return input;
        }
      }
    };
  }])
;
