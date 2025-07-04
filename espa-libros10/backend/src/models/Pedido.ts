import { Schema, model, Document, Types } from 'mongoose';

interface IItemPedido {
  libroId: Types.ObjectId;
  cantidad: number;
  precioUnitario: number;
}

interface IDireccionEnvio {
  calle: string;
  ciudad: string;
  estado: string;
  zip: string;
  pais: string;
}

export interface IPedido extends Document {
  usuarioId: Types.ObjectId;
  items: IItemPedido[];
  subtotal: number;
  envio: number;
  impuestos: number;
  total: number;
  metodoEnvio: 'estandar' | 'express';
  metodoPago: 'tarjeta' | 'paypal';
  direccionEnvio: IDireccionEnvio;
  estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';
  fechaCreacion: Date;
}

const ItemPedidoSchema = new Schema<IItemPedido>(
  {
    libroId: {
      type: Schema.Types.ObjectId,
      ref: 'Libro',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const DireccionEnvioSchema = new Schema<IDireccionEnvio>(
  {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    zip: { type: String, required: true },
    pais: { type: String, required: true },
  },
  { _id: false }
);

const PedidoSchema = new Schema<IPedido>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  items: {
    type: [ItemPedidoSchema],
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  envio: {
    type: Number,
    required: true,
  },
  impuestos: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  metodoEnvio: {
    type: String,
    enum: ['estandar', 'express'],
    required: true,
  },
  metodoPago: {
    type: String,
    enum: ['tarjeta', 'paypal'],
    required: true,
  },
  direccionEnvio: {
    type: DireccionEnvioSchema,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

export const Pedido = model<IPedido>('Pedido', PedidoSchema);