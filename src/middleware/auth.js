const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
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

const validateToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error();
  }
};

const generateAuthToken = async ({ id, expiresIn }) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn });

  // Do something with token

  return token;
};

module.exports = { auth, generateAuthToken, validateToken };
