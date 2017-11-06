jQuery ($) ->
	$.fn.get_attributes = (type) ->
		attributes = {}
		@each ->
			$.each @.attributes, (index, attr) ->
				attributes[attr.name] = attr.value	

		if type == 'json'
      return JSON.stringify(attributes)
    else
      return attributes
