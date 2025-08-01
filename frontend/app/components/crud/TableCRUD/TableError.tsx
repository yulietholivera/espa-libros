// /webapps/espa-libros/frontend/app/components/crud/TableCRUD/TableError.tsx
import React from 'react'

interface TableErrorProps {
  message: string
}

export function TableError({ message }: TableErrorProps) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}
