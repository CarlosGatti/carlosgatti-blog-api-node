var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../service/logger.js');
var cors = require('cors')

jwt = require('jsonwebtoken'),
config = require('../config'),

module.exports = function () {
  var app = express();
  app.use(cors(),morgan("common", {
    stream:{
      write:function(message){
        logger.info(message);
      }
    }
  }));
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  consign()
    .include('controllers')
    .then('infra')
    .into(app);

  return app;
}
