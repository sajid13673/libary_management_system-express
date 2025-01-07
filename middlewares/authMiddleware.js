const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Adjust your model path accordingly

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1]; // Split and get the token part

  if (!token) {
    return res.status(401).json({ message: 'Invalid authentication token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded token:', decoded);

    // Fetch the full user details from the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user object to the request
    next();
  } catch (error) {
    // console.log('Error during authentication:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = authMiddleware;
