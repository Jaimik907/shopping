const jwt = require('jsonwebtoken');
const User = require('../src/users/model/user.model');
const message = require('../utils/constants');
const Sequelize = require('sequelize');

function verifyToken(req, res, next) {
  const bearerHeader =
    req.body.token || req.query.token || req.headers['authorization'];

  if (!bearerHeader) {
    res.status(403).json({ message: message.TOKEN_REQUIRED });
    return;
  }

  const bearerToken = bearerHeader.split(' ');
  const token = bearerToken[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) {
      res.status(401).json({ message: 'Token expired!' });
      return;
    }

    User.findOne({
      where: { email: data.email },
      attributes: [
        [
          Sequelize.fn(
            'concat',
            Sequelize.col('firstName'),
            ' ',
            Sequelize.col('lastName')
          ),
          'fullName',
        ],
        'username',
        'email',
        'addressOne',
        'addressTwo',
        'street',
        'city',
        'state',
        'userType',
        'id',
      ],
    })
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: message.USER_EXIST });
        }
      })
      .catch((e) => {
        res.status(500).json({ message: message.SOMETHING_WENT_WRONG });
      });
  });
}

module.exports = verifyToken;
