require 'json'

require_relative 'mtgox/MtgoxConverter.rb'
require_relative 'mtgox/MtgoxRequest.rb'
require_relative 'ProviderInterface.rb'

class FakeProvider
	include ProviderInterface
	include MtgoxConverter
	include MtgoxRequest

	def initialize
		configure do |c|
			c.logger = Logger.new('../logs/fakeprov-response.log', 'daily')
			c.key = '67b3fc6a-6874-40b9-a282-9f4c372f02f6'
			c.secret = 'uScbRfQFBXTXvaHUEPqtVt7j+GzhwHYD5T0lgDXPPPSyu/VkNRPl/mwbtcvJj1fNdW5bsGhA+y6IQtb3d1xHHw=='
			c.base_url = 'https://data.mtgox.com/api/2/'
			# c.currency = 'BTCEUR'
		end

		@transaction_logger = Logger.new('../logs/transactions.log', 'daily')
		@transactions_queue = []
		@balance = {usd: 0, btc: btc_float2int(3.0)}
		@history = {usd: [], btc: []}
	end

	#TODO:
	# Should return amount of btc bought discounting taxes or false.
	def buy(btc_int_value, price_per_btc = nil)
		price_per_btc = buy_quote if price_per_btc == nil
		usd_int_value = btc_int2float(btc_int_value) * price_per_btc
		transaction(:usd, -usd_int_value, :spent)
		transaction(:btc, +btc_int_value, :earn)
		transaction(:btc, -btc_int_value * fee, :fee)
		commit_transactions
	end

	#TODO:
	# Should return amount of usd obtained discounting taxes or false.
	def sell(btc_int_value, price_per_btc = nil)
		price_per_btc = sell_quote if price_per_btc == nil
		usd_int_value = btc_int2float(btc_int_value) * price_per_btc
		transaction(:btc, -btc_int_value, :spent)
		transaction(:usd, +usd_int_value, :earn)
		transaction(:usd, -usd_int_value * fee, :fee)
		commit_transactions
	end

	# Should return current btc buy int value
	def buy_quote
		result = money_quote('bid', btc_float2int(1.0))
		return result['amount']
	end

	# Should return current btc sell int value
	def sell_quote
		result = money_quote('ask', btc_float2int(1.0))
		return result['amount']
	end

	# Should return currency balance
	def balance(currency)
		return @balance[currency]
	end

	# Should return current fee per trade int percentage (0.01 = 1%)
	def update_fee
		money_info = money_info()
		@fee = money_info['Trade_Fee'] / 100.0
	end

	def fee
		@fee
	end

	# Should return :type and :value of all made transactions
	def history(currency)
		return @history[currency]
	end


	private
	def transaction(currency, value, type)
		@transactions_queue << {currency: currency, value: value, type: type}
	end

	def commit_transactions
		sum = {usd: 0, btc: 0}
		@transactions_queue.each do |transaction|
			currency = transaction[:currency]
			int_value = transaction[:value]
			sum[currency] = sum[currency] + int_value
		end

		sum.each do |currency, int_value| 
			raise InsufficientFundsException, "Insuficient Funds for #{currency}. Tried %d have %d." %[int_value, @balance[currency]] if (@balance[currency] + int_value) < 0
		end

		@transactions_queue.each do |transaction|
			currency = transaction[:currency]
			int_value = transaction[:value]
			type = transaction[:type]
			@balance[currency] = @balance[currency] + int_value
			@history[currency] << {type: type, value: int_value, balance: @balance[currency]}

			float_value = usd_int2float(int_value) if (currency == :usd)
			float_value = btc_int2float(int_value) if (currency == :btc)
			@transaction_logger.debug("#{type} #{float_value} #{currency}")
		end
		@transactions_queue = []
	end

	def rollback_transactions
		@transactions_queue = []
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
		response = post('money/info')
		parse_response(response.body)
	end

	def money_quote(type, amount)
		options = {'amount' => amount, 'type' => type}
		response = post("money/order/quote", options)
		parse_response(response.body)
	end
end