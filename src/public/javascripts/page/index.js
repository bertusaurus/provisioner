var Index = (function() {
	var _pages = (function() {
		var _stack = [];

		return {
			pop: function() {
				if (_stack.length > 0) {
					var poppable = _stack[_stack.length - 1];
					poppable.cleanUp();
					_stack.pop();
					_stack[_stack.length - 1].init();

					if (_stack.length > 1) {
						var previous = _stack[_stack.length - 2];
						previous.initBackButton();	
					} else {
						$('.grid-back-container').remove();
					}
				}
			},
			push: function(page, alternateText) {
				if (_stack.length > 0) {
					_stack[_stack.length - 1].cleanUp();
				}
				_stack.push(page);
				page.init();
				if (_stack.length > 1) {
					var previous = _stack[_stack.length - 2];
					if (alternateText) {
						previous.initBackButton(alternateText);
					} else {
						previous.initBackButton();
					}
				}
			},
			refresh: function() {
				var current = _stack[_stack.length - 1];
				current.cleanUp();
				current.init();
			}
		}
	}());

	var _list;
	var _form;
	var _backButton;


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
		clear: function() {
			_menu.element.find('.menu-item').remove();
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

	var _colors = {
		icon: {
			item: 'rgb(190, 202, 223)',
			add: 'rgb(197, 223, 190)',
			remove: {
				default: 'rgb(223, 190, 190)',
				hover: 'rgb(242, 228, 228)'
			}
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
		item: function(unit, quantity, expiry) {
			return [
				{
					name: 'quantity',
					label: 'Quantity (' + unit.abbreviation + ')',
					type: 'number',
					required: true,
					value: quantity ? quantity : ''
				},
				{
					name: 'expiry',
					label: 'Expiry / Best Before',
					type: 'date',
					required: false,
					value: expiry ? moment(expiry).format('MM/DD/YYYY') : ''
				}
			];
		}
	};

	var _section = {
		groups: {
			active: null,
			list: function() {
				API.groups.list(function(groups) {
					if (groups) {
						var icons = [];
						$.each(groups, function(pos, group) {
							icons.push(Common.icon({ name: group.name, color: _colors.icon.item }, function() {
								_section.groups.active = group;
								_pages.push(_page.subgroups);
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_pages.push(_page.addGroup);
						}));
						_grid.populate(icons);
					}
				});
			},
			submit: function() {
				var name = _form.element.find('input[name="name"]').val();
				if (name.length === 0) return;
				API.groups.add({ name: name }, function(err, id) {
					_pages.pop();
				});
			},
			remove: function() {
				API.groups.remove({ id: _section.groups.active.id }, function(err) {
					_pages.refresh();
				});
			}
		},
		subgroups: {
			active: null,
			list: function(group) {
				API.subgroups.list(group.id, function(subgroups) {
					if (subgroups) {
						var icons = [];
						$.each(subgroups, function(pos, subgroup) {
							icons.push(Common.icon({ name: subgroup.name, color: _colors.icon.item }, function() {
								_section.subgroups.active = subgroup;
								_pages.push(_page.products, group.name);
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_pages.push(_page.newSubgroup);
						}));
						icons.push(Common.icon({ name: 'Remove', color: _colors.icon.remove.default }, function() {
							_section.groups.remove();
						}));
						_grid.populate(icons);
					}
				});
			},
			submit: function() {
				var name = _form.element.find('input[name="name"]').val();
				if (name.length === 0) return;
				API.subgroups.add({ groupId: _section.groups.active.id, name: name }, function(err, id) {
					_pages.pop();
				});
			},
			remove: function() {
				API.subgroups.remove({ id: _section.subgroups.active.id }, function(err) {
					_pages.refresh();
				});
			}
		},
		products: {
			active: null,
			init: function() {
				_backButton.init(_section.subgroups.active.name, _section.groups.show);
			},
			list: function(subgroup) {
				API.products.list(subgroup.id, function(products) {
					if (products) {
						var icons = [];
						$.each(products, function(pos, product) {
							icons.push(Common.icon({ name: product.name, color: _colors.icon.item }, function() {
								_section.products.active = product;
								_pages.push(_page.items, subgroup.name);
							}));
						});
						icons.push(Common.icon({ name: 'New', color: _colors.icon.add }, function() {
							_pages.push(_page.addProduct);
						}));
						icons.push(Common.icon({ name: 'Remove', color: _colors.icon.remove.default }, function() {
							_section.subgroups.remove();
							_pages.refresh();
						}));
						_grid.clear();
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

					_pages.pop();
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

					_pages.pop();
				});
			}
		}
	}

	var _page = {
		menu: new Page({ 
			backButton: {
				text: 'Menu', 
				action: _pages.pop
			},
			pageInit: function() {
				_menu.element.show();
				_menu.addButton('Add Items', function() {
					_pages.push(_page.groups);
				});
				_menu.addButton('List Items', function() {
					_menu.element.hide();
					_pages.push(_page.list);
				});
			},
			cleanUp: function() {
				_menu.element.hide();
				_menu.clear();
			}
		}),
		list: new Page({
			backButton: {
				text: 'Item List',
				action: _pages.pop
			},
			pageInit: function() {
				_list.show();
				API.items.list(function(items) {
					_list.refresh(items);
				});
			},
			cleanUp: function() {
				_list.hide();
			}
		}),
		editItem: new Page({
			backButton: {
				text: 'Modify Item',
				action: _pages.pop
			},
			pageInit: function() {
				var item = _list.selectedItem;
				_form.showFields('Edit ' + item.name, _fields.item({ abbreviation: item.unit }, item.amount, item.expiry), function() {
					var quantity = _form.element.find('input[name="quantity"]').val();
					var expiry = _form.element.find('input[name="expiry"]').val();

					if (quantity.length === 0) return;
					if (expiry.length === 0) expiry = null;

					API.items.edit({
						id: item.id,
						productId: item.productId,
						amount: quantity,
						storeDate:  moment().format(),
						expiry:  expiry ? moment(expiry).format() : null
					}, function(err) {
						if (err && err.message) {
							console.log(err.message);
						} else {
							_pages.pop();
						}
					});
				},
				[{
					text: 'Take All',
					click: function() {
						API.items.remove(item.id, function(err) {
							if (err && err.message) {
								console.log(err);
							} else {
								_pages.pop();
							}
						})
					},
					colors: {
						default: _colors.icon.remove.default,
						hover: _colors.icon.remove.hover,
					}
				}]);
				_form.show();
			},
			cleanUp: function() {
				_form.hide();
			}
		}),
		groups: new Page({
			backButton: {
				text: 'Groups',
				action: _pages.pop
			},
			pageInit: function() {
				_grid.element.show();
				_section.groups.list();
			},
			cleanUp: function() {
				_grid.element.hide();
				_grid.clear();
			}
		}),
		addGroup: new Page({
			backButton: {
				text: 'Add Group',
				action: _pages.pop
			},
			pageInit: function() {
				_form.showFields('New Group', _fields.group, _section.groups.submit);
				_form.show();
			},
			cleanUp: function() {
				_form.hide();
			}
		}),
		subgroups: new Page({
			backButton: {
				text: 'Subgroups',
				action: _pages.pop
			},
			pageInit: function() {
				_grid.element.show();
				_section.subgroups.list(_section.groups.active);
			},
			cleanUp: function() {
				_grid.element.hide();
				_grid.clear();
			}
		}),
		addSubgroup: new Page({
			backButton: {
				text: 'Add Subgroup',
				action: _pages.pop
			},
			pageInit: function() {
				_form.showFields('New ' + _section.groups.name, _fields.subgroup, _section.subgroups.submit);
				_form.show();
			},
			cleanUp: function() {
				_form.hide();
			}
		}),
		products: new Page({
			backButton: {
				text: 'Products',
				action: _pages.pop
			},
			pageInit: function() {
				_grid.element.show();
				_section.products.list(_section.subgroups.active);
			},
			cleanUp: function() {
				_grid.element.hide();
				_grid.clear();
			}
		}),
		addProduct: new Page({
			backButton: {
				text: 'Add Product',
				action: _pages.pop
			},
			pageInit: function() {
				var vals = {};
				var valuesLoaded = function() {
					_form.showFields('New ' + _section.subgroups.active.name, _fields.product(vals.units, vals.stores), function() {
						_section.products.submit();
					});
					_form.show();
				};
				API.units.list(function(units) {
					vals.units = units;
					if (vals.stores) valuesLoaded();
				});
				API.stores.list(function(stores) {
					vals.stores = stores;
					if (vals.units) valuesLoaded();
				});
			},
			cleanUp: function() {
				_form.hide();
			}
		}),
		items: new Page({
			backButton: {
				text: 'Item',
				action: _pages.pop
			},
			pageInit: function() {
				var product = _section.products.active;
				API.units.get(product.unitId, function(unit) {
					_form.showFields('Store ' + product.name, _fields.item(unit), function() {
						_section.items.submit();
					},
					[{
						text: 'Remove ' + product.name,
						click: function() {
							API.products.remove(product.id, function(result) {
								if (result && result.message) {
									console.log(result.message);
								} else {
									_pages.pop();
								}
							})
						},
						colors: {
							default: _colors.icon.remove.default,
							hover: _colors.icon.remove.hover,
						}
					}]);
					_form.show();
				});
			},
			cleanUp: function() {
				_form.hide();
			}
		})
	};

	return {
		init: function() {
			if (API === undefined) throw 'api.js is required.';
			if (Common == undefined) throw 'common.js is required.';

			_menu.element = $('.menu');
			_grid.element = $('.grid');

			_list = new ItemList($('.list'), function(item) {
				_list.selectedItem = item;
				_pages.push(_page.editItem);
				console.log(item);
			});
			_form = new Form($('.entry-form'));
			_backButton = new BackButton($('.grid-back-container'));

			_pages.push(_page.menu);
		}
	}
}());

$(function() {
	Index.init();
});