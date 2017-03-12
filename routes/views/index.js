var keystone = require('keystone');
var async = require('async');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  locals.section = 'home';

  // for blog/news:
  locals.data = {
    posts: []
  };

  // Load UPCOMING SHOWS by sortOrder
  view.query('shows', keystone.list('Show').model.find()
                              .where('state', 'published')
                              .where('eventDate').gt(Date.now())
                              .sort('eventDate'));

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 1,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});


	// Render the view
	view.render('index');
};
