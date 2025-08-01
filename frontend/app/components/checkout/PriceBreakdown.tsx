// /frontend/app/components/checkout/PriceBreakdown.tsx
import React from 'react';

interface PriceBreakdownProps {
  subtotal: number;
  shipping: number;
  taxes: number;
}

export function PriceBreakdown({ subtotal, shipping, taxes }: PriceBreakdownProps) {
  const total = subtotal + shipping + taxes;

  return (
    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <dt className="text-sm">Total parcial</dt>
        <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm">Envío</dt>
        <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm">Impuestos</dt>
        <dd className="text-sm font-medium text-gray-900">${taxes.toFixed(2)}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base font-medium">Total</dt>
        <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
      </div>
    </dl>
  );
}
