// /webapps/espa-libros/backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/generarToken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verificarToken(token);
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};