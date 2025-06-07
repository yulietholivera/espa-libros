import { Router } from 'express';
import {
  realizarCheckout,
  obtenerPedidosUsuario,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
} from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import Joi from 'joi';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Todas requieren autenticación
router.use(authMiddleware);

// Checkout (crear pedido)
const schemaCheckout = Joi.object({
  metodoEnvio: Joi.string().valid('estandar', 'express').required(),
  metodoPago: Joi.string().valid('tarjeta', 'paypal').required(),
  direccionEnvio: Joi.object({
    calle: Joi.string().required(),
    ciudad: Joi.string().required(),
    estado: Joi.string().required(),
    zip: Joi.string().required(),
    pais: Joi.string().required(),
  }).required(),
});
router.post('/', validar(schemaCheckout), realizarCheckout);

// Obtener pedidos del usuario
router.get('/', obtenerPedidosUsuario);

// Obtener un pedido por ID (cliente o admin)
router.get('/:id', obtenerPedidoPorId);

// Actualizar estado de un pedido (solo admin)
const schemaEstado = Joi.object({
  estado: Joi.string().valid('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado').required(),
});
router.put('/:id', authMiddleware, adminMiddleware, validar(schemaEstado), actualizarEstadoPedido);

export default router;