var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(params) {
			return _knex('item')
				.returning('id')
				.insert({
					productId: params.productId,
					amount: params.amount,
					storeDate: params.storeDate,
					expiry: params.expiry
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('item').where('id', id)
				.select('*')
				.then(function(items) {
					return items[0];
				});
		},
		getAll: function() {
			return _knex
				.select('group.name as group', 
					'subgroup.name as subgroup',
					'product.name', 
					'item.id',
					'item.amount',
					'item.expiry',
					'unit.abbreviation as unit',
					'store.name as store')
				.from('item')
				.innerJoin('product', 'item.productId', 'product.id')
				.innerJoin('unit', 'product.unitId', 'unit.id')
				.innerJoin('store', 'product.storeId', 'store.id')
				.innerJoin('subgroup', 'product.subgroupId', 'subgroup.id')
				.innerJoin('group', 'subgroup.groupId', 'group.id')
				.orderBy('group', 'subgroup', 'product.name')
				.then(function(items) {
					return items;
				});
		},
		update: function(id, item) {
			return _knex('item')
				.where('id', id)
				.update({
					productId: item.productId,
					amount: item.amount,
					storeDate: item.storeDate,
					expiry: item.expiry
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('item')
				.where('id', id)
				.del()
		}
	};
}());