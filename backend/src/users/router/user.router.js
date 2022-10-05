const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/add', userController.addUser);
router.put('/edit/:id', userController.editUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
