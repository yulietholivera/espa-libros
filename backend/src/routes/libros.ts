// backend/src/routes/libros.ts
import { Router as LibrosRouter } from 'express';
import { listarLibros, obtenerLibro, crearLibro, actualizarLibro, eliminarLibro } from '../controllers/libroController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import Joi from 'joi';
import { validar } from '../middlewares/validationMiddleware';

const librosRouter = LibrosRouter();

librosRouter.get('/', listarLibros);
librosRouter.get('/:id', obtenerLibro);

const schemaLibro = Joi.object({
  titulo: Joi.string().required(),
  autor: Joi.string().allow(''),
  descripcion: Joi.string().allow(''),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
  imagenURL: Joi.string().allow(''),
  categoria: Joi.string().allow(''),
});

librosRouter.post('/', authMiddleware, adminMiddleware, validar(schemaLibro), crearLibro);
librosRouter.put('/:id', authMiddleware, adminMiddleware, actualizarLibro);
librosRouter.delete('/:id', authMiddleware, adminMiddleware, eliminarLibro);

export default librosRouter;
