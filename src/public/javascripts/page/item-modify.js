// params: 
// - element: container div
// - backButton: back button div
// - item: item to display / modify
var ItemModify = function(params) {
	return (function() {
		var _element = params.element;
		var _item = params.item;
		var _form = params.form;

		function _initialize() {
			_form.showFields(_item.name, [], function() {});
			_form.show();
		}

		return {
			remove: function() {
				_element.remove();
				_element = null;
				_item = null;
				_backButton = null;
			},
			show: function() {
				_initialize();
				_element.show();
			}
		};
	}());
}