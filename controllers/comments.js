var logger = require("../service/logger.js");

module.exports = function (app) {

  app.get('/api/comment/:id', function (req, res) {
    var id = req.params.id;
    console.log('consultando comment ' + id);

    var connection = app.infra.connectionFactory();
    var commentsDAO = new app.infra.CommentsDAO(connection);

    commentsDAO.CommentById(id, function(error, result) {
      if(error){
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
