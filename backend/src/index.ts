// backend/src/index.ts
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { conectarDB } from './config/db';
import { logMiddleware } from './middlewares/logMiddleware';
import { recibirWebhook } from './controllers/pedidoController'; // <-- 1. Importa el webhook handler

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

// --- 2. IMPORTANTE: Usa express.json() ANTES de la ruta del webhook ---
app.use(express.json());

// --- 3. Define la ruta PÚBLICA para el webhook ANTES de las rutas autenticadas ---
app.post('/api/pedidos/webhook', recibirWebhook);

// Servir archivos subidos (Multer)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware de logging para debug
app.use(logMiddleware);

// Conexión a la base de datos
conectarDB();

// Rutas autenticadas y otras
app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/pedidos', pedidoRoutes); // <-- Este ya no contiene el webhook
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

