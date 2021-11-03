var logger = require("../service/logger.js");

module.exports = function (app) {

  app.get('/api/products/:id', function (req, res) {

    var id = req.params.id;
    console.log('consultando parametro ' + id);
    var connection = app.infra.connectionFactory();

    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.getById(id, function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });



}
