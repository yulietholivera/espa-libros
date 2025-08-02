// frontend/app/routes/BookDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "~/context/CartContext";
import type { Libro } from "~/components/home/useLibros";
import Logo from '~/assets/logo.svg';

// Componente para mostrar el estado de carga
function LoadingSpinner() {
    return <div className="text-center p-10">Cargando...</div>;
}

// Componente para mostrar errores
function ErrorDisplay({ message }: { message: string }) {
    return <div className="text-center p-10 text-red-500">{message}</div>;
}

export default function BookDetailPage() {
    const { id } = useParams(); // Obtiene el ID del libro desde la URL
    const { addToCart } = useCart();
    const [libro, setLibro] = useState<Libro | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No se proporcionó un ID de libro.");
            setLoading(false);
            return;
        }

        const fetchLibro = async () => {
            try {
                const res = await fetch(`/api/libros/${id}`);
                if (!res.ok) {
                    throw new Error(`Error al cargar el libro: ${res.statusText}`);
                }
                const data = await res.json();
                setLibro(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLibro();
    }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

    // --- LÓGICA CORREGIDA PARA LA IMAGEN ---
    const srcImagen = (() => {
        if (!libro?.imagenURL) {
            return 'https://placehold.co/400x600/EAEAEA/363636?text=No+Imagen';
        }
        if (libro.imagenURL.startsWith('http')) {
            return libro.imagenURL;
        }
        const apiUrlBase = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
        return `${apiUrlBase}${libro.imagenURL}`;
    })();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }

    if (!libro) {
        return <ErrorDisplay message="Libro no encontrado." />;
    }

    return (
        <div className="bg-regal2-espalibros min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mb-8">
                    <Link to="/">
                        <img src={Logo} alt="Espa-Libros Logo" />
                    </Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <img
                                src={srcImagen} // <-- USAMOS LA VARIABLE CORREGIDA
                                alt={libro.titulo}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/400x600/EAEAEA/363636?text=Error';
                                }}
                            />
                        </div>
                        <div className="p-8 md:w-2/3">
                            <h1 className="text-3xl font-bold text-gray-900">{libro.titulo}</h1>
                            <p className="mt-2 text-lg text-gray-600">{libro.autor}</p>
                            <p className="mt-4 text-2xl font-bold text-regal-espalibros">${libro.precio.toFixed(2)}</p>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold">Descripción</h2>
                                <p className="mt-2 text-gray-700">{libro.descripcion || "No hay descripción disponible."}</p>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={() => addToCart(libro)}
                                    className="w-full rounded-md border border-transparent bg-regal-espalibros px-8 py-3 text-base font-medium text-white shadow-xs hover:bg-regal-espalibros/90 focus:outline-none focus:ring-2 focus:ring-regal-espalibros focus:ring-offset-2"
                                >
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
