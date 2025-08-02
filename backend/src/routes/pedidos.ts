// backend/src/routes/pedidos.ts
import { Router as PedidosRouter } from 'express';
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

const pedidosRouter = PedidosRouter();

pedidosRouter.use(authMiddleware);

const schemaCheckout = Joi.object({
  metodoEnvio: Joi.string().valid('estandar', 'express').required(),
  direccionEnvio: Joi.object({
    calle: Joi.string().required(),
    ciudad: Joi.string().required(),
    estado: Joi.string().required(),
    zip: Joi.string().required(),
    pais: Joi.string().required(),
  }).required(),
  token: Joi.string().required(),
  payment_method_id: Joi.string().required(),
  installments: Joi.number().required(),
}).options({ allowUnknown: true });

pedidosRouter.post('/checkout', validar(schemaCheckout), realizarCheckoutYProcesarPago);

pedidosRouter.get('/', obtenerPedidosUsuario);

pedidosRouter.get('/:id', obtenerPedidoPorId);

const schemaEstado = Joi.object({
  estado: Joi.string().valid('pendiente', 'approved', 'in_process', 'rejected', 'cancelled', 'enviado', 'entregado').required(),
});
pedidosRouter.put('/:id/estado', adminMiddleware, validar(schemaEstado), actualizarEstadoPedido);

export default pedidosRouter;