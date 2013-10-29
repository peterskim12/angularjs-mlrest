'use strict';

angular.module('newAppbuilder2App', ['newAppbuilder2App.controllers', 'newAppbuilder2App.services.marklogic', 'newAppbuilder2App.filters.search', 'newAppbuilder2App.filters.metadata', 'ui.bootstrap', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'views/main.html',
        controller: 'ResultListCtrl'
      })
      .otherwise({
        redirectTo: '/list'
      });
  })

  .constant('facetConfig', {
    "facets": {
      "award": {
        "name": "award",
        "type": "range",
        "options": {
          "order": "",
          "direction": "",
          "limit": "10",
          "multi-select": "none"
        },
        "label": {
          "lang": "en",
          "_value": "Award"
        },
        "front-page": "false",
        "side-bar": "true",
        "datatype": {
          "collation": "http:\/\/marklogic.com\/collation\/",
          "_value": "xs:string"
        },
        "qnames": {
          "type": "element\/attribute",
          "elem-ns": "http:\/\/marklogic.com\/wikipedia",
          "elem": "nominee",
          "attr-ns": "",
          "attr": "award",
          "field": ""
        },
        "fragment-scope": "",
        "collection-prefix": ""
      }
    }
  })
;
