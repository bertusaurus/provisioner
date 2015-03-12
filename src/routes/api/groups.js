module.exports = function(router, db) {
	router.get('/groups', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.groups.getAll()
			.then(function(groups) {
				return res.end(JSON.stringify(groups));
			});
	});

	router.get('/groups/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.groups.get(req.params.id)
			.then(function(group) {
				if (!group) {
					res.statusCode = 400;
					return res.end(JSON.stringify({
						message: 'Group with id: ' + req.params.id + ' does not exist.'
					}));
				}
				return res.end(JSON.stringify(group));
			});
	});

	router.post('/groups/add', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.groups.create(req.body.name)
			.then(function(id) {
				return res.end(JSON.stringify(id));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/groups/edit/', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.groups.update(req.body.id, { name: req.body.name })
			.then(function(rows) {
				if (rows === 0) {
					res.statusCode = 400;
					return res.end(JSON.stringify({
						message: 'Failed to update.'
					}));
				}

				return res.end(JSON.stringify(rows));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/groups/remove', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.groups.remove(req.body.id)
			.then(function() {
				res.end();
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.get('/groups/:id/subgroups', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.subgroups.getAll(req.params.id)
			.then(function(subgroups) {
				return res.end(JSON.stringify(subgroups));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});
}