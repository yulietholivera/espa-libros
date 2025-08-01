// backend/src/models/Libro.ts
import { Schema, model, Document } from 'mongoose';

export interface ILibro extends Document {
  titulo: string;
  autor?: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenURL?: string;
  categoria?: string;
}

const LibroSchema = new Schema<ILibro>({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Es bueno tener un valor por defecto
  },
  imagenURL: {
    type: String,
  },
  categoria: {
    type: String,
  },
});

// Cambiado a export default para consistencia
export default model<ILibro>('Libro', LibroSchema);
