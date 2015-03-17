var ItemList = function(element, modifyItem) {
	return (function() {
		var _element = element;
		var _form = new Form($('.entry-form'));
		var _backButton = new BackButton($('.grid-back-container'));

		function _parseDate(dateString, defaultValue) {
			if (!dateString) {
				return defaultValue;
			}

			var date = moment(dateString);

			var dateNow = moment();

			if (_isExpired(date)) {
				return 'Expired';
			}

			return date.format('dddd, MMM Do YYYY h:mm a');
		}

		function _isExpired(date) {
			return date.isBefore(moment());
		}

		return {
			hide: function() {
				_element.hide();
			},
			show: function(show) {
				_element.show();
				if (show) {
					show();
				}
			},
			selectedItem: null,
			refresh: function(allItems) {
				_element.empty();
				var groups = _.uniq(_.pluck(allItems, 'group'));

				_.each(groups, function(group) {
					_element.append($('<h2>')
						.append(group));
					var subgroups = _.uniq(_.pluck(_.filter(allItems, function(item) {
						return item.group === group;
					}), 'subgroup'));

					_.each(subgroups, function(subgroup) {
						_element.append($('<h3>')
							.append(subgroup));
						var items = _.filter(allItems, function(item) {
							return item.group === group &&
								item.subgroup == subgroup;
						});

						var table = $('<table>');
						var tr = $('<tr>');
						tr.append($('<th>')
							.append('Product'));
						tr.append($('<th>')
							.append('Amount'));
						tr.append($('<th>')
							.append('Expiry'));
						tr.append($('<th>'));
						table.append(tr);
						_.each(items, function(item) {
							var row = $('<tr>');
							row.append($('<td>')
								.append(item.name));
							row.append($('<td>')
								.append(item.amount + ' (' + item.unit + ')'));
							
							var date = _parseDate(item.expiry, 'Never expires');
							row.append($('<td>')
								.append(date));
							if (date === 'Expired') {
								row.addClass('expired');
							}

							row.append($('<td>')
								.append($('<div>')
								.addClass('action-button')
									.append('Modify'))
								.click(function() {
									modifyItem(item);
								}));
							table.append(row);
						});
						_element.append(table);
					});

				});
			}
		};
	}());
};