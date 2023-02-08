var mysql = require('mysql');
var conn  = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : '1234',
 database : 'mb',

});
/*conn.connect(function(err) {
 if (err) {
 console.log('連線 MySQL, 失敗!');
 return;
 }
 console.log('連線 MySQL, OK!');
});*/


var connection;

function handleDisconnect() {
  connection = (conn); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
    console.log('連線 MySQL, 失敗!');
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }   
    console.log('連線 MySQL, OK!');                                  // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
module.exports =conn;