// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
  // Aseguramos que expiresIn sea un número (en segundos)
  const expiresInSeconds = typeof expiresIn === 'string'
    ? parseInt(expiresIn, 10)
    : expiresIn;

  if (isNaN(expiresInSeconds)) {
    throw new Error('"expiresIn" debe ser un número de segundos');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresInSeconds });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };