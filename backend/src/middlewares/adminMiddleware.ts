// backend/src/middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ mensaje: 'No autenticado' });
  }
  
  if (req.user.rol !== 'administrador') {
    // Log mejorado para depuración
    console.warn(`🚫 [Admin] Acceso denegado para usuario ${req.user.id} con rol '${req.user.rol}' a la ruta ${req.originalUrl}`);
    return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de administrador.' });
  }
  
  next();
};
