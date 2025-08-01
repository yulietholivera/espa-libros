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

/**
 * useFetchLibros({ admin: true })
 * - admin=false → GET /api/libros       (público)
 * - admin=true  → GET /api/admin/libros (protegido)
 */
export function useFetchLibros(options: { admin?: boolean } = {}): UseFetchLibrosResult {
  const { admin = false } = options
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLibros = useCallback(async () => {
    setLoading(true)
    setError(null)

    const base = import.meta.env.VITE_API_URL.replace(/\/$/, '')
    const endpoint = admin
      ? `${base}/admin/libros`
      : `${base}/libros`

    console.log('[useFetchLibros] llamando a', endpoint)

    try {
      const res = await fetch(endpoint, {
        credentials: admin ? 'include' : undefined,
        headers: {
          'Content-Type': 'application/json',
          ...(admin && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      const data = await res.json()
      setLibros(Array.isArray(data) ? data : data.libros ?? [])
    } catch (err: any) {
      console.error('[useFetchLibros] error', err)
      setError('No se pudieron cargar los libros')
    } finally {
      setLoading(false)
    }
  }, [admin])

  useEffect(() => {
    fetchLibros()
  }, [fetchLibros])

  return { libros, loading, error, refresh: fetchLibros }
}

