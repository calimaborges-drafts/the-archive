'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.constants', 'myApp.restful']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {templateUrl: 'partials/search.html', controller: MovieController});
    $routeProvider.when('/torrent/:title', {templateUrl: 'partials/torrent.html', controller: TorrentController});
    $routeProvider.otherwise({redirectTo: '/search'});
  }]);
