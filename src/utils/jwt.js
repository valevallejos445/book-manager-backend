// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  // Usamos el valor directamente: 7 días = 604800 segundos
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 604800 });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };