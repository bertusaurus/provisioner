var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(name) {
			return _knex('group')
				.returning('id')
				.insert({
					name: name
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('group').where('id', id)
				.select('id', 'name', 'picture')
				.then(function(groups) {
					return groups[0];
				});
		},
		getAll: function() {
			return _knex('group')
				.select('id', 'name', 'picture')
				.orderBy('name')
				.then(function(groups) {
					return groups;
				});
		},
		update: function(id, group) {
			return _knex('group')
				.where('id', id)
				.update({
					name: group.name
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('group')
				.where('id', id)
				.del()
		}
	};
}());