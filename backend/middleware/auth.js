const jwt = require('jsonwebtoken');
const message = require('../utils/constants');

function verifyToken(req, res, next) {
  const bearerHeader =
    req.body.token || req.query.token || req.headers['authorization'];

  if (!bearerHeader) {
    res.status(403).json({ message: message.TOKEN_REQUIRED });
    return;
  }

  const bearerToken = bearerHeader.split(' ');
  const token = bearerToken[1];
  console.log('token: ', token);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) {
      res.status(401).json({ message: 'Token expired!' });
    }
    req.user = data;
  });

  next();
}

module.exports = verifyToken;
