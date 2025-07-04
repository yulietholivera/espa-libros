// /webapps/espa-libros/frontend/app/routes/TableCRUDPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'

interface Libro {
    _id: string
    titulo: string
    autor?: string
    descripcion?: string
    precio: number
    stock: number
    imagenURL?: string
    categoria?: string
}

export default function TableCRUDPage() {
    const [libros, setLibros] = useState<Libro[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/libros`, {
            credentials: 'include' // si usas cookies/sesión
        })
        const token = getToken()
        if (!token) {
            setError('No estás autenticado')
            setLoading(false)
            return
        }
        fetch(`${import.meta.env.VITE_API_URL}/libros`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`)
                return res.json()
            })
            .then(data => {
                setLibros(data.libros)
            })
            .catch(err => {
                console.error(err)
                setError('No se pudieron cargar los libros')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Cargando libros…</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <>
            <table className="w-full text-left">
                <thead className="sr-only">
                    <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro._id} className="text-sm/6 text-gray-900">
                            {/* ‣ Celda principal: imagen + datos */}
                            <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                    <div className="shrink-0">
                                        {libro.imagenURL && (
                                            <img
                                                src={
                                                    libro.imagenURL.startsWith('http')
                                                        ? libro.imagenURL
                                                        : `${import.meta.env.VITE_API_URL.replace('/api/admin', '')}${libro.imagenURL}`
                                                }
                                                alt={libro.titulo}
                                                className="h-16 w-auto object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-auto">
                                        <div className="flex items-start gap-x-3">
                                            <div className="text-sm/6 font-medium text-gray-900">
                                                {libro.titulo}
                                            </div>
                                        </div>
                                        {libro.descripcion && (
                                            <p className="mt-3 text-sm text-gray-500">{libro.descripcion}</p>
                                        )}
                                        <div className="mt-1 text-xs/5 text-gray-500">
                                            <span className="font-semibold">Autor:</span> {libro.autor || '—'}
                                        </div>
                                        <div className="mt-1 text-xs/5 text-gray-500">
                                            <span className="font-semibold">Precio:</span> ${libro.precio.toFixed(2)}
                                        </div>
                                        <div className="mt-1 text-xs/5 text-gray-500">
                                            <span className="font-semibold">Stock:</span> {libro.stock}
                                        </div>
                                        <div className="mt-1 text-xs/5 text-gray-500">
                                            <span className="font-semibold">Categoría:</span> {libro.categoria || '—'}
                                        </div>
                                    </div>
                                </div>
                                {/* líneas separadoras a izquierda y derecha */}
                                <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                            </td>

                            {/* ‣ Columna opcional (ejemplo: categoría) ocultable en sm */}
                            <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="text-sm/6 text-gray-900">{libro.categoria}</div>
                            </td>

                            {/* ‣ Acción al final (ej. ver o editar) */}
                            <td className="py-5 text-right">
                                <div className="flex justify-end">
                                    <a
                                        href={`/admin/libros/${libro._id}`}
                                        className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Ver detalles
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {libros.length === 0 && (
                        <tr>
                            <td colSpan={3} className="py-5 text-center text-gray-500">
                                No hay libros para mostrar
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </>
    );
}