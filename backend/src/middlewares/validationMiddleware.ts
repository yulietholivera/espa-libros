// /webapps/espa-libros/backend/src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validar = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validar con abortEarly: false para capturar todos los errores
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error('❌ [Joi Validation Error]', JSON.stringify(error.details, null, 2));
      // Extraer todos los mensajes de error de Joi
      const mensajes = error.details.map((detalle) => detalle.message);
      return res.status(400).json({ errores: mensajes });
    }
    next();
  };
};