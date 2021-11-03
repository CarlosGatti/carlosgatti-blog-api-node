var mysql = require('mysql');
require('dotenv').config();

function createDBConnection(){
  return mysql.createConnection({
    host:process.env.CLEARDB_DATABASE_URL,
    user:process.env.CLEARDB_DATABASE_USER, 
    password:process.env.CLEARDB_DATABASE_PASSWORD,
    database:process.env.CLEARDB_DATABASE,
  });
}

module.exports=function(){
  return createDBConnection;
}