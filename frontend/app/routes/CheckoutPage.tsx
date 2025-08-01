// /frontend/app/routes/CheckoutPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { CheckoutHeader } from '../components/checkout/CheckoutHeader';
import { DeliveryMethodSection } from '../components/checkout/DeliveryMethodSection';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { MercadoPagoForm } from '../components/checkout/MercadoPagoForm';
import { useCart } from '../context/CartContext';
import { getToken } from '../utils/auth';

// Componente reutilizable para campos de formulario
function FormField({ id, label, type = 'text', value, onChange, required = true }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                />
            </div>
        </div>
    );
}

export function meta(): Array<{ title: string }> {
    return [{ title: "Finalizar Compra" }];
}

export default function CheckoutPage() {
    const { cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [metodoEnvio, setMetodoEnvio] = useState('estandar');
    const [direccionEnvio, setDireccionEnvio] = useState({
        calle: '',
        ciudad: '',
        estado: '',
        zip: '',
        pais: 'Colombia',
    });
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    useEffect(() => {
        if (import.meta.env.DEV) {
            setDireccionEnvio({
                calle: 'Calle Falsa 123',
                ciudad: 'Bogotá',
                estado: 'Cundinamarca',
                zip: '110111',
                pais: 'Colombia',
            });
        }
    }, []);

    const finalTotal = useMemo(() => {
        const subtotal = cartTotal;
        if (subtotal === 0) return 0;
        const shippingCost = metodoEnvio === 'express' ? 16.00 : 5.00;
        const taxes = subtotal * 0.19;
        return parseFloat((subtotal + shippingCost + taxes).toFixed(2));
    }, [cartTotal, metodoEnvio]);

    const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDireccionEnvio(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitPayment = async (mercadoPagoData: any) => {
        setError(null);
        setIsProcessing(true);

        if (Object.values(direccionEnvio).some(field => field === '')) {
            setError("Por favor, completa todos los campos de la dirección de envío.");
            setIsProcessing(false);
            window.scrollTo(0, 0);
            return;
        }

        const token = getToken();
        if (!token) {
            setError("Debes iniciar sesión para completar la compra.");
            setIsProcessing(false);
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // --- 👇 CORRECCIÓN CLAVE ---
        // Extraemos los datos del objeto anidado 'formData' que nos da Mercado Pago
        const { token: paymentToken, payment_method_id, installments, payer } = mercadoPagoData.formData;

        // Construimos el objeto plano que el backend espera
        const datosCompletosDelPedido = {
            token: paymentToken,
            payment_method_id,
            installments,
            payer: payer, // Se envía el objeto payer tal como lo devuelve Mercado Pago
            metodoEnvio,
            direccionEnvio,
        };
        
        console.log('✅ [Checkout] Enviando al backend:', JSON.stringify(datosCompletosDelPedido, null, 2));

        try {
            const response = await axios.post('/api/pedidos/checkout', datosCompletosDelPedido, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log('¡Compra realizada con éxito!', response.data);
            setIsPaymentSuccessful(true);
            clearCart();
        } catch (err: any) {
            const errorMessage = err.response?.data?.mensaje || 'Hubo un error al procesar tu pago.';
            console.error('Error al procesar el pago:', err);
            console.error('❌ Error desde el backend:', err.response?.data);
            setError(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- LOGS DE DEPURACIÓN ---
    useEffect(() => {
        if (import.meta.env.DEV) {
            console.log('--- DEBUG CÁLCULO DE TOTALES (FRONTEND) ---');
            console.log(`Subtotal (desde el carrito): $${cartTotal.toFixed(2)}`);
            const shippingCost = metodoEnvio === 'express' ? 16.00 : 5.00;
            console.log(`Costo de Envío (${metodoEnvio}): $${shippingCost.toFixed(2)}`);
            const taxes = cartTotal * 0.19;
            console.log(`Impuestos (19%): $${taxes.toFixed(2)}`);
            console.log(`TOTAL FINAL A PAGAR: $${finalTotal.toFixed(2)}`);
            console.log('-------------------------------------------');
        }
    }, [cartTotal, metodoEnvio, finalTotal]);
    // --- FIN DE LOGS ---

    if (isPaymentSuccessful) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
                <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h1 className="text-2xl font-bold text-gray-800">¡Pago Exitoso!</h1>
                <p className="text-gray-600 mt-2">Gracias por tu compra. Recibirás una confirmación por correo electrónico en breve.</p>
            </div>
        );
    }

    return (
        <div className="bg-regal2-espalibros">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <CheckoutHeader />
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
                    <div>
                        <div className="border-b border-gray-200 pb-10">
                            <h2 className="text-lg font-medium text-gray-900">Dirección de Envío</h2>
                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <FormField id="calle" label="Calle y número" value={direccionEnvio.calle} onChange={handleDireccionChange} />
                                </div>
                                <FormField id="ciudad" label="Ciudad" value={direccionEnvio.ciudad} onChange={handleDireccionChange} />
                                <FormField id="estado" label="Departamento / Estado" value={direccionEnvio.estado} onChange={handleDireccionChange} />
                                <FormField id="zip" label="Código Postal" value={direccionEnvio.zip} onChange={handleDireccionChange} />
                            </div>
                        </div>
                        
                        <DeliveryMethodSection selectedMethod={metodoEnvio} onMethodChange={setMetodoEnvio} />

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <h2 className="text-lg font-medium text-gray-900">Información de Pago</h2>
                            {error && <p className="text-red-600 text-sm my-4 p-3 bg-red-100 rounded-md">{error}</p>}
                            
                            {isProcessing ? (
                                <p className="text-gray-600">Procesando pago...</p>
                            ) : cartTotal > 0 ? (
                                <MercadoPagoForm
                                    totalAmount={finalTotal}
                                    onSubmitPayment={handleSubmitPayment}
                                />
                            ) : (
                                <p className="text-gray-500 mt-4">Agrega productos a tu carrito para poder pagar.</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
