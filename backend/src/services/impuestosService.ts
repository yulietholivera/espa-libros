import { IVA_PORC, COSTO_ENVIO_ESTANDAR, COSTO_ENVIO_EXPRESS } from '../constants/negocio';

export const calcularImpuestos = (subtotal: number): number => {
  return parseFloat((subtotal * IVA_PORC).toFixed(2));
};

export const calcularEnvio = (metodoEnvio: 'estandar' | 'express'): number => {
  return metodoEnvio === 'express' ? COSTO_ENVIO_EXPRESS : COSTO_ENVIO_ESTANDAR;
};