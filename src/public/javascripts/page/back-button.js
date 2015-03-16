var BackButton = function(element) {
	return (function() {
		var _hideAll = function() {
			$('.grid-back-container').remove();			
		};

		return {
			init: function(text, action) {
				_hideAll();
				var element = $('<div>')
					.addClass('grid-back-container')
					.prependTo('body');
				$('<div>')
					.addClass('grid-back')
					.append($('<p>')
						.append('Back to ' + text))
					.click(function() {
						action();
					})
					.appendTo(element);
				return;
			}
		};
	}());
};