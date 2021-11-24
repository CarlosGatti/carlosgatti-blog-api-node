var logger = require("../service/logger.js");

module.exports = function (app) {

  app.get('/api/latestposts/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);
    postsDAO.LatestPosts(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get('/api/allposts/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);
    postsDAO.AllPosts(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      console.log(result);
      res.json(result);
    });
  });



  app.get('/api/allslugs/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);
    postsDAO.AllSlugs(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      res.json(result);
    });
  });



  app.get('/api/post/:id', function (req, res) {
    var id = req.params.id;
    console.log('consultando post ' + id);

    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);

    postsDAO.PostById(id, function(error, result) {
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


  app.get('/api/latestnewshome/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);
    postsDAO.LatestNewsHome(function (error, result) {
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

  app.get('/api/latestprocess/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);
    postsDAO.LatestProcess(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('sHe searched for ' + JSON.stringify(result));
      console.log(req.body);
      console.log('Post found. ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get('/api/knowledge/:id', function (req, res) {
    var id = req.params.id;
    console.log('consultando knowledge ' + id);

    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);

    postsDAO.KnowledgeById(id, function(error, result) {
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

  app.post('/api/post', function (req, res) {

    var errors = req.validationErrors();

    if(errors){
      console.log("Validation errors.");
      res.status(400).send(errors);
      return;
    }

    var post = req.body;
    console.log('processando uma requisicao de um novo usuario');

    post.User_Id = 1;
    post.DateCreated = new Date;
    post.DateUpdated = new Date;

    var connection = app.infra.connectionFactory();
    var postsDAO = new app.infra.PostsDAO(connection);

    console.log(post);

    postsDAO.save(post, function (error, result) {
      if(error){
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
    }else{
      console.log('User created.');
      res.location('/api/post/' + result.insertId);
        res.status(201).json(post);
      }
    });
  });
};
