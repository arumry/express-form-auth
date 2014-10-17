var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(session({secret: 'something awesome'}));
app.use(bodyParser.urlencoded({ extended:false }));

var isAuthenticated = function(req, res, next) {
    if(req.session.logged_in === true) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
};

app.post('/login', function(req, res) {
    if(req.body.username == 'cahlan' && req.body.password == 'test') {
        req.session.logged_in = true;
        return res.redirect('/');
    }
    else {
        return res.redirect('/login?error=bad_password');
    }
});

app.get('/', isAuthenticated, function(req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/login', function(req, res) {
    return res.sendFile(__dirname+'/public/login.html');
});

app.get('/logout', function(req, res) {
    req.session.logged_in = false;
    return res.redirect('/login');
});

app.listen(8088);