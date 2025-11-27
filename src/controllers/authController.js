// src/controllers/authController.js
const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token requerido' });
    const result = await userService.verifyEmail(token);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verifyEmail, login };