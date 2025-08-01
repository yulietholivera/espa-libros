// /frontend/app/components/checkout/DeliveryMethodSection.tsx
import React from 'react';
import { DeliveryMethodOption } from './DeliveryMethodOption';

const deliveryMethods = [
    {
        value: 'estandar', // <-- Cambiado a minúsculas para coincidir con el backend
        label: 'Estándar',
        description: '4–10 días hábiles',
        price: '$5.00',
    },
    {
        value: 'express', // <-- Cambiado a minúsculas para coincidir con el backend
        label: 'Express',
        description: '2–5 días hábiles',
        price: '$16.00',
    },
];

interface DeliveryMethodSectionProps {
    selectedMethod: string;
    onMethodChange: (method: string) => void;
}

/**
 * Componente que muestra y gestiona la selección de métodos de entrega.
 * Ahora es controlado por el componente padre.
 */
export function DeliveryMethodSection({ selectedMethod, onMethodChange }: DeliveryMethodSectionProps) {
    return (
        <div className="border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Método de entrega</h2>
            <fieldset aria-label="Método de entrega" className="mt-4">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((method) => (
                        <DeliveryMethodOption
                            key={method.value}
                            {...method}
                            isSelected={selectedMethod === method.value}
                            onSelect={onMethodChange} // <-- Usa la función del padre
                        />
                    ))}
                </div>
            </fieldset>
        </div>
    );
}
