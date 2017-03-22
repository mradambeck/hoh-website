/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

function setHeaders(res, path, stat){
  var file = path.split('.'),
      ext = file[file.length-1];

  // cache lengths (in seconds)
  var imageTime   = '604800'; // 1 week
  var cssHtmlTime = '86400';  // 24 hours

  if ( ext === 'jpg' || ext === 'svg' || ext === 'png' || ext === 'webp' || ext === 'ico' || ext === 'gif' ){
    res.setHeader( 'Cache-Control', 'max-age='+ imageTime );

  // uncomment to cache css/html - leaving off while still doing a lot of development:
  // } else if ( ext === 'css' || ext === 'html' ) {
  //   res.setHeader( 'Cache-Control', 'max-age='+ cssHtmlTime );
  }
  // in keystone not specifying otherwise will default to max-age of 0;
}

if (!process.env.LOCALHOST){ // don't set cache on localhost bc that's annoying.
  keystone.set('static options', {
    'setHeaders': setHeaders
  });
}


// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	// app.get('/blog/:category?', routes.views.blog);
	app.get('/news/:post', routes.views.post);
  app.get('/booking', routes.views.booking);
	// app.get('/gallery', routes.views.gallery);
  // app.get('/shows', routes.views.shows);
	// app.all('/contact', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
