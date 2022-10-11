const express = require('express');
const { body, check } = require('express-validator/check');
const message = require('../../../utils/constants');
const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/', userController.getAllUser);
const testEmail = 'test@test.com';
router.post(
  '/add',
  [
    body('email', message.VALID_EMAIL)
      .isEmail()
      .custom((value, { req, res }) => {
        if (value === testEmail) {
          res.status(500).json({ message: 'This email is forbidden!' });
        }
      }),
  ],
  userController.addUser
);
router.put(
  '/edit/:id',
  check('email')
    .isEmail()
    .withMessage(message.NOT_VALID_EMAIL)
    .custom((value, { req }) => {
      if (value === testEmail) {
        throw new Error(message.NOT_VALID_EMAIL);
      }
      return true;
    }),
  userController.editUser
);
router.delete('/delete-user/:userId', userController.deleteUser);
router.get('/:id', userController.getUser);
router.delete('/delete/:id', userController.disableUser);
router.put('/activate/:id', userController.activateUser);

module.exports = router;
