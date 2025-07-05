// /webapps/espa-libros/frontend/app/components/crud/AddBookButton.tsx
import React from 'react'

interface AddBookButtonProps {
  onClick: () => void
}

export function AddBookButton({ onClick }: AddBookButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      Agregar libro
    </button>
  )
}