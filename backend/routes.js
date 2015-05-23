var express = require('express');
var jwt = require('jsonwebtoken');
var mw = require('./middleware');
var User = require('./models/User');
var router = express.Router();

// POST /authenticate
router.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            res.json({
                type: false,
                data: 'Error occured: ' + err
            });
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    })
                } else {
                    res.json({
                        type: false,
                        data: 'Incorrect email/password'
                    })
                }
            })
        }
    }); 
});

// POST /signup
router.post('/signup', function(req, res) {
    User.findOne({
        email: req.body.email
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
                    user.token = jwt.sign(user, user.password);
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

// GET /me
router.get('/me', mw.ensureAuthorized, function(req, res) {
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

module.exports = router;
