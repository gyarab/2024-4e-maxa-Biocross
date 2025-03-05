var mysql = require('mysql2');
var con = mysql.createConnection({
  host: 'db-biocross-biocross.b.aivencloud.com', 
  port: '13258',
  user: 'avnadmin', 
  password: 'AVNS_j7kWxPUKk-hSR7M9Dai',        
  database: 'defaultdb' 
}); 
con.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = con;``