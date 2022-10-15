const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../users/model/user.model');
const message = require('../../../utils/constants');

exports.login = (req, res, next) => {
  const user_email = req.body.email;
  const user_password = req.body.password;

  if (!(user_email && user_password)) {
    res.status(400).json({ message: message.LOGIN_INPUTS_REQUIRED });
    return;
  }

  User.findOne({
    where: { email: user_email },
  })
    .then((user) => {

      if (!user) {
        res.status(400).json({ message: message.USER_NOT_FOUND });
        return;
      }

      // compare the password with db
      bcrypt
        .compare(user_password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            res.status(401).json({ message: message.PASSWORD_NOT_MATCH });
            return;
          }

          const user_credential = {
            email: user_email,
            password: user_password,
          };

          const token = jwt.sign(user_credential, process.env.ACCESS_TOKEN, {
            expiresIn: '2h',
          });

          const {
            firstName,
            lastName,
            addressOne,
            addressTwo,
            street,
            email,
            city,
            state,
            username,
          } = user;

          res
            .status(200)
            .json({
              firstName,
              lastName,
              addressOne,
              addressTwo,
              street,
              city,
              state,
              username,
              email,
              token,
            });
        })
        .catch((e) => {
          console.log('e: ', e);
          res
            .status(500)
            .json({ message: message.SOMETHING_WENT_WRONG, err: e });
        });
    })
    .catch((e) => {
      console.log('e: ', e);
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, err: e });
    });
};
