// frontend/app/components/home/useLibros.ts
import { useState, useEffect } from "react";

export interface Libro {
  _id: string;
  titulo: string;
  autor: string;
  precio: number;
  imagenURL: string;
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
      try {
        const res = await fetch("/api/libros");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data: { libros: Libro[]; total: number } = await res.json();
        setLibros(data.libros);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los libros.");
      } finally {
        setLoading(false);
      }
    }

    fetchLibros();
  }, []);

  return { libros, loading, error };
}
