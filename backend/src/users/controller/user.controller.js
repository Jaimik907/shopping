const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../model/user.model');
const { validationResult } = require('express-validator/check');
const message = require('../../../utils/constants');

exports.addUser = (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    street,
    addressOne,
    addressTwo,
    city,
    state,
    email,
  } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(422).json({ message: error.array()[0].msg });
    return;
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: message.USER_EXIST });
        return;
      }

      bcrypt
        .hash(password, 12)
        .then((encryptedPassword) => {
          return User.create({
            username,
            password: encryptedPassword,
            firstName,
            lastName,
            addressOne,
            addressTwo,
            street,
            city,
            state,
            email,
            registeredDate: Date.now(),
          });
        })
        .then(() => {
          res.status(200).json({ message: message.USER_CREATED });
        })
        .catch((e) => {
          res.status(500).json({ error: e.errors });
        });
    })
    .catch((e) =>
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, error: e })
    );
};

exports.getAllUser = (req, res, next) => {
  User.findAll({
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
      'id',
    ],
  })
    .then((users) => {
      if (users.length) {
        res.status(200).json({ message: message.USER_LIST_FETCH, users });
      } else {
        res.status(404).json({ message: message.USER_NOT_FOUND });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, error: e });
    });
};

exports.editUser = (req, res, next) => {
  const id = req.params.id;

  // Get all the user properties from request body except the password.
  let { password, ...body } = req.body;

  const error = validationResult(req);
  console.log('error: ', error);

  if (!error.isEmpty()) {
    res.status(422).json({ message: error.array()[0].msg });
    return;
  }

  User.update(body, {
    where: {
      id: id,
    },
    returning: true,
    plain: true,
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: message.USER_NOT_FOUND });
        return;
      }
      res.status(200).json({ message: message.USER_DETAILS_UPDATED, user });
    })
    .catch((e) => {
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, error: e });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        const error = new Error();
        error.statusCode = 404;
        error.message = message.USER_NOT_FOUND;
        throw error;
      }

      return user.destroy();
    })
    .then(() => {
      res.status(200).json({ message: message.USER_DELETE });
    })
    .catch((e) => {
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, error: e });
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
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
      'id',
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: message.USER_NOT_FOUND });
        return;
      }
      res.status(200).json({ message: message.USER_FOUND, user });
    })
    .catch((e) => {
      res.status(500).json({ message: message.SOMETHING_WENT_WRONG, error: e });
    });
};

// soft delete
exports.disableUser = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    if (!user) {
      res.status(404).json({ message: message.USER_NOT_FOUND });
      return;
    }

    let isActive = false;
    User.update({ isActive: isActive }, { where: { id: id } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: message.USER_NOT_FOUND });
          return;
        }
        res.status(200).json({ message: message.USER_DELETE });
      })
      .catch((e) => {
        res
          .status(500)
          .json({ message: message.SOMETHING_WENT_WRONG, error: e });
      });
  });
};

exports.activateUser = (req, res, next) => {
  const id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    if (!user) {
      res.status(404).json({ message: message.USER_NOT_FOUND });
      return;
    }

    let isActive = true;
    User.update({ isActive: isActive }, { where: { id: id } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: message.USER_NOT_FOUND });
          return;
        }
        res.status(200).json({ message: message.USER_ACTIVATED });
      })
      .catch((e) => {
        res
          .status(500)
          .json({ message: message.SOMETHING_WENT_WRONG, error: e });
      });
  });
};
