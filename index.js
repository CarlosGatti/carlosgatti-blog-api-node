var app = require('./config/custom-express')();
var config = require('./config');
app.set('Secret', config.secret);

// use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
//const host = 'localhost';
const port = process.env.PORT || 3001;

app.listen(port, host, function() {
  console.log('Server running on the port ' + port);
});