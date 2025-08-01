// /frontend/app/components/checkout/DeliveryMethodOption.tsx
import React from 'react';

interface DeliveryMethodOptionProps {
  value: string;
  label: string;
  description: string;
  price: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

/**
 * Componente que representa una única opción de método de entrega (ej. Estándar, Express).
 * Es un radio button estilizado.
 */
export function DeliveryMethodOption({
  value,
  label,
  description,
  price,
  isSelected,
  onSelect,
}: DeliveryMethodOptionProps) {
  return (
    <label
      aria-label={label}
      aria-description={`${description} for ${price}`}
      className={`relative flex cursor-pointer rounded-lg border p-4 shadow-xs focus:outline-none ${
        isSelected ? 'border-regal-espalibros ring-2 ring-regal-espalibros' : 'border-gray-300'
      } bg-white`}
      onClick={() => onSelect(value)}
    >
      <input
        type="radio"
        name="delivery-method"
        value={value}
        className="sr-only"
        checked={isSelected}
        onChange={() => onSelect(value)}
      />
      <span className="flex flex-1">
        <span className="flex flex-col">
          <span className="block text-sm font-medium text-gray-900">{label}</span>
          <span className="mt-1 flex items-center text-sm text-gray-500">{description}</span>
          <span className="mt-6 text-sm font-medium text-gray-900">{price}</span>
        </span>
      </span>
      {isSelected && (
        <svg
          className="size-5 text-regal-espalibros"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span
        className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
          isSelected ? 'border-regal-espalibros' : 'border-transparent'
        }`}
        aria-hidden="true"
      ></span>
    </label>
  );
}
