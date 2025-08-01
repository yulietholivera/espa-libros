// backend/src/types/index.d.ts
import { Document } from 'mongoose';
import { IUsuario } from '../models/Usuario';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        rol: 'cliente' | 'administrador';
      };
      usuario?: IUsuario;
    }
  }
}

export interface JwtPayloadCustom {
  id: string;
  rol: 'cliente' | 'administrador';
}