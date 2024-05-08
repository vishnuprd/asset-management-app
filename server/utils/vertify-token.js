const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  const token = req.headers['authorization'].split(' ')[1]; // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = data.user; // Attach the user object to the request
    next(); // Call the next middleware or route handler
  });
};

module.exports = verifyToken;
