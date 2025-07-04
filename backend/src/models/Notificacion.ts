import { Schema, model, Document, Types } from 'mongoose';

export interface INotificacion extends Document {
  usuarioId: Types.ObjectId;
  tipo: string;
  mensaje: string;
  visto: boolean;
  fechaCreacion: Date;
}

const NotificacionSchema = new Schema<INotificacion>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  visto: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

export const Notificacion = model<INotificacion>('Notificacion', NotificacionSchema);