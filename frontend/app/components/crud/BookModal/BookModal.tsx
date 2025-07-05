// /webapps/espa-libros/frontend/app/components/crud/BookModal/BookModal.tsx
'use client'

import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BookModalTrigger } from './BookModalTrigger'
import { BookForm } from './BookForm'

export function BookModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón que abre el modal */}
      <BookModalTrigger onClick={() => setOpen(true)} />

      {/* Diálogo del modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-5 pb-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
              
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 text-center mb-4">
                Crear nuevo libro
              </DialogTitle>

              {/* Formulario interno que maneja inputs y lógica de submit */}
              <BookForm onClose={() => setOpen(false)} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default BookModal