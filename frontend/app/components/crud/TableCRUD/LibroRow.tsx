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
  // Determinar la URL correcta de la imagen
  const srcImagen = (() => {
    if (!libro.imagenURL) return undefined
    if (libro.imagenURL.startsWith('http')) {
      return libro.imagenURL
    }
    if (libro.imagenURL.startsWith('/uploads')) {
      return libro.imagenURL
    }
    const base = import.meta.env.VITE_API_URL.replace(/\/$/, '')
    return `${base}${libro.imagenURL}`
  })()

  return (
    <>
      <tr className="text-sm text-gray-900">
        <th
          scope="colgroup"
          colSpan={3}
          className="relative isolate py-2 font-semibold"
        >
          <time dateTime={new Date().toISOString().split('T')[0]}>Hoy</time>
          <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
          <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
        </th>
      </tr>
      <tr>
        <td className="relative py-5 pr-6">
          <div className="flex gap-x-6">
            <div className="shrink-0">
              {srcImagen && (
                <img src={srcImagen} alt={libro.titulo} className="w-25" />
              )}
            </div>
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm/6 font-medium text-gray-900">
                  {libro.titulo}
                </div>
              </div>
              {libro.descripcion && (
                <p className="mt-3 text-sm text-gray-500">{libro.descripcion}</p>
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
          {/* Espacio reservado */}
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

