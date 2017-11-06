require 'sinatra'
require './restful-themoviedb'
require './piratebay-parser'
require 'json'

set :port, 80

get '/search' do
	MovieDB.get '/search/movie', params
end

get '/configuration' do
	MovieDB.get '/configuration', params
end

get '/torrent' do
	retorno = Hash.new
	retorno['result'] = PirateBayParser.search(params['query'])
	JSON.dump retorno
end