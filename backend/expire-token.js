const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'auth_db'
});

connection.connect();

connection.query(
  "UPDATE refresh_tokens SET expires_at = '2020-01-01' WHERE user_id = 1",
  (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Refresh token expired:', results);
      
      // Show the updated token
      connection.query(
        'SELECT id, expires_at FROM refresh_tokens WHERE user_id = 1',
        (err, rows) => {
          if (err) {
            console.error('Error:', err);
          } else {
            console.log('Updated token info:', rows);
          }
          connection.end();
        }
      );
    }
  }
);
