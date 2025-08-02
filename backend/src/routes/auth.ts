// backend/src/routes/auth.ts
import { Router } from 'express';
import Joi from 'joi';
import { registro, login } from '../controllers/authController';
import { validar } from '../middlewares/validationMiddleware';

const router = Router();

const schemaRegistro = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({ 'any.only': 'Las contraseñas deben coincidir' }),
    rol: Joi.string().valid('cliente', 'administrador').optional(),
    // --- AÑADIDO: Permitir el campo 'esAdmin' ---
    esAdmin: Joi.boolean().optional(),
});

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/registro', validar(schemaRegistro), registro);
router.post('/login', validar(schemaLogin), login);

export default router;
