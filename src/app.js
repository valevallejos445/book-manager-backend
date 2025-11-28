// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// --- CONFIGURACIÓN DE CORS PARA MÚLTIPLES ORÍGENES ---
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://book-manager-frontend-git-master-valentinas-projects-4694b4c8.vercel.app',
  'https://book-manager-frontend-alpha.vercel.app',
  'https://book-manager-frontend-ebhgh3jh2-valentinas-projects-4694b4c8.vercel.app',
  'https://book-manager-frontend-git-master-valentines-projects-4d994ac6.vercel.app'
  // Agregá más URLs si es necesario
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como Postman) o si el origen está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS Bloqueado: Origen ${origin} no permitido.`);
      callback(new Error('No permitido por la política de CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions)); // ← Usa la configuración personalizada
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