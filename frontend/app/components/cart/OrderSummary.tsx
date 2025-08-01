// frontend/app/components/cart/OrderSummary.tsx
import React from 'react';
import { Link } from 'react-router';
import { useCart } from '~/context/CartContext';

export default function OrderSummary() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <section aria-labelledby="summary-heading" className="mt-10">
      <h2 id="summary-heading" className="sr-only">Order summary</h2>

      <div>
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">Subtotal</dt>
            <dd className="ml-4 text-base font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </dd>
          </div>
        </dl>
        <p className="mt-1 text-sm text-gray-500">
          Los gastos de envío e impuestos se calcularán en el checkout.
        </p>
      </div>

      <div className="mt-10">
        <Link
          to="/checkout"
          className="w-full block text-center rounded-md border border-transparent bg-regal-espalibros px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-regal-espalibros/90 focus:ring-2 focus:ring-regal-espalibros focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
        >
          Checkout
        </Link>
      </div>

      <div className="mt-6 text-center text-sm">
        <p>
          o{' '}
          <Link to="/" className="font-medium text-gray-900 hover:text-indigo-gray">
            Seguir comprando <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}