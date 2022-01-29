
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
require('dotenv').config();


smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS
    },
    debug: true, // show debug output
    logger: true // log information in console
}));

function email(email, req, res, next) {

    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    readHTMLFile(__dirname + '/emails/bookmail/booking.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            username: "Gatti"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: process.env.EMAIL_PASS, // sender address
            to: email, // list of receivers
            subject: 'CARLOS GATTI :: Blog', // Subject line
            html: htmlToSend,

            attachments: [{
                filename: 'ass.png',
                path: `${__dirname}/emails/bookmail/img/ass.png`,
                cid: 'ass' //same cid value as in the html img src
            },{
                filename: 'ico_you.png',
                path: `${__dirname}/emails/bookmail/img/ico_you.png`,
                cid: 'ico_you' //same cid value as in the html img src
            },{
                filename: 'ico_insta.png',
                path: `${__dirname}/emails/bookmail/img/ico_insta.png`,
                cid: 'ico_insta' //same cid value as in the html img src
            },{
                filename: 'profile.jpg',
                path: `${__dirname}/emails/bookmail/img/profile.jpg`,
                cid: 'profile' //same cid value as in the html img src
            },{
                filename: 'small_brand.png',
                path: `${__dirname}/emails/bookmail/img/small_brand.png`,
                cid: 'small_brand' //same cid value as in the html img src
            }         
        ]
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });


}
module.exports = email;










