'use strict';

angular.module('newAppbuilder2App.services.marklogic', ['ngResource'])
  .factory('dataSourceNames', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('/v1/resources/chart-data-source');

  })

  .factory('vizConfig', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('/v1/resources/vizConfg');

  })

  .factory('search', function ($resource) {
    return $resource('/v1/search', {q: '', format:'json', options:'all'});
  })

//  .factory('addFacetLinks', ['map', function(facets, currentFacetParamValue, map) {
//    var newFacets = {};
//    var facetMap = map();
//
//  })

//  .factory('generateStructuredFacetQuery', function(queryString) {
//    var
//    var facetSelections = queryString.split('\*__\*');
//
//  })


;
