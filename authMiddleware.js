const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err); 
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
  
}
module.exports = authenticateToken;
