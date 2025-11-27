// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '✅ Backend activo' });
});

// Rutas
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;