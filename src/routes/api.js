var express = require('express');
var router = express.Router();

module.exports = function(db) {
	var groups = require('./api/groups.js')(router, db);
	var subgroups = require('./api/subgroups.js')(router, db);
	var products = require('./api/products.js')(router, db);
	var units = require('./api/units.js')(router, db);
	var stores = require('./api/stores.js')(router, db);
	var items = require('./api/items.js')(router, db);

	return router;
}