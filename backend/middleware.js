var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports.globalMiddleware = function(app) {
    // body parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    // morgan logging
    app.use(morgan("dev"));

    // For CORS
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers',
            'X-Requested-With,content-type, Authorization');
        next();
    });
};

// ==== Custom Middleware ===
// need to be explicitly called

// ensureAuthorized, used with: 
//     GET /me
module.exports.ensureAuthorized = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};
