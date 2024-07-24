const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');


router.get('/user', authenticateToken, userController.getUser);

module.exports = router;
