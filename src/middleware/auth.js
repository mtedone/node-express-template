const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Do something with token

        next();
    } catch (e) {
        res.status(401).send({
            error: 'Please authenticate'
        });
    }
};

module.exports = auth;