// frontend/app/components/cart/CartHeader.tsx
import React from 'react';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router';

export default function CartHeader() {
  return (
    <header>
      {/* Logo */}
      <div className="mb-2">
        <Link to="/">
          <img src={Logo} alt="Espa-Libros Logo" />
        </Link>
      </div>

      {/* Título */}
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">
          Carrito de compras
        </h2>
      </div>
    </header>
  );
}
