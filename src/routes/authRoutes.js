// src/routes/authRoutes.js
const express = require('express');
const { register, verifyEmail, login } = require('../controllers/authController');
const { validateRegistration, validateLogin, handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validateRegistration, handleValidationErrors, register);
router.get('/verify-email', verifyEmail);
router.post('/login', validateLogin, handleValidationErrors, login);

module.exports = router;