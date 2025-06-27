const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/login', userController.login);
router.patch('/:id', userController.updateUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router; 