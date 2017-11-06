class InsufficientFundsException < Exception
end

module ProviderInterface
	# Should return amount of btc bought discounting taxes or false.
	def buy(btc_int_value, price_per_btc = nil)
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return amount of usd obtained discounting taxes or false.
	def sell(btc_int_value, price_per_btc = nil)
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return current btc buy int value
	def buy_quote
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return current btc sell int value
	def sell_quote
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return currency balance
	def balance(currency)
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return current fee per trade int percentage (0.01 = 1%)
	def fee
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end

	# Should return :type and :value of all made transactions
	def history(currency)
		raise NotImplementedError "Sub class should implement #{__method__} method."
	end
end