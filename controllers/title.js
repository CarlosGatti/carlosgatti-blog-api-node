var logger = require("../service/logger.js");
var bodyParser = require('body-parser');


module.exports = function (app) {


  app.get('/api/title/:id', function (req, res) {   
   
    var id = req.params.id;
    console.log('consultando parametro ' + id);

    var connection = app.infra.connectionFactory();
    var titleDAO = new app.infra.TitleDAO(connection);

    titleDAO.getById(id, function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }

      logger.info('He searched for ' + JSON.stringify(result));
      console.log(req);
      console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });


  app.get('/api/alltitle/', function (req, res) {   
    var connection = app.infra.connectionFactory();
    var titleDAO = new app.infra.TitleDAO(connection);

    titleDAO.getAllTitle(function(error, result) {
      if(error){
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }

      logger.info('He searched for ' + JSON.stringify(result));
      console.log(req);
      console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });





  app.post('/api/title', function(req, res){

    var errors = req.validationErrors();

    if(errors){
      console.log("Validation errors.");
      res.status(400).send(errors);
      return;
    }

    var title = [];
    var novalista = [];

    title.job_title = [JSON.stringify(req.body.JobTitle)];

    console.log('Processando uma requisicao de atualização do usuario');

    var connection = app.infra.connectionFactory();
    var titleDAO = new app.infra.TitleDAO(connection);

    titleDAO.save(title, function (error, novalista) {
      if(error){
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
    }else{
        console.log('Title updated.');
        console.log(novalista);
        res.status(201).json(title);
      }
    });
  });




  app.put('/api/title/:id', function(req, res){

    var errors = req.validationErrors();

    if(errors){
      console.log("Validation errors.");
      res.status(400).send(errors);
      return;
    }

    var title = [];
    title.id = [JSON.stringify(req.body.TitleId)];
    title.job_title = [JSON.stringify(req.body.JobTitle)];

    console.log('Processando uma requisicao de atualização do usuario');

    var connection = app.infra.connectionFactory();
    var titleDAO = new app.infra.TitleDAO(connection);

    titleDAO.update(title, function (error, title) {
      if(error){
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
    }else{
        console.log('Title updated.');
        res.status(201).json(title);
      }
    });
  });


}
