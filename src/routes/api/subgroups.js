module.exports = function(router, db) {
	router.get('/subgroups/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.subgroups.get(req.params.id)
			.then(function(subgroup) {
				return res.end(JSON.stringify(subgroup));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/subgroups/add', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.subgroups.create(req.body.groupId, req.body.name)
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

	router.post('/subgroups/edit/', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.subgroups.update(req.body.id, {
			groupId: req.body.groupId,
			name: req.body.name
		})
		.then(function(rows) {
			if (rows === 0) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: 'Failed to update.'
				}));
			}
		})
		.catch(function(err) {
			res.statusCode = 400;
			return res.end(JSON.stringify({
				message: err.detail
			}));
		});
	});

	router.post('/subgroups/remove/', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.subgroups.remove(req.body.id)
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

	router.get('/subgroups/:id/products', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.products.getAll(req.params.id)
			.then(function(products) {
				return res.end(JSON.stringify(products));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});
}