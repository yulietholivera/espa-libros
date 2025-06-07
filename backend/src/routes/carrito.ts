import { Router } from 'express';
import {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito,
  vaciarCarrito,
} from '../controllers/carritoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import Joi from 'joi';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Todas las rutas requieren autenticación de usuario (cliente o admin)
router.use(authMiddleware);

// Obtener carrito actual
router.get('/', obtenerCarrito);

// Agregar al carrito
const schemaAgregar = Joi.object({
  libroId: Joi.string().length(24).required(),
  cantidad: Joi.number().min(1).required(),
});
router.post('/', validar(schemaAgregar), agregarAlCarrito);

// Actualizar cantidad de item
const schemaActualizar = Joi.object({
  libroId: Joi.string().length(24).required(),
  cantidad: Joi.number().min(0).required(),
});
router.put('/', validar(schemaActualizar), actualizarItemCarrito);

// Eliminar un item
router.delete('/:libroId', eliminarItemCarrito);

// Vaciar carrito completo
router.delete('/', vaciarCarrito);

export default router;