var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "static")));

GLOBAL.response = {};

app.get('/api', function(req, res, next) {
	console.log(response);
    res.json(response);
});

app.post('/api', function(req, res, next) {
    response = req.body;
    res.json({ 'success': true });
});

require('http').createServer(app).listen(8080, '0.0.0.0');
