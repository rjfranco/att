/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Select2 Components
app.import('bower_components/select2/select2.js');
app.import('bower_components/select2/select2.css');
app.import('bower_components/select2/select2.png', {destDir: 'assets'});
app.import('bower_components/select2/select2x2.png', {destDir: 'assets'});
app.import('bower_components/select2/select2-spinner.gif', {destDir: 'assets'});

// Open Iconic Components
app.import('bower_components/open-iconic/sprite/open-iconic.min.svg', {destDir: 'assets'});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
