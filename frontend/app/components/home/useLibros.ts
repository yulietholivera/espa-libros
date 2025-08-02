// frontend/app/components/home/useLibros.ts
import { useState, useEffect } from "react";

// ✅ CORRECCIÓN: La interfaz ahora incluye todos los campos posibles del modelo del backend.
// Los campos que pueden no estar presentes se marcan como opcionales con un '?'.
export interface Libro {
  _id: string;
  titulo: string;
  autor?: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  imagenURL?: string;
  categoria?: string;
}

interface UseLibrosResult {
  libros: Libro[];
  loading: boolean;
  error: string | null;
}

export default function useLibros(): UseLibrosResult {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLibros() {
      setLoading(true);
      setError(null); // Es buena práctica limpiar el error anterior al reintentar
      try {
        const res = await fetch("/api/libros");
        if (!res.ok) {
          throw new Error(`Error al contactar el servidor: ${res.status}`);
        }
        
        const data: { libros: Libro[]; total: number } = await res.json();
        setLibros(data.libros);

      } catch (err: any) {
        console.error("Error en fetchLibros:", err);
        setError(err.message || "No se pudieron cargar los libros.");
      } finally {
        setLoading(false);
      }
    }

    fetchLibros();
  }, []);

  return { libros, loading, error };
}