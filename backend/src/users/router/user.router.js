// imports
const express = require('express');
const { param } = require('express-validator');
const userController = require('../controller/user.controller');
const verifyToken = require('../../../middleware/auth');
const userSchema = require('../../../middleware/users-validation');

const router = express.Router();

// routes
router.get('/', verifyToken, userController.getAllUser);
router.post('/add', verifyToken, userSchema, userController.addUser);
router.put(
  '/edit/:id',
  verifyToken,
  [param('id').exists()],
  userSchema,
  userController.editUser
);
router.delete(
  '/delete-user/:userId',
  verifyToken,
  [param('userId').exists()],
  userController.deleteUser
);
router.get('/:id', verifyToken, [param('id', 'Id shold be exist').exists()], userController.getUser);
router.delete(
  '/delete/:id',
  verifyToken,
  [param('id').exists()],
  userController.disableUser
);
router.put(
  '/activate/:id',
  verifyToken,
  [param('id').exists()],
  userController.activateUser
);

module.exports = router;
