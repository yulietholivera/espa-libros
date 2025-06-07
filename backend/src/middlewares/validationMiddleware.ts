import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validar = (schema: ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }
    next();
  };
};