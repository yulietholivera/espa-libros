// backend/src/routes/carrito.ts
import { Router as ExpressRouter } from 'express'; // Renombrado para evitar conflicto de nombres
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

const carritoRouter = ExpressRouter();

carritoRouter.use(authMiddleware);

carritoRouter.get('/', obtenerCarrito);

const schemaAgregar = Joi.object({
  libroId: Joi.string().length(24).required().messages({
    'any.required': '"libroId" es obligatorio.',
    'string.base': '"libroId" debe ser un texto válido.',
    'string.length': '"libroId" debe tener 24 caracteres (ID Mongo válido).',
  }),
  cantidad: Joi.number().min(1).required().messages({
    'any.required': '"cantidad" es obligatoria.',
    'number.base': '"cantidad" debe ser un número.',
    'number.min': '"cantidad" debe ser al menos 1.',
  }),
});
carritoRouter.post('/', validar(schemaAgregar), agregarAlCarrito);

const schemaActualizar = Joi.object({
  libroId: Joi.string().length(24).required().messages({
    'any.required': '"libroId" es obligatorio.',
    'string.base': '"libroId" debe ser un texto válido.',
    'string.length': '"libroId" debe tener 24 caracteres (ID Mongo válido).',
  }),
  cantidad: Joi.number().min(0).required().messages({
    'any.required': '"cantidad" es obligatoria.',
    'number.base': '"cantidad" debe ser un número.',
    'number.min': '"cantidad" debe ser 0 o mayor.',
  }),
});
carritoRouter.put('/', validar(schemaActualizar), actualizarItemCarrito);

carritoRouter.delete('/:libroId', eliminarItemCarrito);

carritoRouter.delete('/', vaciarCarrito);

export default carritoRouter;