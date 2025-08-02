// backend/src/index.ts
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { conectarDB } from './config/db';
import logMiddleware from './middlewares/logMiddleware';

// Rutas
import authRoutes from './routes/auth';
import libroRoutes from './routes/libros';
import carritoRoutes from './routes/carrito';
import pedidoRoutes from './routes/pedidos';
import adminRoutes from './routes/admin';

dotenv.config();
const app: Application = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(logMiddleware);

// Conexión a la base de datos
conectarDB();

// --- Rutas de la API (TODAS deben tener el prefijo /api) ---
// Vercel usará estas rutas para la función serverless del backend.
app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/admin', adminRoutes);

// --- Servir archivos estáticos de 'uploads' ---
// Esta ruta es correcta porque sirve archivos específicos (imágenes) bajo la ruta /api/
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Iniciar servidor SOLO para desarrollo local ---
// El bloque `if (!process.env.VERCEL)` asegura que `app.listen`
// no se ejecute en el entorno de Vercel, lo cual es la práctica correcta.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo para desarrollo local en http://localhost:${PORT}`);
  });
}

// Exportar la app para que Vercel la utilice como una función serverless
export default app;
