var API = (function() {
	return {
		groups: {
			list: function(callback) {
				$.ajax({
					url: 'api/groups',
					success: callback
				});
			},
			add: function(params, callback) {
				$.ajax({
					url: 'api/groups/add',
					type: 'POST',
					data: {
						name: params.name
					},
					success: function(id) {
						if (isNaN(id)) {
							return callback(id.message);
						}
						callback(null, id);
					}
				});
			},
			remove: function(id, callback) {
				$.ajax({
					url: 'api/groups/remove',
					type: 'POST',
					data: id,
					success: function(err) {
						if (err) {
							return callback(err.message);
						}
						callback();
					} 
				});
			}
		},
		subgroups: {
			list: function(groupId, callback) {
				$.ajax({
					url: 'api/groups/' + groupId + '/subgroups',
					success: callback
				});
			},
			add: function(params, callback) {
				$.ajax({
					url: 'api/subgroups/add',
					type: 'POST',
					data: {
						groupId: params.groupId,
						name: params.name
					},
					success: function(id) {
						if (isNaN(id)) {
							return callback(id.message);
						}
						callback(null, id);
					}
				});
			},
			remove: function(id, callback) {
				$.ajax({
					url: 'api/subgroups/remove',
					type: 'POST',
					data: id,
					success: function(err) {
						if (err) {
							return callback(err.message);
						}
						callback();
					} 
				});
			}
		},
		products: {
			list: function(subgroupId, callback) {
				$.ajax({
					url: 'api/subgroups/' + subgroupId + '/products',
					success: callback
				});
			},
			add: function(params, callback) {
				$.ajax({
					url: 'api/products/add',
					type: 'POST',
					data: params,
					success: callback
				});
			},
			remove: function(id, callback) {
				$.ajax({
					url: 'api/products/remove',
					type: 'POST',
					data: {
						id: id
					},
					success: callback
				});
			}
		},
		units: {
			list: function(callback) {
				$.ajax({
					url: 'api/units',
					success: callback
				});
			},
			get: function(id, callback) {
				$.ajax({
					url: 'api/units/' + id,
					success: callback
				});
			}
		},
		stores: {
			list: function(callback) {
				$.ajax({
					url: 'api/stores',
					success: callback
				});
			}
		},
		items: {
			add: function(params, callback) {
				$.ajax({
					url: 'api/items/add',
					type: 'POST',
					data: params,
					success: callback
				});
			},
			list: function(callback) {
				$.ajax({
					url: 'api/items',
					success: callback
				});
			},
			edit: function(params, callback) {
				$.ajax({
					url: 'api/items/edit',
					type: 'POST',
					data: params,
					success: callback
				});
			},
			remove: function(id, callback) {
				$.ajax({
					url: 'api/items/remove',
					type: 'POST',
					data: {
						id: id
					},
					success: callback
				});
			}
		}
	}
}());