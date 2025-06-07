// /webapps/espa-libros/backend/src/controllers/pedidoController.ts

// src/controllers/pedidoController.ts

import { Request, Response } from 'express';
import { Carrito } from '../models/Carrito';
import { Pedido, IPedido } from '../models/Pedido';
import { calcularEnvio, calcularImpuestos } from '../services/impuestosService';
import { Notificacion } from '../models/Notificacion';
import { enviarEmail } from '../services/emailService';

export const realizarCheckout = async (req: Request, res: Response) => {
  console.log('💡 [realizarCheckout] req.body =', JSON.stringify(req.body, null, 2));
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

  // Validaciones manuales antes de procesar
  if (!metodoEnvio || (metodoEnvio !== 'estandar' && metodoEnvio !== 'express')) {
    return res
      .status(400)
      .json({ mensaje: '"metodoEnvio" es obligatorio y debe ser "estandar" o "express".' });
  }

  if (!metodoPago || (metodoPago !== 'tarjeta' && metodoPago !== 'paypal')) {
    return res
      .status(400)
      .json({ mensaje: '"metodoPago" es obligatorio y debe ser "tarjeta" o "paypal".' });
  }

  if (
    !direccionEnvio ||
    typeof direccionEnvio.calle !== 'string' ||
    direccionEnvio.calle.trim() === '' ||
    typeof direccionEnvio.ciudad !== 'string' ||
    direccionEnvio.ciudad.trim() === '' ||
    typeof direccionEnvio.estado !== 'string' ||
    direccionEnvio.estado.trim() === '' ||
    typeof direccionEnvio.zip !== 'string' ||
    direccionEnvio.zip.trim() === '' ||
    typeof direccionEnvio.pais !== 'string' ||
    direccionEnvio.pais.trim() === ''
  ) {
    return res.status(400).json({
      mensaje:
        '"direccionEnvio" es obligatorio y debe contener los campos: "calle", "ciudad", "estado", "zip" y "pais".',
    });
  }

  try {
    // 1) Obtener carrito
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito || carrito.items.length === 0) {
      console.warn(`⚠️  [realizarCheckout] Carrito vacío o no encontrado para usuario ${usuarioId}.`);
      return res.status(400).json({ mensaje: 'Carrito vacío o no encontrado' });
    }
    console.log(`✅ [realizarCheckout] Carrito encontrado con ${carrito.items.length} ítems.`);

    // 2) Calcular subtotales e impuestos
    const subtotal = carrito.items.reduce((acc, item) => {
      return acc + item.precioUnitario * item.cantidad;
    }, 0);
    const envio = calcularEnvio(metodoEnvio);
    const impuestos = calcularImpuestos(subtotal);
    const total = subtotal + envio + impuestos;
    console.log(
      `📊 [realizarCheckout] subtotal=${subtotal}, envio=${envio}, impuestos=${impuestos}, total=${total}`
    );

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
    console.log(`✅ [realizarCheckout] Pedido creado con ID ${nuevoPedido._id}.`);

    // 4) Vaciar carrito
    carrito.items = [];
    carrito.total = 0;
    carrito.fechaActualizacion = new Date();
    await carrito.save();
    console.log(`✅ [realizarCheckout] Carrito vaciado para usuario ${usuarioId}.`);

    // 5) (Opcional) Guardar notificación
    const noti = await Notificacion.create({
      usuarioId,
      tipo: 'pedido_creado',
      mensaje: `Tu pedido #${nuevoPedido._id} ha sido creado exitosamente.`,
    });
    console.log(`🔔 [realizarCheckout] Notificación creada con ID ${noti._id}.`);

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
    console.log(`✉️  [realizarCheckout] Email de confirmación enviado a ${(req.user as any).email}.`);

    return res.status(201).json({ pedido: nuevoPedido });
  } catch (error) {
    console.error('❌ [realizarCheckout] Error al procesar checkout:', error);
    return res.status(500).json({ mensaje: 'Error al procesar checkout' });
  }
};

// Obtener historial de pedidos de usuario
export const obtenerPedidosUsuario = async (req: Request, res: Response) => {
  console.log('💡 [obtenerPedidosUsuario] UsuarioId:', req.user!.id);
  const usuarioId = req.user!.id;

  try {
    const pedidos = await Pedido.find({ usuarioId }).sort({ fechaCreacion: -1 });
    console.log(`✅ [obtenerPedidosUsuario] Encontrados ${pedidos.length} pedidos.`);
    return res.json(pedidos);
  } catch (error) {
    console.error('❌ [obtenerPedidosUsuario] Error al obtener pedidos:', error);
    return res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
};

// Obtener un pedido concreto (usuario o admin)
export const obtenerPedidoPorId = async (req: Request, res: Response) => {
  console.log('💡 [obtenerPedidoPorId] req.params =', JSON.stringify(req.params, null, 2));
  const { id } = req.params;
  const usuarioId = req.user!.id;
  const rol = req.user!.rol;

  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ mensaje: '"id" en la URL es obligatorio y debe ser un string válido.' });
  }

  try {
    const pedido = await Pedido.findById(id).populate('items.libroId');
    if (!pedido) {
      console.warn(`⚠️  [obtenerPedidoPorId] Pedido con ID ${id} no encontrado.`);
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    // Si el rol es cliente, verificar que sea su propio pedido
    if (rol === 'cliente' && pedido.usuarioId.toString() !== usuarioId) {
      console.warn(
        `🚫 [obtenerPedidoPorId] El usuario ${usuarioId} (rol=cliente) intenta acceder a pedido ${id} ajeno.`
      );
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }

    console.log(`✅ [obtenerPedidoPorId] Pedido ${id} obtenido con éxito.`);
    return res.json(pedido);
  } catch (error) {
    console.error('❌ [obtenerPedidoPorId] Error al obtener pedido:', error);
    return res.status(500).json({ mensaje: 'Error al obtener pedido' });
  }
};

// Actualizar estado del pedido (solo admin)
export const actualizarEstadoPedido = async (req: Request, res: Response) => {
  console.log('💡 [actualizarEstadoPedido] req.params =', JSON.stringify(req.params, null, 2));
  console.log('💡 [actualizarEstadoPedido] req.body =', JSON.stringify(req.body, null, 2));

  const { id } = req.params;
  const { estado } = req.body as {
    estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';
  };

  // Validaciones manuales
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ mensaje: '"id" en la URL es obligatorio y debe ser un string válido.' });
  }
  if (
    !estado ||
    !['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'].includes(estado)
  ) {
    return res.status(400).json({
      mensaje:
        '"estado" es obligatorio y debe ser uno de: "pendiente", "pagado", "enviado", "entregado" o "cancelado".',
    });
  }

  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    if (!pedidoActualizado) {
      console.warn(`⚠️  [actualizarEstadoPedido] Pedido con ID ${id} no encontrado.`);
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    console.log(`✅ [actualizarEstadoPedido] Estado del pedido ${id} actualizado a "${estado}".`);
    return res.json(pedidoActualizado);
  } catch (error) {
    console.error('❌ [actualizarEstadoPedido] Error al actualizar estado del pedido:', error);
    return res.status(500).json({ mensaje: 'Error al actualizar estado del pedido' });
  }
};
