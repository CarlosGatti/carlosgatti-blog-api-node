var winston = require('winston');
var fs = require('fs');

if(!fs.existsSync('logs')){
  fs.mkdirSync('logs');
}

module.exports = winston.createLogger({
  level: 'info',
  timestamp: true,
  transports: [ //transports ao invés de transport
    new winston.transports.File({ filename: './logs/user.log'}),
    new winston.transports.Console()
  ]
});


