// frontend/app/components/crud/TableCRUD/useFetchLibros.ts
import { useState, useEffect, useCallback } from 'react'
import { getToken } from '../../../utils/auth'

export interface Libro {
  _id: string
  titulo: string
  autor?: string
  descripcion?: string
  precio: number
  stock: number
  imagenURL?: string
  categoria?: string
}

interface UseFetchLibrosResult {
  libros: Libro[]
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useFetchLibros(options: { admin?: boolean } = {}): UseFetchLibrosResult {
  const { admin = false } = options
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLibros = useCallback(async () => {
    setLoading(true)
    setError(null)

    // ✅ CORRECCIÓN: Se construye la ruta relativa con el prefijo /api
    const endpoint = admin ? '/api/admin/libros' : '/api/libros';

    console.log('[useFetchLibros] llamando a', endpoint)

    try {
      const res = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          // El token solo se añade si es una ruta de admin
          ...(admin && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })

      if (!res.ok) {
        // Lanza un error con el status para dar más contexto
        throw new Error(`Error al contactar el servidor: ${res.status}`);
      }

      const data = await res.json()
      // La data puede venir como un array o como un objeto { libros: [...] }
      setLibros(Array.isArray(data) ? data : data.libros ?? [])
    } catch (err: any) {
      console.error('[useFetchLibros] error', err)
      setError(err.message || 'No se pudieron cargar los libros');
    } finally {
      setLoading(false)
    }
  }, [admin])

  useEffect(() => {
    fetchLibros()
  }, [fetchLibros])

  return { libros, loading, error, refresh: fetchLibros }
}
