// frontend/app/components/cart/CartItemList.tsx
import React from 'react';
import CartItem from './CartItem';
import { useCart, type CartItem as CartItemType } from '~/context/CartContext';

export default function CartItemList() {
  const { cartItems } = useCart();

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-t border-b border-gray-200"
    >
      {cartItems.length > 0 ? (
        cartItems.map((item: CartItemType) => (
          <CartItem key={item._id} item={item} />
        ))
      ) : (
        <li className="py-6 text-center text-gray-500">
          Tu carrito está vacío.
        </li>
      )}
    </ul>
  );
}

