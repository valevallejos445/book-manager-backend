// src/middleware/validate.js
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Nombre es requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña debe tener al menos 6 caracteres')
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña es requerida')
];

const validateBook = [
  body('title').trim().notEmpty().withMessage('Título es requerido'),
  body('author').trim().notEmpty().withMessage('Autor es requerido'),
  body('description').optional().trim()
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateBook,
  handleValidationErrors
};