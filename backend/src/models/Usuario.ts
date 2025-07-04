import { Schema, model, Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  passwordHash: string;
  rol: 'cliente' | 'administrador';
  fechaRegistro: Date;
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);