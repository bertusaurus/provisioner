module.exports = function(router, db) {
	router.get('/products/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.products.get(req.params.id)
			.then(function(product) {
				return res.end(JSON.stringify(product));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/products/add', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		console.log(req.body.estimatedLife);
		db.products.create({ 
				subgroupId: req.body.subgroupId, 
				unitId: req.body.unitId,
				storeId: req.body.storeId,
				name: req.body.name,
				estimatedLife: req.body.estimatedLife,
				important: req.body.important
			})
			.then(function(id) {
				return res.end(JSON.stringify(id));
			})
			.catch(function(err) {
				console.log(err);
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.post('/products/edit/:id', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.products.update(req.params.id, {
			subgroupId: req.body.subgroupId, 
			unitId: req.body.unitId,
			storeId: req.body.storeId,
			name: req.body.name,
			estimatedLife: req.body.estimatedLife,
			important: req.body.important
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

	router.post('/products/remove', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.products.remove(req.body.id)
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

	router.get('/products/:id/items', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.items.getAll(req.params.id)
			.then(function(items) {
				return items;
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});
}