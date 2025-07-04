// /webapps/espa-libros/frontend/app/routes/ModalDialogs.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function ModalDialogs() {
  const [open, setOpen] = useState(false)
  const [precio, setPrecio] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [categoria, setCategoria] = useState<string>('')
  const [imagenFile, setImagenFile] = useState<File | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imagenFile) return

    const formData = new FormData()
    formData.append('precio', precio.toString())
    formData.append('stock', stock.toString())
    formData.append('categoria', categoria)
    formData.append('imagenURL', imagenFile)

    const res = await fetch('/api/admin/libros', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      setOpen(false)
      // Opcional: resetear estados aquí
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="ml-auto flex items-center gap-x-1 rounded-md bg-regal-espalibros px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-regal-espalibros/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
        Agregar libro
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-6 pt-5 pb-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6"
            >
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 text-center mb-4">
                Crear nuevo libro
              </DialogTitle>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="number"
                  value={precio}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPrecio(Number(e.target.value))}
                  placeholder="Precio"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                />

                <input
                  type="number"
                  value={stock}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(Number(e.target.value))}
                  placeholder="Stock"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                />

                <input
                  type="text"
                  value={categoria}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoria(e.target.value)}
                  placeholder="Categoría"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setImagenFile(e.target.files?.[0] ?? null)}
                  required
                  className="w-full text-sm text-gray-500"
                />

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-regal-espalibros text-white hover:bg-regal-espalibros/90"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

