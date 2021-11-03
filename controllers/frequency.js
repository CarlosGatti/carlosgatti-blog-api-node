var logger = require("../service/logger.js");
var bodyParser = require('body-parser');
var moment = require('moment');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');

const accountSid = 'AC2216f41c35c6be134e0597631e879e5a';
const authToken = '4a0509ae6d13bd16e9a75ddaad733913';
const client = require('twilio')(accountSid, authToken);

module.exports = function (app) {



  app.get('/api/frequency/gethoursmonth', function (req, res) {
    var connection = app.infra.connectionFactory();
    var frequencyDAO = new app.infra.FrequencyDAO(connection);

    frequencyDAO.getHoursMonth(function (error, result) {
      if (error) {
        console.log('Error in query in database.' + error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
       console.log(result);
      // console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });

  app.get('/api/frequency/events', function (req, res) {
    var connection = app.infra.connectionFactory();
    var frequencyDAO = new app.infra.FrequencyDAO(connection);

    frequencyDAO.getFrequencyEvents(function (error, result) {
      if (error) {
        console.log('Error in query in database.' + error);
        return;
      }
      logger.info('He searched for ' + JSON.stringify(result));
       console.log(result);
      // console.log('User found. ' + JSON.stringify(result));
      res.json(result);
    });
  });



}







