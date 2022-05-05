var logger = require("../service/logger.js");

module.exports = function (app) {

  app.get('/api/allslugscorp/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsCorpDAO = new app.infra.PostsCorpDAO(connection);
    postsCorpDAO.AllSlugsCorp(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get('/api/lastspostcorpfooter/', function (req, res) {
    
    
    var connection = app.infra.connectionFactory();
    var postsCorpDAO = new app.infra.PostsCorpDAO(connection);
    postsCorpDAO.LastPostsCorpFooter(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get('/api/postcorp/:id', function (req, res) {
    
    var id = req.params.id;
    console.log('consultando post ' + id);
    var connection = app.infra.connectionFactory();
    var postsCorpDAO = new app.infra.PostsCorpDAO(connection);

    postsCorpDAO.PostByIdCorp(id, async function(error, result) {
     
        if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
        }

        logger.info('He searched for ' + JSON.stringify(result));
        dataPost = result;
  
        await postsCorpDAO.PostByIdGallery(id, function(error, result){   
            const spread = { data: dataPost, imgs: result }  
            console.log(spread)
            res.json(spread);

        })
    });
  });
};
