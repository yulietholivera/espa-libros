// frontend/app/components/crud/TableCRUD/LibrosTable.tsx
import React, { useState } from 'react'
import type { Libro } from './useFetchLibros'
import { TableHeader } from './TableHeader'
import { LibroRow } from './LibroRow'
import BookModal from '../BookModal/BookModal'

interface LibrosTableProps {
  libros: Libro[]
  onDelete?: (id: string) => void
  onRefresh?: () => void
}

export function LibrosTable({ 
  libros, 
  onDelete,
  onRefresh 
}: LibrosTableProps) {
  const [libroParaEditar, setLibroParaEditar] = useState<Libro | null>(null)

  return (
    <>
      <table className="w-full text-left">
        {/* <TableHeader /> */}
        <tbody>
          {libros.map((libro) => (
            <LibroRow
              key={libro._id}
              libro={libro}
              onEdit={(l) => setLibroParaEditar(l)}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {libroParaEditar && (
        <BookModal
          libroInicial={libroParaEditar}
          onClose={() => {
            setLibroParaEditar(null)
            onRefresh?.()
          }}
        />
      )}
    </>
  )
}

