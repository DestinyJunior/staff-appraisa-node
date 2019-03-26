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

var helloRouter = require('./router/hello');
app.use('/api/hello/', helloRouter);
var userRouter = require('./router/user');
var solarRouter = require('./router/solar');
var cashierRouter = require('./router/cashier');
var stockRouter = require('./router/stock');
var clinicRouter = require('./router/clinic');
var deliveryRouter = require('./router/delivery');
var technicianRouter = require('./router/technician');
var salesRouter = require('./router/sales');
var websocialRouter = require('./router/websocial');
var instructorRouter = require('./router/instructors');
var mailmonitoringRouter = require('./router/mailmonitoring');
var deliverymanRouter = require('./router/deliveryman');
var auditRouter = require('./router/audit');
var fitiadminRouter = require('./router/fitiadmin');



// routes
app.use('/api/user/', userRouter);
app.use('/api/solar/', solarRouter);
app.use('/api/cashier/', cashierRouter);
app.use('/api/stock/', stockRouter);
app.use('/api/clinic/', clinicRouter);
app.use('/api/delivery', deliveryRouter);
app.use('/api/technician', technicianRouter);
app.use('/api/sales/', salesRouter);
app.use('/api/websocial', websocialRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/mailmonitoring', mailmonitoringRouter);
app.use ('/api/deliveryman', deliverymanRouter);
app.use('/api/audit', auditRouter);
app.use('/api/fitiadmin', fitiadminRouter);


//Home route
app.get('/', (req, res) => {
  res.send('Relax, we will put the home page here later');
});

app.listen(3100 , () => console.log('Listening on Port 3100....'));
