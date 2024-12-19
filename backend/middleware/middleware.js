const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
