npm install --save express-validator
npm install --save express-session

Source:
https://github.com/ctavan/express-validator
https://github.com/chriso/validator.js

var validator = require('express-validator');
var session = require('express-session');

//after bodyparser because needs to use body parser
app.use(validator());

//can be places anywhere, so places at last
app.use(session({secret: 'whatever secret string', saveUninitialized: false, resave: true}));

res.render('contact', {success: false, errors: req.session.errors});
req.session.errors = null;

router.post('/contact', function(req, res, next) {
});

Preloader:
//https://www.niklausgerber.com/projects/preloadme-a-lightweight-jquery-website-preloader/
// In google images search for "loading animation"


RESIZE:
//http://resizeimage.net/
