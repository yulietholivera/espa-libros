import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from './config/db';

// Rutas
import authRoutes from './routes/auth';
import libroRoutes from './routes/libros';
import carritoRoutes from './routes/carrito';
import pedidoRoutes from './routes/pedidos';
import adminRoutes from './routes/admin';

dotenv.config();
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
conectarDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});