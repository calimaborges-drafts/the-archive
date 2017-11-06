require 'uri'
require 'net/http'
require 'openssl'
require 'logger'
require 'base64'

module MtgoxRequest
	attr_accessor :key, :secret, :base_url, :currency, :logger

	def configure
		yield self
	end

    def get(path, options={})
		request(:get, path, options)
    end

    def post(path, options={})
		request(:post, path, options)
    end

    def request(method, path, options)
    	path = "#{currency}/#{path}"
    	uri = URI.parse(base_url + path)
    	http = Net::HTTP.new(uri.host, uri.port)
    	http.use_ssl = true

    	case method
    	when :get
    		request = Net::HTTP::Get.new(uri.request_uri)
    	when :post
    		request = Net::HTTP::Post.new(uri.request_uri)
    		add_nonce(options)
    		request.set_form_data(options)
    		headers = headers(request, path)
    		headers.each do |k,v|
    			request[k] = v
    		end
    	end

    	response = http.request(request)
    	logger.debug("#{method} #{path} with options: #{options}:\n#{response.body}")
    	return response
    end

    def headers(request, path)
	  	signature = Base64.strict_encode64(
  			OpenSSL::HMAC.digest 'sha512',
  			Base64.decode64(secret),
  			"#{path}\0#{request.body}"
	  	)
		{'Rest-Key' => key, 'Rest-Sign' => signature}
    end

    def currency
    	@currency ||= 'BTCUSD'
    end

    def add_nonce(options)
		options.merge!({:nonce => (Time.now.to_f * 1000000).to_i})
    end
end