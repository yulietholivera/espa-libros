// frontend/app/routes/CartPage.tsx
import React from 'react';
import { Link } from 'react-router';
import CartHeader from '~/components/cart/CartHeader';
import CartItemList from '~/components/cart/CartItemList';
import OrderSummary from '~/components/cart/OrderSummary';
import { useCart } from '~/context/CartContext';

export function meta(): Array<{ title: string }> {
  return [{ title: 'Carrito de Compras' }];
}

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <>
      <div className="bg-regal2-espalibros pb-96">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Encabezado */}
          <CartHeader />

          {/* Contenedor blanco */}
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-0">
              <form
                className="mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Proceeding to checkout...');
                }}
              >
                {/* Lista de ítems */}
                <section aria-labelledby="cart-heading">
                  <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                  </h2>
                  <CartItemList />
                </section>

                {/* Resumen de orden */}
                <OrderSummary />
              </form>
            </div>
          </div>
        </div>

        {/* En móvil: enlace alternativo */}
        <div className="mt-8 text-sm md:hidden">
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Ver catálogo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
