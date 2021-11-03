var logger = require("../service/logger.js");

module.exports = function (app) {
  app.get('/api/signals/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var signalsDAO = new app.infra.SignalsDAO(connection);
    signalsDAO.Signals(function (error, result) {
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

  app.get('/api/total-signals', function (req, res) {
    var connection = app.infra.connectionFactory();
    var signalsDAO = new app.infra.SignalsDAO(connection);
    signalsDAO.TotalSignals(function (error, result) {
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
  
};