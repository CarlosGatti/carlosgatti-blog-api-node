var mysql = require('mysql');
require('dotenv').config();

function createDBConnection(){
  return mysql.createConnection({
    host:process.env.CLEAR_DATABASE_URL,
    user:process.env.CLEAR_DATABASE_USER, 
    password:process.env.CLEAR_DATABASE_PASSWORD,
    database:process.env.CLEAR_DATABASE,
  });
}

module.exports=function(){
  return createDBConnection;
}
