var logger = require("../service/logger.js");
var moment = require('moment');

module.exports = function (app) {


    app.post('/api/operation/create', function (req, res) {
        var operation = [];
        operation = req.body;
        console.log(operation)
        var connection = app.infra.connectionFactory();
        var operationsDAO = new app.infra.OperationsDAO(connection)
        operationsDAO.save(operation, function (error, res) {

            if (error) {
                console.log('Error inserting into database' + error);
                res.status(500).send(error);
            } else {
                res.message = "Good job.";
            }
        });
    });



    app.get('/api/operation', function (req, res) {
        var connection = app.infra.connectionFactory();
        var operationsDAO = new app.infra.OperationsDAO(connection)
        operationsDAO.getOperations(function (error, result) {
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



      

}
