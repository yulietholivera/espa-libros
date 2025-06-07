import { Router } from 'express';
import { registro, login } from '../controllers/authController';
import { validar } from '../middlewares/validationMiddleware';
import Joi from 'joi';

const router = Router();

// Schema de validación con Joi
const schemaRegistro = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/registro', validar(schemaRegistro), registro);
router.post('/login', validar(schemaLogin), login);

export default router;