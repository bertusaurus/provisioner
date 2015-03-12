var Common = (function() {
	return {
		// params:
		// - name (string)
		// - color (string)
		icon: function(params, click) {
			return $('<div>')
				.addClass('grid-icon')
				.css('background-color', params.color)
				.append($('<p>')
					.append(params.name))
				.click(click);
		}
	};
}());