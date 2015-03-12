module.exports = function(router, db) {
	router.get('/stores', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.stores.getAll()
			.then(function(stores) {
				return res.end(JSON.stringify(stores));
			});
	});

	router.get('/stores/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.stores.get(req.params.id)
			.then(function(unit) {
				return res.end(JSON.stringify(unit));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/stores/add', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.stores.create(req.body.name)
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

	router.post('/stores/edit/:id', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.stores.update(req.params.id, {
			name: req.body.name,
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

	router.post('/stores/remove/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.stores.remove(req.params.id)
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
}