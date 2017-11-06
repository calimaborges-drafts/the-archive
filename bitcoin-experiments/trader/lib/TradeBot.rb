# encoding: utf-8
require_relative 'mtgox/MtgoxConverter.rb'
require_relative 'FakeProvider.rb'
class TradeBot
	include MtgoxConverter
	

	def initialize
		@provider = FakeProvider.new
		@logger = Logger.new('../logs/tradebot.log', 'daily')
		@last_qtd_int = 0
		@last_price_int = 0
		@last_operation = :none
		@last_amount_int_usd = 0
	end

	def half_balance(currency)
		return @provider.balance(currency) / 2.0
	end

	def start
		@logger.debug(print_balance)
		max_amount_int = half_balance(:btc)
		@logger.debug('Fixed amount to trade: %f BTC' % btc_int2float(max_amount_int) )
		@last_operation = :buy
		
		while true do
			begin
				sleep(15.0)
				@logger.debug('**** Iniciando ciclo **** ')
				@logger.debug(print_balance)
				@provider.update_fee()
				curr_operation = :sell if @last_operation == :buy
				curr_operation = :buy if @last_operation == :sell

				quote = @provider.buy_quote if curr_operation == :buy
				quote = @provider.sell_quote if curr_operation == :sell

				fee = @provider.fee

				@logger.debug('Current %s quote: %f with fee: %f' % [curr_operation.to_s, usd_int2float(quote), fee])

				price_int = quote
				usd_int_price = pretend(curr_operation, max_amount_int, price_int, fee)
				should_transact = (usd_int_price > @last_amount_int_usd) if curr_operation == :sell
				should_transact = (usd_int_price < @last_amount_int_usd) if curr_operation == :buy
				if (!should_transact)
					@logger.debug('%s next - last: %f  current: %f' % [curr_operation.to_s, 
						usd_int2float(@last_amount_int_usd), 
						usd_int2float(usd_int_price)])
					next
				end
				@logger.debug('%s doing - last: %f current: %f' % [curr_operation.to_s, 
						usd_int2float(@last_amount_int_usd), 
						usd_int2float(usd_int_price)])
				transaction(curr_operation, max_amount_int, price_int, fee)
				print_balance
			rescue Exception => e
				@logger.error('Não deveria entrar aqui. %d %d %f: %s' % [max_amount_int, price_int, fee, e.message])
				puts e.inspect
				puts e.backtrace
				break
			end
		end
		print_balance
	end

	def buy_int(int_amount, int_price, fee)
		transaction(:buy, int_amount, int_price, fee)
	end

	def sell_int(int_amount, int_price, fee)
		transaction(:sell, int_amount, int_price, fee)
	end

	def transaction(type, int_amount, int_price, fee)
		raise Exception 'Fee diffs' if (fee != @provider.fee) 
		@provider.buy(int_amount, int_price) if (type == :buy)
		@provider.sell(int_amount, int_price) if (type == :sell)
		@last_price_int = int_price
		@last_qtd_int = int_amount
		@last_amount_int_usd = pretend(type, int_amount, int_price, fee)
		@last_operation = type
		@logger.debug('%s %f BTC at %f with fee %f %% = %f USD' % [type, btc_int2float(int_amount), usd_int2float(int_price), fee * 100.0, usd_int2float(@last_amount_int_usd)])
	end

	# Retorna quanto que você ganha (ou perde) em USD. 
	# Ao vender BTC ganha-se menos dolares. 
	# Ao comprar BTC perde-se mais dolares.
	def pretend(type, int_amount, int_price, fee)
		fee_signal = -1 if type == :sell
		fee_signal = 1 if type == :buy
		btc_int2float(int_amount * (1 + (fee_signal * fee))) * int_price
	end

	def print_balance
		return "USD: #{usd_int2float(@provider.balance(:usd))} BTC: #{btc_int2float(@provider.balance(:btc))}"
	end

	def print_history
		str = "------USD History------"
		@provider.history(:usd).each do |transaction|
			str = str + "#{transaction[:type]} #{usd_int2float(transaction[:value])} = #{usd_int2float(transaction[:balance])}"
		end
		str = str + "------BTC History------"
		@provider.history(:btc).each do |transaction|
			str = str + "#{transaction[:type]} #{btc_int2float(transaction[:value])} = #{btc_int2float(transaction[:balance])}"
		end
		str = str + "-----------------------"
		return str
	end
end

bot = TradeBot.new
bot.start
# bot.buy
# bot.orders
# bot.cancel_last


# bot.sell
# bot.get_info
