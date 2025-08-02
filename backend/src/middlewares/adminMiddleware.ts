// backend/src/middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ mensaje: 'No autenticado' });
    return;
  }
  
  if (req.user.rol !== 'administrador') {
    console.warn(`🚫 [Admin] Acceso denegado para usuario ${req.user.id} con rol '${req.user.rol}' a la ruta ${req.originalUrl}`);
    // ✅ CORRECCIÓN: Se elimina 'return'.
    res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de administrador.' });
    return;
  }
  
  next();
};
