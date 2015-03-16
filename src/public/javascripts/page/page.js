var Page = function(params) {
	return (function() {
		if (params.backButton) {
			var _backButton = params.backButton;
		}

		

		var self = {
			init: null,
			initBackButton: function(alternateText) {
				if (alternateText) {
					_backButton.text = alternateText;
				}
				self.backButton.init(alternateText ? alternateText : _backButton.text, _backButton.action);
			},
			cleanUp: null
		};

		self.backButton = new BackButton($('.grid-back-container'));
		self.init = params.pageInit;
		self.cleanUp = params.cleanUp;

		return self;
	}());
}