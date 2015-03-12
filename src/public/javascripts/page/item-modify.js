var ItemModify = function(element, item) {
	return (function() {
		var _element = element;
		var _item = item;

		function _initialize() {
			
		}

		return {
			remove: function() {
				_element.remove();
				_element = null;
				_item = null;
			},
			show: function() {
				_element.show();
			}
		};
	}());
}