// /webapps/espa-libros/backend/src/routes/libros.ts
import { Router } from 'express';
import { listarLibros, obtenerLibro, crearLibro, actualizarLibro, eliminarLibro } from '../controllers/libroController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import Joi from 'joi';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Rutas públicas
router.get('/', listarLibros);
router.get('/:id', obtenerLibro);

// Rutas que requieren admin
const schemaLibro = Joi.object({
  titulo: Joi.string().required(),
  autor: Joi.string().allow(''),
  descripcion: Joi.string().allow(''),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
  imagenURL: Joi.string().allow(''),
  categoria: Joi.string().allow(''),
});

router.post('/', authMiddleware, adminMiddleware, validar(schemaLibro), crearLibro);
router.put('/:id', authMiddleware, adminMiddleware, actualizarLibro);
router.delete('/:id', authMiddleware, adminMiddleware, eliminarLibro);

export default router;