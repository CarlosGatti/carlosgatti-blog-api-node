var moment = require('moment');
var emailBooking = require("../service/mailer.js");

module.exports = function (app) {

    function RegistraBooking(booking, req, res) {
        var connection = app.infra.connectionFactory();
        var bookingDAO = new app.infra.BookingDAO(connection);
        bookingDAO.save(booking, (err, result, rows) => {
            if (err) throw err;
            return result.insertId
        });
    }

    app.post('/api/booking/register', function (req, res) {
        var booking = [];
        booking = req.body;
        booking.Classroom = "T1";
        booking.Enable = 0;
        booking.DateCreated = moment().format('YYYY/MM/DD HH:mm:ss');
        booking.DateUpdated = moment().format('YYYY/MM/DD HH:mm:ss');
        req.assert("Course", "course is required.").notEmpty();
        req.assert("Name", "name is required.").notEmpty();
        req.assert("Email", "email is required.").notEmpty();
        req.assert("Phone", "phone is required.").notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            console.log("Validation errors.");
            res.status(400).send(errors);
            return;
        }
        var connection = app.infra.connectionFactory();
        var bookingDAO = new app.infra.BookingDAO(connection);
        var email = booking.Email;
   
        bookingDAO.getEmail(email, async (err, results) => {
            if (err) throw err;
            if (results[0]) {
                return res.send(JSON.stringify({ msg: "This user already has a record.", results }));
            } else {
                emailBooking(email);
                await RegistraBooking(booking);
                return res.send(JSON.stringify({ msg: "Congratulations, your reservation was successful..", results }));
            }
        });
    });

};
