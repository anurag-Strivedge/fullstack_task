const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const loginController = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    pool.query(
      'SELECT id, password FROM users WHERE email = ?',
      [email],
      (err, users) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (users.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Compare password
        bcrypt.compare(password, user.password, (err, isPasswordValid) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }

          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }

          // Generate tokens
          const accessToken = generateAccessToken(user.id, email);
          const refreshToken = generateRefreshToken(user.id, email);

          // Store refresh token in database
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          pool.query(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user.id, refreshToken, expiresAt],
            (err) => {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
              }

              res.json({
                message: 'Login successful',
                accessToken,
                refreshToken,
                userId: user.id
              });
            }
          );
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginController };
