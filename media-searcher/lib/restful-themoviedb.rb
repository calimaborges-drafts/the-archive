module MovieDB
	require 'rest_client'

	TMD_API_KEY = 'f9aefd773d918d87c85b7582c22e8f09'
	BASE_URL = 'http://api.themoviedb.org/3/'

	def self.get(url, params)
		url = BASE_URL + url
		apiKeyParam = {api_key:TMD_API_KEY}
		params.merge!(apiKeyParam)
		p params
		return RestClient.get url, params:params
	end
end