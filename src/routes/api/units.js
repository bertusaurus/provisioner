module.exports = function(router, db) {
	router.get('/units', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.units.getAll()
			.then(function(units) {
				return res.end(JSON.stringify(units));
			});
	});

	router.get('/units/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.units.get(req.params.id)
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

	router.post('/units/add', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.units.create(req.body.name, req.body.abbreviation)
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

	router.post('/units/edit/:id', function(req,res) {
		res.setHeader('Content-Type', 'application/json');
		db.units.update(req.params.id, {
			name: req.body.name,
			abbreviation: req.body.abbreviation
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

	router.post('/units/remove/:id', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		db.units.remove(req.params.id)
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