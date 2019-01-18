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

//Log requests to console
app.use(morgan('dev'));

//Initialize passport for use
app.use(passport.initialize());

mongoose.connect(config.database);

//Bring in passport strategy we just defined
require('./config/passport')(passport);

//var helloRouter = require('./router/hello');
//app.use('/api/hello/', helloRouter);
var userRouter = require('./router/user');
var salesRouter = require('./router/sales');
var websocialRouter = require('./router/websocial');
var instructorRouter = require('./router/instructors');
var mailmonitoringRouter = require('./router/mailmonitoring');
var deliverymanRouter = require('./router/deliveryman');
var auditRouter = require('./router/audit');
var fitiadminRouter = require('./router/fitiadmin');



app.use('/api/user/', userRouter);
app.use('/api/sales/', salesRouter);
app.use('/api/websocial', websocialRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/mailmonitoring', mailmonitoringRouter);
app.use ('/api/deliveryman', deliverymanRouter);
app.use('/api/audit', auditRouter);
app.use('/api/fitiadmin', fitiadminRouter);

app.listen(3000);