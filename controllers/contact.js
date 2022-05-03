var logger = require("../service/logger.js");


module.exports = function (app) {

    app.post('/api/contact', function (req, res) {
        
        var contact = [];
        contact = req.body;


        contact.Date = new Date;

        var connection = app.infra.connectionFactory();
        var contactDAO = new app.infra.ContactDAO(connection)
        contactDAO.save(contact, function (error, res) {

            if (error) {
                console.log('Error inserting into database' + error);
                res.status(500).send(error);
            } else {
                res.message = "Good job.";
            }
        });
    });
 
};
