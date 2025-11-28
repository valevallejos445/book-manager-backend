// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// ✅ CORS configurado correctamente para producción
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://book-manager-frontend-git-master-valentinas-projects-4694b4c8.vercel.app',
  optionsSuccessStatus: 200
};

app.use(helmet());
app.use(cors(corsOptions)); // ← Usa corsOptions, no la configuración simple
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({ message: '✅ Backend activo' });
});

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

module.exports = app;