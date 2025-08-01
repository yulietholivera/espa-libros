// /frontend/app/components/checkout/PaymentSection.tsx
import React, { useState } from 'react';
import { PaymentForm } from './PaymentForm';

type PaymentMethod = 'credit-card' | 'paypal';

/**
 * Componente para la sección de pago. Permite al usuario elegir un método de pago
 * y muestra el formulario correspondiente.
 */
export function PaymentSection() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit-card');

  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">Pago</h2>

      <fieldset className="mt-4">
        <legend className="sr-only">Forma de pago</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {/* Opción Tarjeta de Crédito */}
          <div className="flex items-center">
            <input
              id="credit-card"
              name="payment-type"
              type="radio"
              value="credit-card"
              checked={selectedPayment === 'credit-card'}
              onChange={() => setSelectedPayment('credit-card')}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-regal-espalibros checked:bg-regal-espalibros focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400"
            />
            <label htmlFor="credit-card" className="ml-3 block text-sm/6 font-medium text-gray-700">
              Tarjeta de crédito
            </label>
          </div>

          {/* Opción PayPal */}
          <div className="flex items-center">
            <input
              id="paypal"
              name="payment-type"
              type="radio"
              value="paypal"
              checked={selectedPayment === 'paypal'}
              onChange={() => setSelectedPayment('paypal')}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-regal-espalibros checked:bg-regal-espalibros focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400"
            />
            <label htmlFor="paypal" className="ml-3 block text-sm/6 font-medium text-gray-700">
              PayPal
            </label>
          </div>
        </div>
      </fieldset>

      {/* Renderizado condicional del formulario de la tarjeta */}
      {selectedPayment === 'credit-card' && <PaymentForm />}
    </div>
  );
}
