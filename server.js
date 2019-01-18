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
var solarRouter = require('./router/solar');
var cashierRouter = require('./router/cashier');
var stockRouter = require('./router/stock');
var clinicRouter = require('./router/clinic');
var deliveryRouter = require('./router/delivery');
var technicianRouter = require('./router/technician');

// routes
app.use('/api/user/', userRouter);
app.use('/api/solar/', solarRouter);
app.use('/api/cashier/', cashierRouter);
app.use('/api/stock/', stockRouter);
app.use('/api/clinic/', clinicRouter);
app.use('/api/delivery', deliveryRouter);
app.use('/api/technician', technicianRouter);

app.listen(3000 , () => console.log('Listening on Port 3000....'));
