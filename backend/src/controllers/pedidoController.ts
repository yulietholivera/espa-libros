// backend/src/controllers/pedidoController.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { Payment } from 'mercadopago';

// Importaciones de Modelos
import { Carrito } from '../models/Carrito';
import Pedido from '../models/Pedido';
import Libro from '../models/Libro';

// Importaciones de Servicios y Configuración
import client from '../config/mercadopago';
import { calcularEnvio, calcularImpuestos } from '../services/impuestosService';
import { enviarConfirmacionPedido } from '../services/emailService';

export const realizarCheckoutYProcesarPago = async (req: Request, res: Response) => {
    const usuarioId = req.user!.id;
    const {
        metodoEnvio,
        direccionEnvio,
        token,
        payment_method_id,
        installments,
        payer,
    } = req.body;

    console.log('💡 [Checkout] Iniciando proceso para usuario:', usuarioId);

    const carrito = await Carrito.findOne({ usuarioId }).populate('items.libroId');
    if (!carrito || carrito.items.length === 0) {
        return res.status(400).json({ mensaje: 'Tu carrito está vacío.' });
    }

    for (const item of carrito.items) {
        const libro = item.libroId as any;
        if (libro.stock < item.cantidad) {
            return res.status(400).json({
                mensaje: `Stock insuficiente para el libro: "${libro.titulo}". Disponible: ${libro.stock}.`,
            });
        }
    }

    try {
        const subtotal = carrito.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
        const costoEnvio = calcularEnvio(metodoEnvio);
        const impuestos = calcularImpuestos(subtotal);
        const totalAPagar = subtotal + costoEnvio + impuestos;

        console.log('--- DEBUG CÁLCULO DE TOTALES (BACKEND) ---');
        console.log(`Subtotal (desde BD): $${subtotal.toFixed(2)}`);
        console.log(`Costo de Envío: $${costoEnvio.toFixed(2)}`);
        console.log(`Impuestos: $${impuestos.toFixed(2)}`);
        console.log(`TOTAL FINAL A COBRAR: $${totalAPagar.toFixed(2)}`);
        console.log('------------------------------------------');

        const paymentData = {
            token,
            payment_method_id,
            installments: Number(installments),
            transaction_amount: Number(totalAPagar.toFixed(2)),
            payer: payer,
            description: `Pedido de ${carrito.items.length} tipo(s) de libro(s) en Espa-Libros`,
        };

        console.log('➡️  [MercadoPago] Enviando para procesar pago:', JSON.stringify(paymentData, null, 2));

        const payment = new Payment(client);
        const idempotencyKey = crypto.randomUUID();

        const { body: paymentResponse } = await payment.create({
            body: paymentData,
            requestOptions: { idempotencyKey }
        });

        console.log('✅ [MercadoPago] Respuesta de pago recibida:', paymentResponse.status, paymentResponse.status_detail);

        if (paymentResponse.status !== 'approved') {
            return res.status(400).json({
                mensaje: `El pago fue rechazado: ${paymentResponse.status_detail}`,
                status: paymentResponse.status,
                status_detail: paymentResponse.status_detail,
            });
        }

        const nuevoPedido = new Pedido({
            usuario: usuarioId,
            items: carrito.items.map((item: any) => ({
                libro: item.libroId._id,
                cantidad: item.cantidad,
                precio: item.precioUnitario,
            })),
            total: totalAPagar,
            estado: paymentResponse.status,
            paymentId: paymentResponse.id,
            metodoEnvio,
            direccionEnvio,
            subtotal,
            envio: costoEnvio,
            impuestos,
        });

        await nuevoPedido.save();
        console.log(`✅ [Pedido] Pedido ${nuevoPedido._id} creado exitosamente.`);

        for (const item of nuevoPedido.items) {
            await Libro.findByIdAndUpdate(item.libro, {
                $inc: { stock: -item.cantidad },
            });
        }
        console.log(`📦 [Stock] Stock actualizado para el pedido ${nuevoPedido._id}.`);

        carrito.items = [];
        carrito.total = 0;
        await carrito.save();
        console.log('🛒 [Carrito] Carrito vaciado.');
        
        const pedidoCompleto = await Pedido.findById(nuevoPedido._id)
            .populate('usuario', 'nombre email')
            .populate('items.libro', 'titulo');
            
        if (pedidoCompleto) {
            await enviarConfirmacionPedido(pedidoCompleto as any);
        }
        
        return res.status(201).json({
            mensaje: '¡Compra realizada con éxito!',
            pedidoId: nuevoPedido._id,
            status: paymentResponse.status,
        });

    } catch (error: any) {
        console.error('❌ [Checkout] Error fatal en el proceso:', error.cause ?? error);
        
        // --- MEJORA EN EL MANEJO DE ERRORES ---
        let errorMessage = 'Error interno al procesar la compra.';
        if (error.cause && Array.isArray(error.cause) && error.cause[0]?.description) {
            const mpError = error.cause[0];
            errorMessage = `Error de Mercado Pago: ${mpError.description} (Código: ${mpError.code})`;
            if (mpError.code === 2034) {
                errorMessage += ". Revisa que tus usuarios de prueba (vendedor y comprador) sean válidos y de Colombia."
            }
        }
        
        return res.status(500).json({ mensaje: errorMessage });
    }
};

