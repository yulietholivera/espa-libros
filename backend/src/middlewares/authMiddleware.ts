// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';
import { JwtPayloadCustom } from '../types';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtener el token del header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar y decodificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadCustom;

      // 3. Asignar los datos del token a `req.user` para que estén disponibles en todas las rutas protegidas.
      req.user = {
        id: decoded.id,
        rol: decoded.rol,
      };

      // 4. Verificar que el usuario todavía existe en la base de datos
      const usuario = await Usuario.findById(decoded.id);
      if (!usuario) {
        return res.status(401).json({ msg: 'Token no válido (usuario no encontrado)' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ msg: 'Token no válido o expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }
};