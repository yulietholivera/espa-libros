// /webapps/espa-libros/frontend/app/components/crud/TableCRUD/TableLoading.tsx
import React from 'react'

export function TableLoading() {
  return (
    <div className="flex justify-center items-center py-10">
      <svg
        className="animate-spin h-8 w-8 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="ml-2 text-gray-700 text-sm">Cargando libros…</span>
    </div>
  )
}
