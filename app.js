var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util=require('util');
var connect=require('connect');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var ems=require('./routes/ems');
var socket=require('./routes/socket');
var device=require('./routes/device');


var settings=require('./settings');
var flash=require('connect-flash');
var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie:{maxAge:1000*60*60*24*30},
  store: new MongoStore({
    url:'mongodb://localhost/WatchCompany'
/*    db: settings.db,
    host: settings.host,j
    port: settings.post */
  }),
  resave: false,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.get('/ems',ems);
app.get('/socket',socket);
app.get('/device',device);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
