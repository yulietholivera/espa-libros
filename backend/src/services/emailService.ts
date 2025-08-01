// backend/src/services/emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { IPedido } from '../models/Pedido'; // Importar la interfaz del pedido

dotenv.config();

// Configuración del transporter usando variables de entorno
// NOTA: Estos son datos de ejemplo para Mailtrap.io. Debes crear tu propia cuenta
// y reemplazar estos valores en tu archivo .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // ej: "sandbox.smtp.mailtrap.io"
  port: Number(process.env.EMAIL_PORT), // ej: 2525
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo de confirmación de pedido al usuario.
 * @param pedido - El objeto del pedido que contiene todos los detalles.
 */
export const enviarConfirmacionPedido = async (pedido: IPedido): Promise<void> => {
  // Asegurarnos de que los datos del usuario y los libros están poblados
  if (!pedido.usuario || typeof pedido.usuario !== 'object' || !('email' in pedido.usuario)) {
    console.error('Error: Datos del usuario no poblados en el pedido.');
    return;
  }

  // Generar el HTML para la lista de items
  const itemsHtml = pedido.items.map(item => {
    // Asegurarnos de que 'libro' es un objeto poblado
    if (typeof item.libro === 'object' && item.libro !== null && 'titulo' in item.libro) {
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.libro.titulo}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.cantidad}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.precio.toFixed(2)}</td>
        </tr>
      `;
    }
    return '';
  }).join('');

  // Plantilla HTML del correo
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #0056b3;">¡Gracias por tu compra en Espa-Libros!</h1>
      <p>Hola ${pedido.usuario.nombre},</p>
      <p>Hemos recibido tu pedido #${pedido._id}. Aquí tienes los detalles:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr>
            <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align: left;">Libro</th>
            <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align: center;">Cantidad</th>
            <th style="padding: 10px; border-bottom: 2px solid #0056b3; text-align: right;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3 style="text-align: right; margin-top: 20px; color: #0056b3;">Total: $${pedido.total.toFixed(2)}</h3>
      <p>Pronto te notificaremos cuando tu pedido sea enviado.</p>
      <p>El equipo de Espa-Libros</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Espa-Libros" <no-reply@espalibros.com>`,
      to: pedido.usuario.email,
      subject: `Confirmación de tu Pedido #${pedido._id}`,
      html: htmlContent,
    });
    console.log('Correo de confirmación enviado a', pedido.usuario.email);
  } catch (error) {
    console.error('Error enviando correo de confirmación:', error);
  }
};
