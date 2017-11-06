require 'json'
require_relative 'MtgoxRequest.rb'
class MtgoxProviderError < Exception
end

class MtgoxProvider
	include MtgoxRequest

	def initialize
		configure do |c|
			c.logger = Logger.new('../logs/response.log', 'daily')
			c.key = '2aa415f0-d213-4a55-b584-59066820f5ae'
			c.secret = 'NGk4JndOQc/0lE9AY4XfxFDqaO/duUyPbbF8eEYGJpZWjjNIJvlUk6cT2+pgBG4s21Ol7kkn+9ywdIaSSvweqQ=='
			c.base_url = 'https://data.mtgox.com/api/2/'
			# c.currency = 'BTCEUR'
		end
	end

	def parse_response(body)
		json = JSON.parse(body)
		if (json['result'] != 'success')
			raise MtgoxProviderError, json['error'], caller
		else
			json['data']
		end
	end

	def money_ticker
		response = get('money/ticker')
		parse_response(response.body)
	end

	def money_ticker_fast
		response = get('money/ticker_fast')
		parse_response(response.body)
	end

	def money_info
		response = post('money/info')
		parse_response(response.body)
	end

	def money_orders
		response = post('money/orders')
		parse_response(response.body)
	end

	def money_currency
		response = post("money/currency")
		parse_response(response.body)
	end

	def money_wallet_history(currency)
		options = {'currency' => currency}
		response = post("money/wallet/history", options)
		parse_response(response.body)
	end

	def money_quote(type, amount)
		options = {'amount' => amount, 'type' => type}
		response = post("money/order/quote", options)
		parse_response(response.body)
	end

	def money_order_add(type, amount_int, price_int = nil)
		options = {'amount_int' => amount_int, 'type' => type}
		if (price_int != nil)
			options.merge!({'price_int' => price_int})
		end

		response = post("money/order/add", options)
		parse_response(response.body)
	end

	def money_order_cancel(oid)
		options = {'oid' => oid}
		response = post("money/order/cancel", options)
		parse_response(response.body)
	end

	def money_trades(time_before_now)
		since = Time.now - time_before_now
		options = {'since' => since}
		response = post("money/trades/fetch", options)
		parse_response(response.body)
	end
end