var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var validator = require('express-validator');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("layout extractScripts", true);
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('express-session')({secret: 'i lit fire to the rain', saveUninitialized: false, resave: true}));
// app.use(require('csurf')());

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  // handle CSRF token errors here
  res.status(403).send('Session has expired or Form tampered with.');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') { // err = { status, error }
  app.use(function(err, req, res, next) {
    if(err.status == undefined) {
      // something f'ed up
      next();
    } else if(err.status != 500) {
      res.status(err.status).json({ error: err.error });
    } else {
      res.status(500).json({ error: err.error }); // stacktrace
    }
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    if(err.status != 500) {
      res.status(err.status).json({ error: err.error });
    } else {
      res.status(500).json({ error: {} }); // NO stacktrace
    }
  });
}

module.exports = app;
