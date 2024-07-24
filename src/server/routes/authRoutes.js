const express = require('express');
const { login, register, getUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user', authenticateToken, getUser);

module.exports = router;
