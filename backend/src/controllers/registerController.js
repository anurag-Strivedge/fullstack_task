const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const registerController = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }

          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }

            // Store user in database
            pool.query(
              'INSERT INTO users (email, password) VALUES (?, ?)',
              [email, hashedPassword],
              (err, result) => {
                if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({ error: 'Internal server error' });
                }

                const userId = result.insertId;

                // Generate tokens
                const accessToken = generateAccessToken(userId, email);
                const refreshToken = generateRefreshToken(userId, email);

                // Store refresh token in database
                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                pool.query(
                  'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
                  [userId, refreshToken, expiresAt],
                  (err) => {
                    if (err) {
                      console.error('Database error:', err);
                      return res.status(500).json({ error: 'Internal server error' });
                    }

                    res.status(201).json({
                      message: 'User registered successfully',
                      accessToken,
                      refreshToken,
                      userId
                    });
                  }
                );
              }
            );
          });
        });
      }
    );
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerController };
