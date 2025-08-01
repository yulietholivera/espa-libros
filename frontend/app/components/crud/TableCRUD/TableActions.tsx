// frontend/app/components/crud/TableCRUD/TableActions.tsx
import React from 'react'
import { Badge } from '~/components/badge'
import type { Libro } from './useFetchLibros'

interface TableActionsProps {
  libro: Libro
  onEdit?: (libro: Libro) => void
  onDelete?: (id: string) => void
}

export function TableActions({
  libro,
  onEdit = () => {},
  onDelete = () => {},
}: TableActionsProps) {
  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => onEdit(libro)}
        className="text-sm font-medium hover:text-gray-500"
      >
        <Badge color="blue">Editar</Badge>
      </button>
      <button
        type="button"
        onClick={() => onDelete(libro._id)}
        className="text-sm font-medium hover:text-gray-500"
      >
        <Badge color="rose">Eliminar</Badge>
      </button>
    </div>
  )
}

