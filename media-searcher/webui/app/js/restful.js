'use strict';

/* RESTful Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.restful', ['ngResource'])
	.factory('Movie', function($resource) {
		return $resource( 'http://localhost/search?query=:query', {}, {
			query: {method:'GET', params:{query:''}, isArray:true}
		});
	})
	.factory('Configuration', function($resource) {
		return $resource( 'http://localhost/configuration', {}, {
			query: {method:'GET', params:{}, isArray:true}
		})
	})
	.factory('Torrent', function($resource) {
		return $resource( 'http://localhost/torrent?query=:query', {}, {
			query: {method:'GET', params:{query:''}, isArray:true}
		})
	})
;