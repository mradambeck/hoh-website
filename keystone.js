// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// if(!process.env) {
require('dotenv').config();
// }


// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  'name': 'Houses of Heaven',
  'brand': 'Houses of Heaven',

  'sass': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: require('./templates/views/helpers')(),
    extname: '.hbs',
  }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'port': process.env.PORT || 3000
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));
keystone.set('cookie secret', process.env.COOKIE_SECRET);

// Switch Keystone Email defaults to handlebars
// keystone.Email.defaults.templateExt = 'hbs';
// keystone.Email.defaults.templateEngine = require('handlebars');


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  // galleries: 'galleries',
  // enquiries: 'enquiries',
  users: 'users',
  shows: 'shows',
  discography: 'albums'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
