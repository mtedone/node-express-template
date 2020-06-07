const jwt = require('jsonwebtoken');

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

module.exports = { validateToken, generateAuthToken };
