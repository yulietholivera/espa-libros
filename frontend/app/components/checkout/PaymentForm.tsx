// /frontend/app/components/checkout/PaymentForm.tsx
import React from 'react';

/**
 * Formulario para introducir los detalles de la tarjeta de crédito.
 */
export function PaymentForm() {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="col-span-4">
        <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">
          Número de tarjeta
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="card-number"
            name="card-number"
            autoComplete="cc-number"
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6"
          />
        </div>
      </div>

      <div className="col-span-4">
        <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">
          Nombre en la tarjeta
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="name-on-card"
            name="name-on-card"
            autoComplete="cc-name"
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6"
          />
        </div>
      </div>

      <div className="col-span-3">
        <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">
          Fecha de expiración (MM/YY)
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="expiration-date"
            id="expiration-date"
            autoComplete="cc-exp"
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">
          CVC
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="cvc"
            id="cvc"
            autoComplete="csc"
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
}
