// frontend/app/components/crud/BookModal/BookModal.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BookModalTrigger } from './BookModalTrigger'
import { BookForm } from './BookForm'
import type { Libro } from '~/components/crud/TableCRUD/useFetchLibros'

interface BookModalProps {
  libroInicial?: Libro
  onClose: () => void
}

export function BookModal({ libroInicial, onClose }: BookModalProps) {
  const [open, setOpen] = useState(false)

  const isEdit = !!libroInicial

  // Abre automáticamente si estamos editando
  useEffect(() => {
    if (isEdit) setOpen(true)
  }, [isEdit])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <>
      {/* Solo mostrar botón si NO es edición */}
      {!isEdit && <BookModalTrigger onClick={() => setOpen(true)} />}

      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-5 pb-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 text-center mb-4">
                {isEdit ? 'Editar libro' : 'Crear nuevo libro'}
              </DialogTitle>

              {/* Pasa props al formulario */}
              <BookForm
                libroInicial={libroInicial}
                onClose={handleClose}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default BookModal
