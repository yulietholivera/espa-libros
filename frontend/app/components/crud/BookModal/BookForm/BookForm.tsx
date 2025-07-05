// /webapps/espa-libros/frontend/app/components/crud/BookModal/BookForm/BookForm.tsx

import React, { FormEvent } from 'react'
import { useBookForm } from '../useBookForm'
import { BookFormFields } from './BookFormFields'
import { BookFormActions } from './BookFormActions'

export interface BookFormProps {
  onClose: () => void
}

export function BookForm({ onClose }: BookFormProps) {
  const { data, handleChange, submit } = useBookForm(onClose)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campos del formulario */}
      <BookFormFields data={data} handleChange={handleChange} />

      {/* Botones de acciones */}
      <BookFormActions onClose={onClose} />
    </form>
  )
}

export default BookForm