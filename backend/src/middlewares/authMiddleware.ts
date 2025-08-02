// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';
import { JwtPayloadCustom } from '../types';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadCustom;

      req.user = {
        id: decoded.id,
        rol: decoded.rol,
      };

      const usuario = await Usuario.findById(decoded.id);
      if (!usuario) {
        // ✅ CORRECCIÓN: Se elimina 'return'.
        res.status(401).json({ msg: 'Token no válido (usuario no encontrado)' });
        return;
      }

      next();
    } catch (error) {
      // ✅ CORRECCIÓN: Se elimina 'return'.
      res.status(401).json({ msg: 'Token no válido o expirado' });
    }
  }

  if (!token) {
    // ✅ CORRECCIÓN: Se elimina 'return'.
    res.status(401).json({ msg: 'No hay token en la petición' });
  }
};
