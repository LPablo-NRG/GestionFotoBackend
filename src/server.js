require('dotenv').config({ path: __dirname + '/.env' }); 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photoRoutes'); // Sin .js

const app = express();

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error de conexión:", err);
    process.exit(1);
  }
};

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api/photos", photoRoutes);

// Iniciar servidor solo si no es test
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en puerto ${process.env.PORT}`);
    });
  });
}

module.exports = app; // Exportar con CommonJS