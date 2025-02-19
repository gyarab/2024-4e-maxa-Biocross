var mysql = require('mysql2');
var con = mysql.createConnection({
  host: '127.0.0.1', 
  port: '3306',
  user: 'root', 
  password: 'root',        
  database: 'biocross' 
}); 
con.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = con;``