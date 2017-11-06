require_relative 'MtgoxProvider.rb'
require_relative 'MtgoxConverter.rb'
class MtgoxAction
	include MtgoxConverter
	def initialize(provider)
		@client = provider
		@btc_max_buy_value = @btc_max_sell_value = 1000000
	end

	# usd_value_int - é o preço por bitcoin
	def buy(btc_value_int, usd_value_int = nil)

		# TODO: Bloquear compra por valores muito altos

		if btc_value_int > @btc_max_buy_value
			raise MtgoxError, "Can't buy that much: #{btc_value_int} - Allowed: #{@btc_max_buy_value}"
		end

		if (usd_value_int == nil)
			puts 'Buying ' + btc_int2float(btc_value_int).to_s + ' at market price.'
		else
			puts 'Buying ' + btc_int2float(btc_value_int).to_s + ' for ' + usd_int2float(usd_value_int).to_s + ' each. Total amount: $' + (usd_int2float(usd_value_int) * btc_int2float(btc_value_int)).to_s
		end

		result = @client.money_order_add('bid', btc_value_int, usd_value_int)
		return result
	end

	# usd_value_int - é o preço por bitcoin
	def sell(btc_value_int, usd_value_int = nil)

		# TODO: Bloquear venda por valores muito baixos

		if btc_value_int > @btc_max_buy_value
			raise MtgoxError, "Can't sell that much: #{btc_value_int} - Allowed: #{@btc_max_sell_value}"
		end

		if (usd_value_int == nil)
			puts 'Selling ' + btc_int2float(btc_value_int).to_s + ' at market price.'
		else
			puts 'Selling: ' + btc_int2float(btc_value_int).to_s + ' for ' + usd_int2float(usd_value_int).to_s + ' each. Total amount: $' + (usd_int2float(usd_value_int) * btc_int2float(btc_value_int)).to_s
		end
		
		result = @client.money_order_add('ask', btc_value_int, usd_value_int)
		return result
	end

	def cancel(oid)
		result = @client.money_order_cancel(oid)
		return result
	end
end
