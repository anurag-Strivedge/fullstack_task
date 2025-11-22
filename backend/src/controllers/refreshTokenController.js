const { pool } = require('../config/database');
const { generateAccessToken, verifyRefreshToken } = require('../utils/jwt');

const refreshTokenController = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Check if refresh token exists in database and is not expired
    pool.query(
      'SELECT id FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
      [refreshToken],
      (err, tokens) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (tokens.length === 0) {
          return res.status(401).json({ error: 'Refresh token not found or expired' });
        }

        // Generate new access token
        const accessToken = generateAccessToken(decoded.userId, decoded.email);

        res.json({
          message: 'Access token refreshed successfully',
          accessToken
        });
      }
    );
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { refreshTokenController };
