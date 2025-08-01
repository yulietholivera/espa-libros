// /frontend/app/components/checkout/ConfirmOrderButton.tsx
import React from 'react';

export function ConfirmOrderButton() {
  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <button
        type="submit"
        className="w-full rounded-md border border-transparent bg-regal-espalibros px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-regal-espalibros focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
