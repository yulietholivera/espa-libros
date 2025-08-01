// /backend/src/models/Pedido.ts
import { Schema, model, Document, Types } from 'mongoose';

// Interface para un item individual dentro del pedido
interface IItemPedido {
  libro: Types.ObjectId; // Cambiado de 'libroId' a 'libro' para mayor claridad en la referencia
  cantidad: number;
  precio: number; // Cambiado de 'precioUnitario' para consistencia
}

// Interface principal para el documento de Pedido
export interface IPedido extends Document {
  usuario: Types.ObjectId; // Cambiado de 'usuarioId' a 'usuario'
  items: IItemPedido[];
  total: number;
  estado: string; // Se cambia a String para aceptar los estados de Mercado Pago ('approved', 'rejected', etc.)
  paymentId?: number; // ¡NUEVO Y CRUCIAL! Para guardar el ID de la transacción de Mercado Pago
  fechaCreacion: Date;
}

// Schema para los items, anidado dentro del pedido
const ItemPedidoSchema = new Schema<IItemPedido>(
  {
    libro: {
      type: Schema.Types.ObjectId,
      ref: 'Libro',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precio: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Schema principal del Pedido
const PedidoSchema = new Schema<IPedido>({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  items: {
    type: [ItemPedidoSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    default: 'pendiente', // El estado por defecto antes de procesar el pago
  },
  paymentId: {
    type: Number,
    index: true, // Es buena idea indexar este campo para buscar transacciones
    sparse: true, // Esto permite que el campo no exista en todos los documentos (opcional)
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Se exporta como default para que coincida con la importación en 'pagoController.ts'
export default model<IPedido>('Pedido', PedidoSchema);
