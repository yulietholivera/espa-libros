// /frontend/app/components/checkout/CheckoutHeader.tsx
import { Link } from "react-router";
import Logo from '../../assets/logo.svg';

/**
 * Componente para el encabezado de la página de checkout.
 * Muestra el logo de la aplicación y un título.
 */
export function CheckoutHeader() {
  return (
    <>
      <div className="mb-2">
        <Link to="/">
          <img src={Logo} alt="Espa-Libros Logo" />
        </Link>
      </div>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">
          Compra tu libro
        </h2>
      </div>
    </>
  );
}