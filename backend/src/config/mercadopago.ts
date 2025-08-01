// /backend/src/config/mercadopago.ts

import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
  console.error('Error: La variable de entorno MERCADOPAGO_ACCESS_TOKEN no está definida.');
  process.exit(1);
}

// En la nueva versión, se crea y exporta un "cliente" configurado.
const client = new MercadoPagoConfig({ accessToken: accessToken });

export default client;
