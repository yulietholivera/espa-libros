// frontend/app/components/crud/BookModal/BookForm/BookForm.tsx

import React, { FormEvent, useEffect } from 'react'
import { useBookForm } from '../useBookForm'
import { BookFormFields } from './BookFormFields'
import { BookFormActions } from './BookFormActions'
import type { Libro } from '~/components/crud/TableCRUD/useFetchLibros'

export interface BookFormProps {
  libroInicial?: Libro
  onClose: () => void
}

export function BookForm({ libroInicial, onClose }: BookFormProps) {
  const { data, setDataFromLibro, handleChange, submit } = useBookForm(onClose, libroInicial)

  useEffect(() => {
    if (libroInicial) {
      setDataFromLibro(libroInicial)
    }
  }, [libroInicial])

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
