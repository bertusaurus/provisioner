var Index = (function() {
	var _list;

	var _menu = {
		element: null,
		addButton: function(text, action) {
			return $('<div>')
				.addClass('menu-item')
				.append($('<p>')
					.append(text))
				.click(action)
				.appendTo(_menu.element);
		},
		init: function() {
			_menu.addButton('Add Items', function() {
				_menu.element.hide();
				_grid.element.show();
				_section.groups.list();
			});
			_menu.addButton('List Items', function() {
				_menu.element.hide();
				_backButton.init(true, 'Menu', function() {
					_menu.element.show();
					_list.hide();
					_backButton.init(false);
				});
				_list.show();
				API.items.list(function(items) {
					_list.refresh(items);
				});
			});
		}
	}

	var _grid = {
		element: null,
		clear: function() {
			_grid.element.empty();
		},
		populate: function(icons) {
			$.each(icons, function(pos, value) {
				_grid.element.append(value);
			});
		}
	};

	var _backButton = {
		element: null,
		init: function(show, text, action) {
			$('.grid-back-container').remove();
			if (show) {
				var container = $('<div>')
					.addClass('grid-back-container')
					.prependTo('body');
				$('<div>')
					.addClass('grid-back')
					.append($('<p>')
						.append('Back to ' + text))
					.click(action)
					.appendTo(container);
				return;
			}
		}
	}

	var _form = {
		element: null,
		showFields: function(title, fields, submit) {
			_grid.element.hide();
			_form.element.show();
			_form.element.append($('<h4>').append(title));
			$.each(fields, function(pos, field) {
				var container = $('<div>')
					.addClass('entry-field');
				var label = $('<label>')
					.append(field.label)
					.appendTo(container);
				if (field.required) {
					label.append(' *')
				}
				var inputContainer = $('<div>')
					.addClass('entry-field-input')
					.appendTo(container);
				switch (field.type) {
					case 'text':
					case 'number':
						var input = $('<input>')
							.attr('name', field.name)
							.appendTo(inputContainer);
						break;
					case 'select':
						var select = $('<select>')
							.attr('name', field.name)
							.appendTo(inputContainer);

						for (var i = 0; i < field.options.length; i++) {
							select.append($('<option>')
								.append(field.options[i].text)
								.val(field.options[i].value));
						}
						break;
					case 'date':
						var input = $('<input>')
							.attr('name', field.name)
							.appendTo(inputContainer)
							.datepicker({
								format: 'mm/dd/yyyy',
								autoclose: true,
								orientation: 'top',
								startDate: new Date()
							});
						break;
					case 'time':
						var weeks = $('<div>')
							.addClass('time-input')
							.append($('<label>').append('Weeks'))
							.append($('<div>')
								.append($('<input>')
									.attr('name', 'durWeeks')
									.addClass('time-input')))
							.appendTo(inputContainer);

						var days = $('<div>')
							.addClass('time-input')
							.append($('<label>').append('Days'))
							.append($('<div>')
								.append($('<input>')
									.attr('name', 'durDays')
									.addClass('time-input')))
							.appendTo(inputContainer);

						var hours = $('<div>')
							.addClass('time-input')
							.append($('<label>').append('Hours'))
							.append($('<div>')
								.append($('<input>')
									.attr('name', 'durHours')
									.addClass('time-input')))
							.appendTo(inputContainer);
						break;
					case 'check':
						var checked = false;
						var checkbox = $('<div>')
							.addClass('checkbox-input')
							.appendTo(inputContainer)
							.click(function() {
								checked = !checked;
								if (checked) {
									checkbox.addClass('checked');
								} else {
									checkbox.removeClass('checked');
								}
							});
				}
				_form.element.append(container);
			});
			var btnDone = $('<div>')
				.addClass('form-new-submit')
				.append($('<p>')
					.append('Submit'))
				.click(submit)
				.appendTo(_form.element);
		},
		clear: function() {
			_form.element.empty();
			_form.element.hide();
		}
	}

	var _colors = {
		icon: {
			item: 'rgb(190, 202, 223)',
			add: 'rgb(197, 223, 190)',
			remove: 'rgb(223, 190, 190)'
		}
	};

	var _fields = {
		group: [
			{
				name: 'name',
				label: 'Name',
				type: 'text'
			}
		],
		subgroup: [
			{
				name: 'name',
				label: 'Name',
				type: 'text',
				required: true
			}
		],
		product: function(units, stores) {
			var options = {
				units: [],
				stores: []
			};

			for (var i = 0; i < units.length; i++) {
				options.units.push({
					value: units[i].id,
					text: units[i].name + ' (' + units[i].abbreviation + ')'
				});
			}

			for (var i = 0; i < stores.length; i++) {
				options.stores.push({
					value: stores[i].id,
					text: stores[i].name
				});
			}

			var fields = [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					required: true
				},
				{
					name: 'unitId',
					label: 'Unit',
					type: 'select',
					required: true,
					options: options.units
				},
				{
					name: 'storeId',
					label: 'Store',
					type: 'select',
					required: true,
					options: options.stores
				},
				{
					name: 'estimatedLife',
					label: 'Estimated Expiry',
					type: 'time',
					required: true
				},
				{
					name: 'important',
					label: 'Important',
					type: 'check',
					required: false
				}
			];

			return fields;
		},
		item: function(unit) {
			return [
				{
					name: 'quantity',
					label: 'Quantity (' + unit.abbreviation + ')',
					type: 'number',
					required: true
				},
				{
					name: 'expiry',
					label: 'Expiry / Best Before',
					type: 'date',
					required: false
				}
			];
		}
	};

	var _section = {
		groups: {
			active: null,
			show: function() {
				_form.clear();
				_backButton.init(true, 'Menu', function() {
					_menu.element.show();
					_grid.element.hide();
					_backButton.init(false);
				});
				_grid.element.show();
			},
			list: function() {
				_section.groups.show();
				API.groups.list(function(groups) {
					if (groups) {
						var icons = [];
						$.each(groups, function(pos, group) {
							icons.push(Common.icon({ name: group.name, color: _colors.icon.item }, function() {
								_section.subgroups.list(group);
								_section.groups.active = group;
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_form.clear();
							_backButton.init(true, 'Groups', _section.groups.show);
							_form.showFields('New Group', _fields.group, _section.groups.submit);
						}));

						_grid.clear();
						_grid.populate(icons);
					}
				});
			},
			submit: function() {
				var name = _form.element.find('input[name="name"]').val();
				if (name.length === 0) return;
				API.groups.add({ name: name }, function(err, id) {
					_section.groups.show();
					_section.groups.list();
				});
			},
			remove: function() {
				API.groups.remove({ id: _section.groups.active.id }, function(err) {
					if (err) {
						// do something
					} else {
						_section.groups.show();
						_section.groups.list();
					}
				});
			}
		},
		subgroups: {
			active: null,
			backButtonSetup: function() {
				_backButton.init(true, 'Groups', function() {
					_section.groups.list();
				});
			},
			show: function() {
				_form.clear();
				_section.subgroups.backButtonSetup();
				_grid.element.show();
			},
			list: function(group) {
				API.subgroups.list(group.id, function(subgroups) {
					if (subgroups) {
						var icons = [];
						$.each(subgroups, function(pos, subgroup) {
							icons.push(Common.icon({ name: subgroup.name, color: _colors.icon.item }, function() {
								_section.products.list(subgroup);
								_section.subgroups.active = subgroup;
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_form.clear();
							_backButton.init(true, group.name, _section.subgroups.show);
							_form.showFields('New ' + group.name, _fields.subgroup, _section.subgroups.submit);
						}));
						icons.push(Common.icon({ name: 'Remove', color: _colors.icon.remove }, function() {
							_section.groups.remove();
						}));
						_grid.clear();
						_section.subgroups.backButtonSetup();
						_grid.populate(icons);
					}
				});
			},
			submit: function() {
				var name = _form.element.find('input[name="name"]').val();
				if (name.length === 0) return;
				API.subgroups.add({ groupId: _section.groups.active.id, name: name }, function(err, id) {
					_section.subgroups.show();
					_section.subgroups.list(_section.groups.active);
				});
			},
			remove: function() {
				API.subgroups.remove({ id: _section.subgroups.active.id }, function(err) {
					if (err) {
						// do something
					} else {
						_section.subgroups.show();
						_section.subgroups.list(_section.groups.active);
					}
				});
			}
		},
		products: {
			active: null,
			list: function(subgroup) {
				API.products.list(subgroup.id, function(products) {
					if (products) {
						var backButtonSetup = function() {
							_backButton.init(true, _section.groups.active.name, function() {
								_section.subgroups.list(_section.groups.active);
							});
						};
						var icons = [];
						$.each(products, function(pos, product) {
							icons.push(Common.icon({ name: product.name, color: _colors.icon.item }, function() {
								_section.products.active = product;
								_form.clear();

								_backButton.init(true, subgroup.name, function() {
									_form.clear();
									backButtonSetup();
									_grid.element.show();
								});
								API.units.get(product.unitId, function(unit) {
									_form.showFields('Store ' + product.name, _fields.item(unit), function() {
										_section.items.submit();
									});
								});
								
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_form.clear();
							_backButton.init(true, subgroup.name, function() {
								_form.clear();
								backButtonSetup();
								_grid.element.show();
							});

							var vals = {};
							var valuesLoaded = function() {
								_form.showFields('New ' + subgroup.name, _fields.product(vals.units, vals.stores), function() {
									_section.products.submit();
								});
							};
							API.units.list(function(units) {
								vals.units = units;
								if (vals.stores) valuesLoaded();
							});
							API.stores.list(function(stores) {
								vals.stores = stores;
								if (vals.units) valuesLoaded();
							});

							
						}));
						icons.push(Common.icon({ name: 'Remove', color: _colors.icon.remove }, function() {
							_section.subgroups.remove();
						}));
						_grid.clear();
						backButtonSetup();
						_grid.populate(icons);
					}
				});
			},
			submit: function() {
				var name = _form.element.find('input[name="name"]').val();
				if (name.length === 0) return;
				var unitId = _form.element.find('select[name="unitId"]').val();
				var storeId = _form.element.find('select[name="storeId"]').val();
				var duration = {
					weeks: _form.element.find('input[name="durWeeks"]').val(),
					days: _form.element.find('input[name="durDays"]').val(),
					hours: _form.element.find('input[name="durHours"]').val(),
					getInterval: function() {
						var weeks = duration.weeks.length > 0 ? parseInt(duration.weeks) : 0;
						var days = duration.days.length > 0 ? parseInt(duration.days) : 0;
						var hours = duration.hours.length > 0 ? parseInt(duration.hours) : 0;

						var result = '';
						if (weeks > 0) result += weeks + ' weeks ';
						if (days > 0) result += days + ' days ';

						result += (hours + ':0:0'); 
						return result;
					}
				};

				var important = _form.element.find('.checkbox-input').hasClass('checked');

				if (duration.weeks.length === 0 && 
					duration.days.length === 0 && 
					duration.hours.length === 0) 
				return;
				
				API.products.add({
					subgroupId: _section.subgroups.active.id,
					unitId: parseInt(unitId),
					storeId: parseInt(storeId),
					name: name,
					estimatedLife: duration.getInterval(),
					important: important
				}, function(id) {
					if (isNaN(id)) {
						throw id.message;
					}

					_form.clear();
					_grid.element.show();
					_section.products.list(_section.subgroups.active);
				});
			}
		},
		items: {
			submit: function() {
				var quantity = _form.element.find('input[name="quantity"]').val();
				var expiry = _form.element.find('input[name="expiry"]').val();

				if (quantity.length === 0) return;
				if (expiry.length === 0) expiry = null;

				API.items.add({
					productId: _section.products.active.id,
					amount: quantity,
					storeDate:  moment().format(),
					expiry:  expiry ? moment(expiry).format() : null
				}, function(id) {
					if (isNaN(id)) {
						throw id.message;
					}

					_form.clear();
					_grid.element.show(),
					_section.groups.list()
				});
			}
		}
	}

	return {
		init: function() {
			if (API === undefined) throw 'api.js is required.';
			if (Common == undefined) throw 'common.js is required.';

			_menu.element = $('.menu');
			_grid.element = $('.grid');
			_form.element = $('.form-new');

			_list = new ItemList($('.list'));

			_menu.init();
		}
	}
}());

$(function() {
	Index.init();
});