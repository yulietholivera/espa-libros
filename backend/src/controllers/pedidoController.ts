import { Request, Response } from 'express';
import { Carrito } from '../models/Carrito';
import { Pedido, IPedido } from '../models/Pedido';
import { calcularEnvio, calcularImpuestos } from '../services/impuestosService';
import { Notificacion } from '../models/Notificacion'; // (opcional)
import { enviarEmail } from '../services/emailService';

export const realizarCheckout = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;
  const {
    metodoEnvio,
    metodoPago,
    direccionEnvio,
  } = req.body as {
    metodoEnvio: 'estandar' | 'express';
    metodoPago: 'tarjeta' | 'paypal';
    direccionEnvio: {
      calle: string;
      ciudad: string;
      estado: string;
      zip: string;
      pais: string;
    };
  };

  try {
    // 1) Obtener carrito
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ mensaje: 'Carrito vacío o no encontrado' });
    }

    // 2) Calcular subtotales e impuestos
    const subtotal = carrito.items.reduce((acc, item) => {
      return acc + item.precioUnitario * item.cantidad;
    }, 0);

    const envio = calcularEnvio(metodoEnvio);
    const impuestos = calcularImpuestos(subtotal);
    const total = subtotal + envio + impuestos;

    // 3) Crear pedido
    const nuevoPedido: IPedido = new Pedido({
      usuarioId,
      items: carrito.items.map((item) => ({
        libroId: item.libroId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
      })),
      subtotal,
      envio,
      impuestos,
      total,
      metodoEnvio,
      metodoPago,
      direccionEnvio,
      estado: 'pendiente',
    });
    await nuevoPedido.save();

    // 4) Vaciar carrito
    carrito.items = [];
    carrito.total = 0;
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    // 5) (Opcional) Guardar notificación
    await Notificacion.create({
      usuarioId,
      tipo: 'pedido_creado',
      mensaje: `Tu pedido #${nuevoPedido._id} ha sido creado exitosamente.`,
    });

    // 6) (Opcional) Enviar email de confirmación
    const htmlEmail = `
      <h3>Tu pedido ${nuevoPedido._id} ha sido creado</h3>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Envío: $${envio.toFixed(2)}</p>
      <p>Impuestos: $${impuestos.toFixed(2)}</p>
      <p>Total: $${total.toFixed(2)}</p>
    `;
    await enviarEmail({
      to: (req.user as any).email,
      subject: `Pedido #${nuevoPedido._id} Confirmado`,
      html: htmlEmail,
    });

    return res.status(201).json({ pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al procesar checkout' });
  }
};

// Obtener historial de pedidos de usuario
export const obtenerPedidosUsuario = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;

  try {
    const pedidos = await Pedido.find({ usuarioId }).sort({ fechaCreacion: -1 });
    return res.json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
};

// Obtener un pedido concreto (usuario o admin)
export const obtenerPedidoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.user!.id;
  const rol = req.user!.rol;

  try {
    const pedido = await Pedido.findById(id).populate('items.libroId');
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    // Si el rol es cliente, verificar que sea su propio pedido
    if (rol === 'cliente' && pedido.usuarioId.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    return res.json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener pedido' });
  }
};

// Actualizar estado del pedido (solo admin)
export const actualizarEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body as { estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado' };

  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    return res.json(pedidoActualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar estado del pedido' });
  }
};