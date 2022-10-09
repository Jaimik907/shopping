const express = require('express');
const emailValidator = require('email-validator');
const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/', userController.getAllUser);

function checkEmail(req, res, next) {
  if (!emailValidator.validate(req.body.email)) {
    res.status(400).json({ message: 'Invalid Email format' });
    return;
  }
  next();
}
router.post('/add', checkEmail, userController.addUser);
router.put('/edit/:id', checkEmail, userController.editUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/:id', userController.getUser);

module.exports = router;
