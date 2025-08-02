// /webapps/espa-libros/backend/src/middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validar = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.error('❌ [Joi Validation Error]', JSON.stringify(error.details, null, 2));
      const mensajes = error.details.map((detalle) => detalle.message);
      // ✅ CORRECCIÓN: Se elimina 'return'.
      res.status(400).json({ errores: mensajes });
    } else {
        next();
    }
  };
};
