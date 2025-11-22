const mysql = require('mysql2');

// First, create a connection without specifying a database to create it
const adminPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create database if it doesn't exist
function createDatabaseIfNotExists() {
  return new Promise((resolve, reject) => {
    adminPool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'auth_db'}`, (err) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// Now create the main pool with database specified
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auth_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and create users table if not exists
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    createDatabaseIfNotExists()
      .then(() => {
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Database connection error:', err);
            return reject(err);
          }

          // Create users table
          connection.query(`
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              console.error('Error creating users table:', err);
              connection.release();
              return reject(err);
            }

            // Create refresh_tokens table
            connection.query(`
              CREATE TABLE IF NOT EXISTS refresh_tokens (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                token VARCHAR(500) NOT NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
              )
            `, (err) => {
              connection.release();
              if (err) {
                console.error('Error creating refresh_tokens table:', err);
                return reject(err);
              }
              console.log('Database initialized successfully');
              resolve();
            });
          });
        });
      })
      .catch(reject);
  });
}

module.exports = { pool, initializeDatabase };
