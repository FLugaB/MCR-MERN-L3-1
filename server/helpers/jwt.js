const jwt = require('jsonwebtoken');

const getToken = (val) => {
    return jwt.sign(val, process.env.JWT_SECRET_KEY);
}

const verifyToken = (val) => {
    return jwt.verify(val, process.env.JWT_SECRET_KEY);
}

module.exports = {
    getToken,
    verifyToken
}