// /webapps/espa-libros/backend/src/routes/auth.ts
import { Router } from 'express';
import Joi from 'joi';
import { registro, login } from '../controllers/authController';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

// Schema de validación con Joi para registro
const schemaRegistro = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'Las contraseñas deben coincidir' }),
  rol: Joi.string().valid('cliente', 'administrador').optional(),
});

// Schema de validación con Joi para login
const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/registro', validar(schemaRegistro), registro);
router.post('/login', validar(schemaLogin), login);

export default router;
