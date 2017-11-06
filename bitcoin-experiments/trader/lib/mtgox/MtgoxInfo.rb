require 'active_support/core_ext/numeric/time'
require_relative 'MtgoxProvider.rb'
require_relative 'MtgoxConverter.rb'

class MtgoxInfo
	include MtgoxConverter
	def initialize(provider)
		@client = provider
	end

	def history(wallet)
		history = @client.money_wallet_history(wallet)
		puts "#{wallet} History (#{history['records']})"
		puts "-------------------------------"
		history_items = history['result']
		history_items.each do |item|
			date = Time.at(item['Date']).to_datetime.strftime("%d/%m/%Y %I:%M:%S")
			puts "#{item['Index']} #{date} - #{item['Type']} #{item['Value']['display']} = #{item['Balance']['display']}"
		end
		return history
	end

	def status
		money_info = @client.money_info
		puts money_info['Login']
		puts money_info['Wallets']['BTC']['Balance']['display'].to_s + ' ' + money_info['Wallets']['BTC']['Balance']['value_int'].to_s
		puts money_info['Wallets']['USD']['Balance']['display'].to_s + ' ' + money_info['Wallets']['USD']['Balance']['value_int'].to_s
		puts 'Trade Fee (%): ' + money_info['Trade_Fee'].to_s + '% of BTC'
		return money_info
	end

	def buy_quote(btc_value_int)
		result = @client.money_quote('bid', btc_value_int)
		puts 'Buy Quote: ' + usd_int2float(result['amount']).to_s
		return result['amount']
	end

	def sell_quote(btc_value_int)
		result = @client.money_quote('ask', btc_value_int)
		puts 'Sell Quote: ' + usd_int2float(result['amount']).to_s
		return result['amount']
	end

	def last_trades(time_before_now)
		trades = @client.money_trades(time_before_now)
		return trades
	end

	def list_orders
		response = @client.money_orders
		response.each do |order|
			case order['type']
    		when 'bid'
    			action = 'buy'
    		when 'ask'
    			action = 'sell'
    		else
    			action = order['type']
    		end
			
			fee = 1.0 - (order['effective_amount']['value_int'].to_f / order['amount']['value_int'].to_f)
			fee = fee * 100.0
			puts "#{order['oid']} - #{order['status']} #{action} #{order['amount']['display']} for #{order['price']['display']} each. -#{fee}% = #{order['effective_amount']['display']}"
		end
		return response
	end

	def tick
		response = @client.money_ticker_fast
		puts "Sell: #{response['sell']['display']}"
		puts "Buy: #{response['buy']['display']}"
		return response
	end
end