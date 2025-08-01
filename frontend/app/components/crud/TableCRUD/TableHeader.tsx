// /webapps/espa-libros/frontend/app/components/crud/TableCRUD/TableHeader.tsx
import React from 'react'

export function TableHeader() {
  return (
    <thead className="border-b bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Título</th>
        <th className="hidden sm:table-cell px-4 py-2 text-left text-sm font-semibold text-gray-700">Autor</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Precio</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Stock</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoría</th>
        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Acciones</th>
      </tr>
    </thead>
  )
}
