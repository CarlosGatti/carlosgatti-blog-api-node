var emailNewsletter = require("../service/mailerText.js");

module.exports = function (app) {
    
    function RegistraNewsletter(newsletter, req, res) {
        var connection = app.infra.connectionFactory();
        var newsletterDAO = new app.infra.NewsletterDAO(connection);
        newsletterDAO.save(newsletter, (err, result, rows) => {
            if (err) throw err;
            return result.insertId
        });
    }

    app.post('/api/newsletter/register', function (req, res) {
        var newsletter = [];
        newsletter = req.body;
       console.log(newsletter)
        req.assert("Email", "email is incorrect.").isEmail();

        var errors = req.validationErrors();
        if (errors) {
            console.log("Validation errors.");
            res.status(400).send({errors});
            return;
        }

        var connection = app.infra.connectionFactory();
        var newsletterDAO = new app.infra.NewsletterDAO(connection);
        var email = newsletter.Email;
   
        newsletterDAO.getEmail(email, async (err, results) => {
            if (err) throw err;
            if (results[0]) {
                return res.send(JSON.stringify({ msg: "This email is already registered in our newsletter.", results }));
            } else {
                emailNewsletter(email);
                await RegistraNewsletter(newsletter);
                return res.send(JSON.stringify({ msg: "Congratulations. Stay tuned and check your span box to make sure our emails aren't going there.", results }));
            }
        });
    });

};
