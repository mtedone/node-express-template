const jwt = require('jsonwebtoken');
const { validateToken } = require('../utils/jwt');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = validateToken(token);
    // Do something with token

    next();
  } catch (e) {
    res.status(401).send({
      error: 'Please authenticate',
    });
  }
};

module.exports = auth;