// ... (resto del archivo sin cambios) ...
export const recibirWebhook = async (req: Request, res: Response) => {
  console.log('🔔 [Webhook] Notificación de Mercado Pago recibida...');
  console.log('Webhook Query:', req.query);
  console.log('Webhook Headers:', req.headers);

  try {
    const signature = req.headers['x-signature'] as string;
    const paymentId = req.query['data.id'] as string;
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      console.warn('Webhook sin firma o sin secret configurado.');
      return res.status(400).send('Falta la firma de seguridad.');
    }

    const parts = signature.split(',');
    const ts = parts.find(part => part.startsWith('ts='))?.split('=')[1];
    const hash = parts.find(part => part.startsWith('v1='))?.split('=')[1];

    if (!ts || !hash) {
      return res.status(400).send('Firma en formato inválido.');
    }

    const manifest = `id:${paymentId};request-id:${req.headers['x-request-id']};ts:${ts};`;
    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(manifest);
    const calculatedHash = hmac.digest('hex');

    if (calculatedHash !== hash) {
      console.error('¡ALERTA DE SEGURIDAD! Firma de Webhook inválida.');
      return res.status(403).send('Firma inválida.');
    }
    
    console.log('✅ [Webhook] Firma verificada correctamente.');

    if (req.query.type === 'payment' && paymentId) {
      console.log(`Consultando estado del pago: ${paymentId}`);
      
      const payment = new Payment(client);
      const { body: paymentInfo } = await payment.get({ id: paymentId });

      const pedido = await Pedido.findOne({ paymentId: paymentInfo.id });

      if (pedido) {
        if (pedido.estado !== paymentInfo.status) {
          pedido.estado = paymentInfo.status;
          await pedido.save();
          console.log(`Pedido ${pedido._id} actualizado a estado: ${pedido.estado} vía Webhook.`);
        }
      } else {
        console.warn(`Webhook recibido para un pago (${paymentId}) que no corresponde a ningún pedido.`);
      }
    }
    res.status(200).send('ok');
  } catch (error: any) {
    console.error('Error en webhook:', error.cause ?? error);
    res.status(500).send('Error procesando webhook');
  }
};


export const obtenerPedidosUsuario = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;
  try {
    const pedidos = await Pedido.find({ usuario: usuarioId }).sort({ fechaCreacion: -1 });
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
};

export const obtenerPedidoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.user!.id;
  const rol = req.user!.rol;
  try {
    const pedido = await Pedido.findById(id).populate('items.libro');
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    if (rol === 'cliente' && pedido.usuario.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener pedido' });
  }
};

export const actualizarEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });
    if (!pedidoActualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    return res.json(pedidoActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar estado del pedido' });
  }
};

