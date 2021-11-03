var moment = require('moment');
var logger = require("../service/logger.js");

module.exports = function (app) {


    app.get('/api/subcontract', function (req, res) {
        var connection = app.infra.connectionFactory();
        var subcontractDAO = new app.infra.SubcontractDAO(connection);
        subcontractDAO.allSubcontract(function (error, result) {
            if (error) {
                console.log('Error in query in database. ' + error);
                res.status(500).send(error);
                return;
            }
            logger.info('He searched for ' + JSON.stringify(result));
            console.log(req.body);
            console.log('User found. ' + JSON.stringify(result));
            res.json(result);
        });
    });

    app.post('/api/subcontract/create', function (req, res) {

        req.assert("ContactName", "Contact name is too small.").isLength({ min: 5 });
        req.assert("CompanyName", "Company name is too small.").isLength({ min: 5 });
        req.assert("ProprietorName", "Proprietor name is too small.").isLength({ min: 5 });

        req.assert("Email", "Email is incorrect.").isEmail();
        req.assert("Phone", "phone is required.").notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            console.log("Validation errors.");
            res.status(400).send({ errors });
            return;
        }

        var subcontract = [];
        subcontract = req.body;

        var connection = app.infra.connectionFactory();
        var subcontractDAO = new app.infra.SubcontractDAO(connection)
        subcontractDAO.getNameSubcontract(subcontract, function (error, result) {

            if (result[0]) {
                return res.send(JSON.stringify({ msg: "This user already has a record.", result }));
            } else {

                subcontractDAO.save(subcontract, function (err, results) {
                    if (err) throw err;
                    console.log(results.insertId);

                    return res.send(JSON.stringify({ msg: "Congratulations.", results }));
                });
            }
        })
    });

    app.post('/api/insurance/create', function (req, res) {

        req.assert("SubcontractId", "Subcontract Id is required.").notEmpty();
        req.assert("GeneralLiability", "General Liability is required.").notEmpty();
        req.assert("ExpirationGL", "Expiration Date GL is required.").notEmpty();
        req.assert("WorkersCompensation", "WorkersCompensation is required.").notEmpty();
        req.assert("WCP","WCP is required.").notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            console.log("Validation errors.");
            res.status(400).send({ errors });
            return;
        }

        var insurance = [];
        insurance = req.body;

        console.log(insurance);

        var connection = app.infra.connectionFactory();
        var subcontractDAO = new app.infra.SubcontractDAO(connection)

        subcontractDAO.saveInsurance(insurance, function (err, results) {
            if (err) throw err;
            return res.send(JSON.stringify({ msg: "Congratulations.", results }));
        });
    });


    app.get('/api/subcontra-profile/:id', function (req, res) {
        
        var id = req.params.id;

        console.log('consultando parametro' + id);




        var connection = app.infra.connectionFactory();
        var subcontractDAO = new app.infra.SubcontractDAO(connection)

        subcontractDAO.getSubcontractById(id, function (error, result) {
          if (error) {
            console.log('Error in query in database. ' + error);
            res.status(500).send(error);
            return;
          }
          logger.info('He searched for ' + JSON.stringify(result));
          console.log('Subcontract found. ' + JSON.stringify(result));
          res.json(result);
        });
      });
    



};
