'use strict';

angular.module('newAppbuilder2App.controllers', ['newAppbuilder2App.services.marklogic', 'newAppbuilder2App.filters.search', 'ui.bootstrap']).
  controller('ResultListCtrl',
    ['$scope', '$routeParams', 'search', 'groupFilter',
      //     ['$scope', '$routeParams', 'search', 'groupFilter', 'addFacetLinks', 'generateStructuredFacetQuery',
      function($scope, $routeParams, search, groupFilter) {
       // function($scope, $routeParams, search, groupFilter, addFacetLinks, generateStructuredFacetQuery) {

    $scope.searchForm = {
      text: ''
    };

    $scope.facets = search.get({q: '', view:'facets'}, function(data) {
      $scope.facets = data.facets;
    });

    $scope.results = search.get({q: '', view:'results'}, function(data) {
      $scope.results = groupFilter(data.results, 3);
    });

    $scope.search = function() {
//      var structuredFacetQuery = generateStructuredFacetQuery($routeParams.f);

      $scope.results = search.get({q: $scope.searchForm.text, view:'results'}, function(data) {
        $scope.results = groupFilter(data.results, 3);
      });

      $scope.facets = search.get({q: $scope.searchForm.text, view:'facets'}, function(data) {
        $scope.facets = data.facets;
      });

//      $scope.results = search.get({q: $scope.searchForm.text, view:'results', f:structuredFacetQuery}, function(data) {
//        $scope.results = groupFilter(data.results, 3);
//      });

//      $scope.facets = search.get({q: $scope.searchForm.text, view:'facets'}, function(data) {
//        $scope.facets = addFacetLinks(data.facets, $routeParams.f);
//      });
    };

  }])
  .controller('ResultDetailCtrl', ['$scope', 'dataSourceNames', function($scope, dataSourceNames) {

    $scope.steps = ['step1', 'step2', 'step3', 'step4'];
    $scope.step = 0;

    $scope.open = function () {
      $scope.step = 0;
      $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
      $scope.closeMsg = 'I was closed at: ' + new Date();
      $scope.shouldBeOpen = false;
    };

    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };

    $scope.dataSources = dataSourceNames.query();

    $scope.wizard = {
      chartName: '',
      chartType: 'line',
      resultsLimit: 5,
      excelLimit: 5,
      chartWidthSelect: 292,
      colorSelector: 'multi',
      dataSourceName: ''
    };

    $scope.isCurrentStep = function(step) {
      return $scope.step === step;
    };

    $scope.setCurrentStep = function(step) {
      $scope.step = step;
    };

    $scope.getCurrentStep = function() {
      return $scope.steps[$scope.step];
    };

    $scope.isFirstStep = function() {
      return $scope.step === 0;
    };

    $scope.isLastStep = function() {
      return $scope.step === ($scope.steps.length - 1);
    };

    $scope.getNextLabel = function() {
      return ($scope.isLastStep()) ? 'Save' : 'Next';
    };

    $scope.handlePrevious = function() {
      $scope.step -= ($scope.isFirstStep()) ? 0 : 1;
    };

    $scope.handleNext = function() {
      if($scope.isLastStep()) {
        $scope.close();
      } else {
        $scope.step += 1;
      }
    };

  }])

;
