// Node modules
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

// Project Modules
var config = require('./config');
var mw = require('./middleware');

// Express App
var app = express();

// Config
var port = config.port;
mongoose.connect('mongodb://localhost/token-auth');

// Middleware
mw.globalMiddleware(app);

// Endpoints
app.use(require('./routes'));

// Prevent crash
process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function() {
    console.log("Express server listening on port " + port);
});
