// server.js
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Falló la conexión a la base de datos:', err);
  process.exit(1);
});