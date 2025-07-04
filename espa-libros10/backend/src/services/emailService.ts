import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

const transporter = nodemailer.createTransport({
  host: 'smtp.tu-proveedor.com', // Ajusta según tu proveedor (Gmail, SendGrid, etc.)
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const enviarEmail = async (options: EmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log('Email enviado a', options.to);
  } catch (error) {
    console.error('Error enviando email:', error);
  }
};