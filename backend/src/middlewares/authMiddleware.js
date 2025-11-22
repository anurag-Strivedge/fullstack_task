const { verifyAccessToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token is required' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({ 
        error: 'Access token expired or invalid. Please use /refresh-token endpoint to get a new access token.' 
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = { authMiddleware };
