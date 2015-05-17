// Node modules
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

// Modules
var config = require('./config');
var User = require('./models/User');

// Private key
var pkey = fs.readFileSync('./id_rsa');


// Express
var app = express();

// Config
var port = config.port;
mongoose.connect('mongodb://localhost/token-auth');

// Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan("dev"));

// For CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Authorization');
    next();
});

// Authentication POST endpoint
app.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

// sign-in POST endpoint
app.post('/signin', function(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user,pkey);
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1
                                .token
                        });
                    });
                })
            }
        }
    });
});

// ensureAuthorized
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}


// authorized GET endpoint
app.get('/me', ensureAuthorized, function(req, res) {
    console.log('token: ' + req.token);
    User.findOne({
        token: req.token
    }, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

app.get('/test', function(req,res){
    User.findOne({token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsIl9pZCI6IjU1NTgxNTY5OWJjNTZjNzM1YWM4YjQxYSJ9.1B93o0ka-kxYWZaFGxNZSdDMN3qMLVYVQTuBu8KScY8"}
        , function(err, user){
        console.log(user);
    }) 
});


// prevent crash
process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function() {
    console.log("Express server listening on port " + port);
});