// /webapps/espa-libros/backend/src/routes/admin.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import {
  listarLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} from '../controllers/libroController';
import {
  obtenerPedidosUsuario,
  obtenerPedidoPorId,
  actualizarEstadoPedido
} from '../controllers/pedidoController';
import { Usuario } from '../models/Usuario';
import { Pedido } from '../models/Pedido';
import { Carrito } from '../models/Carrito';
import { Notificacion } from '../models/Notificacion';

const router = Router();

// ─── Multer configuration ───
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Prefix: /api/admin
router.use(authMiddleware, adminMiddleware);

// --- Gestión de libros ---
router.get('/libros', listarLibros);
// Ahora usamos multer para manejar el file upload en 'imagenURL'
router.post('/libros', upload.single('imagenURL'), crearLibro);
router.put('/libros/:id', actualizarLibro);
router.delete('/libros/:id', eliminarLibro);

// --- Gestión de pedidos (métricas) ---
router.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ fechaCreacion: -1 });
    return res.json(pedidos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
});
router.get('/pedidos/:id', obtenerPedidoPorId);
router.put('/pedidos/:id', actualizarEstadoPedido);

// --- Gestión de usuarios ---
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-passwordHash');
    return res.json(usuarios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    return res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

// --- Gestión de notificaciones (opcional) ---
router.get('/notificaciones', async (req, res) => {
  try {
    const notis = await Notificacion.find().sort({ fechaCreacion: -1 });
    return res.json(notis);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error al obtener notificaciones' });
  }
});

export default router;
