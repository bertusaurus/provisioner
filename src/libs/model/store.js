var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(name) {
			return _knex('store')
				.returning('id')
				.insert({
					name: name
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('store').where('id', id)
				.select('id', 'name')
				.then(function(stores) {
					return stores[0];
				});
		},
		getAll: function() {
			return _knex('store')
				.select('id', 'name')
				.then(function(stores) {
					return stores;
				});
		},
		update: function(id, store) {
			return _knex('store')
				.where('id', id)
				.update({
					name: store.name
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('store')
				.where('id', id)
				.del()
		}
	};
}());