var _knex;

module.exports = (function() {

	var container = {
		init: function(options) {
			_knex = require('knex').initialize(options);
			container.groups = require('./model/group.js')(_knex);
			container.subgroups = require('./model/subgroup.js')(_knex);
			container.stores = require('./model/store.js')(_knex);
			container.units = require('./model/unit.js')(_knex);
			container.products = require('./model/product.js')(_knex);
			container.items = require('./model/item.js')(_knex);
		}
	};

	return container;
}());