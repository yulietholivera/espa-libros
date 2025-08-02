// frontend/app/components/home/BookCard.tsx
import { Link } from "react-router";
import type { Libro } from "./useLibros";
import { useCart } from "~/context/CartContext";

interface BookCardProps {
  libro: Libro;
}

export default function BookCard({ libro }: BookCardProps) {
  const { addToCart } = useCart();

  // ✅ CORRECCIÓN: Construir la URL completa de la imagen.
  // Se obtiene la URL base del backend desde las variables de entorno de Vite.
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const imagenSrc = libro.imagenURL?.startsWith('http') 
    ? libro.imagenURL 
    : `${API_URL}${libro.imagenURL}`;

  return (
    <div className="group relative mb-5">
      <Link to={`/libros/${libro._id}`}>
        <div className="w-full h-55 overflow-hidden bg-gray-200 group-hover:opacity-75">
          <img
            src={imagenSrc} // <-- Se usa la URL corregida
            alt={libro.titulo}
            className="w-full h-full object-cover"
            // Opcional: Añadir un fallback por si la imagen falla
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150x220.png?text=No+Imagen';
            }}
          />
        </div>
        <h3 className="mt-1 text-sm text-gray-700">{libro.titulo}</h3>
      </Link>
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => addToCart(libro)}
          className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs
                       hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Comprar
        </button>
        <p className="text-sm font-medium text-gray-900">${libro.precio}</p>
      </div>
    </div>
  );
}
