// backend/src/routes/admin.ts
import { Router, Request, Response } from 'express'; // <-- Se añaden Request y Response
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
  obtenerPedidoPorId,
  actualizarEstadoPedido
} from '../controllers/pedidoController';
import { Usuario } from '../models/Usuario';
import Pedido from '../models/Pedido'; // ✅ CORRECCIÓN: Se cambia a importación por defecto.
import { Notificacion } from '../models/Notificacion';

const router = Router();

// ─── Multer configuration ───
// (Asegúrate de haber corrido 'npm install --save-dev @types/multer' en la carpeta /backend)
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Todas las rutas de este archivo requieren autenticación y rol de administrador
router.use(authMiddleware, adminMiddleware);

// --- Gestión de libros ---
router.get('/libros', listarLibros);
router.post('/libros', upload.single('imagenPortada'), crearLibro);
router.put('/libros/:id', upload.single('imagenPortada'), actualizarLibro);
router.delete('/libros/:id', eliminarLibro);

// --- Gestión de pedidos (métricas) ---
router.get('/pedidos', async (req: Request, res: Response): Promise<void> => {
  try {
    const pedidos = await Pedido.find().sort({ fechaCreacion: -1 });
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
});
router.get('/pedidos/:id', obtenerPedidoPorId);
router.put('/pedidos/:id', actualizarEstadoPedido);

// --- Gestión de usuarios ---
router.get('/usuarios', async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await Usuario.find().select('-passwordHash');
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});
router.delete('/usuarios/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Usuario.findByIdAndDelete(id);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(err);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

// --- Gestión de notificaciones (opcional) ---
router.get('/notificaciones', async (req: Request, res: Response): Promise<void> => {
  try {
    const notis = await Notificacion.find().sort({ fechaCreacion: -1 });
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json(notis);
  } catch (err) {
    console.error(err);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al obtener notificaciones' });
  }
});

export default router;
