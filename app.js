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

GLOBAL.response = {};

app.post('/', function(req, res, next) {
  console.log(req.body);
  response = req.body;
  res.json({ 'success': true });
});

app.get('/', function(req, res, next) {
  res.json(response);
});

require('http').createServer(app).listen(8080, '0.0.0.0');
