// backend/src/routes/pedidos.ts
import { Router } from 'express';
import {
  realizarCheckoutYProcesarPago,
  obtenerPedidosUsuario,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
} from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import Joi from 'joi';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Todas estas rutas requieren que el usuario esté autenticado
router.use(authMiddleware);

// Checkout: El frontend enviará aquí todos los datos (envío, dirección, token de pago, etc.)
const schemaCheckout = Joi.object({
  metodoEnvio: Joi.string().valid('estandar', 'express').required(),
  direccionEnvio: Joi.object({
    calle: Joi.string().required(),
    ciudad: Joi.string().required(),
    estado: Joi.string().required(),
    zip: Joi.string().required(),
    pais: Joi.string().required(),
  }).required(),
  // Campos de Mercado Pago
  token: Joi.string().required(),
  payment_method_id: Joi.string().required(),
  installments: Joi.number().required(),
  payer: Joi.object({
    email: Joi.string().email().required(),
  }).required().unknown(true), // <-- CORRECCIÓN: Permite campos adicionales como 'identification'
}).options({ allowUnknown: true });

router.post('/checkout', validar(schemaCheckout), realizarCheckoutYProcesarPago);

// Obtener historial de pedidos del usuario logueado
router.get('/', obtenerPedidosUsuario);

// Obtener un pedido específico por ID (accesible por el dueño o un admin)
router.get('/:id', obtenerPedidoPorId);

// --- Rutas exclusivas para Administradores ---

// Actualizar el estado de un pedido
const schemaEstado = Joi.object({
  estado: Joi.string().valid('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado').required(),
});
router.put('/:id/estado', adminMiddleware, validar(schemaEstado), actualizarEstadoPedido);


export default router;
