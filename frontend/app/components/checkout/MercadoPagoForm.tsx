// /frontend/app/components/checkout/MercadoPagoForm.tsx
import React, { useMemo } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

if (import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY) {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-CO'
    });
}

interface MercadoPagoFormProps {
    totalAmount: number;
    onSubmitPayment: (formData: any) => Promise<void>;
    payer: { // 👈 1. Aceptamos el objeto payer como prop
        email: string;
    };
}

export function MercadoPagoForm({ totalAmount, onSubmitPayment, payer }: MercadoPagoFormProps) {
    
    // ✅ 2. Añadimos el objeto 'payer' a la inicialización.
    // Esto le dice al Brick quién es el pagador desde el principio.
    const initialization = useMemo(() => ({
        amount: totalAmount,
        payer: {
            email: payer.email,
        },
    }), [totalAmount, payer.email]);

    const customization = useMemo(() => ({
        paymentMethods: {
            creditCard: "all",
            debitCard: "all",
        },
        visual: {
            style: {
                theme: 'bootstrap',
            },
            // Ahora que el Brick conoce al pagador, respetará esta instrucción.
            hideEmail: true, 
        },
    }), []);

    const handleBrickError = (error: any) => {
        console.error("Error en el Payment Brick de Mercado Pago:", error);
        console.error("Objeto de inicialización que falló:", JSON.stringify(initialization, null, 2));
    };

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
                customization={customization}
                onSubmit={onSubmitPayment}
                onError={handleBrickError}
            />
        </div>
    );
}
