var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(name, abbreviation) {
			return _knex('unit')
				.returning('id')
				.insert({
					name: name,
					abbreviation: abbreviation
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('unit').where('id', id)
				.select('id', 'name', 'abbreviation')
				.then(function(units) {
					return units[0];
				});
		},
		getAll: function() {
			return _knex('unit')
				.select('id', 'name', 'abbreviation')
				.then(function(units) {
					return units;
				});
		},
		update: function(id, unit) {
			return _knex('unit')
				.where('id', id)
				.update({
					name: unit.name,
					abbreviation: unit.abbreviation
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('unit')
				.where('id', id)
				.del()
		}
	};
}());