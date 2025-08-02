// frontend/app/components/crud/TableCRUD/LibroRow.tsx
import React from 'react'
import type { Libro } from './useFetchLibros'
import { TableActions } from './TableActions'

interface LibroRowProps {
  libro: Libro
  onEdit?: (libro: Libro) => void
  onDelete?: (id: string) => void
}

export function LibroRow({
  libro,
  onEdit = () => {},
  onDelete = () => {},
}: LibroRowProps) {
  // --- LÓGICA CORREGIDA ---
  // Esta lógica asegura que siempre se construya la URL completa para la imagen.
  const srcImagen = (() => {
    // Si no hay URL, podemos devolver una imagen genérica.
    if (!libro.imagenURL) {
      return 'https://placehold.co/100x150/EAEAEA/363636?text=No+Imagen'
    }

    // Si la URL ya es absoluta (empieza con http), la usamos directamente.
    if (libro.imagenURL.startsWith('http')) {
      return libro.imagenURL
    }

    // Si es una ruta relativa (como /uploads/...), le añadimos la base de la API.
    const apiUrlBase = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
    return `${apiUrlBase}${libro.imagenURL}`
  })()

  return (
    <>
      {/* Se ha eliminado la fila de cabecera de fecha ("Hoy") para un diseño más limpio */}
      <tr>
        <td className="relative py-5 pr-6">
          <div className="flex gap-x-6">
            <div className="shrink-0">
              {/* Usamos la variable `srcImagen` corregida y añadimos estilos y un fallback */}
              <img
                src={srcImagen}
                alt={libro.titulo}
                className="w-24 h-36 object-cover rounded-md bg-gray-50" // Tamaño y estilo mejorados
                onError={(e) => {
                  // Si la imagen falla, muestra una genérica.
                  e.currentTarget.src = 'https://placehold.co/100x150/EAEAEA/363636?text=Error'
                }}
              />
            </div>
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm/6 font-medium text-gray-900">
                  {libro.titulo}
                </div>
              </div>
              {libro.descripcion && (
                <p className="mt-3 text-sm text-gray-500 line-clamp-2">{libro.descripcion}</p>
              )}
              <div className="mt-1 text-xs/5 text-gray-500">
                <span className="font-semibold">Autor:</span>{' '}
                {libro.autor || '—'}
              </div>
              <div className="mt-1 text-xs/5 text-gray-500">
                <span className="font-semibold">Precio:</span>{' '}
                ${libro.precio.toFixed(2)}
              </div>
              <div className="mt-1 text-xs/5 text-gray-500">
                <span className="font-semibold">Stock:</span> {libro.stock}
              </div>
              <div className="mt-1 text-xs/5 text-gray-500">
                <span className="font-semibold">Categoría:</span>{' '}
                {libro.categoria || '—'}
              </div>
            </div>
          </div>
          <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
          <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
        </td>

        <td className="hidden py-5 pr-6 sm:table-cell">
          {/* Espacio reservado para futuras columnas si es necesario */}
        </td>

        <td className="py-5 text-right">
          <TableActions
            libro={libro}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </td>
      </tr>
    </>
  )
}
