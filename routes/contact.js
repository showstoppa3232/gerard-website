var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var template = require('../views/emails/email.js');
var config = require('../config').contact;


// https://www.google.com/settings/security/lesssecureapps
// http://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
// http://stackoverflow.com/questions/34652481/node-mailer-errorunsupported-configuration-downgrade-nodemailer-to-v0-7-1-to
// http://stackoverflow.com/questions/32447210/node-js-nodemailer-gmail-error
// https://github.com/nodemailer/nodemailer-smtp-transport\
// https://github.com/nodemailer/nodemailer/issues/504
// https://myaccount.google.com/security
exports.handleMessage = function(req, res, cb) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    var html = template.getHTML({ name: name, email: email, phone: phone, message: message });

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: config.from_user,
            pass: config.from_password
        },
        tls: {
          rejectUnauthorized: false
        }
    }));

    var mailOptions = {
        from: config.from_user,
        to: config.to_user,
        subject: 'Contact: '+ name +' | gerardssoundnlights.com',
        //text: message,
        html: html
    }

    transporter.sendMail(mailOptions, function(error, info) {
        cb(error, info);
    });
};
