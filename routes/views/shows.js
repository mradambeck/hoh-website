var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'shows';

	// Load the shows by sortOrder
	view.query('shows', keystone.list('Show').model.find().where('state', 'published').sort('eventDate'));
	// Render the view
	view.render('shows');

};
