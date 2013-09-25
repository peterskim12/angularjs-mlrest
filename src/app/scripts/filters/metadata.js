'use strict';

angular.module('newAppbuilder2App.filters.metadata', [])
  .filter('getMetadata', function () {
    return function (input, field) {
      if (input) {
        var returnVal = '';
        for (var i = 0; i < input.length; i++) {
          if (input[i].hasOwnProperty(field)) {
            returnVal = input[i][field];
            break;
          }
        }

        return returnVal;
      }
    };
  })



;
