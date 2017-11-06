'use strict';

/* Controllers */


function MovieController($scope, Movie, Configuration) {
	$scope.query = '';
	$scope.configuration = Configuration.get();

	$scope.searchMovie = function() {
		$scope.movies = Movie.get({query: $scope.query});
	};
}
MovieController.$inject = ['$scope', 'Movie', 'Configuration'];


function TorrentController($scope, $routeParams, Torrent ) {
	$scope.title = $routeParams.title;
	$scope.torrents = Torrent.get({query: $scope.title});

	// $scope.obterLinkTorrent = function (torrentHref) {
	// 	return TorrentLink.get({query: torrentHref});
	// }
}
TorrentController.$inject = ['$scope', '$routeParams', 'Torrent'];
