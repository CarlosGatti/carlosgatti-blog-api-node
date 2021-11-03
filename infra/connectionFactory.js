var mysql = require('mysql');
require('dotenv').config();

function createDBConnection(){
  return mysql.createConnection({
    host:process.env.DATABASE_URL,
    user:process.env.DATABASE_USER, 
    password:process.env.DATABASE_PASSWORD,
    //database:process.env.DATABASE,
    database:process.env.CLEARDB_DATABASE_URL
  });
}

module.exports=function(){
  return createDBConnection;
}
