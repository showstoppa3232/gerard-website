var express = require('express');
var router = express.Router();
var contact = require('./contact.js');
var contact_validation = require('./contact-validation.js');

// routes
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get('/services', function(req, res, next) {
  res.render('services');
});

router.get('/equipment', function(req, res, next) {
  res.render('equipment');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

// middleware
var bodyParser = require('body-parser');
var bPJson = bodyParser.json();
var bPUrl = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator')();
var cookieParser = require('cookie-parser')();
var session = require('express-session')({secret: 'i lit fire to the rain', saveUninitialized: false, resave: true});
var csrf = require('csurf')();
var contactMiddleware = [bPJson, bPUrl, validator, cookieParser, session, csrf];

//[session, csrf]
router.get('/', [session, csrf], function(req, res, next) {
  res.render('index', { csrfToken: req.csrfToken() });
});

router.get('/contact', contactMiddleware, function(req, res, next) {
  res.render('contact', { csrfToken: req.csrfToken() });
});

router.post('/contact', contactMiddleware, function(req, res, next) {
  req.checkBody(contact_validation);
  var errors = req.validationErrors();
  if(errors) {
    next({ status: 400, error: errors});
  } else {
    // contact.handleMessage(req, res, function(error, info) {
    //   if(error){
    //       next({ status: 500, error: error });
    //   } else {
    //       res.status(200).json({ message: 'Your message has been sent!' }); // or res.sendStatus(200);
    //   }
    // });
    res.status(200).json({ message: 'Your message has been sent!' });
  }
});

module.exports = router;
