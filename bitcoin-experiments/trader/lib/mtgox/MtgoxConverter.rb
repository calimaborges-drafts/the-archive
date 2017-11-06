module MtgoxConverter
	def btc_float2int(btc_value_float)
		return btc_value_float.to_f * 10**8
	end

	def btc_int2float(btc_value_int)
		return btc_value_int.to_f / 10**8
	end

	def usd_float2int(usd_value_float)
		return usd_value_float.to_f * 10**5
	end

	def usd_int2float(usd_value_int)
		return usd_value_int.to_f / 10**5
	end

	def btc_int2json(btc_value_int)
		btc_display_short = "%1.2f BTC" % btc_int2float(btc_value_int)
		'{
			"value": "' + btc_int2float(btc_value_int).to_s + '",
	        "value_int": "' + btc_value_int.to_s + '",
	        "display": "' + btc_int2float(btc_value_int).to_s + ' BTC",
	        "display_short": "' + btc_display_short + '",
	        "currency": "BTC"
      	}'
	end

	def usd_int2json(usd_value_int)
		usd_display_short = "$%1.2f" % usd_int2float(usd_value_int)
		'{
			"value": "' + usd_int2float(usd_value_int).to_s + '",
	        "value_int": "' + usd_value_int.to_s + '",
	        "display": "$' + usd_int2float(usd_value_int).to_s + '",
	        "display_short": "' + usd_display_short + '",
	        "currency": "USD"
      	}'
	end
end