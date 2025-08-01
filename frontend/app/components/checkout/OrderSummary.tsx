// /frontend/app/components/checkout/OrderSummary.tsx
import React from 'react';
import { useCart } from '~/context/CartContext';

// Un componente simple para mostrar cada item en el resumen
function SummaryItem({ item }) {
    return (
        <li className="flex px-4 py-6 sm:px-6">
            <div className="shrink-0">
                <img
                    src={item.imagenURL}
                    alt={item.titulo}
                    className="w-20 rounded-md"
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

// Un componente para el desglose de precios
function PriceBreakdown({ subtotal, shipping, taxes }) {
    const total = subtotal + shipping + taxes;
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

    // Lógica de cálculo de envío e impuestos (debería coincidir con el backend)
    const subtotal = cartTotal;
    const shipping = subtotal > 0 ? 5.00 : 0; // Envío estándar de ejemplo
    const taxes = subtotal * 0.19; // 19% IVA

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
                <PriceBreakdown subtotal={subtotal} shipping={shipping} taxes={taxes} />
                {/* El botón de confirmar se encuentra ahora dentro del formulario de Mercado Pago */}
            </div>
        </div>
    );
}
