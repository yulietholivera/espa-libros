// /frontend/app/components/checkout/OrderSummary.tsx
import React from 'react';
import { useCart } from '~/context/CartContext';

// Un componente simple para mostrar cada item en el resumen
function SummaryItem({ item }) {
    // --- LÓGICA CORREGIDA PARA LA IMAGEN ---
    // Obtenemos la URL base de la API desde las variables de entorno de Vite.
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    // Construimos la URL completa y segura para la imagen.
    const imagenSrc = item.imagenURL?.startsWith('http')
        ? item.imagenURL
        : item.imagenURL
            ? `${API_URL}${item.imagenURL}`
            : 'https://placehold.co/100x150/EAEAEA/363636?text=No+Imagen'; // Imagen por defecto

    return (
        <li className="flex items-center px-4 py-6 sm:px-6">
            <div className="shrink-0">
                <img
                    src={imagenSrc} //  <-- Usamos la variable con la URL completa
                    alt={item.titulo}
                    className="w-20 rounded-md object-cover h-28 bg-gray-100" // Estilos mejorados
                    // Manejo de error si la imagen no carga
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/100x150/EAEAEA/363636?text=Error';
                    }}
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.titulo}</h3>
                        <p className="ml-4">${(item.precio * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
            </div>
        </li>
    );
}


// Un componente para el desglose de precios (sin cambios)
function PriceBreakdown({ subtotal, shipping, taxes, total }) {
    return (
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
                <dt className="text-sm">Envío</dt>
                <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
                <dt className="text-sm">Impuestos (19%)</dt>
                <dd className="text-sm font-medium text-gray-900">${taxes.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
            </div>
        </dl>
    );
}

export function OrderSummary() {
    const { cartItems, cartTotal } = useCart();

    // Lógica de cálculo (adaptada para usar el total del hook del carrito)
    const subtotal = cartTotal;
    // Estos cálculos deben coincidir con los de CheckoutPage.tsx
    const shipping = subtotal > 0 ? 5.00 : 0;
    const taxes = subtotal * 0.19;
    const total = subtotal + shipping + taxes;

    return (
        <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <SummaryItem key={item._id} item={item} />
                        ))
                    ) : (
                        <p className="p-6 text-center text-gray-500">Tu carrito está vacío.</p>
                    )}
                </ul>
                <PriceBreakdown subtotal={subtotal} shipping={shipping} taxes={taxes} total={total}/>
            </div>
        </div>
    );
}