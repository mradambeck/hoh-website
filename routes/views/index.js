var keystone = require('keystone');
var async = require('async');
var _ = require('underscore');


exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;
  var thisMorning = new Date();
  thisMorning.setHours(0, 0, 0, 0);


  locals.section = 'home';

  // for blog/news:
  locals.data = {
    posts: []
  };

  // Load UPCOMING SHOWS by date
  // view.query('shows', keystone.list('Show').model.find()
  //   .where('state', 'published')
  //   .where('eventDate').gt(thisMorning)
  //   .sort('eventDate'));

  view.on('init', function (next) {
    var shows = keystone.list('Show').model.find()
      .where('state', 'published')
      .where('eventDate').gt(thisMorning)
      .sort('eventDate');
    shows.exec(function (err, results) {

      locals.shows = results;
      for (var i = 0; i < locals.shows.length; i++) {
        // console.log(locals.shows[i].eventDate);
        locals.shows[i].formattedDate = locals.shows[i]._.eventDate.format('MM[.]DD[.]YY').toString();
        // console.log(locals.shows[i].formattedDate);
      }

      // for Google indexing:
      locals.showJSON = results.map(function (show) {
        var showObj = {
          name: show.title,
          startDate: show.eventDate,
          location: {
            name: show.venue,
            address: {
              addressCountry: {
                name: 'US'
              }
            }
          }
        };

        // because @ symbols break stuff:
        showObj['@context'] = 'http://schema.org';
        showObj['@type'] = 'MusicEvent';
        showObj.location['@type'] = 'Place';
        showObj.location.address['@type'] = 'PostalAddress';

        if (show.ticketLink) {
          showObj.url = show.ticketLink;
        } else if (show.socialLink) {
          showObj.url = show.socialLink;
        }

        if (show.streetAddress) { showObj.location.address.streetAddress = show.streetAddress; }
        if (show.location) { showObj.location.address.addressLocality = show.location; }
        if (show.content.extended) { showObj.description = show.content.extended; }

        return JSON.stringify(showObj);
      });

      next(err);
    });
  });

  // Load the posts
  view.on('init', function (next) {

    var q = keystone.list('Post').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 1,
      filters: {
        state: 'published'
      }
    }).sort('-publishedDate');

    q.exec(function (err, results) {
      locals.data.posts = results;
      next(err);
    });
  });


  // Render the view
  view.render('index');
};
