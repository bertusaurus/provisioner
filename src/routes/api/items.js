module.exports = function(router, db) {
	router.get('/items', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.items.getAll()
			.then(function(items) {
				return res.end(JSON.stringify(items));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
	});

	router.get('/items/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.items.get(req.params.id)
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

	router.post('/items/add', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		if (req.body.expiry === 'null') {
			req.body.expiry = null;
		}

		var finalize = function() {
			db.items.create({ 
				productId: req.body.productId,
				amount: req.body.amount,
				storeDate: req.body.storeDate,
				expiry: req.body.expiry
			})
			.then(function(id) {
				return res.end(JSON.stringify(id));
			})
			.catch(function(err) {
				res.statusCode = 400;
				return res.end(JSON.stringify({
					message: err.detail
				}));
			});
		};

		if (req.body.expiry === null) {
			db.products.get(req.body.productId)
				.then(function(product) {
					return product.estimatedLife;
				})
				.then(function(estimatedLife) {
					if (estimatedLife !== null) {
						var moment = require('moment');
						var expiry = moment();
						if (estimatedLife.days) {
							expiry.add(estimatedLife.days, 'days');
						}
						if (estimatedLife.hours) {
							expiry.add(estimatedLife.hours, 'hours');
						}
						req.body.expiry = expiry.format();
					}
					return;
				})
				.then(function() {
					finalize();
				});
		} else {
			finalize();
		}
	});

	router.post('/items/edit/:id', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.items.update(req.params.id, {
			productId: req.body.productId,
			amount: req.body.amount,
			storeDate: req.body.storeDate,
			expiry: req.body.expiry
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

	router.post('/items/remove/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.items.remove(req.params.id)
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