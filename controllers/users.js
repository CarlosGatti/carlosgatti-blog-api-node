var logger = require("../service/logger.js");
const saltRounds = 10;
var moment = require('moment');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = function (app) {

  app.get('/api/user/:id', function (req, res) {
    var id = req.params.id;
    console.log('consultando parametro ' + id);
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);
    userDAO.getById(id, function (error, result) {
      
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

  app.put('/api/update/avatar/', function (req, res) {
    var user = [];
    console.log("test", req.body)
    user = req.body;
    console.log('Processando uma requisicao de atualização do usuario');
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);
    userDAO.updateAvatar(user, function (error, result) {
      if (error) {
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {
        console.log('User updated.');
        res.status(201).json(user);
      }
    });
  });

  app.post('/api/users/create', function (req, res) {

    req.assert("Name", "name is too small.").isLength({ min: 5 });
    req.assert("Email", "email is incorrect.").isEmail();
    req.assert("Password", "password must be 8 characters.").isLength({ min: 8 });

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors.");
        res.status(400).send({errors});
        return;
    }

    var user = [];
    user = req.body;

    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection)
    userDAO.selectUser(user, function (error, result) {

      if (result[0] && result[0].Enable == 1) {
        return res.send(JSON.stringify({ msg: "This user already has a record.", result }));
      } else {

        bcrypt.hash(req.body.Password, saltRounds, function (error, hash) {

          user.Password = hash;
          user.DateCreated = moment().format('YYYY/MM/DD HH:mm:ss');
          user.DateUpdated = moment().format('YYYY/MM/DD HH:mm:ss');
          user.Enable = 1;

          userDAO.save(user, function (err, results) {

            console.log(err)

            if (error) {
              console.log('Error in query in database. ' + error);
              res.status(500).send(error);
              return;
            }

          if (err) throw err;
          return res.send(JSON.stringify({ msg: "Congratulations.", results }));
            
          });

        });
      }
    })
  });

  app.post('/api/users/signin', function (req, res) {

    var user = [];
    user = req.body;
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);

    userDAO.selectUser(user, function (error, result) {

      if (error) {
        res.status(500).send(error);
      } else {
        if (result[0] == null) {
          var valor_retorno = "";
        }
        else {
          var valor_retorno = result[0].Password;
          var name_user = result[0].Name;
          var id = result[0].Id;
          var avatar = result[0].AvatarImg
        }
        bcrypt.compare(req.body.Password, valor_retorno, function (err, result) {
          if (result) {
            const payload = {
              check: true,
              admin: true,
              role: 1,
              name: name_user,
              id: id,
              avatar: avatar
            };
            var token = jwt.sign(payload, app.get('Secret'), {
              expiresIn: 1440 // expires in 24 hours
            });
            res.status(200).send({
              auth: true,
              token: token,
            });
          } else {
            res.status(500).send({
              ok: 'Password Password refuted. :[',
              admin: false,
              token: null,
              err: err
            });
          }
        });
      }
    });
  });

  app.post('/users/user', function (req, res) {
    req.assert("name", "name is required.").notEmpty();
    req.assert("email", "email is required.").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      console.log("Validation errors.");
      res.status(400).send(errors);
      return;
    }
    var user = req.body;
    console.log('processando uma requisicao de um novo usuario');
    user.enable = 1;
    user.dateCreated = new Date;
    user.dateUpdated = new Date;
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);

    userDAO.save(user, function (error, result) {
      if (error) {
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {
        console.log('User created.');
        res.location('/users/user/' + result.insertId);
        res.status(201).json(user);
      }
    });
  });

  app.put('/users/user/:id', function (req, res) {
    req.assert("name", "name is required.").notEmpty();
    req.assert("email", "email is required.").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      console.log("Validation errors.");
      res.status(400).send(errors);
      return;
    }
    var user = req.body;
    console.log('Processando uma requisicao de atualização do usuario');
    var id = req.params.id;
    user.id = id;
    user.enable = 1;
    user.dateUpdated = new Date;
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);
    userDAO.update(user, function (error, result) {
      if (error) {
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {
        console.log('User updated.');
        res.status(201).json(user);
      }
    });
  });

  app.delete('/users/user/:id', function (req, res) {
    var user = {};
    var id = req.params.id;
    user.id = id;
    user.enable = 0;
    user.dateUpdated = new Date;
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);
    userDAO.delete(user, function (erro) {
      if (erro) {
        res.status(500).send(erro);
        return;
      }
      console.log('User deleted.');
      res.status(204).send(user);
    });
  });

  app.post('/api/users/update-password', function (req, res) {
    var user = [];
    user = req.body;
    var connection = app.infra.connectionFactory();
    var userDAO = new app.infra.UserDAO(connection);
    userDAO.getById(user.Id, function (error, result) {
      if (error) throw error;
      if (result) {
        var valor_retorno = result[0].Password;
        bcrypt.compare(req.body.OldPassword, valor_retorno, function (err, resultBcript) {
          if (resultBcript) {
            bcrypt.hash(req.body.NewPassword, saltRounds, function (error, hash) {
              user.Password = hash;
              user.DateCreated = moment().format('YYYY/MM/DD HH:mm:ss');
              user.DateUpdated = moment().format('YYYY/MM/DD HH:mm:ss');
              user.Enable = 1;
              userDAO.updatePassword(user, function (err, results) {
                if (err) throw err;
                return res.send(JSON.stringify({ msg: "Congratulations, password changed!.", results }));
              });
            });
          } else {
            return res.send(JSON.stringify({ msg: "Old Password Incorrect." }));
          }
        });
      } else {
        return res.send(JSON.stringify({ msg: "User not found." }));
      }
    })
  });

}
