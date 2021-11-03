var logger = require("../service/logger.js");
var bodyParser = require('body-parser');
var moment = require('moment');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');

const accountSid = 'AC2216f41c35c6be134e0597631e879e5a';
const authToken = '4a0509ae6d13bd16e9a75ddaad733913';
const client = require('twilio')(accountSid, authToken);

module.exports = function (app) {

  //Create customer
  app.post('/api/schedule/customer/create', function (req, res) {

    var customer = [];
    var backOffice = [];
    var emailTo = [];
    var phoneTo = [];

    customer = req.body;
    customer.DateSold = moment(customer.DateSold).format('YYYY/MM/DD HH:mm:ss');
    customer.FollowUpId = 1;
    customer.Status = 0;

    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.save(customer, function (error, result) {
      if (error) {
        console.log("mysql", error);
        res.status(500).send(error);
      } else {
        bodyReturn = result;
        scheduleDAO.getBackoffice(function (error, result) {
          if (error) {
            console.log("mysql", error);
            console.log('Error inserting into database' + error);
            res.status(500).send(error);
          } else {

            backOffice = result;

            for (var i = 0; i < backOffice.length; i++) {
              if (backOffice[i].Email !== null) {
                emailTo += backOffice[i].Email + ","
              }
            }
            //***********************EMAIL***********************//
            const mailOptions = {
              from: 'csacarlosgatti@gmail.com',
              to: emailTo,
              subject: 'SCHEDULE :: Backlog :: ' + customer.City + ' - ' + customer.ContactName,
              html: "<p>Hi!</p>Please schedule the Walk Thru.<p></p><p><b>Name: </b> " + customer.ContactName + "</p> <p><b>Address: </b> " + customer.Address + " - " + customer.City + " - " + customer.StateDesc + " </p> <p><b>Job Description: </b>" + customer.JobDescription + "</p><p><b>Phone Number: </b> " + customer.PhoneNumber + " </p></br> <p><b>Link Google Maps: </b><a href=https://goo.gl/maps/F8YLRZRmZsMynqqSA>Clique aqui</a> to open the map.</p>"
            };
            for (var i = 0; i < backOffice.length; i++) {
              if (backOffice[i].Number !== null) {
                var message = client.messages.create({
                  body: 'Attention, you need to schedule a walk thru in ' + customer.City + ' . Customer: ' + customer.ContactName + ' - Phone Number: ' + customer.PhoneNumber + ' Check your dashboard. (www.obiehvac.com/schedule/) :: GoogleMaps Link: ' + customer.GMaps,
                  from: '+12394654869',
                  to: backOffice[i].Number
                })
                  .then(message => console.log(message.status))
                  .done();
              }
            }
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email enviado: ' + info.response);
              }
            });
            res.message = "working";
            //  console.log(result);
            res.json(result);
          }
        })
      }
    });
  });

  //Update customer
  app.post('/api/schedule/customer/update', function (req, res) {
    var customer = [];
    customer = req.body;
    customer.DateSold = moment(customer.DateSold).format('YYYY/MM/DD HH:mm:ss');
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.update(customer, function (error, result) {
      if (error) {
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {
        res.json(result);
      }
    });
  });



  //Update customer
  app.post('/api/schedule/customer/update/walkthruscheduled', function (req, res) {
    var customer = [];
    var location = [];
    var localtionF = [];
    customer = req.body;
    location = req.body.locationsSelected;


    customer.DateWalk = moment(customer.DateWalk).format('YYYY/MM/DD HH:mm:ss');
    customer.FollowUpId = 1;



    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    for (var i = 0; i < location.length; i++) {
      localtionF += location[i];

    };

console.log("teste", localtionF.locationsSelected);

    for (var j = 0; j < localtionF.length; j++) {
      scheduleDAO.saveLocation(localtionF[j], function (error, result) {
        if (error) {
          console.log('Error inserting into database' + error);
          res.status(500).send(error);
        } else {
          res.json(result);
        }

      });

    };



 ``





    scheduleDAO.updateWalk(customer, function (error, result) {
      if (error) {
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {
        res.json(result);
      }
    });


  });







  //Lista todos os registros de schedules
  app.get('/api/schedule/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.getAll(function (error, result) {
      if (error) {
        console.log('Error in query in database.' + error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      // console.log(result);
      // console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });

  //Lista todos os registros de times
  app.get('/api/schedule/team', function (req, res) {

    list = [];
    teamScheduled = [];



    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.getAllTeamScheduled(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);

        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      // console.log(result);
      // console.log('User found. ' + JSON.stringify(result));



      let pessoaProxy = teamBusca(result);



      console.log("teste", pessoaProxy)


      res.json(result);
    });
  });

  //Criar schedule
  app.post('/api/schedule/create', function (req, res) {

    var schedule = [];

    schedule = req.body;
    schedule.DateSold = moment(schedule.DateSold).format('YYYY/MM/DD HH:mm:ss');
    schedule.DateStart = moment(schedule.DateStart).format('YYYY/MM/DD HH:mm:ss');
    schedule.DateEnd = moment(schedule.DateEnd).format('YYYY/MM/DD HH:mm:ss');


    schedule.Status = 0;

    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.save(schedule, function (error, result) {
      if (error) {
        console.log("mysql", error);
        res.status(500).send(error);
      } else {
        res.message = "working";
        res.json(result);
      }
    });
  });

  //Update schedule
  app.post('/api/schedule/update', function (req, res) {
    var schedule = [];
    schedule = req.body;


    schedule.DateSold = moment(schedule.DateSold).format('YYYY/MM/DD HH:mm:ss');


    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);




    scheduleDAO.update(schedule, function (error, result) {
      if (error) {
        console.log("mysql", error);
        console.log('Error inserting into database' + error);
        res.status(500).send(error);
      } else {


        //***********************EMAIL***********************//
        //  const mailOptions = {
        //  from: 'csacarlosgatti@gmail.com',
        //  to: 'obie.rosa@obiehvac.com',
        //  subject: 'SCHEDULE :: Walk Thru :: ' + schedule.City + ' - ' + schedule.ContactName,
        //   html: "<p>Hi!</p><p><b>Name: </b> " + schedule.ContactName + "</p> <p><b>Address: </b> " + schedule.Address + " - " + schedule.City + " - " + schedule.StateDesc + " </p> <p><b>Job Description: </b>" + schedule.JobDescription + "</p><p><b>Phone Number: </b> " + schedule.PhoneNumber + " </p></br> <p><b>Link Google Maps: </b><a href=https://goo.gl/maps/F8YLRZRmZsMynqqSA>Clique aqui</a> to open the map.</p>" 
        // };

        //  transporter.sendMail(mailOptions, function(error, info){
        //    if (error) {
        //     console.log(error);
        //   } else {
        //     console.log('Email enviado: ' + info.response);
        //   }
        // });


        //***********************SMS***********************//
        //  client.messages
        //   .create({
        //     body: 'New job scheduled for you in ' + schedule.City + ' . Customer: ' + schedule.ContactName + ' - Phone Number: ' + schedule.PhoneNumber + ' Check your dashboard. (www.obiehvac.com/schedule/)',
        //      from: '+12394654869',
        //      to: '+18573507504'
        //    })
        //   .then(message => console.log(message.sid));











        res.message = "working";
        //  console.log(result);
        //res.json(result);
      }
    });
  });



  //seleciona o schedule por id
  app.get('/api/schedule/getbyid/:id', function (req, res) {
    var id = req.params.id;
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    scheduleDAO.getScheduleById(id, function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      //console.log(req.body);
      //console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });

  //seleciona o team que foi selecionado em relacao ao schedule
  app.get('/api/schedule/getAllSelected/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.getAllSelected(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
      //console.log(req.body);
      //console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });

  //seleciona o team que foi selecionado em relacao ao schedule
  app.get('/api/schedule/followup/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.getFollowUp(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      res.json(result);
    });
  });

  //Registra o team em relaçao ao schedule agendado
  app.post('/api/schedule/registerteam/', function (req, res) {
    var teamSelected = [];
    var schedule = [];
    teamSelected = req.body;
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    for (let i = 0; i < teamSelected.team.roles.length; i++) {
      schedule.Schedule_ScheduleId = teamSelected.ScheduleId;
      schedule.User_Id = teamSelected.team.roles[i];
      schedule.Status = 0;
      scheduleDAO.saveTeam(schedule, function (error, result) {
        if (error) {
          console.log("[mysql error]", error);
          res.status(500).send(error);
        } else {
          res.message = "working";
          res.end(JSON.stringify(result));
        }
      })
    }
  });





  //seleciona o team que foi selecionado em relacao ao schedule
  app.get('/api/schedule/followup/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.getFollowUp(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      res.json(result);
    });
  });



  //Registra a location que será instalado o sistema
  app.post('/api/schedule/location/register', function (req, res) {
    var locationSelected = [];
    var location = [];
    var ScheduleId = '';

    locationSelected = req.body.locationsSelected;
    ScheduleId = req.body.ScheduleId;

    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);

    for (let i = 0; i < locationSelected.length; i++) {

      location.ScheduleId = ScheduleId;
      location.LocationId = locationSelected[i];

      scheduleDAO.saveLocation(location, function (error, result) {
        if (error) {
          console.log("[mysql error]", error);
          res.status(500).send(error);
        } else {
          res.message = "working";
          res.end(JSON.stringify(result));
        }
      })
    }
  });


  //Deleta schedule selecionado, modificando o status para 1.
  app.post('/api/schedule/delete/', function (req, res) {
    var schedule = [];
    schedule = req.body;
    schedule.Status = 1;
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.deleteSchedule(schedule, function (error, result) {
      if (error) {
        console.log("[mysql error]", error);
        res.status(500).send(error);
      } else {
        res.message = "working";
        res.end(JSON.stringify(result));
      }
    })
  });

  //Deleta team selecionado, modificando o status para 1.
  app.post('/api/schedule/team/delete/', function (req, res) {
    var schedule = [];
    schedule = req.body;
    schedule.Status = 1;
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.deleteTeam(schedule, function (error, result) {
      if (error) {
        console.log("[mysql error]", error);
        res.status(500).send(error);
      } else {
        res.message = "working";
        res.end(JSON.stringify(result));
      }
    })
  });

  //Deleta schedule selecionado, modificando o status para 1.
  app.post('/api/schedule/selectByDate/', function (req, res) {
    var schedule = [];

    schedule = req.body;

    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    var newDate = dateFormat(schedule.DateStart, "yyyy-mm-dd")

    scheduleDAO.getScheduleByDate(newDate, function (error, result) {
      if (error) {
        console.log("[mysql error]", error);
        res.status(500).send(error);
      } else {
        res.message = "working";
        res.end(JSON.stringify(result));
      }
    })
  });







  //seleciona o locations que foi selecionado em relacao ao schedule
  app.get('/api/schedule/location/', function (req, res) {
    var connection = app.infra.connectionFactory();
    var scheduleDAO = new app.infra.ScheduleDAO(connection);
    scheduleDAO.getLocation(function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      }
      res.json(result);
    });
  });


  //*****************************EMAILS*****************************/






  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "csacarlosgatti@gmail.com",
      pass: "Gizelly9dudu8"
    },
    tls: { rejectUnauthorized: false }
  });













}







