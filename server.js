var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('./config/main');
var mongoose = require('mongoose');

var app = express();

//Use body-parser to get POST  requests for API Use
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect(config.database);

var helloRouter = require('./router/hello');

app.use('/api/hello/', helloRouter);

app.listen(3000);