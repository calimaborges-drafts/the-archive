require 'json'
require 'date'
require_relative 'MtgoxRequest.rb'
require_relative 'MtgoxConverter.rb'
require_relative '../ObjectToFile.rb'

class MtgoxProviderError < Exception
end

class MtgoxFakeProvider
	include MtgoxRequest
	include MtgoxConverter
	include ObjectToFile

	def load_orders
		@orders = load_object_from_file('orders.dat')
		@orders = [] if @orders == nil
	end

	def save_orders
		save_object_to_file(@orders, 'orders.dat')
	end

	def load_wallets
		@wallet_btc = load_object_from_file('wallet_btc.dat')
		if @wallet_btc == nil
			money_info = money_info_web
			@wallet_btc = money_info['Wallets']['BTC']['Balance']['value_int']
		end

		@wallet_usd = load_object_from_file('wallet_usd.dat')
		if @wallet_usd == nil
			money_info = money_info_web
			@wallet_usd = money_info['Wallets']['USD']['Balance']['value_int']
		end
	end

	def save_wallets
		save_object_to_file(@wallet_usd, 'wallet_usd.dat')
		save_object_to_file(@wallet_btc, 'wallet_btc.dat')
	end

	def initialize
		@wallet_usd = 0
		@wallet_btc = 0
		configure do |c|
			c.logger = Logger.new('../logs/response-fake.log', 'daily')
			c.key = '2aa415f0-d213-4a55-b584-59066820f5ae'
			c.secret = 'NGk4JndOQc/0lE9AY4XfxFDqaO/duUyPbbF8eEYGJpZWjjNIJvlUk6cT2+pgBG4s21Ol7kkn+9ywdIaSSvweqQ=='
			c.base_url = 'https://data.mtgox.com/api/2/'
			# c.currency = 'BTCEUR'
		end

		load_orders
		load_wallets
	end

	def parse_response(body)
		json = JSON.parse(body)
		if (json['result'] != 'success')
			raise MtgoxProviderError, json['error'], caller
		else
			json['data']
		end
	end

	def money_info
		load_wallets
		response = money_info_web
		response['Wallets']['BTC']['Balance'] = JSON.parse(btc_int2json(@wallet_btc))
		response['Wallets']['USD']['Balance'] = JSON.parse(usd_int2json(@wallet_usd))
		return response
	end

	def money_ticker
		response = get('money/ticker')
		parse_response(response.body)
	end

	def money_ticker_fast
		response = get('money/ticker_fast')
		parse_response(response.body)
	end

	def money_orders
		load_orders
		return @orders
		# response = post('money/orders')
		# parse_response(response.body)
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
		fake_oid = "03623b8a-8b62-4e8d-958a-%012x" % (rand * 0xffffffffffff)
		btc_display_short = "%1.2f BTC" % btc_int2float(amount_int)
		usd_display_short = "$%1.2f" % usd_int2float(price_int)
		response = '{
					  "result": "success",
					  "data": [
					    {
					      "oid": "' + fake_oid + '",
					      "currency": "USD",
					      "item": "BTC",
					      "type": "' + type + '",
					      "amount": {
					        "value": "' + btc_int2float(amount_int).to_s + '",
					        "value_int": "' + amount_int.to_s + '",
					        "display": "' + btc_int2float(amount_int).to_s + ' BTC",
					        "display_short": "' + btc_display_short + '",
					        "currency": "BTC"
					      },
					      "effective_amount": {
					        "value": "' + btc_int2float(amount_int).to_s + '",
					        "value_int": "' + amount_int.to_s + '",
					        "display": "' + btc_int2float(amount_int).to_s + ' BTC",
					        "display_short": "' + btc_display_short + '",
					        "currency": "BTC"
					      },
					      "price": {
					        "value": "' + usd_int2float(price_int).to_s + '",
					        "value_int": "' + price_int.to_s + '",
					        "display": "$' + usd_int2float(price_int).to_s + '",
					        "display_short": "' + usd_display_short + '",
					        "currency": "USD"
					      },
					      "status": "pending",
					      "date": ' + Time.now.to_i.to_s + ',
					      "priority": "1367711602079347",
					      "actions": []
					    }
					  ]
					}'
		result = parse_response(response)
		result.each do |order|
			@orders << order
		end
	end

	def money_order_cancel(oid)
		existe = false
		@orders.each do |order|
			if order['oid'] == oid 
				existe = true
				break
			end
		end

		if not existe
			response = '{"result":"error","error":"Order not found","token":"unknown_error"}'
		else
			fake_qid = "b7792e69-3b42-47c1-afbb-%012x" % (rand * 0xffffffffffff)	
			@orders.delete_if { |order| order['oid'] == oid }
			save_orders
			response = '{"result":"success","data":{"oid":"' + oid + '","qid":"' + fake_qid + '"}}'
		end
		parse_response(response)
	end

	def money_trades(time_before_now)
		since = Time.now - time_before_now
		options = {'since' => since}
		response = post("money/trades/fetch", options)
		parse_response(response.body)
	end

	private 

	def money_info_web
		response = post('money/info')
		parse_response(response.body)
	end
end