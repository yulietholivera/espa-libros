// /frontend/app/components/checkout/MercadoPagoForm.tsx
import React, { useMemo } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Asegúrate de que tu clave pública esté en el archivo .env del frontend
// La inicialización debe ocurrir solo una vez.
if (import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY) {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-CO' // Opcional: Forzar el idioma a español de Colombia
    });
}

interface MercadoPagoFormProps {
    totalAmount: number;
    onSubmitPayment: (formData: any) => Promise<void>;
}

export function MercadoPagoForm({ totalAmount, onSubmitPayment }: MercadoPagoFormProps) {
    // El objeto de inicialización solo debe contener el monto.
    const initialization = useMemo(() => ({
        amount: totalAmount,
    }), [totalAmount]);

    // La configuración de los métodos de pago va dentro de 'customization'.
    const customization = useMemo(() => ({
        paymentMethods: {
            creditCard: "all",
            debitCard: "all",
        },
        visual: {
            style: {
                theme: 'bootstrap',
            },
        },
    }), []); // Este objeto no depende de props, por lo que solo se crea una vez.

    const handleBrickError = (error: any) => {
        console.error("Error en el Payment Brick de Mercado Pago:", error);
        console.error("Objeto de inicialización que falló:", JSON.stringify(initialization, null, 2));
    };

    // No renderizar el Brick si el monto no es válido.
    if (!totalAmount || totalAmount <= 0) {
        return (
            <div className="p-4 text-center bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">El formulario de pago aparecerá aquí.</p>
            </div>
        );
    }

    return (
        <div>
            <Payment
                initialization={initialization}
                customization={customization} // Pasamos el objeto de personalización corregido
                onSubmit={onSubmitPayment}
                onError={handleBrickError}
            />
        </div>
    );
}
