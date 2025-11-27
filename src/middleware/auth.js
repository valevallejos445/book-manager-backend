// src/middleware/auth.js
const jwtUtils = require('../utils/jwt');
const userRepository = require('../repositories/userRepository');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = { protect };