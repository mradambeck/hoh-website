var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  locals.section = 'home';
  // Load upcoming shows by sortOrder
  view.query('shows', keystone.list('Show').model.find()
                              .where('state', 'published')
                              .where('eventDate').gt(Date.now())
                              .sort('eventDate'));

	// Render the view
	view.render('index');
};
