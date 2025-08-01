// frontend/app/components/cart/CartItem.tsx
import React from 'react';
import { useCart } from '~/context/CartContext';
import type { CartItem as CartItemType } from '~/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();

  return (
    <li className="flex py-6">
      {/* Imagen */}
      <div className="group relative mb-5">
        <div className="w-24 h-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            // FIX: Use `item.imagenURL` which is the correct property name from your CartContext type.
            src={item.imagenURL}
            alt={item.titulo}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="ml-4 flex flex-1 flex-col sm:ml-6">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
            {item.titulo}
          </h4>
          <p className="ml-4 text-sm font-medium text-gray-900">
            ${item.precio.toFixed(2)}
          </p>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Cantidad: {item.quantity}
        </p>

        <div className="mt-4 flex flex-1 items-end justify-between">
          <div>{/* This div is for spacing purposes */}</div>
          <div className="flex">
            <button
              type="button"
              onClick={() => removeFromCart(item._id)}
              className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
