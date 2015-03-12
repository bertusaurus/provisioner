var _knex;

module.exports = function(knex) {
	_knex = knex;
	return container; 
}

var container = (function() {
	return {
		create: function(groupId, name) {
			return _knex('subgroup')
				.returning('id')
				.insert({
					groupId: groupId,
					name: name
				})
				.then(function(id) {
					return id[0];
				})
		},
		get: function(id) {
			return _knex('subgroup').where('id', id)
				.select('id', 'groupId', 'name', 'picture')
				.then(function(subgroups) {
					return subgroups[0];
				});
		},
		getAll: function(groupId) {
			return _knex('subgroup')
				.where('groupId', groupId)
				.select('id', 'groupId', 'name', 'picture')
				.then(function(subgroups) {
					return subgroups;
				});
		},
		update: function(id, subgroup) {
			return _knex('subgroup')
				.where('id', id)
				.update({
					groupId: subgroup.groupId,
					name: subgroup.name
				})
				.then(function(rows) {
					return rows;
				});
		},
		remove: function(id) {
			return _knex('subgroup')
				.where('id', id)
				.del()
		}
	};
}());