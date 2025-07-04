// /webapps/espa-libros/frontend/app/routes/ModalDialogs.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

const API = import.meta.env.VITE_API_URL

export default function ModalDialogs() {
    const [open, setOpen] = useState(false)
    const [titulo, setTitulo] = useState<string>('')
    const [autor, setAutor] = useState<string>('')
    const [descripcion, setDescripcion] = useState<string>('')
    const [precio, setPrecio] = useState<number | null>(null)
    const [stock, setStock] = useState<number | null>(null)
    const [categoria, setCategoria] = useState<string>('')
    const [imagenFile, setImagenFile] = useState<File | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!imagenFile) return

        const formData = new FormData()
        formData.append('titulo', titulo)
        formData.append('autor', autor)
        formData.append('descripcion', descripcion)
        formData.append('precio', precio?.toString() ?? '0')
        formData.append('stock', stock?.toString() ?? '0')
        formData.append('categoria', categoria)
        formData.append('imagenURL', imagenFile)

        // Recupera el token desde localStorage
        const token = localStorage.getItem('token')

        const res = await fetch(`${API}/libros`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })

        if (res.ok) {
            setOpen(false)
            // limpiar campos
            setTitulo('')
            setAutor('')
            setDescripcion('')
            setPrecio(null)
            setStock(null)
            setCategoria('')
            setImagenFile(null)
            // opcional: aquí podrías notificar al padre para recargar la lista
        } else {
            console.error('Error al crear libro:', await res.json())
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
                            <DialogTitle
                                as="h3"
                                className="text-lg font-semibold text-gray-900 text-center mb-4"
                            >
                                Crear nuevo libro
                            </DialogTitle>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Título */}
                                <div>
                                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                                        Título
                                    </label>
                                    <input
                                        id="titulo"
                                        type="text"
                                        value={titulo}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
                                        placeholder="Ej. Las vidas dentro de tu cabeza"
                                        required
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Autor */}
                                <div>
                                    <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
                                        Autor
                                    </label>
                                    <input
                                        id="autor"
                                        type="text"
                                        value={autor}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAutor(e.target.value)}
                                        placeholder="Ej. Carlos Sánchez"
                                        required
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescripcion(e.target.value)}
                                        placeholder="Ej. Una novela emocionante"
                                        required
                                        rows={3}
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Precio */}
                                <div>
                                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <input
                                        id="precio"
                                        type="number"
                                        // Si precio es null, el value será '' y mostrará el placeholder
                                        value={precio ?? ''}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            // Al borrar el contenido, volvemos a null; si hay número, lo guardamos
                                            setPrecio(e.target.value === '' ? null : Number(e.target.value))
                                        }
                                        placeholder="Ej. 24.99"
                                        required
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                        Stock
                                    </label>
                                    <input
                                        id="stock"
                                        type="number"
                                        value={stock ?? ''}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setStock(e.target.value === '' ? null : Number(e.target.value))
                                        }
                                        placeholder="Ej. 75"
                                        required
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                        Categoría
                                    </label>
                                    <input
                                        id="categoria"
                                        type="text"
                                        value={categoria}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoria(e.target.value)}
                                        placeholder="Ej. novela"
                                        required
                                        className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                                    />
                                </div>

                                {/* Imagen */}
                                <div>
                                    <label htmlFor="imagenURL" className="block text-sm font-medium text-gray-700">
                                        Imagen
                                    </label>
                                    <input
                                        id="imagenURL"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setImagenFile(e.target.files?.[0] ?? null)}
                                        required
                                        className="mt-1 block w-full text-sm text-gray-500"
                                    />
                                </div>

                                {/* Botones */}
                                <div className="flex justify-end gap-3 pt-2">
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
