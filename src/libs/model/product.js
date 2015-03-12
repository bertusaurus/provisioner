var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(params) {
			return _knex('product')
				.returning('id')
				.insert({
					subgroupId: params.subgroupId,
					unitId: params.unitId,
					storeId: params.storeId,
					name: params.name,
					estimatedLife: params.estimatedLife,
					important: params.important
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('product').where('id', id)
				.select('*')
				.then(function(products) {
					return products[0];
				});
		},
		getAll: function(subgroupId) {
			return _knex('product')
				.where('subgroupId', subgroupId)
				.select('*')
				.then(function(products) {
					return products;
				});
		},
		update: function(id, product) {
			return _knex('product')
				.where('id', id)
				.update({
					subgroupId: product.subgroupId,
					unitId: product.unitId,
					storeId: product.storeId,
					name: product.name,
					estimatedLife: product.estimatedLife,
					important: product.important
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('product')
				.where('id', id)
				.del()
		}
	};
}());