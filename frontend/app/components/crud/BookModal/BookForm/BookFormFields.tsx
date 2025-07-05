// /webapps/espa-libros/frontend/app/components/crud/BookModal/BookForm/BookFormFields.tsx

import React, { ChangeEvent } from 'react'
import type { BookData } from '../useBookForm'

export interface BookFormFieldsProps {
    data: BookData
    handleChange: <K extends keyof BookData>(key: K, value: BookData[K]) => void
}

export function BookFormFields({ data, handleChange }: BookFormFieldsProps) {
    return (
        <>
            {/* Título */}
            <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                    Título
                </label>
                <input
                    id="titulo"
                    type="text"
                    value={data.titulo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange('titulo', e.target.value)
                    }
                    required
                    placeholder="Ej. Las vidas dentro de tu cabeza"
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
                    value={data.autor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange('autor', e.target.value)
                    }
                    required
                    placeholder="Ej. Carlos Sánchez"
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
                    value={data.descripcion}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        handleChange('descripcion', e.target.value)
                    }
                    rows={3}
                    required
                    placeholder="Ej. Una novela emocionante"
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
                    value={data.precio ?? ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(
                            'precio',
                            e.target.value === '' ? null : Number(e.target.value)
                        )
                    }
                    required
                    placeholder="Ej. 24.99"
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
                    value={data.stock ?? ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(
                            'stock',
                            e.target.value === '' ? null : Number(e.target.value)
                        )
                    }
                    required
                    placeholder="Ej. 75"
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
                    value={data.categoria}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange('categoria', e.target.value)
                    }
                    required
                    placeholder="Ej. novela"
                    className="text-black mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-regal-espalibros"
                />
            </div>

            {/* Imagen */}
            <div>
                <label htmlFor="imagenURL" className="block text-sm font-medium text-gray-700">
                    Imagen
                </label>
                <input
                    id="imagenFile"
                    type="file"
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange('imagenFile', e.target.files?.[0] ?? null)
                    }
                    required
                    className="mt-1 block w-full text-sm text-gray-500"
                />
            </div>
        </>
    )
}

export default BookFormFields
